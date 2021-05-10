/*
 * spurtcommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PagesSandbox } from '../../../../../../core/admin/cms/pages/pages.sandbox';

@Component({
  selector: 'app-pages-layout',
  templateUrl: './pages-layout.component.html',
  styleUrls: ['./pages-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesLayoutComponent implements OnInit {
  constructor(public pageSandbox: PagesSandbox) {}
  ngOnInit() {
    this.getPagesLists();
  }
  getPagesLists() {
    this.pageSandbox.getPagePagination({ count: 1 });
    this.pageSandbox.getPageCount();
  }
}
