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
import { LocationForm } from '../location-model/location.model';

export const ActionTypes = {
  GET_LOCATION_LIST: type('[Location] Do LocationList'),
  GET_LOCATION_LIST_SUCCESS: type('[Location] Do Location Success'),
  GET_LOCATION_LIST_FAIL: type('[Location] Do Location Fail'),
  GET_LOCATION_COUNT_ACTION: type('[Location Pagination] Do Location Paination '),
  GET_LOCATION_COUNT_SUCCESS: type('[Location Pagination] Do Location Paination  Success'),
  GET_LOCATION_COUNT_FAIL: type('[Location Pagination] Do Location Paination  Fail'),
  DO_ADD_LOCATION: type('[Settings Location] Do Add Location '),
  DO_ADD_LOCATION_SUCCESS: type('[Settings Location] Do Add Location Success'),
  DO_ADD_LOCATION_FAIL: type('[Settings Location] Do Add Location Fail'),
  DO_UPDATE_LOCATION: type('[Settings Location] Do UpdateLocation'),
  DO_UPDATE_LOCATION_SUCCESS: type('[Settings Location] Do UpdateLocation Success'),
  DO_UPDATE_LOCATION_FAIL: type('[Settings Location] Do UpdateLocation Fail'),

  DO_LOCATION_DELETE: type('[Delete Location] Do Location Delete'),
  DO_LOCATION_DELETE_SUCCESS: type('[Delete Location] Do Location Success'),
  DO_LOCATION_DELETE_FAIL: type('[Delete Location] Do Location Delete Fail')
};

// LOCATION LIST

export class GetLocationListAction implements Action {
  type = ActionTypes.GET_LOCATION_LIST;

  constructor(public payload: any) {}
}

export class GetLocationListSuccessAction implements Action {
  type = ActionTypes.GET_LOCATION_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetLocationListFailAction implements Action {
  type = ActionTypes.GET_LOCATION_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// LOCATION LIST  PAGINATION

export class GetLocationCountAction implements Action {
  type = ActionTypes.GET_LOCATION_COUNT_ACTION;

  constructor(public payload: any) {}
}

export class GetLocationCountSuccessAction implements Action {
  type = ActionTypes.GET_LOCATION_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetLocationCountFailAction implements Action {
  type = ActionTypes.GET_LOCATION_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// ADD LOCATION

export class DoNewLocationAction implements Action {
  type = ActionTypes.DO_ADD_LOCATION;

  constructor(public payload: LocationForm) {}
}

export class DoNewLocationSuccessAction implements Action {
  type = ActionTypes.DO_ADD_LOCATION_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewLocationFailAction implements Action {
  type = ActionTypes.DO_ADD_LOCATION_FAIL;

  constructor(public payload: any = null) {}
}

// UPDATE LOCATION

export class DoUpdateLocationAction implements Action {
  type = ActionTypes.DO_UPDATE_LOCATION;

  constructor(public payload: any) {}
}

export class DoUpdateLocationSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_LOCATION_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateLocationFailAction implements Action {
  type = ActionTypes.DO_UPDATE_LOCATION_FAIL;

  constructor(public payload: any = null) {}
}

// Location Delete

export class DoLocationDeleteAction implements Action {
  type = ActionTypes.DO_LOCATION_DELETE;

  constructor(public payload: any) {}
}

export class DoLocationDeleteSuccessAction implements Action {
  type = ActionTypes.DO_LOCATION_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoLocationDeleteFailAction implements Action {
  type = ActionTypes.DO_LOCATION_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | GetLocationListAction
  | GetLocationListSuccessAction
  | GetLocationListFailAction
  | GetLocationCountAction
  | GetLocationCountSuccessAction
  | GetLocationCountFailAction
  | DoNewLocationAction
  | DoNewLocationSuccessAction
  | DoNewLocationFailAction
  | DoUpdateLocationAction
  | DoUpdateLocationSuccessAction
  | DoUpdateLocationFailAction
  | DoLocationDeleteAction
  | DoLocationDeleteSuccessAction
  | DoLocationDeleteFailAction;
