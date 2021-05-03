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
import * as actions from '../action/inventory-products.action';
import { catchError } from 'rxjs/operators';
// service
import { InventoryProductService } from '../inventory-products.service';


@Injectable()
export class InventoryProductEffect {
  constructor(
    private action$: Actions,
    private inventoryService: InventoryProductService
  ) {}

  // Inventory product list

  @Effect()
  inventProductList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.INVENTORY_PRODUCT_LIST),
    map((action: actions.InventoryProductListAction) => action.payload),
    switchMap(state => {
      return this.inventoryService.inventoryProductList(state).pipe(
        switchMap(list => [new actions.InventoryProductListSuccess(list)]),
        catchError(error => of(new actions.InventoryProductListFail(error)))
      );
    })
  );

   // Inventory product list count

   @Effect()
   inventProductListCount$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.INVENTORY_PRODUCT_LIST_COUNT),
     map((action: actions.InventoryProductListCountAction) => action.payload),
     switchMap(state => {
       return this.inventoryService.inventoryProductListCount(state).pipe(
         switchMap(list => [new actions.InventoryProductListCountSuccess(list)]),
         catchError(error => of(new actions.InventoryProductListCountFail(error)))
       );
     })
   );

   // Update Stock

  @Effect()
  updateStock$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_STOCK),
    map((action: actions.UpdateStockAction) => action.payload),
    switchMap(state => {
      return this.inventoryService.updateStock(state).pipe(
        switchMap(list => [new actions.UpdateStockSuccess(list)]),
        catchError(error => of(new actions.UpdateStockFail(error)))
      );
    })
  );

}
