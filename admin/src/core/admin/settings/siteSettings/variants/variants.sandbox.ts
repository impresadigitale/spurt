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
import * as variantsActions from './variants-action/variants.action';
// app state
import * as store from '../../../../app.state.interface';
// router
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
// notifications
import { ToastrManager } from 'ng6-toastr-notifications';

import {
  // variants add selectors
  getProductAdd,
  ProductAddFailed,
  ProductAddLoaded,
  ProductAddLoading,

  // variants delete selectors
  getProductDelete,
  ProductDeleteFailed,
  ProductDeleteLoaded,
  ProductDeleteLoading,

  // variants list selectors
  getProductList,
  getProductListCount,
  ProductListFailed,
  ProductListLoaded,
  ProductListLoading,
  // variants update selectors
  getProductUpdate,
  ProductUpdateFailed,
  ProductUpdateLoaded,
  ProductUpdateLoading,
  variantsDetails
} from './variants-reducer/variants.selector';


@Injectable()
export class VariantsSandbox {
  public productOptionsList$ = this.appState.select(getProductList);
  public getProductOptionsListCount$ = this.appState.select(
    getProductListCount
  );
  public deleteVariant$ = this.appState.select(getProductDelete);
  public productOptionsAdd$ = this.appState.select(getProductAdd);
  public productOptionsUpdate$ = this.appState.select(getProductUpdate);

  public productOptionsListLoading$ = this.appState.select(ProductListLoading);
  public productOptionsListLoaded$ = this.appState.select(ProductListLoaded);
  public productOptionsListFailed$ = this.appState.select(ProductListFailed);

  public productOptionsDeleteLoading$ = this.appState.select(
    ProductDeleteLoading
  );
  public productOptionsDeleteLoaded$ = this.appState.select(
    ProductDeleteLoaded
  );
  public productOptionsDeleteFailed$ = this.appState.select(
    ProductDeleteFailed
  );

  public productOptionsAddLoading$ = this.appState.select(ProductAddLoading);
  public productOptionsAddLoaded$ = this.appState.select(ProductAddLoaded);
  public productOptionsAddFailed$ = this.appState.select(ProductAddFailed);

  public productOptionsUpdateLoading$ = this.appState.select(
    ProductUpdateLoading
  );
  public productOptionsUpdateLoaded$ = this.appState.select(
    ProductUpdateLoaded
  );
  public productOptionsUpdateFailed$ = this.appState.select(
    ProductUpdateFailed
  );

  public variantsDetails$ = this.appState.select(variantsDetails);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.subscribe();
  }

  public getVariantsList(value) {
    this.appState.dispatch(
      new variantsActions.GetVariantsListAction(value));
  }

  public getVariantsListCount(value) {
    this.appState.dispatch(
      new variantsActions.GetVariantsListCountAction(value));
  }

  public doVariantsDelete(value) {
    this.appState.dispatch(
      new variantsActions.DoVariantsDeleteAction(value));
  }

  public doVariantsAdd(value) {
    this.appState.dispatch(
      new variantsActions.DoVariantsAddAction(value));
  }

  public doVariantsUpdate(value) {
    this.appState.dispatch(
      new variantsActions.DoVariantsUpdateAction(value)
    );
  }

  public getVariantDetails(value) {
    this.appState.dispatch(
      new variantsActions.GetVariantsDetailsAction(value)
    );
  }


  public resetVariants() {
    this.appState.dispatch(new variantsActions.DoResetVariants());
  }

  subscribe() {
    this.productOptionsAdd$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/settings/sitesettings/variants']);
      }
    });
    this.productOptionsUpdate$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/settings/sitesettings/variants']);
      }
    });
  }
}
