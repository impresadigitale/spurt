/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
// Model
import { CoupondeleteForm } from '../models/coupondelete.model';
import { CouponForm } from '../models/coupon.model';
import { CouponupdateForm } from '../models/couponupdate.model';
import { CouponlistForm } from '../models/couponlist.model';
import { CouponcountForm } from '../models/couponcount.model';

export const ActionTypes = {
  DO_COUPON_LIST: type('[List] Do Couponlist'),
  DO_COUPON_LIST_SUCCESS: type('[List] Do Couponlist Success'),
  DO_COUPON_LIST_FAIL: type('[List] Do Couponlist Fail'),

  DO_DELETE_COUPON: type('[Delete] Do Delete Coupon'),
  DO_DELETE_COUPON_SUCCESS: type('[Delete] Do Delete Coupon Success'),
  DO_DELETE_COUPON_FAIL: type('[Delete] Do Delete Coupon Fail'),

  DO_GET_COUPON: type('[get] Do get Coupon'),
  DO_GET_COUPON_SUCCESS: type('[get] Do get Coupon Success'),
  DO_GET_COUPON_FAIL: type('[get] Do get Coupon Fail'),

  DO_UPDATECOUPON: type('[Add] Do Update Coupon'),
  DO_UPDATECOUPON_SUCCESS: type('[Add] Do Update Coupon Success'),
  DO_UPDATECOUPON_FAIL: type('[Add] Do Update Coupon Fail'),

  DO_ADDCOUPON: type('[Coupon] Do AddCoupon'),
  DO_ADDCOUPON_SUCCESS: type('[Coupon] Do AddCoupon Success'),
  DO_ADDCOUPON_FAIL: type('[Coupon] Do AddCoupon Fail'),

  DO_COUPONCOUNT: type('[Listcount] Do Couponlistcount'),
  DO_COUPONCOUNT_SUCCESS: type(
    '[Listcount] Do Couponlistcount Success'
  ),
  DO_COUPONCOUNT_FAIL: type('[Listcount] Do Couponlistcount Fail'),

  DO_PRODUCT_REMOVE: type('[PRemove] Do Products Remove'),
  DO_PRODUCT_ADD: type('[PAdd] Do Products Add'),

  GET_PRODUCT_LIST: type('[List] Get Product List'),
  GET_PRODUCT_LIST_SUCCESS: type('[List] Get Product List Success'),
  GET_PRODUCT_LIST_FAIL: type('[List] Get Product List Fail'),
};

// coupon list action
export class DoCouponlistAction implements Action {
  type = ActionTypes.DO_COUPON_LIST;

  constructor(public payload: CouponlistForm) {}
}

export class DoCouponlistSuccessAction implements Action {
  type = ActionTypes.DO_COUPON_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCouponlistFailAction implements Action {
  type = ActionTypes.DO_COUPON_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// coupon count action

export class DoCouponcountAction implements Action {
  type = ActionTypes.DO_COUPONCOUNT;

  constructor(public payload: CouponcountForm) {}
}

export class DoCouponcountSuccessAction implements Action {
  type = ActionTypes.DO_COUPONCOUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCatcountFailAction implements Action {
  type = ActionTypes.DO_COUPONCOUNT_FAIL;

  constructor(public payload: any = null) {}
}

// coupon delete action
export class DoDeleteCouponAction implements Action {
  type = ActionTypes.DO_DELETE_COUPON;

  constructor(public payload: CoupondeleteForm) {}
}

export class DoDeleteCouponSuccessAction implements Action {
  type = ActionTypes.DO_DELETE_COUPON_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeleteCouponFailAction implements Action {
  type = ActionTypes.DO_DELETE_COUPON_FAIL;

  constructor(public payload: any = null) {}
}

// coupon delete action
export class DoGetCouponAction implements Action {
  type = ActionTypes.DO_GET_COUPON;

  constructor(public payload: any) {}
}

export class DoGetCouponSuccessAction implements Action {
  type = ActionTypes.DO_GET_COUPON_SUCCESS;

  constructor(public payload: any) {}
}

export class DoGetCouponFailAction implements Action {
  type = ActionTypes.DO_GET_COUPON_FAIL;

  constructor(public payload: any = null) {}
}

// coupon add action
export class DoAddCouponAction implements Action {
  type = ActionTypes.DO_ADDCOUPON;

  constructor(public payload: any) {}
}

export class DoAddCouponSuccessAction implements Action {
  type = ActionTypes.DO_ADDCOUPON_SUCCESS;

  constructor(public payload: any) {}
}

export class DoAddCouponFailAction implements Action {
  type = ActionTypes.DO_ADDCOUPON_FAIL;

  constructor(public payload: any = null) {}
}

// coupon update action
export class DoUpdateCouponAction implements Action {
  type = ActionTypes.DO_UPDATECOUPON;

  constructor(public payload: CouponupdateForm) {}
}

export class DoUpdateCouponSuccessAction implements Action {
  type = ActionTypes.DO_UPDATECOUPON_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateCouponFailAction implements Action {
  type = ActionTypes.DO_UPDATECOUPON_FAIL;

  constructor(public payload: any = null) {}
}

// product remove action
export class DoProductremoveAction implements Action {
  type = ActionTypes.DO_PRODUCT_REMOVE;

  constructor(public payload: any) {}
}

// product add action
export class DoProductaddAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD;

  constructor(public payload: any) {}
}

// get product list action

export class GetProductListAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST;
  constructor(public payload: any) {}
}

export class GetProductListSuccessAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetProductListFailAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_FAIL;
  constructor(public payload: any = null) {}
}

export type Actions =
  | DoCouponlistAction
  | DoCouponlistSuccessAction
  | DoCouponlistFailAction
  | DoCouponcountAction
  | DoCouponcountSuccessAction
  | DoCatcountFailAction
  | DoDeleteCouponAction
  | DoDeleteCouponSuccessAction
  | DoDeleteCouponFailAction
  | DoGetCouponAction
  | DoGetCouponSuccessAction
  | DoGetCouponFailAction
  | DoAddCouponAction
  | DoAddCouponSuccessAction
  | DoAddCouponFailAction
  | DoUpdateCouponAction
  | DoUpdateCouponSuccessAction
  | DoUpdateCouponFailAction
  | DoProductremoveAction
  | DoProductaddAction
  | GetProductListAction
  | GetProductListSuccessAction
  | GetProductListFailAction;
