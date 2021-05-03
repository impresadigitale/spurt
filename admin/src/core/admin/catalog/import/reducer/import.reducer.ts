/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
// action
import * as actions from '../action/import.action';
// state
import { ImportState, ImportStateRecord } from './import.state';

export const initialState: ImportState = new ImportStateRecord() as unknown as ImportState;

export function reducer(state = initialState, { type, payload }: any): ImportState {
  if (!type) {
    return state;
  }

  switch (type) {


    case actions.ActionTypes.UPLOAD_FILE: {
      return Object.assign({}, state, {
        uploadFileLoading: true,
        uploadFileLoaded: false,
        uploadFileFailed: false,
      });
    }

    case actions.ActionTypes.UPLOAD_FILE_SUCCESS: {
      return Object.assign({}, state, {
        uploadFile: payload,
        uploadFileLoading: false,
        uploadFileLoaded: true,
        uploadFileFailed: false,
      });
    }
    case actions.ActionTypes.UPLOAD_FILE_FAIL: {
      return Object.assign({}, state, {
        uploadFileLoading: false,
        uploadFileLoaded: false,
        uploadFileFailed: true,
      });
    }
    default: {
      return state;
    }
  }
}

export const uploadFile = (state: ImportState) => state.uploadFile;
export const uploadFileLoading = (state: ImportState) => state.uploadFileLoading;
export const uploadFileLoaded = (state: ImportState) => state.uploadFileLoaded;
export const uploadFileFailed = (state: ImportState) => state.uploadFileFailed;


