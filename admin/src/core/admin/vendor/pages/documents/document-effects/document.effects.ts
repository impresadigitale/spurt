 import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError } from 'rxjs/operators';
import * as actions from '../document-action/document-action';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Injectable()
export class DocumentEffects {
  constructor(
    private action$: Actions,
    public router: Router,
    private documentService: DocumentService
  ) {}

  @Effect()
  documentList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_LIST),
    map((action: actions.GetDocumentList) => action.payload),
    switchMap(state => {
      return this.documentService.documentList(state).pipe(
        switchMap(response => [new actions.GetDocumentListSuccess(response)]),
        catchError(error => of(new actions.GetDocumentListFail(error)))
      );
    })
  );

  @Effect()
  documentListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_LIST_COUNT),
    map((action: actions.GetDocumentListCount) => action.payload),
    switchMap(state => {
      return this.documentService.documentListCount(state).pipe(
        switchMap(response => [new actions.GetDocumentListCountSuccess(response)]),
        catchError(error => of(new actions.GetDocumentListCountFail(error)))
      );
    })
  );

  @Effect()
  documentDetail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_DETAIL),
    map((action: actions.GetDocumentDetail) => action.payload),
    switchMap(state => {
      return this.documentService.documentDetail(state).pipe(
        switchMap(response => [new actions.GetDocumentDetailSuccess(response)]),
        catchError(error => of(new actions.GetDocumentDetailFail(error)))
      );
    })
  );

  @Effect()
  documentStatusChange$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DOCUMENT_STATUS_CHANGE),
    map((action: actions.DocumentStatusChange) => action.payload),
    switchMap(state => {
      return this.documentService.documentStatusChange(state).pipe(
        switchMap(response => [new actions.DocumentStatusChangeSuccess(response)]),
        catchError(error => of(new actions.DocumentStatusChangeFail(error)))
      );
    })
  );

  @Effect()
  getInvoiceDetail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_DOCUMENT),
    map((action: actions.DownloadDocument) => action.payload),
    switchMap(state => {
      return this.documentService.downloadDocument(state).pipe(
        tap(data => {
          const filename = 'CustomerData_' + Date.now();
          const blob = new Blob([data], {type: data.type});
          saveAs(blob, filename);
        }),
        switchMap(SettingList => [
          new actions.DownloadDocumentSuccess(SettingList)
        ]),
        catchError(error => of(new actions.DownloadDocumentFail(error)))
      );
    })
  );

  downloadPdfFile(base64content: string, orderPrefixId: string) {
    const fileName = orderPrefixId.toUpperCase() + '-' + new Date();
    const blobData = this.convertBase64PDFToBlobData(base64content);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE
      window.navigator.msSaveOrOpenBlob(blobData, fileName);
    } else { // chrome
      const blob = new Blob([blobData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    }
  }
  convertBase64PDFToBlobData(base64Data: string, contentType: string = 'application/pdf', sliceSize = 512) {
    const byteCharacters = atob(base64Data.replace(/^data:([A-Za-z-+\/]+);base64,/, ''));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
