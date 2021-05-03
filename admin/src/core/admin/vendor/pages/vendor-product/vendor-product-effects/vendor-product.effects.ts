import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError } from 'rxjs/operators';
import * as actions from '../vendor-product-action/vendor-product.action';
import { VendorProductService } from '../vendor-product.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Injectable()
export class VendorProductEffects {
  constructor(
    private action$: Actions,
    public router: Router,
    private productService: VendorProductService
  ) {}

  @Effect()
  docatlist$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_CAT_LIST),
    map((action: actions.DoCatlistAction) => action.payload),
    switchMap(state => {
      return this.productService.catList(state).pipe(
        switchMap(lists => [new actions.DoCatlistSuccessAction(lists)]),
        catchError(error => of(new actions.DoCatlistFailAction(error)))
      );
    })
  );

  @Effect()
  sellerList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_SELLER_LIST),
    map((action: actions.GetSellerList) => action.payload),
    switchMap(state => {
      return this.productService.sellerList(state).pipe(
        switchMap(SellerList => [new actions.GetSellerListSuccess(SellerList)]),
        catchError(error => of(new actions.GetSellerListFail(error)))
      );
    })
  );

  @Effect()
  doProductAdd$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_ADD),
    map((action: actions.DoProductAddAction) => action.payload),
    switchMap(state => {
      return this.productService.productAdd(state).pipe(
        tap(data => {
          if (data) {
            this.router.navigate(['/vendors/vendor/product']);
          }
        }),
        switchMap(user => [new actions.DoProductAddSuccessAction(user)]),
        catchError(error => of(new actions.DoProductAddFailAction(error)))
      );
    })
  );
  @Effect()
  doProductCommision$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_COMMISSION),
    map((action: actions.DoProductCommissionAction) => action.payload),
    switchMap(state => {
      return this.productService.productCommission(state).pipe(
        tap(data => {
          // if (data) {
          //   this.router.navigate(['/vendors/vendor/product']);
          // }
        }),
        switchMap(user => [new actions.DoProductCommissionSuccessAction(user)]),
        catchError(error => of(new actions.DoProductCommissionFailAction(error)))
      );
    })
  );

  @Effect()
  doprodlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST),
    map((action: actions.GetProductlistAction) => action.payload),
    switchMap(state => {
      return this.productService.productList(state).pipe(
        switchMap(product => [
          new actions.GetProductlistSuccessAction(product)
        ]),
        catchError(error => of(new actions.GetProductlistFailAction(error)))
      );
    })
  );


  @Effect()
  doProductDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_DELETE),
    map((action: actions.DoProductDeleteAction) => action.payload),
    switchMap(state => {
      return this.productService.productDelete(state).pipe(
        switchMap(user => [new actions.DoProductDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoProductDeleteFailAction(error)))
      );
    })
  );




  @Effect()
  doSellerApproval$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_SELLER_APPROVAL),
    map((action: actions.DoSellerApproval) => action.payload),
    switchMap(state => {
      return this.productService.sellerApproval(state).pipe(
        switchMap(user => [new actions.DoSellerApprovalSuccess(user)]),
        catchError(error => of(new actions.DoSellerApprovalFail(error)))
      );
    })
  );

  @Effect()
  doProductStatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_STATUS),
    map((action: actions.DoSellerApproval) => action.payload),
    switchMap(state => {
      return this.productService.productStatus(state).pipe(
        switchMap(status => [new actions.DoProductStatusSuccess(status)]),
        catchError(error => of(new actions.DoProductStatusFail(error)))
      );
    })
  );

  @Effect()
  doProductUpdate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_UPDATE),
    map((action: actions.DoProductUpdateAction) => action.payload),
    switchMap(state => {
      return this.productService.productUpdate(state).pipe(
        switchMap(user => [new actions.DoProductUpdateSuccessAction(user)]),
        catchError(error => of(new actions.DoProductUpdateFailAction(error)))
      );
    })
  );


  @Effect()
  doDetail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
    map((action: actions.GetProductDetailAction) => action.payload),
    switchMap(state => {
      return this.productService.productDetail(state).pipe(
        switchMap(user => [new actions.GetProductDetailSuccess(user)]),
        catchError(error => of(new actions.GetProductDetailFail(error)))
      );
    })
  );


   // Product Excel
   @Effect()
   doProductExcel$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.GET_PRODUCT_EXCEL),
     map((action: actions.DoProductExcel) => action.payload),
     switchMap(state => {
       return this.productService.productExcel(state).pipe(
         tap(data => {
           const filename = 'ProductExcel_' + Date.now() + '.xlsx';
           const blob = new Blob([data], { type: 'text/xlsx' });
           saveAs(blob, filename);
         }),
         switchMap(user => [new actions.DoProductExcelSuccess(user)]),
         catchError(error => of(new actions.DoProductExcelFail(error)))
       );
     })
   );
   // Product Excel
   @Effect()
   doProductsExcel$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.GET_PRODUCTS_EXCEL),
     map((action: actions.DoProductsExcel) => action.payload),
     switchMap(state => {
       return this.productService.productAllExcel(state).pipe(
         tap(data => {
           const filename = 'ProductsExcel_' + Date.now() + '.xlsx';
           const blob = new Blob([data], { type: 'text/xlsx' });
           saveAs(blob, filename);
         }),
         switchMap(user => [new actions.DoProductsExcelSuccess(user)]),
         catchError(error => of(new actions.DoProductsExcelFail(error)))
       );
     })
   );

   @Effect()
   vendorProductCount$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.GET_VENDOR_PRODUCT_COUNT),
     map((action: actions.GetVendorProductCountAction) => action.payload),
     switchMap(state => {
       return this.productService.getVendorProductCounts().pipe(
         switchMap(lists => [new actions.GetVendorProductCountSuccess(lists)]),
         catchError(error => of(new actions.GetVendorProductCountFail(error)))
       );
     })
   );

   // get venor product list count for each vendor

   @Effect()
   productcount$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.VENDOR_PRODUCT_COUNT),
     map((action: actions.VendorProductCountAction) => action.payload),
     switchMap(state => {
       return this.productService.vendorProductCount(state).pipe(
         switchMap(lists => [new actions.VendorProductCountSuccess(lists)]),
         catchError(error => of(new actions.VendorProductCountFail(error)))
       );
     })
   );

   @Effect()
   manufacturerList$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.MANUFACTURER_LIST),
     map((action: actions.ManufacturerListAction) => action.payload),
     switchMap(state => {
       return this.productService.manufacturerList(state).pipe(
         switchMap(lists => [new actions.ManufacturerListSuccess(lists)]),
         catchError(error => of(new actions.ManufacturerListFail(error)))
       );
     })
   );

   @Effect()
   VariantList$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.VARIANT_LIST),
     map((action: actions.VariantListAction) => action.payload),
     switchMap(state => {
       return this.productService.variantList(state).pipe(
         switchMap(user => [new actions.VariantListSuccess(user)]),
         catchError(error => of(new actions.VariantListFail(error)))
       );
     })
   );

   @Effect()
   deleteProbabilityOption$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.DELETE_PROBABILITY_OPTION),
     map((action: actions.DeleteProbabilityOption) => action.payload),
     switchMap(state => {
       return this.productService.deleteProbabilityOption(state).pipe(
         switchMap(user => [new actions.DeleteProbabilityOptionSuccess(user)]),
         catchError(error => of(new actions.DeleteProbabilityOptionFail(error)))
       );
     })
   );

   @Effect()
   ProductListCount$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.PRODUCT_LIST_COUNT),
     map((action: actions.ProductListCountAction) => action.payload),
     switchMap(state => {
       return this.productService.productListCount(state).pipe(
         switchMap(lists => [new actions.ProductListCountSuccess(lists)]),
         catchError(error => of(new actions.ProductListCountFail(error)))
       );
     })
   );


}
