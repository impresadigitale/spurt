import { Api } from '../../../providers/api/api';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class OrdersService extends Api {
  private url: string = this.getBaseUrl();

  public ordersList(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-vendor-order/order-list', {
      params: params
    });
  }

  public ordersLogList(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-vendor-order/vendor-order-log-list', {
      params: params
    });
  }
  public ordersStatusList(params: any): Observable<any> {
    return this.http.get(this.url + '/order-status/order-status-list', {
      params: params
    });
  }
  public orderDetail(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-vendor-order/order-detail', {
      params: params
    });
  }
  public orderStatusChange(params: any): Observable<any> {
    return this.http.post(this.url + '/order/order-change-status', params);
  }
  public downloadInvoice(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-vendor-order/order-export-pdf', {
      params: params
    });
  }
}
