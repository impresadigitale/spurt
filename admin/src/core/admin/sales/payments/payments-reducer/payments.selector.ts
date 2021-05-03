/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromsalesPayment from './payments.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const getPaymentState = (state: AppState) => state.salesPayment;

export const paymentList = createSelector(getPaymentState, fromsalesPayment.paymentList);
export const paymentListLoading = createSelector(getPaymentState, fromsalesPayment.paymentListLoading);
export const paymentListLoaded = createSelector(getPaymentState, fromsalesPayment.paymentListLoaded);
export const paymentListFailed = createSelector(getPaymentState, fromsalesPayment.paymentListFailed);

export const paymentListCount = createSelector(getPaymentState, fromsalesPayment.paymentListCount);
export const paymentListCountLoading = createSelector(getPaymentState, fromsalesPayment.paymentListCountLoading);
export const paymentListCountLoaded = createSelector(getPaymentState, fromsalesPayment.paymentListCountLoaded);
export const paymentListCountFailed = createSelector(getPaymentState, fromsalesPayment.paymentListCountFailed);

export const makePaymentArchive = createSelector(getPaymentState, fromsalesPayment.makePaymentArchive);
export const makePaymentArchiveLoading = createSelector(getPaymentState, fromsalesPayment.makePaymentArchiveLoading);
export const makePaymentArchiveLoaded = createSelector(getPaymentState, fromsalesPayment.makePaymentArchiveLoaded);
