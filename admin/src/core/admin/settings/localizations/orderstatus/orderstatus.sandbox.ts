/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from './../../../../app.state.interface';
import { Router } from '@angular/router';
import * as orderActions from './orderstatus.action/orderstatus.action';

import {
  getneworderstatus,
  getneworderstatusroot,
  getorderdelete,
  getOrderstatuslist,
  getOrderstatuspaginationcount,
  getupdateorderstatus,
  getupdateorderstatusroot,
  OrderStatusListLoading,
  OrderStatusListLoaded,
  OrderStatusListFailed,
  OrderStatusDeleteLoading,
  OrderStatusDeleteLoaded,
  OrderStatusDeleteFailed,
  OrderStatusCountLoading,
  OrderStatusCountLoaded,
  OrderStatusCountFailed,
  OrderStatusAddLoading,
  OrderStatusAddFailed,
  OrderStatusAddLoaded,
  OrderStatusUpdateLoading,
  OrderStatusUpdateLoaded,
  OrderStatusUpdateFailed, getupdateProductTrackingstatus,
  getupdateProductorderstatus, TrackingStatusUpdateProductFailed, TrackingStatusUpdateProductLoaded, TrackingStatusUpdateProductLoading,
  OrderStatusUpdateProductFailed, OrderStatusUpdateProductLoaded, OrderStatusUpdateProductLoading
} from './orderstatus-reducer/orderstatus.selectors';
import { OrderstatusForm } from './orderstatus.models/orderstatus.model';
import { Subscription } from 'rxjs/index';
import { ToastrManager } from 'ng6-toastr-notifications';
import { OrderStatusListForm } from './orderstatus.models/orderstatuslist.model';
import { OrderStatusCountModel } from './orderstatus.models/OrderStatusCount.model';

@Injectable()
export class OrderstatusSandbox {
  public getOrderstatuslist$ = this.appState.select(getOrderstatuslist);
  public getOrderstatuspaginationcount$ = this.appState.select(
    getOrderstatuspaginationcount
  );
  public getneworderstatusroot$ = this.appState.select(getneworderstatusroot);
  public getneworderstatus$ = this.appState.select(getneworderstatus);
  public getupdateorderstatusroot$ = this.appState.select(
    getupdateorderstatusroot
  );
  public getupdateorderstatus$ = this.appState.select(getupdateorderstatus);
  public getupdateProductorderstatus$ = this.appState.select(getupdateProductorderstatus);
  public getupdateProductTrackingstatus$ = this.appState.select(getupdateProductTrackingstatus);
  public getorderdelete$ = this.appState.select(getorderdelete);

  public OrderstatusListLoading$ = this.appState.select(OrderStatusListLoading);
  public OrderstatusListLoaded$ = this.appState.select(OrderStatusListLoaded);
  public OrderstatusListFailed$ = this.appState.select(OrderStatusListFailed);

  public OrderstatusDeleteLoading$ = this.appState.select(
    OrderStatusDeleteLoading
  );
  public OrderstatusDeleteLoaded$ = this.appState.select(
    OrderStatusDeleteLoaded
  );
  public OrderstatusDeleteFailed$ = this.appState.select(
    OrderStatusDeleteFailed
  );

  public OrderstatusCountLoading$ = this.appState.select(
    OrderStatusCountLoading
  );
  public OrderstatusCountLoaded$ = this.appState.select(OrderStatusCountLoaded);
  public OrderstatusCountFailed$ = this.appState.select(OrderStatusCountFailed);

  public OrderstatusAddLoading$ = this.appState.select(OrderStatusAddLoading);
  public OrderstatusAddLoaded$ = this.appState.select(OrderStatusAddLoaded);
  public OrderstatusAddFailed$ = this.appState.select(OrderStatusAddFailed);

  public OrderstatusUpdateLoading$ = this.appState.select(
    OrderStatusUpdateLoading
  );
  public OrderstatusUpdateLoaded$ = this.appState.select(
    OrderStatusUpdateLoaded
  );
  public OrderstatusUpdateFailed$ = this.appState.select(
    OrderStatusUpdateFailed
  );

  public OrderstatusUpdateProductLoading$ = this.appState.select(
    OrderStatusUpdateProductLoading
  );
  public OrderstatusUpdateProductLoaded$ = this.appState.select(
    OrderStatusUpdateProductLoaded
  );
  public OrderstatusUpdateProductFailed$ = this.appState.select(
    OrderStatusUpdateProductFailed
  );

  public TrackingstatusUpdateProductLoading$ = this.appState.select(
    TrackingStatusUpdateProductLoading
  );
  public TrackingstatusUpdateProductLoaded$ = this.appState.select(
    TrackingStatusUpdateProductLoaded
  );
  public TrackingstatusUpdateProductFailed$ = this.appState.select(
    TrackingStatusUpdateProductFailed
  );
  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.subscribe();
  }

  public orderStatusList(value: any) {
    this.appState.dispatch(
      new orderActions.DoOrderStatusListAction(new OrderStatusListForm(value))
    );
  }

  // #pagination

  public orderStatusListCount(value: any) {
    this.appState.dispatch(
      new orderActions.DopaginationorderstatusListAction(
        new OrderStatusCountModel(value)
      )
    );
  }

  public updateOrderStatus(value) {
    this.appState.dispatch(
      new orderActions.DoUpdateOrderstatusAction(new OrderstatusForm(value))
    );
  }

  public updateProductOrderStatus(value) {
    this.appState.dispatch(
      new orderActions.DoUpdateProductOrderstatusAction((value))
    );
  }

  public updateProductTrackingStatus(value) {
    this.appState.dispatch(
      new orderActions.DoUpdateProductTrackingstatusAction((value))
    );
  }
  public orderStatusDelete(value) {
    this.appState.dispatch(new orderActions.DoOrderStatusDeleteAction(value));
  }

  public addOrderStatus(data) {
    this.appState.dispatch(
      new orderActions.DoNewOrderStatusAction(new OrderstatusForm(data))
    );
  }

  public subscribe() {
    this.subscriptions.push(
      this.getneworderstatusroot$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/settings/local/order-status']);
          }
        }
      })
    );

    this.subscriptions.push(
      this.getupdateorderstatusroot$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/settings/local/order-status']);
          }
        }
      })
    );
    // # delete message
    this.subscriptions.push(
      this.getorderdelete$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
            this.router.navigate(['/settings/local/order-status']);
          }
        }
      })
    );
  }
}
