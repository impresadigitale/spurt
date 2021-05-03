/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ProductDeleteModel {
  public productId: number;

  constructor(productdeleteForm: any) {
    this.productId = productdeleteForm.productId || '';
  }
}
