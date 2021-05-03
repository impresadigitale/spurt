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

export interface CatalogLayoutState extends Map<string, any> {

  catalogCount: any;
  catalogCountLoading: boolean;
  catalogCountLoaded: boolean;
  catalogCountFailed: boolean;
}

export const CatalogLayoutStateRecord = Record({

  catalogCount: {},
  catalogCountLoading: false,
  catalogCountLoaded: false,
  catalogCountFailed: false,
});
