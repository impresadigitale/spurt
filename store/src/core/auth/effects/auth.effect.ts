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
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../state.interface';
import { catchError } from 'rxjs/operators';
import { LoginResponseModel } from '../models/loginResponse.model';
import { AuthApiService } from '../auth.service';
import * as actions from './../action/auth.action';
import { AuthService } from '../../../default/shared/social-login/auth.service';
import { Router } from '@angular/router';
import { OauthModel } from '../models/oauth.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    public socialAuthService: AuthService,
    public router: Router,
    private authApi: AuthApiService,
    private appState$: Store<store.AppState>
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_LOGIN),
    map((action: actions.DoLogin) => action.payload),
    switchMap(state => {
      return this.authApi.doLogin(state).pipe(
        tap(response => {
          if (state.type === 'gmail') {
            this.socialAuthService.signIn(state.type, response.data.clientId).then(
              (userData) => {
                if (userData.email) {
                  const param: any = {};
                  param.url = response.data.returnPath;
                  param.email = userData.email;
                  param.oAuthData = userData;
                  this.appState$.dispatch(new actions.DoOauthLogin(new OauthModel(param)));
              }
              }
          );
          } else if (state.type === 'facebook') {
            this.socialAuthService.signIn(state.type, response.data.AppId).then(
                  (userData) => {
                      if (userData.email) {
                          const param: any = {};
                          param.url = response.data.returnPath;
                          param.email = userData.email;
                          param.oAuthData = userData;
                          this.appState$.dispatch(new actions.DoOauthLogin(new OauthModel(param)));
                      }
                  }
              );

          } else {
              this.router.navigate(['/']);
          }
        }),
        map(
          loggedin =>
            new actions.DoLoginSuccess(new LoginResponseModel(loggedin))
        ),
        catchError(error =>
          of(new actions.DoLoginFail(new LoginResponseModel(error)))
        )
      );
    })
  );

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_REGISTER),
    map((action: actions.DoRegister) => action.payload),
    switchMap(state => {
      if (state.phoneNumber === '') {
        delete state.phoneNumber;
      }
      return this.authApi.doRegister(state).pipe(
        map(register => new actions.DoRegisterSuccess(register)),
        catchError(error => of(new actions.DoRegisterFail(error)))
      );
    })
  );

  @Effect()
  recover$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_RECOVER),
    map((action: actions.RecoverAccount) => action.payload),
    switchMap(state => {
      return this.authApi.doRecover(state).pipe(
        map(register => new actions.RecoverAccountSuccess(register)),
        catchError(error => of(new actions.RecoverAccountFail(error)))
      );
    })
  );
  @Effect()
  oauthLogin$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_OAUTH_LOGIN),
    map((action: actions.DoOauthLogin) => action.payload),
    switchMap(state => {
      return this.authApi.doOauth(state).pipe(
        tap(val => {
          this.router.navigate(['/']);
        }),
        map(log => new actions.DoLoginSuccess(new LoginResponseModel(log))),
        catchError(error => of(new actions.DoLoginFail(error)))
      );
    })
  );
}
