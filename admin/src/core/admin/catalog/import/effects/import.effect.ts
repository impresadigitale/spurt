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
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';


// actions
import * as actions from '../action/import.action';
import { catchError } from 'rxjs/operators';
// service
import { ImportService } from '../import.service';

@Injectable()
export class ImportEffects {

  constructor(private action$: Actions,
              private apiCli: ImportService) {}

  // Download File

  @Effect()
  downloadFile$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_FILE),
    map((action: actions.DownloadFileAction) => action.payload),
    switchMap(state => {
      return this.apiCli.downloadFile(state).pipe(
        tap(data => {
          const blob = new Blob([data], {type: 'application/zip'});
          const fileName = 'products.zip';
          saveAs(blob, fileName);
        }),
        switchMap(user => [new actions.DownloadFileSuccessAction(user)]),
        catchError(error => of(new actions.DownloadFileFailAction(error)))
      );
    })
  );

  // Upload File

  @Effect()
  uploadFile$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.UPLOAD_FILE),
    map((action: actions.UploadFileAction) => action.payload),
    switchMap(state => {
      return this.apiCli.uploadFile(state).pipe(
        switchMap(user => [new actions.UploadFileSuccessAction(user)]),
        catchError(error => of(new actions.UploadFileFailAction(error)))
      );
    })
  );


}
