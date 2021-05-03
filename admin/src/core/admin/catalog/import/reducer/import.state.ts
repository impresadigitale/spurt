/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Map, Record } from 'immutable';

export interface ImportState extends Map<string, any> {

  uploadFile: any;
  uploadFileLoading: any;
  uploadFileLoaded: any;
  uploadFileFailed: any;


}

export const ImportStateRecord = Record({

  uploadFile: {},
  uploadFileLoading: false,
  uploadFileLoaded: false,
  uploadFileFailed: false,

});
