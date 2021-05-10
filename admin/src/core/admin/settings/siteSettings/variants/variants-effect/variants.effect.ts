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
// effects
import { Effect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../variants-action/variants.action';
import { catchError } from 'rxjs/operators';
// service
import { VariantsService } from '../variants.service';

@Injectable()
export class VariantsEffect {
  constructor(
    private action$: Actions,
    private service: VariantsService
  ) {}

  // Variants list
  @Effect()
  variantlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_VARIANTS_LIST),
    map((action: actions.GetVariantsListAction) => action.payload),
    switchMap(state => {
      return this.service.variantsList(state).pipe(
        switchMap(product => [
          new actions.GetVariantsListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.GetVariantsListFailAction(error))
        )
      );
    })
  );
  // Variants list count
  @Effect()
  variantcount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_VARIANTS_LIST_COUNT),
    map((action: actions.GetVariantsListCountAction) => action.payload),
    switchMap(state => {
      return this.service.variantsListCount(state).pipe(
        switchMap(product => [
          new actions.GetVariantsListCountSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.GetVariantsListCountFailAction(error))
        )
      );
    })
  );

  // Variants delete
  @Effect()
  doVariantsDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_VARIANTS_DELETE),
    map((action: actions.DoVariantsDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.variantsDelete(state).pipe(
        switchMap(user => [
          new actions.DoVariantsDeleteSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.DoVariantsDeleteFailAction(error))
        )
      );
    })
  );
  // Variants add
  @Effect()
  doVariantsAdd$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_VARIANTS_ADD),
    map((action: actions.DoVariantsAddAction) => action.payload),
    switchMap(state => {
      return this.service.variantsAdd(state).pipe(
        switchMap(user => [new actions.DoVariantsAddSuccessAction(user)]),
        catchError(error =>
          of(new actions.DoVariantsAddFailAction(error))
        )
      );
    })
  );
  // Variants update
  @Effect()
  doVariantsUpdate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_VARIANTS_UPDATE),
    map((action: actions.DoVariantsUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.variantsUpdate(state).pipe(
        switchMap(user => [
          new actions.DoVariantsUpdateSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.DoVariantsUpdateFailAction(error))
        )
      );
    })
  );

  @Effect()
  variantDetails$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_VARIANTS_DETAILS),
    map((action: actions.GetVariantsDetailsAction) => action.payload),
    switchMap(state => {
      return this.service.variantsDetails(state).pipe(
        switchMap(product => [
          new actions.GetVariantsDetailsSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.GetVariantsDetailsFailAction(error))
        )
      );
    })
  );
}
