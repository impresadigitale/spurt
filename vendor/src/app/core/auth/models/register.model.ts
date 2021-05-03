/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class RegisterModel {
  firstName: String;
   lastName: String;
   password: String;
   confirmPassword: String;
   emailId: String;
   phoneNumber: Number;

  constructor(registerRequest: any) {
    this.firstName = registerRequest.fName || '';
    this.lastName = registerRequest.lName || '';
    this.password = registerRequest.password || '';
    this.confirmPassword = registerRequest.confirmPassword || '';
    this.emailId = registerRequest.email || '';
    this.phoneNumber = registerRequest.phoneNumber || '';
  }
}
