/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/settings.action';
import { SettingsState, SettingsRecord } from './settings.state';

// models

import { ProductListResponseModel } from '../models/product-list-response.model';
import { CategoryListResponseModel } from '../models/category-list-response.model';
import { CouponListResponseModel } from '../models/coupon-list-response.model';

export const initialState: SettingsState = (new SettingsRecord() as unknown) as SettingsState;
export function reducer(
  state = initialState,
  { type, payload }: any
): SettingsState {
  if (!type) {
    return state;
  }
  switch (type) {

// <---------------CREATE COUPON----------------> //

    case actions.ActionTypes.CREATE_COUPON: {
      return Object.assign({}, state, {
        createCoupon: [],
        createCouponLoading: true,
        createCouponLoaded: false,
        createCouponFailed: false,
      });
    }

    case actions.ActionTypes.CREATE_COUPON_SUCCESS: {
      return Object.assign({}, state, {
        createCoupon: payload,
        createCouponLoading: false,
        createCouponLoaded: true,
        createCouponFailed: false,
      });
    }

    case actions.ActionTypes.CREATE_COUPON_FAIL: {
      return Object.assign({}, state, {
        createCoupon: [],
        createCouponLoading: false,
        createCouponLoaded: false,
        createCouponFailed: true,
      });
    }

// <---------------GET PRODUCT LIST FOR DROPDOWN----------------> //

     case actions.ActionTypes.PRODUCT_LIST: {
      return Object.assign({}, state, {
        productListLoading: true,
        productListLoaded: false,
        productListFailed: false,
      });
    }

    case actions.ActionTypes.PRODUCT_LIST_SUCCESS: {
      const getProductList = payload.data.map(_product => {
        const tempProduct = new ProductListResponseModel(_product);
        return tempProduct;
      });
      return Object.assign({}, state, {
        productList: getProductList,
        productListLoading: false,
        productListLoaded: true,
        productListFailed: false,
      });
    }

    case actions.ActionTypes.PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        productListLoading: false,
        productListLoaded: false,
        productListFailed: true,
      });
    }


// <---------------GET CATEGORY LIST----------------> //

    case actions.ActionTypes.CATEGORY_LIST: {
      return Object.assign({}, state, {
        categoryListLoading: true,
        categoryListLoaded: false,
        categoryListFailed: false,
      });
    }

    case actions.ActionTypes.CATEGORY_LIST_SUCCESS: {
      const getCategoryList = payload.data.map(_category => {
        const tempCategory = new CategoryListResponseModel(_category);
        return tempCategory;
      });
      return Object.assign({}, state, {
        categoryList: getCategoryList,
        categoryListLoading: false,
        categoryListLoaded: true,
        categoryListFailed: false,
      });
    }

    case actions.ActionTypes.CATEGORY_LIST_FAIL: {
      return Object.assign({}, state, {
        categoryListLoading: false,
        categoryListLoaded: false,
        categoryListFailed: true,
      });
    }

// <---------------GET COUPON LIST----------------> //

     case actions.ActionTypes.COUPON_LIST: {
      return Object.assign({}, state, {
        couponList: [],
        couponListLoading: true,
        couponListLoaded: false,
        couponListFailed: false,
      });
    }

    case actions.ActionTypes.COUPON_LIST_SUCCESS: {
      const getCouponList = payload.data.map(_coupon => {
        const tempCoupon = new CouponListResponseModel(_coupon);
        return tempCoupon;
      });
      return Object.assign({}, state, {
        couponList: getCouponList,
        couponListLoading: false,
        couponListLoaded: true,
        couponListFailed: false,
      });
    }

    case actions.ActionTypes.COUPON_LIST_FAIL: {
      return Object.assign({}, state, {
        couponList: [],
        couponListLoading: false,
        couponListLoaded: false,
        couponListFailed: true,
      });
    }


// <---------------GET COUPON USAGE LIST----------------> //

     case actions.ActionTypes.COUPON_USAGE_LIST: {
      return Object.assign({}, state, {
        couponUsageList: [],
        couponUsageListLoading: true,
        couponUsageListLoaded: false,
        couponUsageListFailed: false,
      });
    }

    case actions.ActionTypes.COUPON_USAGE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        couponUsageList: payload.data,
        couponUsageListLoading: false,
        couponUsageListLoaded: true,
        couponUsageListFailed: false,
      });
    }

    case actions.ActionTypes.COUPON_USAGE_LIST_FAIL: {
      return Object.assign({}, state, {
        couponUsageList: [],
        couponUsageListLoading: false,
        couponUsageListLoaded: false,
        couponUsageListFailed: true,
      });
    }

// <---------------COUPON LIST COUNT----------------> //

     case actions.ActionTypes.COUPON_LIST_COUNT: {
      return Object.assign({}, state, {
        couponListCount: [],
        couponListCountLoading: true,
        couponListCountLoaded: false,
        couponListCountFailed: false,
      });
    }

    case actions.ActionTypes.COUPON_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        couponListCount: payload.data,
        couponListCountLoading: false,
        couponListCountLoaded: true,
        couponListCountFailed: false,
      });
    }

    case actions.ActionTypes.COUPON_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        couponListCount: [],
        couponListCountLoading: false,
        couponListCountLoaded: false,
        couponListCountFailed: true,
      });
    }

// <---------------DELETE COUPON----------------> //

    case actions.ActionTypes.DELETE_COUPON: {
      return Object.assign({}, state, {
        deleteCoupon: [],
        deleteCouponLoading: true,
        deleteCouponLoaded: false,
        deleteCouponFailed: false,
      });
    }

    case actions.ActionTypes.DELETE_COUPON_SUCCESS: {
      return Object.assign({}, state, {
        deleteCoupon: payload,
        deleteCouponLoading: false,
        deleteCouponLoaded: true,
        deleteCouponFailed: false,
      });
    }

    case actions.ActionTypes.DELETE_COUPON_FAIL: {
      return Object.assign({}, state, {
        deleteCoupon: [],
        deleteCouponLoading: false,
        deleteCouponLoaded: false,
        deleteCouponFailed: true,
      });
    }

// <---------------GET COUPON DETAILS----------------> //

    case actions.ActionTypes.GET_COUPON_DETAILS: {
      return Object.assign({}, state, {
        couponDetails: [],
        couponDetailsLoading: true,
        couponDetailsLoaded: false,
        couponDetailsFailed: false,
      });
    }

    case actions.ActionTypes.GET_COUPON_DETAILS_SUCCESS: {
      const tempCategoryList = state.categoryList;
      const tempProductList = state.productList;
      const catList = [];
      const prodList = [];
      if (payload.data && payload.data.applicableProduct.length > 0 ) {
        tempProductList.forEach(prod1 => {
          payload.data.applicableProduct.forEach(prod2 => {
            if (prod1.productId === prod2.productId) {
              prodList.push(prod1);
            }
          });
        });
        payload.data.productList = JSON.parse(JSON.stringify(prodList));
      }
      return Object.assign({}, state, {
        couponDetails: payload.data,
        couponDetailsLoading: false,
        couponDetailsLoaded: true,
        couponDetailsFailed: false,
      });
    }

    case actions.ActionTypes.GET_COUPON_DETAILS_FAIL: {
      return Object.assign({}, state, {
        couponDetails: [],
        couponDetailsLoading: false,
        couponDetailsLoaded: false,
        couponDetailsFailed: true,
      });
    }


// <---------------UPDATE COUPON----------------> //

    case actions.ActionTypes.UPDATE_COUPON: {
      return Object.assign({}, state, {
        updateCoupon: [],
        updateCouponLoading: true,
        updateCouponLoaded: false,
        updateCouponFailed: false,
      });
    }

    case actions.ActionTypes.UPDATE_COUPON_SUCCESS: {
      return Object.assign({}, state, {
        updateCoupon: payload,
        updateCouponLoading: false,
        updateCouponLoaded: true,
        updateCouponFailed: false,
      });
    }

    case actions.ActionTypes.UPDATE_COUPON_FAIL: {
      return Object.assign({}, state, {
        updateCoupon: [],
        updateCouponLoading: false,
        updateCouponLoaded: false,
        updateCouponFailed: true,
      });
    }

    // <---------------CLEAR COUPON RELATED STATE VARIABLES----------------> //


    case actions.ActionTypes.CLEAR: {
      return Object.assign({}, state, {
        createCoupon: [],
        updateCoupon: [],
        couponDetails: [],

      });
    }

    default: {
      return state;
    }
  }
}

export const createCoupon = (state: SettingsState) => state.createCoupon;
export const createCouponLoading = (state: SettingsState) => state.createCouponLoading;
export const createCouponLoaded = (state: SettingsState) => state.createCouponLoaded;
export const createCouponFailed = (state: SettingsState) => state.createCouponFailed;

export const productList = (state: SettingsState) => state.productList;
export const productListLoading = (state: SettingsState) => state.productListLoading;
export const productListLoaded = (state: SettingsState) => state.productListLoaded;
export const productListFailed = (state: SettingsState) => state.productListFailed;

export const categoryList = (state: SettingsState) => state.categoryList;
export const categoryListLoading = (state: SettingsState) => state.categoryListLoading;
export const categoryListLoaded = (state: SettingsState) => state.categoryListLoaded;
export const categoryListFailed = (state: SettingsState) => state.categoryListFailed;

export const couponList = (state: SettingsState) => state.couponList;
export const couponListCount = (state: SettingsState) => state.couponListCount;
export const couponListLoading = (state: SettingsState) => state.couponListLoading;
export const couponListLoaded = (state: SettingsState) => state.couponListLoaded;
export const couponListFailed = (state: SettingsState) => state.couponListFailed;

export const couponUsageList = (state: SettingsState) => state.couponUsageList;
export const couponUsageListLoading = (state: SettingsState) => state.couponUsageListLoading;
export const couponUsageListLoaded = (state: SettingsState) => state.couponUsageListLoaded;
export const couponUsageListFailed = (state: SettingsState) => state.couponUsageListFailed;

export const deleteCoupon = (state: SettingsState) => state.deleteCoupon;
export const deleteCouponLoading = (state: SettingsState) => state.deleteCouponLoading;
export const deleteCouponLoaded = (state: SettingsState) => state.deleteCouponLoaded;
export const deleteCouponFailed = (state: SettingsState) => state.deleteCouponFailed;

export const couponDetails = (state: SettingsState) => state.couponDetails;
export const couponDetailsLoading = (state: SettingsState) => state.couponDetailsLoading;
export const couponDetailsLoaded = (state: SettingsState) => state.couponDetailsLoaded;
export const couponDetailsFailed = (state: SettingsState) => state.couponDetailsFailed;

export const updateCoupon = (state: SettingsState) => state.updateCoupon;
export const updateCouponLoading = (state: SettingsState) => state.updateCouponLoading;
export const updateCouponLoaded = (state: SettingsState) => state.updateCouponLoaded;
export const updateCouponFailed = (state: SettingsState) => state.updateCouponFailed;
