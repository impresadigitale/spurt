/*
 * SpurtCommerce API
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Store Module
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog-product-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  public filterForm: FormGroup;
  public keyword: string;
  public sku: any;
  public status: any;
  @Input() pageSize: any;
  private price: any;
  public pagenationCount: boolean;
  public selectedLink = 'Min';
  @Output() progressEmits = new EventEmitter<string>();

  constructor(public fb: FormBuilder, public sandbox: ProductSandbox, public route: ActivatedRoute) {
    this.keyword = this.route.snapshot.queryParamMap.get('keyword') || '';
    this.sku = this.route.snapshot.queryParamMap.get('sku') || '';
    this.status = this.route.snapshot.queryParamMap.get('status') || '';
    this.price = this.route.snapshot.queryParamMap.get('price') || '';
  }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.pagenationCount = true;
    this.setForm();
  }

  setForm() {
    this.initFilterForm();
    this.filterForm.controls['keyword'].setValue(this.keyword);
    this.filterForm.controls['sku'].setValue(this.sku);
    this.filterForm.controls['status'].setValue(this.status);
    this.filterForm.controls['price'].setValue(this.price);
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      keyword: ['', Validators.required],
      sku: ['', Validators.required],
      status: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  selectPrice(e: string): void {
    this.selectedLink = e;
  }

  /**
   * Handles  'resetFilter' event. Calls  getProductList and reset().
   *
   * @param filterForm entire form value
   */
  resetFilter() {
    this.filterForm.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = '';
    param.price = '';
    param.sku = '';
    param.status = '';
    this.progressEmits.emit(param);
  }

  /**
   * Handles  'applyFilter' event. Calls  getProductList.
   * if (selectedLink == 'Min') assign price value 1 ,
   * else assign price value 1
   */
  applyFilter() {
    this.keyword = this.filterForm.value.keyword;
    this.sku = this.filterForm.value.sku;
    this.status = this.filterForm.value.status;
    this.price = this.filterForm.value.price;
    const params: any = {};
    params.offset = '';
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.sku = this.sku;
    params.status = this.status;
    params.price = this.price;
    this.progressEmits.emit(params);
  }

}
