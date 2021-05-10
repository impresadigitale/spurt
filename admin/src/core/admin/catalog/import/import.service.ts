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
import { Api } from '../../providers/api/api';
import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class ImportService extends Api {

  // address url
  private url: string = this.getBaseUrl();



  downloadFile(params): Observable<any> {
      const reqOpts: any = {};
      reqOpts.responseType = 'arraybuffer';
      if (params) {
        reqOpts.params = new HttpParams();
        for (const k in params) {
          if (k) {
            reqOpts.params = reqOpts.params.set(k, params[k]);
          }
        }
      }

    return this.http.get( this.url + '/product/download-product-sample', reqOpts);
  }

  uploadFile(params): Observable<any> {
    const formData = new FormData();
    formData.append('file', params.file, params.file.name);
    return this.http.post( this.url + '/product/import-product-data', formData);
  }

}
