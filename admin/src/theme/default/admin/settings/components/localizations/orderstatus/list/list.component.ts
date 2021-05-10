/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderstatusSandbox } from '../../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { OrderstatusApiClientService } from '../../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus-ApiClientService';

@Component({
  selector: 'app-settings-orderstatus-list',
  templateUrl: './list.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class OrderStatusListComponent implements OnInit {

  public orderStatusDetails: any = {};
  private keyword = '';
  private offset: number;
  public pageSize = '5';
  private currentPage: string;
  private index: number;
  private pagenationCount = true;
  private popoverContent: string;

  constructor(
    private router: Router,
    public Sandbox: OrderstatusSandbox,
    public service: OrderstatusApiClientService
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.orderStatusList(this.offset, this.keyword);
  }


  /**
   * Handles form 'list' event. Calls sandbox OrderStatus List function .
   *
   * @param params storing entire value
   */
  orderStatusList(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.Sandbox.orderStatusList(params);

    if (this.pagenationCount) {
      params.count = true;
      this.Sandbox.orderStatusListCount(params);
    }
  }

  editOrderStatusList(orderstatusinfo) {
    this.orderStatusDetails = orderstatusinfo;
    this.service.statusordersetdata(this.orderStatusDetails);
    this.router.navigate([
      '/settings/local/order-status/edit',
      this.orderStatusDetails.orderStatusId
    ]);
  }

  addOrderStatus() {
    this.service.statusordersetdata('');

    this.router.navigate(['/settings/local/order-status/add']);
  }

  // Pagination Count
  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.orderStatusList(offset, this.pageSize);
  }

  // Delete OrderStatus Using OrderStatusId
  deleteStockStatus(orderStatusId, deletePop) {
    event.stopPropagation();
    this.popoverContent = deletePop;
    this.Sandbox.orderStatusDelete({ orderStatusId: orderStatusId });
  }

  // Delete After Subscribe the result
  regSubscribeEvents() {
    this.Sandbox.getorderdelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.orderStatusList(this.offset, this.keyword);
      }
    });
  }
}
