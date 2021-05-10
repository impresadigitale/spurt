/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class FilterForm {
  public filterName: string;
  public categoryId: string;
  public section: string;

  constructor(filterForm: any) {
    this.filterName = filterForm.filterName || '';
    this.categoryId = filterForm.categoryId || '';
    this.section = filterForm.section || '';
  }
}
