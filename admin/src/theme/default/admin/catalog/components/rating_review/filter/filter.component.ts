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
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { RatingReviewSandbox } from '../../../../../../../core/admin/catalog/ratingReview/ratingReview.sandbox';
import * as _ from 'lodash';

@Component({
  selector: 'app-spurt-catalog-ratings-review-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class RatingReviewFilterComponent implements OnInit {


  @Output() progressEmit = new EventEmitter<string>();
  public filterForm: FormGroup;
  public categoryNameList: FormControl;
  public sortOrder: FormControl;
  public pageSize: any;
  public dropDownProductNames: any = [];
  public productList: any = [];
  public prodName: string;


  constructor(
    public categorySandbox: CategoriesSandbox,
    public ratingReviewSandbox: RatingReviewSandbox,
    public productSandbox: ProductSandbox,
    public fb: FormBuilder
  ) {}


  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      keyword: ['']
    });
  }

  filter() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = this.filterForm.value.keyword;
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
