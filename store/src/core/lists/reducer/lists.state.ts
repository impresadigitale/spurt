/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';
import { BannerListResponseModel } from '../models/banner-list-response.model';
import { FeaturedProductResponseModel } from '../models/featured-product-response.model';
import { ProductsResponseModel } from '../models/products-response.model';
import { CategoryResponseModel } from '../models/category-response.model';
import { ManufacturerResponseModel } from '../models/manufacturer-response.model';
import { ProductDetailResponseModel } from '../models/product-detail-response.model';
import { PagelistResponseModel } from '../models/pagelist-response.model';
import { SettingResponseModel } from '../models/setting-response.model';
import { CountryResponseModel } from '../models/country-response.model';
import { TodayDealsResponseModel } from '../models/today-deals-response.model';
import { ProductDetailMandatoryResponseModel } from '../models/product-detail-mandatory-response.model';
import { ProductRatingResponseModel } from '../models/product-rating-response.model';

export interface ListsState extends Map<string, any> {
  products: Array<ProductsResponseModel>;
  categoryLevel: any;
  maxProductPrice: any;
  productCount: number;
  activeCategoryID: string;
  category: Array<CategoryResponseModel>;
  relatedProducts: any;
  manufacturer: Array<ManufacturerResponseModel>;
  productDetail: ProductDetailResponseModel;
  productDetailMandatory: ProductDetailMandatoryResponseModel;
  productLoading: boolean;
  productLoaded: boolean;
  productFailed: boolean;

  bannerList: Array<BannerListResponseModel>;
  bannerLoading: boolean;
  bannerLoaded: boolean;
  bannerFailed: boolean;

  productRating: Array<ProductRatingResponseModel>;
  productRatingLoading: boolean;
  productRatingLoaded: boolean;
  productRatingFailed: boolean;

  availableOptionsArray: any;

  bannerCount: any;
  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;

  featuredList: Array<FeaturedProductResponseModel>;
  featuredListLoading: boolean;
  featuredListLoaded: boolean;
  featuredListFailed: boolean;

  relatedProductLoading: boolean;
  relatedProductLoaded: boolean;
  relatedProductFailed: boolean;

  pageList: Array<PagelistResponseModel>;
  pageListLoading: boolean;
  pageListLoaded: boolean;
  pageListFailed: boolean;
  settingDetail: SettingResponseModel;
  symbolSetting: any;

  contactUsLoading: boolean;
  contactusLoaded: boolean;
  contactusFailed: boolean;
  contactDetail: any;

  pageDetailLoading: boolean;
  pageDetailLoaded: boolean;
  pageDetailFailed: boolean;
  pageDetail: any;

  manufacturerLoading: boolean;
  manufacturerLoaded: boolean;
  manufacturerFailed: boolean;

  productDetailLoading: boolean;
  productDetailLoaded: boolean;
  productDetailFailed: boolean;

  countryList: Array<CountryResponseModel>;
  countryLoading: boolean;
  countryLoaded: boolean;
  countryFailed: boolean;

  zoneList: Array<CountryResponseModel>;
  zoneLoading: boolean;
  zoneLoaded: boolean;
  zoneFailed: boolean;

  todayDeal: Array<TodayDealsResponseModel>;
  todayDealLoading: boolean;
  todayDealLoaded: boolean;
  todayDealFailed: boolean;

  subcategory: any;
  subcategoryLoading: boolean;
  subcategoryLoaded: boolean;
  subcategoryFailed: boolean;

  filter: any;
  filterLoading: boolean;
  filterLoaded: boolean;
  filterFailed: boolean;

  SelectedcategoryId: any;
  priceLoading: boolean;
  serviceCategory: Array<any>;

  serviceListLoading: boolean;
  serviceListLoaded: boolean;
  serviceListFailed: boolean;
  serviceList: Array<any>;

  enquiryLoading: false;
  enquiryLoaded: false;
  enquiryFailed: false;
  enquirySuccess: any;

  vendorDetailLoading: boolean;
  vendorDetailLoaded: boolean;
  vendorDetailFailed: boolean;
  vendorDetail: any;

  vendorsignupLoading: boolean;
  vendorsignupLoaded: boolean;
  vendorsignupFailed: boolean;

  trackOrderLoading: boolean;
  trackOrderLoaded: boolean;
  trackOrderFailed: boolean;
  trackOrderDetail: any;


  questionList: any;
  questionListLoading: boolean;
  questionListLoaded: boolean;
  questionListFailed: boolean;

  postQuestion: any;
  postQuestionLoading: boolean;
  postQuestionLoaded: boolean;
  postQuestionFailed: boolean;

  answerList: any;
  answerListLoading: boolean;
  answerListLoaded: boolean;
  answerListFailed: boolean;

  postAnswer: any;
  postAnswerLoading: boolean;
  postAnswerLoaded: boolean;
  postAnswerFailed: boolean;

  likeOrDislikeAnswer: any;
  likeOrDislikeAnswerLoading: boolean;
  likeOrDislikeAnswerLoaded: boolean;
  likeOrDislikeAnswerFailed: boolean;


  abuseReasonList: any;
  abuseReasonListLoading: boolean;
  abuseReasonListLoaded: boolean;
  abuseReasonListFailed: boolean;

  reportAbuse: any;
  reportAbuseLoading: boolean;
  reportAbuseLoaded: boolean;
  reportAbuseFailed: boolean;

  vendorProductListLoading: boolean;
  vendorProductListLoaded: boolean;
  vendorProductListFailed: boolean;
  vendorProductList: any;

  vendorReviewListLoading: boolean;
  vendorReviewListLoaded: boolean;
  vendorReviewListFailed: boolean;
  vendorReviewList: any;

  vendorReviewListCountLoading: boolean;
  vendorReviewListCountLoaded: boolean;
  vendorReviewListCountFailed: boolean;
  vendorReviewListCount: any;


  widgetProductListLoading: boolean;
  widgetProductListLoaded: boolean;
  widgetProductListFailed: boolean;
  widgetProductList: any;


  vendorProductListCountLoading: boolean;
  vendorProductListCountLoaded: boolean;
  vendorProductListCountFailed: boolean;
  vendorProductListCount: any;

}

export const listsRecord = Record({
  products: [],
  categoryLevel: '',
  maxProductPrice: {},
  productCount: 0,
  category: [],

  relatedProducts: [],
  manufacturer: [],
  productDetail: {},
  productDetailMandatory: {},
  productLoading: false,
  productLoaded: false,
  productFailed: false,

  availableOptionsArray: [],

  bannerList: [],
  bannerLoading: false,
  bannerLoaded: false,
  bannerFailed: false,

  bannerCount: 0,
  countLoading: false,
  countLoaded: false,
  countFailed: false,

  featuredList: [],
  featuredListLoading: false,
  featuredListLoaded: false,
  featuredListFailed: false,

  relatedProductLoading: false,
  relatedProductLoaded: false,
  relatedProductFailed: false,

  pageList: [],
  pageListLoading: false,
  pageListLoaded: false,
  pageListFailed: false,
  settingDetail: [],
  symbolSetting: {},

  contactUsLoading: false,
  contactusLoaded: false,
  contactusFailed: false,
  contactDetail: {},

  pageDetailLoading: false,
  pageDetailLoaded: false,
  pageDetailFailed: false,
  pageDetail: {},

  manufacturerLoading: false,
  manufacturerLoaded: false,
  manufacturerFailed: false,

  productDetailLoading: false,
  productDetailLoaded: false,
  productDetailFailed: false,

  countryList: [],
  countryLoading: false,
  countryLoaded: false,
  countryFailed: false,

  productRating: [],
  productRatingLoading: false,
  productRatingLoaded: false,
  productRatingFailed: false,

  zoneList: [],
  zoneLoading: false,
  zoneLoaded: false,
  zoneFailed: false,

  todayDeal: [],
  todayDealLoading: false,
  todayDealLoaded: false,
  todayDealFailed: false,

  subcategory: {},
  subcategoryLoading: false,
  subcategoryLoaded: false,
  subcategoryFailed: false,
  priceLoading: false,
  SelectedcategoryId: '',

  filter: {},
  filterLoading: false,
  filterLoaded: false,
  filterFailed: false,

  serviceCategory: [],
  serviceListLoading: false,
  serviceListLoaded: false,
  serviceListFailed: false,
  serviceList: [],

  enquiryLoading: false,
  enquiryLoaded: false,
  enquiryFailed: false,
  enquirySuccess: {},
  activeCategoryID: '',

  vendorDetailLoading: false,
  vendorDetailLoaded: false,
  vendorDetailFailed: false,
  vendorDetail: {},

  trackOrderLoading: false,
  trackOrderLoaded: false,
  trackOrderFailed: false,
  trackOrderDetail: [],

  questionList: [],
  questionListLoading: false,
  questionListLoaded: false,
  questionListFailed: false,

  postQuestion: {},
  postQuestionLoading: false,
  postQuestionLoaded: false,
  postQuestionFailed: false,

  answerList: [],
  answerListLoading: false,
  answerListLoaded: false,
  answerListFailed: false,

  postAnswer: {},
  postAnswerLoading: false,
  postAnswerLoaded: false,
  postAnswerFailed: false,


  likeOrDislikeAnswer: {},
  likeOrDislikeAnswerLoading: false,
  likeOrDislikeAnswerLoaded: false,
  likeOrDislikeAnswerFailed: false,

  abuseReasonList: [],
  abuseReasonListLoading: false,
  abuseReasonListLoaded: false,
  abuseReasonListFailed: false,


  reportAbuse: {},
  reportAbuseLoading: false,
  reportAbuseLoaded: false,
  reportAbuseFailed: false,

  vendorProductListLoading: false,
  vendorProductListLoaded: false,
  vendorProductListFailed: false,
  vendorProductList: [],

  vendorReviewListLoading: false,
  vendorReviewListLoaded: false,
  vendorReviewListFailed: false,
  vendorReviewList: [],

  vendorReviewListCountLoading: false,
  vendorReviewListCountLoaded: false,
  vendorReviewListCountFailed: false,
  vendorReviewListCount: '',

  widgetProductListLoading: false,
  widgetProductListLoaded: false,
  widgetProductListFailed: false,
  widgetProductList: [],

  vendorProductListCountLoading: false,
  vendorProductListCountLoaded: false,
  vendorProductListCountFailed: false,
  vendorProductListCount: '',
});
