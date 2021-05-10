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
import * as actions from '../product-action/product.action';

import { catchError } from 'rxjs/operators';
// service
import { ProductService } from '../product.service';
import { tap } from 'rxjs/operators';
import * as store from '../../app.state.interface';
import { ProductSuccessComponent } from '../../../default/shared/popup/product-success/product-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Injectable()
export class ProductEffect {
  constructor(
    private action$: Actions,
    protected appState: Store<store.AppState>,
    private service: ProductService,
    private popup: NgbModal, public router: Router, public toaster: ToastrService
  ) { }

  @Effect()
  doProductAdd$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_ADD),
    map((action: actions.DoProductAddAction) => action.payload),
    switchMap(state => {
      return this.service.productAdd(state).pipe(

        tap(add => {
          const modalRef = this.popup.open(ProductSuccessComponent, {
            backdrop: 'static',
            keyboard: false
          });
        }),
        switchMap(user => [new actions.DoProductAddSuccessAction(user)]),
        catchError(error => of(new actions.DoProductAddFailAction(error)))
      );
    })
  );
    // Product detail
    @Effect()
    doDetail$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
      map((action: actions.GetProductDetailAction) => action.payload),
      switchMap(state => {
        return this.service.productDetail(state).pipe(
          switchMap(user => [new actions.GetProductDetailSuccess(user)]),
          catchError(error => of(new actions.GetProductDetailFail(error)))
        );
      })
    );
  @Effect()
  doProductDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_DELETE),
    map((action: actions.DoProductDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.productDelete(state).pipe(
        switchMap(user => [new actions.DoProductDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoProductDeleteFailAction(error.error))),
        tap(resp => {
          if (resp) {
          }
        })
      );
    })
  );
  @Effect()
  doProductBulkDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_BULK_PRODUCT_DELETE),
    map((action: actions.DoProductBulkDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.productBulkDelete(state).pipe(
        switchMap(user => [new actions.DoProductBulkDeleteSuccessAction(user)]),
        tap(data => {
          if (data) {
            this.toaster.success('Success', data.payload['message']);
          }
        }),
        catchError(error => of(new actions.DoProductBulkDeleteFailAction(error)))
      );
    })
  );
    // Product update
    @Effect()
    doProductUpdate$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.DO_PRODUCT_UPDATE),
      map((action: actions.DoProductUpdateAction) => action.payload),
      switchMap(state => {
        return this.service.productUpdate(state).pipe(
          switchMap(user => [new actions.DoProductUpdateSuccessAction(user)]),
          tap(resp => {
            if (resp) {
              this.router.navigate(['/products']);
            }
          }),
          catchError(error => of(new actions.DoProductUpdateFailAction(error)))
        );
      })
    );
    // product status change
  @Effect()
  doProductStatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_STATUS),
    map((action: actions.DoProductStatus) => action.payload),
    switchMap(state => {
      return this.service.productStatus(state).pipe(
        switchMap(status => [new actions.DoProductStatusSuccess(status)]),
        catchError(error => of(new actions.DoProductStatusFail(error)))
      );
    })
  );

  @Effect()
  getProductList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST),
    map((action: actions.GetProductlistAction) => action.payload),
    switchMap(state => {
      return this.service.productList(state).pipe(
        map(user => new actions.GetProductlistSuccessAction(user)),
        catchError(error => of(new actions.GetProductlistFailAction(error)))
      );
    })
  );

  @Effect()
  getStockStatusList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_STOCK_STATUS_LIST),
    map((action: actions.GetStockStatuslistAction) => action.payload),
    switchMap(state => {
      return this.service.stockStatusList(state).pipe(
        map(user => new actions.GetStockStatuslistSuccessAction(user)),
        catchError(error => of(new actions.GetStockStatuslistFailAction(error)))
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
  doTotalProductListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOTAL_PRODUCT_COUNT),
    map((action: actions.GetTotalProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.productCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetTotalProductCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetTotalProductCountFailAction(error))
        )
      );
    })
  );

  @Effect()
  doActiveCustomerListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ACTIVE_PRODUCT_COUNT),
    map((action: actions.GetActiveProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.productCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetActiveProductCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetActiveProductCountFailAction(error))
        )
      );
    })
  );

  @Effect()
  doInActiveProductListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_INACTIVE_PRODUCT_COUNT),
    map((action: actions.GetInActiveProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.productCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetInActiveProductCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetInActiveProductCountFailAction(error))
        )
      );
    })
  );

    // Manufacturer List
    @Effect()
    manufacturerList$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.MANUFACTURER_LIST),
      map((action: actions.ManufacturerListAction) => action.payload),
      switchMap(state => {
        return this.service.manufacturerList(state).pipe(
          switchMap(user => [new actions.ManufacturerListSuccessList(user)]),
          catchError(error => of(new actions.ManufacturerListFailList(error)))
        );
      })
    );

    // Change Quotation Status
    @Effect()
    changeQuotationStatus$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.CHANGE_QUOTATION_STATUS),
      map((action: actions.ChangeQuotationStatusAction) => action.payload),
      switchMap(state => {
        return this.service.changeQuotationStatus(state).pipe(
          switchMap(user => [new actions.ChangeQuotationStatusSuccess(user)]),
          catchError(error => of(new actions.ChangeQuotationStatusFail(error)))
        );
      })
    );

    @Effect()
    VariantList$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.VARIANT_LIST),
      map((action: actions.VariantListAction) => action.payload),
      switchMap(state => {
        return this.service.variantList(state).pipe(
          switchMap(user => [new actions.VariantListSuccess(user)]),
          catchError(error => of(new actions.VariantListFail(error)))
        );
      })
    );

    
        // Tax List
    @Effect()
    taxList$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.TAX_LIST),
      map((action: actions.TaxListAction) => action.payload),
      switchMap(state => {
        return this.service.taxList(state).pipe(
          switchMap(user => [new actions.TaxListSuccessList(user)]),
          catchError(error => of(new actions.TaxListFailList(error)))
        );
      })
    );


    @Effect()
    deleteProbabilityOption$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.DELETE_PROBABILITY_OPTION),
      map((action: actions.DeleteProbabilityOption) => action.payload),
      switchMap(state => {
        return this.service.deleteProbabilityOption(state).pipe(
          switchMap(user => [new actions.DeleteProbabilityOptionSuccess(user)]),
          catchError(error => of(new actions.DeleteProbabilityOptionFail(error)))
        );
      })
    );
}
