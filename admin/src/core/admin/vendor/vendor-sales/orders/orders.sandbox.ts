import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';
import { Router } from '@angular/router';
import * as OrdersActions from './orders-action/orders.action';
import { Subscription } from 'rxjs/index';
import { ToastrManager } from 'ng6-toastr-notifications';
import { OrdersListRequest } from './orders-models/orders.request.model';

import {
    getOrdersList, getOrderStatusChangeFailed, getOrderStatusChange, getOrderStatusChangeLoaded, getOrderStatusChangeLoading,
    getOrdersListLoaded, getOrdersStatusList, getOrdersStatusListFailed, getOrdersStatusListLoaded, getOrdersStatusListLoading,
    getOrdersListLoading, getOrdersLogList, getOrdersLogListFailed, getOrdersLogListLoaded, getOrdersLogListLoading,
    getOrdersListFailed, getOrderDetail, getOrderDetailFailed, getOrderDetailLoaded, getOrderDetailLoading,
    getInvoiceDetail,
    getInvoiceDetailLoading,
    getInvoiceDetailLoaded,
    vendorListForOrderDetails
} from './orders-reducer/orders.selector';

@Injectable()
export class OrdersSandbox {
  private subscriptions: Array<Subscription> = [];

  public getOrdersList$ = this.appState.select(getOrdersList);
  public getOrdersListLoading$ = this.appState.select(getOrdersListLoading);
  public getOrdersListLoaded$ = this.appState.select(getOrdersListLoaded);
  public getOrdersListFailed$ = this.appState.select(getOrdersListFailed);


  public getOrdersLogList$ = this.appState.select(getOrdersLogList);
  public getOrdersLogListLoading$ = this.appState.select(getOrdersLogListLoading);
  public getOrdersLogListLoaded$ = this.appState.select(getOrdersLogListLoaded);
  public getOrdersLogListFailed$ = this.appState.select(getOrdersLogListFailed);

  public getOrdersStatusList$ = this.appState.select(getOrdersStatusList);
  public getOrdersStatusListLoading$ = this.appState.select(getOrdersStatusListLoading);
  public getOrdersStatusListLoaded$ = this.appState.select(getOrdersStatusListLoaded);
  public getOrdersStatusListFailed$ = this.appState.select(getOrdersStatusListFailed);



  public getOrderDetail$ = this.appState.select(getOrderDetail);
  public vendorListForOrderDetails$ = this.appState.select(vendorListForOrderDetails);
  public getOrderDetailLoading$ = this.appState.select(getOrderDetailLoading);
  public getOrderDetailLoaded$ = this.appState.select(getOrderDetailLoaded);
  public getOrderDetailFailed$ = this.appState.select(getOrderDetailFailed);


  public getOrderStatusChange$ = this.appState.select(getOrderStatusChange);
  public getOrderStatusChangeLoading$ = this.appState.select(getOrderStatusChangeLoading);
  public getOrderStatusChangeLoaded$ = this.appState.select(getOrderStatusChangeLoaded);
  public getOrderStatusChangeFailed$ = this.appState.select(getOrderStatusChangeFailed);

  public invoiceDetail$ = this.appState.select(getInvoiceDetail);
  public invoiceDetailLoading$ = this.appState.select(getInvoiceDetailLoading);
  public invoiceDetailLoaded$ = this.appState.select(getInvoiceDetailLoaded);



  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
  }
  public ordersList(params) {
    this.appState.dispatch(
      new OrdersActions.GetOrdersList(new OrdersListRequest(params))
    );
  }
  public ordersLogList(params) {
    this.appState.dispatch(
      new OrdersActions.GetOrdersLogList(params)
    );
  }
  public ordersStatusList(params) {
    this.appState.dispatch(
      new OrdersActions.GetOrdersStatusList(params)
    );
  }
  public orderDetail(params) {
    this.appState.dispatch(
      new OrdersActions.GetOrderDetail(params)
    );
  }
  public orderStatusChange(params) {
    this.appState.dispatch(
      new OrdersActions.ChangeOrderStatus(params)
    );
  }
  public downloadInvoice(params) {
    this.appState.dispatch(
      new OrdersActions.DownloadInvoice(params)
    );
  }
  public clearInvoice(params) {
    this.appState.dispatch(
      new OrdersActions.ClearInvoice(params)
    );
  }
}
