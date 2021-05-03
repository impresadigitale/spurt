/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class PagescountResponseModel {
  public pagescount: any = {};

  constructor(listResponse: any) {
    this.pagescount = listResponse || '';
  }
}
