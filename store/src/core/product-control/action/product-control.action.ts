/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { CheckoutModel } from '../models/checkout.model';
import { ProductAvailabilityModel } from '../models/product-availability.model';
import { BackorderCheckoutModel } from '../models/backorder-checkout.model';


export const ActionTypes = {

  ADD_TO_WISHLIST: type('[wishlist] add to wishlist'),
  ADD_TO_WISHLIST_SUCCESS: type('[wishlist] add to wishlist success'),
  ADD_TO_WISHLIST_FAIL: type('[wishlist] add to wishlist fail'),

  APPLY_COUPON: type('[coupon] apply coupon'),
  APPLY_COUPON_SUCCESS: type('[coupon] apply coupon success'),
  APPLY_COUPON_FAIL: type('[coupon] apply coupon fail'),


  GET_PAYMENT_SETTINGS: type('[payment] get payment type'),
  GET_PAYMENT_SETTINGS_SUCCESS: type('[payment] get payment type success'),
  GET_PAYMENT_SETTINGS_FAIL: type('[payment] get payment type fail'),

  CART_HANDLE_ACTION: type('[cart] cart handle'),

  DO_CHECKOUT: type('[checkout] do checkout '),
  DO_CHECKOUT_SUCCESS: type('[checkout] do checkout success'),
  DO_CHECKOUT_FAIL: type('[checkout] do checkout fail'),

  CHECK_PRODUCT_AVAILABILITY: type('[checkout] check product availability '),
  CHECK_PRODUCT_AVAILABILITY_SUCCESS: type('[checkout] check product availability success'),
  CHECK_PRODUCT_AVAILABILITY_FAIL: type('[checkout] check product availability fail'),

  DO_SELECTED_OPTIONS: type('[checkout] do selected options '),
  DO_SELECTED_OPTIONS_SUCCESS: type('[checkout] do selected options success'),
  DO_AVAILABLE_OPTIONS: type('[checkout] do available options '),
  DO_AVAILABLE_OPTIONS_SUCCESS: type('[checkout] do available options success '),

  DO_BACKORDER_CHECKOUT: type('[checkout] do backorder checkout '),
  DO_BACKORDER_CHECKOUT_SUCCESS: type('[checkout] do backorder checkout success'),
  DO_BACKORDER_CHECKOUT_FAIL: type('[checkout] do backorder checkout fail'),

  HANDLE_BACKORDER_ACTION: type('[backorder] backorder handle'),
  DO_BACKORDER_SELECTED_OPTIONS: type('[checkout] do Backorder selected options '),
  CLEAR_BACKORDER_CHECKOUT: type('[checkout] Clear Backorder Checkout '),

  MAKE_QUATATION: type('[quatation] make quatation'),
  MAKE_QUATATION_SUCCESS: type('[quatation] make quatation success'),
  MAKE_QUATATION_FAIL: type('[quatation] make quatation fail'),


};
/* add to wishlist action*/

export class AddtoWishlist implements Action {
  type = ActionTypes.ADD_TO_WISHLIST;

  constructor(public payload: any) {}
}

export class AddtoWishlistSuccess implements Action {
  type = ActionTypes.ADD_TO_WISHLIST_SUCCESS;

  constructor(public payload: any) {}
}
export class AddtoWishlistFail implements Action {
  type = ActionTypes.ADD_TO_WISHLIST_FAIL;

  constructor(public payload: any) {}
}
/* add to wishlist action*/

export class ApplyCoupon implements Action {
  type = ActionTypes.APPLY_COUPON;

  constructor(public payload: any) {}
}

export class ApplyCouponSuccess implements Action {
  type = ActionTypes.APPLY_COUPON_SUCCESS;

  constructor(public payload: any) {}
}
export class ApplyCouponFail implements Action {
  type = ActionTypes.APPLY_COUPON_FAIL;

  constructor(public payload: any) {}
}


/* get payment settings action*/

export class GetPaymentSettings implements Action {
  type = ActionTypes.GET_PAYMENT_SETTINGS;

  constructor(public payload: any) {}
}

export class GetPaymentSettingsSuccess implements Action {
  type = ActionTypes.GET_PAYMENT_SETTINGS_SUCCESS;

  constructor(public payload: any) {}
}
export class GetPaymentSettingsFail implements Action {
  type = ActionTypes.GET_PAYMENT_SETTINGS_FAIL;

  constructor(public payload: any) {}
}

/* cart handle action*/

export class CartHandleAction implements Action {
  type = ActionTypes.CART_HANDLE_ACTION;
  constructor(public payload: any) {
  }
}


/*available options */
export class AavailableOptionsAction implements Action {
  type = ActionTypes.DO_AVAILABLE_OPTIONS;

  constructor(public payload: any) {}
}
export class AavailableOptionsSuccessAction implements Action {
  type = ActionTypes.DO_AVAILABLE_OPTIONS_SUCCESS;

  constructor(public payload: any) {}
}
/*selected options */
export class SelectedOptionsAction implements Action {
  type = ActionTypes.DO_SELECTED_OPTIONS;

  constructor(public payload: any) {}
}
export class SelectedOptionsSuccessAction implements Action {
  type = ActionTypes.DO_SELECTED_OPTIONS_SUCCESS;

  constructor(public payload: any) {}
}
/* product checkout action*/

export class DoCheckoutAction implements Action {
  type = ActionTypes.DO_CHECKOUT;

  constructor(public payload: CheckoutModel) {

  }
}
export class CheckoutActionSuccess implements Action {
  type = ActionTypes.DO_CHECKOUT_SUCCESS;

  constructor(public payload: any) {}
}
export class CheckoutActionFail implements Action {
  type = ActionTypes.DO_CHECKOUT_FAIL;

  constructor(public payload: any) {}
}
/* check product availability action*/

export class CheckProductAvailability implements Action {
  type = ActionTypes.CHECK_PRODUCT_AVAILABILITY;

  constructor(public payload: ProductAvailabilityModel) {}
}
export class CheckProductAvailabilitySuccess implements Action {
  type = ActionTypes.CHECK_PRODUCT_AVAILABILITY_SUCCESS;

  constructor(public payload: any) {}
}
export class CheckProductAvailabilityFail implements Action {
  type = ActionTypes.CHECK_PRODUCT_AVAILABILITY_FAIL;

  constructor(public payload: any) {}
}

/* backorder checkout action*/

export class DoBackorderCheckoutAction implements Action {
  type = ActionTypes.DO_BACKORDER_CHECKOUT;
  constructor(public payload: BackorderCheckoutModel) {
  }
}
export class DoBackorderCheckoutSuccess implements Action {
  type = ActionTypes.DO_BACKORDER_CHECKOUT_SUCCESS;
  constructor(public payload: any) {}
}
export class DoBackorderCheckoutFail implements Action {
  type = ActionTypes.DO_BACKORDER_CHECKOUT_FAIL;
  constructor(public payload: any) {}
}

/*handle backorder action*/

export class HandleBackorderAction implements Action {
  type = ActionTypes.HANDLE_BACKORDER_ACTION;
  constructor(public payload: any) {}
}

/*selected backorder product options */

export class SelectedBackorderOptionsAction implements Action {
  type = ActionTypes.DO_BACKORDER_SELECTED_OPTIONS;
  constructor(public payload: any) {}
}

export class ClearBackorderCheckoutAction implements Action {
  type = ActionTypes.CLEAR_BACKORDER_CHECKOUT;
  constructor(public payload: any = null) {}
}

// make quatation
export class MakeQuatationAction implements Action {
  type = ActionTypes.MAKE_QUATATION;
  constructor(public payload: any) {}
}
export class MakeQuatationSuccess implements Action {
  type = ActionTypes.MAKE_QUATATION_SUCCESS;
  constructor(public payload: any) {}
}
export class MakeQuatationFail implements Action {
  type = ActionTypes.MAKE_QUATATION_FAIL;
  constructor(public payload: any) {}
}



export type Actions =
  | AddtoWishlist
  | AddtoWishlistSuccess
  | AddtoWishlistFail
  | ApplyCoupon
  | ApplyCouponSuccess
  | ApplyCouponFail
  | SelectedOptionsAction
  | SelectedOptionsSuccessAction
  | CartHandleAction
  | DoCheckoutAction
  | CheckoutActionSuccess
  | CheckoutActionFail
  | GetPaymentSettings
  | GetPaymentSettingsSuccess
  | GetPaymentSettingsFail
  | CheckProductAvailability
  | CheckProductAvailabilitySuccess
  | CheckProductAvailabilityFail
  | DoBackorderCheckoutAction
  | DoBackorderCheckoutSuccess
  | DoBackorderCheckoutFail;
