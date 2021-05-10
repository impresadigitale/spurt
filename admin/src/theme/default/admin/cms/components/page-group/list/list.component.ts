/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
// Store Module
import { ToastrManager } from 'ng6-toastr-notifications';
import { PageGroupSandbox } from '../../../../../../../core/admin/cms/page-group/page-group.sandbox';


@Component({
  selector: 'app-spurt-cms-page-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ]
})
export class PageGroupListComponent implements OnInit {

  public pageSize: any = 5;
  public keyword: any = '';
  public offset: number;
  public closeResult: string;
  public pageId: number;
  public currentPage: number;
  public index: number;

  constructor(
    private toastr: ToastrManager,
    public appSandbox: PageGroupSandbox,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.getPageGroupList(this.offset, this.keyword);
    this.getPagesPagination(this.offset, this.keyword);
    this.regSubscriptionEvents();
    this.index = 0;
  }

  regSubscriptionEvents() {
    this.appSandbox.pageGroupDelete$.subscribe(_delete => {
      if (_delete && _delete.status && _delete.status === 1) {
        this.getPageGroupList(this.offset, this.keyword);
        this.getPagesPagination(this.offset, this.keyword);
      }
    });
  }

  getPageGroupList(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    this.appSandbox.getPageGroupList(params);
  }

  getPagesPagination(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.count = true;
    this.appSandbox.getPagePagination(params);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageSize * event.pageIndex;
    this.getPageGroupList(offset, this.pageSize);
  }

  editPageGroup(pagesList) {
    this.router.navigate(['/cms/page-group/edit', pagesList.groupId]);
  }

  addPageGroup() {
    this.router.navigate(['/cms/page-group/add']);
  }

  deletePageGroup(pageId) {
    event.stopPropagation();
    this.appSandbox.deletePageGroupList({ id: pageId });
    this.regSubscriptionEvents();
  }

  bulkDeleteEmpty() {
    this.showNotificationError('Choose atleast one Page');
  }

  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }
}
