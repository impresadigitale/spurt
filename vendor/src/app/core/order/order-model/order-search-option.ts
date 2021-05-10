/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class OrderSearchOptionModel {
  public name: string;
  public optionId: number;

  constructor(orderSearchResponse: any) {
    this.name = orderSearchResponse.name || '';
    this.optionId = orderSearchResponse.optionId || 0;
  }
}
