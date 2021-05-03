/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class PersonalizeProductResponsemodel {
  public categoryProductCount: number;
  public itemsPerPage: number;

  constructor(Sitesettingresponse: any) {
    this.categoryProductCount = Sitesettingresponse.categoryProductCount || 0;
    this.itemsPerPage = Sitesettingresponse.itemsPerPage || 0;
  }
}
