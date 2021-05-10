/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import * as actions from '../action/coupon.action';
// state
import { CouponState, CouponStateRecord } from '././coupon.state';
// model
import { CouponlistResponseModel } from '../models/couponlist.response.model';
import { CouponResponseModel } from '../models/coupon.response.model';

export const initialState: CouponState = new CouponStateRecord() as unknown as CouponState;

export function reducer(
  state = initialState,
  { type, payload }: any
): CouponState {
  if (!type) {
    return state;
  }

  switch (type) {


// <-------------COUPON LIST--------------> //

    case actions.ActionTypes.DO_COUPON_LIST: {
      return Object.assign({}, state, {
        couponListResponse: false,
        couponListRequestLoading: true,
        couponListRequestLoaded: false,
        couponListRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_COUPON_LIST_SUCCESS: {
      return Object.assign({}, state, {
        couponList: payload.data,
        couponListResponse: true,
        couponListRequestLoading: false,
        couponListRequestLoaded: false,
        couponListRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_COUPON_LIST_FAIL: {
      return Object.assign({}, state, {
        couponCountResponse: false,
        couponCountRequestLoading: false,
        couponCountRequestLoaded: true,
        couponCountRequestFailed: true
      });
    }

// <-------------DELETE COUPON--------------> //

    case actions.ActionTypes.DO_DELETE_COUPON: {
      return Object.assign({}, state, {
        deleteCouponResponse: false,
        deleteCouponRequestLoading: true,
        deleteCouponRequestLoaded: false,
        deleteCouponRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_DELETE_COUPON_SUCCESS: {
      return Object.assign({}, state, {
        couponDoDelete: payload,
        deleteCouponResponse: true,
        deleteCouponRequestLoading: false,
        deleteCouponRequestLoaded: false,
        deleteCouponRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_DELETE_COUPON_FAIL: {
      return Object.assign({}, state, {
        deleteCouponResponse: false,
        deleteCouponRequestLoading: false,
        deleteCouponRequestLoaded: true,
        deleteCouponRequestFailed: true
      });
    }

// <-------------GET COUPON DETAILS--------------> //

    case actions.ActionTypes.DO_GET_COUPON: {
      return Object.assign({}, state, {
        getCouponResponse: false,
        getCouponRequestLoading: true,
        getCouponRequestLoaded: false,
        getCouponRequestFailed: false,
        couponDoGet: {}
      });
    }

    case actions.ActionTypes.DO_GET_COUPON_SUCCESS: {
      return Object.assign({}, state, {
        couponDoGet: payload.data,
        getCouponResponse: true,
        getCouponRequestLoading: false,
        getCouponRequestLoaded: false,
        getCouponRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_GET_COUPON_FAIL: {
      return Object.assign({}, state, {
        getCouponResponse: false,
        getCouponRequestLoading: false,
        getCouponRequestLoaded: true,
        getCouponRequestFailed: true,
        couponDoGet: {}

      });
    }

// <-------------ADD COUPON--------------> //

    case actions.ActionTypes.DO_ADDCOUPON: {
      return Object.assign({}, state, {
        addCouponResponse: false,
        addCouponRequestLoading: true,
        addCouponRequestLoaded: false,
        addCouponRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_ADDCOUPON_SUCCESS: {
      return Object.assign({}, state, {
        addCatagoryStatus: payload,
        addCouponRequestLoading: false,
        addCouponRequestLoaded: true,
        addCouponRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_ADDCOUPON_FAIL: {
      return Object.assign({}, state, {
        addCouponResponse: false,
        addCouponRequestLoading: false,
        addCouponRequestLoaded: true,
        addCouponRequestFailed: true
      });
    }

// <-------------UPDATE COUPON--------------> //


    case actions.ActionTypes.DO_UPDATECOUPON: {
      return Object.assign({}, state, {
        updateCouponResponse: false,
        updateCouponRequestLoading: true,
        updateCouponRequestLoaded: false,
        updateCouponRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_UPDATECOUPON_SUCCESS: {
      return Object.assign({}, state, {
        updateCatagory: payload,
        updateCouponResponse: true,
        updateCouponRequestLoading: false,
        updateCouponRequestLoaded: false,
        updateCouponRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_UPDATECOUPON_FAIL: {
      return Object.assign({}, state, {
        updateCouponBadresponse: payload,
        updateCouponResponse: false,
        updateCouponRequestLoading: false,
        updateCouponRequestLoaded: true,
        updateCouponRequestFailed: true
      });
    }

// <-------------PRODUCT REMOVE--------------> //

    case actions.ActionTypes.DO_PRODUCT_REMOVE: {
      const Data: any = state.couponList;

      for (let i = 0; i < Data.length; i++) {
        if (i === payload) {
          Data.splice(payload, 1);
        }
      }
      return Object.assign({}, state, {
        productRemoveList: Data,
        productRemoveResponse: false,
        productRemoveRequestLoading: true,
        productRemoveRequestLoaded: false,
        productRemoveRequestFailed: false
      });
    }

    // product add action

    case actions.ActionTypes.DO_PRODUCT_ADD: {
      const Data: any = state.couponList;

      Data.push(payload);

      return Object.assign({}, state, {
        couponList: Data,
        productAddResponse: false,
        productAddRequestLoading: true,
        productAddRequestLoaded: false,
        productAddRequestFailed: false
      });
    }


// <-------------GET COUPON COUNT--------------> //

    case actions.ActionTypes.DO_COUPONCOUNT: {
      return Object.assign({}, state, {
        couponCountResponse: false,
        couponCountRequestLoading: true,
        couponCountRequestLoaded: false,
        couponCountRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_COUPONCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        couponListnCount: payload.data,
        couponCountResponse: true,
        couponCountRequestLoading: false,
        couponCountRequestLoaded: false,
        couponCountRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_COUPONCOUNT_FAIL: {
      return Object.assign({}, state, {
        couponCountResponse: false,
        couponCountRequestLoading: false,
        couponCountRequestLoaded: true,
        couponCountRequestFailed: true
      });
    }

// <-------------GET PRODUCT LIST FOR DROPDOWN --------------> //

      case actions.ActionTypes.GET_PRODUCT_LIST: {
        return Object.assign({}, state, {
          getProductListLoading: true,
          getProductListLoaded: false,
          getProductListFailed: false,
        });
      }

      case actions.ActionTypes.GET_PRODUCT_LIST_SUCCESS: {
        return Object.assign({}, state, {
          getProductList: payload.data,
          getProductListLoading: false,
          getProductListLoaded: true,
          getProductListFailed: false,
        });
      }

      case actions.ActionTypes.GET_PRODUCT_LIST_FAIL: {
        return Object.assign({}, state, {
          getProductListLoading: false,
          getProductListLoaded: false,
          getProductListFailed: true,
        });
      }

    default: {
      return state;
    }
  }
}

// coupon count action
export const getCouponListnCount = (state: CouponState) =>
  state.couponListnCount;
export const getCouponCountResponse = (state: CouponState) =>
  state.couponCountResponse;
export const getCouponCountRequestLoading = (state: CouponState) =>
  state.couponCountRequestLoading;
export const getCouponCountRequestLoaded = (state: CouponState) =>
  state.couponCountRequestLoaded;
export const getCouponCountRequestFailed = (state: CouponState) =>
  state.couponCountRequestFailed;
export const getCouponCountdata = (state: CouponState) =>
  state.couponCountData;
// coupon list action
export const getCouponList = (state: CouponState) => state.couponList;
// couponListFilter
export const getCouponFilterList = (state: CouponState) =>
  state.couponListFilter;

export const getCouponListResponse = (state: CouponState) =>
  state.couponListResponse;
export const getCouponListRequestLoading = (state: CouponState) =>
  state.couponListRequestLoading;
export const getCouponListRequestLoaded = (state: CouponState) =>
  state.couponListRequestLoaded;
export const getCouponListRequestFailed = (state: CouponState) =>
  state.couponListRequestFailed;

// coupon delete action
export const getCouponDoDelete = (state: CouponState) =>
  state.couponDoDelete;
export const getDeleteCouponResponse = (state: CouponState) =>
  state.deleteCouponResponse;
export const getDeleteCouponRequestLoading = (state: CouponState) =>
  state.deleteCouponRequestLoading;
export const getDeleteCouponRequestLoaded = (state: CouponState) =>
  state.deleteCouponRequestLoaded;
export const getDeleteCouponRequestFailed = (state: CouponState) =>
  state.deleteCouponRequestFailed;
  // coupon get action
export const getCouponDoGet = (state: CouponState) =>
state.couponDoGet;
export const getGetCouponResponse = (state: CouponState) =>
state.getCouponResponse;
export const getGetCouponRequestLoading = (state: CouponState) =>
state.getCouponRequestLoading;
export const getGetCouponRequestLoaded = (state: CouponState) =>
state.getCouponRequestLoaded;
export const getGetCouponRequestFailed = (state: CouponState) =>
state.getCouponRequestFailed;
// coupon add action
export const getAddCatagoryStatus = (state: CouponState) =>
  state.addCatagoryStatus;
export const getAddCatagoryData = (state: CouponState) =>
  state.addCatagoryData;
export const getAddCouponResponse = (state: CouponState) =>
  state.addCouponResponse;
export const getAddCouponRequestLoading = (state: CouponState) =>
  state.addCouponRequestLoading;
export const getAddCouponRequestLoaded = (state: CouponState) =>
  state.addCouponRequestLoaded;
export const getAddCouponRequestFailed = (state: CouponState) =>
  state.addCouponRequestFailed;
// coupon update action
export const getUpdateCouponResponse = (state: CouponState) =>
  state.updateCouponResponse;
export const getUpdateCouponRequestLoading = (state: CouponState) =>
  state.updateCouponRequestLoading;
export const getUpdateCouponRequestLoaded = (state: CouponState) =>
  state.updateCouponRequestLoaded;
export const getUpdateCouponRequestFailed = (state: CouponState) =>
  state.updateCouponRequestFailed;
export const getUpdateCouponBadresponse = (state: CouponState) =>
  state.updateCouponBadresponse;
export const getUpdateCatagory = (state: CouponState) =>
  state.updateCatagory;
// product remove action
export const getProductRemoveResponse = (state: CouponState) =>
  state.productRemoveResponse;
export const getProductRemoveRequestLoading = (state: CouponState) =>
  state.productRemoveRequestLoading;
export const getProductRemoveRequestLoaded = (state: CouponState) =>
  state.productRemoveRequestLoaded;
export const getProductRemoveRequestFailed = (state: CouponState) =>
  state.productRemoveRequestFailed;
// product add action
export const getProductAddResponse = (state: CouponState) =>
  state.productAddResponse;
export const getProductAddRequestLoading = (state: CouponState) =>
  state.productAddRequestLoading;
export const getProductAddRequestLoaded = (state: CouponState) =>
  state.productAddRequestLoaded;
export const getProductAddRequestFailed = (state: CouponState) =>
  state.productAddRequestFailed;


export const getProductList = (state: CouponState) =>
state.getProductList;
export const getProductListLoading = (state: CouponState) =>
  state.getProductListLoading;
export const getProductListLoaded = (state: CouponState) =>
  state.getProductListLoaded;
export const getProductListFailed = (state: CouponState) =>
  state.getProductListFailed;
