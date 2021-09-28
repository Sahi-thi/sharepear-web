/// <reference types='chrome' />;
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { LoginResponse, SignupResponse } from '../auth.model';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  notUser = true;
  signupForm: any = FormGroup;
  loginForm: any = FormGroup;
  submitted = false;
  signUpData: any;
  loginsubmit = false;
  extensionId = 'ffghnkeebbgnjhpanppmchdofiaddjbl';
  params: any;
  loginbuttonData = 'Login';

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private authService: AuthService,
    private googleService: SocialAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      this.params = params[' tab'];
      if (params [' tab'] === 'loginFromChromeExtension'){ this.loginbuttonData = 'Login'; }
      if (params[' tab'] === 'signup' || params[' tab'] === 'signupFromChromeExtension') {
        this.signup_login_tab_display('signup');
      }
      else if (params[' tab'] === 'login' || params[' tab'] === 'loginFromChromeExtension') {
        this.signup_login_tab_display('login');
      }
    });
    this.titleService.setTitle('Login');
    this.loginFormSetUp();
    this.googleService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  loginFormSetUp() {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = this.formBuilder.group({
      // name: new FormControl('', []),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  signup_login_tab_display(tab: string) {
    if (tab === 'login' || tab === 'loginFromChromeExtension') {
      this.notUser = true;
      if (this.signupForm){ this.signupForm.reset(); }
      this.submitted = false;
    }
    else if (tab === 'signup' || tab === 'signupFromChromeExtension') {
      this.loginsubmit = false;
      if (this.loginForm) { this.loginForm.reset(); }
      this.notUser = false;
      const emailPattern = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.signupForm = this.formBuilder.group({
        name: new FormControl('', []),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(emailPattern),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      });
    }
  }

  onSignupFormSubmit() {
    console.log(this.signupForm.value);
    this.submitted = true;
    if (this.signupForm.valid) {
      this.authService.signupUserService(this.signupForm.value, (status: string, response: SignupResponse) => {
        this.submitted = false;
        this.signUpData = response;
        // console.log(status, response);
      });
    }
  }

  onLoginFormSubmit() {
    this.loginsubmit = true;
    // console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.authService.loginUserService(this.loginForm.value, (status: string, response: LoginResponse) => {
        this.submitted = false;
        this.signUpData = response;
        // console.log(status, response,response.access_token);
        chrome.runtime.sendMessage(this.extensionId, { type: 'login', access_token: response.access_token}, (responseData ) => {
          console.log('response', JSON.stringify(responseData));
        });
        if (this.params === 'loginFromChromeExtension') {}
        window.close();
        this.router.navigate(['/dashboard/personal/all-items']);
      });
    }
  }

  sigupWithGoogle() {
    this.googleService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
