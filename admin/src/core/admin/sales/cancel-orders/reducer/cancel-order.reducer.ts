/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../actions/cancel-orders.action';
import {
  SalesCancelOrderState,
  SalesCancelOrderStateRecord
} from './cancel-order.state';

export const initialState: SalesCancelOrderState = new SalesCancelOrderStateRecord() as unknown as SalesCancelOrderState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SalesCancelOrderState {
  if (!type) {
    return state;
  }

  switch (type) {


  // <------------------CANCEL ORDER REQUEST LIST--------------------> //

    case actions.ActionTypes.GET_CANCEL_ORDER_LIST_ACTION: {
      return Object.assign({}, state, {
        cancelOrderList: [],
        cancelOrderListLoading: true,
        cancelOrderListLoaded: false,
        cancelOrderListFailed: false,
      });
    }

    case actions.ActionTypes.GET_CANCEL_ORDER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        cancelOrderList: payload.data,
        cancelOrderListLoading: false,
        cancelOrderListLoaded: true,
        cancelOrderListFailed: false,
      });
    }

    case actions.ActionTypes.GET_CANCEL_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        cancelOrderList: [],
        cancelOrderListLoading: false,
        cancelOrderListLoaded: false,
        cancelOrderListFailed: true,
      });
    }

  // <------------------CANCEL ORDER REQUEST LIST COUNT--------------------> //

    case actions.ActionTypes.CANCEL_ORDER_LIST_COUNT_ACTION: {
      return Object.assign({}, state, {
        cancelOrderListCount: [],
        cancelOrderListCountLoading: true,
        cancelOrderListCountLoaded: false,
        cancelOrderListCountFailed: false,
      });
    }

    case actions.ActionTypes.CANCEL_ORDER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        cancelOrderListCount: payload.data,
        cancelOrderListCountLoading: false,
        cancelOrderListCountLoaded: true,
        cancelOrderListCountFailed: false,
      });
    }

    case actions.ActionTypes.CANCEL_ORDER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        cancelOrderListCount: [],
        cancelOrderListCountLoading: false,
        cancelOrderListCountLoaded: false,
        cancelOrderListCountFailed: true,
      });
    }

  // <------------------CHNAGE STATUS OF CANCEL ORDER REQUEST LIST--------------------> //

      case actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS: {
        return Object.assign({}, state, {
          cancelRequest: payload,
          changeCancelOrderStatus: {},
          changeCancelOrderStatusLoading: true,
          changeCancelOrderStatusLoaded: false,
          changeCancelOrderStatusFailed: false,
        });
      }

      case actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS_SUCCESS: {
        let tempList = [];
        if (payload) {
          const requestString = state.cancelRequest.orderProductId;
          tempList = state.cancelOrderList;
          const array = JSON.parse('[' + requestString + ']');
          if (array.length > 0) {
             tempList.map(data => {
               array.map(string => {
                if (data.orderProductId === string) {
                   if (state.cancelRequest.cancelStatusId === '1') {
                    data.cancelRequestStatus = 1;
                   }
                   if (state.cancelRequest.cancelStatusId === '2') {
                    data.cancelRequestStatus = 2;
                  }
                 }
               });
             });
          }
        }
        return Object.assign({}, state, {
          cancelOrderList: tempList,
          changeCancelOrderStatus: payload,
          changeCancelOrderStatusLoading: false,
          changeCancelOrderStatusLoaded: true,
          changeCancelOrderStatusFailed: false,
        });
      }

      case actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS_FAIL: {
        return Object.assign({}, state, {
          changeCancelOrderStatus: {},
          changeCancelOrderStatusLoading: false,
          changeCancelOrderStatusLoaded: false,
          changeCancelOrderStatusFailed: true,
        });
      }

  // <------------------ BULK CHANGE STATUS OF CANCEL ORDER REQUEST LIST--------------------> //

        case actions.ActionTypes.BULK_CANCEL_ORDER_STATUS: {
        return Object.assign({}, state, {
          cancelRequest: payload,
          bulkStatusChange: {},
          bulkStatusChangeLoading: true,
          bulkStatusChangeLoaded: false,
          bulkStatusChangeFailed: false,
        });
      }

      case actions.ActionTypes.BULK_CANCEL_ORDER_STATUS_SUCCESS: {
        let tempList = [];
        if (payload) {
          const requestString = state.cancelRequest.orderProductId;
          tempList = state.cancelOrderList;
          const array = JSON.parse('[' + requestString + ']');
          if (array.length > 0) {
              tempList.map(data => {
                array.map(string => {
                if (data.orderProductId === string) {
                    if (state.cancelRequest.cancelStatusId === '1') {
                    data.cancelRequestStatus = 1;
                    }
                    if (state.cancelRequest.cancelStatusId === '2') {
                    data.cancelRequestStatus = 2;
                  }
                  }
                });
              });
          }
        }
        return Object.assign({}, state, {
          cancelOrderList: tempList,
          bulkStatusChange: payload,
          bulkStatusChangeLoading: false,
          bulkStatusChangeLoaded: true,
          bulkStatusChangeFailed: false,
        });
      }

      case actions.ActionTypes.BULK_CANCEL_ORDER_STATUS_FAIL: {
        return Object.assign({}, state, {
          bulkStatusChange: {},
          bulkStatusChangeLoading: false,
          bulkStatusChangeLoaded: false,
          bulkStatusChangeFailed: true,
        });
      }

  // <------------------GET COUNT FOR ACCEPTED CANCEL ORDER REQUEST LIST--------------------> //

    case actions.ActionTypes.GET_ACCEPTED_COUNT_ACTION: {
      return Object.assign({}, state, {
        acceptedCount: '',
        acceptedCountLoading: true,
        acceptedCountLoaded: false,
        acceptedCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_ACCEPTED_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        acceptedCount: payload.data,
        acceptedCountLoading: false,
        acceptedCountLoaded: true,
        acceptedCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_ACCEPTED_COUNT_FAIL: {
      return Object.assign({}, state, {
        acceptedCount: '',
        acceptedCountLoading: false,
        acceptedCountLoaded: false,
        acceptedCountFailed: true,
      });
    }

  // <------------------GET COUNT FOR REJECTED CANCEL ORDER REQUEST LIST--------------------> //

      case actions.ActionTypes.GET_REJECTED_COUNT_ACTION: {
        return Object.assign({}, state, {
          rejectedCount: '',
          rejectedCountLoading: true,
          rejectedCountLoaded: false,
          rejectedCountFailed: false,
        });
      }

      case actions.ActionTypes.GET_REJECTED_COUNT_SUCCESS: {
        return Object.assign({}, state, {
          rejectedCount: payload.data,
          rejectedCountLoading: false,
          rejectedCountLoaded: true,
          rejectedCountFailed: false,
        });
      }

      case actions.ActionTypes.GET_REJECTED_COUNT_FAIL: {
        return Object.assign({}, state, {
          rejectedCount: '',
          rejectedCountLoading: false,
          rejectedCountLoaded: false,
          rejectedCountFailed: true,
        });
      }
    default: {
      return state;
    }

  }
}

//
export const cancelOrderList = (state: SalesCancelOrderState) => state.cancelOrderList;
export const cancelOrderListLoading = (state: SalesCancelOrderState) => state.cancelOrderListLoading;
export const cancelOrderListLoaded = (state: SalesCancelOrderState) => state.cancelOrderListLoaded;

export const cancelOrderListCount = (state: SalesCancelOrderState) => state.cancelOrderListCount;
export const cancelOrderListCountLoading = (state: SalesCancelOrderState) => state.cancelOrderListCountLoading;
export const cancelOrderListCountLoaded = (state: SalesCancelOrderState) => state.cancelOrderListCountLoaded;

export const changeCancelOrderStatus = (state: SalesCancelOrderState) => state.changeCancelOrderStatus;
export const changeCancelOrderStatusLoading = (state: SalesCancelOrderState) => state.changeCancelOrderStatusLoading;
export const changeCancelOrderStatusLoaded = (state: SalesCancelOrderState) => state.changeCancelOrderStatusLoaded;

export const bulkStatusChange = (state: SalesCancelOrderState) => state.bulkStatusChange;
export const bulkStatusChangeLoading = (state: SalesCancelOrderState) => state.bulkStatusChangeLoading;
export const bulkStatusChangeLoaded = (state: SalesCancelOrderState) => state.bulkStatusChangeLoaded;

export const rejectedCount = (state: SalesCancelOrderState) => state.rejectedCount;
export const rejectedCountLoading = (state: SalesCancelOrderState) => state.rejectedCountLoading;
export const rejectedCountLoaded = (state: SalesCancelOrderState) => state.rejectedCountLoaded;

export const acceptedCount = (state: SalesCancelOrderState) => state.acceptedCount;
export const acceptedCountLoading = (state: SalesCancelOrderState) => state.acceptedCountLoading;
export const acceptedCountLoaded = (state: SalesCancelOrderState) => state.acceptedCountLoaded;
