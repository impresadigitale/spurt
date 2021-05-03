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
export class SettlementHistoryService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();



  public historyList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/settlement/settlement-list', {params: params});
  }

  public historyListCount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/settlement/settlement-list', {params: params});
  }

  public settlementDetails(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/settlement/settlement/' + params.id, params);
  }

}
