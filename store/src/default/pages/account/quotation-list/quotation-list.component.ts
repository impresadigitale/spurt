/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss'],
})
export class QuotationListComponent implements OnInit {

  public pageSize = 5;
  public index = 0;
  public offset = 0;

  constructor(
    public accountSandbox: AccountSandbox,
    public listSandbox: ListsSandbox,
  ) {}

  ngOnInit() {
    this.getQuotationList();
    this.getQuotationListCount();
  }

  getQuotationList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.count = '';
    this.accountSandbox.getQuotationList(params);
  }

  getQuotationListCount() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = 1;
    this.accountSandbox.getQuotationListCount(params);
  }

  public onPageChange(event) {
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageIndex * event.pageSize;
    this.getQuotationList();
  }

}
