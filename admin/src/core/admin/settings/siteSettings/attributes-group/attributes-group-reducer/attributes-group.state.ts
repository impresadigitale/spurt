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
// import {ProductOptionsAddResponseModel} from '../ratingReview-model/productOptions-add-response.model';

export interface AttributeGroupState extends Map<string, any> {
  attributeList: any;
  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  attributeAdd: any;
  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  attributeUpdate: any;
  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  attributeDelete: any;
  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;

  attributeGet: any;
  getAttributeLoading: boolean;
  getAttributeLoaded: boolean;
  getAttributeFailed: boolean;

  attributeDetails: any;
  detailsLoading:  boolean;
  detailsLoaded:  boolean;
  detailsFailed:  boolean;
}

export const AttributeGroupStateRecord = Record({
  attributeList: [],
  listLoading: false,
  listLoaded: false,
  listFailed: false,

  attributeAdd: {},
  addLoading: false,
  addLoaded:  false,
  addFailed: false,

  attributeUpdate: {},
  updateLoading:  false,
  updateLoaded: false,
  updateFailed:  false,

  attributeDelete: {},
  deleteLoading:  false,
  deleteLoaded:  false,
  deleteFailed:  false,

  attributeGet: {},
  getAttributeLoading:false,
  getAttributeLoaded: false,
  getAttributeFailed:false,

  attributeDetails: {},
  detailsLoading:  false,
  detailsLoaded:  false,
  detailsFailed:  false,
});
