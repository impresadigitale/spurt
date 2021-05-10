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

export interface SalesLayoutState extends Map<string, any> {

  salesCount: any;
  salesCountLoading: boolean;
  salesCountLoaded: boolean;
  salesCountFailed: boolean;

}

export const SalesLayoutStateRecord = Record({

  salesCount: {},
  salesCountLoading: false,
  salesCountLoaded: false,
  salesCountFailed: false,

});
