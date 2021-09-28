import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
 constructor(private router : Router){}
  async canActivate() {
    const token = localStorage.getItem('access_token');

    if (token) {
     return true
    } else {
      this.router.navigate(['/login/login']);
      return false;
    }
  }
  
}
