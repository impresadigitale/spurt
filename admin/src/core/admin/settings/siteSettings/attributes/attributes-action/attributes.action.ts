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

ADD_ATTRIBUTE: type('[Add] Add Attribute'),
ADD_ATTRIBUTE_SUCCESS: type('[Add] Add Attribute Success'),
ADD_ATTRIBUTE_FAIL: type('[Add] Add Attribute Fail'),


DELETE_ATTRIBUTE: type('[Delete] Delete Attribute'),
DELETE_ATTRIBUTE_SUCCESS: type('[Delete] Delete Attribute Success'),
DELETE_ATTRIBUTE_FAIL: type('[Delete] Delete Attribute Fail'),


UPDATE_ATTRIBUTE: type('[Update] Update Attribute'),
UPDATE_ATTRIBUTE_SUCCESS: type('[Update] Update Attribute Success'),
UPDATE_ATTRIBUTE_FAIL: type('[Update] Update Attribute Fail'),


ATTRIBUTE_LIST: type('[List] List Attribute'),
ATTRIBUTE_LIST_SUCCESS: type('[List] List Attribute Success'),
ATTRIBUTE_LIST_FAIL: type('[List] List Attribute Fail'),


GET_ATTRIBUTE: type('[Get] Get Attribute'),
GET_ATTRIBUTE_SUCCESS: type('[Get] Get Attribute Success'),
GET_ATTRIBUTE_FAIL: type('[Get] Get Attribute Fail'),

GROUP_LIST: type('[List]  Group List Attribute'),
GROUP_LIST_SUCCESS: type('[List] Group List Attribute Success'),
GROUP_LIST_FAIL: type('[List] Group List Attribute Fail'),

DETAILS_ATTRIBUTE: type('[Details] Details Attribute'),
DETAILS_ATTRIBUTE_SUCCESS: type('[Details] Details Attribute Success'),
DETAILS_ATTRIBUTE_FAIL: type('[Details] Details Attribute Fail'),



};

// Add attributes

export class AddAttributeAction implements Action {
  type = ActionTypes.ADD_ATTRIBUTE;
  constructor(public payload: any) {}
}

export class AddAttributeSuccessAction implements Action {
  type = ActionTypes.ADD_ATTRIBUTE_SUCCESS;
  constructor(public payload: any) {}
}

export class AddAttributeFailAction implements Action {
  type = ActionTypes.ADD_ATTRIBUTE_FAIL;
  constructor(public payload: any) {}
}

// Update attributes

export class UpdateAttributeAction implements Action {
  type = ActionTypes.UPDATE_ATTRIBUTE;
  constructor(public payload: any) {}
}

export class UpdateAttributeSuccessAction implements Action {
  type = ActionTypes.UPDATE_ATTRIBUTE_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateAttributeFailAction implements Action {
  type = ActionTypes.UPDATE_ATTRIBUTE_FAIL;
  constructor(public payload: any) {}
}

// Delete attributes

export class DeleteAttributeAction implements Action {
  type = ActionTypes.DELETE_ATTRIBUTE;
  constructor(public payload: any) {}
}

export class DeleteAttributeSuccessAction implements Action {
  type = ActionTypes.DELETE_ATTRIBUTE_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteAttributeFailAction implements Action {
  type = ActionTypes.DELETE_ATTRIBUTE_FAIL;
  constructor(public payload: any) {}
}

// get attributes

export class GetAttributeAction implements Action {
  type = ActionTypes.GET_ATTRIBUTE;
  constructor(public payload: any) {}
}

export class GetAttributeSuccessAction implements Action {
  type = ActionTypes.GET_ATTRIBUTE_SUCCESS;
  constructor(public payload: any) {}
}

export class GetAttributeFailAction implements Action {
  type = ActionTypes.GET_ATTRIBUTE_FAIL;
  constructor(public payload: any) {}
}

// list attributes

export class AttributeListAction implements Action {
  type = ActionTypes.ATTRIBUTE_LIST;
  constructor(public payload: any) {}
}

export class AttributeListSuccessAction implements Action {
  type = ActionTypes.ATTRIBUTE_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class AttributeListFailAction implements Action {
  type = ActionTypes.ATTRIBUTE_LIST_FAIL;
  constructor(public payload: any) {}
}

// group list attributes

export class GroupListAction implements Action {
  type = ActionTypes.GROUP_LIST;
  constructor(public payload: any) {}
}

export class GroupListSuccessAction implements Action {
  type = ActionTypes.GROUP_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GroupListFailAction implements Action {
  type = ActionTypes.GROUP_LIST_FAIL;
  constructor(public payload: any) {}
}

// Details attributes

export class DetailsAttributeAction implements Action {
  type = ActionTypes.DETAILS_ATTRIBUTE;
  constructor(public payload: any) {}
}

export class DetailsAttributeSuccessAction implements Action {
  type = ActionTypes.DETAILS_ATTRIBUTE_SUCCESS;
  constructor(public payload: any) {}
}

export class DetailsAttributeFailAction implements Action {
  type = ActionTypes.DETAILS_ATTRIBUTE_FAIL;
  constructor(public payload: any) {}
}
