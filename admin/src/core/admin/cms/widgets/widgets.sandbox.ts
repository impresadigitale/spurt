/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as widgetActions from './widgets-action/widgets.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../app.state.interface';

import {

  widgetList,
  widgetPagination,
  deleteWidget,
  updateWidget,
  widgetListCount,
  widgetListActive,
  widgetListInActive,
  getWidgetCount,
  getWidgetCountLoading,
  getWidgetDetails,
  getWidgetDetailsLoading,
  getWidgetDetailsLoaded,
  getAddWidgets,
  productList,
  categoryList,
  selectedProduct,
  selectedCategoryList,
  productListLoaded

} from './widgets-reducer/widgets.selector';


@Injectable()
export class WidgetSandbox implements OnDestroy {


  public widgetList$ = this.appState.select(widgetList);
  public getwidgetpagelength$ = this.appState.select(widgetPagination);
  public getAddNewWidget$ = this.appState.select(getAddWidgets);
  public updateWidget$ = this.appState.select(updateWidget);
  public deleteWidget$ = this.appState.select(deleteWidget);
  public getWidgetCount$ = this.appState.select(getWidgetCount);
  public getWidgetCountLoading$ = this.appState.select(getWidgetCountLoading);
  public widgetListCount$ = this.appState.select(widgetListCount);
  public getwidgetListActive$ = this.appState.select(widgetListActive);
  public getwidgetListInActive$ = this.appState.select(widgetListInActive);
  public getWidgetDetails$ = this.appState.select(getWidgetDetails);
  public getWidgetDetailsLoading$ = this.appState.select(getWidgetDetailsLoading);
  public getWidgetDetailsLoaded$ = this.appState.select(getWidgetDetailsLoaded);
  public productList$ = this.appState.select(productList);
  public categoryList$ = this.appState.select(categoryList);
  public selectedProduct$ = this.appState.select(selectedProduct);
  public selectedCategoryList$ = this.appState.select(selectedCategoryList);
  public productListLoaded$ = this.appState.select(productListLoaded);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
  ) {}

  public getWidgetList(value: any) {
    this.appState.dispatch(
      new widgetActions.DoWidgetListAction(value));
  }

  public getWidgetListCount(value: any) {
    this.appState.dispatch(
      new widgetActions.DoWidgetListCountAction(value));
  }

  public addWidget(data) {
    this.appState.dispatch(new widgetActions.DoWidgetAddAction(data));
  }

  public updateWidget(data) {
    this.appState.dispatch(new widgetActions.DoWidgetUpdateAction(data));
  }

  public deleteWidget(data) {
    this.appState.dispatch(
      new widgetActions.DoWidgetDeleteAction(data));
  }

  // Do widget Bulk Delete
  public bulkDelete(value) {
    this.appState.dispatch(new widgetActions.DoWidgetBulkDelete(value));
  }

  // Get Widget overall counts

  public getWidgetCount() {
    this.appState.dispatch(new widgetActions.GetWidgetCountAction());
  }

   // Get Widget Details

   public getWidgetDetails(value) {
    this.appState.dispatch(new widgetActions.GetWidgetDetailsAction(value));
  }

  // get product list
  public getProductList(value) {
    this.appState.dispatch(new widgetActions.GetProductListAction(value));
  }

  // get category list
  public getCategoryList(value) {
    this.appState.dispatch(new widgetActions.GetCategoryListAction(value));
  }

  // select product
  public selectProduct(value) {
    this.appState.dispatch(new widgetActions.SelectProductAction(value));
  }

  // search selected product
  public searchSelectedProduct(value) {
    this.appState.dispatch(new widgetActions.SearchSelectedProductAction(value));
  }

  public clearSelectedProducts() {
    this.appState.dispatch(new widgetActions.ClearSelectedProductsAction());
  }

  public clearSelectedCategories() {
    this.appState.dispatch(new widgetActions.ClearSelectedCategoryAction());
  }

  public selectCategory(value) {
    this.appState.dispatch(new widgetActions.SelectCategoryAction(value));
  }

  public searchCategory(value) {
    this.appState.dispatch(new widgetActions.SearchCategoryAction(value));
  }

  public searchSelectedCategory(value) {
    this.appState.dispatch(new widgetActions.SearchSelectedCategoryAction(value));
  }

  public clear() {
    this.appState.dispatch(new widgetActions.ClearAction());
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
