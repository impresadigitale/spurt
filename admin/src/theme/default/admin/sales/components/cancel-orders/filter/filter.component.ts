/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CancelOrderSandbox } from '../../../../../../../core/admin/sales/cancel-orders/cancel-orders.sandbox';


@Component({
  selector: 'app-sales-cancel-order-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class CancelOrderFilterComponent implements OnInit {

  public pageSize = '10';
  public salesCancelOrder: FormGroup;
  public submitted = false;
  public pagination = 1;
  public keyword: any;
  @Output() salesEmit = new EventEmitter<string>();

  constructor(
    public fb: FormBuilder,
    public sandbox: CancelOrderSandbox
  ) {}

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.initForm();
  }

  initForm() {
      (this.salesCancelOrder = this.fb.group({
        name: ['', Validators.required]
      }));
  }

  onSubmit() {
    this.keyword = this.salesCancelOrder.value.name;
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = this.keyword;
    param.count = '';
    this.salesEmit.emit(param);
    this.sandbox.getCancelOrderList(param);
    this.getCancelOrderCount();
  }

  getCancelOrderCount() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = this.keyword;
    param.count = 1;
    this.sandbox.cancelOrderListCount(param);
  }

  reset() {
    this.keyword = '';
    this.salesCancelOrder.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = '';
    param.count = '';
    this.salesEmit.emit(param);
    this.sandbox.getCancelOrderList(param);
    this.getCancelOrderCount();

  }
}
