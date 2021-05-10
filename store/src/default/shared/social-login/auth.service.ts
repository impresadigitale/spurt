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

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

import { LoginProvider } from './entities/login-provider';
import { SocialUser } from './entities/user';
import { FacebookLoginProvider } from './providers/facebook-login-provider';
import { GoogleLoginProvider } from './providers/google-login-provider';
export interface AuthServiceConfigItem {
  id: string;
  provider: LoginProvider;
}


@Injectable()
export class AuthService {
  private static readonly LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';

  private providers: Map<string, LoginProvider>;

  private _user: SocialUser = null;
  private _authState: BehaviorSubject<SocialUser> = new BehaviorSubject(null);

  get authState(): Observable<SocialUser> {
    return this._authState.asObservable();
  }

  constructor() {}

  signIn(type: string, clientId: string): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      let providerObject: any;
      if (type === 'facebook') {
        providerObject = new FacebookLoginProvider(clientId);
        providerObject.initialize();
      }
      if (type === 'gmail') {
        providerObject = new GoogleLoginProvider(clientId);
        providerObject.initialize();

      }
      if (providerObject) {

        providerObject.signIn().then((user: SocialUser) => {
          user.provider = clientId;
          resolve(user);
          this._user = user;
          this._authState.next(user);
        });
      } else {
        reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._user && this._user.provider) {
        const providerId = this._user.provider;
        const providerObject = this.providers.get(providerId);
        providerObject
          .signOut()
          .then(() => {
            this._user = null;
            this._authState.next(null);
            resolve();
          })
          .catch(err => {
            this._authState.next(null);
          });
      } else {
        reject(AuthService.LOGIN_PROVIDER_NOT_FOUND);
      }
    });
  }
}
