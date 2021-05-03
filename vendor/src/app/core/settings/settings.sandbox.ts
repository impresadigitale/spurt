/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as settingsAction from './action/settings.action';
import * as store from '../app.state.interface';

import { createCoupon, productList, categoryList, couponList,
         createCouponLoading, couponListLoading, couponListLoaded, productListLoaded,
         couponListCount, deleteCoupon, couponDetails, updateCoupon, couponDetailsLoading,
         updateCouponLoading, couponUsageList, couponUsageListFailed, couponUsageListLoaded, couponUsageListLoading, couponDetailsLoaded} from './reducer/settings.selector';
@Injectable()
export class SettingsSandbox {

  /*** coupons variables***/

  public createCoupon$ = this.appState$.select(createCoupon);
  public productList$ = this.appState$.select(productList);
  public productListLoaded$ = this.appState$.select(productListLoaded);
  public categoryList$ = this.appState$.select(categoryList);
  public couponList$ = this.appState$.select(couponList);
  public couponUsageList$ = this.appState$.select(couponUsageList);
  public createCouponLoading$ = this.appState$.select(createCouponLoading);
  public couponListLoading$ = this.appState$.select(couponListLoading);
  public couponListLoaded$ = this.appState$.select(couponListLoaded);
  public couponListCount$ = this.appState$.select(couponListCount);
  public couponUsageListLoading$ = this.appState$.select(couponUsageListLoading);
  public couponUsageListLoaded$ = this.appState$.select(couponUsageListLoaded);
  public couponUsageListCount$ = this.appState$.select(couponListCount);
  public deleteCoupon$ = this.appState$.select(deleteCoupon);
  public updateCoupon$ = this.appState$.select(updateCoupon);
  public couponDetails$ = this.appState$.select(couponDetails);
  public couponDetailsLoading$ = this.appState$.select(couponDetailsLoading);
  public updateCouponLoading$ = this.appState$.select(updateCouponLoading);
  public couponDetailsLoaded$ = this.appState$.select(couponDetailsLoaded);




  constructor(
    protected appState$: Store<store.AppState>
  ) {}


  // create coupon

  public createCoupon(params): void {
    this.appState$.dispatch(new settingsAction.CreateCouponAction(params));
  }

  // get product list

  public getProductList(params): void {
    this.appState$.dispatch(new settingsAction.ProductListAction(params));
  }

  // get category list

  public getCategoryList(params): void {
    this.appState$.dispatch(new settingsAction.CategoryListAction(params));
  }

  // get coupon list

  public getCouponList(params): void {
    this.appState$.dispatch(new settingsAction.CouponListAction(params));
  }
  // get coupon usage list

  public getCouponUsageList(params): void {
    this.appState$.dispatch(new settingsAction.CouponUsageListAction(params));
  }

  // get coupon list count

  public getCouponListCount(params): void {
    this.appState$.dispatch(new settingsAction.CouponListCountAction(params));
  }

  // delete coupon

  public deleteCoupon(params): void {
    this.appState$.dispatch(new settingsAction.DeleteCouponAction(params));
  }

  // get coupon details

  public getCouponDetails(params): void {
    this.appState$.dispatch(new settingsAction.GetCouponDetailsAction(params));
  }

  // update coupon

  public updateCoupon(params): void {
    this.appState$.dispatch(new settingsAction.UpdateCouponAction(params));
  }

  // clear state variables

  public clear(): void {
    this.appState$.dispatch(new settingsAction.ClearAction());
  }
}
