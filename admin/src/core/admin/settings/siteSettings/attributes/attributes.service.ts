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
import { Api } from '../../../providers/api/api';

@Injectable()
export class AttributeService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();



  public attributeList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/attribute/Attributelist', {params: params});
  }

  public deleteAttribute(params: any): Observable<any> {
    return this.http.delete(this.basUrl + '/attribute/delete-attribute/' + params.id, params);
  }

  public addAttribute(params: any): Observable<any> {
    return this.http.post(this.basUrl + '/attribute/add-attribute', params);
  }

  public attributeUpdate(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/attribute/update-attribute/' + params.attributeId, params);
  }

  public getAttributeCount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/attribute/Attributelist', {params: params});
  }

  public groupList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/attribute-group/AttributeGrouplist', {params: params});
  }

  public detailsAttribute(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/attribute/get-attribute/' + params.id);
  }


}
