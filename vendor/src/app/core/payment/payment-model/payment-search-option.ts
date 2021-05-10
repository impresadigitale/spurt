/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class PaymentSearchOptionModel {
  public name: string;
  public optionId: number;

  constructor(paymentSearchResponse: any) {
    this.name = paymentSearchResponse.name || '';
    this.optionId = paymentSearchResponse.optionId || 0;
  }
}
