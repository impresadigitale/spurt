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
import * as fromImport from './import.reducer';
// app state
import { AppState } from '../../../../app.state.interface';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getImportState = (state: AppState) => state.import;

export const uploadFile = createSelector(getImportState, fromImport.uploadFile);
export const uploadFileLoading = createSelector(getImportState, fromImport.uploadFileLoading);
export const uploadFileLoaded = createSelector(getImportState, fromImport.uploadFileLoaded);
export const uploadFileFailed = createSelector(getImportState, fromImport.uploadFileFailed);




