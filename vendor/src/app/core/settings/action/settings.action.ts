/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Action} from '@ngrx/store';
import {type} from '../../shared/utility/utilityHelpers';

export const ActionTypes = {

    CREATE_COUPON: type('[Settings] Create Coupon'),
    CREATE_COUPON_SUCCESS: type('[Settings] Create Coupon success'),
    CREATE_COUPON_FAIL: type('[Settings] Create Coupon fail'),

    CATEGORY_LIST: type('[Settings] Category List'),
    CATEGORY_LIST_SUCCESS: type('[Settings] Category List success'),
    CATEGORY_LIST_FAIL: type('[Settings] Category List fail'),

    PRODUCT_LIST: type('[Settings] Product List'),
    PRODUCT_LIST_SUCCESS: type('[Settings] Product List success'),
    PRODUCT_LIST_FAIL: type('[Settings] Product List fail'),

    COUPON_LIST: type('[Settings] Coupon List'),
    COUPON_LIST_SUCCESS: type('[Settings] Coupon List success'),
    COUPON_LIST_FAIL: type('[Settings] Coupon List fail'),

    COUPON_USAGE_LIST: type('[Settings] Coupon Usage List'),
    COUPON_USAGE_LIST_SUCCESS: type('[Settings] Coupon Usage List success'),
    COUPON_USAGE_LIST_FAIL: type('[Settings] Coupon Usage List fail'),

    COUPON_LIST_COUNT: type('[Settings] Coupon List Count'),
    COUPON_LIST_COUNT_SUCCESS: type('[Settings] Coupon List Count success'),
    COUPON_LIST_COUNT_FAIL: type('[Settings] Coupon List Count fail'),

    DELETE_COUPON: type('[Settings] Coupon Delete'),
    DELETE_COUPON_SUCCESS: type('[Settings] Coupon Delete success'),
    DELETE_COUPON_FAIL: type('[Settings] Coupon Delete fail'),

    GET_COUPON_DETAILS: type('[Settings] Coupon Details'),
    GET_COUPON_DETAILS_SUCCESS: type('[Settings] Coupon Details success'),
    GET_COUPON_DETAILS_FAIL: type('[Settings] Coupon Details fail'),

    UPDATE_COUPON: type('[Settings] Coupon Update'),
    UPDATE_COUPON_SUCCESS: type('[Settings] Coupon Update success'),
    UPDATE_COUPON_FAIL: type('[Settings] Coupon Update fail'),

    CLEAR: type('[Settings] Clear State Variables'),


};


/* create coupon actions*/

export class CreateCouponAction implements Action {
    type = ActionTypes.CREATE_COUPON;
    constructor(public payload: any) {
    }
}

export class CreateCouponSuccess implements Action {
    type = ActionTypes.CREATE_COUPON_SUCCESS;
    constructor(public payload: any) {
    }
}

export class CreateCouponFail implements Action {
    type = ActionTypes.CREATE_COUPON_FAIL;
    constructor(public payload = null) {
    }
}

/* category list actions*/

export class CategoryListAction implements Action {
    type = ActionTypes.CATEGORY_LIST;
    constructor(public payload: any) {
    }
}

export class CategoryListSuccess implements Action {
    type = ActionTypes.CATEGORY_LIST_SUCCESS;
    constructor(public payload: any) {
    }
}

export class CategoryListFail implements Action {
    type = ActionTypes.CATEGORY_LIST_FAIL;
    constructor(public payload = null) {
    }
}

/* product list actions*/

export class ProductListAction implements Action {
    type = ActionTypes.PRODUCT_LIST;
    constructor(public payload: any) {
    }
}

export class ProductListSuccess implements Action {
    type = ActionTypes.PRODUCT_LIST_SUCCESS;
    constructor(public payload: any) {
    }
}

export class ProductListFail implements Action {
    type = ActionTypes.PRODUCT_LIST_FAIL;
    constructor(public payload = null) {
    }
}

/* Coupon list actions*/

export class CouponListAction implements Action {
    type = ActionTypes.COUPON_LIST;
    constructor(public payload: any) {
    }
}

export class CouponListSuccess implements Action {
    type = ActionTypes.COUPON_LIST_SUCCESS;
    constructor(public payload: any) {
    }
}

export class CouponListFail implements Action {
    type = ActionTypes.COUPON_LIST_FAIL;
    constructor(public payload = null) {
    }
}
/* Coupon usage list actions*/

export class CouponUsageListAction implements Action {
    type = ActionTypes.COUPON_USAGE_LIST;
    constructor(public payload: any) {
    }
}

export class CouponUsageListSuccess implements Action {
    type = ActionTypes.COUPON_USAGE_LIST_SUCCESS;
    constructor(public payload: any) {
    }
}

export class CouponUsageListFail implements Action {
    type = ActionTypes.COUPON_USAGE_LIST_FAIL;
    constructor(public payload = null) {
    }
}
/* Coupon list Count actions*/

export class CouponListCountAction implements Action {
    type = ActionTypes.COUPON_LIST_COUNT;
    constructor(public payload: any) {
    }
}

export class CouponListCountSuccess implements Action {
    type = ActionTypes.COUPON_LIST_COUNT_SUCCESS;
    constructor(public payload: any) {
    }
}

export class CouponListCountFail implements Action {
    type = ActionTypes.COUPON_LIST_COUNT_FAIL;
    constructor(public payload = null) {
    }
}

/* Coupon Delete*/

export class DeleteCouponAction implements Action {
    type = ActionTypes.DELETE_COUPON;
    constructor(public payload: any) {
    }
}

export class DeleteCouponSuccess implements Action {
    type = ActionTypes.DELETE_COUPON_SUCCESS;
    constructor(public payload: any) {
    }
}

export class DeleteCouponFail implements Action {
    type = ActionTypes.DELETE_COUPON_FAIL;
    constructor(public payload = null) {
    }
}

/* Get Coupon Details*/

export class GetCouponDetailsAction implements Action {
    type = ActionTypes.GET_COUPON_DETAILS;
    constructor(public payload: any) {
    }
}

export class GetCouponDetailsSuccess implements Action {
    type = ActionTypes.GET_COUPON_DETAILS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class GetCouponDetailsFail implements Action {
    type = ActionTypes.GET_COUPON_DETAILS_FAIL;
    constructor(public payload = null) {
    }
}

/* Coupon Update*/

export class UpdateCouponAction implements Action {
    type = ActionTypes.UPDATE_COUPON;
    constructor(public payload: any) {
    }
}

export class UpdateCouponSuccess implements Action {
    type = ActionTypes.UPDATE_COUPON_SUCCESS;
    constructor(public payload: any) {
    }
}

export class UpdateCouponFail implements Action {
    type = ActionTypes.UPDATE_COUPON_FAIL;
    constructor(public payload = null) {
    }
}

// clear state variable to prevent subscribe

export class ClearAction implements Action {
    type = ActionTypes.CLEAR;
    constructor(public payload = null) {
    }
}

export type Actions =
        CreateCouponAction
      | CreateCouponSuccess
      | CreateCouponFail
      | CategoryListAction
      | CategoryListSuccess
      | CategoryListFail
      | ProductListAction
      | ProductListSuccess
      | ProductListFail
      | CouponListAction
      | CouponListSuccess
      | CouponListFail
      | CouponUsageListAction
      | CouponUsageListSuccess
      | CouponUsageListFail
      | ClearAction
      | CouponListCountAction
      | CouponListCountSuccess
      | CouponListCountFail
      | DeleteCouponAction
      | DeleteCouponSuccess
      | DeleteCouponFail
      | GetCouponDetailsAction
      | GetCouponDetailsSuccess
      | GetCouponDetailsFail
      | UpdateCouponAction
      | UpdateCouponSuccess
      | UpdateCouponFail;
