/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Api } from '../providers/api/api';
import { TodaydealModel } from './models/todaydeal.model';

@Injectable()
export class ListsService extends Api {
  private base: string;
  private tempBrand: string;

  public getBrand(param) {
    this.tempBrand = param;
  }

  public setBrand() {
    return this.tempBrand;
  }

  public getCountryList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/country-list', { params: params });
  }

  /* get product list api*/

  public getProductList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'list/custom-product-list', reqOpts);
  }

  /* get product count api*/

  public getProductCount(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'list/product-count', reqOpts);
  }
  /* get category list api*/

  public getCategoryList(params: any): Observable<any> {
    this.base = this.getBaseUrl();

    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'list/category-list', reqOpts);
  }

  /* get banner list api*/

  public getBannerList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'list/banner-list', reqOpts);
  }

  /* get product rating api*/

  public getProductRating(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(
      this.base + 'product-store/Get-Product-rating',
      reqOpts
    );
  }

  /* get featured product list api*/

  public getFeaturedListList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(
      this.base + 'product-store/featureproduct-list',
      reqOpts
    );
  }

  /* get related product list api*/

  public getRelatedProducts(params: any): Observable<any> {
    this.base = this.getBaseUrl();

    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'list/related-product-list', reqOpts);
  }

  /* get brand list api*/

  public getManufacturer(params: any): Observable<any> {
    this.base = this.getBaseUrl();

    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'manufacturers/manufacturerlist', reqOpts);
  }

  /* get  product detail api*/

  public getProductDetail(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(
      this.base + 'product-store/productdetail/' + params.id
    );
  }

  /* get  product detail mandatory api*/

  public getProductDetailMandatory(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(
      this.base + 'product-store/productdetail/' + params.id
    );
  }

  /* get  page list api*/

  public getPageList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'pages/pagelist', { params: params });
  }

  /* get  settings api*/

  public getsettings(): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'settings/get-settings');
  }

  /* contact us detail api*/

  public contacUs(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'list/contact-us', params);
  }

  /* page detail api*/

  public pageDetails(orderId): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'pages/get_pagedetails/' + orderId);
  }

  /* zone list api*/
  public getZoneList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/zone-list', { params: params });
  }

  /* today deals list api*/
  public getTodayDealsList(params: TodaydealModel): Observable<any> {
    this.base = this.getBaseUrl();
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.base + 'product-store/todayDeals-list', {
      params: reqOpts
    });
  }

  /* subcategory list api*/
  getSubCategoryList(param) {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/specific-category-list', {
      params: param
    });
  }

  /* filter list api*/
  getFilterList(param) {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/filter-detail/' + param.categorySlug , {
      params: param
    });
  }

  /* subcategory list api*/
  getVendorDetail(param) {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'vendor-store/vendor-details/' + param.id);
  }

  public vendorsignup(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'vendor/register', params);
  }
  public trackOrderDetail(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/orderLoglist' , {params : params });
  }
  /* create enquiry api*/
  public createEnquiry(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'store-service/store-enquiry', params);
  }
   /* get  service list api*/

  public getServiceList(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'store-service/service-list', {
      params: params
    });
  }
   /* get  service category api*/

  public getServiceCategory(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'store-service/category-list', {
      params: params
    });
  }

  /* get question list api*/

  public getQuestionList(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/question-list', {params: params});
  }

  // post question api

  public postQuestion(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'store-question-answer/add-question', params);
  }

  // like or dislike answer api

  public likeOrDislikeAnswer(params): Observable<any> {
    this.base = this.getBaseUrl();
    const param = Object.assign({}, params);
    delete param.ansType;
    return this.http.post(this.base + 'store-question-answer/update-like-status', param);
  }

  /* get answer list api*/

  public getAnswerList(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/answer-list', {params: params});
  }

  /* post answer api*/

  public postAnswer(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'store-question-answer/add-answer', params);
  }

   /* report abuse api*/

  public reportAbuse(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'store-question-answer/add-report-abuse', params);
  }

  /* abuse reason list api*/

  public abuseReasonList(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'store-question-answer/abuse-reason-list', {params: params});
  }

   /* vendor product list api*/

  public vendorProductList(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'vendor-store/vendor-product-list/' + params.vendorId , {params: params});
  }

  /* vendor Review list api*/

  public vendorReviewList(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'vendor-store/vendor-product-review-list', {params: params});
  }

  public vendorReviewListCount(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'vendor-store/vendor-product-review-list', {params: params});
  }

  public widgetProductList(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/widget-list', {params: params});
  }

  public vendorProductListCount(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'vendor-store/vendor-product-list/' + params.vendorId , {params: params});
  }

}
