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
import { LayoutSandbox } from '../../../../../../core/admin/Customers/layout/layout.sandbox';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerLayoutComponent implements OnInit {

  constructor(public layoutSandbox: LayoutSandbox) {}

  ngOnInit() {
    this.layoutSandbox.getCustomerCount();
  }
}
