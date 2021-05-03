/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';

import * as fromSettings from './settings.reducer';
import { AppState } from '../../app.state.interface';

export const getState = (State: AppState) => State.settings;

export const createCoupon = createSelector(getState, fromSettings.createCoupon);
export const createCouponLoading = createSelector(getState, fromSettings.createCouponLoading);
export const createCouponLoaded = createSelector(getState, fromSettings.createCouponLoaded);
export const createCouponFailed = createSelector(getState, fromSettings.createCouponFailed);

export const productList = createSelector(getState, fromSettings.productList);
export const productListLoading = createSelector(getState, fromSettings.productListLoading);
export const productListLoaded = createSelector(getState, fromSettings.productListLoaded);
export const productListFailed = createSelector(getState, fromSettings.productListFailed);

export const categoryList = createSelector(getState, fromSettings.categoryList);
export const categoryListLoading = createSelector(getState, fromSettings.categoryListLoading);
export const categoryListLoaded = createSelector(getState, fromSettings.categoryListLoaded);
export const categoryListFailed = createSelector(getState, fromSettings.categoryListFailed);

export const couponList = createSelector(getState, fromSettings.couponList);
export const couponListCount = createSelector(getState, fromSettings.couponListCount);
export const couponListLoading = createSelector(getState, fromSettings.couponListLoading);
export const couponListLoaded = createSelector(getState, fromSettings.couponListLoaded);
export const couponListFailed = createSelector(getState, fromSettings.couponListFailed);

export const couponUsageList = createSelector(getState, fromSettings.couponUsageList);
export const couponUsageListLoading = createSelector(getState, fromSettings.couponUsageListLoading);
export const couponUsageListLoaded = createSelector(getState, fromSettings.couponUsageListLoaded);
export const couponUsageListFailed = createSelector(getState, fromSettings.couponUsageListFailed);

export const deleteCoupon = createSelector(getState, fromSettings.deleteCoupon);
export const deleteCouponLoading = createSelector(getState, fromSettings.deleteCouponLoading);
export const deleteCouponLoaded = createSelector(getState, fromSettings.deleteCouponLoaded);
export const deleteCouponFailed = createSelector(getState, fromSettings.deleteCouponFailed);

export const couponDetails = createSelector(getState, fromSettings.couponDetails);
export const couponDetailsLoading = createSelector(getState, fromSettings.couponDetailsLoading);
export const couponDetailsLoaded = createSelector(getState, fromSettings.couponDetailsLoaded);
export const couponDetailsFailed = createSelector(getState, fromSettings.couponDetailsFailed);

export const updateCoupon = createSelector(getState, fromSettings.updateCoupon);
export const updateCouponLoading = createSelector(getState, fromSettings.updateCouponLoading);
export const updateCouponLoaded = createSelector(getState, fromSettings.updateCouponLoaded);
export const updateCouponFailed = createSelector(getState, fromSettings.updateCouponFailed);
