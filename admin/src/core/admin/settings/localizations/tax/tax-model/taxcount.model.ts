/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class TaxCountForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: number;

  constructor(taxCountForm: any) {
    this.limit = taxCountForm.limit || 0;
    this.offset = taxCountForm.offset || 0;
    this.keyword = taxCountForm.keyword || '';
    this.count = taxCountForm.count || 0;
  }
}
