/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

export class PaymentListRequestModel {
    public limit: number;
    public offset: number;
    public customerName: string;
    public startDate: string;
    public endDate: string;

    constructor(paymentListForm: any) {
      this.limit = paymentListForm.limit || '';
      this.offset = paymentListForm.offset || '';
      this.customerName = paymentListForm.customerName || '';
      this.startDate = paymentListForm.startDate || '';
      this.endDate = paymentListForm.endDate || '';
    }
  }
