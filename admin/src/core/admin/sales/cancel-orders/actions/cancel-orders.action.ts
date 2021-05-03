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
import { type } from '../../../shared/utility/utilityHelpers';

export const ActionTypes = {

  GET_CANCEL_ORDER_LIST_ACTION: type('[Cancel-Order] Get Cancel Order List'),
  GET_CANCEL_ORDER_LIST_SUCCESS: type('[Cancel-Order] Get Cancel Order List success'),
  GET_CANCEL_ORDER_LIST_FAIL: type('[Cancel-Order]Get Cancel Order List Fail'),

  CANCEL_ORDER_LIST_COUNT_ACTION: type('[Cancel-Order] Cancel Order List Count Action'),
  CANCEL_ORDER_LIST_COUNT_SUCCESS: type('[Cancel-Order] Get Cancel Order List Count success'),
  CANCEL_ORDER_LIST_COUNT_FAIL: type('[Cancel-Order] Get Cancel Order List Count Fail'),

  CHANGE_CANCEL_ORDER_STATUS: type('[Cancel-Order] Change Cancel Order Status Action'),
  CHANGE_CANCEL_ORDER_STATUS_SUCCESS: type('[Cancel-Order] Change Cancel Order Status success'),
  CHANGE_CANCEL_ORDER_STATUS_FAIL: type('[Cancel-Order] Change Cancel Order Status Fail'),

  EXPORT_CANCEL_ORDER: type('[Cancel-Order] Export Cancel Order'),
  EXPORT_CANCEL_ORDER_SUCCESS: type('[Cancel-Order] Export Cancel Order success'),
  EXPORT_CANCEL_ORDER_FAIL: type('[Cancel-Order]Get Export Cancel Order Fail'),

  EXPORT_BULK_CANCEL_ORDER: type('[Cancel-Order] Export Bulk Cancel Order'),
  EXPORT_BULK_CANCEL_ORDER_SUCCESS: type('[Cancel-Order] Export Bulk Cancel Order success'),
  EXPORT_BULK_CANCEL_ORDER_FAIL: type('[Cancel-Order]Get Export Bulk Cancel Order Fail'),

  BULK_CANCEL_ORDER_STATUS: type('[Cancel-Order] Bulk Cancel Order Status'),
  BULK_CANCEL_ORDER_STATUS_SUCCESS: type('[Cancel-Order] Bulk Cancel Order Status success'),
  BULK_CANCEL_ORDER_STATUS_FAIL: type('[Cancel-Order] Bulk Cancel Order Status Fail'),

  GET_ACCEPTED_COUNT_ACTION: type('[Cancel-Order] Cancel Order Accepted Count Action'),
  GET_ACCEPTED_COUNT_SUCCESS: type('[Cancel-Order] Get Cancel Order Accepted Count success'),
  GET_ACCEPTED_COUNT_FAIL: type('[Cancel-Order] Get Cancel Order Accepted Count Fail'),

  GET_REJECTED_COUNT_ACTION: type('[Cancel-Order] Cancel Order Rejected Count Action'),
  GET_REJECTED_COUNT_SUCCESS: type('[Cancel-Order] Get Cancel Order Rejected Count success'),
  GET_REJECTED_COUNT_FAIL: type('[Cancel-Order] Get Cancel Order Rejected Count Fail'),
};

// payments list

export class GetCancelOrderListAction implements Action {
  type = ActionTypes.GET_CANCEL_ORDER_LIST_ACTION;
  constructor(public payload: any) {}
}

export class GetCancelOrderListSuccessAction implements Action {
  type = ActionTypes.GET_CANCEL_ORDER_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCancelOrderListFailAction implements Action {
  type = ActionTypes.GET_CANCEL_ORDER_LIST_FAIL;
  constructor(public payload: any = null) {}
}

// payments list count

export class CancelOrderListCountAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_COUNT_ACTION;
  constructor(public payload: any) {}
}

export class CancelOrderListSuccessAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class CancelOrderListFailAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// payments list count

export class ChangeCancelOrderStatusAction implements Action {
  type = ActionTypes.CHANGE_CANCEL_ORDER_STATUS;
  constructor(public payload: any) {}
}

export class ChangeCancelOrderStatusSuccess implements Action {
  type = ActionTypes.CHANGE_CANCEL_ORDER_STATUS_SUCCESS;
  constructor(public payload: any) {}
}

export class ChangeCancelOrderStatusFail implements Action {
  type = ActionTypes.CHANGE_CANCEL_ORDER_STATUS_FAIL;
  constructor(public payload: any = null) {}
}

// export cancel order

export class ExportCancelOrderAction implements Action {
  type = ActionTypes.EXPORT_CANCEL_ORDER;
  constructor(public payload: any) {}
}

export class ExportCancelOrderSuccess implements Action {
  type = ActionTypes.EXPORT_CANCEL_ORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportCancelOrderFail implements Action {
  type = ActionTypes.EXPORT_CANCEL_ORDER_FAIL;
  constructor(public payload: any = null) {}
}

// export bulk  cancel order

export class ExportBulkCancelOrderAction implements Action {
  type = ActionTypes.EXPORT_BULK_CANCEL_ORDER;
  constructor(public payload: any) {}
}

export class ExportBulkCancelOrderSuccess implements Action {
  type = ActionTypes.EXPORT_BULK_CANCEL_ORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportBulkCancelOrderFail implements Action {
  type = ActionTypes.EXPORT_BULK_CANCEL_ORDER_FAIL;
  constructor(public payload: any = null) {}
}

// bulk  cancel order status

export class BulkCancelOrderStatusAction implements Action {
  type = ActionTypes.BULK_CANCEL_ORDER_STATUS;
  constructor(public payload: any) {}
}

export class BulkCancelOrderStatusSuccess implements Action {
  type = ActionTypes.BULK_CANCEL_ORDER_STATUS_SUCCESS;
  constructor(public payload: any) {}
}

export class BulkCancelOrderStatusFail implements Action {
  type = ActionTypes.BULK_CANCEL_ORDER_STATUS_FAIL;
  constructor(public payload: any = null) {}
}

// get cancel order accepted count

export class GetAcceptedCountAction implements Action {
  type = ActionTypes.GET_ACCEPTED_COUNT_ACTION;
  constructor(public payload: any) {}
}

export class GetAcceptedCountSuccess implements Action {
  type = ActionTypes.GET_ACCEPTED_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetAcceptedCountFail implements Action {
  type = ActionTypes.GET_ACCEPTED_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// get cancel order rejected count

export class GetRejectedCountAction implements Action {
  type = ActionTypes.GET_REJECTED_COUNT_ACTION;
  constructor(public payload: any) {}
}

export class GetRejectedCountSuccess implements Action {
  type = ActionTypes.GET_REJECTED_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetRejectedCountFail implements Action {
  type = ActionTypes.GET_REJECTED_COUNT_FAIL;
  constructor(public payload: any = null) {}
}


export type Actions =
  | GetCancelOrderListAction
  | GetCancelOrderListSuccessAction
  | GetCancelOrderListFailAction
  | CancelOrderListCountAction
  | CancelOrderListSuccessAction
  | CancelOrderListFailAction
  | ChangeCancelOrderStatusAction
  | ChangeCancelOrderStatusSuccess
  | ChangeCancelOrderStatusFail
  | ExportCancelOrderAction
  | ExportCancelOrderSuccess
  | ExportCancelOrderFail
  | ExportBulkCancelOrderAction
  | ExportBulkCancelOrderSuccess
  | ExportBulkCancelOrderFail
  | BulkCancelOrderStatusAction
  | BulkCancelOrderStatusSuccess
  |BulkCancelOrderStatusFail;
