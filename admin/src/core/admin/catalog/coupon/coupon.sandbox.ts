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
// app state
import * as store from '../../../app.state.interface';
// action
import * as couponActions from './action/coupon.action';
// model
import { CouponlistForm } from './models/couponlist.model';
import { CoupondeleteForm } from './models/coupondelete.model';
import {
  // coupon list selectors
  getCouponList,
  getCouponListResponse,
  getCouponListRequestLoading,
  getCouponListRequestLoaded,
  getCouponListRequestFailed,
  getCouponListnCount,
  // coupon count selectors
  getCouponCountRequestFailed,
  getCouponCountRequestLoaded,
  getCouponCountResponse,
  getCouponCountRequestLoading,
  getCouponCountdata,
  // coupon update selectors
  getUpdateCatagory,
  getUpdateCouponBadresponse,
  getUpdateCouponResponse,
  getUpdateCouponRequestLoading,
  getUpdateCouponRequestLoaded,
  getUpdateCouponRequestFailed,
  // coupon delete selectors
  getCouponDoDelete,
  getDeleteCouponResponse,
  getDeleteCouponRequestLoading,
  getDeleteCouponRequestLoaded,
  getDeleteCouponRequestFailed,
  // coupon add selectors
  getAddCatagoryStatus,
  getAddCatagoryData,
  getAddCouponResponse,
  getAddCouponRequestLoading,
  getAddCouponRequestLoaded,
  getAddCouponRequestFailed,
  // product add selectors
  getProductAddResponse,
  getProductAddRequestLoading,
  getProductAddRequestLoaded,
  getProductAddRequestFailed,
  // product remove selectors
  getProductRemoveResponse,
  getProductRemoveRequestLoading,
  getProductRemoveRequestLoaded,
  getProductRemoveRequestFailed,
  getCouponFilterList,
  getCouponDoGet, getGetCouponRequestFailed, getGetCouponRequestLoaded, getGetCouponRequestLoading, getGetCouponResponse,
  getProductList,
  getProductListLoading,
  getProductListLoaded,
  getProductListFailed
} from './reducer/coupon.selectors';
import { CouponForm } from './models/coupon.model';
import { CouponupdateForm } from '././models/couponupdate.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { CouponcountForm } from '././models/couponcount.model';
import * as _ from 'lodash';

@Injectable()
export class CouponSandbox {
  public levelsloop: any = [];
  public getCouponList$ = this.appState.select(getCouponList);
  // CouponFilterList
  public getCouponFilterList$ = this.appState.select(getCouponFilterList);

  public getCouponListCount$ = this.appState.select(getCouponListnCount);
  public getCouponDelete$ = this.appState.select(getCouponDoDelete);
  public getCouponGet$ = this.appState.select(getCouponDoGet);
  public getAddCoupon$ = this.appState.select(getAddCatagoryStatus);
  public getAddCoupondata$ = this.appState.select(getAddCatagoryData);
  public getUpdateCouponData$ = this.appState.select(getUpdateCatagory);
  public getUpdateCouponountdatas$ = this.appState.select(
    getCouponCountdata
  );
  public getUpdateCouponBadresponse$ = this.appState.select(
    getUpdateCouponBadresponse
  );

  public getDeleteCouponResponse$ = this.appState.select(
    getDeleteCouponResponse
  );
  public getDeleteCouponRequestLoading$ = this.appState.select(
    getDeleteCouponRequestLoading
  );
  public getDeleteCouponRequestLoaded$ = this.appState.select(
    getDeleteCouponRequestLoaded
  );
  public getDeleteCouponRequestFailed$ = this.appState.select(
    getDeleteCouponRequestFailed
  );

  public getGetCouponResponse$ = this.appState.select(
    getGetCouponResponse
  );
  public getGetCouponRequestLoading$ = this.appState.select(
    getGetCouponRequestLoading
  );
  public getGetCouponRequestLoaded$ = this.appState.select(
    getGetCouponRequestLoaded
  );
  public getGetCouponRequestFailed$ = this.appState.select(
    getGetCouponRequestFailed
  );

  public getCouponCountResponse$ = this.appState.select(
    getCouponCountResponse
  );
  public getCouponCountRequestLoading$ = this.appState.select(
    getCouponCountRequestLoading
  );
  public getCouponCountRequestLoaded$ = this.appState.select(
    getCouponCountRequestLoaded
  );
  public getCouponCountRequestFailed$ = this.appState.select(
    getCouponCountRequestFailed
  );

  public getCouponListResponse$ = this.appState.select(
    getCouponListResponse
  );
  public getCouponListRequestLoading$ = this.appState.select(
    getCouponListRequestLoading
  );
  public getCouponListRequestLoaded$ = this.appState.select(
    getCouponListRequestLoaded
  );
  public getCouponListRequestFailed$ = this.appState.select(
    getCouponListRequestFailed
  );

  public getUpdateCouponResponse$ = this.appState.select(
    getUpdateCouponResponse
  );
  public getUpdateCouponRequestLoading$ = this.appState.select(
    getUpdateCouponRequestLoading
  );
  public getUpdateCouponRequestLoaded$ = this.appState.select(
    getUpdateCouponRequestLoaded
  );
  public getUpdateCouponRequestFailed$ = this.appState.select(
    getUpdateCouponRequestFailed
  );

  public getAddCouponResponse$ = this.appState.select(
    getAddCouponResponse
  );
  public getAddCouponRequestLoading$ = this.appState.select(
    getAddCouponRequestLoading
  );
  public getAddCouponRequestLoaded$ = this.appState.select(
    getAddCouponRequestLoaded
  );
  public getAddCouponRequestFailed$ = this.appState.select(
    getAddCouponRequestFailed
  );

  public getProductAddResponse$ = this.appState.select(getProductAddResponse);
  public getProductAddRequestLoading$ = this.appState.select(
    getProductAddRequestLoading
  );
  public getProductAddRequestLoaded$ = this.appState.select(
    getProductAddRequestLoaded
  );
  public getProductAddRequestFailed$ = this.appState.select(
    getProductAddRequestFailed
  );

  public getProductRemoveResponse$ = this.appState.select(
    getProductRemoveResponse
  );
  public getProductRemoveRequestLoading$ = this.appState.select(
    getProductRemoveRequestLoading
  );
  public getProductRemoveRequestLoaded$ = this.appState.select(
    getProductRemoveRequestLoaded
  );
  public getProductRemoveRequestFailed$ = this.appState.select(
    getProductRemoveRequestFailed
  );

  // product list

  public getProductList$ = this.appState.select(getProductList);
  public getProductListLoading$ = this.appState.select(getProductListLoading);
  public getProductListLoaded$ = this.appState.select(getProductListLoaded);
  public getProductListFailed$ = this.appState.select(getProductListFailed);


  public parentLevels: any = [];

  constructor(
    protected appState: Store<store.AppState>,
    private toastr: ToastrManager,
    private router: Router
  ) {
    this.subscribe();
  }

  public couponList(value) {
    this.appState.dispatch(
      new couponActions.DoCouponlistAction(new CouponlistForm(value))
    );
  }

  public couponListCount(value) {
    this.appState.dispatch(
      new couponActions.DoCouponcountAction(
        new CouponcountForm(value)
      )
    );
  }

  public couponDelete(value) {
    this.appState.dispatch(
      new couponActions.DoDeleteCouponAction(
        new CoupondeleteForm(value)
      )
    );
  }

  public couponDetails(value) {
    this.appState.dispatch(
      new couponActions.DoGetCouponAction(
        value
      )
    );
  }
  public addCoupon(value) {
    this.appState.dispatch(
      new couponActions.DoAddCouponAction(value)
    );
  }

  public updateCoupon(value) {
    this.appState.dispatch(
      new couponActions.DoUpdateCouponAction(value));
  }

  public Productremove(value) {
    this.appState.dispatch(new couponActions.DoProductremoveAction(value));
  }

  public Productadd(value) {
    this.appState.dispatch(new couponActions.DoProductaddAction(value));
  }

  public getProductList(value) {
    this.appState.dispatch(new couponActions.GetProductListAction(value));
  }

  public subscribe() {
    this.getAddCoupon$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/catalog/coupon']);
      }
    });

    this.getUpdateCouponData$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/catalog/coupon']);
      }
    });

  }
}
