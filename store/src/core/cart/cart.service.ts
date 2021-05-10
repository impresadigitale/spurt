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
export class CartService extends Api {
  private base: string;

  /* get cart count api*/
  public getCartCount(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'customer-cart/customer-cart-list', {
      params: params
    });
  }

  /* get addToCart api*/
  public doAddToCart(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'customer-cart/add-cart', params);
  }
  /* get addToCart api*/
  public deleteCart(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'customer-cart/delete-cart-item', params);
  }

  /* get cart api*/
  public GetCartList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'customer-cart/customer-cart-list', { params: params });
  }
}
