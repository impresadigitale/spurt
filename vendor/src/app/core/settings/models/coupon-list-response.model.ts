/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class CouponListResponseModel {

  public couponCode: string;
  public couponName: string;
  public couponType: number;
  public discount: number;
  public endDate: string;
  public isActive: number;
  public leftDays: number;
  public orders: number;
  public startDate: string;
  public vendorCouponId: number;

  constructor(couponResponse: any) {
    this.couponCode = couponResponse.couponCode || '';
    this.couponName = couponResponse.couponName || '';
    this.couponType = couponResponse.couponType;
    this.discount = couponResponse.discount || '';
    this.endDate = couponResponse.endDate || '';
    this.isActive = couponResponse.isActive;
    this.leftDays = couponResponse.leftDays || '';
    this.orders = couponResponse.orders;
    this.startDate = couponResponse.startDate || '';
    this.vendorCouponId = couponResponse.vendorCouponId;

  }
}
