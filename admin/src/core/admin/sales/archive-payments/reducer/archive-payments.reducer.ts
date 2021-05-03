/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../actions/archive-payments.action';
import {
  ArchivePaymentState,
  ArchivePaymentStateRecord
} from './archive-payments.state';

export const initialState: ArchivePaymentState = new ArchivePaymentStateRecord() as unknown as ArchivePaymentState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ArchivePaymentState {
  if (!type) {
    return state;
  }

  switch (type) {


  // <------------------ARCHIVE PAYMENT LIST --------------------> //

    case actions.ActionTypes.ARCHIVE_PAYMENT_LIST: {
      return Object.assign({}, state, {
        archivePaymentList: [],
        archivePaymentListLoading: true,
        archivePaymentListLoaded: false,
        archivePaymentListFailed: false
      });
    }

    case actions.ActionTypes.ARCHIVE_PAYMENT_LIST_SUCCESS: {
      let tempPaymentList = [];
      if (payload.data && payload.data.length > 0) {
        tempPaymentList =  payload.data.map(element => {
          return { ...element, isCollapsed: true };
        });
      }
      return Object.assign({}, state, {
        archivePaymentList: tempPaymentList,
        archivePaymentListLoading: false,
        archivePaymentListLoaded: true,
        archivePaymentListFailed: false,
      });
    }

    case actions.ActionTypes.ARCHIVE_PAYMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        archivePaymentList: [],
        archivePaymentListLoading: false,
        archivePaymentListLoaded: false,
        archivePaymentListFailed: true,
      });
    }

  // <------------------ARCHIVE PAYMENT LIST COUNT--------------------> //

    case actions.ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT: {
      return Object.assign({}, state, {
        archivePaymentListCount: '',
        archivePaymentListCountLoading: true,
        archivePaymentListCountLoaded: false,
        archivePaymentListCountFailed: false,
      });
    }

    case actions.ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        archivePaymentListCount: payload.data,
        archivePaymentListCountLoading: false,
        archivePaymentListCountLoaded: true,
        archivePaymentListCountFailed: false,
      });
    }

    case actions.ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        archivePaymentListCount: '',
        archivePaymentListCountLoading: false,
        archivePaymentListCountLoaded: false,
        archivePaymentListCountFailed: true,
      });
    }

    default: {
      return state;
    }

  }
}

export const archivePaymentList = (state: ArchivePaymentState) => state.archivePaymentList;
export const archivePaymentListLoading = (state: ArchivePaymentState) => state.archivePaymentListLoading;
export const archivePaymentListLoaded = (state: ArchivePaymentState) => state.archivePaymentListLoaded;

export const archivePaymentListCount = (state: ArchivePaymentState) => state.archivePaymentListCount;
export const archivePaymentListCountLoading = (state: ArchivePaymentState) => state.archivePaymentListCountLoading;
export const archivePaymentListCountLoaded = (state: ArchivePaymentState) => state.archivePaymentListCountLoaded;
