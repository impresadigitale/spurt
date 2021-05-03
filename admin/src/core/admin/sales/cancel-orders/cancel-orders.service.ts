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
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CancelOrderService extends Api {

  params: any = {};
  public pagesize: any;
  private url: string = this.getBaseUrl();


  // get cancel order list

  public cancelOrderList(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-cancel-request-list', { params: params });
  }

  // get cancel order list count

  public cancelOrderListCount(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-cancel-request-list', { params: params });
  }

  // change cancel order status

  public changeCancelOrderStatus(params: any): Observable<any> {
    return this.http.put(this.url + '/order/update-order-cancel-request/' + params.orderProductId, params);
  }

  // export cancel order

  public exportCancelOrder(params: any): Observable<any> {
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
    return this.http.get(this.url + '/order/order-cancel-excel-list',  reqOpts);
  }

  // export bulk cancel order

  public exportBulkCancelOrder(params: any): Observable<any> {
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
    return this.http.get(this.url + '/order/bulk-order-cancel-excel-list',  reqOpts);
  }


  // bulk status change

  public bulkStatusChange(params: any): Observable<any> {
    return this.http.get(this.url + '/order/update-bulk-order-cancel-request', {params: params});
  }

   // get cancel order accepted

   public getAcceptedCount(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-cancel-request-list', { params: params });
  }

   // get cancel order rejected

   public getRejectedCount(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-cancel-request-list', { params: params });
  }

}
