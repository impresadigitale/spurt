/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class BannerdeleteModel {
  public bannerId: number;

  constructor(deletebanner: any) {
    this.bannerId = deletebanner.bannerId || '';
  }
}
