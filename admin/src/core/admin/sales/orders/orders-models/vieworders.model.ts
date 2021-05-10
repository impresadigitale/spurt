/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

export class ViewordersModel {
  public orderId: Number;
  public orderStatusId: string;


  constructor(Vieworders: any) {
    this.orderId = Vieworders.orderId || '';
    this.orderStatusId = Vieworders.orderStatusId || '';
  }
}
