/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../state.interface';
import { catchError, tap } from 'rxjs/operators';
import * as actions from './../action/lists.action';
import { ListsService } from '../lists.service';
import { Meta, Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ListsEffect {
  constructor(
    private actions$: Actions,
    private authApi: ListsService,
    private appState$: Store<store.AppState>,
    public snackBar: MatSnackBar,
    public router: Router,
    public title: Title,
    private meta: Meta,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST),
    map((action: actions.GetProductList) => action.payload),
    switchMap(state => {
      return this.authApi.getProductList(state).pipe(
        map(register => new actions.GetProductListSuccess(register)),
        catchError(error => of(new actions.GetProductListFail(error)))
      );
    })
  );

  @Effect()
  getProductRating$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_RATING),
    map((action: actions.GetProductRating) => action.payload),
    switchMap(state => {
      return this.authApi.getProductRating(state).pipe(
        map(register => new actions.GetProductRatingSuccess(register)),
        catchError(error => of(new actions.GetProductRatingFail(error)))
      );
    })
  );

  @Effect()
  getProductCount$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_COUNT),
    map((action: actions.GetProductCount) => action.payload),
    switchMap(state => {
      return this.authApi.getProductCount(state).pipe(
        map(register => new actions.GetProductCountSuccess(register)),
        catchError(error => of(new actions.GetProductCountFail(error)))
      );
    })
  );

  @Effect()
  getCategory$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_CATEGORY_LIST),
    map((action: actions.GetCategoryList) => action.payload),
    switchMap(state => {
      return this.authApi.getCategoryList(state).pipe(
        map(category => new actions.GetCategoryListSuccess(category)),
        catchError(error => of(new actions.GetCategoryListFail(error)))
      );
    })
  );
  @Effect()
  getRelatedProducts$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_RELATED_PRODUCT_LIST),
    map((action: actions.GetRelatedProductList) => action.payload),
    switchMap(state => {
      return this.authApi.getRelatedProducts(state).pipe(
        map(product => new actions.RelatedProductListSuccess(product)),
        catchError(error => of(new actions.RelatedProductListFail(error)))
      );
    })
  );
  @Effect()
  getManufacturer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_MANUFACTURER_LIST),
    map((action: actions.GetManufacturerList) => action.payload),
    switchMap(state => {
      return this.authApi.getManufacturer(state).pipe(
        map(manufacturer => new actions.ManufacturerListSuccess(manufacturer)),
        catchError(error => of(new actions.ManufacturerListtFail(error)))
      );
    })
  );

  // call product detail api
  @Effect()
  getProductDetail$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
    map((action: actions.GetProductDetail) => action.payload),
    switchMap(state => {
      return this.authApi.getProductDetail(state).pipe(
        tap(res => {
          if (res) {
            this.title.setTitle(res.data.metaTagTitle);
            this.meta.addTags([
              { name: 'description', content: res.data.metaTagDescription }
            ]);
            const description = this.meta.getTags('name=description');
          }
          if (Object.keys(res.data).length) {
            const params: any = {};
            params.limit = '';
            params.offset = '';
            params.keyword = '';
            params.count = '';
            params.productId = res.data.productId;
            this.appState$.dispatch(new actions.GetQuestionListAction(params));
          }
        }),
        map(manufacturer => new actions.GetProductDetailSuccess(manufacturer)),
        catchError(error => of(new actions.GetProductDetailFail(error)))
      );
    })
  );

  @Effect()
  getProductDetailMandatory$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL_MANDATORY),
    map((action: actions.GetProductDetailMandatory) => action.payload),
    switchMap(state => {
      return this.authApi.getProductDetailMandatory(state).pipe(
        map(
          manufacturer =>
            new actions.GetProductDetailMandatorySuccess(manufacturer)
        ),
        catchError(error =>
          of(new actions.GetProductDetailMandatoryFail(error))
        )
      );
    })
  );

  @Effect()
  bannerList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_BANNER_LIST),
    map((action: actions.GetBannerList) => action.payload),
    switchMap(state => {
      return this.authApi.getBannerList(state).pipe(
        map(banner => new actions.GetBannerListSuccess(banner)),
        catchError(error => of(new actions.GetBannaerListFail(error)))
      );
    })
  );
  @Effect()
  bannerCount$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_BANNER_LIST_COUNT),
    map((action: actions.GetBannerListCount) => action.payload),
    switchMap(state => {
      return this.authApi.getBannerList(state).pipe(
        map(count => new actions.GetBannerListCountSuccess(count)),
        catchError(error => of(new actions.GetBannaerListCountFail(error)))
      );
    })
  );
  @Effect()
  featuredProduct$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_FEATURED_PRODUCT_LIST),
    map((action: actions.GetFeaturedProductList) => action.payload),
    switchMap(state => {
      return this.authApi.getFeaturedListList(state).pipe(
        map(featured => new actions.GetFeaturedProductListSuccess(featured)),
        catchError(error => of(new actions.GetFeaturedProductListFail(error)))
      );
    })
  );
  @Effect()
  pageList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PAGE_LIST),
    map((action: actions.GetPageList) => action.payload),
    switchMap(state => {
      return this.authApi.getPageList(state).pipe(
        map(featured => new actions.GetPageListSuccess(featured)),
        catchError(error => of(new actions.GetPageListFail(error)))
      );
    })
  );

  @Effect()
  getSettings$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SETTINGS_ACTION),
    map((action: actions.GetSettings) => action.payload),
    switchMap(state => {
      return this.authApi.getsettings().pipe(
        tap(res => {
          if (res) {
            this.title.setTitle(res.data[0].metaTagTitle);

            this.meta.addTags([
              { name: 'description', content: res.data[0].metaTagDescription }
            ]);
            const description = this.meta.getTags('name=description');
            if (res.data[0].symbolLeft !== null) {
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem(
                  'currency',
                  JSON.stringify({
                    position: 'left',
                    symbol: res.data[0].symbolLeft
                  })
                );
              }
            } else if (res.data[0].symbolRight !== null) {
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem(
                  'currency',
                  JSON.stringify({
                    position: 'right',
                    symbol: res.data[0].symbolRight
                  })
                );
              }
            }
          }
        }),
        map(featured => new actions.GetSettingsSuccess(featured)),
        catchError(error => of(new actions.GetSettingsFail(error)))
      );
    })
  );
  @Effect()
  contactUs$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_CONTACT_US_ACTION),
    map((action: actions.DoContactUsAction) => action.payload),
    switchMap(state => {
      return this.authApi.contacUs(state).pipe(
        map(contact => new actions.DoContactUsActionSuccess(contact)),
        catchError(error => of(new actions.DoContactUsActionFail(error)))
      );
    })
  );
  @Effect()
  pageDetail$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PAGE_DETAIL),
    map((action: actions.GetPageDetails) => action.payload),
    switchMap(state => {
      return this.authApi.pageDetails(state).pipe(
        tap(res => {
          if (res) {
            this.title.setTitle(res.data.metaTagTitle);
          }
        }),
        map(contact => new actions.GetPageDetailsSuccess(contact)),
        catchError(error => of(new actions.GetPageDetailsSuccess(error)))
      );
    })
  );
  @Effect()
  country$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_COUNTRY_LIST),
    map((action: actions.GetCountryList) => action.payload),
    switchMap(state => {
      return this.authApi.getCountryList(state).pipe(
        map(orders => new actions.GetCountryListSuccess(orders)),
        catchError(error => of(new actions.GetCountryListFail(error)))
      );
    })
  );
  @Effect()
  zone$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_ZONE_LIST),
    map((action: actions.GetZoneList) => action.payload),
    switchMap(state => {
      return this.authApi.getZoneList(state).pipe(
        map(orders => new actions.GetZoneListSuccess(orders)),
        catchError(error => of(new actions.GetZoneListFail(error)))
      );
    })
  );
  @Effect()
  todayDeals$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_TODAY_DEALS),
    map((action: actions.GetTodayDealsList) => action.payload),
    switchMap(state => {
      return this.authApi.getTodayDealsList(state).pipe(
        map(orders => new actions.GetTodayDealsListSuccess(orders)),
        catchError(error => of(new actions.GetTodayDealsListFail(error)))
      );
    })
  );

  @Effect()
  getSubCategory$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SubCATEGORY_LIST),
    map((action: actions.GetSubCategoryList) => action.payload),
    switchMap(state => {
      return this.authApi.getSubCategoryList(state).pipe(
        map(data => new actions.GetSubCategoryListSuccess(data)),
        catchError(error => of(new actions.GetSubCategoryListFail(error)))
      );
    })
  );

  @Effect()
  getFilter$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_FILTER_LIST),
    map((action: actions.GetFilterList) => action.payload),
    switchMap(state => {
      return this.authApi.getFilterList(state).pipe(
        map(data => new actions.GetFilterListSuccess(data)),
        catchError(error => of(new actions.GetFilterListFail(error)))
      );
    })
  );

  @Effect()
  getVendorDetail$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_VENDOR_DETAILS),
    map((action: actions.GetVendorDetail) => action.payload),
    switchMap(state => {
      return this.authApi.getVendorDetail(state).pipe(
        map(
          detail =>
            new actions.GetVendorDetailSuccess(detail)
        ),
        catchError(error =>
          of(new actions.GetVendorDetailFail(error))
        )
      );
    })
  );

  @Effect()
  vendorSignup$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_VENDORSIGNUP_ACTION),
    map((action: actions.DoVendorSignupAction) => action.payload),
    switchMap(state => {
      return this.authApi.vendorsignup(state).pipe(
        map(contact => new actions.DoVendorSignupActionSuccess(contact)),
         tap(val => {
        this.router.navigate(['/']);
      }),
        catchError(error => of(new actions.DoVendorSignupActionFail(error)))
      );
    })
  );
  @Effect()
  trackOrderDetail$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_TRACK_ORDER),
    map((action: actions.DoTrackOrderAction) => action.payload),
    switchMap(state => {
      return this.authApi.trackOrderDetail(state).pipe(
        tap(res => {
          if (res && res.message === 'Invalid OrderId.') {
          }
        }),
        map(contact => new actions.DoTrackOrderActionSuccess(contact)),
        catchError(error => of(new actions.DoTrackOrderActionFail(error)))
      );
    })
  );
  @Effect()
  serviceEnquiry$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.CREATE_ENQUIRY),
    map((action: actions.CreateEnquiry) => action.payload),
    switchMap(state => {
      return this.authApi.createEnquiry(state).pipe(
        map(orders => new actions.CreateEnquirySuccess(orders)),
        catchError(error => of(new actions.CreateEnquiryFail(error)))
      );
    })
  );

  @Effect()
  serviceList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SERVICE_LIST),
    map((action: actions.GetServiceList) => action.payload),
    switchMap(state => {
      return this.authApi.getServiceList(state).pipe(
        map(orders => new actions.GetServiceListSuccess(orders)),
        catchError(error => of(new actions.GetServiceListFail(error)))
      );
    })
  );

  @Effect()
  serviceCategory$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SERVICE_CATEGORY),
    map((action: actions.GetServiceCategory) => action.payload),
    switchMap(state => {
      return this.authApi.getServiceCategory(state).pipe(
        map(orders => new actions.GetServiceCategorySuccess(orders)),
        catchError(error => of(new actions.GetServiceCategoryFail(error)))
      );
    })
  );

  @Effect()
  questionList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_QUESTION_LIST),
    map((action: actions.GetQuestionListAction) => action.payload),
    switchMap(state => {
      return this.authApi.getQuestionList(state).pipe(
        map(banner => new actions.GetQuestionListSuccess(banner)),
        catchError(error => of(new actions.GetQuestionListFail(error)))
      );
    })
  );

  @Effect()
  postQuestion$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.POST_QUESTION),
    map((action: actions.PostQuestionAction) => action.payload),
    switchMap(state => {
      return this.authApi.postQuestion(state).pipe(
        map(banner => new actions.PostQuestionSuccess(banner)),
        catchError(error => of(new actions.PostQuestionFail(error)))
      );
    })
  );

  @Effect()
  likeOrDislike$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.LIKE_OR_DISLIKE_ANSWER),
    map((action: actions.LikeOrDislikeAnswerAction) => action.payload),
    switchMap(state => {
      return this.authApi.likeOrDislikeAnswer(state).pipe(
        map(banner => new actions.LikeOrDislikeAnswerSuccess(banner)),
        catchError(error => of(new actions.LikeOrDislikeAnswerFail(error)))
      );
    })
  );

  @Effect()
  answerList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_ANSWER_LIST),
    map((action: actions.GetAnswerListAction) => action.payload),
    switchMap(state => {
      return this.authApi.getAnswerList(state).pipe(
        map(banner => new actions.GetAnswerListSuccess(banner)),
        catchError(error => of(new actions.GetAnswerListFail(error)))
      );
    })
  );

  @Effect()
  postAnswer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.POST_ANSWER),
    map((action: actions.PostAnswerAction) => action.payload),
    switchMap(state => {
      return this.authApi.postAnswer(state).pipe(
        map(register => new actions.PostAnswerSuccess(register)),
        catchError(error => of(new actions.PostAnswerFail(error)))
      );
    })
  );

  @Effect()
  reportAbuse$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.REPORT_ABUSE),
    map((action: actions.ReportAbuseAction) => action.payload),
    switchMap(state => {
      return this.authApi.reportAbuse(state).pipe(
        map(register => new actions.ReportAbuseSuccess(register)),
        catchError(error => of(new actions.ReportAbuseFail(error)))
      );
    })
  );

  @Effect()
  abuseReason$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.ABUSE_REASON_LIST),
    map((action: actions.AbuseReasonListAction) => action.payload),
    switchMap(state => {
      return this.authApi.abuseReasonList(state).pipe(
        map(register => new actions.AbuseReasonListSuccess(register)),
        catchError(error => of(new actions.AbuseReasonListFail(error)))
      );
    })
  );

  @Effect()
  vendorProduct$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.VENDOR_PRODUCT_LIST),
    map((action: actions.VendorProductListAction) => action.payload),
    switchMap(state => {
      return this.authApi.vendorProductList(state).pipe(
        map(register => new actions.VendorProductListSuccess(register)),
        catchError(error => of(new actions.VendorProductListFail(error)))
      );
    })
  );

  @Effect()
  vendorReview$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.VENDOR_REVIEW_LIST),
    map((action: actions.VendorReviewListAction) => action.payload),
    switchMap(state => {
      return this.authApi.vendorReviewList(state).pipe(
        map(register => new actions.VendorReviewListSuccess(register)),
        catchError(error => of(new actions.VendorReviewListFail(error)))
      );
    })
  );

  @Effect()
  vendorReviewCount$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.VENDOR_REVIEW_LIST_COUNT),
    map((action: actions.VendorReviewListCountAction) => action.payload),
    switchMap(state => {
      return this.authApi.vendorReviewListCount(state).pipe(
        map(register => new actions.VendorReviewListCountSuccess(register)),
        catchError(error => of(new actions.VendorReviewListCountFail(error)))
      );
    })
  );

  @Effect()
  widgetProduct$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.WIDGET_PRODUCT_LIST),
    map((action: actions.WidgetProductListAction) => action.payload),
    switchMap(state => {
      return this.authApi.widgetProductList(state).pipe(
        map(register => new actions.WidgetProductListSuccess(register)),
        catchError(error => of(new actions.WidgetProductListFail(error)))
      );
    })
  );

  @Effect()
  vendorProductCount$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.VENDOR_PRODUCT_LIST_COUNT),
    map((action: actions.VendorProductListCountAction) => action.payload),
    switchMap(state => {
      return this.authApi.vendorProductListCount(state).pipe(
        map(register => new actions.VendorProductListCountSuccess(register)),
        catchError(error => of(new actions.VendorProductListCountFail(error)))
      );
    })
  );

}
