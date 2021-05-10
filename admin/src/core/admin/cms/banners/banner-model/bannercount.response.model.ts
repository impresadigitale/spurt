/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class BannercountResponseModel {
  public bannercount: any = {};

  constructor(bannercount: any) {
    this.bannercount = bannercount || '';
  }
}
