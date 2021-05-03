/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface BackorderListState extends Map<string, any> {

  backorderList: any;
  backorderListLoading: boolean;
  backorderListLoaded: boolean;
  backorderListFailed: boolean;

  backorderListCount: any;
  backorderListCountLoading: boolean;
  backorderListCountLoaded: boolean;
  backorderListCountFailed: boolean;


}

export const BackorderListStateRecord = Record({

  backorderList: [],
  backorderListLoading: false,
  backorderListLoaded: false,
  backorderListFailed: false,

  backorderListCount: '',
  backorderListCountLoading: false,
  backorderListCountLoaded: false,
  backorderListCountFailed: false,

});
