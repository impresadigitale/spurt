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

export interface FilterState extends Map<string, any> {
  newfilter: any;
  getFilter: any;

  filterList: any;
  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  attributeList: any;
  tempAttributeList: any;
  varientList: any;
  tempVarientList: any;

  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  updatLoading: boolean;
  updatLoaded: boolean;
  updatFailed: boolean;

  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  userGroupLoading: boolean;
  userGroupLoaded: boolean;
  userGroupFailed: boolean;

  filterDelete: any;
  updateFilter: any;
  getFilterLoaded: boolean;

  userpagination: any;
}

export const FilterRecordState = Record({
  newfilter: {},
  getFilter: {},

  filterList: [],
  listLoading: false,
  listLoaded: false,
  listFailed: false,

  attributeList: [],
  tempAttributeList: [],
  varientList: [],
  tempVarientList: [],

  countLoading: false,
  countLoaded: false,
  countFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  updatLoading: false,
  updatLoaded: false,
  updatFailed: false,

  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  userGroupLoading: false,
  userGroupLoaded: false,
  userGroupFailed: false,
  filterDelete: {},

  updateFilter: [],
  getFilterLoaded: false,

  userpagination: {}
});
