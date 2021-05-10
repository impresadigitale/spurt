/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {createSelector} from 'reselect';

import * as  fromProduct from './product-control.reducer';
import {AppState} from '../../state.interface';

export const getState = (State: AppState) => State.productControl;
export const getCartList = createSelector(getState, fromProduct.getCartList);
export const getCartListCount = createSelector(getState, fromProduct.getCartListCount);
export const getTotalCartPrice = createSelector(getState, fromProduct.getTotalCartPrice);
export const getCheckedOutData = createSelector(getState, fromProduct.getCheckedOut);

export const getCheckoutLoading = createSelector(getState, fromProduct.getCheckoutLoading);
export const getCheckoutLoaded = createSelector(getState, fromProduct.getCheckoutLoaded);
export const getCheckoutFailed = createSelector(getState, fromProduct.getCheckoutFailed);

export const getOptionsAvailable = createSelector(getState, fromProduct.getOptionsAvailable);
export const paymentMode = createSelector(getState, fromProduct.getPaymentMode);
export const wishListLoading = createSelector(getState, fromProduct.getWhislistLoading);

export const getCheckProductAvailabilityData = createSelector(getState, fromProduct.getCheckProductAvailability);
export const getCheckProductAvailabilityLoading = createSelector(getState, fromProduct.getCheckProductAvailabilityLoading);
export const getCheckProductAvailabilityLoaded = createSelector(getState, fromProduct.getCheckProductAvailabilityLoaded);
export const getCheckProductAvailabilityFailed = createSelector(getState, fromProduct.getCheckProductAvailabilityFailed);

export const getApplyCoupon = createSelector(getState, fromProduct.getApplyCoupon);
export const getApplyCouponLoading = createSelector(getState, fromProduct.getApplyCouponLoading);
export const getApplyCouponLoaded = createSelector(getState, fromProduct.getApplyCouponLoaded);
export const getApplyCouponFailed = createSelector(getState, fromProduct.getApplyCouponFailed);

export const backorderCheckout = createSelector(getState, fromProduct.backorderCheckout);
export const backorderCheckoutLoading = createSelector(getState, fromProduct.backorderCheckoutLoading);
export const backorderCheckoutLoaded = createSelector(getState, fromProduct.backorderCheckoutLoaded);

export const backorder = createSelector(getState, fromProduct.backorder);
export const backorderTotal = createSelector(getState, fromProduct.backorderTotal);
export const backorderProduct = createSelector(getState, fromProduct.backorderProduct);

export const makeQuatation = createSelector(getState, fromProduct.makeQuatation);
export const makeQuatationLoading = createSelector(getState, fromProduct.makeQuatationLoading);
export const makeQuatationLoaded = createSelector(getState, fromProduct.makeQuatationLoaded);
