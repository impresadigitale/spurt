/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class BannerdeleteResponseModel {
  public bannerdelete: any = {};

  constructor(deletebanner: any) {
    this.bannerdelete = deletebanner || '';
  }
}
