
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { OrderAddModel } from '../order-model/Order-add.model';
import { OrderListModel } from '../order-model/Order-list.model';

// import { SearchOptionListModel } from '../order-model/option-List.model';

export const ActionTypes = {

  GET_ORDER_DETAIL: type('[Add] Get Order Detail'),
  GET_ORDER_DETAIL_SUCCESS: type('[Add] Get Order Detail Success'),
  GET_ORDER_DETAIL_FAIL: type('[Add] Get Order Detail Fail'),

  GET_ARCHIVE_ORDER_DETAIL: type('[Add] Get Archive Order Detail'),
  GET_ARCHIVE_ORDER_DETAIL_SUCCESS: type('[Add] Get Archive Order Detail Success'),
  GET_ARCHIVE_ORDER_DETAIL_FAIL: type('[Add] Get Archive Order Detail Fail'),

  GET_RECENT_ORDER_LIST: type('[List] Do Recent Order list'),
  GET_RECENT_ORDER_LIST_SUCCESS: type('[List] Do Recent Order list Success'),
  GET_RECENT_ORDER_LIST_FAIL: type('[List] Do Recent Order list Fail'),

  GET_ORDER_COUNT: type('[List] Do Order count'),
  GET_ORDER_COUNT_SUCCESS: type('[List] Do Order count Success'),
  GET_ORDER_COUNT_FAIL: type('[List] Do Order count Fail'),

  GET_ALL_ORDER_LIST: type('[List] Do All Order list'),
  GET_ALL_ORDER_LIST_SUCCESS: type('[List] Do All Order list Success'),
  GET_ALL_ORDER_LIST_FAIL: type('[List] Do All Order list Fail'),

  GET_ARCHIVE_ORDER_LIST: type('[List] Do Archive Order list'),
  GET_ARCHIVE_ORDER_LIST_SUCCESS: type('[List] Do Archive Order list Success'),
  GET_ARCHIVE_ORDER_LIST_FAIL: type('[List] Do Archive Order list Fail'),

  GET_DELIVERY_PERSONS_LIST: type('[List] Do All delivery persons list'),
  GET_DELIVERY_PERSONS_LIST_SUCCESS: type('[List] Do All delivery persons list Success'),
  GET_DELIVERY_PERSONS_LIST_FAIL: type('[List] Do All delivery persons list Fail'),

  ALLOCATE_DELIVERY_PERSONS: type('[List] Do Allocate delivery persons'),
  ALLOCATE_DELIVERY_PERSONS_SUCCESS: type('[List] Do Allocate delivery persons Success'),
  ALLOCATE_DELIVERY_PERSONS_FAIL: type('[List] Do Allocate delivery persons Fail'),

  GET_ALL_ORDER_LIST_BASED_ON_STATUS: type('[List] Do All Order list based on status'),
  GET_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS: type('[List] Do All Order list based on status Success'),
  GET_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL: type('[List] Do All Order list based on status Fail'),

  UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS: type('[List] Do update All Order list based on status'),
  UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS: type('[List] Do update All Order list based on status Success'),
  UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL: type('[List] Do All update Order list based on status Fail'),

DECREASE_UPDATED_ORDER_COUNT: type('[List] Change count'),

  GET_ORDER_LOG_LIST: type('[List] Do Order log list'),
  GET_ORDER_LOG_LIST_SUCCESS: type('[List] Do Order log list Success'),
  GET_ORDER_LOG_LIST_FAIL: type('[List] Do Order log list Fail'),

  GET_ORDER_STATUS_LIST: type('[List] Do Order status list'),
  GET_ORDER_STATUS_LIST_SUCCESS: type('[List] Do Order status list Success'),
  GET_ORDER_STATUS_LIST_FAIL: type('[List] Do Order status list Fail'),

  GET_ORDER_STATUS_UPDATE: type('[List] Do Order status update'),
  GET_ORDER_STATUS_UPDATE_SUCCESS: type('[List] Do Order status update Success'),
  GET_ORDER_STATUS_UPDATE_FAIL: type('[List] Do Order status update Fail'),

  MAKE_ARCHIVE: type('[List] Do make archive'),
  MAKE_ARCHIVE_SUCCESS: type('[List] Do make archive Success'),
  MAKE_ARCHIVE_FAIL: type('[List] Do make archive Fail'),

  GET_SHIPPING_INFORMATION_UPDATE: type('[List] Do Shipping information update'),
  GET_SHIPPING_INFORMATION_UPDATE_SUCCESS: type('[List] Do Shipping information update Success'),
  GET_SHIPPING_INFORMATION_UPDATE_FAIL: type('[List] Do Shipping information update Fail'),


  EXPORT_ARCHIVE_ORDER: type('[Add] Export Archive Order'),
  EXPORT_ARCHIVE_ORDER_SUCCESS: type('[Add] Export Archive Order Success'),
  EXPORT_ARCHIVE_ORDER_FAIL: type('[Add] Export Archive Order Fail'),

  EXPORT_ALL_ARCHIVE_ORDER: type('[Add] Export All Archive Order'),
  EXPORT_ALL_ARCHIVE_ORDER_SUCCESS: type('[Add] Export All Archive Order Success'),
  EXPORT_ALL_ARCHIVE_ORDER_FAIL: type('[Add] Export All Archive Order Fail'),

  ARCHIVE_ORDER_LIST_COUNT: type('[Add] Archive Order List Count'),
  ARCHIVE_ORDER_LIST_COUNT_SUCCESS: type('[Add] Archive Order List Count Success'),
  ARCHIVE_ORDER_LIST_COUNT_FAIL: type('[Add] Archive Order List Count Fail'),

  REMOVE_EXPORT_SELECTION: type('[order export] Remove  order export selection'),

  CANCEL_ORDER_LIST: type('[List] Do Cancel Order list'),
  CANCEL_ORDER_LIST_SUCCESS: type('[List] Do Cancel Order list Success'),
  CANCEL_ORDER_LIST_FAIL: type('[List] Do Cancel Order list Fail'),

  CANCEL_ORDER_LIST_COUNT: type('[List] Do Cancel Order list count'),
  CANCEL_ORDER_LIST_COUNT_SUCCESS: type('[List] Do Cancel Order list count Success'),
  CANCEL_ORDER_LIST_COUNT_FAIL: type('[List] Do Cancel Order list count Fail'),

  EXPORT_CANCEL_ORDER: type('[Add] Export Cancel Order'),
  EXPORT_CANCEL_ORDER_SUCCESS: type('[Add] Export Cancel Order Success'),
  EXPORT_CANCEL_ORDER_FAIL: type('[Add] Export Cancel Order Fail'),

  EXPORT_ALL_CANCEL_ORDER: type('[Add] Export All Cancel Order'),
  EXPORT_ALL_CANCEL_ORDER_SUCCESS: type('[Add] Export All Cancel Order Success'),
  EXPORT_ALL_CANCEL_ORDER_FAIL: type('[Add] Export All Cancel Order Fail'),

  CHANGE_CANCEL_ORDER_STATUS: type('[List] Change Cancel Order status'),
  CHANGE_CANCEL_ORDER_STATUS_SUCCESS: type('[List] Change Cancel Order status Success'),
  CHANGE_CANCEL_ORDER_STATUS_FAIL: type('[List] Change Cancel Order status Fail'),

  BULK_CANCEL_ORDER_STATUS: type('[List] Bulk Cancel Order status'),
  BULK_CANCEL_ORDER_STATUS_SUCCESS: type('[List] Bulk Cancel Order status Success'),
  BULK_CANCEL_ORDER_STATUS_FAIL: type('[List] Bulk Cancel Order status Fail'),

  QUOTATION_LIST: type('[List] Do Quotation list'),
  QUOTATION_LIST_SUCCESS: type('[List] Do Quotation list Success'),
  QUOTATION_LIST_FAIL: type('[List] Do Quotation list Fail'),

  QUOTATION_LIST_COUNT: type('[List] Do Quotation list count'),
  QUOTATION_LIST_COUNT_SUCCESS: type('[List] Do Quotation list count Success'),
  QUOTATION_LIST_COUNT_FAIL: type('[List] Do Quotation list count Fail'),

  GET_ORDER_INVOICE_LIST: type('[Add] Get Order Invoice list'),
  GET_ORDER_INVOICE_LIST_SUCCESS: type('[Add] Get Order Invoice list Success'),
  GET_ORDER_INVOICE_LIST_FAIL: type('[Add] Get Order Invoice list Fail'),

  GET_ORDER_INVOICE_LIST_COUNT: type('[Add] Get Order Invoice list count'),
  GET_ORDER_INVOICE_LIST_COUNT_SUCCESS: type('[Add] Get Order Invoice list count Success'),
  GET_ORDER_INVOICE_LIST_COUNT_FAIL: type('[Add] Get Order Invoice list count Fail'),

  DOWNLOAD_INVOICE: type('[Add] Download Invoice'),
  DOWNLOAD_INVOICE_SUCCESS: type('[Add] Download Invoice Success'),
  DOWNLOAD_INVOICE_FAIL: type('[Add] Download Invoice Fail'),

  SETTLEMENT_LIST: type('[List] Do Settlement list'),
  SETTLEMENT_LIST_SUCCESS: type('[List] Do Settlement list Success'),
  SETTLEMENT_LIST_FAIL: type('[List] Do Settlement list Fail'),

  SETTLEMENT_LIST_COUNT: type('[List] Do Settlement list count'),
  SETTLEMENT_LIST_COUNT_SUCCESS: type('[List] Do Settlement list count Success'),
  SETTLEMENT_LIST_COUNT_FAIL: type('[List] Do Settlement list count Fail'),

  EXPORT_SALES_REPORT: type('[Add] Export Sales Report'),
  EXPORT_SALES_REPORT_SUCCESS: type('[Add] Export Sales Report Success'),
  EXPORT_SALES_REPORT_FAIL: type('[Add] Export Sales Report Fail'),

  SEND_MAIL: type('[Send Mail] Send Mail'),
  SEND_MAIL_SUCCESS: type('[Send Mail] Send Mail Success'),
  SEND_MAIL_FAIL: type('[Send Mail] Send Mail Fail'),


};



// get order detail action
export class GetOrderDetailAction implements Action {
  type = ActionTypes.GET_ORDER_DETAIL;

  constructor(public payload: OrderAddModel) {}
}

export class GetOrderDetailSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetOrderDetailFailAction implements Action {
  type = ActionTypes.GET_ORDER_DETAIL_FAIL;

  constructor(public payload: any = null) {}
}

// get order detail action
export class GetArchiveOrderDetailAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_DETAIL;

  constructor(public payload: OrderAddModel) {}
}

export class GetArchiveOrderDetailSuccessAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetArchiveOrderDetailFailAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_DETAIL_FAIL;

  constructor(public payload: any = null) {}
}
// recent order list action
export class GetRecentOrderlistAction implements Action {
  type = ActionTypes.GET_RECENT_ORDER_LIST;

  constructor(public payload: OrderListModel) {}
}

export class GetRecentOrderlistSuccessAction implements Action {
  type = ActionTypes.GET_RECENT_ORDER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetRecentOrderlistFailAction implements Action {
  type = ActionTypes.GET_RECENT_ORDER_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// all orders list action
export class GetAllOrderlistAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST;

  constructor(public payload: OrderListModel) {}
}

export class GetAllOrderlistSuccessAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetAllOrderlistFailAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// archive orders list action
export class GetArchiveOrderlistAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_LIST;

  constructor(public payload: OrderListModel) {}
}

export class GetArchiveOrderlistSuccessAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetArchiveOrderlistFailAction implements Action {
  type = ActionTypes.GET_ARCHIVE_ORDER_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// count for orders list action
export class GetOrderCountAction implements Action {
  type = ActionTypes.GET_ORDER_COUNT;

  constructor(public payload: OrderListModel) {}
}

export class GetOrderCountSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetOrderCountFailAction implements Action {
  type = ActionTypes.GET_ORDER_COUNT_FAIL;

  constructor(public payload: any = null) {}
}
// get delivery persons list action
export class GetDeliveryPersonsListAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_LIST;

  constructor(public payload: OrderListModel) {}
}

export class GetDeliveryPersonsListSuccessAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDeliveryPersonsListFailAction implements Action {
  type = ActionTypes.GET_DELIVERY_PERSONS_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// allocate delivery persons action
export class AllocateDeliveryPersonsAction implements Action {
  type = ActionTypes.ALLOCATE_DELIVERY_PERSONS;

  constructor(public payload: OrderListModel) {}
}

export class AllocateDeliveryPersonsSuccessAction implements Action {
  type = ActionTypes.ALLOCATE_DELIVERY_PERSONS_SUCCESS;

  constructor(public payload: any) {}
}

export class AllocateDeliveryPersonsFailAction implements Action {
  type = ActionTypes.ALLOCATE_DELIVERY_PERSONS_FAIL;

  constructor(public payload: any = null) {}
}
// all orders based on status list action
export class GetAllOrderlistBasedOnStatusAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS;

  constructor(public payload: OrderListModel) {}
}

export class GetAllOrderlistBasedOnStatusSuccessAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetAllOrderlistBasedOnStatusFailAction implements Action {
  type = ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL;

  constructor(public payload: any = null) {}
}
// update all orders based on status list action
export class UpdateAllOrderlistBasedOnStatusAction implements Action {
  type = ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS;

  constructor(public payload: any) {}
}

export class UpdateAllOrderlistBasedOnStatusSuccessAction implements Action {
  type = ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateAllOrderlistBasedOnStatusFailAction implements Action {
  type = ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL;

  constructor(public payload: any = null) {}
}

export class DecreaseUpdatedOrderCount implements Action {
  type = ActionTypes.DECREASE_UPDATED_ORDER_COUNT;

  constructor(public payload: any = null) {}
}
// order log list action
export class GetOrderLoglistAction implements Action {
  type = ActionTypes.GET_ORDER_LOG_LIST;

  constructor(public payload: any) {}
}

export class GetOrderLoglistSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_LOG_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetOrderLoglistFailAction implements Action {
  type = ActionTypes.GET_ORDER_LOG_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// order status list action
export class GetOrderStatuslistAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_LIST;

  constructor(public payload: any) {}
}

export class GetOrderStatuslistSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetOrderStatuslistFailAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// update order status list action
export class GetOrderStatusUpdateAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_UPDATE;

  constructor(public payload: any) {}
}

export class GetOrderStatusUpdateSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_UPDATE_SUCCESS;

  constructor(public payload: any) {}
}

export class GetOrderStatusUpdateFailAction implements Action {
  type = ActionTypes.GET_ORDER_STATUS_UPDATE_FAIL;

  constructor(public payload: any = null) {}
}
// make archive order action
export class MakeArchiveAction implements Action {
  type = ActionTypes.MAKE_ARCHIVE;

  constructor(public payload: any) {}
}

export class MakeArchiveSuccessAction implements Action {
  type = ActionTypes.MAKE_ARCHIVE_SUCCESS;

  constructor(public payload: any) {}
}

export class MakeArchiveFailAction implements Action {
  type = ActionTypes.MAKE_ARCHIVE_FAIL;

  constructor(public payload: any = null) {}
}
// update shipping information action
export class GetShippingInformationUpdateAction implements Action {
  type = ActionTypes.GET_SHIPPING_INFORMATION_UPDATE;

  constructor(public payload: any) {}
}

export class GetShippingInformationUpdateSuccessAction implements Action {
  type = ActionTypes.GET_SHIPPING_INFORMATION_UPDATE_SUCCESS;

  constructor(public payload: any) {}
}

export class GetShippingInformationUpdateFailAction implements Action {
  type = ActionTypes.GET_SHIPPING_INFORMATION_UPDATE_FAIL;

  constructor(public payload: any = null) {}
}

// export archive order

export class ExportArchiveOrderAction implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_ORDER;
  constructor(public payload: any) {}
}

export class ExportArchiveOrderSuccess implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_ORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportArchiveOrderFail implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_ORDER_FAIL;
  constructor(public payload: any = null) {}
}


// export all archive order

export class ExportAllArchiveOrderAction implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_ORDER;
  constructor(public payload: any) {}
}

export class ExportAllArchiveOrderSuccess implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_ORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportAllArchiveOrderFail implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_ORDER_FAIL;
  constructor(public payload: any = null) {}
}

// archive order list count

export class ArchiveOrderListCountAction implements Action {
  type = ActionTypes.ARCHIVE_ORDER_LIST_COUNT;
  constructor(public payload: any) {}
}

export class ArchiveOrderListCountSuccess implements Action {
  type = ActionTypes.ARCHIVE_ORDER_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class ArchiveOrderListCountFail implements Action {
  type = ActionTypes.ARCHIVE_ORDER_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// remove order selection

export class RemoveExportSelection implements Action {
  type = ActionTypes.REMOVE_EXPORT_SELECTION;
  constructor(public payload: any) {}
}

// cancel order list actions

export class CancelOrderListAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST;
  constructor(public payload: any) {}
}

export class CancelOrderListSuccessAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_SUCCESS;
  constructor(public payload: any) {}
}
export class CancelOrderListFailAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_FAIL;
  constructor(public payload: any) {}
}

// cancel order list count

export class CancelOrderListCountAction implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_COUNT;
  constructor(public payload: any) {}
}

export class CancelOrderListCountSuccess implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class CancelOrderListCountFail implements Action {
  type = ActionTypes.CANCEL_ORDER_LIST_COUNT_FAIL;
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

// export All cancel order

export class ExportAllCancelOrderAction implements Action {
  type = ActionTypes.EXPORT_ALL_CANCEL_ORDER;
  constructor(public payload: any) {}
}

export class ExportAllCancelOrderSuccess implements Action {
  type = ActionTypes.EXPORT_ALL_CANCEL_ORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportAllCancelOrderFail implements Action {
  type = ActionTypes.EXPORT_ALL_CANCEL_ORDER_FAIL;
  constructor(public payload: any = null) {}
}


// change cancel order status

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

// Bulkge cancel order status

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

// quotation list count

export class QuotationListCountAction implements Action {
  type = ActionTypes.QUOTATION_LIST_COUNT;
  constructor(public payload: any) {}
}

export class QuotationListCountSuccess implements Action {
  type = ActionTypes.QUOTATION_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class QuotationListCountFail implements Action {
  type = ActionTypes.QUOTATION_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// quotation list

export class QuotationListAction implements Action {
  type = ActionTypes.QUOTATION_LIST;
  constructor(public payload: any) {}
}

export class QuotationListSuccess implements Action {
  type = ActionTypes.QUOTATION_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class QuotationListFail implements Action {
  type = ActionTypes.QUOTATION_LIST_FAIL;
  constructor(public payload: any = null) {}
}

// get order invoice list

export class OrderInvoiceListAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST;
  constructor(public payload: any) {}
}

export class OrderInvoiceListSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class OrderInvoiceListFailAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST_FAIL;
  constructor(public payload: any = null) {}
}

// get order invoice list count

export class OrderInvoiceListCountAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST_COUNT;
  constructor(public payload: any) {}
}

export class OrderInvoiceListCountSuccessAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class OrderInvoiceListCountFailAction implements Action {
  type = ActionTypes.GET_ORDER_INVOICE_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// download invoice from invoice list

export class DownloadInvoiceAction implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE;
  constructor(public payload: any) {}
}

export class DownloadInvoiceSuccessAction implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_SUCCESS;
  constructor(public payload: any) {}
}

export class DownloadInvoiceFailAction implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_FAIL;
  constructor(public payload: any = null) {}
}



// settlement list

export class SettlementListAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST;
  constructor(public payload: any) {}
}

export class SettlementListSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class SettlementListFailAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST_FAIL;
  constructor(public payload: any = null) {}
}

// settlement list count

export class SettlementListCountAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST_COUNT;
  constructor(public payload: any) {}
}

export class SettlementListCountSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class SettlementListCountFailAction implements Action {
  type = ActionTypes.SETTLEMENT_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}


export class ExportSalesReportAction implements Action {
  type = ActionTypes.EXPORT_SALES_REPORT;
  constructor(public payload: any) {}
}

export class ExportSalesReportSuccessAction implements Action {
  type = ActionTypes.EXPORT_SALES_REPORT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportSalesReportFailAction implements Action {
  type = ActionTypes.EXPORT_SALES_REPORT_FAIL;
  constructor(public payload: any = null) {}
}

// SEND MAIL

export class SendMailAction implements Action {
  type = ActionTypes.SEND_MAIL;
  constructor(public payload: any) {}
}

export class SendMailActionSuccessAction implements Action {
  type = ActionTypes.SEND_MAIL_SUCCESS;
  constructor(public payload: any) {}
}

export class SendMailActionFailAction implements Action {
  type = ActionTypes.SEND_MAIL_FAIL;
  constructor(public payload: any = null) {}
}

export type Actions =
  | GetRecentOrderlistAction
  | GetRecentOrderlistSuccessAction
  | GetRecentOrderlistFailAction
  | GetAllOrderlistAction
  | GetAllOrderlistSuccessAction
  | GetAllOrderlistFailAction
  | GetArchiveOrderlistAction
  | GetArchiveOrderlistSuccessAction
  | GetArchiveOrderlistFailAction
  | GetOrderCountAction
  | GetOrderCountSuccessAction
  | GetOrderCountFailAction
  | GetDeliveryPersonsListAction
  | GetDeliveryPersonsListSuccessAction
  | GetDeliveryPersonsListFailAction
  | AllocateDeliveryPersonsAction
  | AllocateDeliveryPersonsSuccessAction
  | AllocateDeliveryPersonsFailAction
  | GetAllOrderlistBasedOnStatusAction
  | GetAllOrderlistBasedOnStatusSuccessAction
  | GetAllOrderlistBasedOnStatusFailAction
  | UpdateAllOrderlistBasedOnStatusAction
  | UpdateAllOrderlistBasedOnStatusSuccessAction
  | UpdateAllOrderlistBasedOnStatusFailAction
  | GetOrderLoglistAction
  | GetOrderLoglistSuccessAction
  | GetOrderLoglistFailAction
  | GetOrderDetailAction
  | GetOrderDetailSuccessAction
  | GetOrderDetailFailAction
  | GetArchiveOrderDetailAction
  | GetArchiveOrderDetailSuccessAction
  | GetArchiveOrderDetailFailAction
  | GetOrderStatuslistAction
  | GetOrderStatuslistSuccessAction
  | GetOrderStatuslistFailAction
  | GetOrderStatusUpdateAction
  | GetOrderStatusUpdateSuccessAction
  | GetOrderStatusUpdateFailAction
  | MakeArchiveAction
  | MakeArchiveSuccessAction
  | MakeArchiveFailAction
  | ExportAllArchiveOrderAction
  | ExportAllArchiveOrderSuccess
  | ExportAllArchiveOrderFail
  | ArchiveOrderListCountAction
  | ArchiveOrderListCountSuccess
  | ArchiveOrderListCountFail;

