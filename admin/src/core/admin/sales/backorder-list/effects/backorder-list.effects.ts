/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../actions/backorder-list.action';
import { catchError } from 'rxjs/operators';
import { BackorderListService } from '../backorder-list.service';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';
import { saveAs } from 'file-saver';



@Injectable()
export class BackorderListEffects {
  constructor(
    private action$: Actions,
    private api: BackorderListService,
    protected appState: Store<store.AppState>
  ) {}

  @Effect()
  backorderList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.BACKORDER_LIST_ACTION),
    map((action: actions.BackorderListAction) => action.payload),
    switchMap(state => {
      return this.api.backorderList(state).pipe(
        switchMap(salesPayments => [
          new actions.BackorderListSuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.BackorderListFailAction(error)))
      );
    })
  );

  @Effect()
  backorderListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.BACKORDER_LIST_COUNT_ACTION),
    map((action: actions.BackorderListCountAction) => action.payload),
    switchMap(state => {
      return this.api.backorderListCount(state).pipe(
        switchMap(salesPayments => [
          new actions.BackorderListCountSuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.BackorderListCountFailAction(error)))
      );
    })
  );

}
