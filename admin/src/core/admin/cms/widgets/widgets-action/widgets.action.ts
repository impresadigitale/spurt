/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  DO_WIDGET_LIST: type('[WIDGET] Do WIDGET List'),
  DO_WIDGET_LIST_SUCCESS: type('[WIDGET] Do WIDGET Success'),
  DO_WIDGET_LIST_FAIL: type('[WIDGET] Do WIDGET Fail'),

  DO_WIDGET_LIST_COUNT: type('[WIDGET] Do WIDGETList count'),
  DO_WIDGET_LIST_SUCCESS_COUNT: type('[WIDGET] Do WIDGET Success count'),
  DO_WIDGET_LIST_FAIL_COUNT: type('[WIDGET] Do WIDGET Fail count'),

  DO_WIDGET_LIST_ACTIVE: type('[WIDGET] Do WIDGETList active'),
  DO_WIDGET_LIST_SUCCESS_ACTIVE: type('[WIDGET] Do WIDGET Success active'),
  DO_WIDGET_LIST_FAIL_ACTIVE: type('[WIDGET] Do WIDGET Fail active'),

  DO_WIDGET_LIST_IN_ACTIVE: type('[WIDGET] Do WIDGETList In-active'),
  DO_WIDGET_LIST_SUCCESS_IN_ACTIVE: type(
    '[WIDGET] Do WIDGET Success In-active'
  ),
  DO_WIDGET_LIST_FAIL_IN_ACTIVE: type('[WIDGET] Do WIDGET Fail In-active'),

  DO_WIDGET_PAGINATION_ACTION: type('[WIDGET] Do WIDGET Paination '),
  DO_WIDGET_PAGINATION_SUCCESS: type(
    '[WIDGET] Do WIDGET Paination  Success'
  ),
  DO_WIDGET_PAGINATION_FAIL: type(
    '[WIDGET] Do WIDGET Paination  Fail'
  ),

  DO_ADD_WIDGET_ACTION: type('[WIDGET] Do WIDGET Add '),
  DO_ADD_WIDGET_SUCCESS: type('[WIDGET] Do WIDGET Add  Success'),
  DO_ADD_WIDGET_FAIL: type('[WIDGET] Do WIDGET Add  Fail'),

  DO_UPDATE_WIDGET_ACTION: type('[WIDGET] Do WIDGET Update '),
  DO_UPDATE_WIDGET_SUCCESS: type('[WIDGET] Do WIDGET Update  Success'),
  DO_UPDATE_WIDGET_FAIL: type('[WIDGET] Do WIDGET Update  Fail'),

  DO_DELETE_WIDGET_ACTION: type('[WIDGET] Do WIDGET Delete '),
  DO_DELETE_WIDGET_SUCCESS: type('[WIDGET] Do WIDGET Delete  Success'),
  DO_DELETE_WIDGET_FAIL: type('[WIDGET] Do WIDGET Delete  Fail'),

  DO_WIDGET_BULK_DELETE: type('[WIDGET] DO WIDGET Bulk Delete'),
  DO_WIDGET_BULK_DELETE_SUCCESS: type(
    '[WIDGET] Do WIDGET Bulk Delete Success'
  ),
  DO_WIDGET_BULK_DELETE_FAIL: type(
    '[WIDGET] Do WIDGET Bulk Delete Fail'
  ),

  GET_WIDGET_COUNT: type('[WIDGET] WIDGET Count '),
  GET_WIDGET_COUNT_SUCCESS: type('[WIDGET] WIDGET Count  Success'),
  GET_WIDGET_COUNT_FAIL: type('[WIDGET] WIDGET Count Fail'),

  GET_WIDGET_DETAILS: type('[WIDGET] WIDGET Details '),
  GET_WIDGET_DETAILS_SUCCESS: type('[WIDGET] WIDGET Details  Success'),
  GET_WIDGET_DETAILS_FAIL: type('[WIDGET] WIDGET Details Fail'),

  DO_PRODUCT_LIST: type('[WIDGET] Do Product list'),
  DO_PRODUCT_LIST_SUCCESS: type('[WIDGET] Do Product list Success'),
  DO_PRODUCT_LIST_FAIL: type('[WIDGET] Do Product list Fail'),

  DO_CATEGORY_LIST: type('[WIDGET] Do Category list count'),
  DO_CATEGORY_LIST_SUCCESS: type('[WIDGET] Do Category list Success'),
  DO_CATEGORY_LIST_FAIL: type('[WIDGET] Do Category list Fail'),

  SELECT_PRODUCT: type('[WIDGET] Select Product'),
  DESELECT_PRODUCT: type('[WIDGET] DeSelect Product'),

  SEARCH_PRODUCT: type('[WIDGET] Search Product'),
  SEARCH_PRODUCT_SUCCESS: type('[WIDGET] Search Product Success'),
  SEARCH_PRODUCT_FAIL: type('[WIDGET] Search Product Fail'),

  SEARCH_SELECTED_PRODUCT: type('[WIDGET] Search Selected Product'),

  CLEAR_SELECTED_PRODUCT: type('[WIDGET] Clear Selected Product'),
  CLEAR_SELECTED_CATEGORY: type('[WIDGET] Clear Selected Category'),


  SELECT_CATEGORY: type('[WIDGET] Select Category'),
  SEARCH_CATEGORY: type('[WIDGET] Search Category'),
  SEARCH_SELECTED_CATEGORY: type('[WIDGET] Search Selected Category'),

  CLEAR: type('[WIDGET] Clear'),

};

// WIDGET LIST

export class DoWidgetListAction implements Action {
  type = ActionTypes.DO_WIDGET_LIST;

  constructor(public payload: any) {}
}

export class DoWidgetListSuccessAction implements Action {
  type = ActionTypes.DO_WIDGET_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoWidgetListFailAction implements Action {
  type = ActionTypes.DO_WIDGET_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// WIDGET COUNT LIST

export class DoWidgetListCountAction implements Action {
  type = ActionTypes.DO_WIDGET_LIST_COUNT;

  constructor(public payload: any) {}
}

export class DoWidgetListCountSuccessAction implements Action {
  type = ActionTypes.DO_WIDGET_LIST_SUCCESS_COUNT;

  constructor(public payload: any) {}
}

export class DoWidgetListCountFailAction implements Action {
  type = ActionTypes.DO_WIDGET_LIST_FAIL_COUNT;

  constructor(public payload: any = null) {}
}


// Add WIDGET ACTION

export class DoWidgetAddAction implements Action {
  type = ActionTypes.DO_ADD_WIDGET_ACTION;

  constructor(public payload: any) {}
}

export class DoWidgetAddSuccessAction implements Action {
  type = ActionTypes.DO_ADD_WIDGET_SUCCESS;

  constructor(public payload: any) {}
}

export class DoWidgetAddFailAction implements Action {
  type = ActionTypes.DO_ADD_WIDGET_FAIL;

  constructor(public payload: any = null) {}
}

// # UPDATE WIDGET ACTION

export class DoWidgetUpdateAction implements Action {
  type = ActionTypes.DO_UPDATE_WIDGET_ACTION;

  constructor(public payload: any) {}
}

export class DoWidgetUpdateSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_WIDGET_SUCCESS;

  constructor(public payload: any) {}
}

export class DoWidgetUpdateFailAction implements Action {
  type = ActionTypes.DO_UPDATE_WIDGET_FAIL;

  constructor(public payload: any = null) {}
}

// #  DELETE WIDGET ACTION

export class DoWidgetDeleteAction implements Action {
  type = ActionTypes.DO_DELETE_WIDGET_ACTION;

  constructor(public payload: any) {}
}

export class DoWidgetDeleteSuccessAction implements Action {
  type = ActionTypes.DO_DELETE_WIDGET_SUCCESS;

  constructor(public payload: any) {}
}

export class DoWidgetDeleteFailAction implements Action {
  type = ActionTypes.DO_DELETE_WIDGET_FAIL;

  constructor(public payload: any = null) {}
}

// Do WIDGET Bulk Delete
export class DoWidgetBulkDelete implements Action {
  type = ActionTypes.DO_WIDGET_BULK_DELETE;

  constructor(public payload: any = null) {}
}

export class DoWidgetBulkDeleteSuccess implements Action {
  type = ActionTypes.DO_WIDGET_BULK_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoWidgetBulkDeleteFail implements Action {
  type = ActionTypes.DO_WIDGET_BULK_DELETE_FAIL;

  constructor(public payload: any = null) {}
}


// WIDGET LIST

export class GetWidgetCountAction implements Action {
  type = ActionTypes.GET_WIDGET_COUNT;
  constructor(public payload = null) {}
}

export class GetWidgetCountSuccessAction implements Action {
  type = ActionTypes.GET_WIDGET_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetWidgetCountFailAction implements Action {
  type = ActionTypes.GET_WIDGET_COUNT_FAIL;
  constructor(public payload: any = null) {}
}


// WIDGET DETAILS

export class GetWidgetDetailsAction implements Action {
  type = ActionTypes.GET_WIDGET_DETAILS;
  constructor(public payload: any) {}
}

export class GetWidgetDetailsSuccessAction implements Action {
  type = ActionTypes.GET_WIDGET_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetWidgetDetailsFailAction implements Action {
  type = ActionTypes.GET_WIDGET_DETAILS_FAIL;
  constructor(public payload: any = null) {}
}

// PRODUCT LIST

export class GetProductListAction implements Action {
  type = ActionTypes.DO_PRODUCT_LIST;
  constructor(public payload = null) {}
}

export class GetProductListSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetProductListFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_LIST_FAIL;
  constructor(public payload: any = null) {}
}


// CATEGORY  LIST

export class GetCategoryListAction implements Action {
  type = ActionTypes.DO_CATEGORY_LIST;
  constructor(public payload = null) {}
}

export class GetCategoryListSuccessAction implements Action {
  type = ActionTypes.DO_CATEGORY_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCategoryListFailAction implements Action {
  type = ActionTypes.DO_CATEGORY_LIST_FAIL;
  constructor(public payload: any = null) {}
}


// select Product

export class SelectProductAction implements Action {
  type = ActionTypes.SELECT_PRODUCT;
  constructor(public payload: any) {}
}

// Deselect Product

export class DeSelectProductAction implements Action {
  type = ActionTypes.DESELECT_PRODUCT;
  constructor(public payload: any) {}
}

// search Product

export class SearchProductAction implements Action {
  type = ActionTypes.SEARCH_PRODUCT;
  constructor(public payload: any) {}
}

export class SearchProductSuccessAction implements Action {
  type = ActionTypes.SEARCH_PRODUCT;
  constructor(public payload: any) {}
}

export class SearchProductFailAction implements Action {
  type = ActionTypes.SEARCH_PRODUCT;
  constructor(public payload: any) {}
}

// search selected Product

export class SearchSelectedProductAction implements Action {
  type = ActionTypes.SEARCH_SELECTED_PRODUCT;
  constructor(public payload: any) {}
}

// clear selected products
export class ClearSelectedProductsAction implements Action {
  type = ActionTypes. CLEAR_SELECTED_PRODUCT;
  constructor(public payload: any = null) {}
}

// clear selected ctaegories

export class ClearSelectedCategoryAction implements Action {
  type = ActionTypes. CLEAR_SELECTED_CATEGORY;
  constructor(public payload: any = null) {}
}

// select category

export class SelectCategoryAction implements Action {
  type = ActionTypes.SELECT_CATEGORY;
  constructor(public payload: any) {}
}

// search Category

export class SearchCategoryAction implements Action {
  type = ActionTypes.SEARCH_CATEGORY;
  constructor(public payload: any) {}
}

// search selected Product

export class SearchSelectedCategoryAction implements Action {
  type = ActionTypes.SEARCH_SELECTED_CATEGORY;
  constructor(public payload: any) {}
}

export class ClearAction implements Action {
  type = ActionTypes.CLEAR;
  constructor(public payload: any = null) {}
}

