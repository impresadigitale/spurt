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
import { Api } from '../../providers/api/api';

@Injectable()
export class QuotationRequestService extends Api {

  params: any = {};
  public pagesize: any;
  private url: string = this.getBaseUrl();


  // quotation List

  public quotationList(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-quotation/quotation-request-list', { params: params });
  }

  // quotation List count

  public quotationListCount(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-quotation/quotation-request-list', { params: params });
  }

}
