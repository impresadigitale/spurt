/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Map, Record } from 'immutable';

export interface CouponState extends Map<string, any> {
  couponListnCount: any;
  couponList: any;
  couponListFilter: any;
  couponDoDelete: any;
  couponDoGet: any;
  addCatagoryStatus: any;
  addCatagoryData: any;
  updateCatagory: any;
  couponCountData: any;
  updateCouponBadresponse: any;

  deleteCouponResponse: any;
  deleteCouponRequestLoading: any;
  deleteCouponRequestLoaded: any;
  deleteCouponRequestFailed: any;

  getCouponResponse: any;
  getCouponRequestLoading: any;
  getCouponRequestLoaded: any;
  getCouponRequestFailed: any;

  couponCountResponse: any;
  couponCountRequestLoading: any;
  couponCountRequestLoaded: any;
  couponCountRequestFailed: any;

  couponListResponse: any;
  couponListRequestLoading: any;
  couponListRequestLoaded: any;
  couponListRequestFailed: any;

  updateCouponResponse: any;
  updateCouponRequestLoading: any;
  updateCouponRequestLoaded: any;
  updateCouponRequestFailed: any;

  productRemoveResponse: any;
  productRemoveRequestLoading: any;
  productRemoveRequestLoaded: any;
  productRemoveRequestFailed: any;

  productAddResponse: any;
  productAddRequestLoading: any;
  productAddRequestLoaded: any;
  productAddRequestFailed: any;

  addCouponResponse: any;
  addCouponRequestLoading: any;
  addCouponRequestLoaded: any;
  addCouponRequestFailed: any;

  getProductList: any;
  getProductListLoading: any;
  getProductListLoaded: any;
  getProductListFailed: any;
}

export const CouponStateRecord = Record({
  couponListnCount: {},
  couponList: [],
  couponListFilter: {},
  couponDoDelete: {},
  couponDoGet: {},
  addCatagory: {},
  addCatagoryData: {},
  updateCatagory: {},
  couponCountData: {},
  updateCouponBadresponse: {},
  addCatagoryStatus: {},

  deleteCouponResponse: {},
  deleteCouponRequestLoading: {},
  deleteCouponRequestLoaded: {},
  deleteCouponRequestFailed: {},

  getCouponResponse: {},
  getCouponRequestLoading: {},
  getCouponRequestLoaded: {},
  getCouponRequestFailed: {},

  couponCountResponse: {},
  couponCountRequestLoading: {},
  couponCountRequestLoaded: {},
  couponCountRequestFailed: {},

  couponListResponse: {},
  couponListRequestLoading: {},
  couponListRequestLoaded: {},
  couponListRequestFailed: {},

  updateCouponResponse: {},
  updateCouponRequestLoading: {},
  updateCouponRequestLoaded: {},
  updateCouponRequestFailed: {},

  productRemoveResponse: {},
  productRemoveRequestLoading: {},
  productRemoveRequestLoaded: {},
  productRemoveRequestFailed: {},

  productAddResponse: {},
  productAddRequestLoading: {},
  productAddRequestLoaded: {},
  productAddRequestFailed: {},

  addCouponResponse: {},
  addCouponRequestLoading: {},
  addCcouponRequestLoaded: {},
  addCouponRequestFailed: {},

  getProductList: [],
  getProductListLoading: false,
  getProductListLoaded: false,
  getProductListFailed: false,
});
