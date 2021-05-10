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
import { catchError } from 'rxjs/operators';
import * as actions from '../tax-action/tax.actions';
import { TaxService } from '../tax.service';
import { Store } from '@ngrx/store';
import * as store from '../../../../../app.state.interface';
import * as layoutAction from '../../../../layout/actions/layout.action';
@Injectable()
export class TaxEffect {
  constructor(
    private action$: Actions,
    private taxService: TaxService,
    protected appState$: Store<store.AppState>
  ) {}

  // tax list
  @Effect()
  dotaxList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_TAX_LIST),
    map((action: actions.DoTaxListAction) => action.payload),
    switchMap(state => {
      return this.taxService.taxList(state).pipe(
        switchMap(user => [new actions.DoTaxListSuccess(user)]),
        catchError(error => of(new actions.DoTaxFail(error)))
      );
    })
  );
  // tax list count
  @Effect()
  dotaxListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_TAX_LIST_COUNT),
    map((action: actions.DoTaxListCountAction) => action.payload),
    switchMap(state => {
      return this.taxService.taxListCount(state).pipe(
        switchMap(user => [new actions.DoTaxListCountSuccess(user)]),
        catchError(error => of(new actions.DoTaxCountFail(error)))
      );
    })
  );
  // new  tax add
  @Effect()
  dotaxNew$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_TAX_LIST_NEW),
    map((action: actions.DoTaxNewAction) => action.payload),
    switchMap(state => {
      return this.taxService.taxnew(state).pipe(
        switchMap(user => [new actions.DoTaxNewSuccess(user)]),
        catchError(error => of(new actions.DoTaxNewFail(error)))
      );
    })
  );
  // update tax
  @Effect()
  dotaxUpdate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_TAX_UPDATE),
    map((action: actions.DoTaxUpdateAction) => action.payload),
    switchMap(state => {
      return this.taxService.taxupdate(state).pipe(
        tap(response => {
          this.appState$.dispatch(new layoutAction.GetSettings());
        }),
        switchMap(user => [new actions.DoTaxUpdateSuccess(user)]),
        catchError(error => of(new actions.DoTaxUpdateFail(error)))
      );
    })
  );
  // tax delete
  @Effect()
  doCustomerDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_TAX_DELETE),
    map((action: actions.DoTaxDeleteAction) => action.payload),
    switchMap(state => {
      const taxId = state.taxId;
      return this.taxService.deleteTax(state, taxId).pipe(
        switchMap(user => [new actions.DoTaxDeleteSuccess(user)]),
        catchError(error => of(new actions.DoTaxDeleteFail(error)))
      );
    })
  );
}
