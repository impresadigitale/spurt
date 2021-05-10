/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class ChangePasswordRequestModel {
    public emailId: any;
    public password: any;
    constructor(loginRequest: any) {
      this.emailId = loginRequest.loginId || '';
      this.password = loginRequest.password || '';
    }
  }
