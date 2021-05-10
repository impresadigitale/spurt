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
import * as fromBackorderListRequest from './backorder-list.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const backorderListState = (state: AppState) => state.backorderList;

export const backorderList = createSelector(backorderListState, fromBackorderListRequest.backorderList);
export const backorderListLoading = createSelector(backorderListState, fromBackorderListRequest.backorderListLoading);
export const backorderListLoaded = createSelector(backorderListState, fromBackorderListRequest.backorderListLoaded);

export const backorderListCount = createSelector(backorderListState, fromBackorderListRequest.backorderListCount);
export const backorderListCountLoading = createSelector(backorderListState, fromBackorderListRequest.backorderListCountLoading);
export const backorderListCountLoaded = createSelector(backorderListState, fromBackorderListRequest.backorderListCountLoaded);
