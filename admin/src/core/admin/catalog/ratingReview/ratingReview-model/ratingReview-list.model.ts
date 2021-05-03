/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class RatingReviewListModel {
  public limit: any;
  public offset: any;
  public productName: any;
  public count: boolean;

  constructor(fromRatingReviewList: any) {
    this.limit = fromRatingReviewList.limit || '';
    this.offset = fromRatingReviewList.offset || '0';
    this.productName = fromRatingReviewList.keyword || '';
    this.count = fromRatingReviewList.count || false;
  }
}
