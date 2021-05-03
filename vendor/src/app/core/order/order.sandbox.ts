/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as orderActions from './order-action/order.action';
// app state
import * as store from '../app.state.interface';
// router
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
// notifications

import {
  // order add selectors
  // getRecentOrderList,
  RecentOrderListFailed, ArchiveOrderList, ArchiveOrderListFailed, ArchiveOrderListLoaded, ArchiveOrderListLoading,
  RecentOrderListLoaded, OrderCount, OrderCountFailed, OrderCountLoaded, OrderCountLoading,
  RecentOrderListLoading, AllocateDeliveryPersonsFailed, AllocateDeliveryPersonsList, AllocateDeliveryPersonsLoaded, AllocateDeliveryPersonsLoading,
  AllOrderList, AllOrderListFailed, AllOrderListLoaded, AllOrderListLoading, recentOrderList,
  orderStatusListLoading, ShippingInformationUpdate, ShippingInformationUpdateFailed, ShippingInformationUpdateLoaded, ShippingInformationUpdateLoading,
  orderStatusList, DeliveryPersonsList, DeliveryPersonsListFailed, DeliveryPersonsListLoaded, DeliveryPersonsListLoading,
  todayRecentOrderList, UpdateAllOrderListBasedOnStatus, UpdateAllOrderListBasedOnStatusFailed, UpdateAllOrderListBasedOnStatusLoaded, UpdateAllOrderListBasedOnStatusLoading,
  prevRecentOrderList, AllOrderListBasedOnStatus, AllOrderListBasedOnStatusFailed, AllOrderListBasedOnStatusLoaded, AllOrderListBasedOnStatusLoading,
  OrderLogList, OrderLogListFailed, OrderLogListLoaded, OrderLogListLoading, MakeArchive, MakeArchiveFailed, MakeArchiveLoaded, MakeArchiveLoading,
  OrderDetail, OrderDetailFailed, OrderDetailLoaded, OrderDetailLoading, ArchiveOrderDetail, ArchiveOrderDetailFailed, ArchiveOrderDetailLoaded,
  ArchiveOrderDetailLoading, OrderStatusUpdate, OrderStatusUpdateFailed, OrderStatusUpdateLoaded, OrderStatusUpdateLoading,
  exportArchiveOrderLoading,
  exportArchiveOrderLoaded,
  exportAllArchiveOrderLoading,
  archiveOrderListCount,
  cancelOrderList,
  cancelOrderListLoading,
  cancelOrderListLoaded,
  cancelOrderListCount,
  cancelOrderListCountLoading,
  cancelOrderListCountLoaded,
  exportCancelOrderLoading,
  exportCancelOrderLoaded,
  exportAllCancelOrderLoaded,
  exportAllCancelOrderLoading,
  cancelOrderStatusLoading,
  cancelOrderStatusLoaded,
  bulkCancelOrderStatusLoading,
  bulkCancelOrderStatusLoaded,
  quotationList,
  quotationListCount,
  quotationListLoaded,
  quotationListLoading,
  orderInvoiceList,
  orderInvoiceListCount,
  orderInvoiceListLoading,
  orderInvoiceListLoaded,
  downloadInvoice,
  downloadInvoiceLoading,
  downloadInvoiceLoaded,
  settlementList,
  settlementListCount,
  settlementListLoaded,
  settlementListLoading,
  exportSalesOrderLoading,
  exportSalesOrderLoaded,
  sendMailLoading,
  sendMailLoaded
  // order update selectors

} from './order-reducer/order.selector';
import { OrderListModel } from './order-model/Order-list.model';

@Injectable()
export class OrderSandbox {


  public orderDetail$ = this.appState.select(OrderDetail);
  public orderDetailLoading$ = this.appState.select(OrderDetailLoading);
  public orderDetailLoaded$ = this.appState.select(OrderDetailLoaded);
  public orderDetailFailed$ = this.appState.select(OrderDetailFailed);

  public archiveOrderDetail$ = this.appState.select(ArchiveOrderDetail);
  public archiveOrderDetailLoading$ = this.appState.select(ArchiveOrderDetailLoading);
  public archiveOrderDetailLoaded$ = this.appState.select(ArchiveOrderDetailLoaded);
  public archiveOrderDetailFailed$ = this.appState.select(ArchiveOrderDetailFailed);

  public orderCount$ = this.appState.select(OrderCount);
  public orderCountLoading$ = this.appState.select(OrderCountLoading);
  public orderCountLoaded$ = this.appState.select(OrderCountLoaded);
  public orderCountFailed$ = this.appState.select(OrderCountFailed);

  public allOrderListLoading$ = this.appState.select(AllOrderListLoading);
  public allOrderListLoaded$ = this.appState.select(AllOrderListLoaded);
  public allOrderListFailed$ = this.appState.select(AllOrderListFailed);
  public allOrderList$ = this.appState.select(AllOrderList);

  public archiveOrderListLoading$ = this.appState.select(ArchiveOrderListLoading);
  public archiveOrderListLoaded$ = this.appState.select(ArchiveOrderListLoaded);
  public archiveOrderListFailed$ = this.appState.select(ArchiveOrderListFailed);
  public archiveOrderList$ = this.appState.select(ArchiveOrderList);

  public deliveryPersonsListLoading$ = this.appState.select(DeliveryPersonsListLoading);
  public deliveryPersonsListLoaded$ = this.appState.select(DeliveryPersonsListLoaded);
  public deliveryPersonsListFailed$ = this.appState.select(DeliveryPersonsListFailed);
  public deliveryPersonsList$ = this.appState.select(DeliveryPersonsList);
  public allocateDeliveryPersonsListLoading$ = this.appState.select(AllocateDeliveryPersonsLoading);
  public allocateDeliveryPersonsListLoaded$ = this.appState.select(AllocateDeliveryPersonsLoaded);
  public allocateDeliveryPersonsListFailed$ = this.appState.select(AllocateDeliveryPersonsFailed);
  public allocateDeliveryPersonsList$ = this.appState.select(AllocateDeliveryPersonsList);

  public allOrderListBasedOnStatusLoading$ = this.appState.select(AllOrderListBasedOnStatusLoading);
  public allOrderListBasedOnStatusLoaded$ = this.appState.select(AllOrderListBasedOnStatusLoaded);
  public allOrderListBasedOnStatusFailed$ = this.appState.select(AllOrderListBasedOnStatusFailed);
  public allOrderListBasedOnStatus$ = this.appState.select(AllOrderListBasedOnStatus);

  public updateAllOrderListBasedOnStatusLoading$ = this.appState.select(UpdateAllOrderListBasedOnStatusLoading);
  public updateAllOrderListBasedOnStatusLoaded$ = this.appState.select(UpdateAllOrderListBasedOnStatusLoaded);
  public updateAllOrderListBasedOnStatusFailed$ = this.appState.select(UpdateAllOrderListBasedOnStatusFailed);
  public updateAllOrderListBasedOnStatus$ = this.appState.select(UpdateAllOrderListBasedOnStatus);

  public logOrderListLoading$ = this.appState.select(OrderLogListLoading);
  public logOrderListLoaded$ = this.appState.select(OrderLogListLoaded);
  public logOrderListFailed$ = this.appState.select(OrderLogListFailed);
  public logOrderList$ = this.appState.select(OrderLogList);

  public updateOrderStatusLoading$ = this.appState.select(OrderStatusUpdateLoading);
  public updateOrderStatusLoaded$ = this.appState.select(OrderStatusUpdateLoaded);
  public updateOrderStatusFailed$ = this.appState.select(OrderStatusUpdateFailed);
  public updateOrderStatusList$ = this.appState.select(OrderStatusUpdate);

  public makeArchiveLoading$ = this.appState.select(MakeArchiveLoading);
  public makeArchiveLoaded$ = this.appState.select(MakeArchiveLoaded);
  public makeArchiveFailed$ = this.appState.select(MakeArchiveFailed);
  public makeArchiveList$ = this.appState.select(MakeArchive);

  public updateShippingInformationLoading$ = this.appState.select(ShippingInformationUpdateLoading);
  public updateShippingInformationLoaded$ = this.appState.select(ShippingInformationUpdateLoaded);
  public updateShippingInformationFailed$ = this.appState.select(ShippingInformationUpdateFailed);
  public updateShippingInformationList$ = this.appState.select(ShippingInformationUpdate);

  public recentOrderListLoading$ = this.appState.select(RecentOrderListLoading);
  public recentOrderListLoaded$ = this.appState.select(RecentOrderListLoaded);
  public recentOrderListFailed$ = this.appState.select(RecentOrderListFailed);
  public todayRecentOrderList$ = this.appState.select(todayRecentOrderList);
  public prevRecentOrderList$ = this.appState.select(prevRecentOrderList);
  public recentOrderList$ = this.appState.select(recentOrderList);

  public orderStatusListLoading$ = this.appState.select(orderStatusListLoading);
  public orderStatusList$ = this.appState.select(orderStatusList);

  public exportArchiveOrderLoading$ = this.appState.select(exportArchiveOrderLoading);
  public exportArchiveOrderLoaded$ = this.appState.select(exportArchiveOrderLoaded);
  public exportAllArchiveOrderLoading$ = this.appState.select(exportAllArchiveOrderLoading);

  public archiveOrderListCount$ = this.appState.select(archiveOrderListCount);

  public cancelOrderList$ = this.appState.select(cancelOrderList);
  public cancelOrderListLoading$ = this.appState.select(cancelOrderListLoading);
  public cancelOrderListLoaded$ = this.appState.select(cancelOrderListLoaded);

  public cancelOrderListCount$ = this.appState.select(cancelOrderListCount);
  public cancelOrderListCountLoading$ = this.appState.select(cancelOrderListCountLoading);
  public cancelOrderListCountLoaded$ = this.appState.select(cancelOrderListCountLoaded);

  public exportCancelOrderLoading$ = this.appState.select(exportCancelOrderLoading);
  public exportCancelOrderLoaded$ = this.appState.select(exportCancelOrderLoaded);

  public exportAllCancelOrderLoading$ = this.appState.select(exportAllCancelOrderLoading);
  public exportAllCancelOrderLoaded$ = this.appState.select(exportAllCancelOrderLoaded);

  public cancelOrderStatusLoading$ = this.appState.select(cancelOrderStatusLoading);
  public cancelOrderStatusLoaded$ = this.appState.select(cancelOrderStatusLoaded);

  public bulkCancelOrderStatusLoading$ = this.appState.select(bulkCancelOrderStatusLoading);
  public bulkCancelOrderStatusLoaded$ = this.appState.select(bulkCancelOrderStatusLoaded);

  public quotationList$ = this.appState.select(quotationList);
  public quotationListCount$ = this.appState.select(quotationListCount);
  public quotationListLoading$ = this.appState.select(quotationListLoading);
  public quotationListLoaded$ = this.appState.select(quotationListLoaded);


  public orderInvoiceList$ = this.appState.select(orderInvoiceList);
  public orderInvoiceListCount$ = this.appState.select(orderInvoiceListCount);
  public orderInvoiceListLoading$ = this.appState.select(orderInvoiceListLoading);
  public orderInvoiceListLoaded$ = this.appState.select(orderInvoiceListLoaded);

  public downloadCsv$ = this.appState.select(downloadInvoice);
  public downloadInvoiceLoading$ = this.appState.select(
    downloadInvoiceLoading
  );
  public downloadInvoiceLoaded$ = this.appState.select(
    downloadInvoiceLoaded
  );


  public settlementList$ = this.appState.select(settlementList);
  public settlementListCount$ = this.appState.select(settlementListCount);
  public settlementListLoading$ = this.appState.select(settlementListLoading);
  public settlementListLoaded$ = this.appState.select(settlementListLoaded);

  public exportSalesOrderLoading$ = this.appState.select(exportSalesOrderLoading);
  public exportSalesOrderLoaded$ = this.appState.select(exportSalesOrderLoaded);


  public sendMailLoaded$ = this.appState.select(sendMailLoaded);
  public sendMailLoading$ = this.appState.select(sendMailLoading);




  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
  ) {

  }


  public doOrderDetail(value) {
    this.appState.dispatch(
      new orderActions.GetOrderDetailAction(value)
    );
  }
  public doArchiveOrderDetail(value) {
    this.appState.dispatch(
      new orderActions.GetOrderDetailAction(value)
    );
  }

  public getOrderCount(value) {
    this.appState.dispatch(
      new orderActions.GetOrderCountAction(value)
    );
  }

  public getRecentOrderList(value) {
    this.appState.dispatch(
      new orderActions.GetRecentOrderlistAction(new OrderListModel(value))
    );
  }

  public getAllOrderList(value) {
    this.appState.dispatch(
      new orderActions.GetAllOrderlistAction(new OrderListModel(value))
    );
  }

  public getArchiveOrderList(value) {
    this.appState.dispatch(
      new orderActions.GetArchiveOrderlistAction(new OrderListModel(value))
    );
  }
  public getDeliveryPersonsList(value) {
    this.appState.dispatch(
      new orderActions.GetDeliveryPersonsListAction(value)
    );
  }
  public allocateDeliveryPersons(value) {
    this.appState.dispatch(
      new orderActions.AllocateDeliveryPersonsAction(value)
    );
  }
  public getAllOrderListBasedOnStatus(value) {
    this.appState.dispatch(
      new orderActions.GetAllOrderlistBasedOnStatusAction(value)
    );
  }
  public updateAllOrderListBasedOnStatus(value) {
    this.appState.dispatch(
      new orderActions.UpdateAllOrderlistBasedOnStatusAction(value)
    );
  }
  public decreaseOrderCount(value) {
    this.appState.dispatch(
      new orderActions.DecreaseUpdatedOrderCount(value)
    );
  }

  public getLogOrderList(value) {
    this.appState.dispatch(
      new orderActions.GetOrderLoglistAction(value)
    );
  }
  public getOrderStatusList(value) {
    this.appState.dispatch(
      new orderActions.GetOrderStatuslistAction(value)
    );
  }
  public getOrderStatusUpdate(value) {
    this.appState.dispatch(
      new orderActions.GetOrderStatusUpdateAction(value)
    );
  }
  public makeArchive(value) {
    this.appState.dispatch(
      new orderActions.MakeArchiveAction(value)
    );
  }
  public getShippingInformationUpdate(value) {
    this.appState.dispatch(
      new orderActions.GetShippingInformationUpdateAction(value)
    );
  }

  public exportArchiveOrder(value) {
    this.appState.dispatch(
      new orderActions.ExportArchiveOrderAction(value)
    );
  }
  public exportAllArchiveOrder(value) {
    this.appState.dispatch(
      new orderActions.ExportAllArchiveOrderAction(value)
    );
  }

  public getArchiveOrderListCount(value) {
    this.appState.dispatch(
      new orderActions.ArchiveOrderListCountAction(value)
    );
  }

  public RemoveExportSelection(val) {
    this.appState.dispatch(new orderActions.RemoveExportSelection(val));
  }


  // cancel order list
  public getCancelOrderList(val) {
    this.appState.dispatch(new orderActions.CancelOrderListAction(val));
  }
   // cancel order list count
   public getCancelOrderListCount(val) {
    this.appState.dispatch(new orderActions.CancelOrderListCountAction(val));
  }

 // cancel order export
   public exportCancelOrder(val) {
    this.appState.dispatch(new orderActions.ExportCancelOrderAction(val));
  }

  // cancel order export all
   public exportAllCancelOrder(val) {
    this.appState.dispatch(new orderActions.ExportAllCancelOrderAction(val));
  }

  // change cancel order status
  public changeCancelOrderStatus(val) {
    this.appState.dispatch(new orderActions.ChangeCancelOrderStatusAction(val));
  }

  // bulk cancel order status
  public bulkCancelOrderStatus(val) {
    this.appState.dispatch(new orderActions.BulkCancelOrderStatusAction(val));
  }


  // get quotation request list
  public getQuotationList(val) {
    this.appState.dispatch(new orderActions.QuotationListAction(val));
  }

  // get quotation request list count
  public getQuotationListCount(val) {
    this.appState.dispatch(new orderActions.QuotationListCountAction(val));
  }


  // get order invoice list

  public getOrderInvoiceList(val) {
    this.appState.dispatch(new orderActions.OrderInvoiceListAction(val));
  }

  // get order invoice list count

  public getOrderInvoiceListCount(val) {
    this.appState.dispatch(new orderActions.OrderInvoiceListCountAction(val));
  }

  // download invoice

  public downloadInvoice(val) {
    this.appState.dispatch(new orderActions.DownloadInvoiceAction(val));
  }

  public settlementList(val) {
    this.appState.dispatch(new orderActions.SettlementListAction(val));
  }

  public settlementListCount(val) {
    this.appState.dispatch(new orderActions.SettlementListCountAction(val));
  }

  public exportSalesReport(val) {
    this.appState.dispatch(new orderActions.ExportSalesReportAction(val));
  }
  public sendMail(val) {
    this.appState.dispatch(new orderActions.SendMailAction(val));
  }


}
