/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }
  // CheckLogin
  checkLogin(url: string): Promise<boolean> | boolean {
    let currentUser: any;
      currentUser = localStorage.getItem('vendorToken');
    if (currentUser) {
      if (url === '/auth/login' || url === '/auth' || url === '/auth/recover-password') {
        // Navigate to the login page with extras
        this.router.navigate(['/products']);
        return false;
      }
      return true;
    } else {
      if (url === '/auth/login' || url === '/auth' || url === '/auth/recover-password') {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
      }
    }
    // Navigate to the login page with extras
    this.router.navigate(['/auth/login']);
    return false;
  }
}
