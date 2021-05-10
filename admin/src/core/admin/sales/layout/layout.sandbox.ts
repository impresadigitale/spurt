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
import * as catalogLayoutActions from './action/layout.action';

import {
  salesCount,
  salesCountLoading
} from './reducer/selectors';

@Injectable()
export class LayoutsSandbox {
  public salesCount$ = this.appState.select(
    salesCount
  );
  public salesCountLoading$ = this.appState.select(salesCountLoading);
  constructor(
    protected appState: Store<store.AppState>) {
    this.registerAuthEvents();
  }


  // get sales count

  public getSalesCount() {
    this.appState.dispatch(
      new catalogLayoutActions.GetSalesCountAction()
    );
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {}
}
