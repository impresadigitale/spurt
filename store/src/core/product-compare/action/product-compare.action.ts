/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';

export const ActionTypes = {

  ADD_COMPARE_COUNT: type('[compare count] success'),
  REMOVE_COMPARE_COUNT: type('[compare count] remove'),
  CLEAR_COMPARE: type('[clear compare]'),

  PRODUCT_COMPARE: type('[product compare] do product compare'),
  PRODUCT_COMPARE_SUCCESS: type('[product compare] do product compare success'),
  PRODUCT_COMPARE_FAIL: type('[product compare] do product compare fail')

};


/* add product to compare*/
export class AddCompareCount implements Action {
  type = ActionTypes.ADD_COMPARE_COUNT;

  constructor(public payload: any) {}
}
export class RemoveCompareCount implements Action {
  type = ActionTypes.REMOVE_COMPARE_COUNT;

  constructor(public payload: any) {}
}
// compare product
export class ClearCompareList implements Action {
  type = ActionTypes.CLEAR_COMPARE;

  constructor(public payload: any) {}
}
// compare product
export class CompareProducts implements Action {
  type = ActionTypes.PRODUCT_COMPARE;

  constructor(public payload: any) {}
}

export class CompareProductsSuccess implements Action {
  type = ActionTypes.PRODUCT_COMPARE_SUCCESS;

  constructor(public payload: any) {}
}

export class CompareProductsFail implements Action {
  type = ActionTypes.PRODUCT_COMPARE_FAIL;

  constructor(public payload: any) {}
}
export type Actions =
  | AddCompareCount
  | RemoveCompareCount
  | ClearCompareList
  | CompareProducts
  | CompareProductsSuccess
  | CompareProductsFail;
