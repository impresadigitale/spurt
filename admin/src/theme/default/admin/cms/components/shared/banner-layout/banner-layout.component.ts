/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BannerSandbox } from '../../../../../../../core/admin/cms/banners/banner.sandbox';

@Component({
  selector: 'app-banner-layout',
  templateUrl: './banner-layout.component.html',
  styleUrls: ['./banner-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerLayoutComponent implements OnInit {
  constructor(public sandbox: BannerSandbox) {}
  ngOnInit() {
    this.getBannerListHeaderCount();
  }

  getBannerListHeaderCount() {
    this.sandbox.getBannerListCount({ count: 1 });
    this.sandbox.getBannerCount();
  }
}
