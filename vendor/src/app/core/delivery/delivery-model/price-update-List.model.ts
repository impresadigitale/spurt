/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class PriceUpdateListResponse {
  public createdDate: string;
  public file: string;
  public filePath: string;
  public title: string;
  public id: number;

  constructor(searchOptionListForm: any) {
    this.createdDate = searchOptionListForm.createdDate || '';
    this.file = searchOptionListForm.file || '';
    this.filePath = searchOptionListForm.filePath || '';
    this.title = searchOptionListForm.title || '';
    this.id = searchOptionListForm.id || '';

  }
}
