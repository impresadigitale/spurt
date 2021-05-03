
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '.././providers/api/api';
// model
import { ProductListModel } from './product-model/Product-list.model';
import { ProductDeleteModel } from './product-model/product-delete.model';
import { DetailModel } from './product-model/detail.model';
import { ProductBulkDeleteModel } from './product-model/product-bulk-delete.model';

@Injectable()
export class ProductService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();


   // add product
   productAdd(param) {
    return this.http.post(this.basUrl + '/vendor-product/create-vendor-product', param);
  }
    /**
   * Handles 'productDetail' function. Calls get method with specific api address
   * along its param.
   *
   * @param param from DetailModel
   */
  productDetail(param: DetailModel) {
    return this.http.get(this.basUrl + '/vendor-product/vendor-product-detail/' + param.Id);
  }
  /**
   * Handles 'productDetail' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  productUpdate(param) {
    return this.http.put(
      this.basUrl + '/vendor-product/update-vendor-product/' + param.productId,
      param
    );
  }
// delete product
  productDelete(params: ProductDeleteModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { productId: params.productId }
    };

    return this.http.delete(
      this.basUrl + '/vendor-product/delete-product/' + params.productId,
      httpOptions
    );
  }
// delete bulk product
productBulkDelete(params: ProductBulkDeleteModel): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: false,
    body: { productId: params.productId }
  };

  return this.http.post(
    this.basUrl + '/vendor-product/delete-product', params,
    httpOptions
  );
}
// list product
  public productList(params: ProductListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-product/vendor-product-list', {
      params: reqOpts
    });
  }
  // stock status list
  public stockStatusList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/stock-status/stock-status-list', {
      params: reqOpts
    });
  }
// product status change service calling


public productStatus(params: any): Observable<any> {
  return this.http.put(this.basUrl + '/vendor-product/add-vendor-product-status/' + params.productId, params);

}
  public categoryList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor/vendor-category-list', { params: reqOpts });
  }
  /**
   * Handles 'productCount' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from RatingReviewListModel
   */

public productCount(filterParam: any): Observable<any> {
  const reqOpts: any = {};
  const params = Object.getOwnPropertyNames(filterParam).reduce(
    (p, key) => p.set(key, filterParam[key]),
    new HttpParams()
  );
  reqOpts.params = params;
  return this.http.get(this.basUrl + '/vendor-product/vendor-product-list', reqOpts);
}

  /**
   * Handles 'ProductExcel' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public productExcel(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/admin-vendor-product/vendor-product-excel-list', reqOpts);
  }




  /**
   * Handles 'ProductExcel' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public productAllExcel(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/admin-vendor-product/bulk-vendor-product-excel-list', reqOpts);
  }

  // get manufacturer list

  public manufacturerList(params): Observable<any> {
    return this.http.get(this.basUrl + '/manufacturer/manufacturerlist' , {params: params});
  }

  // change quotation status
  public changeQuotationStatus(params): Observable<any> {
    return this.http.put(this.basUrl + '/vendor-product/update-quotation-available/' + params.productId , params);
  }

  variantList(params): Observable<any> {
    return this.http.get( this.basUrl + '/varients/varientslist', {params: params});
  }

  public taxList(params): Observable<any> {
    return this.http.get(this.basUrl + '/tax/tax-list' , {params: params});
  }
  deleteProbabilityOption(params): Observable<any> {
    return this.http.delete( this.basUrl + '/vendor-product/delete-product-varient-option/' + params.id);
  }
}
