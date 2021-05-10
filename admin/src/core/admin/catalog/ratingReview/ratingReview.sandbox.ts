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
import * as ratingReviewActions from './ratingReview-action/ratingReview.action';
// app state
import * as store from '../../../app.state.interface';
import { RatingReviewListModel } from './ratingReview-model/ratingReview-list.model';
import {
  getRatingReviewList,
  getRatingReviewListCount,
  getRatingReviewListDropDown
} from './ratingReview-reducer/ratingReview.selector';
import * as _ from 'lodash';

@Injectable()
export class RatingReviewSandbox {


  public ratingReviewList$ = this.appState.select(getRatingReviewList);
  public ratingReviewListCount$ = this.appState.select(getRatingReviewListCount);
  public ratingReviewListDropDown$ = this.appState.select(getRatingReviewListDropDown);

  constructor(
    protected appState: Store<store.AppState>) {
  }

  // Rating Review List
  public getRatingReviewList(value) {
    this.appState.dispatch(
      new ratingReviewActions.GetRatingReviewAction(
        new RatingReviewListModel(value)
      )
    );
  }

  // Rating Review List Count
  public getRatingReviewListCount(value) {
    this.appState.dispatch(
      new ratingReviewActions.GetRatingReviewCountAction(
        new RatingReviewListModel(value)
      )
    );
  }

}
