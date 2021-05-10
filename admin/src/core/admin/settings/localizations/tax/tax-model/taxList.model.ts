/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class TaxListForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public status: number;
  public count: number;

  constructor(taxlistForm: any) {
    this.limit = taxlistForm.limit || 0;
    this.offset = taxlistForm.offset || 0;
    this.keyword = taxlistForm.keyword || '';
    this.count = taxlistForm.count || 0;
    this.status = taxlistForm.status || '';
  }
}
