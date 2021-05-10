/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class DeliverySearchOptionModel {
  public name: string;
  public optionId: number;

  constructor(deliverySearchResponse: any) {
    this.name = deliverySearchResponse.name || '';
    this.optionId = deliverySearchResponse.optionId || 0;
  }
}