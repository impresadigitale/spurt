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
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-sales-failed-order-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FailedOrderFilterComponent implements OnInit {


  public pageSize = '10';
  public salesOrder: FormGroup;
  public submitted = false;
  public name: FormControl;
  public total: FormControl;
  public date: FormControl;
  public status: FormControl;
  public orderId: FormControl;
  public offset = 0;
  public pagination = 1;
  @Output() salesEmit = new EventEmitter<string>();

  constructor(
    public fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.initForm();
  }

  initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.total = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [Validators.required]);
    this.status = new FormControl('', [Validators.required]);
    this.orderId = new FormControl('', [Validators.required]);
      (this.salesOrder = this.fb.group({
        name: this.name,
        date: this.date,
        orderId: this.orderId,
        status: this.status,
        total: this.total,
      }));
  }


  onSubmit() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.orderId = this.salesOrder.value.orderId;
    params.customerName = this.salesOrder.value.name;
    if (parseInt(this.salesOrder.value.total, 10).toFixed() === 'NaN') {
      params.totalAmount = '';
    } else {
      params.totalAmount = parseInt(this.salesOrder.value.total, 10).toFixed();
    }
    params.dateAdded = this.salesOrder.value.date;
    this.salesEmit.emit(params);
  }

  reset() {
    this.salesOrder.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.orderId = '';
    param.customerName = '';
    param.totalAmount = '';
    param.dateAdded = '';
    this.salesEmit.emit(param);
  }

  onItemChange(data) {
    const params: any = {};
    params.orderId = this.orderId;
    params.orderStatusId = data;
  }
}
