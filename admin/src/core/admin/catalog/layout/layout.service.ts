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
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable()
export class LayoutService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();


   /* get order list count api*/

   public getCatalogCount(): Observable<any> {
    return this.http.get(this.URL + '/product/product-count');
  }

}
