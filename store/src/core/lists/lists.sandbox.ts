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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Subject, Observable, BehaviorSubject } from 'rxjs';
import * as authAction from './action/lists.action';
import * as store from '../state.interface';
import {
  bannerCount,
  bannerFailedStatus,
  bannerList,
  bannerLoadedStatus,
  bannerLoadingStatus,
  contactUsFailedStatus,
  contactUsLoadedStatus,
  contactUsLoadingStatus,
  countFailedStatus,
  countLoadedStatus,
  countLoadingStatus,
  countryFailed,
  countryList,
  countryLoaded,
  countryLoading,
  featuredList,
  featuredListFailedStatus,
  featuredListLoadedStatus,
  featuredListLoadingStatus,
  getCategoryList,
  getContactDetail,
  getManufacturer,
  getPageList,
  getProductCount,
  getProductDetail,
  getProductFailed,
  getProductList,
  getProductLoaded,
  getProductLoading,
  getRelatedProducts,
  manufacturerFailedStatus,
  manufacturerLoadedStatus,
  manufacturerLoadingStatus,
  pageDetail,
  pageDetailFailedStatus,
  pageDetailLoadedStatus,
  pageDetailLoadingStatus,
  pageListFailedStatus,
  pageListLoadedStatus,
  pageListLoadingStatus,
  productDetailFailedStatus,
  productDetailLoadedStatus,
  productDetailLoadingStatus,
  relatedProductFailedStatus,
  relatedProductLoadedStatus,
  relatedProductLoadingStatus,
  settingDetail,
  zoneList,
  zoneLoading,
  zoneLoaded,
  zoneFailed,
  getMaxProductPrice,
  todayDealList,
  carParkList,
  todayDealLoading,
  todayDealLoaded,
  todayDealFailed,
  subCategoryList,
  subCategoryLoading,
  subCategoryLoaded,
  subCategoryFailed,
  getAvailableOptionsArray,
  subCategoryID,
  getproductDetailMandatory,
  productRating,
  productRatingLoading,
  productRatingLoaded,
  productRatingFailed,
  getactiveCategoryID,
  priceLoading,
  symbolSetting,
  vendorDetail,
  vendorDetailLoading,
  vendorDetailLoaded,
  vendorDetailFailed,
  vendorsignupLoading,
  vendorsignupFailed,
  vendorsignupLoaded,
  trackOrderDetail,
  trackOrderLoading,
  trackOrderLoaded,
  trackOrderFailed,
  enquiryLoading,
  enquiryLoaded,
  enquiryFailed,
  enquirySuccess,
  serviceList,
  serviceListLoading,
  serviceListLoaded,
  serviceListFailed,
  serviceCategory,
  questionList,
  postQuestion,
  postQuestionLoading,
  postQuestionLoaded,
  questionListLoaded,
  questionListLoading,
  answerList,
  answerListLoading,
  answerListLoaded,
  postAnswer,
  postAnswerLoading,
  abuseReasonList,
  abuseReasonListLoading,
  abuseReasonListLoaded,
  reportAbuse,
  reportAbuseLoading,
  reportAbuseLoaded,
  vendorProductList,
  vendorProductListLoading,
  vendorProductListLoaded,
  categoryLevel,
  vendorReviewList,
  vendorReviewListLoading,
  vendorReviewListLoaded,
  vendorReviewListCount,
  widgetProductList,
  widgetProductListLoading,
  widgetProductListLoaded,
  filterList,
  filterLoading,
  filterLoaded,
  filterFailed,
  vendorProductListCount,
  vendorProductListCountLoaded,
  carParkLoading,
  carParkFailed,
  carParkLoaded
} from './reducer/lists.selector';
import { FeaturedProductModel } from './models/featured-product.model';
import { ContactUsRequestModel } from './models/contact-us-request.model';
import { ProductControlSandbox } from '../product-control/product-control.sandbox';
import { EnquiryModel } from './models/enquiry.model';
import { ServiceListModel } from './models/service-list.model';
import { ServiceCategoryModel } from './models/service-category.model';



@Injectable()
export class ListsSandbox {
  private subject = new Subject<any>();


  public categoryList$ = this.appState$.select(getCategoryList);
  public relatedProducts$ = this.appState$.select(getRelatedProducts);
  public manufacturer$ = this.appState$.select(getManufacturer);
  public productDetails$ = this.appState$.select(getProductDetail);
  public productDetailMandatory$ = this.appState$.select(
    getproductDetailMandatory
  );
  /* product status*/
  public productlist$ = this.appState$.select(getProductList);
  public priceLoading$ = this.appState$.select(priceLoading);
  public categoryLevel$ = this.appState$.select(categoryLevel);

  public maxProductPrice$ = this.appState$.select(getMaxProductPrice);
  public productcount$ = this.appState$.select(getProductCount);
  public productLoading$ = this.appState$.select(getProductLoading);
  public productLoaded$ = this.appState$.select(getProductLoaded);
  public productFailed$ = this.appState$.select(getProductFailed);
  /* banner status*/

  public bannerList$ = this.appState$.select(bannerList);
  public bannerListLoading$ = this.appState$.select(bannerLoadingStatus);
  public bannerListLoaded$ = this.appState$.select(bannerLoadedStatus);
  public bannerListFailed$ = this.appState$.select(bannerFailedStatus);

  public vendorDetail$ = this.appState$.select(vendorDetail);
  public vendorDetailLoading$ = this.appState$.select(vendorDetailLoading);
  public vendorDetailLoaded$ = this.appState$.select(vendorDetailLoaded);
  public vendorDetailFailed$ = this.appState$.select(vendorDetailFailed);

  public bannerCount$ = this.appState$.select(bannerCount);
  public bannerCountLoading$ = this.appState$.select(countLoadingStatus);
  public bannerCountLoaded$ = this.appState$.select(countLoadedStatus);
  public bannerCountFailed$ = this.appState$.select(countFailedStatus);
  /* featured product status*/

  public featuredList$ = this.appState$.select(featuredList);
  public featuredListLoading$ = this.appState$.select(
    featuredListLoadingStatus
  );
  public featuredListLoaded$ = this.appState$.select(featuredListLoadedStatus);
  public featuredListFailed$ = this.appState$.select(featuredListFailedStatus);
  /* related product status*/

  public relatedProductLoadingStatus$ = this.appState$.select(
    relatedProductLoadingStatus
  );
  public relatedProductLoadedStatus$ = this.appState$.select(
    relatedProductLoadedStatus
  );
  public relatedProductFailedStatus$ = this.appState$.select(
    relatedProductFailedStatus
  );
  /* page list status*/

  public pageList$ = this.appState$.select(getPageList);
  public pageListLoading$ = this.appState$.select(pageListLoadingStatus);
  public pageListLoaded$ = this.appState$.select(pageListLoadedStatus);
  public pageListFailed$ = this.appState$.select(pageListFailedStatus);
  public settingDetail$ = this.appState$.select(settingDetail);
  public symbolSetting$ = this.appState$.select(symbolSetting);

  /* contact us status*/

  public contactUsLoaded$ = this.appState$.select(contactUsLoadingStatus);
  public contactUsLoading$ = this.appState$.select(contactUsLoadedStatus);
  public contactUsFailed$ = this.appState$.select(contactUsFailedStatus);
  public contactUs$ = this.appState$.select(getContactDetail);
  /* page detail status*/

  public pageDetailLoading$ = this.appState$.select(pageDetailLoadingStatus);
  public pageDetailLoaded$ = this.appState$.select(pageDetailLoadedStatus);
  public pageDetailFailed$ = this.appState$.select(pageDetailFailedStatus);
  public pageDetail$ = this.appState$.select(pageDetail);
  /* brand status*/

  public manufacturerLoading$ = this.appState$.select(
    manufacturerLoadingStatus
  );
  public manufacturerLoaded$ = this.appState$.select(manufacturerLoadedStatus);
  public manufacturerFailed$ = this.appState$.select(manufacturerFailedStatus);
  /* product detail status*/

  public productDetailLoading$ = this.appState$.select(
    productDetailLoadingStatus
  );
  public productDetailLoaded$ = this.appState$.select(
    productDetailLoadedStatus
  );
  public productDetailFailed$ = this.appState$.select(
    productDetailFailedStatus
  );
  /* country list status*/

  public countryList$ = this.appState$.select(countryList);
  public countryLoaded$ = this.appState$.select(countryLoading);
  public countryLoading$ = this.appState$.select(countryLoaded);
  public countryFailed$ = this.appState$.select(countryFailed);

  /* zone list status*/

  public zoneList$ = this.appState$.select(zoneList);
  public zoneLoaded$ = this.appState$.select(zoneLoading);
  public zoneLoading$ = this.appState$.select(zoneLoaded);
  public zoneFailed$ = this.appState$.select(zoneFailed);

  /* Product rating  status*/

  public productRating$ = this.appState$.select(productRating);
  public productRatingLoading$ = this.appState$.select(productRatingLoading);
  public productRatingLoaded$ = this.appState$.select(productRatingLoaded);
  public productRatingFailed$ = this.appState$.select(productRatingFailed);

  /* today deal list status*/

  public todayDealList$ = this.appState$.select(todayDealList);
  public todayDealLoading$ = this.appState$.select(todayDealLoading);
  public todayDealLoaded$ = this.appState$.select(todayDealLoaded);
  public todayDealFailed$ = this.appState$.select(todayDealFailed);

  /* today deal list status*/
  public carParkList$ = this.appState$.select(carParkList);
  public carParkLoading$ = this.appState$.select(carParkLoading);
  public carParkLoaded$ = this.appState$.select(carParkLoaded);
  public carParklFailed$ = this.appState$.select(carParkFailed);

  /* available options seleted */
  public availableOptionsArray$ = this.appState$.select(
    getAvailableOptionsArray
  );

  // subcategory list

  public selectedCategoryList$ = this.appState$.select(subCategoryID);
  public subCategoryList$ = this.appState$.select(subCategoryList);
  public subCategoryLoading$ = this.appState$.select(subCategoryLoading);
  public subCategoryLoaded$ = this.appState$.select(subCategoryLoaded);
  public subCategoryFailed$ = this.appState$.select(subCategoryFailed);
  // active category
  public getactiveCategoryID$ = this.appState$.select(getactiveCategoryID);

  public vendorsignupLoaded$ = this.appState$.select(vendorsignupLoaded);
  public vendorsignupLoading$ = this.appState$.select(vendorsignupLoading);
  public vendorsignupFailed$ = this.appState$.select(vendorsignupFailed);

  public trackOrderDetail$ = this.appState$.select(trackOrderDetail);
  public trackOrderLoading$ = this.appState$.select(trackOrderLoading);
  public trackOrderLoaded$ = this.appState$.select(trackOrderLoaded);
  public trackOrderFailed$ = this.appState$.select(trackOrderFailed);

  public enquiryLoading$ = this.appState$.select(enquiryLoading);
  public enquiryLoaded$ = this.appState$.select(enquiryLoaded);
  public enquiryFailed$ = this.appState$.select(enquiryFailed);
  public enquirySuccess$ = this.appState$.select(enquirySuccess);

  public serviceList$ = this.appState$.select(serviceList);
  public serviceListLoading$ = this.appState$.select(serviceListLoading);
  public serviceListLoaded$ = this.appState$.select(serviceListLoaded);
  public serviceListFailed$ = this.appState$.select(serviceListFailed);
  public serviceCategory$ = this.appState$.select(serviceCategory);

  // question and answer
  public questionList$ = this.appState$.select(questionList);
  public questionListLoaded$ = this.appState$.select(questionListLoaded);
  public questionListLoading$ = this.appState$.select(questionListLoading);

  public postQuestion$ = this.appState$.select(postQuestion);
  public postQuestionLoading$ = this.appState$.select(postQuestionLoading);
  public postQuestionLoaded$ = this.appState$.select(postQuestionLoaded);

  public answerList$ = this.appState$.select(answerList);
  public answerListLoading$ = this.appState$.select(answerListLoading);
  public answerListLoaded$ = this.appState$.select(answerListLoaded);
  public postAnswer$ = this.appState$.select(postAnswer);
  public postAnswerLoading$ = this.appState$.select(postAnswerLoading);

  public abuseReasonList$ = this.appState$.select(abuseReasonList);
  public abuseReasonListLoading$ = this.appState$.select(abuseReasonListLoading);
  public abuseReasonListLoaded$ = this.appState$.select(abuseReasonListLoaded);

  public reportAbuse$ = this.appState$.select(reportAbuse);
  public reportAbuseLoading$ = this.appState$.select(reportAbuseLoading);
  public reportAbuseLoaded$ = this.appState$.select(reportAbuseLoaded);


  // vendor product list
  public vendorProductList$ = this.appState$.select(vendorProductList);
  public vendorProductListLoading$ = this.appState$.select(vendorProductListLoading);
  public vendorProductListLoaded$ = this.appState$.select(vendorProductListLoaded);

  public vendorReviewList$ = this.appState$.select(vendorReviewList);
  public vendorReviewListLoading$ = this.appState$.select(vendorReviewListLoading);
  public vendorReviewListLoaded$ = this.appState$.select(vendorReviewListLoaded);
  public vendorReviewListCount$ = this.appState$.select(vendorReviewListCount);


  public widgetProductList$ = this.appState$.select(widgetProductList);
  public widgetProductListLoading$ = this.appState$.select(widgetProductListLoading);
  public widgetProductListLoaded$ = this.appState$.select(widgetProductListLoaded);

  // Filter List
  public filterList$ = this.appState$.select(filterList);
  public filterLoading$ = this.appState$.select(filterLoading);
  public filterLoaded$ = this.appState$.select(filterLoaded);
  public filterFailed$ = this.appState$.select(filterFailed);
  public vendorProductListCount$ = this.appState$.select(vendorProductListCount);
  public vendorProductListCountLoaded$ = this.appState$.select(vendorProductListCountLoaded);


  private subscriptions: Array<Subscription> = [];
  /** create a subject send the value from menucomponent and recieve value to productFilterComponent*/
  productFilterData = new Subject<any>();
  public oneTimeSubscribe: boolean;

  private messageSource = new BehaviorSubject(localStorage.getItem('keywordData') ? localStorage.getItem('keywordData') : '');
  currentMessage = this.messageSource.asObservable();


  constructor(
    private router: Router,
    private controlSandbox: ProductControlSandbox,
    protected appState$: Store<store.AppState>
  ) {
    this.registerEvents();
    this.getServiceCategory({});

    this.getSettings();
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.keyword = '';
    this.getPageList(params);
    this.getCountryList(params);
    params.limit = '';
    params.offset = '';
    params.count = '';
    this.getZoneList(params);
  }

  setKeyword(message: string) {
    this.messageSource.next(message)
  }
  public getProductList(params): void {
    this.appState$.dispatch(new authAction.GetProductList(params));
  }
  public getActiveCategory(params): void {
    this.appState$.dispatch(new authAction.GetActiveCategory(params));
  }

  public getProductRating(params): void {
    this.appState$.dispatch(new authAction.GetProductRating(params));
  }

  public getProductCount(params): void {
    this.appState$.dispatch(new authAction.GetProductCount(params));
  }

  public getCategoryList(params): void {
    this.appState$.dispatch(new authAction.GetCategoryList(params));
  }

  public getBannerList(params): void {
    this.appState$.dispatch(new authAction.GetBannerList(params));
  }

  public getRelatedProducts(params): void {
    this.appState$.dispatch(new authAction.GetRelatedProductList(params));
  }

  public getManufacturerList(params): void {
    this.appState$.dispatch(new authAction.GetManufacturerList(params));
  }

  public getProductDetails(params): void {
    this.appState$.dispatch(new authAction.GetProductDetail(params));
  }

  public updateProductDetails(params): void {
    this.appState$.dispatch(new authAction.UpdateProductDetailSuccess(params));
  }

  public getProductDetailsMandatory(params): void {
    this.appState$.dispatch(new authAction.GetProductDetailMandatory(params));
  }

  public getFeaturedList(params): void {
    this.appState$.dispatch(
      new authAction.GetFeaturedProductList(new FeaturedProductModel(params))
    );
  }

  public getPageList(params): void {
    this.appState$.dispatch(new authAction.GetPageList(params));
  }

  public getSettings(): void {
    this.appState$.dispatch(new authAction.GetSettings());
  }

  public contactUs(params): void {
    this.appState$.dispatch(
      new authAction.DoContactUsAction(new ContactUsRequestModel(params))
    );
  }

  public getPageDetail(params): void {
    this.appState$.dispatch(new authAction.GetPageDetails(params));
  }

  public getAvailableValue(params): void {
    this.appState$.dispatch(new authAction.GetAvailableValue(params));
  }

  public getCountryList(params): void {
    this.appState$.dispatch(new authAction.GetCountryList(params));
  }

  public getZoneList(params): void {
    this.appState$.dispatch(new authAction.GetZoneList(params));
  }

  public getTodayDealList(params): void {
    this.appState$.dispatch(new authAction.GetTodayDealsList(params));
  }

  public getCategory(params): void {
    this.appState$.dispatch(new authAction.GetSubCategoryList(params));
  }

  public getFilter(params): void {
    this.appState$.dispatch(new authAction.GetFilterList(params));
  }

  public removeActiveCategory(): void {
    this.appState$.dispatch(new authAction.RemoveActiveCategoryId());
  }
  public getVendorDetail(params): void {
    this.appState$.dispatch(new authAction.GetVendorDetail(params));
  }

  public vendorSignup(params): void {
    this.appState$.dispatch(
      new authAction.DoVendorSignupAction((params)));
  }
  public trackOrder(params): void {
    this.appState$.dispatch(
      new authAction.DoTrackOrderAction((params)));
  }
  public createEnquiry(params): void {
    this.appState$.dispatch(
      new authAction.CreateEnquiry(new EnquiryModel(params))
    );
  }
  public getServiceList(params): void {
    this.appState$.dispatch(
      new authAction.GetServiceList(new ServiceListModel(params))
    );
  }
  public getServiceCategory(params): void {
    this.appState$.dispatch(
      new authAction.GetServiceCategory(new ServiceCategoryModel(params))
    );
  }

  public getQuestionList(params): void {
    this.appState$.dispatch(
      new authAction.GetQuestionListAction(params));
  }

  public postQuestion(params): void {
    this.appState$.dispatch(
      new authAction.PostQuestionAction(params));
  }

  public likeOrDislikeAnswer(params): void {
    this.appState$.dispatch(
      new authAction.LikeOrDislikeAnswerAction(params));
  }

  public getAnswerList(params): void {
    this.appState$.dispatch(
      new authAction.GetAnswerListAction(params));
  }

  public postAnswer(params): void {
    this.appState$.dispatch(
      new authAction.PostAnswerAction(params));
  }

  public reportAbuse(params): void {
    this.appState$.dispatch(
      new authAction.ReportAbuseAction(params));
  }

  public getAbuseReasonList(params): void {
    this.appState$.dispatch(
      new authAction.AbuseReasonListAction(params));
  }

  public getVendorProductList(params): void {
    this.appState$.dispatch(
      new authAction.VendorProductListAction(params));
  }

  public vendorProductListCount(params): void {
    this.appState$.dispatch(
      new authAction.VendorProductListCountAction(params));
  }



  public getVendorReviewList(params): void {
    this.appState$.dispatch(
      new authAction.VendorReviewListAction(params));
  }

  public getVendorReviewListCount(params): void {
    this.appState$.dispatch(
      new authAction.VendorReviewListCountAction(params));
  }



  public changeCount(params): void {
    this.appState$.dispatch(
      new authAction.ChangeCountAction(params));
  }

  public getWidgetProductList(params): void {
    this.appState$.dispatch(
      new authAction.WidgetProductListAction(params));
  }

  public clearFilter(): void {
    this.appState$.dispatch(
      new authAction.ClearFilter());
  }


  // add whishlist items to cart
  public whishLists(param) {
    this.oneTimeSubscribe = true;
    this.getProductDetails(param);
    this.productDetails$.subscribe(responseData => {
      if (responseData) {
        const details: any = responseData;
        if (details.productId && this.oneTimeSubscribe === true) {
          this.oneTimeSubscribe = false;
          const tempArray: any = [];
          const params: any = {};
          params.totalOptions = 0;
          details._totalOptions = params.totalOptions;
          details._optionValueArray = tempArray;
          this.controlSandbox.selectedOptions(params);
          this.controlSandbox.addItemsToCart(details, params);
        }
      }
    });
  }
  /** subscribe   value **/

  public registerEvents() {
    this.subscriptions.push(
      this.contactUs$.subscribe(contact => {
        if (contact && contact['status'] === 1) {
          this.router.navigate(['/']);
        }
      })
    );
    /** subscribe the productDetailMandatory$  value,
     * and set default option value for the product**/
    this.productDetailMandatory$.subscribe(data => {
      if (data) {
        const tempArray: any = [];
        let tempPrice: any;
        let temptotalPrice = 0;
        const tempData: any = data;
        if (tempData.productOption) {
          const tempOptions = data.productOption;
          if (tempOptions[0]) {
            const param: any = {};
            for (let i = 0; i < tempData.productOption.length; i++) {
              if (tempData.productOption[i].required === 1) {
                tempArray.push(
                  tempData.productOption[i].optionValue[0].optionValueName
                );
                tempPrice = parseInt(
                  tempData.productOption[i].optionValue[0].price,
                  10
                );
                if (
                  tempData.productOption[i].optionValue[0].pricePrefix === '0'
                ) {
                  tempPrice = tempPrice * -1;
                } else {
                  tempPrice = tempPrice * 1;
                }
                temptotalPrice = temptotalPrice + tempPrice;
              }
            }
            tempData._optionValueArray = tempArray;
            param.totalOptions = temptotalPrice;
            param.totalOptions = temptotalPrice;
            tempData.productCount = 1;
            tempData._totalOptions = temptotalPrice;
            this.controlSandbox.addItemsToCart(tempData, param);
          }
        }
      }
    });
  }
}
