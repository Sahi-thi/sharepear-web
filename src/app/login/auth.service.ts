import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupResponse, LoginResponse, LogoutResponse } from './auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Definite Assignment Assertion
  public SignupResponse?: SignupResponse;
  public loginResponse?: LoginResponse;
  public logoutResponse?: LogoutResponse;

  constructor(protected httpClient: HttpClient) { }

  signupUserService(params: any, callback: any) {
    const url = environment.api_end_point + '/users';
    console.log(url, params);
    this.httpClient
      .post(url, params)
      .subscribe((signupResponse: SignupResponse): void => {
        this.SignupResponse = signupResponse;
        // console.log(this.SignupResponse);
      },  (err) => {
        // console.log(err, err.error.text);
        callback(1, err.error.text);
      });
  }

  loginUserService(params: any, callback: any) {
    const url = environment.api_end_point + '/auth/login';
    console.log(url, params);
    this.httpClient
      .post(url, params)
      .subscribe((loginResponse: LoginResponse) => {
        this.loginResponse = loginResponse;
        console.log(loginResponse.access_token);
        localStorage.setItem('access_token', `${loginResponse.access_token}`);
        localStorage.setItem('user_id', `${loginResponse.user?.id}`);
        callback(1, this.loginResponse);
      },  (err) => {
        console.log(err);
      });
  }

  logout(callback: any) {
    const url = environment.api_end_point + '/logout';
    // console.log(url);
    this.httpClient.post(url, 'data').subscribe((logoutResponse: LogoutResponse) => {
      this.logoutResponse = logoutResponse;
      console.log(this.logoutResponse);
      localStorage.clear();
      callback(1, this.logoutResponse);
    },  (err) => {
      console.log(err);
    });
  }

}
