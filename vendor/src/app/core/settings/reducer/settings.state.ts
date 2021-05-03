/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface SettingsState extends Map<string, any> {

  createCoupon: any;
  createCouponLoading: boolean;
  createCouponLoaded: boolean;
  createCouponFailed: boolean;

  categoryList: any;
  categoryListLoading: boolean;
  categoryListLoaded: boolean;
  categoryListFailed: boolean;

  productList: any;
  productListLoading: boolean;
  productListLoaded: boolean;
  productListFailed: boolean;

  couponList: any;
  couponListLoading: boolean;
  couponListLoaded: boolean;
  couponListFailed: boolean;

  couponUsageList: any;
  couponUsageListLoading: boolean;
  couponUsageListLoaded: boolean;
  couponUsageListFailed: boolean;

  couponListCount: any;
  couponListCountLoading: boolean;
  couponListCountLoaded: boolean;
  couponListCountFailed: boolean;

  deleteCoupon: any;
  deleteCouponLoading: boolean;
  deleteCouponLoaded: boolean;
  deleteCouponFailed: boolean;

  couponDetails: any;
  couponDetailsLoading: boolean;
  couponDetailsLoaded: boolean;
  couponDetailsFailed: boolean;

  updateCoupon: any;
  updateCouponLoading: boolean;
  updateCouponLoaded: boolean;
  updateCouponFailed: boolean;
}

export const SettingsRecord = Record({

  createCoupon: [],
  createCouponLoading: false,
  createCouponLoaded: false,
  createCouponFailed: false,

  categoryList: [],
  categoryListLoading: false,
  categoryListLoaded: false,
  categoryListFailed: false,

  productList: [],
  productListLoading: false,
  productListLoaded: false,
  productListFailed: false,

  couponList: [],
  couponListLoading: false,
  couponListLoaded: false,
  couponListFailed: false,

  couponUsageList: [],
  couponUsageListLoading: false,
  couponUsageListLoaded: false,
  couponUsageListFailed: false,

  couponListCount: [],
  couponListCountLoading: false,
  couponListCountLoaded: false,
  couponListCountFailed: false,

  deleteCoupon: [],
  deleteCouponLoading: false,
  deleteCouponLoaded: false,
  deleteCouponFailed: false,

  couponDetails: [],
  couponDetailsLoading: false,
  couponDetailsLoaded: false,
  couponDetailsFailed: false,

  updateCoupon: [],
  updateCouponLoading: false,
  updateCouponLoaded: false,
  updateCouponFailed: false,

});
