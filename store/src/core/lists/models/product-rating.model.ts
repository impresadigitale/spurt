/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class ProductRatingModel {
  public productId: string;
  public limit: string;
  public offset: string;
  public count: string;

  constructor(productRatingRequest: any) {
    this.productId = productRatingRequest.productId || '';
    this.limit = productRatingRequest.limit || '';
    this.offset = productRatingRequest.offset || '';
    this.count = productRatingRequest.count || '';
  }
}
