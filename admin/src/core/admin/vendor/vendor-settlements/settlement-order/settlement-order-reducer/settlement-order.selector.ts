/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { AppState } from '../../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromProduct from './settlement-order.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getProdState = (state: AppState) => state.settlementOrder;
// product list action

// product list action
export const orderListCount = createSelector(
  getProdState,
  fromProduct.orderListCount
);
export const orderList = createSelector(
  getProdState,
  fromProduct.orderList
);
export const orderListLoading = createSelector(
  getProdState,
  fromProduct.orderListLoading
);
export const orderListLoaded = createSelector(
  getProdState,
  fromProduct.orderListLoaded
);


export const makeSettlement = createSelector(
  getProdState,
  fromProduct.makeSettlement
);
export const makeSettlementLoaded = createSelector(
  getProdState,
  fromProduct.makeSettlementLoaded
);
export const makeSettlementLoading = createSelector(
  getProdState,
  fromProduct.makeSettlementLoading
);

export const vendorList = createSelector(
  getProdState,
  fromProduct.vendorList
);
export const vendorListLoading = createSelector(
  getProdState,
  fromProduct.vendorListLoading
);
export const vendorListLoaded = createSelector(
  getProdState,
  fromProduct.vendorListLoaded
);


export const orderStatusList = createSelector(
  getProdState,
  fromProduct.orderStatusList
);
