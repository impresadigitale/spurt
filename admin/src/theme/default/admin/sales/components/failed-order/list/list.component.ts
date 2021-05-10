/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { FailedOrderSandbox } from '../../../../../../../core/admin/sales/failed-order/failed-order-sandbox';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-sales-failed-order-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.css']
})
export class FailedOrderListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;

  public pageSize = '5';
  public pageSizeOptions = [5, 10, 20];
  public page: any;
  public currentPage: number;
  public index: number;
  public buttonCheck = true;
  public pagination = true;
  public offset: number;
  private orderId: number;
  private orderStatusId: number;
  private customerName: string;
  private totalAmount: number;
  private dateAdded: any;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  public bulkFunction = false;
  public productList: any;
  public selectedAll = false;
  public orderListArray: any;
  public filterData: any = [];
  public filterDataId = [];
  private subscriptions: Array<Subscription> = [];


  constructor(
    private router: Router,
    public appSandbox: FailedOrderSandbox,
    public orderStatusSandbox: OrderstatusSandbox,
    public layoutSandbox: LayoutSandbox,
  ) {
    this.subscribeOrder();
  }

  ngOnInit() {
    this.offset = 0;
    this.pageSize = localStorage.getItem('itemsPerPage') ? localStorage.getItem('itemsPerPage') : this.pageSize;
    this.getOrderList();
    this.getOrderCount();
    this.index = 0;
  }

  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  getOrderList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.orderId = this.orderId;
    params.customerName = this.customerName;
    params.totalAmount = this.totalAmount;
    params.dateAdded = this.dateAdded;
    this.appSandbox.getOrderList(params);
  }

  getOrderCount() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.orderId = this.orderId;
    params.customerName = this.customerName;
    params.totalAmount = this.totalAmount;
    params.dateAdded = this.dateAdded;
    params.count = 1;
    this.appSandbox.getOrderCount(params);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.selectedAll = false;
    this.filterDataId = [];
    this.getOrderList();
  }

  viewOrders(orderId) {
    this.router.navigate(['/sales/failed-order/vieworder', orderId]);
  }

  // receive param from filter component .And calls categoriesPagination event
  receiveProgress(event) {
    this.index = 0;
    this.orderId = event.orderId;
    this.orderStatusId = event.orderStatusId;
    this.customerName = event.customerName;
    this.totalAmount = event.totalAmount;
    this.dateAdded = event.dateAdded;
    this.offset = 0;
    this.paginator.firstPage();
    this.getOrderList();
    this.getOrderCount();
  }

  exportExcel() {
    const param: any = {};
    param.orderId = this.filterDataId;
    this.appSandbox.orderExcel(param);
  }

  deleteOrder(orderId) {
    const param: any = {};
    param.orderId = orderId;
    this.appSandbox.salesOrderDelete(param);
    this.appSandbox.getorderDeleteValue$.subscribe(_delete => {
      if (_delete) {
        if (_delete['status'] === 1) {
          this.getOrderList();
          this.getOrderCount();
        }
      }
    });
  }

  bulkDelete() {
    const param: any = {};
    param.orderId = this.filterDataId;
    this.appSandbox.salesOrderDelete(param);
    this.appSandbox.getorderDeleteValue$.subscribe(_delete => {
      if (_delete) {
        if (_delete['status'] === 1) {
          this.selectedAll = false;
          this.filterDataId = [];
          this.getOrderList();
          this.getOrderCount();
        }
      }
    });
  }

  subscribeOrder() {
    this.subscriptions.push(this.appSandbox.orderList$.subscribe(data => {
      this.orderListArray = [];
      if (data && data.length > 0) {
        this.orderListArray = data.map(list => {
          return {...list, selected: false};
        });
      }
    }));
  }

  selectAll() {
    for (let i = 0; i < this.orderListArray.length; i++) {
      this.orderListArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
      } else {
        this.bulkFunction = false;
      }
    }

  checkIfAllSelected() {
    this.bulkFunction = true;
    this.selectedAll = this.orderListArray.every(function(item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
      } else {
        this.bulkFunction = false;
      }
  }

  filterDataList() {
    this.filterData = this.orderListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.orderId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
