/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../actions/backorder-list.action';
import {
  BackorderListState,
  BackorderListStateRecord
} from './backorder-list.state';

export const initialState: BackorderListState = new BackorderListStateRecord() as unknown as BackorderListState;

export function reducer(
  state = initialState,
  { type, payload }: any
): BackorderListState {
  if (!type) {
    return state;
  }

  switch (type) {


  // <------------------BACKORDER LIST--------------------> //

    case actions.ActionTypes.BACKORDER_LIST_ACTION: {
      return Object.assign({}, state, {
        backorderList: [],
        backorderListLoading: false,
        backorderListLoaded: false,
        backorderListFailed: false,
      });
    }

    case actions.ActionTypes.BACKORDER_LIST_SUCCESS: {
      let tempBackorderList = [];
      if (payload.data && payload.data.length > 0) {
        tempBackorderList =  payload.data.map(element => {
          return { ...element, isCollapsed: true };
        });
      }
      return Object.assign({}, state, {
        backorderList: tempBackorderList,
        backorderListLoading: false,
        backorderListLoaded: false,
        backorderListFailed: false,
      });
    }

    case actions.ActionTypes.BACKORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        backorderList: [],
        backorderListLoading: false,
        backorderListLoaded: false,
        backorderListFailed: false,
      });
    }

  // <------------------BACKORDER LIST COUNT--------------------> //

    case actions.ActionTypes.BACKORDER_LIST_COUNT_ACTION: {
      return Object.assign({}, state, {
        backorderListCount: '',
        backorderListCountLoading: false,
        backorderListCountLoaded: false,
        backorderListCountFailed: false,
      });
    }

    case actions.ActionTypes.BACKORDER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        backorderListCount: payload.data,
        backorderListCountLoading: false,
        backorderListCountLoaded: false,
        backorderListCountFailed: false,
      });
    }

    case actions.ActionTypes.BACKORDER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        backorderListCount: '',
        backorderListCountLoading: false,
        backorderListCountLoaded: false,
        backorderListCountFailed: false,
      });
    }

    default: {
      return state;
    }

  }
}

//
export const backorderList = (state: BackorderListState) => state.backorderList;
export const backorderListLoading = (state: BackorderListState) => state.backorderListLoading;
export const backorderListLoaded = (state: BackorderListState) => state.backorderListLoaded;

export const backorderListCount = (state: BackorderListState) => state.backorderListCount;
export const backorderListCountLoading = (state: BackorderListState) => state.backorderListCountLoading;
export const backorderListCountLoaded = (state: BackorderListState) => state.backorderListCountLoaded;
