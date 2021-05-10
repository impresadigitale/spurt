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
import * as cancelOrderActions from './actions/cancel-orders.action';
import { CancelOrderListRequestModel } from './models/cancel-order-list-request.model';
import { cancelOrderList, cancelOrderListCount, cancelOrderListLoading, cancelOrderListLoaded,
  changeCancelOrderStatus, bulkStatusChange, bulkStatusChangeLoaded,
acceptedCount, acceptedCountLoading, acceptedCountLoaded, rejectedCount,
rejectedCountLoading, rejectedCountLoaded} from './reducer/cancel-order.selector';

@Injectable()
export class CancelOrderSandbox {

  public cancelOrderList$ = this.appState.select(cancelOrderList);
  public cancelOrderListCount$ = this.appState.select(cancelOrderListCount);
  public cancelOrderListLoading$ = this.appState.select(cancelOrderListLoading);
  public cancelOrderListLoaded$ = this.appState.select(cancelOrderListLoaded);
  public changeCancelOrderStatus$ = this.appState.select(changeCancelOrderStatus);
  public bulkStatusChange$ = this.appState.select(bulkStatusChange);
  public bulkStatusChangeLoaded$ = this.appState.select(bulkStatusChangeLoaded);

  public acceptedCount$ = this.appState.select(acceptedCount);
  public acceptedCountLoading$ = this.appState.select(acceptedCountLoading);
  public acceptedCountLoaded$ = this.appState.select(acceptedCountLoaded);

  public rejectedCount$ = this.appState.select(rejectedCount);
  public rejectedCountLoading$ = this.appState.select(rejectedCountLoading);
  public rejectedCountLoaded$ = this.appState.select(rejectedCountLoaded);





constructor(protected appState: Store<store.AppState>) {}

// cancel order list

public getCancelOrderList(value: any) {
    this.appState.dispatch(new cancelOrderActions.GetCancelOrderListAction(new CancelOrderListRequestModel(value)));
}

// cancel order list count

public cancelOrderListCount(value: any) {
  this.appState.dispatch(new cancelOrderActions.CancelOrderListCountAction( new CancelOrderListRequestModel(value)));
}

// change cancel order status

public changeCancelOrderStatus(value: any) {
  this.appState.dispatch(new cancelOrderActions.ChangeCancelOrderStatusAction(value));
}

// export cancel order

public exportCancelOrder(value: any) {
  this.appState.dispatch(new cancelOrderActions.ExportCancelOrderAction(value));
}

// export bulk cancel order

public exportBulkCancelOrder(value: any) {
  this.appState.dispatch(new cancelOrderActions.ExportBulkCancelOrderAction(value));
}

// bulk cancel order status change

public bulkCancelOrderStatus(value: any) {
  this.appState.dispatch(new cancelOrderActions.BulkCancelOrderStatusAction(value));
}

// get cancel order accepted count

public getAcceptedCount(value: any) {
  this.appState.dispatch(new cancelOrderActions.GetAcceptedCountAction(value));
}

// get cancel order rejected count

public getRejectedCount(value: any) {
  this.appState.dispatch(new cancelOrderActions.GetRejectedCountAction(value));
}

}
