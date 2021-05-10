/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as frompageGroup from './page-group.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const getpageState = (state: AppState) => state.pageGroup;


export const pageGroupList = createSelector(
  getpageState,
  frompageGroup.pageGroupList
);
export const pageGroupListLoading = createSelector(
  getpageState,
  frompageGroup.pageGroupListLoading
);
export const pageGroupListLoaded = createSelector(
  getpageState,
  frompageGroup.pageGroupListLoaded
);

export const pageGroupListCount = createSelector(
  getpageState,
  frompageGroup.pageGroupListCount
);

export const addPages = createSelector(
  getpageState,
  frompageGroup.addPages
);



export const addPagesStatus = createSelector(
  getpageState,
  frompageGroup.addPagesStatus
);
export const updatePages = createSelector(
  getpageState,
  frompageGroup.updatePages
);


export const pageGroupDelete = createSelector(
  getpageState,
  frompageGroup.pageGroupDelete
);
export const pageActiveCount = createSelector(
  getpageState,
  frompageGroup.pageActiveCount
);
export const pageInactiveCount = createSelector(
  getpageState,
  frompageGroup.pageInactiveCount
);

export const pageCount = createSelector(
  getpageState,
  frompageGroup.pageCount
);
export const pageCountLoading = createSelector(
  getpageState,
  frompageGroup.pageCountLoading
);
export const pageCountLoaded = createSelector(
  getpageState,
  frompageGroup.pageCountLoaded
);
export const pageCountFailed = createSelector(
  getpageState,
  frompageGroup.pageCountFailed
);

export const pageDetails = createSelector(
  getpageState,
  frompageGroup.pageDetails
);
export const pageDetailsLoading = createSelector(
  getpageState,
  frompageGroup.pageDetailsLoading
);
export const pageDetailsLoaded = createSelector(
  getpageState,
  frompageGroup.pageDetailsLoaded
);
export const pageDetailsFailed = createSelector(
  getpageState,
  frompageGroup.pageDetailsFailed
);
