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
import * as actions from '../actions/archive-payments.action';
import { catchError } from 'rxjs/operators';
import { ArchivePaymentService } from '../archive-payments.service';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';
import { saveAs } from 'file-saver';



@Injectable()
export class ArchivePaymentEffects {
  constructor(
    private action$: Actions,
    private api: ArchivePaymentService,
    protected appState: Store<store.AppState>
  ) {}

  @Effect()
  archivePaymentList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ARCHIVE_PAYMENT_LIST),
    map((action: actions.ArchivePaymentListAction) => action.payload),
    switchMap(state => {
      return this.api.archivePaymentList(state).pipe(
        switchMap(salesPayments => [
          new actions.ArchivePaymentListSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.ArchivePaymentListFail(error)))
      );
    })
  );

  @Effect()
  archivePaymentCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT),
    map((action: actions.ArchivePaymentListCountAction) => action.payload),
    switchMap(state => {
      return this.api.archivePaymentCount(state).pipe(
        switchMap(salesPayments => [
          new actions.ArchivePaymentListCountSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.ArchivePaymentListCountFail(error)))
      );
    })
  );


  @Effect()
  exportArchivePayment$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ARCHIVE_PAYMENT),
    map((action: actions.ExportArchivePaymentAction) => action.payload),
    switchMap(state => {
      return this.api.exportArchivePayment(state).pipe(
        tap(data => {
          const filename = 'archive_payment_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(salesPayments => [
          new actions.ExportArchivePaymentSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.ExportArchivePaymentFail(error)))
      );
    })
  );

  @Effect()
  exportAllArchivePayment$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT),
    map((action: actions.ExportAllArchivePaymentAction) => action.payload),
    switchMap(state => {
      return this.api.exportAllArchivePayment(state).pipe(
        tap(data => {
          const filename = 'archive_payment_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(salesPayments => [
          new actions.ExportAllArchivePaymentSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.ExportArchivePaymentFail(error)))
      );
    })
  );

}
