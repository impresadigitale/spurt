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
import { FilterForm } from './filter-model/filter.model';
import { Api } from '../../../providers/api/api';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class FilterService extends Api {
  private url = this.getBaseUrl();

  // filter List
  filterlist(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/site-filter/site-filter-list', { params: reqOpts });
  }
  // filter List pagination
  public filterpagiantion(param: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = param;
    return this.http.get(this.url + '/site-filter/site-filter-list', { params: reqOpts });
  }
  // new filter setting
  createfilter(param: FilterForm): Observable<any> {
    return this.http.post(this.url + '/site-filter/create-site-filter', param);
  }

  varientList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/varients/varientslist', { params: reqOpts });
  }
  attributeList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/attribute-group/AttributeGrouplist', { params: reqOpts });
  }
  DeleteFilter(params) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: params
    };
    return this.http.delete(
      this.url + '/site-filter/delete-site-filter/' + params.id,
      httpOptions
    );
  }
  getFilter(params) {
    return this.http.get(this.url + '/site-filter/filter-detail/' + params);
  }
  public updateFilter(param): Observable<any> {
    return this.http.put(this.url + '/site-filter/update-site-filter/' + param.editId, param);
  }
}
