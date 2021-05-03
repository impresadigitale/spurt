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
import * as actions from '../payments-action/payments.action';
import { catchError } from 'rxjs/operators';
import { PaymentsService } from '../payments.service';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';
import { saveAs } from 'file-saver';


@Injectable()
export class PaymentsEffects {
  constructor(
    private action$: Actions,
    private api: PaymentsService,
    protected appState: Store<store.AppState>
  ) {}

  @Effect()
  paymentList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAYMENT_LIST_ACTION),
    map((action: actions.GetPaymentListAction) => action.payload),
    switchMap(state => {
      return this.api.getPaymentList(state).pipe(
        switchMap(salesPayments => [
          new actions.GetPaymentListSuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.GetPaymentListFailAction(error)))
      );
    })
  );

  @Effect()
  paymentListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAYMENT_LIST_COUNT_ACTION),
    map((action: actions.GetPaymentListCountAction) => action.payload),
    switchMap(state => {
      return this.api.getPaymentListCount(state).pipe(
        switchMap(salesPayments => [
          new actions.GetPaymentListCountSuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.GetPaymentListCountFailAction(error)))
      );
    })
  );

  @Effect()
  downloadInvoice$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_INVOICE),
    map((action: actions.DownloadInvoiceAction) => action.payload),
    switchMap(state => {
      const orderPrefixId = state.orderPrefixId;
      delete state.orderPrefixId;
      return this.api.downloadInvoice(state).pipe(
        tap(response => {
          this.downloadPdfFile(response.data, orderPrefixId);
        }),
        switchMap(salesPayments => [
          new actions.DownloadInvoiceuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.DownloadInvoiceFailAction(error)))
      );
    })
  );

  @Effect()
  exportPayment$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_PAYMENT),
    map((action: actions.ExportPaymentAction) => action.payload),
    switchMap(state => {
      return this.api.exportPayment(state).pipe(
        tap(data => {
          const filename = 'SalesPaymentExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(salesPayments => [
          new actions.ExportPaymentSuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.ExportPaymentFailAction(error)))
      );
    })
  );

  @Effect()
  exportAllPayment$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ALL_PAYMENT),
    map((action: actions.ExportAllPaymentAction) => action.payload),
    switchMap(state => {
      return this.api.exportAllPayment(state).pipe(
        tap(data => {
          const filename = 'SalesPaymentExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(salesPayments => [
          new actions.ExportAllPaymentSuccessAction(salesPayments)
        ]),
        catchError(error => of(new actions.ExportAllPaymentFailAction(error)))
      );
    })
  );

  @Effect()
  archivePayment$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.MAKE_PAYMENT_ARCHIVE),
    map((action: actions.MakePaymentArchiveAction) => action.payload),
    switchMap(state => {
      return this.api.makePaymentArchive(state).pipe(
        switchMap(salesPayments => [
          new actions.MakePaymentArchiveSuccess(salesPayments)
        ]),
        catchError(error => of(new actions.MakePaymentArchiveFail(error)))
      );
    })
  );

  downloadPdfFile(base64content: string, orderPrefixId: string) {
    const fileName = orderPrefixId.toUpperCase() + '-' + new Date();
    const blobData = this.convertBase64PDFToBlobData(base64content);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
      window.navigator.msSaveOrOpenBlob(blobData, fileName);
    } else { // chrome
      const blob = new Blob([blobData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    }
  }
  convertBase64PDFToBlobData(base64Data: string, contentType: string = 'application/pdf', sliceSize = 512) {
    const byteCharacters = atob(base64Data.replace(/^data:([A-Za-z-+\/]+);base64,/, ''));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
