/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class CouponupdateForm {
  public couponId: any;
  public name: string;
  public sortOrder: number;
  public metaTagDescription: string;
  public metaTagKeyword: string;
  public metaTagTitle: string;
  public parentInt: number;
  public image: string;
  public status: number;

  constructor(couponupdateForm: any) {
    this.couponId = couponupdateForm.couponId;
    this.name = couponupdateForm.name || '';
    this.sortOrder = couponupdateForm.sortOrder || '';
    this.metaTagDescription = couponupdateForm.metaTagDescription || '';
    this.metaTagKeyword = couponupdateForm.metaTagKeyword || '';
    this.metaTagTitle = couponupdateForm.metaTagTitle || '';
    this.parentInt = couponupdateForm.parentInt || 0;
    this.image = couponupdateForm.image || '';
    this.status = couponupdateForm.status || '';
  }
}
