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
import * as fromsalesCancelOrder from './cancel-order.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const cancelOrderState = (state: AppState) => state.salesCancelOrder;

export const cancelOrderList = createSelector(cancelOrderState, fromsalesCancelOrder.cancelOrderList);
export const cancelOrderListLoading = createSelector(cancelOrderState, fromsalesCancelOrder.cancelOrderListLoading);
export const cancelOrderListLoaded = createSelector(cancelOrderState, fromsalesCancelOrder.cancelOrderListLoaded);

export const cancelOrderListCount = createSelector(cancelOrderState, fromsalesCancelOrder.cancelOrderListCount);
export const cancelOrderListCountLoading = createSelector(cancelOrderState, fromsalesCancelOrder.cancelOrderListCountLoading);
export const cancelOrderListCountLoaded = createSelector(cancelOrderState, fromsalesCancelOrder.cancelOrderListCountLoaded);

export const changeCancelOrderStatus = createSelector(cancelOrderState, fromsalesCancelOrder.changeCancelOrderStatus);
export const changeCancelOrderStatusLoading = createSelector(cancelOrderState, fromsalesCancelOrder.changeCancelOrderStatusLoading);
export const changeCancelOrderStatusLoaded = createSelector(cancelOrderState, fromsalesCancelOrder.changeCancelOrderStatusLoaded);

export const bulkStatusChange = createSelector(cancelOrderState, fromsalesCancelOrder.bulkStatusChange);
export const bulkStatusChangeLoading = createSelector(cancelOrderState, fromsalesCancelOrder.bulkStatusChangeLoading);
export const bulkStatusChangeLoaded = createSelector(cancelOrderState, fromsalesCancelOrder.bulkStatusChangeLoaded);

export const rejectedCount = createSelector(cancelOrderState, fromsalesCancelOrder.rejectedCount);
export const rejectedCountLoading = createSelector(cancelOrderState, fromsalesCancelOrder.rejectedCountLoading);
export const rejectedCountLoaded = createSelector(cancelOrderState, fromsalesCancelOrder.rejectedCountLoaded);

export const acceptedCount = createSelector(cancelOrderState, fromsalesCancelOrder.acceptedCount);
export const acceptedCountLoading = createSelector(cancelOrderState, fromsalesCancelOrder.acceptedCountLoading);
export const acceptedCountLoaded = createSelector(cancelOrderState, fromsalesCancelOrder.acceptedCountLoaded);
