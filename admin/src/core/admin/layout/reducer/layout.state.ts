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

export interface LayoutState extends Map<string, any> {
  settings: any;
  settingDetails: any;
  userDetail: any;
  changePayment: any;
  changePaymentLoading: boolean;
  changePaymentLoaded: boolean;
  changePaymentFailed: boolean;
}

export const layoutStateRecord = Record({
  // Initialize Default State Values
  settings: {},
  settingDetails: {},
  userDetail: {},
  changePayment: {},
  changePaymentLoading: false,
  changePaymentLoaded: false,
  changePaymentFailed: false
});
