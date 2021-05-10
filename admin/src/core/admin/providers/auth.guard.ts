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
import { OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { PermissionServices } from '../../../theme/default/admin/shared/components/services/permission.services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router, public permissionServices: PermissionServices,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkLogin(state.url, route.data['permission']);
  }
  // CheckLogin
  checkLogin(url: string, rolePermission: string = ''): Promise<boolean> | boolean {
    let currentUser: any;
    if (isPlatformBrowser(this.platformId)) {
      currentUser = JSON.parse(localStorage.getItem('adminUserdetail'));
    }

    if (currentUser) {
      if (url === '/auth/login' || url === '/auth/forgot-password') {
        // Navigate to the login page with extras
        this.router.navigate(['/dashboard']);
        return false;
      }
      if (rolePermission && rolePermission !== '') {
        if (this.permissionServices.hasPermission(rolePermission)) {
            return true;
        } else {
          this.router.navigate(['/dashboard']);
          return false;
        }
    }
      return true;
    } else {
      if (url === '/auth/login' || url === '/auth/forgot-password') {
        return true;
      }
    }
    // Navigate to the login page with extras
    this.router.navigate(['/auth/login']);
    return false;
  }
}
