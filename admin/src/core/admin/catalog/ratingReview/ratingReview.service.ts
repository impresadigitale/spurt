/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';
// model
import { RatingReviewListModel } from './ratingReview-model/ratingReview-list.model';

@Injectable()
export class RatingReviewService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();

  /**
   * Handles 'productList' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from RatingReviewListModel
   */
  public ratingReviewList(params: RatingReviewListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/product/product-rating-list', {
      params: reqOpts
    });
  }

  /**
   * Handles 'productCount' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from RatingReviewListModel
   */
  public ratingReviewListCount(params: RatingReviewListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/product/product-rating-list', {
      params: reqOpts
    });
  }
}
