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
import * as store from '../../../app.state.interface';
import * as archivePaymentActions from './actions/archive-payments.action';
import { archivePaymentList, archivePaymentListLoading, archivePaymentListLoaded,
         archivePaymentListCount,
         archivePaymentListCountLoading,
         archivePaymentListCountLoaded} from './reducer/archive-payments.selector';

@Injectable()
export class ArchivePaymentSandbox {

  public archivePaymentList$ = this.appState.select(archivePaymentList);
  public archivePaymentListLoading$ = this.appState.select(archivePaymentListLoading);
  public archivePaymentListLoaded$ = this.appState.select(archivePaymentListLoaded);
  public archivePaymentListCount$ = this.appState.select(archivePaymentListCount);
  public archivePaymentListCountLoading$ = this.appState.select(archivePaymentListCountLoading);
  public archivePaymentListCountLoaded$ = this.appState.select(archivePaymentListCountLoaded);


constructor(protected appState: Store<store.AppState>) {}

// archive Payment list

public archivePaymentList(value: any) {
    this.appState.dispatch(
      new archivePaymentActions.ArchivePaymentListAction(value));
}

// archive Payment list count

public archivePaymentListCount(value: any) {
  this.appState.dispatch(
    new archivePaymentActions.ArchivePaymentListCountAction(value));
}


// export archive payment

public exportArchivePayment(value: any) {
  this.appState.dispatch(new archivePaymentActions.ExportArchivePaymentAction(value));
}

// export all archive payment

public exportAllArchivePayment(value: any) {
  this.appState.dispatch(new archivePaymentActions.ExportAllArchivePaymentAction(value));
}


}
