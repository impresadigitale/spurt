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
import * as actions from '../action/dashboard.action';
import { DashboardService } from '../dashboard.service';

@Injectable()
export class DashboardEffect {
  constructor(
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authApi: DashboardService
  ) {}

  @Effect()
  getDashboardCount$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_DASHBOARD_COUNT),
    map((action: actions.GetDashboardCount) => action.payload),
    switchMap(state => {
      return this.authApi.getDashboardCount(state).pipe(
        map(wishlish => new actions.GetDashboardCountSuccess(wishlish)),
        catchError(error => of(new actions.GetDashboardCountFail(error)))
      );
    })
  );
  @Effect()
  getProfile$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PROFILE),
    map((action: actions.GetProfile) => action.payload),
    switchMap(state => {
      return this.authApi.doGetProfile(state).pipe(
        tap(val => {
          if (val) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('vendorUser', JSON.stringify(val.data));
            }
          }
        }),
        map(profile => new actions.GetProfileSuccess(profile)),
        catchError(error => of(new actions.GetProfileFail(error)))
      );
    })
  );
  @Effect()
  editProfile$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.EDIT_PROFILE),
    map((action: actions.EditProfile) => action.payload),
    switchMap(state => {
      return this.authApi.doEditProfile(state).pipe(
        tap(val => {
          if (val) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('vendorUser', JSON.stringify(val.data));
            }
          }
        }),
        map(profile => new actions.EditProfileSuccess(profile)),
        catchError(error => of(new actions.EditProfileFail(error)))
      );
    })
  );
  @Effect()
  getLanguage$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_LANGUAGELIST),
    map((action: actions.GetLanguage) => action.payload),
    switchMap(state => {
      return this.authApi.getLanguage(state).pipe(
        map(wishlish => new actions.GetLanguageSuccess(wishlish)),
        catchError(error => of(new actions.GetLanguageFail(error)))
      );
    })
  );

@Effect()
topSellingProducts$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.TOP_SELLING_PRODUCTS),
  map((action: actions.GetTopSellingProducts) => action.payload),
  switchMap(state => {
    return this.authApi.getTopSellingProducts(state).pipe(
      map(wishlish => new actions.GetTopSellingProductsSuccess(wishlish)),
      catchError(error => of(new actions.GetTopSellingProductsFail(error)))
    );
  })
);

@Effect()
getOrderList$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.GET_ORDER_LIST),
  map((action: actions.GetOrderListAction) => action.payload),
  switchMap(state => {
    return this.authApi.getOrderList(state).pipe(
      map(wishlish => new actions.GetOrderListSuceess(wishlish)),
      catchError(error => of(new actions.GetOrderListFail(error)))
    );
  })
);
}
