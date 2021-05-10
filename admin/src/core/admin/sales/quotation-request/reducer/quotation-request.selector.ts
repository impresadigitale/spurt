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
import * as fromQuotationRequest from './quotation-request.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */

export const quotationState = (state: AppState) => state.quotationRequest;

export const quotationList = createSelector(quotationState, fromQuotationRequest.quotationList);
export const quotationListLoading = createSelector(quotationState, fromQuotationRequest.quotationListLoading);
export const quotationListLoaded = createSelector(quotationState, fromQuotationRequest.quotationListLoaded);

export const quotationListCount = createSelector(quotationState, fromQuotationRequest.quotationListCount);
export const quotationListCountLoading = createSelector(quotationState, fromQuotationRequest.quotationListCountLoading);
export const quotationListCountLoaded = createSelector(quotationState, fromQuotationRequest.quotationListCountLoaded);
