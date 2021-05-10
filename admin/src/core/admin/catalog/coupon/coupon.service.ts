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
// model
import { CoupondeleteForm } from './models/coupondelete.model';
import { CouponlistForm } from './models/couponlist.model';
import { CouponForm } from './models/coupon.model';
import { Api } from '../../providers/api/api';

@Injectable()
export class CouponService extends Api {
  // url
  private url: string = this.getBaseUrl();
  // for get method
  public params: any = {};
  // editing coupon purpose
  public setEditvariable: any;

  // passing data to coupon edit

  setEditcoupon(data) {
    this.setEditvariable = data;
  }

  getEditcoupon() {
    return this.setEditvariable;
  }

  /**
   * Handles 'couponListPagination' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from CouponlistForm.
   */
  public couponListPagination(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/admin-coupon/admin-coupon-list', {params: reqOpts});
  }

  /**
   * Handles 'updateCoupon' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model.
   */
  updateCoupon(params): Observable<any> {
    return this.http.put(
      this.url + '/admin-coupon/update-coupon/' + params.couponId,
      params
    );
  }

  /**
   * Handles 'delete' function. Calls delete method with specific api address
   * along its param.
   *
   * @param params from CoupondeleteForm
   */
  delete(params: CoupondeleteForm): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { couponId: params.couponId }
    };

    return this.http.delete(
      this.url + '/admin-coupon/delete-coupon/' + params.couponId,
      httpOptions
    );
  }

  /**
   * Handles 'delete' function. Calls delete method with specific api address
   * along its param.
   *
   * @param params from CoupondeleteForm
   */
  get(params: any): Observable<any> {
    return this.http.get(
      this.url + '/admin-coupon/coupon-detail',  {params: params}
    );
  }

  /**
   * Handles 'couponList' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from CouponlistForm
   */
  public couponList(params: CouponlistForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/admin-coupon/admin-coupon-list', { params: reqOpts });
  }

  /**
   * Handles 'addCoupon' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from CouponForm
   */

  addCoupon(param: CouponForm): Observable<any> {
    return this.http.post(this.url + '/admin-coupon/add-coupon', param);
  }

   // get product list

   getProductList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/product/productlist', {params: reqOpts});
  }
}
