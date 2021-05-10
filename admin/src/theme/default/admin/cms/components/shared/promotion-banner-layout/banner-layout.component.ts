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
import { PromotionBannerSandbox } from '../../../../../../../core/admin/cms/promotion-banner/promotion-banner.sandbox';

@Component({
  selector: 'app-promotion-banner-layout',
  templateUrl: './banner-layout.component.html',
  styleUrls: ['./banner-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionBannerLayoutComponent implements OnInit {
  constructor(public sandbox: PromotionBannerSandbox) {}
  ngOnInit() {
    this.getPromotionalBannerHeaderCount();
  }

  getPromotionalBannerHeaderCount() {
    this.sandbox.getBannerCount();
  }
}
