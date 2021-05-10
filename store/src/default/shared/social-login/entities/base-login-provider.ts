/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { LoginProvider } from './login-provider';
import { SocialUser, LoginProviderClass } from './user';

export abstract class BaseLoginProvider implements LoginProvider {
  constructor() {}

  abstract initialize(): Promise<SocialUser>;
  abstract signIn(): Promise<SocialUser>;
  abstract signOut(): Promise<any>;

  loadScript(obj: LoginProviderClass, onload: any): void {
    if (document.getElementById(obj.name)) { return; }
    const signInJS = document.createElement('script');
    signInJS.async = true;
    signInJS.src = obj.url;
    signInJS.onload = onload;
    if (obj.name === 'LINKEDIN') {
      signInJS.async = false;
      signInJS.text = ('api_key: ' + obj.id).replace('\'', '');
    }
    document.head.appendChild(signInJS);
  }
}
