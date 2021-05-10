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
// sandbox
import { AttributeSandbox } from '../../../../../../../../core/admin/settings/siteSettings/attributes/attributes.sandbox';
import { AttributeService } from '../../../../../../../../core/admin/settings/siteSettings/attributes/attributes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-productoption',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AttributesListComponent implements OnInit {

  private offset = 0;
  public pageSize = '10';
  public index: number;
  private currentPage: number;
  public deleteId: boolean;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public sandbox: AttributeSandbox,
    private route: Router,
    public service: AttributeService
  ) {}

  // initially calls  productOptionsList,productPagination
  ngOnInit() {
    this.index = 0;
    this.deleteId = true;
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.attributeList();
    this.attributeCount();
  }

  /** calls sandbox getProductOptionsList for pagination
   *  @param  by default empty value
   *  */
  attributeList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.count = '';
    this.sandbox.getAttributeList(param);
  }

  attributeCount() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.count = 1;
    this.sandbox.getAttribute(param);
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
    this.attributeList();
  }

  // calls sandbox doProductOptionsDelete .param from the event
  deleteAttribute(id) {
    const param: any = {};
    param.id = id.attributeId;
    this.sandbox.attributeDelete(param);
    this.subsribe();
  }

  subsribe() {
    this.subscriptions.push(this.sandbox.attributeDelete$.subscribe(data => {
      if (data && data.status === 1) {
        this.attributeList();
        this.attributeCount();
      }
    }));
  }

  // edit Attribute
  editAttribute(value) {
    this.route.navigate(['/settings/sitesettings/attributes/edit', value.attributeId]);
  }

  // add product options
  addAttribute() {
    this.route.navigate(['/settings/sitesettings/attributes/add']);
  }
}
