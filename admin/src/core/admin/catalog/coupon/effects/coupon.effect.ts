/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../action/coupon.action';
import { catchError } from 'rxjs/operators';
// service
import { CouponService } from '../coupon.service';
// model
import { CoupondeleteResponseModel } from '../models/coupondelete.response.model';
import { CouponupdateResponseModel } from '../models/couponupdate.response.model';

@Injectable()
export class CouponEffect {
  constructor(
    private action$: Actions,
    private couponService: CouponService
  ) {}

  // CATEGORY LIST
  @Effect()
  docatlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_COUPON_LIST),
    map((action: actions.DoCouponlistAction) => action.payload),
    switchMap(state => {
      return this.couponService.couponList(state).pipe(
        switchMap(list => [new actions.DoCouponlistSuccessAction(list)]),
        catchError(error => of(new actions.DoCouponlistFailAction(error)))
      );
    })
  );

  @Effect()
  doDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_COUPON),
    map((action: actions.DoDeleteCouponAction) => action.payload),
    switchMap(state => {
      return this.couponService.delete(state).pipe(
        switchMap(user => [
          new actions.DoDeleteCouponSuccessAction(
            new CoupondeleteResponseModel(user)
          )
        ]),
        catchError(error =>
          of(
            new actions.DoCatcountFailAction(
              new CoupondeleteResponseModel(error)
            )
          )
        )
      );
    })
  );

  @Effect()
  doGet$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_GET_COUPON),
    map((action: actions.DoGetCouponAction) => action.payload),
    switchMap(state => {
      return this.couponService.get(state).pipe(
        switchMap(user => [
          new actions.DoGetCouponSuccessAction(
            (user)
          )
        ]),
        catchError(error =>
          of(
            new actions.DoGetCouponFailAction(
              (error)
            )
          )
        )
      );
    })
  );

  @Effect()
  doaddCoupon$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADDCOUPON),
    map((action: actions.DoAddCouponAction) => action.payload),
    switchMap(state => {
      return this.couponService.addCoupon(state).pipe(
        switchMap(add => {
          return [new actions.DoAddCouponSuccessAction(add)];
        }),
        catchError(error => of(new actions.DoAddCouponFailAction(error)))
      );
    })
  );

  @Effect()
  doupdateCoupon$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATECOUPON),
    map((action: actions.DoUpdateCouponAction) => action.payload),
    switchMap(state => {
      return this.couponService.updateCoupon(state).pipe(
        switchMap(user => {
          return [new actions.DoUpdateCouponSuccessAction(user)];
        }),
        catchError(error =>
          of(
            new actions.DoUpdateCouponFailAction(
              new CouponupdateResponseModel(error)
            )
          )
        )
      );
    })
  );

  // coupon pagination

  @Effect()
  docount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_COUPONCOUNT),
    map((action: actions.DoCouponcountAction) => action.payload),
    switchMap(state => {
      return this.couponService.couponListPagination(state).pipe(
        switchMap(user => [new actions.DoCouponcountSuccessAction(user)]),
        catchError(error => of(new actions.DoCatcountFailAction(error)))
      );
    })
  );


   // PRODUCT LIST
   @Effect()
   productList$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.GET_PRODUCT_LIST),
     map((action: actions.GetProductListAction) => action.payload),
     switchMap(state => {
       return this.couponService.getProductList(state).pipe(
         switchMap(list => [new actions.GetProductListSuccessAction(list)]),
         catchError(error => of(new actions.GetProductListFailAction(error)))
       );
     })
   );
}
