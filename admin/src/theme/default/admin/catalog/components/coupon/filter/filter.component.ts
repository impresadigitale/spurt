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
import { CouponSandbox } from '../../../../../../../core/admin/catalog/coupon/coupon.sandbox';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-spurt-catalog-coupon-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class CouponFilterComponent implements OnInit {

  @Output() progressEmit = new EventEmitter<string>();
  public filterForm: FormGroup;
  public couponNameList: FormControl;
  public sortOrder: FormControl;
  public pageSize: any = 500;
  public couponListArray: any = [];

  constructor(
    public couponSandbox: CouponSandbox,
    public fb: FormBuilder) {}

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      couponNameList: [''],
    });
  }

  filter() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = this.filterForm.value.couponNameList;
    this.progressEmit.emit(param);
  }

  reset() {
    this.filterForm.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = '';
    this.progressEmit.emit(param);
  }

}
