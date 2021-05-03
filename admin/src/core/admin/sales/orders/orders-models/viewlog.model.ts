/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

export class ViewLogModel {
    public orderId: Number;
    public orderStatusId: string;
    public createdDate: string;

    constructor(ViewLog: any) {
      this.orderId = ViewLog.orderId || '';
      this.orderStatusId = ViewLog.orderStatusId || '';
      this.createdDate = ViewLog.createdDate || '';
    }
  }
