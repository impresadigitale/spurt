/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility/utilityHelpers';
// model
import { RatingReviewListModel } from '../ratingReview-model/ratingReview-list.model';

export const ActionTypes = {
  GET_RATING_REVIEW_LIST: type('[List] Do Rating Review list'),
  GET_RATING_REVIEW_LIST_SUCCESS: type('[List] Do Rating Review list Success'),
  GET_RATING_REVIEW_LIST_FAIL: type('[List] Do Rating Review list Fail'),
  GET_RATING_REVIEW_COUNT_LIST: type(
    '[List Count] Do Rating Review Count list'
  ),
  GET_RATING_REVIEW_COUNT_LIST_SUCCESS: type(
    '[List Count] Do Rating Review Count list Success'
  ),
  GET_RATING_REVIEW_COUNT_LIST_FAIL: type(
    '[List Count] Do Rating Review  Count list Fail'
  )
};

// product list action
export class GetRatingReviewAction implements Action {
  type = ActionTypes.GET_RATING_REVIEW_LIST;

  constructor(public payload: RatingReviewListModel) {
  }
}

export class GetRatingReviewSuccessAction implements Action {
  type = ActionTypes.GET_RATING_REVIEW_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetRatingReviewFailAction implements Action {
  type = ActionTypes.GET_RATING_REVIEW_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// product list count action
export class GetRatingReviewCountAction implements Action {
  type = ActionTypes.GET_RATING_REVIEW_COUNT_LIST;

  constructor(public payload: RatingReviewListModel) {}
}

export class GetRatingReviewCountSuccessAction implements Action {
  type = ActionTypes.GET_RATING_REVIEW_COUNT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetRatingReviewCountFailAction implements Action {
  type = ActionTypes.GET_RATING_REVIEW_COUNT_LIST_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | GetRatingReviewAction
  | GetRatingReviewSuccessAction
  | GetRatingReviewFailAction
  | GetRatingReviewCountAction
  | GetRatingReviewCountSuccessAction
  | GetRatingReviewCountFailAction;
