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
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../widgets-action/widgets.action';
import { catchError } from 'rxjs/internal/operators';
import { WidgetService } from '../widgets.service';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';

@Injectable()
export class WidgetEffect {
  constructor(
    private action$: Actions,
    private service: WidgetService,
    protected appState: Store<store.AppState>
  ) {}

  // Widget List
  @Effect()
  doWidgetLists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_WIDGET_LIST),
    map((action: actions.DoWidgetListAction) => action.payload),
    switchMap(state => {
      return this.service.widgetList(state).pipe(
        switchMap(user => [new actions.DoWidgetListSuccessAction(user)]),
        catchError(error => of(new actions.DoWidgetListFailAction(error)))
      );
    })
  );

  // Widget Count List
  @Effect()
  doWidgetCountLists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_WIDGET_LIST_COUNT),
    map((action: actions.DoWidgetListCountAction) => action.payload),
    switchMap(state => {
      return this.service.widgetListCount(state).pipe(
        switchMap(user => [new actions.DoWidgetListCountSuccessAction(user)]),
        catchError(error => of(new actions.DoWidgetListCountFailAction(error)))
      );
    })
  );

  // Widget add
  @Effect()
  doAddWidget$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_WIDGET_ACTION),
    map((action: actions.DoWidgetAddAction) => action.payload),
    switchMap(state => {
      return this.service.addWidget(state).pipe(
        switchMap(user => [new actions.DoWidgetAddSuccessAction(user)]),
        catchError(error => of(new actions.DoWidgetAddSuccessAction(error)))
      );
    })
  );

    // Widget update
    @Effect()
    doUpdateWidget$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.DO_UPDATE_WIDGET_ACTION),
      map((action: actions.DoWidgetUpdateAction) => action.payload),
      switchMap(state => {
        return this.service.updateWidget(state).pipe(
          switchMap(user => [new actions.DoWidgetUpdateSuccessAction(user)]),
          catchError(error => of(new actions.DoWidgetUpdateFailAction(error)))
        );
      })
    );

    // Widget Delete
    @Effect()
    doDeleteWidget$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.DO_DELETE_WIDGET_ACTION),
      map((action: actions.DoWidgetDeleteAction) => action.payload),
      switchMap(state => {
        return this.service.deleteWidget(state).pipe(
          switchMap(user => [new actions.DoWidgetDeleteSuccessAction(user)]),
          catchError(error => of(new actions.DoWidgetDeleteFailAction(error)))
        );
      })
    );



  // Widget Count

  @Effect()
  WidgetCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_WIDGET_COUNT),
    map((action: actions.GetWidgetCountAction) => action.payload),
    switchMap(state => {
      return this.service.widgetCount().pipe(
        switchMap(user => [new actions.GetWidgetCountSuccessAction(user)]),
        catchError(error => of(new actions.GetWidgetCountFailAction(error)))
      );
    })
  );

  // Widget Details

  @Effect()
  getWidgetDetails$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_WIDGET_DETAILS),
    map((action: actions.GetWidgetDetailsAction) => action.payload),
    switchMap(state => {
      return this.service.widgetDetails(state).pipe(
        switchMap(user => [new actions.GetWidgetDetailsSuccessAction(user)]),
        catchError(error => of(new actions.GetWidgetDetailsFailAction(error)))
      );
    })
  );

   // Product List
  @Effect()
  productList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_LIST),
    map((action: actions.GetProductListAction) => action.payload),
    switchMap(state => {
      return this.service.productList(state).pipe(
        switchMap(user => [new actions.GetProductListSuccessAction(user)]),
        catchError(error => of(new actions.GetProductListFailAction(error)))
      );
    })
  );

   // Category List
  @Effect()
  categoryList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_CATEGORY_LIST),
    map((action: actions.GetCategoryListAction) => action.payload),
    switchMap(state => {
      return this.service.categoryList(state).pipe(
        switchMap(user => [new actions.GetCategoryListSuccessAction(user)]),
        catchError(error => of(new actions.GetCategoryListFailAction(error)))
      );
    })
  );
}
