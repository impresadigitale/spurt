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
import * as actions from '../reports-action/reports.action';
import { catchError } from 'rxjs/operators';
// service
import { ReportsService } from '../reports.service';

import { tap } from 'rxjs/internal/operators/tap';
import { saveAs } from 'file-saver';

@Injectable()
export class ReportsEffect {
  constructor(
    private action$: Actions,
    private service: ReportsService
  ) {}

  // attribute list
  @Effect()
  vandorSalesReport$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_SALES_REPORT),
    map((action: actions.VendorSalesReportAction) => action.payload),
    switchMap(state => {
      return this.service.vendorSalesReport(state).pipe(
        switchMap(product => [
          new actions.VendorSalesReportSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.VendorSalesReportFailAction(error))
        )
      );
    })
  );

  // attribute list delete
  @Effect()
  totalSalesReport$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.TOTAL_SALES_REPORT),
    map((action: actions.TotalSalesReportAction) => action.payload),
    switchMap(state => {
      return this.service.totalSalesReport(state).pipe(
        switchMap(user => [
          new actions.TotalSalesReportSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.TotalSalesReportFailAction(error))
        )
      );
    })
  );

  // Attribute add
  @Effect()
  settlementReport$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.SETTLEMENT_REPORT),
    map((action: actions.SettlementReportAction) => action.payload),
    switchMap(state => {
      return this.service.settlementReport(state).pipe(
        switchMap(user => [new actions.SettlementReportSuccessAction(user)]),
        catchError(error =>
          of(new actions.SettlementReportFailAction(error))
        )
      );
    })
  );

  @Effect()
  vendorList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.VENDOR_LIST),
    map((action: actions.VendorListAction) => action.payload),
    switchMap(state => {
      return this.service.vendorList(state).pipe(
        switchMap(user => [new actions.VendorListSuccessAction(user)]),
        catchError(error =>
          of(new actions.VendorListFailAction(error))
        )
      );
    })
  );

  @Effect()
  exportSettlementReport$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_SETTLEMENT_REPORT),
    map((action: actions.ExportSettlementReportAction) => action.payload),
    switchMap(state => {
      return this.service.exportSettlementReport(state).pipe(
        tap(data => {
          const filename = 'SettlementReport_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.ExportSettlementReportSuccessAction(user)]),
        catchError(error =>
          of(new actions.ExportSettlementReportFailAction(error))
        )
      );
    })
  );

  @Effect()
  exportTotalSalesReport$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_TOTAL_SALES_REPORT),
    map((action: actions.ExportTotalSalesReportAction) => action.payload),
    switchMap(state => {
      return this.service.exportTotalSalesReport(state).pipe(
        tap(data => {
          const filename = 'TotalSalesReport_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.ExportTotalSalesReportSuccessAction(user)]),
        catchError(error =>
          of(new actions.ExportTotalSalesReportFailAction(error))
        )
      );
    })
  );

  @Effect()
  exportVendorSalesReport$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_VENDOR_SALES_REPORT),
    map((action: actions.ExportVendorSalesReportAction) => action.payload),
    switchMap(state => {
      return this.service.exportVendorSalesReport(state).pipe(
        tap(data => {
          const filename = 'VendorSalesReport_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.ExportVendorSalesReportSuccessAction(user)]),
        catchError(error =>
          of(new actions.ExportVendorSalesReportFailAction(error))
        )
      );
    })
  );

 // order status list
     @Effect()
     orderStatusList$: Observable<Action> = this.action$.pipe(
       ofType(actions.ActionTypes.ORDER_STATUS_LIST),
       map((action: actions.OrderStatusListAction) => action.payload),
       switchMap(state => {
         return this.service.orderStatusList(state).pipe(
           switchMap(product => [
             new actions.OrderStatusListSuccessAction(product)
           ]),
           catchError(error =>
             of(new actions.OrderStatusListFailAction(error))
           )
         );
       })
     );

}
