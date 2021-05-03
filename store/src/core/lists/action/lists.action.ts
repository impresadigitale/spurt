/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { BannerListModel } from '../models/banner-list.model';
import { FeaturedProductModel } from '../models/featured-product.model';
import { ContactUsRequestModel } from '../models/contact-us-request.model';
import { TodaydealModel } from '../models/todaydeal.model';

export const ActionTypes = {

  GET_PRODUCT_LIST: type('[product] get product list'),
  PRODUCT_LIST_SUCCESS: type('[product] get product list success'),
  PRODUCT_LIST_FAIL: type('[product] get product list fail'),

  GET_ACTIVE_CATEGORY: type('[active_category] get active_category list'),
  GET_ACTIVE_CATEGORY_SUCCESS: type(
    '[active_category] get active_category list success'
  ),
  GET_ACTIVE_CATEGORY_FAIL: type(
    '[active_category] get active_category list fail'
  ),

  GET_PRODUCT_RATING: type('[product_rating] get product rating'),
  PRODUCT_RATING_SUCCESS: type('[product_rating] get product rating success'),
  PRODUCT_RATING_FAIL: type('[product_rating] get product rating fail'),

  GET_AVAILABLE_VALUE: type('[available_data] get availabe  options'),
  GET_VIEW_ALL: type('[view] get view all'),

  GET_ZONE_LIST: type('[zone_list] zone list'),
  GET_ZONE_LIST_SUCCESS: type('[zone_list] zone list success'),
  GET_ZONE_LIST_FAIL: type('[zone_list] zone list fail'),

  GET_COUNTRY_LIST: type('[country_list] country list'),
  GET_COUNTRY_LIST_SUCCESS: type('[country_list] country list success'),
  GET_COUNTRY_LIST_FAIL: type('[country_list] country list fail'),

  GET_PRODUCT_COUNT: type('[product_count] get product count'),
  PRODUCT_COUNT_SUCCESS: type('[product_count] get product count success'),
  PRODUCT_COUNT_FAIL: type('[product_count] get product count fail'),

  GET_CATEGORY_LIST: type('[category] get category list'),
  CATEGORY_LIST_SUCCESS: type('[category] get category list success'),
  CATEGORY_LIST_FAIL: type('[category] get category list fail'),

  GET_RELATED_PRODUCT_LIST: type('[RELATED_product] get RELATED_product list'),
  RELATED_PRODUCT_LIST_SUCCESS: type(
    '[RELATED_product] get RELATED_product list success'
  ),
  RELATED_PRODUCT_LIST_FAIL: type(
    '[RELATED_product] get RELATED_product list fail'
  ),

  GET_MANUFACTURER_LIST: type('[manufacturer] get manufacturer list'),
  MANUFACTURER_LIST_SUCCESS: type(
    '[manufacturer] get manufacturer list success'
  ),
  MANUFACTURER_LIST_FAIL: type('[manufacturer] get manufacturer list fail'),

  GET_PRODUCT_DETAIL: type('[product detail] get product detail'),
  PRODUCT_DETAIL_SUCCESS: type('[product detail] get product detail success'),
  UPDATE_PRODUCT_DETAIL_SUCCESS: type('[product detail] update product detail success'),
  PRODUCT_DETAIL_FAIL: type('[product detail] get product detail fail'),

  GET_PRODUCT_DETAIL_MANDATORY: type(
    '[product detail mandatory] get product detail mandatory'
  ),
  PRODUCT_DETAIL_MANDATORY_SUCCESS: type(
    '[product detail mandatory] get product detail mandatory success'
  ),
  PRODUCT_DETAIL_MANDATORY_FAIL: type(
    '[product detail mandatory] get product detail mandatory fail'
  ),

  GET_BANNER_LIST: type('[banner] get banner list'),
  GET_BANNER_LIST_SUCCESS: type('[banner] get banner list success'),
  GET_BANNER_LIST_FAIL: type('[banner] get banner list fail'),

  GET_BANNER_LIST_COUNT: type('[banner_count] get banner list count'),
  GET_BANNER_LIST_COUNT_SUCCESS: type(
    '[banner_count] get banner list count success'
  ),
  GET_BANNER_LIST_COUNT_FAIL: type('[banner_count] get banner list count fail'),

  GET_FEATURED_PRODUCT_LIST: type(
    '[featured_product] get featured product list '
  ),
  GET_FEATURED_PRODUCT_LIST_SUCCESS: type(
    '[featured_product] get featured product list success'
  ),
  GET_FEATURED_PRODUCT_LIST_FAIL: type(
    '[featured_product] get featured product list fail'
  ),

  GET_PAGE_LIST: type('[page_list] get page list '),
  GET_PAGE_LIST_SUCCESS: type('[page_list] get page list success'),
  GET_PAGE_LIST_FAIL: type('[page_list] get page list fail'),

  GET_SETTINGS_ACTION: type('[setting] get settings '),
  GET_SETTINGS_SUCCESS_ACTION: type('[setting] get settings succeess'),
  GET_SETTINGS_FAIL_ACTION: type('[setting] get settings fail'),

  DO_CONTACT_US_ACTION: type('[contact_us] contact us '),
  DO_CONTACT_US_SUCCESS_ACTION: type('[contact_us] contact us succeess'),
  DO_CONTACT_US_FAIL_ACTION: type('[contact_us] contact us fail'),

  GET_PAGE_DETAIL: type('[page_detail] page detail '),
  GET_PAGE_DETAIL_SUCCESS: type('[page_detail] page detail succeess'),
  GET_PAGE_DETAIL_FAIL: type('[page_detail] page detail fail'),

  GET_TODAY_DEALS: type('[top_deals] top deals'),
  GET_TODAY_DEALS_SUCCESS: type('[top_deals] top deals success'),
  GET_TODAY_DEALS_FAIL: type('[top_deals]top deals fail'),

  GET_SubCATEGORY_LIST: type('[SUB_CATEGORY] SUB CATEGORY'),
  GET_SubCATEGORY_LIST_SUCCESS: type('[SUB_CATEGORY] SUB CATEGORY SUCCESS'),
  GET_SubCATEGORY_LIST_FAIL: type('[SUB_CATEGORY] SUB CATEGORY FAIL'),

  GET_FILTER_LIST: type('[SUB_CATEGORY] Filter List'),
  GET_FILTER_LIST_SUCCESS: type('[SUB_CATEGORY] Filter List SUCCESS'),
  GET_FILTER_LIST_FAIL: type('[SUB_CATEGORY] Filter List FAIL'),

  GET_SERVICE_CATEGORY: type('[service category] category list'),
  GET_SERVICE_CATEGORY_SUCCESS: type(
    '[service category] category list success'
  ),
  GET_SERVICE_CATEGORY_FAIL: type('[service category] category list fail'),

  GET_SERVICE_LIST: type('[service list]  list'),
  GET_SERVICE_LIST_SUCCESS: type('[service list]  list success'),
  GET_SERVICE_LIST_FAIL: type('[service list]  list fail'),

  CREATE_ENQUIRY: type('[service enquiry] create'),
  CREATE_ENQUIRY_SUCCESS: type('[service enquiry] success'),
  CREATE_ENQUIRY_FAIL: type('[service enquiry] fail'),
  REMOVE_ACTIVE_CATEGORYID: type('[remove active category]'),

  GET_VENDOR_DETAILS: type('[service list]  vendor detail'),
  GET_VENDOR_DETAILS_SUCCESS: type('[service list]  vendor detail success'),
  GET_VENDOR_DETAILS_FAIL: type('[service list]  vendor detail fail'),

  DO_VENDORSIGNUP_ACTION: type('[signup] vendor signup  '),
  DO_VENDORSIGNUP_SUCCESS_ACTION: type('[signup] vendor signup succeess'),
  DO_VENDORSIGNUP_FAIL_ACTION: type('[signup] vendor signup fail'),

  DO_TRACK_ORDER: type('[track_order] track order '),
  DO_TRACK_ORDER_SUCCESS: type('[track_order] track order succeess'),
  DO_TRACK_ORDER_FAIL: type('[track_order] track order fail'),

  GET_QUESTION_LIST: type('[question_list] question list'),
  GET_QUESTION_LIST_SUCCESS: type('[question_list] question list success'),
  GET_QUESTION_LIST_FAIL: type('[question_list] question list fail'),

  POST_QUESTION: type('[question_post] question post'),
  POST_QUESTION_SUCCESS: type('[question_post] question post success'),
  POST_QUESTION_FAIL: type('[question_post] question post fail'),

  LIKE_OR_DISLIKE_ANSWER: type('[like_or_dislike_answer] like or dislike answer'),
  LIKE_OR_DISLIKE_ANSWER_SUCCESS: type('[like_or_dislike_answer] like or dislike answer success'),
  LIKE_OR_DISLIKE_ANSWER_FAIL: type('[like_or_dislike_answer] like or dislike answer fail'),

  GET_ANSWER_LIST: type('[answer_list] answer list'),
  GET_ANSWER_LIST_SUCCESS: type('[answer_list] answer list success'),
  GET_ANSWER_LIST_FAIL: type('[answer_list] answer list fail'),

  POST_ANSWER: type('[answer_post] answer post'),
  POST_ANSWER_SUCCESS: type('[answer_post] answer post success'),
  POST_ANSWER_FAIL: type('[answer_post] answer post fail'),

  REPORT_ABUSE: type('[answer_post] Report Abuse'),
  REPORT_ABUSE_SUCCESS: type('[answer_post] Report Abuse success'),
  REPORT_ABUSE_FAIL: type('[answer_post] Report Abuse fail'),

  ABUSE_REASON_LIST: type('[answer_post] Abuse Reason List'),
  ABUSE_REASON_LIST_SUCCESS: type('[answer_post] Abuse Reason List success'),
  ABUSE_REASON_LIST_FAIL: type('[answer_post] Abuse Reason List fail'),

  VENDOR_PRODUCT_LIST: type('[vendor-product] Vendor Product List'),
  VENDOR_PRODUCT_LIST_SUCCESS: type('[vendor-product] Vendor Product List success'),
  VENDOR_PRODUCT_LIST_FAIL: type('[vendor-product] Vendor Product List fail'),

  CHANGE_COUNT: type('[vendor-product] Change Count'),

  VENDOR_REVIEW_LIST: type('[vendor-review] Vendor Review List'),
  VENDOR_REVIEW_LIST_SUCCESS: type('[vendor-review] Vendor Review List success'),
  VENDOR_REVIEW_LIST_FAIL: type('[vendor-review] Vendor Review List fail'),

  VENDOR_REVIEW_LIST_COUNT: type('[vendor-review] Vendor Review List Count'),
  VENDOR_REVIEW_LIST_COUNT_SUCCESS: type('[vendor-review] Vendor Review List Count success'),
  VENDOR_REVIEW_LIST_COUNT_FAIL: type('[vendor-review] Vendor Review List Count fail'),

  WIDGET_PRODUCT_LIST: type('[widget-product] Widget Product List'),
  WIDGET_PRODUCT_LIST_SUCCESS: type('[widget-product] Widget Product List success'),
  WIDGET_PRODUCT_LIST_FAIL: type('[widget-product] Widget Product List fail'),

  VENDOR_PRODUCT_LIST_COUNT: type('[vendor-product] Vendor Product List Count'),
  VENDOR_PRODUCT_LIST_COUNT_SUCCESS: type('[vendor-product] Vendor Product List Count success'),
  VENDOR_PRODUCT_LIST_COUNT_FAIL: type('[vendor-product] Vendor Product List Count fail'),

 CLEAR_FILTER: type('[Clear-Filter] Clear Filter'),

};


/* get product action*/

export class GetProductList implements Action {
  type = ActionTypes.GET_PRODUCT_LIST;

  constructor(public payload: any) {}
}

export class GetProductListSuccess implements Action {
  type = ActionTypes.PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductListFail implements Action {
  type = ActionTypes.PRODUCT_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get Sub category action*/

export class GetActiveCategory implements Action {
  type = ActionTypes.GET_ACTIVE_CATEGORY;

  constructor(public payload: any) {}
}

export class GetActiveCategorySuccess implements Action {
  type = ActionTypes.GET_ACTIVE_CATEGORY_SUCCESS;

  constructor(public payload: any) {}
}

export class GetActiveCategoryFail implements Action {
  type = ActionTypes.GET_ACTIVE_CATEGORY_FAIL;

  constructor(public payload: any) {}
}
export class RemoveActiveCategoryId implements Action {
  type = ActionTypes.REMOVE_ACTIVE_CATEGORYID;
  constructor(public payload = null) {}
}
/* get product action*/

export class GetProductRating implements Action {
  type = ActionTypes.GET_PRODUCT_RATING;

  constructor(public payload: any) {}
}

export class GetProductRatingSuccess implements Action {
  type = ActionTypes.PRODUCT_RATING_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductRatingFail implements Action {
  type = ActionTypes.PRODUCT_RATING_FAIL;

  constructor(public payload: any) {}
}

export class GetProductCount implements Action {
  type = ActionTypes.GET_PRODUCT_COUNT;

  constructor(public payload: any) {}
}

export class GetProductCountSuccess implements Action {
  type = ActionTypes.PRODUCT_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductCountFail implements Action {
  type = ActionTypes.PRODUCT_COUNT_FAIL;

  constructor(public payload: any) {}
}

/* get product detail action*/

export class GetProductDetail implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL;

  constructor(public payload: any) {}
}

export class GetProductDetailSuccess implements Action {
  type = ActionTypes.PRODUCT_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateProductDetailSuccess implements Action {
  type = ActionTypes.UPDATE_PRODUCT_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductDetailFail implements Action {
  type = ActionTypes.PRODUCT_DETAIL_FAIL;

  constructor(public payload: any) {}
}

/* get product detail mandatory option action*/

export class GetProductDetailMandatory implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL_MANDATORY;

  constructor(public payload: any) {}
}

export class GetProductDetailMandatorySuccess implements Action {
  type = ActionTypes.PRODUCT_DETAIL_MANDATORY_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductDetailMandatoryFail implements Action {
  type = ActionTypes.PRODUCT_DETAIL_MANDATORY_FAIL;

  constructor(public payload: any) {}
}

/* get category action*/

export class GetCategoryList implements Action {
  type = ActionTypes.GET_CATEGORY_LIST;

  constructor(public payload: any) {}
}

export class GetCategoryListSuccess implements Action {
  type = ActionTypes.CATEGORY_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetCategoryListFail implements Action {
  type = ActionTypes.CATEGORY_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get related product action*/

export class GetRelatedProductList implements Action {
  type = ActionTypes.GET_RELATED_PRODUCT_LIST;

  constructor(public payload: any) {}
}

export class RelatedProductListSuccess implements Action {
  type = ActionTypes.RELATED_PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class RelatedProductListFail implements Action {
  type = ActionTypes.RELATED_PRODUCT_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get brand action*/

export class GetManufacturerList implements Action {
  type = ActionTypes.GET_MANUFACTURER_LIST;

  constructor(public payload: any) {}
}

export class ManufacturerListSuccess implements Action {
  type = ActionTypes.MANUFACTURER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class ManufacturerListtFail implements Action {
  type = ActionTypes.MANUFACTURER_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get banner action*/

export class GetBannerList implements Action {
  type = ActionTypes.GET_BANNER_LIST;

  constructor(public payload: BannerListModel) {}
}

export class GetBannerListSuccess implements Action {
  type = ActionTypes.GET_BANNER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetBannaerListFail implements Action {
  type = ActionTypes.GET_BANNER_LIST_FAIL;

  constructor(public payload: any) {}
}

export class GetBannerListCount implements Action {
  type = ActionTypes.GET_BANNER_LIST_COUNT;

  constructor(public payload: BannerListModel) {}
}

export class GetBannerListCountSuccess implements Action {
  type = ActionTypes.GET_BANNER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetBannaerListCountFail implements Action {
  type = ActionTypes.GET_BANNER_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get featured product action*/

export class GetFeaturedProductList implements Action {
  type = ActionTypes.GET_FEATURED_PRODUCT_LIST;

  constructor(public payload: FeaturedProductModel) {}
}

export class GetFeaturedProductListSuccess implements Action {
  type = ActionTypes.GET_FEATURED_PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetFeaturedProductListFail implements Action {
  type = ActionTypes.GET_FEATURED_PRODUCT_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get page list action*/

export class GetPageList implements Action {
  type = ActionTypes.GET_PAGE_LIST;

  constructor(public payload: FeaturedProductModel) {}
}

export class GetPageListSuccess implements Action {
  type = ActionTypes.GET_PAGE_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPageListFail implements Action {
  type = ActionTypes.GET_PAGE_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get settings action*/

export class GetSettings implements Action {
  type = ActionTypes.GET_SETTINGS_ACTION;

  constructor(public payload = null) {}
}

export class GetSettingsSuccess implements Action {
  type = ActionTypes.GET_SETTINGS_SUCCESS_ACTION;

  constructor(public payload: any) {}
}

export class GetSettingsFail implements Action {
  type = ActionTypes.GET_SETTINGS_FAIL_ACTION;

  constructor(public payload: any) {}
}

/* do contact us action*/

export class DoContactUsAction implements Action {
  type = ActionTypes.DO_CONTACT_US_ACTION;

  constructor(public payload: ContactUsRequestModel) {}
}

export class DoContactUsActionSuccess implements Action {
  type = ActionTypes.DO_CONTACT_US_SUCCESS_ACTION;

  constructor(public payload: any) {}
}

export class DoContactUsActionFail implements Action {
  type = ActionTypes.DO_CONTACT_US_FAIL_ACTION;

  constructor(public payload: any) {}
}

/* get page detail action*/

export class GetPageDetails implements Action {
  type = ActionTypes.GET_PAGE_DETAIL;

  constructor(public payload: ContactUsRequestModel) {}
}

export class GetPageDetailsSuccess implements Action {
  type = ActionTypes.GET_PAGE_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPageDetailsFail implements Action {
  type = ActionTypes.GET_PAGE_DETAIL_FAIL;

  constructor(public payload: any) {}
}

/* available options */
export class GetAvailableValue implements Action {
  type = ActionTypes.GET_AVAILABLE_VALUE;

  constructor(public payload: any) {}
}

/* get country list action*/

export class GetCountryList implements Action {
  type = ActionTypes.GET_COUNTRY_LIST;

  constructor(public payload: any) {}
}

export class GetCountryListSuccess implements Action {
  type = ActionTypes.GET_COUNTRY_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetCountryListFail implements Action {
  type = ActionTypes.GET_COUNTRY_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get Zone list action*/

export class GetZoneList implements Action {
  type = ActionTypes.GET_ZONE_LIST;

  constructor(public payload: any) {}
}

export class GetZoneListSuccess implements Action {
  type = ActionTypes.GET_ZONE_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetZoneListFail implements Action {
  type = ActionTypes.GET_ZONE_LIST_FAIL;

  constructor(public payload: any) {}
}

/* get Top deals list action*/

export class GetTodayDealsList implements Action {
  type = ActionTypes.GET_TODAY_DEALS;

  constructor(public payload: TodaydealModel) {}
}

export class GetTodayDealsListSuccess implements Action {
  type = ActionTypes.GET_TODAY_DEALS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTodayDealsListFail implements Action {
  type = ActionTypes.GET_TODAY_DEALS_FAIL;

  constructor(public payload: any) {}
}

// sub category
export class GetSubCategoryList implements Action {
  type = ActionTypes.GET_SubCATEGORY_LIST;

  constructor(public payload: any) {}
}

export class GetSubCategoryListSuccess implements Action {
  type = ActionTypes.GET_SubCATEGORY_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetSubCategoryListFail implements Action {
  type = ActionTypes.GET_SubCATEGORY_LIST_FAIL;

  constructor(public payload: any) {}
}

// Filter List
export class GetFilterList implements Action {
  type = ActionTypes.GET_FILTER_LIST;

  constructor(public payload: any) {}
}

export class GetFilterListSuccess implements Action {
  type = ActionTypes.GET_FILTER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetFilterListFail implements Action {
  type = ActionTypes.GET_FILTER_LIST_FAIL;

  constructor(public payload: any) {}
}

// service category list
export class GetServiceCategory implements Action {
  type = ActionTypes.GET_SERVICE_CATEGORY;

  constructor(public payload: any) {}
}

export class GetServiceCategorySuccess implements Action {
  type = ActionTypes.GET_SERVICE_CATEGORY_SUCCESS;

  constructor(public payload: any) {}
}

export class GetServiceCategoryFail implements Action {
  type = ActionTypes.GET_SERVICE_CATEGORY_FAIL;

  constructor(public payload: any) {}
}
// service list
export class GetServiceList implements Action {
  type = ActionTypes.GET_SERVICE_LIST;

  constructor(public payload: any) {}
}

export class GetServiceListSuccess implements Action {
  type = ActionTypes.GET_SERVICE_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetServiceListFail implements Action {
  type = ActionTypes.GET_SERVICE_LIST_FAIL;

  constructor(public payload: any) {}
}
// service enquiry
export class CreateEnquiry implements Action {
  type = ActionTypes.CREATE_ENQUIRY;

  constructor(public payload: any) {}
}

export class CreateEnquirySuccess implements Action {
  type = ActionTypes.CREATE_ENQUIRY_SUCCESS;

  constructor(public payload: any) {}
}

export class CreateEnquiryFail implements Action {
  type = ActionTypes.CREATE_ENQUIRY_FAIL;

  constructor(public payload: any) {}
}

// Vendor Details
export class GetVendorDetail implements Action {
  type = ActionTypes.GET_VENDOR_DETAILS;

  constructor(public payload: any) {}
}

export class GetVendorDetailSuccess implements Action {
  type = ActionTypes.GET_VENDOR_DETAILS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetVendorDetailFail implements Action {
  type = ActionTypes.GET_VENDOR_DETAILS_FAIL;

  constructor(public payload: any) {}
}

export class DoVendorSignupAction implements Action {
  type = ActionTypes.DO_VENDORSIGNUP_ACTION;

  constructor(public payload: ContactUsRequestModel) {}
}

export class DoVendorSignupActionSuccess implements Action {
  type = ActionTypes.DO_VENDORSIGNUP_SUCCESS_ACTION;

  constructor(public payload: any) {}
}

export class DoVendorSignupActionFail implements Action {
  type = ActionTypes.DO_VENDORSIGNUP_FAIL_ACTION;

  constructor(public payload: any) {}
}

export class DoTrackOrderAction implements Action {
  type = ActionTypes.DO_TRACK_ORDER;

  constructor(public payload: any) {}
}

export class DoTrackOrderActionSuccess implements Action {
  type = ActionTypes.DO_TRACK_ORDER_SUCCESS;

  constructor(public payload: any) {}
}

export class DoTrackOrderActionFail implements Action {
  type = ActionTypes.DO_TRACK_ORDER_FAIL;

  constructor(public payload: any) {}
}


/* get question list action*/

export class GetQuestionListAction implements Action {
  type = ActionTypes.GET_QUESTION_LIST;
  constructor(public payload: any) {}
}

export class GetQuestionListSuccess implements Action {
  type = ActionTypes.GET_QUESTION_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetQuestionListFail implements Action {
  type = ActionTypes.GET_QUESTION_LIST_FAIL;
  constructor(public payload: any) {}
}


/* post question action*/

export class PostQuestionAction implements Action {
  type = ActionTypes.POST_QUESTION;
  constructor(public payload: any) {}
}

export class PostQuestionSuccess implements Action {
  type = ActionTypes.POST_QUESTION_SUCCESS;
  constructor(public payload: any) {}
}

export class PostQuestionFail implements Action {
  type = ActionTypes.POST_QUESTION_FAIL;
  constructor(public payload: any) {}
}

// like or dislike answer

export class LikeOrDislikeAnswerAction implements Action {
  type = ActionTypes.LIKE_OR_DISLIKE_ANSWER;
  constructor(public payload: any) {}
}

export class LikeOrDislikeAnswerSuccess implements Action {
  type = ActionTypes.LIKE_OR_DISLIKE_ANSWER_SUCCESS;
  constructor(public payload: any) {}
}

export class LikeOrDislikeAnswerFail implements Action {
  type = ActionTypes.LIKE_OR_DISLIKE_ANSWER_FAIL;
  constructor(public payload: any) {}
}

/* get answer list action*/

export class GetAnswerListAction implements Action {
  type = ActionTypes.GET_ANSWER_LIST;
  constructor(public payload: any) {}
}

export class GetAnswerListSuccess implements Action {
  type = ActionTypes.GET_ANSWER_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetAnswerListFail implements Action {
  type = ActionTypes.GET_ANSWER_LIST_FAIL;
  constructor(public payload: any) {}
}


/* post answer action*/

export class PostAnswerAction implements Action {
  type = ActionTypes.POST_ANSWER;
  constructor(public payload: any) {}
}

export class PostAnswerSuccess implements Action {
  type = ActionTypes.POST_ANSWER_SUCCESS;
  constructor(public payload: any) {}
}

export class PostAnswerFail implements Action {
  type = ActionTypes.POST_ANSWER_FAIL;
  constructor(public payload: any) {}
}


/* report abuse action*/

export class ReportAbuseAction implements Action {
  type = ActionTypes.REPORT_ABUSE;
  constructor(public payload: any) {}
}

export class ReportAbuseSuccess implements Action {
  type = ActionTypes.REPORT_ABUSE_SUCCESS;
  constructor(public payload: any) {}
}

export class ReportAbuseFail implements Action {
  type = ActionTypes.REPORT_ABUSE_FAIL;
  constructor(public payload: any) {}
}

/* abuse reason action*/

export class AbuseReasonListAction implements Action {
  type = ActionTypes.ABUSE_REASON_LIST;
  constructor(public payload: any) {}
}

export class AbuseReasonListSuccess implements Action {
  type = ActionTypes.ABUSE_REASON_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class AbuseReasonListFail implements Action {
  type = ActionTypes.ABUSE_REASON_LIST_FAIL;
  constructor(public payload: any) {}
}

/* vendor product list action*/

export class VendorProductListAction implements Action {
  type = ActionTypes.VENDOR_PRODUCT_LIST;
  constructor(public payload: any) {}
}

export class VendorProductListSuccess implements Action {
  type = ActionTypes.VENDOR_PRODUCT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class VendorProductListFail implements Action {
  type = ActionTypes.VENDOR_PRODUCT_LIST_FAIL;
  constructor(public payload: any) {}
}

/* change count in product detail page action*/

export class ChangeCountAction implements Action {
  type = ActionTypes.CHANGE_COUNT;
  constructor(public payload: any) {}
}

/* vendor review list action*/

export class VendorReviewListAction implements Action {
  type = ActionTypes.VENDOR_REVIEW_LIST;
  constructor(public payload: any) {

  }
}

export class VendorReviewListSuccess implements Action {
  type = ActionTypes.VENDOR_REVIEW_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class VendorReviewListFail implements Action {
  type = ActionTypes.VENDOR_REVIEW_LIST_FAIL;
  constructor(public payload: any) {}
}

/* vendor review list count action*/

export class VendorReviewListCountAction implements Action {
  type = ActionTypes.VENDOR_REVIEW_LIST_COUNT;
  constructor(public payload: any) {}
}

export class VendorReviewListCountSuccess implements Action {
  type = ActionTypes.VENDOR_REVIEW_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class VendorReviewListCountFail implements Action {
  type = ActionTypes.VENDOR_REVIEW_LIST_COUNT_FAIL;
  constructor(public payload: any) {}
}


// get widget product list


export class WidgetProductListAction implements Action {
  type = ActionTypes.WIDGET_PRODUCT_LIST;
  constructor(public payload: any) {}
}

export class WidgetProductListSuccess implements Action {
  type = ActionTypes.WIDGET_PRODUCT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class WidgetProductListFail implements Action {
  type = ActionTypes.WIDGET_PRODUCT_LIST_FAIL;
  constructor(public payload: any) {}
}


export class VendorProductListCountAction implements Action {
  type = ActionTypes.VENDOR_PRODUCT_LIST_COUNT;
  constructor(public payload: any) {}
}

export class VendorProductListCountSuccess implements Action {
  type = ActionTypes.VENDOR_PRODUCT_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class VendorProductListCountFail implements Action {
  type = ActionTypes.VENDOR_PRODUCT_LIST_COUNT_FAIL;
  constructor(public payload: any) {}
}

export class ClearFilter implements Action {
  type = ActionTypes.CLEAR_FILTER;
  constructor(public payload: any = null) {}
}


export type Actions =
  | GetProductList
  | GetProductListSuccess
  | GetProductListFail
  | GetProductCount
  | GetProductCountSuccess
  | GetProductCountFail
  | GetCategoryList
  | GetCategoryListSuccess
  | GetCategoryListFail
  | GetAvailableValue
  | GetRelatedProductList
  | RelatedProductListSuccess
  | RelatedProductListFail
  | GetManufacturerList
  | ManufacturerListSuccess
  | ManufacturerListtFail
  | GetProductDetail
  | GetProductDetailSuccess
  | GetProductDetailFail
  | GetBannerList
  | GetBannerListSuccess
  | GetBannaerListFail
  | GetBannerListCount
  | GetBannerListCountSuccess
  | GetBannaerListCountFail
  | GetProductDetailMandatory
  | GetProductDetailMandatorySuccess
  | GetProductDetailMandatoryFail
  | GetFeaturedProductList
  | GetFeaturedProductListSuccess
  | GetFeaturedProductListFail
  | GetPageList
  | GetPageListSuccess
  | GetPageListFail
  | GetProductRating
  | GetProductRatingSuccess
  | GetProductRatingFail
  | DoContactUsAction
  | DoContactUsActionSuccess
  | DoContactUsActionFail
  | GetTodayDealsList
  | GetTodayDealsListSuccess
  | GetTodayDealsListFail
  | GetActiveCategory
  | GetActiveCategorySuccess
  | GetActiveCategoryFail
  | GetZoneList
  | GetZoneListSuccess
  | GetZoneListFail
  | GetSubCategoryList
  | GetSubCategoryListSuccess
  | GetSubCategoryListFail
  | GetServiceCategory
  | GetServiceCategorySuccess
  | GetServiceCategoryFail
  | GetServiceList
  | GetServiceListSuccess
  | GetServiceListFail
  | CreateEnquiry
  | CreateEnquirySuccess
  | CreateEnquiryFail
  | RemoveActiveCategoryId
  | GetVendorDetail
  | GetVendorDetailSuccess
  | GetVendorDetailFail
  | GetQuestionListAction
  | GetQuestionListSuccess
  | GetQuestionListFail
  | PostQuestionAction
  | PostQuestionSuccess
  | PostQuestionFail
  | LikeOrDislikeAnswerAction
  | LikeOrDislikeAnswerSuccess
  | LikeOrDislikeAnswerFail
  | GetAnswerListAction
  | GetAnswerListSuccess
  | GetAnswerListFail
  | PostAnswerAction
  | PostAnswerSuccess
  | PostAnswerFail
  | ReportAbuseAction
  | ReportAbuseSuccess
  | ReportAbuseFail
  | AbuseReasonListAction
  | AbuseReasonListSuccess
  | AbuseReasonListFail
  | VendorProductListAction
  | VendorProductListSuccess
  | VendorProductListFail
  | VendorReviewListAction
  | VendorReviewListSuccess
  | VendorReviewListFail
  | GetFilterList
  | GetFilterListSuccess
  | GetFilterListFail
  | UpdateProductDetailSuccess;

