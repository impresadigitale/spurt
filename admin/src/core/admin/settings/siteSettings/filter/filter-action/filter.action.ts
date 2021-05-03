/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { type } from '../../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { FilterForm } from '../filter-model/filter.model';

export const ActionTypes = {
  GET_FILTER_LIST: type('[Settings filter] Do FilterList'),
  GET_FILTER_LIST_SUCCESS: type('[Settings filter] Do FilterList Success'),
  GET_FILTER_LIST_FAIL: type('[Settings filter] Do FilterList Fail'),
  DO_FILTER_COUNT_ACTION: type('[Settings filter] Do Filter Paination '),
  DO_FILTER_COUNT_SUCCESS: type('[Settings filter] Do Filter Paination  Success'),
  DO_FILTER_COUNT_FAIL: type('[Settings filter] Do Filter Paination  Fail'),
  DO_NEW_FILTER: type('[Settings filter] Do New filter'),
  DO_NEW_FILTER_SUCCESS: type('[Settings filter] Do New filter Success'),
  DO_NEW_FILTER_FAIL: type('[Settings filter] Do New filter Fail'),
  DO_GET_FILTER: type('[Settings filter] Do get filter'),
  DO_GET_FILTER_SUCCESS: type('[Settings filter] Do get filter Success'),
  DO_GET_FILTER_FAIL: type('[Settings filter] Do get filter Fail'),
  GET_VARIENT_LIST: type('[Settings filter] Do VarientList'),
  GET_VARIENT_LIST_SUCCESS: type('[Settings filter] Do VarientList Success'),
  GET_VARIENT_LIST_FAIL: type('[Settings filter] Do VarientList Fail'),
  GET_ATTRIBUTE_LIST: type('[Settings filter] Do AttributeList'),
  GET_ATTRIBUTE_LIST_SUCCESS: type('[Settings filter] Do AttributeList Success'),
  GET_ATTRIBUTE_LIST_FAIL: type('[Settings filter] Do AttributeList Fail'),
  CLEAR_VARIENT_DATA: type('[Settings filter] Clear Varient Data'),

  UPDATE_FILTER: type('[Settings filter] Update  Filter'),
  UPDATE_FILTER_SUCCESS: type('[Settings filter] Update filter Success'),
  UPDATE_FILTER_FAIL: type('[Settings filter] Update filter Fail'),

  DELETE_FILTER: type('[Settings filter] Delete Filter'),
  DELETE_FILTER_SUCCESS: type('[Settings filter] Delete Filter Success'),
  DELETE_FILTER_FAIL: type('[Settings filter] Delete Filter Fail'),

  SEARCH_VARIENT: type('[Settings filter] Search Varient'),
  SEARCH_ATTRIBUTE: type('[Settings filter] Search Attribute'),
};

// FilterPagination

export class DoFilterPaginationAction implements Action {
  type = ActionTypes.DO_FILTER_COUNT_ACTION;

  constructor(public payload: any) {}
}

export class DoFilterPaginationSuccessAction implements Action {
  type = ActionTypes.DO_FILTER_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class DoFilterPaginationFailAction implements Action {
  type = ActionTypes.DO_FILTER_COUNT_FAIL;

  constructor(public payload: any = null) {}
}
// FilterList
export class DoFilterListAction implements Action {
  type = ActionTypes.GET_FILTER_LIST;

  constructor(public payload: any) {}
}

export class DoFilterListSuccessAction implements Action {
  type = ActionTypes.GET_FILTER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoFilterListFailAction implements Action {
  type = ActionTypes.GET_FILTER_LIST_FAIL;

  constructor(public payload: any = null) {}
}


// NEW FILTER SETTINGS
export class DoNewFilterAction implements Action {
  type = ActionTypes.DO_NEW_FILTER;

  constructor(public payload: FilterForm) {}
}

export class DoNewFilterSuccessAction implements Action {
  type = ActionTypes.DO_NEW_FILTER_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewFilterFailAction implements Action {
  type = ActionTypes.DO_NEW_FILTER_FAIL;

  constructor(public payload: any = null) {}
}
// UpdateFilterAction
export class UpdateFilterAction implements Action {
  type = ActionTypes.UPDATE_FILTER;

  constructor(public payload: FilterForm) {}
}

export class UpdateFilterSuccessAction implements Action {
  type = ActionTypes.UPDATE_FILTER_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateFilterFailAction implements Action {
  type = ActionTypes.UPDATE_FILTER_FAIL;

  constructor(public payload: any = null) {}
}
// GET FILTER SETTINGS
export class DoGetFilterAction implements Action {
  type = ActionTypes.DO_GET_FILTER;

  constructor(public payload: any) {}
}

export class DoGetFilterSuccessAction implements Action {
  type = ActionTypes.DO_GET_FILTER_SUCCESS;

  constructor(public payload: any) {}
}

export class DoGetFilterFailAction implements Action {
  type = ActionTypes.DO_GET_FILTER_FAIL;

  constructor(public payload: any = null) {}
}
export class DoVarientListAction implements Action {
  type = ActionTypes.GET_VARIENT_LIST;

  constructor(public payload: any) {}
}

export class DoVarientListSuccessAction implements Action {
  type = ActionTypes.GET_VARIENT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoVarientListFailAction implements Action {
  type = ActionTypes.GET_VARIENT_LIST_FAIL;

  constructor(public payload: any = null) {}
}
export class DoAttributeListAction implements Action {
  type = ActionTypes.GET_ATTRIBUTE_LIST;

  constructor(public payload: any) {}
}

export class DoAttributeListSuccessAction implements Action {
  type = ActionTypes.GET_ATTRIBUTE_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoAttributeListFailAction implements Action {
  type = ActionTypes.GET_ATTRIBUTE_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// clearVarientData
export class ClearVarientData implements Action {
  type = ActionTypes.CLEAR_VARIENT_DATA;
  constructor(public payload: any) {}
}
// Delete Filter

export class DeleteFilter implements Action {
  type = ActionTypes.DELETE_FILTER;

  constructor(public payload: any) {}
}

export class DeleteFilterSuccess implements Action {
  type = ActionTypes.DELETE_FILTER_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteFilterFail implements Action {
  type = ActionTypes.DELETE_FILTER_FAIL;

  constructor(public payload: any = null) {}
}
// SearchVarient
export class SearchVarient implements Action {
  type = ActionTypes.SEARCH_VARIENT;

  constructor(public payload: any) {
  }
}
// SearchAttribute
export class SearchAttribute implements Action {
  type = ActionTypes.SEARCH_ATTRIBUTE;

  constructor(public payload: any) {
  }
}
export type Actions =
  | DoNewFilterAction
  | DoNewFilterSuccessAction
  | DoNewFilterFailAction
  | DoGetFilterAction
  | DoGetFilterSuccessAction
  | DoGetFilterFailAction;
