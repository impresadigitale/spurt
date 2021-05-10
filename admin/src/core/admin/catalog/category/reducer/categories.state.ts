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

export interface CategoriesState extends Map<string, any> {
  categoryListCount: any;
  categoryList: any;
  categoryListFilter: any;
  categoryDoDelete: any;
  addCatagoryStatus: any;
  addCatagoryData: any;
  updateCatagory: any;
  categoryCountData: any;
  updateCategoryBadresponse: any;

  deleteCategoriesResponse: any;
  deleteCategoriesRequestLoading: any;
  deleteCategoriesRequestLoaded: any;
  deleteCategoriesRequestFailed: any;

  categoriesCountResponse: any;
  categoriesCountRequestLoading: any;
  categoriesCountRequestLoaded: any;
  categoriesCountRequestFailed: any;

  categoriesListResponse: any;
  categoriesListRequestLoading: any;
  categoriesListRequestLoaded: any;
  categoriesListRequestFailed: any;

  updateCategoriesResponse: any;
  updateCategoriesRequestLoading: any;
  updateCategoriesRequestLoaded: any;
  updateCategoriesRequestFailed: any;

  productRemoveResponse: any;
  productRemoveRequestLoading: any;
  productRemoveRequestLoaded: any;
  productRemoveRequestFailed: any;

  productAddResponse: any;
  productAddRequestLoading: any;
  productAddRequestLoaded: any;
  productAddRequestFailed: any;

  addCategoriesResponse: any;
  addCategoriesRequestLoading: any;
  addCategoriesRequestLoaded: any;
  addCategoriesRequestFailed: any;

  categoryDetails: any;
  categoryDetailsLoading: boolean;
  categoryDetailsLoaded: boolean;
  categoryDetailsFailed: boolean;

}

export const CategoriesStateRecord = Record({
  categoryListCount: {},
  categoryList: [],
  categoryListFilter: {},
  categoryDoDelete: {},
  addCatagory: {},
  addCatagoryData: {},
  updateCatagory: {},
  categoryCountData: {},
  updateCategoryBadresponse: {},
  addCatagoryStatus: {},

  deleteCategoriesResponse: {},
  deleteCategoriesRequestLoading: {},
  deleteCategoriesRequestLoaded: {},
  deleteCategoriesRequestFailed: {},

  categoriesCountResponse: {},
  categoriesCountRequestLoading: {},
  categoriesCountRequestLoaded: {},
  categoriesCountRequestFailed: {},

  categoriesListResponse: {},
  categoriesListRequestLoading: {},
  categoriesListRequestLoaded: {},
  categoriesListRequestFailed: {},

  updateCategoriesResponse: {},
  updateCategoriesRequestLoading: {},
  updateCategoriesRequestLoaded: {},
  updateCategoriesRequestFailed: {},

  productRemoveResponse: {},
  productRemoveRequestLoading: {},
  productRemoveRequestLoaded: {},
  productRemoveRequestFailed: {},

  productAddResponse: {},
  productAddRequestLoading: {},
  productAddRequestLoaded: {},
  productAddRequestFailed: {},

  addCategoriesResponse: {},
  addCategoriesRequestLoading: {},
  addCcategoriesRequestLoaded: {},
  addCategoriesRequestFailed: {},

  categoryDetails: {},
  categoryDetailsLoading: false,
  categoryDetailsLoaded: false,
  categoryDetailsFailed: false,
});
