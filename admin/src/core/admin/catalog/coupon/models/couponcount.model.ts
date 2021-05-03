/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class CouponcountForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public sortOrder: string;
  public count: string;

  constructor(couponcountForm: any) {
    this.limit = couponcountForm.limit || '';
    this.offset = couponcountForm.offset || '';
    this.keyword = couponcountForm.keyword || '';
    this.sortOrder = couponcountForm.sortOrder || '';
    this.count = couponcountForm.count || '';
  }
}
