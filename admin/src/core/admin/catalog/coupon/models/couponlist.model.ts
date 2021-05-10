/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class CouponlistForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public sortOrder: string;
  public status: string;
  constructor(couponlistForm: any) {
    this.limit = couponlistForm.limit || '';
    this.offset = couponlistForm.offset || '';
    this.keyword = couponlistForm.keyword || '';
    this.sortOrder = couponlistForm.sortOrder || '';
    this.status = couponlistForm.status || '';
  }
}
