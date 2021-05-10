/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Action } from '@ngrx/store';
import { type } from '../../../../shared/utility/utilityHelpers';

export const ActionTypes = {
  GET_VARIANTS_LIST: type('[List] Do Variants list'),
  GET_VARIANTS_LIST_SUCCESS: type(
    '[List] Do Variants list Success'
  ),
  GET_VARIANTS_LIST_FAIL: type('[List] Do Variants list Fail'),

  GET_VARIANTS_LIST_COUNT: type('[List] Do Variants list count'),
  GET_VARIANTS_LIST_COUNT_SUCCESS: type(
    '[List] Do Variants list count Success'
  ),
  GET_VARIANTS_LIST_COUNT_FAIL: type(
    '[List] Do Variants list count Fail'
  ),

  DO_VARIANTS_DELETE: type('[Delete] Do Variants Delete'),
  DO_VARIANTS_DELETE_SUCCESS: type(
    '[Delete] Do Variants Delete Success'
  ),
  DO_VARIANTS_DELETE_FAIL: type(
    '[Delete] Do Variants Delete Fail'
  ),

  DO_VARIANTS_ADD: type('[Add] Do Variants Add'),
  DO_VARIANTS_ADD_SUCCESS: type('[Add] Do Variants Add Success'),
  DO_VARIANTS_ADD_FAIL: type('[Add] Do Variants Add Fail'),

  DO_VARIANTS_UPDATE: type('[Update] Do Variants Update'),
  DO_VARIANTS_UPDATE_SUCCESS: type(
    '[Update] Do Variants Update Success'
  ),
  DO_VARIANTS_UPDATE_FAIL: type(
    '[Update] Do Variants Update Fail'
  ),

  RESET_VARIANTS: type('[Reset] DO Reset Variants'),

  GET_VARIANTS_DETAILS: type('[Details] Do Variants details'),
  GET_VARIANTS_DETAILS_SUCCESS: type(
    '[Details] Do Variants details Success'
  ),
  GET_VARIANTS_DETAILS_FAIL: type('[Details] Do Variants details Fail'),
};

// product list action
export class GetVariantsListAction implements Action {
  type = ActionTypes.GET_VARIANTS_LIST;

  constructor(public payload: any) {}
}

export class GetVariantsListSuccessAction implements Action {
  type = ActionTypes.GET_VARIANTS_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetVariantsListFailAction implements Action {
  type = ActionTypes.GET_VARIANTS_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// product list count action
export class GetVariantsListCountAction implements Action {
  type = ActionTypes.GET_VARIANTS_LIST_COUNT;

  constructor(public payload: any) {}
}

export class GetVariantsListCountSuccessAction implements Action {
  type = ActionTypes.GET_VARIANTS_LIST_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetVariantsListCountFailAction implements Action {
  type = ActionTypes.GET_VARIANTS_LIST_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// product delete action
export class DoVariantsDeleteAction implements Action {
  type = ActionTypes.DO_VARIANTS_DELETE;

  constructor(public payload: any) {}
}

export class DoVariantsDeleteSuccessAction implements Action {
  type = ActionTypes.DO_VARIANTS_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoVariantsDeleteFailAction implements Action {
  type = ActionTypes.DO_VARIANTS_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

// product add action
export class DoVariantsAddAction implements Action {
  type = ActionTypes.DO_VARIANTS_ADD;

  constructor(public payload: any) {}
}

export class DoVariantsAddSuccessAction implements Action {
  type = ActionTypes.DO_VARIANTS_ADD_SUCCESS;

  constructor(public payload: any) {}
}

export class DoVariantsAddFailAction implements Action {
  type = ActionTypes.DO_VARIANTS_ADD_FAIL;

  constructor(public payload: any = null) {}
}

// Variants Update action
export class DoVariantsUpdateAction implements Action {
  type = ActionTypes.DO_VARIANTS_UPDATE;

  constructor(public payload: any) {}
}

export class DoVariantsUpdateSuccessAction implements Action {
  type = ActionTypes.DO_VARIANTS_UPDATE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoVariantsUpdateFailAction implements Action {
  type = ActionTypes.DO_VARIANTS_UPDATE_FAIL;

  constructor(public payload: any = null) {}
}

// Reset Product Option
export class DoResetVariants implements Action {
  type = ActionTypes.RESET_VARIANTS;

  constructor(public payload: any = null) {}
}


// varinat details
export class GetVariantsDetailsAction implements Action {
  type = ActionTypes.GET_VARIANTS_DETAILS;

  constructor(public payload: any) {}
}

export class GetVariantsDetailsSuccessAction implements Action {
  type = ActionTypes.GET_VARIANTS_DETAILS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetVariantsDetailsFailAction implements Action {
  type = ActionTypes.GET_VARIANTS_DETAILS_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | GetVariantsListAction
  | GetVariantsListSuccessAction
  | GetVariantsListFailAction
  | DoVariantsDeleteAction
  | DoVariantsDeleteSuccessAction
  | DoVariantsDeleteFailAction
  | DoVariantsAddAction
  | DoVariantsAddSuccessAction
  | DoVariantsAddFailAction
  | DoVariantsUpdateAction
  | DoVariantsUpdateSuccessAction
  | DoVariantsUpdateFailAction
  | DoResetVariants;
