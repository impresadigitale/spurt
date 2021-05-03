/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class EditprofileResponseModel {
  public user: any = {};

  constructor(EditprofilesResponseModel: any) {
    this.user = EditprofilesResponseModel || '';
  }
}
