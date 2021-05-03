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
import * as actions from '../settlement-history-action/settlement-history.action';
import { catchError } from 'rxjs/operators';
// service
import { SettlementHistoryService } from '../settlement-history.service';

@Injectable()
export class SettlementHistoryEffect {
  constructor(
    private action$: Actions,
    private service: SettlementHistoryService
  ) {}


  // settlement hostory list
  @Effect()
  historyList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.SETTLEMENT_HISTORY_LIST),
    map((action: actions.SettlementHistoryListAction) => action.payload),
    switchMap(state => {
      return this.service.historyList(state).pipe(
        switchMap(product => [
          new actions.SettlementHistoryListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.SettlementHistoryListFailAction(error))
        )
      );
    })
  );

    // settlement hostory list count
    @Effect()
    historyListCount$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.SETTLEMENT_HISTORY_LIST_COUNT),
      map((action: actions.SettlementHistoryListCountAction) => action.payload),
      switchMap(state => {
        return this.service.historyListCount(state).pipe(
          switchMap(product => [
            new actions.SettlementHistoryListCountSuccessAction(product)
          ]),
          catchError(error =>
            of(new actions.SettlementHistoryListCountFailAction(error))
          )
        );
      })
    );

        // settlement details list count
    @Effect()
    settlementDetails$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.SETTLEMENT_DETAILS),
      map((action: actions.SettlementDetailsAction) => action.payload),
      switchMap(state => {
        return this.service.settlementDetails(state).pipe(
          switchMap(product => [
            new actions.SettlementDetailsSuccessAction(product)
          ]),
          catchError(error =>
            of(new actions.SettlementDetailsFailAction(error))
          )
        );
      })
    );
  }
