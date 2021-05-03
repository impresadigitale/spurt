/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../app.state.interface';
import { catchError } from 'rxjs/operators';
import * as actions from './../action/common.action';
import { CommonService } from '../common.service';
import { saveAs } from 'file-saver';

@Injectable()
export class CommonEffect {
  constructor(
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authApi: CommonService
  ) {}

  @Effect()
  getWishlistCount$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_WISHLIST_COUNT),
    map((action: actions.GetWishlistCount) => action.payload),
    switchMap(state => {
      return this.authApi.getWishlistCount(state).pipe(
        map(wishlish => new actions.GetWishlistCountSuccess(wishlish)),
        catchError(error => of(new actions.GetWishlistCountFail(error)))
      );
    })
  );
  @Effect()
  getProfile$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PROFILE),
    map((action: actions.GetProfile) => action.payload),
    switchMap(state => {
      return this.authApi.doGetProfile(state).pipe(
        tap(val => {
          if (val) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('vendorUser', JSON.stringify(val.data));
            }
          }
        }),
        map(profile => new actions.GetProfileSuccess(profile)),
        catchError(error => of(new actions.GetProfileFail(error)))
      );
    })
  );
  @Effect()
  updateDocument$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.UPDATE_DOCUMENT),
    map((action: actions.GetProfile) => action.payload),
    switchMap(state => {
      return this.authApi.updateDocument(state).pipe(
        map(profile => new actions.GetUpdateDocumentSuccess(profile)),
        catchError(error => of(new actions.GetUpdateDocumentFail(error)))
      );
    })
  );
  @Effect()
  downloadDocument$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_DOCUMENT),
    map((action: actions.DownloadDocument) => action.payload),
    switchMap(state => {
      return this.authApi.downloadDocument(state).pipe(
        tap(data => {
          const filename = 'customer_' + Date.now();
          const blob = new Blob([data], {type: data.type});
          saveAs(blob, filename);
        }),
        map(profile => new actions.GetDownloadDocumentSuccess(profile)),
        catchError(error => of(new actions.GetDownloadDocumentFail(error)))
      );
    })
  );
  @Effect()
  getSettings$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SETTINGS),
    map((action: actions.GetSetting) => action.payload),
    switchMap(state => {
      return this.authApi.doGetSettings(state).pipe(
        tap(val => {
          if (val.data) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('vendor-settings', JSON.stringify(val.data[0]));
            }
          }
        }),
        map(profile => new actions.GetSettingSuccess(profile)),
        catchError(error => of(new actions.GetSettingFail(error)))
      );
    })
  );
  @Effect()
  editProfile$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.EDIT_PROFILE),
    map((action: actions.EditProfile) => action.payload),
    switchMap(state => {
      return this.authApi.doEditProfile(state).pipe(
        tap(val => {
          if (val) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('vendorUser', JSON.stringify(val.data));
            }
          }
        }),
        map(profile => new actions.EditProfileSuccess(profile)),
        catchError(error => of(new actions.EditProfileFail(error)))
      );
    })
  );
  @Effect()
  getLanguage$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_LANGUAGELIST),
    map((action: actions.GetLanguage) => action.payload),
    switchMap(state => {
      return this.authApi.getLanguage(state).pipe(
        map(wishlish => new actions.GetLanguageSuccess(wishlish)),
        catchError(error => of(new actions.GetLanguageFail(error)))
      );
    })
  );

@Effect()
getCountry$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.GET_COUNTRY_LIST),
  map((action: actions.GetCountry) => action.payload),
  switchMap(state => {
    return this.authApi.getCounty(state).pipe(
      map(wishlish => new actions.GetCountrySuccess(wishlish)),
      catchError(error => of(new actions.GetCountryFail(error)))
    );
  })
);
@Effect()
getDocument$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.GET_DOCUMENT_LIST),
  map((action: actions.GetDocument) => action.payload),
  switchMap(state => {
    return this.authApi.getDocument(state).pipe(
      map(wishlish => new actions.GetDocumentSuccess(wishlish)),
      catchError(error => of(new actions.GetDocumentFail(error)))
    );
  })
);
@Effect()
getDocumentCount$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.GET_DOCUMENT_COUNT),
  map((action: actions.GetDocumentCount) => action.payload),
  switchMap(state => {
    return this.authApi.getDocumentCount(state).pipe(
      map(wishlish => new actions.GetDocumentCountSuccess(wishlish)),
      catchError(error => of(new actions.GetDocumentCountFail(error)))
    );
  })
);

@Effect()
getZoneList$: Observable<Action> = this.actions$.pipe(
  ofType(actions.ActionTypes.GET_ZONE_LIST),
  map((action: actions.GetZoneList) => action.payload),
  switchMap(state => {
    return this.authApi.getZone(state).pipe(
      map(wishlish => new actions.GetZoneListSuccess(wishlish)),
      catchError(error => of(new actions.GetZoneListFail(error)))
    );
  })
);
}
