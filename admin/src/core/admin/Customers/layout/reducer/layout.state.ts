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

export interface CustomerLayoutState extends Map<string, any> {

  customerCount: any;
  customerCountLoading: boolean;
  customerCountLoaded: boolean;
  customerCountFailed: boolean;
}

export const CustomerLayoutStateRecord = Record({

  customerCount: {},
  customerCountLoading: false,
  customerCountLoaded: false,
  customerCountFailed: false,
});
