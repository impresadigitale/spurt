/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/product-compare.action';
import {
  CompareProductState,
  compareProductRecord
} from './product-compare.state';

export const initialState: CompareProductState = (new compareProductRecord() as unknown) as CompareProductState;

export function reducer(
  state = initialState,
  { type, payload }: any
): CompareProductState {
  if (!type) {
    return state;
  }
  switch (type) {


// <------------ COMPARE PRODUCTS -----------> //

    case actions.ActionTypes.PRODUCT_COMPARE: {
      return Object.assign({}, state, {
        compareAdding: true
      });
    }

    case actions.ActionTypes.PRODUCT_COMPARE_SUCCESS: {
      return Object.assign({}, state, {
        compareAdding: false,
        compareList: payload.data
      });
    }

    case actions.ActionTypes.PRODUCT_COMPARE_FAIL: {
      return Object.assign({}, state, {
        compareAdding: false,
        compareError: payload
      });
    }


// <------------ COMPARE PRODUCTS COUNT -----------> //

    case actions.ActionTypes.ADD_COMPARE_COUNT: {
      return Object.assign({}, state, {
        compareCount: payload
      });
    }

// <------------ CLEAR COMPARE PRODUCTS -----------> //

    case actions.ActionTypes.CLEAR_COMPARE: {
      let compare: any;
      let compareList: any;
      if (payload.length === 0) {
        localStorage.removeItem('compareId');
        compare = 0;
        compareList = [];
      }
      return Object.assign({}, state, {
        compareCount: compare,
        compareList: compareList
      });
    }


// <------------ REMOVE COMPARE COUNT -----------> //

    case actions.ActionTypes.REMOVE_COMPARE_COUNT: {
      const currentCompare = JSON.parse(localStorage.getItem('compareId'));
      currentCompare.pop();
      localStorage.setItem('compareId', JSON.stringify(currentCompare));
      return Object.assign({}, state, {
        compareCount: currentCompare
      });
    }


    default: {
      return state;
    }
  }
}

export const getCompareAdding = (state: CompareProductState) =>
  state.compareAdding;
export const getCompareError = (state: CompareProductState) =>
  state.compareError;
export const getCompareList = (state: CompareProductState) => state.compareList;
export const getCompareCount = (state: CompareProductState) =>
  state.compareCount;
