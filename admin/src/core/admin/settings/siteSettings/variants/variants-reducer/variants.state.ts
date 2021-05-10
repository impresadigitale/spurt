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

export interface VariantsState extends Map<string, any> {

  variantsList: any;
  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  variantsAdded: any;
  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  variantsUpdate: any;
  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  variantsDelete: any;
  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;

  variantsListCount: any;

  variantsDetails: any;
  detailsLoading: boolean;
  detailsLoaded: boolean;
  detailsFailed: boolean;

}

export const VariantsStateRecord = Record({
 variantslistCount: {},

 variantsList: [],
  listLoading: false,
  listLoaded: false,
  listFailed: false,

  variantsAdded: {},
  addLoading: false,
  addLoaded: false,
  addFailed: false,

  variantsUpdate: {},
  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  variantsDelete: {},
  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false,

  variantsDetails: {},
  detailsLoading: false,
  detailsLoaded: false,
  detailsFailed: false
});
