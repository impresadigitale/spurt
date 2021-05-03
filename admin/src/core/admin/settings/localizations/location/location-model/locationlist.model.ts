/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class LocationlistForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: boolean;

  constructor(locationlistForm: any) {
    this.limit = locationlistForm.limit || 0;
    this.offset = locationlistForm.offset || 0;
    this.keyword = locationlistForm.keyword || '';
    this.count = locationlistForm.count || false;
  }
}
