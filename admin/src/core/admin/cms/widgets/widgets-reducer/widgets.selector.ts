/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { createSelector } from 'reselect';
import * as fromwidget from './widgets.reducer';
import { AppState } from '../../../../app.state.interface';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getWidgetState = (state: AppState) => state.widgets;

export const widgetList = createSelector(
  getWidgetState,
  fromwidget.widgetList
);
export const widgetPagination = createSelector(
  getWidgetState,
  fromwidget.widgetPagination
);
export const getAddWidgets = createSelector(
  getWidgetState,
  fromwidget.getAddWidget
);
export const deleteWidget = createSelector(
  getWidgetState,
  fromwidget.deleteWidget
);


export const updateWidget = createSelector(
  getWidgetState,
  fromwidget.updateWidget
);


export const widgetListCount = createSelector(
  getWidgetState,
  fromwidget.widgetListCount
);


export const widgetListActive = createSelector(
  getWidgetState,
  fromwidget.widgetListActive
);


export const widgetListInActive = createSelector(
  getWidgetState,
  fromwidget.widgetListInActive
);



export const getWidgetCount = createSelector(
  getWidgetState,
  fromwidget.getWidgetCount
);
export const getWidgetCountLoading = createSelector(
  getWidgetState,
  fromwidget.getWidgetCountLoading
);
export const getWidgetCountLoaded = createSelector(
  getWidgetState,
  fromwidget.getWidgetCountLoaded
);
export const getWidgetCountFailed = createSelector(
  getWidgetState,
  fromwidget.getWidgetCountFailed
);


export const getWidgetDetails = createSelector(
  getWidgetState,
  fromwidget.getWidgetDetails
);
export const getWidgetDetailsLoading = createSelector(
  getWidgetState,
  fromwidget.getWidgetDetailsLoading
);
export const getWidgetDetailsLoaded = createSelector(
  getWidgetState,
  fromwidget.getWidgetDetailsLoaded
);
export const getWidgetDetailsFailed = createSelector(
  getWidgetState,
  fromwidget.getWidgetDetailsFailed
);


export const productList = createSelector(
  getWidgetState,
  fromwidget.productList
);
export const productListLoading = createSelector(
  getWidgetState,
  fromwidget.productListLoading
);
export const productListLoaded = createSelector(
  getWidgetState,
  fromwidget.productListLoaded
);
export const productListFailed = createSelector(
  getWidgetState,
  fromwidget.productListFailed
);


export const categoryList = createSelector(
  getWidgetState,
  fromwidget.categoryList
);
export const categoryListLoading = createSelector(
  getWidgetState,
  fromwidget.categoryListLoading
);
export const categoryListLoaded = createSelector(
  getWidgetState,
  fromwidget.categoryListLoaded
);
export const categoryListFailed = createSelector(
  getWidgetState,
  fromwidget.categoryListFailed
);
export const selectedProduct = createSelector(
  getWidgetState,
  fromwidget.selectedProductList
);
export const selectedCategoryList = createSelector(
  getWidgetState,
  fromwidget.selectedCategoryList
);



