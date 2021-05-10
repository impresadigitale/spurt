/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

// store
import {type} from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {

  DOWNLOAD_FILE: type('[Import] Download File'),
  DOWNLOAD_FILE_SUCCESS: type('[Import] Download File Success'),
  DOWNLOAD_FILE_FAIL: type('[Import] Download File Fail'),

  UPLOAD_FILE: type('[Import] Upload File'),
  UPLOAD_FILE_SUCCESS: type('[Import] Upload File Success'),
  UPLOAD_FILE_FAIL: type('[Import] Upload File Fail'),

};

// Download File

export class DownloadFileAction implements Action {
  type = ActionTypes.DOWNLOAD_FILE;
  constructor(public payload: any = null) {}
}

export class  DownloadFileSuccessAction implements Action {
  type = ActionTypes.DOWNLOAD_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class  DownloadFileFailAction implements Action {
  type = ActionTypes.DOWNLOAD_FILE_FAIL;
  constructor(public payload: any = null) {}
}


// Upload File

export class UploadFileAction implements Action {
  type = ActionTypes.UPLOAD_FILE;
  constructor(public payload: any) {}
}

export class UploadFileSuccessAction implements Action {
  type = ActionTypes.UPLOAD_FILE_SUCCESS;
  constructor(public payload: any) {}
}

export class UploadFileFailAction implements Action {
  type = ActionTypes.UPLOAD_FILE_FAIL;
  constructor(public payload: any = null) {}
}



export type Actions =
  | DownloadFileAction
  | DownloadFileSuccessAction
  | DownloadFileFailAction
  | UploadFileAction
  | UploadFileSuccessAction
  | UploadFileFailAction;
