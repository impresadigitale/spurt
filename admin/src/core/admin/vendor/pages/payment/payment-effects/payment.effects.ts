 import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError } from 'rxjs/operators';
import * as actions from '../payment-action/payment.action';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';


@Injectable()
export class PaymentEffects {
  constructor(
    private action$: Actions,
    public router: Router,
    private paymentService: PaymentService
  ) {}

  @Effect()
  paymentList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAYMENT_LIST),
    map((action: actions.GetPaymentList) => action.payload),
    switchMap(state => {
      return this.paymentService.paymentList(state).pipe(
        switchMap(response => [new actions.GetPaymentListSuccess(response)]),
        catchError(error => of(new actions.GetPaymentListFail(error)))
      );
    })
  );

  @Effect()
  paymentListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAYMENT_LIST_COUNT),
    map((action: actions.GetPaymentListCount) => action.payload),
    switchMap(state => {
      return this.paymentService.paymentListCount(state).pipe(
        switchMap(response => [new actions.GetPaymentListCountSuccess(response)]),
        catchError(error => of(new actions.GetPaymentListCountFail(error)))
      );
    })
  );

  @Effect()
  paymentDetail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAYMENT_DETAIL),
    map((action: actions.GetPaymentDetail) => action.payload),
    switchMap(state => {
      return this.paymentService.paymentDetail(state).pipe(
        switchMap(response => [new actions.GetPaymentDetailSuccess(response)]),
        catchError(error => of(new actions.GetPaymentDetailFail(error)))
      );
    })
  );

  @Effect()
  paymentDashboardCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAYMENT_DASHBOARD_COUNT),
    map((action: actions.GetPaymentDashboardCount) => action.payload),
    switchMap(state => {
      return this.paymentService.paymentDashboardCount().pipe(
        switchMap(response => [new actions.GetPaymentDashboardCountSuccess(response)]),
        catchError(error => of(new actions.GetPaymentDashboardCountFail(error)))
      );
    })
  );

  @Effect()
  getInvoiceDetail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_INVOICE),
    map((action: actions.DownloadInvoice) => action.payload),
    switchMap(state => {
      const orderPrefixId = state.orderPrefixId;
      delete state.orderPrefixId;
      return this.paymentService.downloadInvoice(state).pipe(
        tap(response => {
          this.downloadPdfFile(response.data, orderPrefixId);
        }),
        switchMap(SettingList => [
          new actions.DownloadInvoiceSuccess(SettingList)
        ]),
        catchError(error => of(new actions.DownloadInvoiceFail(error)))
      );
    })
  );

  @Effect()
  exportPayment$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_PAYMENT),
    map((action: actions.ExportPaymentAction) => action.payload),
    switchMap(state => {
      return this.paymentService.exportPayment(state).pipe(
        tap(data => {
          const filename = 'VendorPaymentExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(response => [new actions.ExportPaymentSuccess(response)]),
        catchError(error => of(new actions.ExportPaymentFail(error)))
      );
    })
  );

  @Effect()
  exportAllPayment$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ALL_VENDOR_PAYMENT),
    map((action: actions.ExportAllVendorPaymentAction) => action.payload),
    switchMap(state => {
      return this.paymentService.exportAllPayment(state).pipe(
        tap(data => {
          const filename = 'VendorPaymentExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(response => [new actions.ExportAllVendorPaymentSuccess(response)]),
        catchError(error => of(new actions.ExportAllVendorPaymentFail(error)))
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
