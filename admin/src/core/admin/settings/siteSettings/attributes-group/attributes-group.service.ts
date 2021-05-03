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
export class AttributeGroupService extends Api {
  // for get method
  public params: any = {};
  // url


  private basUrl = this.getBaseUrl();


  public attributeList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/attribute-group/AttributeGrouplist', {params: params});
  }

  public deleteAttribute(params: any): Observable<any> {
    return this.http.delete(this.basUrl + '/attribute-group/delete-attribute-group/' + params.groupId, params);
  }

  public addAttribute(params: any): Observable<any> {
    return this.http.post(this.basUrl + '/attribute-group/add-attribute-group', params);
  }

  public attributeUpdate(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/attribute-group/update-attribute-group/' + params.groupId, params);
  }

  public getAttribute(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/attribute-group/AttributeGrouplist', {params: params});
  }

  public detailsAttribute(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/attribute-group/get-attribute-group/' + params.id, );
  }

}
