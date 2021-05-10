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
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable()
export class WidgetService extends Api {
  params: any = {};
  private url: string = this.getBaseUrl();

  // list
  public widgetList(params: any): Observable<any> {
    return this.http.get(this.url + '/widget/widget-list', { params: params });
  }
// count
  public widgetListCount(params: any): Observable<any> {
    return this.http.get(this.url + '/widget/widget-list', { params: params });
  }

  // Update
  public updateWidget(param: any): Observable<any> {
    return this.http.put(this.url + '/widget/update-widget/' + param.widgetId, param);
  }

  // add
  addWidget(param: any) {
    return this.http.post(this.url + '/widget/add-widget', param);
  }

  // delete
  public deleteWidget(param: any): Observable<any> {
    return this.http.delete(this.url + '/widget/delete-widget/' + param.widgetId, param);
  }

  // banner count
  public widgetCount(): Observable<any> {
    return this.http.get(this.url + '/widget/widget-count');
  }

  // banner details

  public widgetDetails(params): Observable<any> {
    return this.http.get(this.url + '/widget/widget-detail', {params: params});
  }

  // get product list

  public productList(params): Observable<any> {
    return this.http.get(this.url + '/widget/productlist', {params: params});
  }

  // get category list

  public categoryList(params): Observable<any> {
    return this.http.get(this.url + '/categorylist', {params: params});
  }

}
