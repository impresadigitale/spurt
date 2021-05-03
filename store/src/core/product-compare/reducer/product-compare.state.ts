/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface CompareProductState extends Map<string, any> {
  compareCount: Array<any>;
  compareAdding: boolean;
  compareList: Array<any>;
  compareError: any;
}

export const compareProductRecord = Record({
  compareAdding: false,
  compareError: {},
  compareList: [],
  compareCount: []
});
