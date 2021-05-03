/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../providers/api/api';

@Injectable()
export class ProductControlService extends Api {
  private base: string;
  /* add item to wish list api*/

  public addToWishlist(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(
      this.base + 'customer/add-product-to-wishlist',
      params
    );
  }
  /* get payment settings api*/

  public getPaymentSettings(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/get-payment-setting', {
      params: params
    });
  }

  /* call checkout api*/

  public CheckoutProduct(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'orders/customer-checkout', params);
  }
  /* check availability of the product*/

  public CheckProductAvailability(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'vendor-store/check-pincode-availability', {params: params});
  }
  /* app applyCoupon of the product*/

  public applyCoupon(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'customer-coupon/apply-coupon', params);
  }


  /** do backorder checkout */

  public backorderCheckout(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'orders/back-order-checkout', params);
  }

  /** make quatation */

  public makeQuatation(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'quotation/quotation-request', params);
  }

}
