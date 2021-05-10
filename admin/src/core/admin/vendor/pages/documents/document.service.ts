import { Api } from '../../../providers/api/api';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class DocumentService extends Api {
  private URL: string = this.getBaseUrl();

  documentList(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam)
      .reduce((p, key) => p.set(key, filterParam[key]), new HttpParams());
    reqOpts.params = params;
    return this.http.get(this.URL + '/admin-vendor/customer-document-list', reqOpts);
  }

  documentListCount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam)
      .reduce((p, key) => p.set(key, filterParam[key]), new HttpParams());
    reqOpts.params = params;
    return this.http.get(this.URL + '/admin-vendor-document/document-list-count', reqOpts);
  }

  documentDetail(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam)
      .reduce((p, key) => p.set(key, filterParam[key]), new HttpParams());
    reqOpts.params = params;
    return this.http.get(this.URL + '/admin-vendor-document/document-detail', reqOpts);
  }

  documentStatusChange(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.documentStatus = filterParam.documentStatus;
    return this.http.put(this.URL + '/admin-vendor/verify-customer-document/' + filterParam.id, reqOpts);
  }

  public downloadDocument(params: any): Observable<any> {
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
    return this.http.get(this.URL + '/admin-vendor/download-customer-document/' + params, reqOpts);
  }

}

