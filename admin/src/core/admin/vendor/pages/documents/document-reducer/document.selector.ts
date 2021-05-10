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
import * as fromDocument from './document.reducer';
import { AppState } from '../../../../../app.state.interface';

export const getDocumentState = (state: AppState) => state.document;

export const getDocumentList = createSelector(getDocumentState, fromDocument.getDocumentList);
export const getDocumentListLoading = createSelector(getDocumentState, fromDocument.getDocumentListLoading);
export const getDocumentListLoaded = createSelector(getDocumentState, fromDocument.getDocumentListLoaded);
export const getDocumentListFailed = createSelector(getDocumentState, fromDocument.getDocumentListFailed);

export const getDocumentListCount = createSelector(getDocumentState, fromDocument.getDocumentListCount);
export const getDocumentListCountLoading = createSelector(getDocumentState, fromDocument.getDocumentListCountLoading);
export const getDocumentListCountLoaded = createSelector(getDocumentState, fromDocument.getDocumentListCountLoaded);
export const getDocumentListCountFailed = createSelector(getDocumentState, fromDocument.getDocumentListCountFailed);

export const getDocumentDetail = createSelector(getDocumentState, fromDocument.getDocumentDetail);
export const getDocumentDetailLoading = createSelector(getDocumentState, fromDocument.getDocumentDetailLoading);
export const getDocumentDetailLoaded = createSelector(getDocumentState, fromDocument.getDocumentDetailLoaded);
export const getDocumentDetailFailed = createSelector(getDocumentState, fromDocument.getDocumentDetailFailed);


export const totalAmount = createSelector(getDocumentState, fromDocument.totalAmount);
export const totalOrder = createSelector(getDocumentState, fromDocument.totalOrder);
export const totalCommission = createSelector(getDocumentState, fromDocument.totalCommission);
export const totalVendor = createSelector(getDocumentState, fromDocument.totalVendor);
export const getDocumentDashboardCountLoading = createSelector(getDocumentState, fromDocument.getDocumentDashboardCountLoading);
export const getDocumentDashboardCountLoaded = createSelector(getDocumentState, fromDocument.getDocumentDashboardCountLoaded);
export const getDocumentDashboardCountFailed = createSelector(getDocumentState, fromDocument.getDocumentDashboardCountFailed);
