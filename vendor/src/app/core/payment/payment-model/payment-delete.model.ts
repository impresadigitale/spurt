/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class PaymentDeleteModel {
  public paymentId: number;

  constructor(paymentdeleteForm: any) {
    this.paymentId = paymentdeleteForm.paymentId || '';
  }
}
