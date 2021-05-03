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

@Component({
  selector: 'app-vendors-layout',
  template: `
  <router-outlet></router-outlet>
  `
})
export class VendorLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }
}
