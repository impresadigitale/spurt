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
import { Store } from '@ngrx/store';
import * as store from './../../../app.state.interface';
import * as paymentActions from './payments-action/payments.action';
import { paymentList, paymentListCount, paymentListLoaded, paymentListLoading,
         makePaymentArchive, makePaymentArchiveLoaded,
        makePaymentArchiveLoading} from './payments-reducer/payments.selector';
import { PaymentListRequestModel } from './payments-models/payments-list-request.model';


@Injectable()
export class PaymentsSandbox {

  public paymentList$ = this.appState.select(paymentList);
  public paymentListCount$ = this.appState.select(paymentListCount);
  public paymentListLoaded$ = this.appState.select(paymentListLoaded);
  public paymentListLoading$ = this.appState.select(paymentListLoading);

  public makePaymentArchive$ = this.appState.select(makePaymentArchive);
  public makePaymentArchiveLoaded$ = this.appState.select(makePaymentArchiveLoaded);
  public makePaymentArchiveLoading$ = this.appState.select(makePaymentArchiveLoading);


constructor(protected appState: Store<store.AppState>) {}



// payments list

public getPaymentList(value: any) {
    this.appState.dispatch(new paymentActions.GetPaymentListAction(new PaymentListRequestModel(value)));
}

// payments list count

public getPaymentListCount(value: any) {
    this.appState.dispatch(new paymentActions.GetPaymentListCountAction(new PaymentListRequestModel(value)));
}

// Download Invoice

public downloadInvoice(value: any) {
  this.appState.dispatch(new paymentActions.DownloadInvoiceAction(value));
}

// Export Payment

public exportPayment(value: any) {
  this.appState.dispatch(new paymentActions.ExportPaymentAction(value));
}

// Export All Payment

public exportAllPayment(value: any) {
  this.appState.dispatch(new paymentActions.ExportAllPaymentAction(value));
}

// make payment archive

public makePaymentArchive(value: any) {
  this.appState.dispatch(new paymentActions.MakePaymentArchiveAction(value));
}
}
