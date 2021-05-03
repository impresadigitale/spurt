/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
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
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../app.state.interface';
import { catchError } from 'rxjs/operators';
import * as actions from '../action/settings.action';
import { SettingsService } from '../settings.service';

@Injectable()
export class SettingsEffect {
  constructor(
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private settingsApi: SettingsService
  ) {}

  @Effect()
  createCoupon$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.CREATE_COUPON),
  map((action: actions.CreateCouponAction) => action.payload),
  switchMap(state => {
    return this.settingsApi.createCoupon(state).pipe(
      map(value => new actions.CreateCouponSuccess(value)),
      catchError(error => of(new actions.CreateCouponFail(error)))
    );
   })
  );

  @Effect()
  productList$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.PRODUCT_LIST),
  map((action: actions.ProductListAction) => action.payload),
  switchMap(state => {
    return this.settingsApi.productList(state).pipe(
      map(value => new actions.ProductListSuccess(value)),
      catchError(error => of(new actions.ProductListFail(error)))
    );
   })
  );

  @Effect()
  categoryList$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.CATEGORY_LIST),
  map((action: actions.CategoryListAction) => action.payload),
  switchMap(state => {
    return this.settingsApi.categoryList(state).pipe(
      map(value => new actions.CategoryListSuccess(value)),
      catchError(error => of(new actions.CategoryListFail(error)))
    );
   })
  );

  @Effect()
  couponList$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.COUPON_LIST),
  map((action: actions.CouponListAction) => action.payload),
  switchMap(state => {
    return this.settingsApi.couponList(state).pipe(
      map(value => new actions.CouponListSuccess(value)),
      catchError(error => of(new actions.CouponListFail(error)))
    );
   })
  );
  @Effect()
  couponUsageList$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.COUPON_USAGE_LIST),
  map((action: actions.CouponUsageListAction) => action.payload),
  switchMap(state => {
    return this.settingsApi.couponUsageList(state).pipe(
      map(value => new actions.CouponUsageListSuccess(value)),
      catchError(error => of(new actions.CouponUsageListFail(error)))
    );
   })
  );
  @Effect()
  couponListCount$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.COUPON_LIST_COUNT),
  map((action: actions.CouponListCountAction) => action.payload),
  switchMap(state => {
    return this.settingsApi.couponListCount(state).pipe(
      map(value => new actions.CouponListCountSuccess(value)),
      catchError(error => of(new actions.CouponListCountFail(error)))
    );
   })
  );

  @Effect()
  couponDelete$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.DELETE_COUPON),
  map((action: actions.DeleteCouponAction) => action.payload),
  switchMap(state => {
    return this.settingsApi.deleteCoupon(state).pipe(
      map(value => new actions.DeleteCouponSuccess(value)),
      catchError(error => of(new actions.DeleteCouponFail(error)))
    );
   })
  );

  @Effect()
  couponDetails$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.GET_COUPON_DETAILS),
  map((action: actions.GetCouponDetailsAction) => action.payload),
  switchMap(state => {
    return this.settingsApi.couponDetails(state).pipe(
      map(value => new actions.GetCouponDetailsSuccess(value)),
      catchError(error => of(new actions.GetCouponDetailsFail(error)))
    );
   })
  );


  @Effect()
  couponUpdate$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.UPDATE_COUPON),
  map((action: actions.UpdateCouponAction) => action.payload),
  switchMap(state => {
    return this.settingsApi.updateCoupon(state).pipe(
      map(value => new actions.UpdateCouponSuccess(value)),
      catchError(error => of(new actions.UpdateCouponFail(error)))
    );
   })
  );

}
