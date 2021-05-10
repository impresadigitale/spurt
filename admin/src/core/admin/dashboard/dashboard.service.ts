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
import { HttpParams } from '@angular/common/http';
import { Api } from '../providers/api/api';

@Injectable()
export class DashboardService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();


  /* get top selling product list api*/
  public getTopSellingProducts(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(
      this.URL + '/product/top-selling-productlist',
      reqOpts
    );
  }

  /* get sales order list api*/
  public getSalesOrders(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/order/saleslist', reqOpts);
  }

  /* get visitors list api*/
  public getVisitorsList(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/customer/login-log-list', reqOpts);
  }

  /* get recent visitors list api*/
  public getRecentVisitorsList(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/customer/recent-customerlist', reqOpts);
  }

  /* get recent selling product list api*/
  public getRecentSellingProductList(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/product/recent-selling-product', reqOpts);
  }

  /* get items per page count api*/

  getItemsPerPageCount(): Observable<any> {
    return this.http.get(this.URL + '/settings/get-settings');
  }

  /* get dashboard counts*/

  getDashboardCount(): Observable<any> {
    return this.http.get(this.URL + '/product/dashboard-count');
  }
}
