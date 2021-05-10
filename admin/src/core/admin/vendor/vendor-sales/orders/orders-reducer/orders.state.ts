import { Map, Record } from 'immutable';

export interface OrdersState extends Map<string, any> {
    ordersList: any;
    ordersListLoading: boolean;
    ordersListLoaded: boolean;
    ordersListFailed: boolean;
    ordersLogList: any;
    ordersLogListLoading: boolean;
    ordersLogListLoaded: boolean;
    ordersLogListFailed: boolean;
    ordersStatusList: any;
    ordersStatusListLoading: boolean;
    ordersStatusListLoaded: boolean;
    ordersStatusListFailed: boolean;
    orderDetail: any;
    orderDetailLoading: boolean;
    orderDetailLoaded: boolean;
    orderDetailFailed: boolean;
    orderStatusChange: any;
    orderStatusChangeLoading: boolean;
    orderStatusChangeLoaded: boolean;
    orderStatusChangeFailed: boolean;
    invoiceDetail: any;
    invoiceDetailLoading: boolean;
    invoiceDetailLoaded: boolean;
    invoiceDetailFailed: boolean;

    vendorArray: any;
}

export const OrdersRecord = Record({

  ordersList: [],
  ordersListLoading: false,
  ordersListLoaded: false,
  ordersListFailed: false,
  ordersLogList: {},
  ordersLogListLoading: false,
  ordersLogListLoaded: false,
  ordersLogListFailed: false,
  ordersStatusList: {},
  ordersStatusListLoading: false,
  ordersStatusListLoaded: false,
  ordersStatusListFailed: false,
  orderDetail: [],
  orderDetailLoading: false,
  orderDetailLoaded: false,
  orderDetailFailed: false,
  orderStatusChange: [],
  orderStatusChangeLoading: false,
  orderStatusChangeLoaded: false,
  orderStatusChangeFailed: false,
  invoiceDetail: false,
  invoiceDetailLoading: false,
  invoiceDetailLoaded: false,
  invoiceDetailFailed: false,

  vendorArray: []
});
