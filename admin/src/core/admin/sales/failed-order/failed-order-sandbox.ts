/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import * as orderActions from './failed-order-action/failed-order.action';
import {
  orderList,
  orderListCount,
  orderListCountLoaded,
  orderListCountLoading,
  viewOrderDetails,
  viewOrderDetailsLoading,
  viewOrderDetailsLoaded,
  settingDetail,
  getOrderDeleteLoading,
  getOrderDeleteLoaded,
  getOrderDeleteFailed,
  getorderDeleteValue,
  moveToMainOrder,
  moveToMainOrderLoading,
  moveToMainOrderLoaded,
  paymentList,
  paymentListLoaded,
  paymentListLoading

} from './failed-order-reducer/failed-order.selector';
import { OrderslistModel } from './failed-order-models/orderslist.model'


@Injectable()
export class FailedOrderSandbox {

  public orderList$ = this.appState.select(orderList);
  public orderListCount$ = this.appState.select(orderListCount);
  public viewOrderDetails$ = this.appState.select(viewOrderDetails);

  public settingDetail$ = this.appState.select(settingDetail);
  // sales order delete
  public getorderDeleteValue$ = this.appState.select(getorderDeleteValue);
  public getOrderDeleteLoading$ = this.appState.select(getOrderDeleteLoading);
  public getOrderDeleteLoaded$ = this.appState.select(getOrderDeleteLoaded);
  public getOrderDeleteFailed$ = this.appState.select(getOrderDeleteFailed);

  public moveToMainOrder$ = this.appState.select(moveToMainOrder);
  public moveToMainOrderLoading$ = this.appState.select(moveToMainOrderLoading);
  public moveToMainOrderLoaded$ = this.appState.select(moveToMainOrderLoaded);

  public paymentList$ = this.appState.select(paymentList);
  public paymentListLoading$ = this.appState.select(paymentListLoading);
  public paymentListLoaded$ = this.appState.select(paymentListLoaded);

  constructor(protected appState: Store<store.AppState>) {}


  // get failed order list
  public getOrderList(value: any) {
    this.appState.dispatch(
      new orderActions.DoOrderListAction(new OrderslistModel(value)));
  }

  // get failed order list count
  public getOrderCount(value: any) {
    this.appState.dispatch(
      new orderActions.DoOrderCountAction(new OrderslistModel(value)));
  }

  // viewOrderdetails
  public viewOrderdetails(value: any) {
    this.appState.dispatch(
      new orderActions.DoOrderDetailsAction(value));
  }

  // delete order
  public salesOrderDelete(value: any) {
    this.appState.dispatch(
      new orderActions.DoOrderDeleteAction(value));
  }


  // Do Order Excel
  public orderExcel(value) {
    this.appState.dispatch(new orderActions.DoOrderExcel(value));
  }

  // Do move to main order
  public moveToMainOrder(value) {
    this.appState.dispatch(new orderActions.MoveToMainOrder(value));
  }

  // Get Payment List
  public getPaymentList(value) {
    this.appState.dispatch(new orderActions.GetPaymentList(value));
  }



}

