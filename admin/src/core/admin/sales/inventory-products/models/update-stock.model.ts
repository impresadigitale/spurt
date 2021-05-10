/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class UpdateStockModel {
  public productId: number;
  public hasStock: string;
  public productStock: any;



  constructor(updateModel: any) {
    this.productId = updateModel.productId || '';
    this.hasStock = updateModel.hasStock || '';
    this.productStock = updateModel.productStock || [];
  }
}
