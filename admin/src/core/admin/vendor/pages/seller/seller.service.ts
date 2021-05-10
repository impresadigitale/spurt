import {Api} from '../../../providers/api/api';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CountryListForm } from './seller-model/countrylist.model';

@Injectable()
export class SellerService extends Api {
    private url: string = this.getBaseUrl();
editData: any;
// passing manufacture editdata
setSellerEditValue(editdata) {
    this.editData = editdata;
  }

  getSellerEditeValue() {
    return this.editData;
  }

    public sellerList(params: any): Observable<any> {
        return this.http.get(this.url + '/admin-vendor/vendorlist', {params: params});
    }

    public sellerAdd(params: any): Observable<any> {
        return this.http.post(this.url + '/admin-vendor/add-vendor', params);
    }

    sellerUpdate(params): Observable<any> {
      return this.http.put(
        this.url + '/admin-vendor/Update-Vendor/' + params.customerId, params
      );
    }

    public pageDetails(param: any): Observable<any> {
      return this.http.get<any>(
        this.url + '/admin-vendor/vendor-details/' + param.vendorId);
    }

    public deleteSeller(param: any): Observable<any> {
      return this.http.delete(
        this.url + '/admin-vendor/delete-vendor/' +  param.vendorId,
        param
      );
    }

    public sellerListCount(params): Observable<any> {
      return this.http.get(this.url + '/admin-vendor/vendorlist', {params: params});
    }



  public sellerExcel(params): Observable<any> {
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
    return this.http.get(this.url + '/admin-vendor/vendor-excel-list/', reqOpts);
  }


  sellerBulkDelete(param) {
    return this.http.post(this.url + '/admin-vendor/delete-multiple-vendor', param);
  }

  public sellerApproval(params: any): Observable<any> {
    return this.http.put(this.url + '/admin-vendor/approve-vendor/' + params.vendorId, params);

}


public countrylist(params): Observable<any> {
  return this.http.get(this.url + '/country/countrylist', {
    params: params
  });
}

public vendorCounts(): Observable<any> {
  return this.http.get(this.url + '/admin-vendor/vendor-count');
}

public zoneList(params): Observable<any> {
  return this.http.get(this.url + '/list/zone-list', {
    params: params
  });
}
}

