/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
// store
import { AppState } from '../../../app.state.interface';
import { createSelector } from 'reselect';
// reducer
import * as fromLayout from './layout.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getLayoutState = (state: AppState) => state.layout;
export const getSettingsResponse = createSelector(getLayoutState, fromLayout.getSettings);
export const settingDetails = createSelector(getLayoutState, fromLayout.settingDetails);

export const getUserResponse = createSelector(getLayoutState, fromLayout.userDetail);
export const getChangePayment = createSelector(
    getLayoutState,
    fromLayout.getChangePayment
  );
  export const getChangePaymentLoaded = createSelector(
    getLayoutState,
    fromLayout.getChangePaymentLoaded
  );
  export const getChangePaymentLoading = createSelector(
    getLayoutState,
    fromLayout.getChangePaymentLoading
  );
  export const getChangePaymentFailed = createSelector(
    getLayoutState,
    fromLayout.getChangePaymentFailed
  );
