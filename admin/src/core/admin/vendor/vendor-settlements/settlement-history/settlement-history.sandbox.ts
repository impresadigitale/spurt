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
// store
import { Store } from '@ngrx/store';
// actions
import * as productActions from './settlement-history-action/settlement-history.action';
// app state
import * as store from '../../../../app.state.interface';
import { Subscription } from 'rxjs/index';

import { historyList, historyListCount, historyListLoaded, historyListLoading,
         settlementDetails} from './settlement-history-reducer/settlement-history.selector';

@Injectable()
export class SettlementHistorySandbox {
  public historyList$ = this.appState.select(historyList);
  public historyListCount$ = this.appState.select(historyListCount);
  public historyListLoaded$ = this.appState.select(historyListLoaded);
  public historyListLoading$ = this.appState.select(historyListLoading);

  public settlementDetails$ = this.appState.select(settlementDetails);



  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
  ) {  }

  public getSettlementHistoryList(value) {
    this.appState.dispatch(
      new productActions.SettlementHistoryListAction(value)
    );
  }

  public getSettlementHistoryListCount(value) {
    this.appState.dispatch(
      new productActions.SettlementHistoryListCountAction(value)
    );
  }

  public getSettlementDetails(value) {
    this.appState.dispatch(
      new productActions.SettlementDetailsAction(value)
    );
  }



}
