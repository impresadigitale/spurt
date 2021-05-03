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

export interface LocationState extends Map<string, any> {
  locationList: any;
  newLocation: any;
  updateLocation: any;
  locationDelete: any;
  locationPagination: any;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;
}

export const LocationRecordState = Record({
  locationList: {},
  newLocation: {},
  updateLocation: {},
  locationDelete: {},
  locationPagination: {},

  listLoading: false,
  listLoaded: false,
  listFailed: false,

  countLoading: false,
  countLoaded: false,
  countFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false
});
