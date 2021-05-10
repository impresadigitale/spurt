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
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CommonService extends Api {
  private base: string;

  /* get wishlist count api*/
  public getWishlistCount(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'customer/wishlist-product-list', {
      params: params
    });
  }

  /* get profile api*/
  public doGetProfile(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor/vendor-profile');
  }

  /* get setting api*/
  public doGetSettings(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/settings/get-settings');
  }
  /* edit profile api*/
  public doEditProfile(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const vendor = JSON.parse(localStorage.getItem('vendorUserDetails'));
    return this.http.put(
      this.base + '/vendor/edit-vendor/' + vendor.id,
      params
    );
  }
  /* get language api*/
  public getLanguage(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/language-list', { params: params });
  }
  /* get country api*/
  public getCounty(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/list/country-list', { params: params });
  }
  /* get country api*/
  public getDocument(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor/customer-document-list', { params: params });
  }
    /* get country api*/
    public getDocumentCount(params: any): Observable<any> {
      this.base = this.getBaseUrl();
      return this.http.get(this.base + '/vendor/customer-document-list', { params: params });
    }
  /* get country api*/
  public updateDocument(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + '/vendor/upload-customer-document', params);
  }
    /* get country api*/
    public downloadDocument(params: any): Observable<any> {
      this.base = this.getBaseUrl();
      const reqOpts: any = {};
      reqOpts.responseType = 'blob';
      if (params) {
        reqOpts.params = new HttpParams();
        for (const k in params) {
          if (k) {
            reqOpts.params = reqOpts.params.set(k, params[k]);
          }
        }
      }
      return this.http.get(this.base + '/vendor/download-customer-document/' + params, reqOpts);
    }

        /* get country api*/
    public getZone(params: any): Observable<any> {
      this.base = this.getBaseUrl();
      return this.http.get(this.base + '/list/zone-list', { params: params });
    }
}
