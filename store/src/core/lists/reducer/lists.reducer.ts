/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/lists.action';
import { ListsState, listsRecord } from './lists.state';
import { BannerListResponseModel } from '../models/banner-list-response.model';
import { PageDetailResponse } from '../models/page-detail-response';
import { RelatedProductListModel } from '../models/related-product-list.model';
import { FeaturedProductResponseModel } from '../models/featured-product-response.model';
import { ProductsResponseModel } from '../models/products-response.model';
import { CategoryResponseModel } from '../models/category-response.model';
import { ManufacturerResponseModel } from '../models/manufacturer-response.model';
import { ProductDetailResponseModel } from '../models/product-detail-response.model';
import { SettingResponseModel } from '../models/setting-response.model';
import { CountryResponseModel } from '../models/country-response.model';
import { ZoneResponseModel } from '../models/zone-response.model';
import { TodayDealsResponseModel } from '../models/today-deals-response.model';
import { SubcategoryResponseModel } from '../models/subcategory.response';
import { ProductDetailMandatoryResponseModel } from '../models/product-detail-mandatory-response.model';
import { ProductRatingResponseModel } from '../models/product-rating-response.model';


export const initialState: ListsState = (new listsRecord() as unknown) as ListsState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ListsState {
  if (!type) {
    return state;
  }
  switch (type) {


// <------------ GET PRODUCT LIST -----------> //

    case actions.ActionTypes.GET_PRODUCT_LIST: {
      if (payload.refresh === false) {
        return Object.assign({}, state, {
          priceLoading: true,
          productLoading: false,
          productLoaded: false,
          productFailed: false
        });
      } else {
        return Object.assign({}, state, {
          productLoading: true,
          productLoaded: false,
          productFailed: false,
          products: []
        });
      }
    }

    case actions.ActionTypes.PRODUCT_LIST_SUCCESS: {
      const tempProduct = payload.data.map(product => {
        const productLists = new ProductsResponseModel(product);
        return productLists;
      });
      for (let i = 0; i < tempProduct.length; i++) {
        if (tempProduct[i].pricerefer) {
        const tempPriceArray = tempProduct[i].pricerefer.split('.');
        let tempPrice = tempPriceArray[0];
        let price = tempProduct[i].price;
        switch (tempProduct[i].taxType) {
          case 1:
            const pricereferWithOutTax = +tempPrice + tempProduct[i].taxValue;
            tempPrice =  Math.round(pricereferWithOutTax);
            const priceWithOutTax = +price + tempProduct[i].taxValue;
            price =  Math.round(priceWithOutTax);
            break;
          case 2:
            const percentReferToAmount = tempPrice * (tempProduct[i].taxValue / 100);
            const pricereferWithTax = +tempPrice + percentReferToAmount;
            tempPrice =  Math.round(pricereferWithTax);
            const percentToAmount = price * (tempProduct[i].taxValue / 100);
            const priceWithTax = +price + percentToAmount;
            price =  Math.round(priceWithTax);
            break;
        }
        let subractPrice = tempPrice - price;
        if (subractPrice < 0) {
          subractPrice = subractPrice / -1;
        }
        const dividePrice = price / 100;
        const sumPrice = subractPrice / dividePrice;
        const sumPriceInString = sumPrice.toString();
        const percentage = sumPriceInString.split('.');
        tempProduct[i].discount = percentage[0];
      }
    }
      return Object.assign({}, state, {
        priceLoading: false,
        productLoading: false,
        productLoaded: true,
        productFailed: false,
        products: tempProduct,
        categoryLevel: payload.categoryLevel
      });
    }
    case actions.ActionTypes.PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        priceLoading: false,
        productLoading: false,
        productLoaded: true,
        productFailed: true
      });
    }


// <------------ GET PRODUCT RATING -----------> //

    case actions.ActionTypes.GET_PRODUCT_RATING: {
      return Object.assign({}, state, {
        productRatingLoading: true,
        productRatingLoaded: false,
        productRatingFailed: false,
        productRating: []
      });
    }

    case actions.ActionTypes.PRODUCT_RATING_SUCCESS: {
      const tempProductRating = payload.data.map(product => {
        const productRatings = new ProductRatingResponseModel(product);
        return productRatings;
      });
      return Object.assign({}, state, {
        productRatingLoading: false,
        productRatingLoaded: true,
        productRatingFailed: false,
        productRating: tempProductRating
      });
    }
    case actions.ActionTypes.PRODUCT_RATING_FAIL: {
      return Object.assign({}, state, {
        productRatingLoading: false,
        productRatingLoaded: true,
        productRatingFailed: true
      });
    }

    /**Active category  make selected category active and expanded
     * **/
    case actions.ActionTypes.GET_ACTIVE_CATEGORY: {
      let tempsubCategoryID: any;
      let childrenArray: any;
      const selectedCategoryID = parseInt(payload, 10);

      if (state.category && payload) {
        for (let i = 0; i < state.category.length; i++) {
          childrenArray = state.category[i].children;
          if (childrenArray[0]) {
            for (let j = 0; j < childrenArray.length; j++) {
              for (let k = 0; k < childrenArray[j].children.length; k++) {
                if (
                  childrenArray[j].children[k].categoryId === selectedCategoryID
                ) {
                  tempsubCategoryID = childrenArray[j].categoryId;
                }
              }
            }
          }
        }
      } else {
        tempsubCategoryID = {};
      }
      return Object.assign({}, state, {
        activeCategoryLoading: true,
        activeCategoryLoaded: false,
        activeCategoryFailed: false,
        activeCategoryID: tempsubCategoryID
      });
    }
    case actions.ActionTypes.REMOVE_ACTIVE_CATEGORYID: {
      return Object.assign({}, state, {
        activeCategoryID: ''
      });
    }
    case actions.ActionTypes.GET_PRODUCT_COUNT: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        productCount: payload.data.productCount,
        maxProductPrice: payload.data.maximumProductPrice
      });
    }
    case actions.ActionTypes.PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {});
    }


// <------------ GET CATEGORY LIST-----------> //

    case actions.ActionTypes.GET_CATEGORY_LIST: {
      return Object.assign({}, state, {
        categoryLoading: true,
        categoryLoaded: false,
        categoryFailed: false
      });
    }

    case actions.ActionTypes.CATEGORY_LIST_SUCCESS: {
      const tempCategory = payload.data.map(category => {
        const categoryLists = new CategoryResponseModel(category);
        return categoryLists;
      });

      return Object.assign({}, state, {
        category: tempCategory,
        categoryLoading: false,
        categoryLoaded: true,
        categoryFailed: false,
        subcategory: []
      });
    }
    case actions.ActionTypes.CATEGORY_LIST_FAIL: {
      return Object.assign({}, state, {
        categoryLoading: false,
        categoryLoaded: true,
        categoryFailed: true
      });
    }


// <------------ GET RELATED PRODUCT LIST -----------> //

    case actions.ActionTypes.GET_RELATED_PRODUCT_LIST: {
      return Object.assign({}, state, {
        relatedProductLoading: true,
        relatedProductLoaded: false,
        relatedProductFailed: false,
        relatedProducts: []
      });
    }

    case actions.ActionTypes.RELATED_PRODUCT_LIST_SUCCESS: {
      const tempProduct = payload.data.map(product => {
        const tempList = new RelatedProductListModel(product);
        return tempList;
      });
      for (let i = 0; i < tempProduct.length; i++) {
        if (tempProduct[i].pricerefer) {
          const tempPriceArray = tempProduct[i].pricerefer.split('.');
          let tempPrice = tempPriceArray[0];
          let price = tempProduct[i].price;
          switch (tempProduct[i].taxType) {
            case 1:
              const pricereferWithOutTax = +tempPrice + tempProduct[i].taxValue;
              tempPrice =  Math.round(pricereferWithOutTax);
              const priceWithOutTax = +price + tempProduct[i].taxValue;
              price =  Math.round(priceWithOutTax);
              break;
            case 2:
              const percentReferToAmount = tempPrice * (tempProduct[i].taxValue / 100);
              const pricereferWithTax = +tempPrice + percentReferToAmount;
              tempPrice =  Math.round(pricereferWithTax);
              const percentToAmount = price * (tempProduct[i].taxValue / 100);
              const priceWithTax = +price + percentToAmount;
              price =  Math.round(priceWithTax);
              break;
          }
          let subractPrice = tempPrice - price;
          if (subractPrice < 0) {
            subractPrice = subractPrice / -1;
          }
          const dividePrice = price / 100;
          const sumPrice = subractPrice / dividePrice;
          const sumPriceInString = sumPrice.toString();
          const percentage = sumPriceInString.split('.');
          tempProduct[i].discount = percentage[0];
        }
      }
      return Object.assign({}, state, {
        relatedProducts: tempProduct,
        relatedProductLoading: false,
        relatedProductLoaded: true,
        relatedProductFailed: false
      });
    }

    case actions.ActionTypes.RELATED_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        relatedProductLoading: false,
        relatedProductLoaded: true,
        relatedProductFailed: true
      });
    }

// <------------ GET MANUFACTURER(BRAND) LIST -----------> //

    case actions.ActionTypes.GET_MANUFACTURER_LIST: {
      return Object.assign({}, state, {
        manufacturerLoading: true,
        manufacturerLoaded: false,
        manufacturerFailed: false
      });
    }

    case actions.ActionTypes.MANUFACTURER_LIST_SUCCESS: {
      let tempBrand = payload.data.map(brand => {
        const tempList = new ManufacturerResponseModel(brand);
        return tempList;
      });
     tempBrand =  tempBrand.sort(function(a, b) {
      return a.name.localeCompare(b.name);
   });

      return Object.assign({}, state, {
        manufacturer: tempBrand,
        manufacturerLoading: false,
        manufacturerLoaded: true,
        manufacturerFailed: false
      });
    }
    case actions.ActionTypes.MANUFACTURER_LIST_FAIL: {
      return Object.assign({}, state, {
        manufacturerLoading: false,
        manufacturerLoaded: true,
        manufacturerFailed: true
      });
    }

// <------------ GET PRODUCT DETAILS -----------> //

    case actions.ActionTypes.GET_PRODUCT_DETAIL: {
      const productdetail = new ProductDetailResponseModel({});

      return Object.assign({}, state, {
        productDetail: null,
        productDetailLoading: true,
        productDetailLoaded: false,
        productDetailFailed: false
      });
    }

    case actions.ActionTypes.PRODUCT_DETAIL_SUCCESS: {
      if (payload && payload.data) {
        if (payload.data.pricerefer !== '') {
          const tempPriceArray = payload.data.pricerefer.split('.');
          let tempPrice = tempPriceArray[0];
          let price = payload.data.price;
          switch (payload.data.taxType) {
            case 1:
              const pricereferWithOutTax = +tempPrice + payload.data.taxValue;
              tempPrice =  Math.round(pricereferWithOutTax);
              const priceWithOutTax = +price + payload.data.taxValue;
              price =  Math.round(priceWithOutTax);
              break;
            case 2:
              const percentReferToAmount = tempPrice * (payload.data.taxValue / 100);
              const pricereferWithTax = +tempPrice + percentReferToAmount;
              tempPrice =  Math.round(pricereferWithTax);
              const percentToAmount = price * (payload.data.taxValue / 100);
              const priceWithTax = +price + percentToAmount;
              price =  Math.round(priceWithTax);
              break;
          }
          let subractPrice = tempPrice - price;
          if (subractPrice < 0) {
            subractPrice = subractPrice / -1;
          }
          const dividePrice = price / 100;
          const sumPrice = subractPrice / dividePrice;
          const sumPriceInString = sumPrice.toString();
          const percentage = sumPriceInString.split('.');
          payload.data.discount = percentage[0];
        }
        payload.data.isAvailable = true;

        if (payload.data.isSimplified === 0) {
          const variantKeys = Object.keys(payload.data.selectedVariant);
          const valueIds = [];
          if (variantKeys && variantKeys.length > 0) {
            variantKeys.forEach((element) => {
              if (payload.data.selectedVariant[element]) {
                valueIds.push(payload.data.selectedVariant[element]);
              }
            });
          }
          if (payload.data.productvarientList && payload.data.productvarientList.length > 0) {
            payload.data.productvarientList.forEach(subElement => {
              let tempCount = 0;
              subElement.productVarientOption.forEach(data => {
                if (valueIds.indexOf(data) > -1) {
                  tempCount += 1;
                }
              });
              if (tempCount === subElement.productVarientOption.length) {
                payload.data.variantTirePrice = subElement.productTirePrices;
              }
            });
          }

        }
      }
      const productdetail = new ProductDetailResponseModel(payload.data);
      return Object.assign({}, state, {
        productDetail: productdetail,
        productDetailLoading: false,
        productDetailLoaded: true,
        productDetailFailed: false
      });
    }

    case actions.ActionTypes.PRODUCT_DETAIL_FAIL: {
      return Object.assign({}, state, {
        productDetailLoading: false,
        productDetailLoaded: true,
        productDetailFailed: true
      });
    }



// <------------ UPDATE PRODUCT DETAILS (WHILE CHNAGE VARIANT) -----------> //


    case actions.ActionTypes.UPDATE_PRODUCT_DETAIL_SUCCESS: {
      const tempProductDetail: any = Object.assign({}, state.productDetail);
      if (tempProductDetail && payload) {
        tempProductDetail.isAvailable = payload.isAvailable;
        tempProductDetail.skuId = payload.skuId;
        tempProductDetail.skuName = payload.skuName;
        tempProductDetail.price = payload.price;
        tempProductDetail.variantName = payload.varientName;
        tempProductDetail.variantId = payload.varientId;
        tempProductDetail.selectedVariant = payload.selectedVariant;
        tempProductDetail.outOfStockThreshold = payload.outOfStockThreshold;
        tempProductDetail.maxQuantityAllowedCart = payload.maxQuantityAllowedCart;
        tempProductDetail.minQuantityAllowedCart = payload.minQuantityAllowedCart;
        tempProductDetail.notifyMinQuantity = payload.notifyMinQuantity;
        tempProductDetail.enableBackOrders = payload.enableBackOrders;
        tempProductDetail.pricerefer = payload.pricerefer;
        tempProductDetail.flag = payload.flag;
        tempProductDetail.stockStatus = payload.stockStatus;
        tempProductDetail.variantTirePrice = payload.variantTirePrice;
        if (payload.optionImage && payload.optionImage.length > 0) {
          let tempImage = tempProductDetail.productOriginalImage.slice();
          tempImage = tempImage.map(element => {
            return Object.assign({}, element, {
              defaultImage: 0,
            });
          });
          const tempOptionImage = payload.optionImage[0];
          tempOptionImage.defaultImage = 1;
          tempImage.unshift(tempOptionImage);
          tempProductDetail.productImage = tempImage;
        } else {
          const tempImage = tempProductDetail.productOriginalImage.slice();
          tempProductDetail.productImage = tempImage;
        }
        if (payload.pricerefer !== '') {
          const tempPriceArray = payload.pricerefer.split('.');
          let tempPrice = tempPriceArray[0];
          let price = payload.price;
          switch (tempProductDetail.taxType) {
            case 1:
              const pricereferWithOutTax = +tempPrice + tempProductDetail.taxValue;
              tempPrice =  Math.round(pricereferWithOutTax);
              const priceWithOutTax = +price + tempProductDetail.taxValue;
              price =  Math.round(priceWithOutTax);
              break;
            case 2:
              const percentReferToAmount = tempPrice * (tempProductDetail.taxValue / 100);
              const pricereferWithTax = +tempPrice + percentReferToAmount;
              tempPrice =  Math.round(pricereferWithTax);
              const percentToAmount = price * (tempProductDetail.taxValue / 100);
              const priceWithTax = +price + percentToAmount;
              price =  Math.round(priceWithTax);
              break;
          }
          let subractPrice = tempPrice - price;
          if (subractPrice < 0) {
            subractPrice = subractPrice / -1;
          }
          const dividePrice = price / 100;
          const sumPrice = subractPrice / dividePrice;
          const sumPriceInString = sumPrice.toString();
          const percentage = sumPriceInString.split('.');
          tempProductDetail.discount = percentage[0];
        } else {
          tempProductDetail.discount = 0;
        }
      }

      return Object.assign({}, state, {
        productDetail: tempProductDetail
      });
    }


// <------------ GET PRODUCT DETAILS MANDATORY -----------> //


    case actions.ActionTypes.GET_PRODUCT_DETAIL_MANDATORY: {
      const productdetail = new ProductDetailResponseModel({});

      return Object.assign({}, state, {
        productDetailMandatory: productdetail,
        productDetailMandatoryLoading: true,
        productDetailMandatoryLoaded: false,
        productDetailMandatoryFailed: false
      });
    }

    case actions.ActionTypes.PRODUCT_DETAIL_MANDATORY_SUCCESS: {
      const productdetailMandatory = new ProductDetailMandatoryResponseModel(
        payload.data[0]
      );
      return Object.assign({}, state, {
        productDetailMandatory: productdetailMandatory,
        productDetailMandatoryLoading: false,
        productDetailMandatoryLoaded: true,
        productDetailMandatoryFailed: false
      });
    }
    case actions.ActionTypes.PRODUCT_DETAIL_MANDATORY_FAIL: {
      return Object.assign({}, state, {
        productDetailMandatoryLoading: false,
        productDetailMandatoryLoaded: true,
        productDetailMandatoryFailed: true
      });
    }



    case actions.ActionTypes.GET_AVAILABLE_VALUE: {
      const tempArray: any = [];
      return Object.assign({}, state, {
        availableOptionsArray: tempArray,
        availableValueLoading: true,
        availableValueLoaded: false,
        availableValueFailed: false
      });
    }

// <------------ GET BANNER LIST -----------> //

    case actions.ActionTypes.GET_BANNER_LIST: {
      return Object.assign({}, state, {
        bannerLoading: true,
        bannerLoaded: false,
        bannerFailed: false
      });
    }

    case actions.ActionTypes.GET_BANNER_LIST_SUCCESS: {
      const bannerModel = payload.data.map(_list => {
        const tempModel = new BannerListResponseModel(_list);
        return tempModel;
      });
      return Object.assign({}, state, {
        bannerList: bannerModel,
        bannerLoading: false,
        bannerLoaded: true,
        bannerFailed: false
      });
    }

    case actions.ActionTypes.GET_BANNER_LIST_FAIL: {
      return Object.assign({}, state, {
        bannerLoading: false,
        bannerLoaded: true,
        bannerFailed: true
      });
    }

// <------------ BANNER LIST COUNT -----------> //

    case actions.ActionTypes.GET_BANNER_LIST_COUNT: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }

    case actions.ActionTypes.GET_BANNER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        bannerCount: payload.data,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }

    case actions.ActionTypes.GET_BANNER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }


// <------------ GET FEATURED PRODUCT LIST (HOME PAGE) -----------> //

    case actions.ActionTypes.GET_FEATURED_PRODUCT_LIST: {
      return Object.assign({}, state, {
        featuredListLoading: true,
        featuredListLoaded: false,
        featuredListFailed: false
      });
    }

    case actions.ActionTypes.GET_FEATURED_PRODUCT_LIST_SUCCESS: {
      const tempList = payload.data.map(list => {
        const tempObject = new FeaturedProductResponseModel(list);
        return tempObject;
      });
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].pricerefer) {
          const tempPriceArray = tempList[i].pricerefer.split('.');
          let tempPrice = tempPriceArray[0];
          let price = tempList[i].price;
          switch (tempList[i].taxType) {
            case 1:
              const pricereferWithOutTax = +tempPrice + tempList[i].taxValue;
              tempPrice =  Math.round(pricereferWithOutTax);
              const priceWithOutTax = +price + tempList[i].taxValue;
              price =  Math.round(priceWithOutTax);
              break;
            case 2:
              const percentReferToAmount = tempPrice * (tempList[i].taxValue / 100);
              const pricereferWithTax = +tempPrice + percentReferToAmount;
              tempPrice =  Math.round(pricereferWithTax);
              const percentToAmount = price * (tempList[i].taxValue / 100);
              const priceWithTax = +price + percentToAmount;
              price =  Math.round(priceWithTax);
              break;
          }
          let subractPrice = tempPrice - price;
          if (subractPrice < 0) {
            subractPrice = subractPrice / -1;
          }
          const dividePrice = price / 100;
          const sumPrice = subractPrice / dividePrice;
          const sumPriceInString = sumPrice.toString();
          const percentage = sumPriceInString.split('.');
          tempList[i].discount = percentage[0];
        }
      }
      return Object.assign({}, state, {
        featuredList: tempList,
        featuredListLoading: false,
        featuredListLoaded: true,
        featuredListFailed: false
      });
    }

    case actions.ActionTypes.GET_FEATURED_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        featuredListLoading: false,
        featuredListLoaded: true,
        featuredListFailed: true
      });
    }

// <------------ GET PAGE LIST FOR FOOTER PURPOSE -----------> //

    case actions.ActionTypes.GET_PAGE_LIST: {
      return Object.assign({}, state, {
        pageListLoading: true,
        pageListLoaded: false,
        pageListFailed: false
      });
    }

    case actions.ActionTypes.GET_PAGE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        pageList: payload.data,
        pageListLoading: false,
        pageListLoaded: true,
        pageListFailed: false
      });
    }

    case actions.ActionTypes.GET_PAGE_LIST_FAIL: {
      return Object.assign({}, state, {
        pageListLoading: false,
        pageListLoaded: true,
        pageListFailed: true
      });
    }

// <------------ CONTACT ADMIN OF THE WEBSITE -----------> //

    case actions.ActionTypes.DO_CONTACT_US_ACTION: {
      return Object.assign({}, state, {
        contactUsLoading: true,
        contactusLoaded: false,
        contactusFailed: false
      });
    }

    case actions.ActionTypes.DO_CONTACT_US_SUCCESS_ACTION: {
      return Object.assign({}, state, {
        contactDetail: payload,
        contactUsLoading: false,
        contactusLoaded: true,
        contactusFailed: false
      });
    }

    case actions.ActionTypes.DO_CONTACT_US_FAIL_ACTION: {
      return Object.assign({}, state, {
        contactUsLoading: false,
        contactusLoaded: true,
        contactusFailed: true
      });
    }


// <------------ GET PAGE DETAILS(REDIRECT TO DETAILS PAGE WHILE CLICK FOOTER) -----------> //

    case actions.ActionTypes.GET_PAGE_DETAIL: {
      return Object.assign({}, state, {
        pageDetailLoading: true,
        pageDetailLoaded: false,
        pageDetailFailed: false
      });
    }

    case actions.ActionTypes.GET_PAGE_DETAIL_SUCCESS: {
      const tempModel = new PageDetailResponse(payload.data);

      return Object.assign({}, state, {
        pageDetail: tempModel,
        pageDetailLoading: false,
        pageDetailLoaded: true,
        pageDetailFailed: false
      });
    }

    case actions.ActionTypes.GET_PAGE_DETAIL_FAIL: {
      return Object.assign({}, state, {
        pageDetailLoading: false,
        pageDetailLoaded: true,
        pageDetailFailed: true
      });
    }


// <------------ GET SETTINGS -----------> //

    case actions.ActionTypes.GET_SETTINGS_ACTION: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.GET_SETTINGS_SUCCESS_ACTION: {
      const tempSetting = new SettingResponseModel(payload.data[0]);
      const setting = payload.data[0];
      let symbolsettings = {};
      if (setting.symbolLeft !== null) {
        symbolsettings = { position: 'left', symbol: setting.symbolLeft };
      } else if (setting.symbolRight !== null) {
        symbolsettings = { position: 'right', symbol: setting.symbolRight };
      } else {
        symbolsettings = { position: 'left', symbol: setting.symbolLeft };
      }
      return Object.assign({}, state, {
        settingDetail: tempSetting,
        symbolSetting: symbolsettings
      });
    }

    case actions.ActionTypes.GET_SETTINGS_FAIL_ACTION: {
      return Object.assign({}, state, {});
    }


// <------------ GET COUNTRY LIST -----------> //

    case actions.ActionTypes.GET_COUNTRY_LIST: {
      return Object.assign({}, state, {
        countryLoading: true,
        countryLoaded: false,
        countryFailed: false
      });
    }

    case actions.ActionTypes.GET_COUNTRY_LIST_SUCCESS: {
      const tempList = payload.data.map(list => {
        const tempObject = new CountryResponseModel(list);
        return tempObject;
      });
      return Object.assign({}, state, {
        countryList: tempList,
        countryLoading: false,
        countryLoaded: true,
        countryFailed: false
      });
    }

    case actions.ActionTypes.GET_COUNTRY_LIST_FAIL: {
      return Object.assign({}, state, {
        countryLoading: false,
        countryLoaded: true,
        countryFailed: true
      });
    }


// <------------ GET ZONE LIST -----------> //

    case actions.ActionTypes.GET_ZONE_LIST_SUCCESS: {
      const tempList = payload.data.map(list => {
        const tempObject = new ZoneResponseModel(list);
        return tempObject;
      });
      return Object.assign({}, state, {
        zoneList: tempList,
        zoneLoading: false,
        zoneLoaded: true,
        zoneFailed: false
      });
    }

    case actions.ActionTypes.GET_ZONE_LIST_FAIL: {
      return Object.assign({}, state, {
        zoneLoading: false,
        zoneLoaded: true,
        zoneFailed: true
      });
    }


// <------------ GET TODAY DEALS PRODUCT LIST (HOME PAGE) -----------> //

    case actions.ActionTypes.GET_TODAY_DEALS: {
      return Object.assign({}, state, {
        todayDealLoading: true,
        todayDealLoaded: false,
        todayDealFailed: false
      });
    }
    case actions.ActionTypes.GET_TODAY_DEALS_SUCCESS: {
      const tempList = payload.data.map(list => {
        const tempObject = new TodayDealsResponseModel(list);
        return tempObject;
      });
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].pricerefer) {
          const tempPriceArray = tempList[i].pricerefer.split('.');
          let tempPrice = tempPriceArray[0];
          let price = tempList[i].price;
          switch (tempList[i].taxType) {
            case 1:
              const pricereferWithOutTax = +tempPrice + tempList[i].taxValue;
              tempPrice =  Math.round(pricereferWithOutTax);
              const priceWithOutTax = +price + tempList[i].taxValue;
              price =  Math.round(priceWithOutTax);
              break;
            case 2:
              const percentReferToAmount = tempPrice * (tempList[i].taxValue / 100);
              const pricereferWithTax = +tempPrice + percentReferToAmount;
              tempPrice =  Math.round(pricereferWithTax);
              const percentToAmount = price * (tempList[i].taxValue / 100);
              const priceWithTax = +price + percentToAmount;
              price =  Math.round(priceWithTax);
              break;
          }
          let subractPrice = tempPrice - price;
          if (subractPrice < 0) {
            subractPrice = subractPrice / -1;
          }
          const dividePrice = price / 100;
          const sumPrice = subractPrice / dividePrice;
          const sumPriceInString = sumPrice.toString();
          const percentage = sumPriceInString.split('.');
          tempList[i].discount = percentage[0];
        }
      }
      return Object.assign({}, state, {
        todayDeal: tempList,
        todayDealLoading: false,
        todayDealLoaded: true,
        todayDealFailed: false
      });
    }
    case actions.ActionTypes.GET_TODAY_DEALS_FAIL: {
      return Object.assign({}, state, {
        todayDealLoading: false,
        todayDealLoaded: true,
        todayDealFailed: true
      });
    }


// <------------ GET SUB CATEGORY LIST -----------> //

    case actions.ActionTypes.GET_SubCATEGORY_LIST: {
      return Object.assign({}, state, {
        SelectedcategoryId: payload.CategoryId,
        subcategoryLoading: true,
        subcategoryLoaded: false,
        subcategoryFailed: false
      });
    }

    case actions.ActionTypes.GET_SubCATEGORY_LIST_SUCCESS: {
      let tempList = [];
      if (payload && payload.data.children) {
         tempList = payload.data.children.map(list => {
          const tempObject = new SubcategoryResponseModel(list);
          return tempObject;
        });
      }
      return Object.assign({}, state, {
        subcategory: tempList,
        subcategoryLoading: false,
        subcategoryLoaded: true,
        subcategoryFailed: false
      });
    }

    case actions.ActionTypes.GET_SubCATEGORY_LIST_FAIL: {
      return Object.assign({}, state, {
        subcategoryLoading: false,
        subcategoryLoaded: true,
        subcategoryFailed: false
      });
    }


// <------------ GET FILTER LIST -----------> //

    case actions.ActionTypes.GET_FILTER_LIST: {
      return Object.assign({}, state, {
        filter: [],
        filterLoading: true,
        filterLoaded: false,
        filterFailed: false
      });
    }

    case actions.ActionTypes.GET_FILTER_LIST_SUCCESS: {
      if (payload) {
        payload.data.map(data => {
          data.sectionItem = data.sectionItem.map(item => {
            const opts = { ...item, selected: false};
            return Object.assign({}, opts);
          });
        });
      }

      return Object.assign({}, state, {
        filter: payload.data,
        filterLoading: false,
        filterLoaded: true,
        filterFailed: false
      });
    }

    case actions.ActionTypes.GET_FILTER_LIST_FAIL: {
      return Object.assign({}, state, {
        filterLoading: false,
        filterLoaded: true,
        filterFailed: false
      });
    }

// <------------ GET VENDOR DETAILS -----------> //

    case actions.ActionTypes.GET_VENDOR_DETAILS: {
      return Object.assign({}, state, {
        vendorDetailLoading: true,
        vendorDetailLoaded: false,
        vendorDetailFailed: false,
        vendorDetail: {},
      });
    }

    case actions.ActionTypes.GET_VENDOR_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        vendorDetailLoading: false,
        vendorDetailLoaded: true,
        vendorDetailFailed: false,
        vendorDetail: payload.data,
      });
    }

    case actions.ActionTypes.GET_VENDOR_DETAILS_FAIL: {
      return Object.assign({}, state, {
        vendorDetailLoading: false,
        vendorDetailLoaded: true,
        vendorDetailFailed: true,
        vendorDetail: {},
      });
    }


// <------------ VENDOR SIGN UP -----------> //

    case actions.ActionTypes.DO_VENDORSIGNUP_ACTION: {
      return Object.assign({}, state, {
        vendorsignupLoading: true,
        vendorsignupLoaded: false,
        vendorsignupFailed: false
      });
    }

    case actions.ActionTypes.DO_VENDORSIGNUP_SUCCESS_ACTION: {
      return Object.assign({}, state, {
        vendorsignupLoading: false,
        vendorsignupLoaded: true,
        vendorsignupFailed: false
      });
    }

    case actions.ActionTypes.DO_VENDORSIGNUP_FAIL_ACTION: {
      return Object.assign({}, state, {
        vendorsignupLoading: false,
        vendorsignupLoaded: true,
        vendorsignupFailed: true
      });
    }

// <------------ TRACK ORDER -----------> //

    case actions.ActionTypes.DO_TRACK_ORDER: {
      return Object.assign({}, state, {
        trackOrderLoading: true,
        trackOrderLoaded: false,
        trackOrderFailed: false,
        trackOrderStatus: false,
      });
    }

    case actions.ActionTypes.DO_TRACK_ORDER_SUCCESS: {
      payload.data.map(data => {
        if (data.createdDate !== '') {
          data.createdDate = new Date(new Date(data.createdDate).setMinutes(new Date(data.createdDate).getMinutes() + 330));
         }
      });
      return Object.assign({}, state, {
        trackOrderDetail: payload.data,
        trackOrderLoading: false,
        trackOrderLoaded: true,
        trackOrderFailed: false,
        trackOrderStatus: true,
      });
    }

    case actions.ActionTypes.DO_TRACK_ORDER_FAIL: {
      return Object.assign({}, state, {
        trackOrderLoading: false,
        trackOrderLoaded: true,
        trackOrderFailed: true,
        trackOrderStatus: false,
      });
    }

// <------------ POST ENQUIRY -----------> //

    case actions.ActionTypes.CREATE_ENQUIRY: {
      return Object.assign({}, state, {
        enquiryLoading: true,
        enquiryLoaded: false,
        enquiryFailed: false
      });
    }

    case actions.ActionTypes.CREATE_ENQUIRY_SUCCESS: {
      return Object.assign({}, state, {
        enquiryLoading: false,
        enquiryLoaded: true,
        enquiryFailed: false,
        enquirySuccess: payload
      });
    }

    case actions.ActionTypes.CREATE_ENQUIRY_FAIL: {
      return Object.assign({}, state, {
        enquiryLoading: false,
        enquiryLoaded: true,
        enquiryFailed: true
      });
    }

// <------------ GET SERVICE LIST -----------> //

    case actions.ActionTypes.GET_SERVICE_LIST: {
      return Object.assign({}, state, {
        serviceListLoading: true,
        serviceListLoaded: false,
        serviceListFailed: false,
        serviceList: []
      });
    }

    case actions.ActionTypes.GET_SERVICE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        serviceListLoading: false,
        serviceListLoaded: true,
        serviceListFailed: false,
        serviceList: payload.data
      });
    }

    case actions.ActionTypes.GET_SERVICE_LIST_FAIL: {
      return Object.assign({}, state, {
        serviceListLoading: false,
        serviceListLoaded: false,
        serviceListFailed: true,
        serviceList: []
      });
    }

// <------------ GET SERVICE CATEGORY -----------> //

    case actions.ActionTypes.GET_SERVICE_CATEGORY: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.GET_SERVICE_CATEGORY_SUCCESS: {
      return Object.assign({}, state, {
        serviceCategory: payload.data
      });
    }

    case actions.ActionTypes.GET_SERVICE_CATEGORY_FAIL: {
      return Object.assign({}, state, {});
    }


// <------------ GET QUESTION LIST -----------> //

    case actions.ActionTypes.GET_QUESTION_LIST: {
      return Object.assign({}, state, {
        questionList: [],
        questionListLoading: true,
        questionListLoaded: false,
        questionListFailed: false,
      });
    }

    case actions.ActionTypes.GET_QUESTION_LIST_SUCCESS: {
      return Object.assign({}, state, {
        questionList: payload.data,
        questionListLoading: false,
        questionListLoaded: true,
        questionListFailed: false,
      });
    }

    case actions.ActionTypes.GET_QUESTION_LIST_FAIL: {
      return Object.assign({}, state, {
        questionListLoading: false,
        questionListLoaded: false,
        questionListFailed: true,
      });
    }


// <------------ POST QUESTION -----------> //

    case actions.ActionTypes.POST_QUESTION: {
      return Object.assign({}, state, {
        postQuestionLoading: true,
        postQuestionLoaded: false,
        postQuestionFailed: false,
      });
    }

    case actions.ActionTypes.POST_QUESTION_SUCCESS: {
      return Object.assign({}, state, {
        postQuestion: payload,
        postQuestionLoading: false,
        postQuestionLoaded: true,
        postQuestionFailed: false,
      });
    }

    case actions.ActionTypes.POST_QUESTION_FAIL: {
      return Object.assign({}, state, {
        postQuestionLoading: false,
        postQuestionLoaded: false,
        postQuestionFailed: true,
      });
    }


// <------------ GET ANSWER LIST -----------> //

    case actions.ActionTypes.GET_ANSWER_LIST: {
      return Object.assign({}, state, {
        answerList: [],
        answerListLoading: true,
        answerListLoaded: false,
        answerListFailed: false,
      });
    }

    case actions.ActionTypes.GET_ANSWER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        answerList: payload.data,
        answerListLoading: false,
        answerListLoaded: true,
        answerListFailed: false,
      });
    }

    case actions.ActionTypes.GET_ANSWER_LIST_FAIL: {
      return Object.assign({}, state, {
        answerList: [],
        answerListLoading: false,
        answerListLoaded: false,
        answerListFailed: true,
      });
    }


// <------------ POST ANSWER -----------> //

    case actions.ActionTypes.POST_ANSWER: {
      return Object.assign({}, state, {
        postAnswer: {},
        postAnswerLoading: true,
        postAnswerLoaded: false,
        postAnswerFailed: false,
      });
    }

    case actions.ActionTypes.POST_ANSWER_SUCCESS: {
      return Object.assign({}, state, {
        postAnswer: payload,
        postAnswerLoading: false,
        postAnswerLoaded: true,
        postAnswerFailed: false,
      });
    }

    case actions.ActionTypes.POST_ANSWER_FAIL: {
      return Object.assign({}, state, {
        postAnswer: {},
        postAnswerLoading: false,
        postAnswerLoaded: false,
        postAnswerFailed: true,
      });
    }

// <------------ LIKE OR DISLIKE ANSWER -----------> //

    case actions.ActionTypes.LIKE_OR_DISLIKE_ANSWER: {
      return Object.assign({}, state, {
        likeOrDislikeAnswer: payload,
        likeOrDislikeAnswerLoading: true,
        likeOrDislikeAnswerLoaded: false,
        likeOrDislikeAnswerFailed: false,
      });
    }

    case actions.ActionTypes.LIKE_OR_DISLIKE_ANSWER_SUCCESS: {
      const tempQuestionList = state.questionList;
      const tempAnswerList = state.answerList;
      const tempLikeOrDislike = state.likeOrDislikeAnswer;

      if (payload && payload.status === 1) {
        if (tempLikeOrDislike.ansType === 2) {
          tempAnswerList.map(data => {
            if (data.answerList) {

            if (data.answerId === tempLikeOrDislike.answerId) {
              if (tempLikeOrDislike.type === 1) {
                if (data.likeType === 0) {
                  data.likeType = 1;
                  data.likes += 1;
                } else {
                  data.likeType = 1;
                  data.likes += 1;
                  data.dislikes -= 1;

                }
              } else {
                if (data.likeType === 0) {
                  data.likeType = 2;
                  data.dislikes += 1;
                } else {
                  data.likeType = 2;
                  data.likes -= 1;
                  data.dislikes += 1;
                }

              }
            }
            }
          });
        } else if (tempLikeOrDislike.ansType === 1) {
          tempQuestionList.map(data => {
            if (data.answerList) {
            if (data.answerList.answerId === tempLikeOrDislike.answerId) {
              if (tempLikeOrDislike.type === 1) {
                if (data.answerList.likeType === 0) {
                  data.answerList.likeType = 1;
                  data.answerList.likes += 1;
                } else {
                  data.answerList.likeType = 1;
                  data.answerList.likes += 1;
                  data.answerList.dislikes -= 1;

                }
              } else {
                if (data.answerList.likeType === 0) {
                  data.answerList.likeType = 2;
                  data.answerList.dislikes += 1;
                } else {
                  data.answerList.likeType = 2;
                  data.answerList.likes -= 1;
                  data.answerList.dislikes += 1;
                }
              }
            }
            }
          });
        }

      }
      return Object.assign({}, state, {
        questionList: tempQuestionList,
        likeOrDislikeAnswerLoading: false,
        likeOrDislikeAnswerLoaded: true,
        likeOrDislikeAnswerFailed: false,
      });
    }

    case actions.ActionTypes.LIKE_OR_DISLIKE_ANSWER_FAIL: {
      return Object.assign({}, state, {
        likeOrDislikeAnswer: {},
        likeOrDislikeAnswerLoading: false,
        likeOrDislikeAnswerLoaded: false,
        likeOrDislikeAnswerFailed: true,
      });
    }

// <------------ ABUSE REASON LIST -----------> //

    case actions.ActionTypes.ABUSE_REASON_LIST: {
      return Object.assign({}, state, {
        abuseReasonListLoading: true,
        abuseReasonListLoaded: false,
        abuseReasonListFailed: false,
      });
    }

    case actions.ActionTypes.ABUSE_REASON_LIST_SUCCESS: {
      return Object.assign({}, state, {
        abuseReasonList: payload.data,
        abuseReasonListLoading: false,
        abuseReasonListLoaded: true,
        abuseReasonListFailed: false,
      });
    }

    case actions.ActionTypes.ABUSE_REASON_LIST_FAIL: {
      return Object.assign({}, state, {
        abuseReasonListLoading: false,
        abuseReasonListLoaded: false,
        abuseReasonListFailed: true,
      });
    }

// <------------ REPORT ABUSE -----------> //

    case actions.ActionTypes.REPORT_ABUSE: {
      return Object.assign({}, state, {
        reportAbuse: {},
        reportAbuseLoading: true,
        reportAbuseLoaded: false,
        reportAbuseFailed: false,
      });
    }

    case actions.ActionTypes.REPORT_ABUSE_SUCCESS: {
      return Object.assign({}, state, {
        reportAbuse: payload,
        reportAbuseLoading: false,
        reportAbuseLoaded: true,
        reportAbuseFailed: false,
      });
    }

    case actions.ActionTypes.REPORT_ABUSE_FAIL: {
      return Object.assign({}, state, {
        reportAbuseLoading: false,
        reportAbuseLoaded: false,
        reportAbuseFailed: true,
        reportAbuse: {},

      });
    }

// <------------ GET VENDOR PRODUCT LIST (PARTICULAR VENDOR)-----------> //

    case actions.ActionTypes.VENDOR_PRODUCT_LIST: {
      return Object.assign({}, state, {
        vendorProductListLoading: true,
        vendorProductListLoaded: false,
        vendorProductListFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_PRODUCT_LIST_SUCCESS: {
      let tempProduct = [];
      if (payload.data && payload.data.length > 0) {

       tempProduct = payload.data;
        for (let i = 0; i < tempProduct.length; i++) {
          if (tempProduct[i].pricerefer) {
            const tempPriceArray = tempProduct[i].pricerefer.split('.');
            let tempPrice = tempPriceArray[0];
            let price = tempProduct[i].price;
            switch (tempProduct[i].taxType) {
              case 1:
                const pricereferWithOutTax = +tempPrice + tempProduct[i].taxValue;
                tempPrice =  Math.round(pricereferWithOutTax);
                const priceWithOutTax = +price + tempProduct[i].taxValue;
                price =  Math.round(priceWithOutTax);
                break;
              case 2:
                const percentReferToAmount = tempPrice * (tempProduct[i].taxValue / 100);
                const pricereferWithTax = +tempPrice + percentReferToAmount;
                tempPrice =  Math.round(pricereferWithTax);
                const percentToAmount = price * (tempProduct[i].taxValue / 100);
                const priceWithTax = +price + percentToAmount;
                price =  Math.round(priceWithTax);
                break;
            }
            let subractPrice = tempPrice - price;
            if (subractPrice < 0) {
              subractPrice = subractPrice / -1;
            }
            const dividePrice = price / 100;
            const sumPrice = subractPrice / dividePrice;
            const sumPriceInString = sumPrice.toString();
            const percentage = sumPriceInString.split('.');
            tempProduct[i].discount = percentage[0];
          }
        }
      }
      return Object.assign({}, state, {
        vendorProductListLoading: false,
        vendorProductListLoaded: true,
        vendorProductListFailed: false,
        vendorProductList: tempProduct,
      });
    }

    case actions.ActionTypes.VENDOR_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        vendorProductListLoading: false,
        vendorProductListLoaded: false,
        vendorProductListFailed: true,
      });
    }

// <------------ GET VENDOR REVIEW LIST -----------> //

    case actions.ActionTypes.VENDOR_REVIEW_LIST: {
      return Object.assign({}, state, {
        vendorReviewListLoading: true,
        vendorReviewListLoaded: false,
        vendorReviewListFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_REVIEW_LIST_SUCCESS: {
      return Object.assign({}, state, {
        vendorReviewListLoading: false,
        vendorReviewListLoaded: true,
        vendorReviewListFailed: false,
        vendorReviewList: payload.data,
     });
    }

    case actions.ActionTypes.VENDOR_REVIEW_LIST_FAIL: {
      return Object.assign({}, state, {
        vendorReviewListLoading: false,
        vendorReviewListLoaded: false,
        vendorReviewListFailed: true,
      });
    }

// <------------ GET VENDOR REVIEW LIST COUNT-----------> //

    case actions.ActionTypes.VENDOR_REVIEW_LIST_COUNT: {
      return Object.assign({}, state, {
        vendorReviewListCountLoading: true,
        vendorReviewListCountLoaded: false,
        vendorReviewListCountFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_REVIEW_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        vendorReviewListCountLoading: false,
        vendorReviewListCountLoaded: true,
        vendorReviewListCountFailed: false,
        vendorReviewListCount: payload.data,
      });
    }

    case actions.ActionTypes.VENDOR_REVIEW_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        vendorReviewListCountLoading: false,
        vendorReviewListCountLoaded: false,
        vendorReviewListCountFailed: true,
      });
    }

// <------------ CHANGE COUNT -----------> //

    case actions.ActionTypes.CHANGE_COUNT: {
      let tempProductDetails: any = {};
      tempProductDetails = state.productDetail;
      tempProductDetails.tirePrice = payload;
      const tempDetails = tempProductDetails;
      return Object.assign({}, state, {
        productDetail: tempDetails
      });
    }


// <------------ GET WIDGET LIST (HOME PAGE)-----------> //

    case actions.ActionTypes.WIDGET_PRODUCT_LIST: {
      return Object.assign({}, state, {
        widgetProductList: [],
        widgetProductListLoading: true,
        widgetProductListLoaded: false,
        widgetProductListFailed: false,
      });
    }

    case actions.ActionTypes.WIDGET_PRODUCT_LIST_SUCCESS: {
      let tempProduct = [];
      if (payload.data && payload.data.length > 0) {

       tempProduct = payload.data;
        for (let i = 0; i < tempProduct.length; i++) {
          if (tempProduct[i].pricerefer) {
            const tempPriceArray = tempProduct[i].pricerefer.split('.');
            let tempPrice = tempPriceArray[0];
            let price = tempProduct[i].price;
            switch (tempProduct[i].taxType) {
              case 1:
                const pricereferWithOutTax = +tempPrice + tempProduct[i].taxValue;
                tempPrice =  Math.round(pricereferWithOutTax);
                const priceWithOutTax = +price + tempProduct[i].taxValue;
                price =  Math.round(priceWithOutTax);
                break;
              case 2:
                const percentReferToAmount = tempPrice * (tempProduct[i].taxValue / 100);
                const pricereferWithTax = +tempPrice + percentReferToAmount;
                tempPrice =  Math.round(pricereferWithTax);
                const percentToAmount = price * (tempProduct[i].taxValue / 100);
                const priceWithTax = +price + percentToAmount;
                price =  Math.round(priceWithTax);
                break;
            }
            let subractPrice = tempPrice - price;
            if (subractPrice < 0) {
              subractPrice = subractPrice / -1;
            }
            const dividePrice = price / 100;
            const sumPrice = subractPrice / dividePrice;
            const sumPriceInString = sumPrice.toString();
            const percentage = sumPriceInString.split('.');
            tempProduct[i].discount = percentage[0];
          }
        }
      }
      return Object.assign({}, state, {
        widgetProductListLoading: false,
        widgetProductListLoaded: true,
        widgetProductListFailed: false,
        widgetProductList: tempProduct,
      });
    }

    case actions.ActionTypes.WIDGET_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        widgetProductListLoading: false,
        widgetProductListLoaded: false,
        widgetProductListFailed: true,
      });
    }


// <------------ GET VENDOR PRODUCT LIST COUNT -----------> //

    case actions.ActionTypes.VENDOR_PRODUCT_LIST_COUNT: {
      return Object.assign({}, state, {
        vendorProductListCountLoading: true,
        vendorProductListCountLoaded: false,
        vendorProductListCountFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_PRODUCT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        vendorProductListCountLoading: false,
        vendorProductListCountLoaded: true,
        vendorProductListCountFailed: false,
        vendorProductListCount: payload.data,
      });
    }

    case actions.ActionTypes.VENDOR_PRODUCT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        vendorProductListCountLoading: false,
        vendorProductListCountLoaded: false,
        vendorProductListCountFailed: true,
      });
    }

// <------------ CLEAR FILTER -----------> //

    case actions.ActionTypes.CLEAR_FILTER: {
      return Object.assign({}, state, {
        filter: []
      });
    }

    default: {
      return state;
    }
  }
}

export const productList = (state: ListsState) => state.products;
export const categoryLevel = (state: ListsState) => state.categoryLevel;

export const activeCategoryID = (state: ListsState) => state.activeCategoryID;
export const maxProductPrice = (state: ListsState) => state.maxProductPrice;
export const getProductCount = (state: ListsState) => state.productCount;
export const productLoading = (state: ListsState) => state.productLoading;
export const productLoaded = (state: ListsState) => state.productLoaded;
export const productFailed = (state: ListsState) => state.productFailed;

export const categoryList = (state: ListsState) => state.category;
export const relatedProducts = (state: ListsState) => state.relatedProducts;
export const manufacturer = (state: ListsState) => state.manufacturer;
export const productDetail = (state: ListsState) => state.productDetail;
export const productDetailMandatory = (state: ListsState) =>
  state.productDetailMandatory;

export const getAvailableOptionsArray = (state: ListsState) =>
  state.availableOptionsArray;

export const getBannerList = (state: ListsState) => state.bannerList;
export const getListLoading = (state: ListsState) => state.bannerLoading;
export const getListLoaded = (state: ListsState) => state.bannerLoaded;
export const getListFailed = (state: ListsState) => state.bannerFailed;

export const getBannerCount = (state: ListsState) => state.bannerCount;
export const getCountLoading = (state: ListsState) => state.countLoading;
export const getCountLoaded = (state: ListsState) => state.countLoaded;
export const getCountFailed = (state: ListsState) => state.countFailed;

export const getFeaturedList = (state: ListsState) => state.featuredList;
export const getFeaturedListLoading = (state: ListsState) =>
  state.featuredListLoading;
export const getFeaturedLisLoaded = (state: ListsState) =>
  state.featuredListLoaded;
export const getFeaturedLisFailed = (state: ListsState) =>
  state.featuredListFailed;

export const getRelatedProductLoading = (state: ListsState) =>
  state.relatedProductLoading;
export const getRelatedProductLoaded = (state: ListsState) =>
  state.relatedProductLoaded;
export const getRelatedProductFailed = (state: ListsState) =>
  state.relatedProductFailed;

export const getPageList = (state: ListsState) => state.pageList;
export const getPageListLoading = (state: ListsState) => state.pageListLoading;
export const getPageListLoaded = (state: ListsState) => state.pageListLoaded;
export const getPageListFailed = (state: ListsState) => state.pageListFailed;
export const getSettingDetail = (state: ListsState) => state.settingDetail;
export const getSymbolSetting = (state: ListsState) => state.symbolSetting;

export const getContactUsLoading = (state: ListsState) =>
  state.contactUsLoading;
export const getContactUsLoaded = (state: ListsState) => state.contactusLoaded;
export const getContactUsFailed = (state: ListsState) => state.contactusFailed;
export const getContactDetail = (state: ListsState) => state.contactDetail;

export const getPageDetailLoading = (state: ListsState) =>
  state.pageDetailLoading;
export const getPageDetailLoaded = (state: ListsState) =>
  state.pageDetailLoaded;
export const getPageDetailFailed = (state: ListsState) =>
  state.pageDetailFailed;
export const getPageDetail = (state: ListsState) => state.pageDetail;

export const getManufacturerLoading = (state: ListsState) =>
  state.manufacturerLoading;
export const getManufacturerLoaded = (state: ListsState) =>
  state.manufacturerLoaded;
export const getManufacturerFailed = (state: ListsState) =>
  state.manufacturerFailed;

export const getProductDetailLoading = (state: ListsState) =>
  state.productDetailLoading;
export const getProductDetailLoaded = (state: ListsState) =>
  state.productDetailLoaded;
export const getProductDetailFailed = (state: ListsState) =>
  state.productDetailFailed;

export const getCountryList = (state: ListsState) => state.countryList;
export const getCountryLoading = (state: ListsState) => state.countryLoading;
export const getCountryLoaded = (state: ListsState) => state.countryLoaded;
export const getCountryFailed = (state: ListsState) => state.countryFailed;

export const getProductRating = (state: ListsState) => state.productRating;
export const getProductRatingLoading = (state: ListsState) =>
  state.productRatingLoading;
export const getProductRatingLoaded = (state: ListsState) =>
  state.productRatingLoaded;
export const getProductRatingFailed = (state: ListsState) =>
  state.productRatingFailed;

export const getZoneList = (state: ListsState) => state.zoneList;
export const getZoneLoading = (state: ListsState) => state.zoneLoading;
export const getZoneLoaded = (state: ListsState) => state.zoneLoaded;
export const getZoneFailed = (state: ListsState) => state.zoneFailed;

export const getTodayDealList = (state: ListsState) => state.todayDeal;
export const getTodayDealLoading = (state: ListsState) =>
  state.todayDealLoading;
export const getTodayDealLoaded = (state: ListsState) => state.todayDealLoaded;
export const getTodayDealFailed = (state: ListsState) => state.todayDealFailed;

export const subCategoryList = (state: ListsState) => state.subcategory;
export const subCategoryLoading = (state: ListsState) =>
  state.subcategoryLoading;
export const subCategoryLoaded = (state: ListsState) => state.subcategoryLoaded;
export const subCategoryFailed = (state: ListsState) => state.subcategoryFailed;

export const filterList = (state: ListsState) => state.filter;
export const filterLoading = (state: ListsState) =>
  state.filterLoading;
export const filterLoaded = (state: ListsState) => state.filterLoaded;
export const filterFailed = (state: ListsState) => state.filterFailed;

export const selectedCategoryId = (state: ListsState) =>
  state.SelectedcategoryId;
export const getPriceLoading = (state: ListsState) => state.priceLoading;

export const getVendorDetail = (state: ListsState) => state.vendorDetail;
export const getVendorDetailLoading = (state: ListsState) => state.vendorDetailLoading;
export const getVendorDetailLoaded = (state: ListsState) => state.vendorDetailLoaded;
export const getVendorDetailFailed = (state: ListsState) => state.vendorDetailFailed;

export const vendorsignupLoading = (state: ListsState) =>
  state.vendorsignupLoading;
export const vendorsignupLoaded = (state: ListsState) => state.vendorsignupLoaded;
export const vendorsignupFailed = (state: ListsState) => state.vendorsignupFailed;

export const trackOrderLoading = (state: ListsState) =>
  state.trackOrderLoading;
export const trackOrderLoaded = (state: ListsState) =>
  state.trackOrderLoaded;
export const trackOrderFailed = (state: ListsState) =>
  state.trackOrderFailed;
export const trackOrderDetail = (state: ListsState) => state.trackOrderDetail;

export const getEnquiryLoading = (state: ListsState) => state.enquiryLoading;
export const getEnquiryLoaded = (state: ListsState) => state.enquiryLoaded;
export const getEnquiryFailed = (state: ListsState) => state.enquiryFailed;
export const getEnquirySuccess = (state: ListsState) => state.enquirySuccess;

export const getServiceListLoading = (state: ListsState) =>
  state.serviceListLoading;
export const getServiceListLoaded = (state: ListsState) =>
  state.serviceListLoaded;
export const getServiceListFailed = (state: ListsState) =>
  state.serviceListFailed;
export const getServiceList = (state: ListsState) => state.serviceList;
export const getServiceCategory = (state: ListsState) => state.serviceCategory;

export const questionList = (state: ListsState) => state.questionList;
export const questionListLoading = (state: ListsState) => state.questionListLoading;
export const questionListLoaded = (state: ListsState) => state.questionListLoaded;
export const questionListFailed = (state: ListsState) => state.questionListFailed;

export const postQuestion = (state: ListsState) => state.postQuestion;
export const postQuestionLoading = (state: ListsState) => state.postQuestionLoading;
export const postQuestionLoaded = (state: ListsState) => state.postQuestionLoaded;
export const postQuestionFailed = (state: ListsState) => state.postQuestionFailed;

export const answerList = (state: ListsState) => state.answerList;
export const answerListLoading = (state: ListsState) => state.answerListLoading;
export const answerListLoaded = (state: ListsState) => state.answerListLoaded;
export const answerListFailed = (state: ListsState) => state.answerListFailed;

export const postAnswer = (state: ListsState) => state.postAnswer;
export const postAnswerLoading = (state: ListsState) => state.postAnswerLoading;
export const postAnswerLoaded = (state: ListsState) => state.postAnswerLoaded;
export const postAnswerFailed = (state: ListsState) => state.postAnswerFailed;

export const abuseReasonList = (state: ListsState) => state.abuseReasonList;
export const abuseReasonListLoading = (state: ListsState) => state.abuseReasonListLoading;
export const abuseReasonListLoaded = (state: ListsState) => state.abuseReasonListLoaded;
export const abuseReasonListFailed = (state: ListsState) => state.abuseReasonListFailed;

export const reportAbuse = (state: ListsState) => state.reportAbuse;
export const reportAbuseLoading = (state: ListsState) => state.reportAbuseLoading;
export const reportAbuseLoaded = (state: ListsState) => state.reportAbuseLoaded;
export const reportAbuseFailed = (state: ListsState) => state.reportAbuseFailed;

export const vendorProductList = (state: ListsState) => state.vendorProductList;
export const vendorProductListLoading = (state: ListsState) => state.vendorProductListLoading;
export const vendorProductListLoaded = (state: ListsState) => state.vendorProductListLoaded;
export const vendorProductListFailed = (state: ListsState) => state.vendorProductListFailed;

export const vendorReviewList = (state: ListsState) => state.vendorReviewList;
export const vendorReviewListLoading = (state: ListsState) => state.vendorReviewListLoading;
export const vendorReviewListLoaded = (state: ListsState) => state.vendorReviewListLoaded;
export const vendorReviewListFailed = (state: ListsState) => state.vendorReviewListFailed;

export const vendorReviewListCount = (state: ListsState) => state.vendorReviewListCount;

export const widgetProductList = (state: ListsState) => state.widgetProductList;
export const widgetProductListLoading = (state: ListsState) => state.widgetProductListLoading;
export const widgetProductListLoaded = (state: ListsState) => state.widgetProductListLoaded;
export const widgetProductListFailed = (state: ListsState) => state.widgetProductListFailed;

export const vendorProductListCount = (state: ListsState) => state.vendorProductListCount;
export const vendorProductListCountLoaded = (state: ListsState) => state.vendorProductListCountLoaded;
