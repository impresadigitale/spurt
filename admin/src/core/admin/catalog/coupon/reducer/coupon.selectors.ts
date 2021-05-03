/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { createSelector } from 'reselect';
// reducer
import * as fromCoupon from '././coupon.reducer';
// app state
import { AppState } from '../../../../app.state.interface';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functionsget
 */

export const getCatState = (state: AppState) => state.coupon;
// coupon list action
export const getCouponList = createSelector(
  getCatState,
  fromCoupon.getCouponList
);
// getCouponFilterList
export const getCouponFilterList = createSelector(
  getCatState,
  fromCoupon.getCouponFilterList
);

export const getCouponListnCount = createSelector(
  getCatState,
  fromCoupon.getCouponListnCount
);
export const getCouponListResponse = createSelector(
  getCatState,
  fromCoupon.getCouponListResponse
);
export const getCouponListRequestLoading = createSelector(
  getCatState,
  fromCoupon.getCouponListRequestLoading
);
export const getCouponListRequestLoaded = createSelector(
  getCatState,
  fromCoupon.getCouponListRequestLoaded
);
export const getCouponListRequestFailed = createSelector(
  getCatState,
  fromCoupon.getCouponListRequestFailed
);
// coupon delete action
export const getCouponDoDelete = createSelector(
  getCatState,
  fromCoupon.getCouponDoDelete
);
export const getDeleteCouponResponse = createSelector(
  getCatState,
  fromCoupon.getDeleteCouponResponse
);
export const getDeleteCouponRequestLoading = createSelector(
  getCatState,
  fromCoupon.getDeleteCouponRequestLoading
);
export const getDeleteCouponRequestLoaded = createSelector(
  getCatState,
  fromCoupon.getDeleteCouponRequestLoaded
);
export const getDeleteCouponRequestFailed = createSelector(
  getCatState,
  fromCoupon.getDeleteCouponRequestFailed
);
// coupon delete action
export const getCouponDoGet = createSelector(
  getCatState,
  fromCoupon.getCouponDoGet
);
export const getGetCouponResponse = createSelector(
  getCatState,
  fromCoupon.getGetCouponResponse
);
export const getGetCouponRequestLoading = createSelector(
  getCatState,
  fromCoupon.getGetCouponRequestLoading
);
export const getGetCouponRequestLoaded = createSelector(
  getCatState,
  fromCoupon.getGetCouponRequestLoaded
);
export const getGetCouponRequestFailed = createSelector(
  getCatState,
  fromCoupon.getGetCouponRequestFailed
);
// product add action
export const getAddCatagoryStatus = createSelector(
  getCatState,
  fromCoupon.getAddCatagoryStatus
);
export const getAddCatagoryData = createSelector(
  getCatState,
  fromCoupon.getAddCatagoryData
);
export const getAddCouponResponse = createSelector(
  getCatState,
  fromCoupon.getAddCouponResponse
);
export const getAddCouponRequestLoading = createSelector(
  getCatState,
  fromCoupon.getAddCouponRequestLoading
);
export const getAddCouponRequestLoaded = createSelector(
  getCatState,
  fromCoupon.getAddCouponRequestLoaded
);
export const getAddCouponRequestFailed = createSelector(
  getCatState,
  fromCoupon.getAddCouponRequestFailed
);
// coupon update action
export const getUpdateCatagory = createSelector(
  getCatState,
  fromCoupon.getUpdateCatagory
);
export const getUpdateCouponResponse = createSelector(
  getCatState,
  fromCoupon.getUpdateCouponResponse
);
export const getUpdateCouponRequestLoading = createSelector(
  getCatState,
  fromCoupon.getUpdateCouponRequestLoading
);
export const getUpdateCouponRequestLoaded = createSelector(
  getCatState,
  fromCoupon.getUpdateCouponRequestLoaded
);
export const getUpdateCouponRequestFailed = createSelector(
  getCatState,
  fromCoupon.getUpdateCouponRequestFailed
);
// coupon count action
export const getCouponCountdata = createSelector(
  getCatState,
  fromCoupon.getCouponCountdata
);
export const getUpdateCouponBadresponse = createSelector(
  getCatState,
  fromCoupon.getUpdateCouponBadresponse
);
export const getCouponCountResponse = createSelector(
  getCatState,
  fromCoupon.getCouponCountResponse
);
export const getCouponCountRequestLoading = createSelector(
  getCatState,
  fromCoupon.getCouponCountRequestLoading
);
export const getCouponCountRequestLoaded = createSelector(
  getCatState,
  fromCoupon.getCouponCountRequestLoaded
);
export const getCouponCountRequestFailed = createSelector(
  getCatState,
  fromCoupon.getCouponCountRequestFailed
);
// product add action
export const getProductAddResponse = createSelector(
  getCatState,
  fromCoupon.getProductAddResponse
);
export const getProductAddRequestLoading = createSelector(
  getCatState,
  fromCoupon.getProductAddRequestLoading
);
export const getProductAddRequestLoaded = createSelector(
  getCatState,
  fromCoupon.getProductAddRequestLoaded
);
export const getProductAddRequestFailed = createSelector(
  getCatState,
  fromCoupon.getProductAddRequestFailed
);
// product remove action
export const getProductRemoveResponse = createSelector(
  getCatState,
  fromCoupon.getProductRemoveResponse
);
export const getProductRemoveRequestLoading = createSelector(
  getCatState,
  fromCoupon.getProductRemoveRequestLoading
);
export const getProductRemoveRequestLoaded = createSelector(
  getCatState,
  fromCoupon.getProductRemoveRequestLoaded
);
export const getProductRemoveRequestFailed = createSelector(
  getCatState,
  fromCoupon.getProductRemoveRequestFailed
);

// product list

export const getProductList = createSelector(
  getCatState,
  fromCoupon.getProductList
);
export const getProductListLoading = createSelector(
  getCatState,
  fromCoupon.getProductListLoading
);
export const getProductListLoaded = createSelector(
  getCatState,
  fromCoupon.getProductListLoaded
);
export const getProductListFailed = createSelector(
  getCatState,
  fromCoupon.getProductListFailed
);
