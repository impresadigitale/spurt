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

export interface PersonalizeOrderState extends Map<string, any> {
  newPersonalizeOrder: any;
  getPersonalizeOrder: any;
}

export const PersonalizeOrderRecordState = Record({
  newPersonalizeOrder: {},
  getPersonalizeOrder: {}
});
