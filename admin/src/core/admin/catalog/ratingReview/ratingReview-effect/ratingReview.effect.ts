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
// actions
import * as actions from '../ratingReview-action/ratingReview.action';
import { catchError } from 'rxjs/operators';
// service
import { RatingReviewService } from '../ratingReview.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Injectable()
export class RatingReviewEffect {
  constructor(
    private action$: Actions,
    private service: RatingReviewService,
    private toastr: ToastrManager
  ) {}

  // Product list
  @Effect()
  dorating_reviewlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_RATING_REVIEW_LIST),
    map((action: actions.GetRatingReviewAction) => action.payload),
    switchMap(state => {
      return this.service.ratingReviewList(state).pipe(
        switchMap(product => [
          new actions.GetRatingReviewSuccessAction(product)
        ]),
        catchError(error => of(new actions.GetRatingReviewFailAction(error)))
      );
    })
  );

  // Product list
  @Effect()
  dorating_reviewlistscount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_RATING_REVIEW_COUNT_LIST),
    map((action: actions.GetRatingReviewCountAction) => action.payload),
    switchMap(state => {
      return this.service.ratingReviewListCount(state).pipe(
        switchMap(product => [
          new actions.GetRatingReviewCountSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.GetRatingReviewCountFailAction(error))
        )
      );
    })
  );
  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }

  private showSuccess(message) {
    this.toastr.successToastr(message);
  }
}
