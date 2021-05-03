/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface WidgetState extends Map<string, any> {
  widgetList: any;
  widgetPagination: any;
  newWidget: any;
  updateWidget: any;
  deleteWidget: any;
  addWidget: any;

  widgetListCount: any;
  widgetListLoaded: boolean;
  widgetListFailed: boolean;
  widgetListLoading: boolean;

  widgetAddLoaded: boolean;
  widgetAddFailed: boolean;
  widgetAddLoading: boolean;

  widgetUpdateLoading: boolean;
  widgetUpdateLoaded: boolean;
  widgetUpdateFailed: boolean;

  widgetDeleteLoading: boolean;
  widgetDeleteLoaded: boolean;
  widgetDeleteFailed: boolean;

  widgetCountLoading: boolean;
  widgetCountLoaded: boolean;
  widgetCountFailed: boolean;

  widgetListCountLoaded: boolean;
  widgetListCountFailed: boolean;
  widgetListCountLoading: boolean;

  widgetListActive: any;
  widgetListActiveLoaded: boolean;
  widgetListACtiveFailed: boolean;
  widgetListActiveLoading: boolean;

  widgetListInActive: any;
  widgetListInActiveLoaded: boolean;
  widgetListInACtiveFailed: boolean;
  widgetListInActiveLoading: boolean;

  getWidgetCount: any;
  getWidgetCountLoaded: boolean;
  getWidgetCountFailed: boolean;
  getWidgetCountLoading: boolean;

  getWidgetDetails: any;
  getWidgetDetailsLoaded: boolean;
  getWidgetDetailsFailed: boolean;
  getWidgetDetailsLoading: boolean;

  productList: any;
  tempProductList: any;
  productListLoading: boolean;
  productListLoaded: boolean;
  productListFailed: boolean;

  categoryList: any;
  tempCategoryList: any;
  categoryListLoading: boolean;
  categoryListLoaded: boolean;
  categoryListFailed: boolean;

  selectedProductList: Array<any>;
  selectedProductListOriginal: any;

  selectedCategoryList: Array<any>;
  selectedCategoryListOriginal: any;

  productRefresh: boolean;
  catSearch: boolean;

}

export const WidgetRecordState = Record({
  selectedProductList: [],
  selectedProductListOriginal: [],

  widgetList: {},
  widgetPagination: {},
  newWidget: {},
  updateWidget: {},
  deleteWidget: {},
  addWidget: {},
  widgetListCount: {},
  widgetListLoaded: false,
  widgetListFailed: false,
  widgetListLoading: false,
  widgetAddLoaded: false,
  widgetAddFailed: false,
  widgetAddLoading: false,
  widgetUpdateLoading: false,
  widgetUpdateLoaded: false,
  widgetUpdateFailed: false,
  widgetDeleteLoading: false,
  widgetDeleteLoaded: false,
  widgetDeleteFailed: false,
  widgetCountLoading: false,
  widgetCountLoaded: false,
  widgetCountFailed: false,
  widgetListCountLoaded: false,
  widgetListCountFailed: false,
  widgetListCountLoading: false,
  widgetListActive: {},
  widgetListActiveLoaded: false,
  widgetListACtiveFailed: false,
  widgetListActiveLoading: false,
  widgetListInActive: {},
  widgetListInActiveLoaded: false,
  widgetListInACtiveFailed: false,
  widgetListInActiveLoading: false,

  getWidgetCount: {},
  getWidgetCountLoaded: false,
  getWidgetCountFailed: false,
  getWidgetCountLoading: false,

  getWidgetDetails: {},
  getWidgetDetailsLoaded: false,
  getWidgetDetailsFailed: false,
  getWidgetDetailsLoading: false,

  productList: [],
  tempProductList: [],
  productListLoading: false,
  productListLoaded: false,
  productListFailed: false,

  categoryList: [],
  tempCategoryList: [],
  categoryListLoading: false,
  categoryListLoaded: false,
  categoryListFailed: false,


  selectedCategoryList: [],
  selectedCategoryListOriginal: [],

  productRefresh: false,
  catSearch: false
});
