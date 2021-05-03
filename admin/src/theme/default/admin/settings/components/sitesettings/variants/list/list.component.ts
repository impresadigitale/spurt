/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
// sandbox
import { VariantsSandbox } from '../../../../../../../../core/admin/settings/siteSettings/variants/variants.sandbox';
import { VariantsService } from '../../../../../../../../core/admin/settings/siteSettings/variants/variants.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-productoption',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class VariantsListComponent implements OnInit, OnDestroy {

  private offset = 0;
  public pageSize = '10';
  public index: number;
  private currentPage: number;
  public deleteId: boolean;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public sandbox: VariantsSandbox,
    public service: VariantsService,
    private route: Router
  ) {}

  // initially calls  productOptionsList,productPagination
  ngOnInit() {
    this.index = 0;
    this.deleteId = true;
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.productOptionsList();
    this.productOptionListCount();
  }

  /** calls sandbox getVariantsList for pagination
   *  @param  by default empty value
   *  */
  productOptionsList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.count = '';
    this.sandbox.getVariantsList(param);
  }

  /** calls sandbox getVariantsListCount for pagination
   *  @param count by default value
   *  */
  productOptionListCount() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.count = 1;
    this.sandbox.getVariantsListCount(param);
  }

  /**
   * Handles  'onPageChange' event. Calls categorylist function .
   *  @param event  from material paginator value
   */

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.productOptionsList();
  }

  // calls sandbox doVariantsDelete .param from the event
  deleteOptions(id) {
    const param: any = {};
    param.id = id.id;
    this.sandbox.doVariantsDelete(param);
    this.subscriptions.push(this.sandbox.deleteVariant$.subscribe(data => {
      if (data && data.status === 1) {
        this.productOptionsList();
        this.productOptionListCount();
      }
    }));
  }

  // edit product options
  editOptions(value) {
    this.route.navigate(['/settings/sitesettings/variants/edit', value.id]);
  }

  // add product options
  addOption() {
    this.route.navigate(['/settings/sitesettings/variants/add']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
