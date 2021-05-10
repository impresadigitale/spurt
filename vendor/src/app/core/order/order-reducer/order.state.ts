

import { Map, Record } from 'immutable';
import { OrderAddResponseModel } from '../order-model/order-add-response.model';
import { DetailResponseModel } from '../order-model/detail-response.model';
import { orderStatusListLoading } from './order.reducer';

export interface OrderState extends Map<string, any> {

  orderAdded: any;
  optionList: any;
  gettingoptionList: any;
  getRatingList: any;
  ratingStatus: any;
  orderBulkDelete: any;


  recentListLoading: boolean;
  recentListLoaded: boolean;
  recentListFailed: boolean;
  todayRecentOrderList: Array<any>;
  prevRecentOrderList: Array<any>;
  recentOrder: any;

  allListLoading: boolean;
  allListLoaded: boolean;
  allListFailed: boolean;
  allOrderList: Array<any>;

  archiveListLoading: boolean;
  archiveListLoaded: boolean;
  archiveListFailed: boolean;
  archiveOrderList: Array<any>;

  deliveryPersonsListLoading: boolean;
  deliveryPersonsListLoaded: boolean;
  deliveryPersonsListFailed: boolean;
  deliveryPersonsList: Array<any>;

  allocateDeliveryPersonsLoading: boolean;
  allocateDeliveryPersonsLoaded: boolean;
  allocateDeliveryPersonsFailed: boolean;
  allocateDeliveryPersons: Array<any>;
  allOrdersBasedOnStatusListLoading: boolean;
  allOrdersBasedOnStatusListLoaded: boolean;
  allOrdersBasedOnStatusListFailed: boolean;
  allOrdersBasedOnStatusList: Array<any>;


  updateAllOrdersBasedOnStatusListLoading: boolean;
  updateAllOrdersBasedOnStatusListLoaded: boolean;
  updateAllOrdersBasedOnStatusListFailed: boolean;
  updateAllOrdersBasedOnStatusList: any;

  logListLoading: boolean;
  logListLoaded: boolean;
  logListFailed: boolean;
  orderLogList: Array<any>;

  updateOrderStatusLoading: boolean;
  updateOrderStatusLoaded: boolean;
  updateOrderStatusFailed: boolean;
  updateOrderStatus: Array<any>;

  makeArchiveLoading: boolean;
  makeArchiveLoaded: boolean;
  makeArchiveFailed: boolean;
  makeArchive: Array<any>;

  updateShippingInformationLoading: boolean;
  updateShippingInformationLoaded: boolean;
  updateShippingInformationFailed: boolean;
  updateShippingInformation: Array<any>;

  detailLoading: boolean;
  detailLoaded: boolean;
  detailFailed: boolean;
  orderDetail: any;

  archiveDetailLoading: boolean;
  archiveDetailLoaded: boolean;
  archiveDetailFailed: boolean;
  archiveOrderDetail: any;

  orderCountLoading: boolean;
  orderCountLoaded: boolean;
  orderCountFailed: boolean;
  orderCount: any;

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;
  categoryListLoading: boolean;
  categoryList: Array<any>;
  tempCategoryList: Array<any>;

  orderStatusListLoading: boolean;
  orderStatusList: Array<any>;


  exportArchiveOrderLoading: boolean;
  exportArchiveOrderLoaded: boolean;
  exportArchiveOrderFailed: boolean;

  exportAllArchiveOrderLoading: boolean;
  exportAllArchiveOrderLoaded: boolean;
  exportAllArchiveOrderFailed: boolean;

  archiveOrderListCount: boolean;
  archiveOrderListCountLoading: boolean;
  archiveOrderListCountLoaded: boolean;

  cancelOrderListCount: any;
  cancelOrderListCountLoading: boolean;
  cancelOrderListCountLoaded: boolean;

  cancelOrderList: any;
  cancelOrderListLoading: boolean;
  cancelOrderListLoaded: boolean;

  exportCancelOrder: any;
  exportCancelOrderLoading: boolean;
  exportCancelOrderLoaded: boolean;

  exportAllCancelOrder: any;
  exportAllCancelOrderLoading: boolean;
  exportAllCancelOrderLoaded: boolean;

  cancelOrderStatus: any;
  cancelOrderStatusLoading: boolean;
  cancelOrderStatusLoaded: boolean;

  bulkCancelOrderStatus: any;
  bulkCancelOrderStatusLoading: boolean;
  bulkCancelOrderStatusLoaded: boolean;

  quotationList: any;
  quotationListLoading: boolean;
  quotationListLoaded: boolean;
  quotationListFailed: boolean;

  quotationListCount: any;
  quotationListCountLoading: boolean;
  quotationListCountLoaded: boolean;
  quotationListCountFailed: boolean;

  cancelRequest: any;

  orderInvoiceListLoading: boolean;
  orderInvoiceListLoaded: boolean;
  orderInvoiceListFailed: boolean;
  orderInvoiceList: any;

  orderInvoiceListCountLoading: boolean;
  orderInvoiceListCountLoaded: boolean;
  orderInvoiceListCountFailed: boolean;
  orderInvoiceListCount: any;

  downloadInvoice: number;
  downloadInvoiceLoading: boolean;
  downloadInvoiceLoaded: boolean;
  downloadInvoiceFailed: boolean;



  settlementList: any;
  settlementListLoading: boolean;
  settlementListLoaded: boolean;
  settlementListFailed: boolean;

  settlementListCount: any;
  settlementCountLoading: boolean;
  settlementCountLoaded: boolean;
  settlementCountFailed: boolean;


  exportSalesOrderLoading: boolean;
  exportSalesOrderLoaded: boolean;
  exportSalesOrderFailed: boolean;

  sendMailLoading: boolean;
  sendMailLoaded: boolean;
  sendMailFailed: boolean;

}

export const OrderStateRecord = Record({

  orderAdded: {},

  recentListLoading: false,
  recentListLoaded: false,
  recentListFailed: false,
  todayRecentOrderList: [],
  prevRecentOrderList: [],
  recentOrder: {},

  allListLoading: false,
  allListLoaded: false,
  allListFailed: false,
  allOrderList: [],

  archiveListLoading: false,
  archiveListLoaded: false,
  archiveListFailed: false,
  archiveOrderList: [],

  deliveryPersonsListLoading: false,
  deliveryPersonsListLoaded: false,
  deliveryPersonsListFailed: false,
  deliveryPersonsOrderList: [],
  allocateDeliveryPersonsLoading: false,
  allocateDeliveryPersonsLoaded: false,
  allocateDeliveryPersonsFailed: false,
  allocateDeliveryPersons: {},
  allOrdersBasedOnStatusListLoading: false,
  allOrdersBasedOnStatusListLoaded: false,
  allOrdersBasedOnStatusListFailed: false,
  allOrdersBasedOnStatusList: [],

  updateAllOrdersBasedOnStatusListLoading: false,
  updateAllOrdersBasedOnStatusListLoaded: false,
  updateAllOrdersBasedOnStatusListFailed: false,
  updateAllOrdersBasedOnStatusList: {},

  logListLoading: false,
  logListLoaded: false,
  logListFailed: false,
  orderLogList: [],

  updateOrderStatusLoading: false,
  updateOrderStatusLoaded: false,
  updateOrderStatusFailed: false,
  updateOrderStatus: [],


  makeArchiveLoading: false,
  makeArchiveLoaded: false,
  makeArchiveFailed: false,
  makeArchive: [],

  updateShippingInformationLoading: false,
  updateShippingInformationLoaded: false,
  updateShippingInformationFailed: false,
  updateShippingInformation: [],

  detailLoading: false,
  detailLoaded: false,
  detailFailed: false,
  orderDetail: {},

  archiveDetailLoading: false,
  archiveDetailLoaded: false,
  archiveDetailFailed: false,
  archiveOrderDetail: {},

  orderCountLoading: false,
  orderCountLoaded: false,
  orderCountFailed: false,
  orderCount: {},

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  tempCategoryList: [],

  orderStatusListLoading: false,
  orderStatusList: [],

  exportArchiveOrderLoading: false,
  exportArchiveOrderLoaded: false,
  exportArchiveOrderFailed: false,

  exportAllArchiveOrderLoading: false,
  exportAllArchiveOrderLoaded: false,
  exportAllArchiveOrderFailed: false,

  archiveOrderListCount: '',
  archiveOrderListCountLoading: false,
  archiveOrderListCountLoaded: false,

  cancelOrderListCount: '',
  cancelOrderListCountLoading: false,
  cancelOrderListCountLoaded: false,

  cancelOrderList: [],
  cancelOrderListLoading: false,
  cancelOrderListLoaded: false,

  exportCancelOrder: {},
  exportCancelOrderLoading: false,
  exportCancelOrderLoaded: false,

  exportAllCancelOrder: {},
  exportAllCancelOrderLoading: false,
  exportAllCancelOrderLoaded: false,

  cancelOrderStatus: {},
  cancelOrderStatusLoading: false,
  cancelOrderStatusLoaded: false,

  bulkCancelOrderStatus: {},
  bulkCancelOrderStatusLoading: false,
  bulkCancelOrderStatusLoaded: false,

  quotationList: [],
  quotationListLoading: false,
  quotationListLoaded: false,
  quotationListFailed: false,

  quotationListCount: '',
  quotationListCountLoading: false,
  quotationListCountLoaded: false,
  quotationListCountFailed: false,

  cancelRequest: {},

  orderInvoiceListLoading: false,
  orderInvoiceListLoaded: false,
  orderInvoiceListFailed: false,
  orderInvoiceList: [],

  orderInvoiceListCountLoading: false,
  orderInvoiceListCountLoaded: false,
  orderInvoiceListCountFailed: false,
  orderInvoiceListCount: '',

  downloadInvoice: {},
  downloadInvoiceLoading: false,
  downloadInvoiceLoaded: false,
  downloadInvoiceFailed: false,


  settlementList: [],
  settlementListLoading: false,
  settlementListLoaded: false,
  settlementListFailed: false,

  settlementListCount: '',
  settlementCountLoading: false,
  settlementCountLoaded: false,
  settlementCountFailed: false,

  exportSalesOrderLoading: false,
  exportSalesOrderLoaded: false,
  exportSalesOrderFailed: false,

  sendMailLoading: false,
  sendMailLoaded: false,
  sendMailFailed: false,

});
