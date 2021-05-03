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

export interface CommonState extends Map<string, any> {
  logout: any;
}

export const CommonStateRecord = Record({
  logout: {}
});
