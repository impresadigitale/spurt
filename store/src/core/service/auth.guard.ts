/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): Promise<boolean> | boolean {
    let underMaintenance: boolean;
    let currentUser: any;
    let compareId: any;
    if (isPlatformBrowser(this.platformId)) {
      currentUser = JSON.parse(localStorage.getItem('storeUser'));
      underMaintenance = JSON.parse(sessionStorage.getItem('maintenanceMode'));
      compareId = JSON.parse(localStorage.getItem('compareId'));
    }
    if (underMaintenance === true) {
      if (url === '/underdeveloping') {
        return true;
      } else {
        this.router.navigate(['/underdeveloping']);
        return false;
      }
      return true;
    } else {
      if (currentUser) {
        if (url === '/auth') {
          // Navigate to the login page with extras (once login again pass the ./auth url it redirect to home page)
          this.router.navigate(['/']);
          return false;
        }
        return true;
      } else {
        // at login time
        if (url === '/auth') {
          return true;
        }
      }
    }
    // Navigate to the login page with extras
    this.router.navigate(['/auth']);
    return false;
  }
}
