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

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttributeGroupSandbox } from '../../../../../../../../core/admin/settings/siteSettings/attributes-group/attributes-group.sandbox';
import { AttributeGroupService } from '../../../../../../../../core/admin/settings/siteSettings/attributes-group/attributes-group.service';

@Component({
  selector: 'app-list-productoption',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AttributesGroupListComponent implements OnInit {

  private offset = 0;
  public pageSize = '10';
  public index: number;
  private currentPage: number;
  public deleteId: boolean;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public sandbox: AttributeGroupSandbox,
    private route: Router,
    public service: AttributeGroupService
  ) {}

  ngOnInit() {
    this.index = 0;
    this.deleteId = true;
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.attributeGroupList();
    this.attributeGroupListCount();
  }

  /** calls sandbox getProductOptionsList for pagination
   *  @param  by default empty value
   *  */
  attributeGroupList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.count = '';
    this.sandbox.getAttributeList(param);
  }

  attributeGroupListCount() {
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
    this.attributeGroupList();
  }

  deleteGroup(id) {
    const param: any = {};
    param.groupId = id.groupId;
    this.sandbox.attributeDelete(param);
    this.subsribe();
  }

  subsribe() {
    this.subscriptions.push(this.sandbox.attributeDelete$.subscribe(data => {
      if (data && data.status === 1) {
        this.attributeGroupList();
        this.attributeGroupListCount();
      }
    }));
  }

  editGroup(value) {
    this.route.navigate(['/settings/sitesettings/attributes-group/edit', value.groupId]);
  }

  addAddtibutGroup() {
    this.route.navigate(['/settings/sitesettings/attributes-group/add']);
  }
}
