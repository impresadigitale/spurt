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
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../payment-action/payment.action';

import { catchError } from 'rxjs/operators';
// service
import { PaymentService } from '../payment.service';
import { tap } from 'rxjs/operators';
import * as store from '../../app.state.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Injectable()
export class PaymentEffect {
  constructor(
    private action$: Actions,
    protected appState: Store<store.AppState>,
    private service: PaymentService,
    private popup: NgbModal, public router: Router, public toaster: ToastrService
  ) { }


  @Effect()
  doPaymentDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PAYMENT_DELETE),
    map((action: actions.DoPaymentDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.paymentDelete(state).pipe(
        switchMap(user => [new actions.DoPaymentDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoPaymentDeleteFailAction(error)))
      );
    })
  );
  @Effect()
  doPaymentBulkDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_BULK_PAYMENT_DELETE),
    map((action: actions.DoPaymentBulkDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.paymentBulkDelete(state).pipe(
        switchMap(user => [new actions.DoPaymentBulkDeleteSuccessAction(user)]),
        tap(data => {
          if (data) {
            this.toaster.success('Success', data.payload['message']);
          }
        }),
        catchError(error => of(new actions.DoPaymentBulkDeleteFailAction(error)))
      );
    })
  );

    // payment status change
  @Effect()
  doPaymentStatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_STATUS),
    map((action: actions.DoPaymentStatus) => action.payload),
    switchMap(state => {
      return this.service.paymentStatus(state).pipe(
        switchMap(status => [new actions.DoPaymentStatusSuccess(status)]),
        catchError(error => of(new actions.DoPaymentStatusFail(error)))
      );
    })
  );

  @Effect()
  getPaymentList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PAYMENT_LIST),
    map((action: actions.GetPaymentlistAction) => action.payload),
    switchMap(state => {
      return this.service.paymentList(state).pipe(
        map(user => new actions.GetPaymentlistSuccessAction(user)),
        catchError(error => of(new actions.GetPaymentlistFailAction(error)))
      );
    })
  );
  @Effect()
  getArchivePaymentList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ARCHIVE_PAYMENT_LIST),
    map((action: actions.GetArchivePaymentlistAction) => action.payload),
    switchMap(state => {
      return this.service.archivePaymentList(state).pipe(
        map(user => new actions.GetArchivePaymentlistSuccessAction(user)),
        catchError(error => of(new actions.GetArchivePaymentlistFailAction(error)))
      );
    })
  );
  @Effect()
  getCategoryList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_CATEGORIES_LIST),
    map((action: actions.GetCategorieslistAction) => action.payload),
    switchMap(state => {
      return this.service.categoryList(state).pipe(
        map(user => new actions.GetCategorieslistSuccessAction(user)),
        catchError(error => of(new actions.GetCategorieslistFailAction(error)))
      );
    })
  );
  @Effect()
  doTotalPaymentListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOTAL_PAYMENT_COUNT),
    map((action: actions.GetTotalPaymentCountAction) => action.payload),
    switchMap(state => {
      return this.service.paymentCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetTotalPaymentCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetTotalPaymentCountFailAction(error))
        )
      );
    })
  );

  @Effect()
  doActiveCustomerListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ACTIVE_PAYMENT_COUNT),
    map((action: actions.GetEarningCountAction) => action.payload),
    switchMap(state => {
      return this.service.earningPaymentCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetEarningCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetEarningCountFailAction(error))
        )
      );
    })
  );

  @Effect()
  downloadMainPriceCsv$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_PAYMENT),
    map((action: actions.ExportPayment) => action.payload),
    switchMap(state => {
      return this.service.exportPayment(state).pipe(
        tap(data => {
          const filename = 'payment_list_' + Date.now() + '.xlsx';
          const blob = new Blob([data], {type: 'text/xlsx'});
          saveAs(blob, filename);
      }),
        switchMap(response => [
          new actions.ExportPaymentSuccess(response)
        ]),
        catchError(error =>
          of(new actions.ExportPaymentFail(error))
        )
      );
    })
  );
  @Effect()
  makeArchive$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.MAKE_ARCHIVE),
    map((action: actions.MakeArchive) => action.payload),
    switchMap(state => {
      return this.service.makeArchive(state).pipe(
        switchMap(response => [
          new actions.MakeArchiveSuccess(response)
        ]),
        catchError(error =>
          of(new actions.MakeArchiveFail(error))
        )
      );
    })
  );
  @Effect()
  uploadMainPriceCsv$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_EARNINGS),
    map((action: actions.ExportEarning) => action.payload),
    switchMap(state => {
      return this.service.exportEarning(state).pipe(
        tap(data => {
          const filename = 'earnings_list_' + Date.now() + '.xlsx';
          const blob = new Blob([data], {type: 'text/xlsx'});
          saveAs(blob, filename);
      }),
        switchMap(response => [
          new actions.ExportEarningSuccess(response)
        ]),
        tap(data => {
          if (data) {
            this.toaster.success('Success', data['payload']['message']);
          }
        }),
        catchError(error =>
          of(new actions.ExportEarningFail(error))
        )
      );
    })
  );

  @Effect()
  priceCsvList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.MULTIPLE_PAYMENT_EXPORT),
    map((action: actions.MultiplePaymentExport) => action.payload),
    switchMap(state => {
      return this.service.multiplePaymentExport(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'payment_list_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        switchMap(response => [
          new actions.MultiplePaymentExportSuccess(response)
        ]),
        catchError(error =>
          of(new actions.MultiplePaymentExportFail(error))
        )
      );
    })
  );

  @Effect()
  multipleEarningExport$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.MULTIPLE_EARNINGS_EXPORT),
    map((action: actions.MultipleEarningExport) => action.payload),
    switchMap(state => {
      return this.service.multipleEarningExport(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'earnings_list_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        switchMap(response => [
          new actions.MultipleEarningExportSuccess(response)
        ]),
        catchError(error =>
          of(new actions.MultipleEarningExportFail(error))
        )
      );
    })
  );

  @Effect()
  deleteCsvList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_CSV_LIST),
    map((action: actions.DeleteCsvList) => action.payload),
    switchMap(state => {
      return this.service.deleteCsvList(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.DeleteCsvListSuccess(response)
        ]),
        tap(data => {
          if (data) {
          }
        }),
        catchError(error =>
          of(new actions.DeleteCsvListFail(error))
        )
      );
    })
  );



  @Effect()
  downloadInvoice$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_INVOICE),
    map((action: actions.DownloadInvoice) => action.payload),
    switchMap(state => {
      return this.service.downloadInvoice(state).pipe(
             tap(data => {
            const linkSource = data.data;
            const downloadLink = document.createElement('a');
            const fileName = 'Invoice_' + Date.now() + '.pdf';
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
          }),
        switchMap(response => [
          new actions.DownloadInvoiceSuccess(response)
        ]),
        catchError(error =>
          of(new actions.DownloadInvoiceFail(error))
        )
      );
    })
  );

  @Effect()
  makePaymentArchive$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.MAKE_PAYMENT_ARCHIVE),
    map((action: actions.MakePaymentArchiveAction) => action.payload),
    switchMap(state => {
      return this.service.makePaymentArchive(state).pipe(
        switchMap(user => [new actions.MakePaymentArchiveSuccess(user)]),
        catchError(error => of(new actions.MakePaymentArchiveFail(error)))
      );
    })
  );


  @Effect()
  archivePaymentCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT),
    map((action: actions.ArchivePaymentListCountAction) => action.payload),
    switchMap(state => {
      return this.service.archivePaymentCount(state).pipe(
        switchMap(user => [new actions.ArchivePaymentListCountSuccess(user)]),
        catchError(error => of(new actions.ArchivePaymentListCountFail(error)))
      );
    })
  );

  @Effect()
  archivePaymentExport$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ARCHIVE_PAYMENT),
    map((action: actions.ExportArchivePaymentAction) => action.payload),
    switchMap(state => {
      return this.service.exportArchivePayment(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'archive_payment_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        switchMap(user => [new actions.ExportArchivePaymentSuccess(user)]),
        catchError(error => of(new actions.ExportArchivePaymentFail(error)))
      );
    })
  );

  @Effect()
  archivePaymentExportAll$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT),
    map((action: actions.ExportAllArchivePaymentAction) => action.payload),
    switchMap(state => {
      return this.service.exportAllArchivePayment(state).pipe(
        tap(data => {
          if (data) {
            const filename = 'archive_payment_all_' + Date.now() + '.xlsx';
            const blob = new Blob([data], {type: 'text/xlsx'});
            saveAs(blob, filename);
          }
        }),
        switchMap(user => [new actions.ExportAllArchivePaymentSuccess(user)]),
        catchError(error => of(new actions.ExportAllArchivePaymentFail(error)))
      );
    })
  );

}
