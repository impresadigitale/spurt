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
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../state.interface';
import { catchError } from 'rxjs/operators';
import * as actions from './../action/cart.action';
import { CartService } from '../cart.service';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CartEffect {
  constructor(
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authApi: CartService, public snackBar: MatSnackBar
  ) {}

  @Effect()
  getCartCount$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_CART_COUNT),
    map((action: actions.GetCartCount) => action.payload),
    switchMap(state => {
      return this.authApi.getCartCount(state).pipe(
        map(wishlish => new actions.GetCartCountSuccess(wishlish)),
        catchError(error => of(new actions.GetCartCountFail(error)))
      );
    })
  );
  @Effect()
  AddToCart$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.ADD_TO_CART),
    map((action: actions.AddToCart) => action.payload),
    switchMap(state => {
      return this.authApi.doAddToCart(state).pipe(
        tap(val => {
          if (val) {
          }
        }),
        map(addToCart => new actions.AddToCartSuccess(addToCart)),
        catchError(error => of(new actions.AddToCartFail(error)))
      );
    })
  );
  @Effect()
  DeleteFromCart$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DELETE_FROM_CART),
    map((action: actions.DeleteFromCart) => action.payload),
    switchMap(state => {
      return this.authApi.deleteCart(state).pipe(
        tap(val => {
          if (val) {
          }
        }),
        map(deleteFromCart => new actions.DeleteFromCartSuccess(deleteFromCart)),
        catchError(error => of(new actions.DeleteFromCartFail(error)))
      );
    })
  );

  @Effect()
  GetCartList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_CART_LIST),
    map((action: actions.GetCartList) => action.payload),
    switchMap(state => {
      return this.authApi.GetCartList(state).pipe(
        map(wishlish => new actions.GetCartListSuccess(wishlish)),
        catchError(error => of(new actions.GetCartListFail(error)))
      );
    })
  );
}
