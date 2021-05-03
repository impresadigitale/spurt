/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as authAction from './action/auth.action';

import * as store from '../app.state.interface';

import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import { get_loginLoading, get_loginLoaded,
   get_loginFailed, getForgetPasswordFailed, getForgetPasswordLoaded, getForgetPasswordLoading,
   get_registerLoading, getChangePasswordFailed, getChangePasswordLoaded, getChangePasswordLoading,
    get_registerLoaded, get_registerFailed } from './reducer/auth.selector';

@Injectable()
export class AuthSandbox {
  private subscriptions: Array<Subscription> = [];
  /* login status*/


  public loginLoading$ = this.appState$.select(get_loginLoading);
  public loginLoaded$ = this.appState$.select(get_loginLoaded);
  public loginFailed$ = this.appState$.select(get_loginFailed);
  /* register status*/
  public registerLoading$ = this.appState$.select(get_registerLoading);
  public registerLoaded$ = this.appState$.select(get_registerLoaded);
  public registerFailed$ = this.appState$.select(get_registerFailed);
  /* change password status*/
  public changePasswordLoading$ = this.appState$.select(getChangePasswordLoading);
  public changePasswordLoaded$ = this.appState$.select(getChangePasswordLoaded);
  public changePasswordFailed$ = this.appState$.select(getChangePasswordFailed);
  /* forget password status*/
  public forgetPasswordLoading$ = this.appState$.select(getForgetPasswordLoading);
  public forgetPasswordLoaded$ = this.appState$.select(getForgetPasswordLoaded);
  public forgetPasswordFailed$ = this.appState$.select(getForgetPasswordFailed);

  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  public doLogin(params): void {
    this.appState$.dispatch(new authAction.DoLogin(new LoginModel(params)));
  }
  public doRegister(params): void {
    this.appState$.dispatch(
      new authAction.DoRegister(new RegisterModel(params))
    );
  }
  public changePassword(params): void {
    this.appState$.dispatch(new authAction.ChangePassword(params));
  }
  public doForgetPassword(params): void {
    this.appState$.dispatch(new authAction.DoForgetPassword(params));
  }

}
