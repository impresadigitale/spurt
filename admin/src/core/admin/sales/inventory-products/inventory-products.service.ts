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
import { Api } from '../../providers/api/api';

@Injectable()
export class InventoryProductService extends Api {
  // url
  private url: string = this.getBaseUrl();
  // for get method
  public params: any = {};

   /** inventory product list api */

  public inventoryProductList(params): Observable<any> {
    return this.http.get(
      this.url + '/product/inventory-product-list', {params: params}
    );
  }

   /** inventory product list count api */

   public inventoryProductListCount(params): Observable<any> {
    return this.http.get(
      this.url + '/product/inventory-product-list', {params: params}
    );
  }

   /** update stock api */

   public updateStock(params): Observable<any> {
    return this.http.post(
      this.url + '/product/update-stock', params
    );
  }
}
