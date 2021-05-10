/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class CurrencyNewForm {
  public title: string;
  public code: string;
  public symbolLeft: string;
  public symbolRight: string;
  public value: number;
  public status: number;
  public currencyId: number;

  constructor(currencyNewForm: any) {
    this.title = currencyNewForm.title || '';
    this.code = currencyNewForm.code || '';
    this.symbolLeft = currencyNewForm.symbolLeft || null;
    this.symbolRight = currencyNewForm.symbolRight || null;
    this.value = currencyNewForm.value || 0;
    this.status = currencyNewForm.status || 0;
    if (currencyNewForm.currencyId) {
      this.currencyId = currencyNewForm.currencyId || '';
    }
  }
}
