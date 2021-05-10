/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// Store Module
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription } from 'rxjs';
import { WidgetSandbox } from '../../../../../../../core/admin/cms/widgets/widgets.sandbox';

 
@Component({
  selector: 'app-spurt-cms-widget-list',
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
export class WidgetsListComponent implements OnInit, OnDestroy {

  public closeResult: string;
  public page: any;
  public pageSize = '10';
  private keyword: any = '';
  private offset = 0;
  private currentPage: number;
  public index: number;
  public popoverContent: string;
  public pagenationCount: boolean;
  public imageUrl: string;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  private subscriptions: Array<Subscription> = [];


  constructor(
    private toastr: ToastrManager,
    private router: Router,
    private configService: ConfigService,
    public sandbox: WidgetSandbox
  ) {}

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.imageUrl = this.configService.getImageUrl();
    this.pagenationCount = true;
    this.regSubscriptionEvents();
    this.index = 0;
    this.widgetList();
    this.widgetListCount();
  }

  addWidget() {
    this.router.navigate(['/cms/widgets/add']);
  }

  widgetList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    this.sandbox.getWidgetList(params);
  }

  widgetListCount() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.count = 1;
    this.sandbox.getWidgetListCount(params);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.widgetList();
  }

  editWidget(widgetData) {
    this.router.navigate(['/cms/widgets/edit', widgetData.widgetId]);
  }

  deleteWidget(widgetId) {
    this.sandbox.deleteWidget({ widgetId: widgetId });
  }

  regSubscriptionEvents() {
    this.sandbox.deleteWidget$.subscribe(_delete => {
      if (_delete && Object.keys(_delete).length) {
        if (_delete && _delete.status && _delete.status === 1) {
          this.widgetList();
          this.widgetListCount();
          this.sandbox.getWidgetCount();
        }
      }
    });
  }


  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
