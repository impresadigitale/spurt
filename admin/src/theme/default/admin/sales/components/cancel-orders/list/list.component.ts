/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { CancelOrderSandbox } from '../../../../../../../core/admin/sales/cancel-orders/cancel-orders.sandbox';
import { Subscription } from 'rxjs';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';


@Component({
  selector: 'app-sales-cancel-order-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.css']
})
export class CancelOrderListComponent implements OnInit, OnDestroy {


  public pageSizeOptions = [5, 10, 20];
  public page: any;
  public currentPage: number;
  public index: number;
  public buttonCheck = true;
  public pagination = true;
  public cancelOrderStatus: any;
  public subscriptions: Array<Subscription> = [];
  public offset: number;
  public pageSize = '5';
  public keyword = '';
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];

  constructor(
    public sandbox: CancelOrderSandbox,
    public layoutSandbox: LayoutSandbox,
    public orderStatusSandbox: OrderstatusSandbox,
    public cd: ChangeDetectorRef

  ) {}

  ngOnInit() {
    this.offset = 0;
    this.pageSize = localStorage.getItem('itemsPerPage') ? localStorage.getItem('itemsPerPage') : this.pageSize;
    this.getCancelOrderList();
    this.getOrderStatusList();
    this.getAcceptedCount();
    this.getRejectedCount();
  }

  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  getCancelOrderList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = '';
    this.sandbox.getCancelOrderList(params);
    this.getCancelOrderListCount();
  }

  getCancelOrderListCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = 1;
    this.sandbox.cancelOrderListCount(params);
  }

  getAcceptedCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = 1;
    params.status = 1;
    this.sandbox.getAcceptedCount(params);
  }

  getRejectedCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = 1;
    params.status = 2;
    this.sandbox.getRejectedCount(params);
  }

  getOrderStatusList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = 0;
    params.keyword = '';
    this.orderStatusSandbox.orderStatusList(params);
  }

  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.name;
  }

  changeStatus(list, event) {
    const params: any = {};
    params.cancelStatusId = event.value;
    params.orderProductId = list.orderProductId;
    this.sandbox.changeCancelOrderStatus(params);
    this.subscriptions.push(this.sandbox.changeCancelOrderStatus$.subscribe(data => {
      if (data && data.status === 1) {
        this.cd.detectChanges();
        this.getAcceptedCount();
        this.getRejectedCount();
      }
    }));
  }

  changeBulkStatus(event) {
    const params: any = {};
    params.orderProductId = this.checkedData.toString();
    params.cancelStatusId = event.value;
    this.sandbox.bulkCancelOrderStatus(params);
    this.subscriptions.push(this.sandbox.bulkStatusChangeLoaded$.subscribe(data => {
      if ( data && data === true) {
        this.cd.detectChanges();
        this.getAcceptedCount();
        this.getRejectedCount();
      }
    }));
  }

  selectChkBox(event, orderId) {
    if (event.target.checked === true) {
      this.checkedData.push(orderId);
    }
    if (event.target.checked === false) {
      this.unCheckData.push(orderId);
      this.unCheckData.forEach((value, index) => {
        this.checkedData = this.checkedData.filter(_value => {
          if (value === _value) {
            return false;
          } else {
            return true;
          }
        });
      });

    }
    this.unCheckData = [];
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getCancelOrderList();
  }

  exportExcel() {
    const params: any = {};
    params.orderProductId = this.checkedData;
    this.sandbox.exportCancelOrder(params);
  }

  exportAllExcel() {
    const params: any = {};
    this.sandbox.exportBulkCancelOrder(params);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
