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
import * as fromOrders from './orders.reducer';
import { AppState } from '../../../../../app.state.interface';

export const getOrdersState = (state: AppState) => state.orders;

export const getOrdersList = createSelector(
  getOrdersState,
  fromOrders.getOrdersList
);

export const getOrdersListLoading = createSelector(
  getOrdersState,
  fromOrders.getOrdersListLoading
);
export const getOrdersListLoaded = createSelector(
  getOrdersState,
  fromOrders.getOrdersListLoaded
);
export const getOrdersListFailed = createSelector(
  getOrdersState,
  fromOrders.getOrdersListFailed
);
export const getOrdersLogList = createSelector(
  getOrdersState,
  fromOrders.getOrdersLogList
);

export const getOrdersLogListLoading = createSelector(
  getOrdersState,
  fromOrders.getOrdersLogListLoading
);
export const getOrdersLogListLoaded = createSelector(
  getOrdersState,
  fromOrders.getOrdersLogListLoaded
);
export const getOrdersLogListFailed = createSelector(
  getOrdersState,
  fromOrders.getOrdersLogListFailed
);
export const getOrdersStatusList = createSelector(
  getOrdersState,
  fromOrders.getOrdersStatusList
);

export const getOrdersStatusListLoading = createSelector(
  getOrdersState,
  fromOrders.getOrdersStatusListLoading
);
export const getOrdersStatusListLoaded = createSelector(
  getOrdersState,
  fromOrders.getOrdersStatusListLoaded
);
export const getOrdersStatusListFailed = createSelector(
  getOrdersState,
  fromOrders.getOrdersStatusListFailed
);
export const getOrderDetail = createSelector(
  getOrdersState,
  fromOrders.getOrderDetail
);

export const getOrderDetailLoading = createSelector(
  getOrdersState,
  fromOrders.getOrderDetailLoading
);
export const getOrderDetailLoaded = createSelector(
  getOrdersState,
  fromOrders.getOrderDetailLoaded
);
export const getOrderDetailFailed = createSelector(
  getOrdersState,
  fromOrders.getOrderDetailFailed
);
export const getOrderStatusChange = createSelector(
  getOrdersState,
  fromOrders.getOrderStatusChange
);

export const getOrderStatusChangeLoading = createSelector(
  getOrdersState,
  fromOrders.getOrderStatusChangeLoading
);
export const getOrderStatusChangeLoaded = createSelector(
  getOrdersState,
  fromOrders.getOrderStatusChangeLoaded
);
export const getOrderStatusChangeFailed = createSelector(
  getOrdersState,
  fromOrders.getOrderStatusChangeFailed
);

export const getInvoiceDetailLoading = createSelector(
  getOrdersState,
  fromOrders.getInvoiceDetailLoading
);
export const getInvoiceDetailLoaded = createSelector(
  getOrdersState,
  fromOrders.getInvoiceDetailLoaded
);
export const getInvoiceDetailFailed = createSelector(
  getOrdersState,
  fromOrders.getInvoiceDetailFailed
);
export const getInvoiceDetail = createSelector(
  getOrdersState,
  fromOrders.getInvoiceDetail
);

export const vendorListForOrderDetails = createSelector(
  getOrdersState,
  fromOrders.vendorListForOrderDetails
);

