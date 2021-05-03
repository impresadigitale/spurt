/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

export class VieworderResponseModel {
  public orderDetails: any = {};

  constructor(Vieworder: any) {
    this.orderDetails = Vieworder || '';
  }
}
