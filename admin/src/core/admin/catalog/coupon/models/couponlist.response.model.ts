/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class CouponlistResponseModel {
  public couponId: any = {};
  public name: any = {};
  public image: any = {};
  public imagePath: any = {};
  public parentInt: any = {};
  public sortOrder: any = {};
  public metaTagTitle: any = {};
  public metaTagDescription: any = {};
  public metaTagKeyword: any = {};
  public isActive: number;
  public levels: string;

  constructor(couponlistResponse: any) {
    this.couponId = couponlistResponse.couponId || '';
    this.name = couponlistResponse.name || '';
    this.image = couponlistResponse.image || '';
    this.imagePath = couponlistResponse.imagePath || '';
    this.parentInt = couponlistResponse.parentInt || '';
    this.sortOrder = couponlistResponse.sortOrder || '';
    this.metaTagTitle = couponlistResponse.metaTagTitle || '';
    this.metaTagDescription = couponlistResponse.metaTagDescription || '';
    this.metaTagKeyword = couponlistResponse.metaTagKeyword || '';
    this.isActive = couponlistResponse.isActive || 0;
    this.levels = couponlistResponse.levels || '';
  }
}
