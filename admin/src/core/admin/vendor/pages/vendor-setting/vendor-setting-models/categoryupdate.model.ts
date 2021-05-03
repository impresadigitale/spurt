/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class CategoryupdateForm {
  public vendorId: number;
  public categoryId: number;
  public commission: number;
  public vendorCategoryId: number;

  constructor(categoryupdateForm: any) {
    this.vendorId = categoryupdateForm.vendorId || '';
    this.categoryId = categoryupdateForm.categoryId || '';
    this.commission = categoryupdateForm.commission || '';
    this.vendorCategoryId = categoryupdateForm.vendorCategoryId || '';
  }
}
