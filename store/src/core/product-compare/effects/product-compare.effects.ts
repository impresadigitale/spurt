/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
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
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../state.interface';
import { catchError, tap } from 'rxjs/operators';
import * as actions from './../action/product-compare.action';
import { Meta, Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCompareService } from '../product-compare.service';

@Injectable()
export class ProductCompareEffect {
  constructor(
    private actions$: Actions,
    private authApi: ProductCompareService,
    private appState$: Store<store.AppState>,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // compare products
  @Effect()
  compareProducts$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.PRODUCT_COMPARE),
    map((action: actions.CompareProducts) => action.payload),
    switchMap(state => {
      let compareId;
      if (isPlatformBrowser(this.platformId)) {
        compareId = localStorage.getItem('compareId');
      }
      return this.authApi.compareProducts(state).pipe(
        tap(res => {
          if (!res['data'] && res['message']) {
            this.snackBar.open(res['message'], '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              horizontalPosition: 'right',
              duration: 3000
            });
          }
        }),
        map(data => new actions.CompareProductsSuccess(data)),
        catchError(error =>
          of(
            new actions.CompareProductsFail(error.error),
            new actions.RemoveCompareCount(compareId)
          )
        )
      );
    })
  );
}
