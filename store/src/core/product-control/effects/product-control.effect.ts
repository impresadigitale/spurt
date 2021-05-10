/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../state.interface';
import { catchError } from 'rxjs/operators';
import * as actions from './../action/product-control.action';
import { ProductControlService } from '../product-control.service';
import * as countActions from '../../common/action/common.action';
import * as wishlistActions from '../../wishlist/action/wishlist.action';

@Injectable()
export class ProductControlEffect {
  parameter: any = { limit: '', offser: 0 };
  countParameter: any = { limit: '', offser: 0, count: true };
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private actions$: Actions,
    private authApi: ProductControlService,
    private appState$: Store<store.AppState>
  ) {}

  @Effect()
  addToWishlist$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.ADD_TO_WISHLIST),
    map((action: actions.AddtoWishlist) => action.payload),
    switchMap(state => {
      return this.authApi.addToWishlist(state).pipe(
        switchMap(register => [
          new actions.AddtoWishlistSuccess(register),
          new wishlistActions.GetWishlist(this.parameter),
          new countActions.GetWishlistCount(this.countParameter)
        ]),
        catchError(error => of(new actions.AddtoWishlistFail(error)))
      );
    })
  );
  @Effect()
  applyCoupon$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.APPLY_COUPON),
    map((action: actions.AddtoWishlist) => action.payload),
    switchMap(state => {
      return this.authApi.applyCoupon(state).pipe(
        switchMap(register => [
          new actions.ApplyCouponSuccess(register),
        ]),
        catchError(error => of(new actions.ApplyCouponFail(error)))
      );
    })
  );

  @Effect()
  getPaymentSetting$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PAYMENT_SETTINGS),
    map((action: actions.GetPaymentSettings) => action.payload),
    switchMap(state => {
      return this.authApi.getPaymentSettings(state).pipe(
        map(register => new actions.GetPaymentSettingsSuccess(register)),
        catchError(error => of(new actions.GetPaymentSettingsFail(error)))
      );
    })
  );

  @Effect()
  checkout$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_CHECKOUT),
    map((action: actions.DoCheckoutAction) => action.payload),
    switchMap(state => {
      const cartList = state.productDetails.product;
      state.productDetails = cartList;
      return this.authApi.CheckoutProduct(state).pipe(
        tap(res => {
          if (res.status === 3) {
            const cartParams: any = {};
            cartParams.products = [];
            cartParams.productTotal = 0;
            cartParams.totalPrice = 0;
            cartParams.changeCountTotalPrice = 0;
            if (isPlatformBrowser(this.platformId)) {
              sessionStorage.setItem(
                'productTotal',
                JSON.stringify(cartParams.totalPrice)
              );
              sessionStorage.setItem(
                'selectedProducts',
                JSON.stringify(cartParams.products)
              );
              sessionStorage.setItem(
                'selectedProductsCount',
                JSON.stringify(cartParams.productTotal)
              );
            }
            this.appState$.dispatch(new actions.CartHandleAction(cartParams));
            window.open(res.data, '_self');
          }
        }),
        map(checkout => new actions.CheckoutActionSuccess(checkout)),
        catchError(error => of(new actions.CheckoutActionFail(error)))
      );
    })
  );
  @Effect()
  checkProductAvailability$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.CHECK_PRODUCT_AVAILABILITY),
    map((action: actions.CheckProductAvailability) => action.payload),
    switchMap(state => {
      return this.authApi.CheckProductAvailability(state).pipe(
        map(register => new actions.CheckProductAvailabilitySuccess(register)),
        catchError(error => of(new actions.CheckProductAvailabilityFail(error)))
      );
    })
  );

  @Effect()
  backorderCheckout$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_BACKORDER_CHECKOUT),
    map((action: actions.DoBackorderCheckoutAction) => action.payload),
    switchMap(state => {
      return this.authApi.backorderCheckout(state).pipe(
        map(register => new actions.DoBackorderCheckoutSuccess(register)),
        catchError(error => of(new actions.DoBackorderCheckoutFail(error)))
      );
    })
  );

  // make quatation

  @Effect()
  makeQuatation$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.MAKE_QUATATION),
    map((action: actions.MakeQuatationAction) => action.payload),
    switchMap(state => {
      return this.authApi.makeQuatation(state).pipe(
        map(register => new actions.MakeQuatationSuccess(register)),
        catchError(error => of(new actions.MakeQuatationFail(error)))
      );
    })
  );
}
