import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
// import { AuthInterceptor } from './auth.interceptor';
import { SocialLoginModule, SocialAuthServiceConfig ,GoogleLoginProvider } from 'angularx-social-login';
import { AuthGuard } from './auth.guard';

const googleLoginOptions = {
  scope: 'profile email'
}; 
@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '617966114382-ih8fmhp7hld4hnhfia83dhid328o5p8f.apps.googleusercontent.com', googleLoginOptions
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ]
})
export class LoginModule { }
