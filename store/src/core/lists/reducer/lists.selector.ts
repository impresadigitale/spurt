/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';

import * as fromList from './lists.reducer';
import { AppState } from '../../state.interface';

export const getState = (State: AppState) => State.list;
export const getProductList = createSelector(
  getState,
  fromList.productList
);
export const categoryLevel = createSelector(
  getState,
  fromList.categoryLevel
);
export const getactiveCategoryID = createSelector(
  getState,
  fromList.activeCategoryID
);
export const getMaxProductPrice = createSelector(
  getState,
  fromList.maxProductPrice
);
export const getProductCount = createSelector(
  getState,
  fromList.getProductCount
);
export const getCategoryList = createSelector(
  getState,
  fromList.categoryList
);
export const getRelatedProducts = createSelector(
  getState,
  fromList.relatedProducts
);
export const getManufacturer = createSelector(
  getState,
  fromList.manufacturer
);
export const getProductDetail = createSelector(
  getState,
  fromList.productDetail
);
export const getproductDetailMandatory = createSelector(
  getState,
  fromList.productDetailMandatory
);
export const getProductLoading = createSelector(
  getState,
  fromList.productLoading
);
export const getProductLoaded = createSelector(
  getState,
  fromList.productLoaded
);
export const getProductFailed = createSelector(
  getState,
  fromList.productFailed
);

export const getAvailableOptionsArray = createSelector(
  getState,
  fromList.getAvailableOptionsArray
);

export const bannerList = createSelector(
  getState,
  fromList.getBannerList
);
export const bannerLoadingStatus = createSelector(
  getState,
  fromList.getListLoading
);
export const bannerLoadedStatus = createSelector(
  getState,
  fromList.getListLoaded
);
export const bannerFailedStatus = createSelector(
  getState,
  fromList.getListFailed
);

export const bannerCount = createSelector(
  getState,
  fromList.getBannerCount
);
export const countLoadingStatus = createSelector(
  getState,
  fromList.getCountLoading
);
export const countLoadedStatus = createSelector(
  getState,
  fromList.getCountLoaded
);
export const countFailedStatus = createSelector(
  getState,
  fromList.getCountFailed
);

export const featuredList = createSelector(
  getState,
  fromList.getFeaturedList
);
export const featuredListLoadingStatus = createSelector(
  getState,
  fromList.getFeaturedListLoading
);
export const featuredListLoadedStatus = createSelector(
  getState,
  fromList.getFeaturedLisLoaded
);
export const featuredListFailedStatus = createSelector(
  getState,
  fromList.getFeaturedLisFailed
);

export const relatedProductLoadingStatus = createSelector(
  getState,
  fromList.getRelatedProductLoading
);
export const relatedProductLoadedStatus = createSelector(
  getState,
  fromList.getRelatedProductLoaded
);
export const relatedProductFailedStatus = createSelector(
  getState,
  fromList.getRelatedProductFailed
);

export const getPageList = createSelector(
  getState,
  fromList.getPageList
);
export const pageListLoadingStatus = createSelector(
  getState,
  fromList.getPageListLoading
);
export const pageListLoadedStatus = createSelector(
  getState,
  fromList.getPageListLoaded
);
export const pageListFailedStatus = createSelector(
  getState,
  fromList.getPageListFailed
);
export const settingDetail = createSelector(
  getState,
  fromList.getSettingDetail
);
export const symbolSetting = createSelector(
  getState,
  fromList.getSymbolSetting
);

export const contactUsLoadingStatus = createSelector(
  getState,
  fromList.getContactUsLoading
);
export const contactUsLoadedStatus = createSelector(
  getState,
  fromList.getContactUsLoaded
);
export const contactUsFailedStatus = createSelector(
  getState,
  fromList.getContactUsFailed
);
export const getContactDetail = createSelector(
  getState,
  fromList.getContactDetail
);

export const pageDetailLoadingStatus = createSelector(
  getState,
  fromList.getPageDetailLoading
);
export const pageDetailLoadedStatus = createSelector(
  getState,
  fromList.getPageDetailLoaded
);
export const pageDetailFailedStatus = createSelector(
  getState,
  fromList.getPageDetailFailed
);
export const pageDetail = createSelector(
  getState,
  fromList.getPageDetail
);

export const manufacturerLoadingStatus = createSelector(
  getState,
  fromList.getManufacturerLoading
);
export const manufacturerLoadedStatus = createSelector(
  getState,
  fromList.getManufacturerLoaded
);
export const manufacturerFailedStatus = createSelector(
  getState,
  fromList.getManufacturerFailed
);

export const productDetailLoadingStatus = createSelector(
  getState,
  fromList.getProductDetailLoading
);
export const productDetailLoadedStatus = createSelector(
  getState,
  fromList.getProductDetailLoaded
);
export const productDetailFailedStatus = createSelector(
  getState,
  fromList.getProductDetailFailed
);

export const countryList = createSelector(
  getState,
  fromList.getCountryList
);
export const countryLoading = createSelector(
  getState,
  fromList.getCountryLoading
);
export const countryLoaded = createSelector(
  getState,
  fromList.getCountryLoaded
);
export const countryFailed = createSelector(
  getState,
  fromList.getCountryFailed
);

export const zoneList = createSelector(
  getState,
  fromList.getZoneList
);
export const zoneLoading = createSelector(
  getState,
  fromList.getZoneLoading
);
export const zoneLoaded = createSelector(
  getState,
  fromList.getZoneLoaded
);
export const zoneFailed = createSelector(
  getState,
  fromList.getZoneFailed
);

export const productRating = createSelector(
  getState,
  fromList.getProductRating
);
export const productRatingLoading = createSelector(
  getState,
  fromList.getProductRatingLoading
);
export const productRatingLoaded = createSelector(
  getState,
  fromList.getProductRatingLoaded
);
export const productRatingFailed = createSelector(
  getState,
  fromList.getProductRatingFailed
);

export const todayDealList = createSelector(
  getState,
  fromList.getTodayDealList
);
export const todayDealLoading = createSelector(
  getState,
  fromList.getTodayDealLoading
);
export const todayDealLoaded = createSelector(
  getState,
  fromList.getTodayDealLoaded
);
export const todayDealFailed = createSelector(
  getState,
  fromList.getTodayDealFailed
);

export const subCategoryList = createSelector(
  getState,
  fromList.subCategoryList
);
export const subCategoryLoading = createSelector(
  getState,
  fromList.subCategoryLoading
);
export const subCategoryLoaded = createSelector(
  getState,
  fromList.subCategoryLoaded
);
export const subCategoryFailed = createSelector(
  getState,
  fromList.subCategoryFailed
);

export const subCategoryID = createSelector(
  getState,
  fromList.selectedCategoryId
);
export const priceLoading = createSelector(
  getState,
  fromList.getPriceLoading
);

export const vendorDetail = createSelector(
  getState,
  fromList.getVendorDetail
);
export const vendorDetailLoading = createSelector(
  getState,
  fromList.getVendorDetailLoading
);
export const vendorDetailLoaded = createSelector(
  getState,
  fromList.getVendorDetailLoaded
);
export const vendorDetailFailed = createSelector(
  getState,
  fromList.getVendorDetailFailed
);
export const vendorsignupLoading = createSelector(
  getState,
  fromList.vendorsignupLoading
);
export const vendorsignupLoaded = createSelector(
  getState,
  fromList.vendorsignupLoaded
);
export const vendorsignupFailed = createSelector(
  getState,
  fromList.vendorsignupFailed
);

export const trackOrderLoading = createSelector(
  getState,
  fromList.trackOrderLoading
);
export const trackOrderLoaded = createSelector(
  getState,
  fromList.trackOrderLoaded
);
export const trackOrderFailed = createSelector(
  getState,
  fromList.trackOrderFailed
);
export const trackOrderDetail = createSelector(
  getState,
  fromList.trackOrderDetail
);
export const enquiryLoading = createSelector(getState, fromList.getEnquiryLoading);
export const enquiryLoaded = createSelector(getState, fromList.getEnquiryLoaded);
export const enquiryFailed = createSelector(getState, fromList.getEnquiryFailed);
export const enquirySuccess = createSelector(getState, fromList.getEnquirySuccess);

export const serviceListLoading = createSelector(getState, fromList.getServiceListLoading);
export const serviceListLoaded = createSelector(getState, fromList.getServiceListLoaded);
export const serviceListFailed = createSelector(getState, fromList.getServiceListFailed);
export const serviceList = createSelector(getState, fromList.getServiceList);
export const serviceCategory = createSelector(getState, fromList.getServiceCategory);

export const questionList = createSelector(getState, fromList.questionList);
export const questionListLoading = createSelector(getState, fromList.questionListLoading);
export const questionListLoaded = createSelector(getState, fromList.questionListLoaded);
export const questionListFailed = createSelector(getState, fromList.questionListFailed);

export const postQuestion = createSelector(getState, fromList.postQuestion);
export const postQuestionLoading = createSelector(getState, fromList.postQuestionLoading);
export const postQuestionLoaded = createSelector(getState, fromList.postQuestionLoaded);
export const postQuestionFailed = createSelector(getState, fromList.postQuestionFailed);

export const answerList = createSelector(getState, fromList.answerList);
export const answerListLoading = createSelector(getState, fromList.answerListLoading);
export const answerListLoaded = createSelector(getState, fromList.answerListLoaded);
export const answerListFailed = createSelector(getState, fromList.answerListFailed);

export const postAnswer = createSelector(getState, fromList.postAnswer);
export const postAnswerLoading = createSelector(getState, fromList.postAnswerLoading);
export const postAnswerLoaded = createSelector(getState, fromList.postAnswerLoaded);
export const postAnswerFailed = createSelector(getState, fromList.postAnswerFailed);

export const abuseReasonList = createSelector(getState, fromList.abuseReasonList);
export const abuseReasonListLoading = createSelector(getState, fromList.abuseReasonListLoading);
export const abuseReasonListLoaded = createSelector(getState, fromList.abuseReasonListLoaded);
export const abuseReasonListFailed = createSelector(getState, fromList.abuseReasonListFailed);

export const reportAbuse = createSelector(getState, fromList.reportAbuse);
export const reportAbuseLoading = createSelector(getState, fromList.reportAbuseLoading);
export const reportAbuseLoaded = createSelector(getState, fromList.reportAbuseLoaded);
export const reportAbuseFailed = createSelector(getState, fromList.reportAbuseFailed);

export const vendorProductList = createSelector(getState, fromList.vendorProductList);
export const vendorProductListLoading = createSelector(getState, fromList.vendorProductListLoading);
export const vendorProductListLoaded = createSelector(getState, fromList.vendorProductListLoaded);
export const vendorProductListFailed = createSelector(getState, fromList.vendorProductListFailed);


export const vendorReviewList = createSelector(getState, fromList.vendorReviewList);
export const vendorReviewListLoading = createSelector(getState, fromList.vendorReviewListLoading);
export const vendorReviewListLoaded = createSelector(getState, fromList.vendorReviewListLoaded);
export const vendorReviewListFailed = createSelector(getState, fromList.vendorReviewListFailed);
export const vendorReviewListCount = createSelector(getState, fromList.vendorReviewListCount);


export const widgetProductList = createSelector(getState, fromList.widgetProductList);
export const widgetProductListLoading = createSelector(getState, fromList.widgetProductListLoading);
export const widgetProductListLoaded = createSelector(getState, fromList.widgetProductListLoaded);

export const filterList = createSelector(
  getState,
  fromList.filterList
);
export const filterLoading = createSelector(
  getState,
  fromList.filterLoading
);
export const filterLoaded = createSelector(
  getState,
  fromList.filterLoaded
);
export const filterFailed = createSelector(
  getState,
  fromList.filterFailed
);
export const vendorProductListCountLoaded = createSelector(getState, fromList.vendorProductListCountLoaded);
export const vendorProductListCount = createSelector(getState, fromList.vendorProductListCount);
