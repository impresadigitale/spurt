/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface SalesCancelOrderState extends Map<string, any> {

  cancelOrderList: any;
  cancelOrderListLoading: boolean;
  cancelOrderListLoaded: boolean;
  cancelOrderListFailed: boolean;

  cancelOrderListCount: any;
  cancelOrderListCountLoading: boolean;
  cancelOrderListCountLoaded: boolean;
  cancelOrderListCountFailed: boolean;

  changeCancelOrderStatus: any;
  changeCancelOrderStatusLoading: boolean;
  changeCancelOrderStatusLoaded: boolean;
  changeCancelOrderStatusFailed: boolean;

  bulkStatusChange: any;
  bulkStatusChangeLoading: boolean;
  bulkStatusChangeLoaded: boolean;
  bulkStatusChangeFailed: boolean;

  rejectedCount: any;
  rejectedCountLoading: boolean;
  rejectedCountLoaded: boolean;
  rejectedCountFailed: boolean;

  acceptedCount: any;
  acceptedCountLoading: boolean;
  acceptedCountLoaded: boolean;
  acceptedCountFailed: boolean;

  cancelRequest: any;
}

export const SalesCancelOrderStateRecord = Record({

  cancelOrderList: [],
  cancelOrderListLoading: false,
  cancelOrderListLoaded: false,
  cancelOrderListFailed: false,

  cancelOrderListCount: [],
  cancelOrderListCountLoading: false,
  cancelOrderListCountLoaded: false,
  cancelOrderListCountFailed: false,

  changeCancelOrderStatus: {},
  changeCancelOrderStatusLoading: false,
  changeCancelOrderStatusLoaded: false,
  changeCancelOrderStatusFailed: false,

  bulkStatusChange: {},
  bulkStatusChangeLoading: false,
  bulkStatusChangeLoaded: false,
  bulkStatusChangeFailed: false,

  rejectedCount: '',
  rejectedCountLoading: false,
  rejectedCountLoaded: false,
  rejectedCountFailed: false,

  acceptedCount: '',
  acceptedCountLoading: false,
  acceptedCountLoaded: false,
  acceptedCountFailed: false,
  cancelRequest: {}
});
