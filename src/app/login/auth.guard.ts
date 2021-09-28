/// <reference types="chrome"/>
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { LogoutResponse } from './auth.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  extensionId = 'ffghnkeebbgnjhpanppmchdofiaddjbl';

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<any> {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.authService.logout((status: any, response: LogoutResponse) => {
        if (response.message === 'Logged out.') {
          this.router.navigate(['/login']);
          chrome.runtime.sendMessage(this.extensionId, { type: 'logout' }, (responseData) => {
            console.log('response', JSON.stringify(responseData));
          });
          return true;
        }
      });
    } else {
      return true;
    }
  }

}
