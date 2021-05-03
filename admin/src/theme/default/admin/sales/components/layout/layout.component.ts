/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { LayoutsSandbox } from '../../../../../../core/admin/sales/layout/layout.sandbox';
import { LayoutSandbox } from '../../../../../../core/admin/layout/layout.sandbox';

@Component({
  selector: 'app-sales-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesLayoutComponent implements OnInit {
  constructor(
    public layoutSandbox: LayoutsSandbox,
    public commonSandbox: LayoutSandbox
  ) {}

  ngOnInit() {
    this.layoutSandbox.getSalesCount();
  }
}
