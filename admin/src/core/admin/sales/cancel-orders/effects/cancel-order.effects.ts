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
import * as actions from '../actions/cancel-orders.action';
import { catchError } from 'rxjs/operators';
import { CancelOrderService } from '../cancel-orders.service';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';
import { saveAs } from 'file-saver';



@Injectable()
export class CancelOrderEffects {
  constructor(
    private action$: Actions,
    private api: CancelOrderService,
    protected appState: Store<store.AppState>
  ) {}

  @Effect()
  cancelOrderListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.CANCEL_ORDER_LIST_COUNT_ACTION),
    map((action: actions.CancelOrderListCountAction) => action.payload),
    switchMap(state => {
      return this.api.cancelOrderListCount(state).pipe(
        switchMap(salesPayments => [
          new actions.CancelOrderListSuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.CancelOrderListFailAction(error)))
      );
    })
  );

  @Effect()
  cancelOrderList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_CANCEL_ORDER_LIST_ACTION),
    map((action: actions.GetCancelOrderListAction) => action.payload),
    switchMap(state => {
      return this.api.cancelOrderList(state).pipe(
        switchMap(salesPayments => [
          new actions.GetCancelOrderListSuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.GetCancelOrderListFailAction(error)))
      );
    })
  );

  @Effect()
  changeStatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS),
    map((action: actions.ChangeCancelOrderStatusAction) => action.payload),
    switchMap(state => {
      return this.api.changeCancelOrderStatus(state).pipe(
        switchMap(salesPayments => [
          new actions.ChangeCancelOrderStatusSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.ChangeCancelOrderStatusFail(error)))
      );
    })
  );

  @Effect()
  bulkStatusChange$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.BULK_CANCEL_ORDER_STATUS),
    map((action: actions.BulkCancelOrderStatusAction) => action.payload),
    switchMap(state => {
      return this.api.bulkStatusChange(state).pipe(
        switchMap(salesPayments => [
          new actions.BulkCancelOrderStatusSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.BulkCancelOrderStatusFail(error)))
      );
    })
  );

  @Effect()
  exportCancelOrder$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_CANCEL_ORDER),
    map((action: actions.ExportCancelOrderAction) => action.payload),
    switchMap(state => {
      return this.api.exportCancelOrder(state).pipe(
        tap(data => {
          const filename = 'CancelOrderExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(salesPayments => [
          new actions.ExportCancelOrderSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.ExportCancelOrderFail(error)))
      );
    })
  );

  @Effect()
  exportBulkCancelOrder$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_BULK_CANCEL_ORDER),
    map((action: actions.ExportBulkCancelOrderAction) => action.payload),
    switchMap(state => {
      return this.api.exportBulkCancelOrder(state).pipe(
        tap(data => {
          const filename = 'CancelOrderExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(salesPayments => [
          new actions.ExportBulkCancelOrderSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.ExportBulkCancelOrderFail(error)))
      );
    })
  );

  @Effect()
  acceptedCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ACCEPTED_COUNT_ACTION),
    map((action: actions.GetAcceptedCountAction) => action.payload),
    switchMap(state => {
      return this.api.getAcceptedCount(state).pipe(
        switchMap(salesPayments => [
          new actions.GetAcceptedCountSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.GetAcceptedCountFail(error)))
      );
    })
  );

  @Effect()
  rejectedCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_REJECTED_COUNT_ACTION),
    map((action: actions.GetRejectedCountAction) => action.payload),
    switchMap(state => {
      return this.api.getRejectedCount(state).pipe(
        switchMap(salesPayments => [
          new actions.GetRejectedCountSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.GetRejectedCountFail(error)))
      );
    })
  );

}
