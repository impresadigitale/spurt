/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
// action
import * as actions from '../ratingReview-action/ratingReview.action';
// state
import {
  RatingReviewState,
  RatingReviewStateRecord
} from './ratingReview.state';
import { RatingReviewListResponseModel } from '../ratingReview-model/ratingReview-list-response.model';
export const initialState: RatingReviewState = new RatingReviewStateRecord() as unknown as RatingReviewState;

export function reducer(
  state = initialState,
  { type, payload }: any
): RatingReviewState {
  if (!type) {
    return state;
  }

  switch (type) {

// <-------------GET RATING REVIEW LIST--------------> //

    case actions.ActionTypes.GET_RATING_REVIEW_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }

    case actions.ActionTypes.GET_RATING_REVIEW_LIST_SUCCESS: {
      const ratingReviewModel = payload.data.map(_products => {
        const tempProductModel = new RatingReviewListResponseModel(_products);
        return tempProductModel;
      });
      let ratingReviewDropDownModel = [];
      if (!state.ratingReviewDropDown) {
        ratingReviewDropDownModel = payload.data.map(list => {
          const tempratingReviewFilterModel = new RatingReviewListResponseModel(
            list
          );
          return tempratingReviewFilterModel;
        });
      } else {
        ratingReviewDropDownModel = state.ratingReviewDropDown;
      }
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: false,
        ratingReviewDropDown: ratingReviewDropDownModel,
        ratingReviewList: ratingReviewModel
      });
    }

    case actions.ActionTypes.GET_RATING_REVIEW_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: false,
        listFailed: true
      });
    }

// <-------------GET RATING REVIEW LIST COUNT--------------> //

    case actions.ActionTypes.GET_RATING_REVIEW_COUNT_LIST: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }

    case actions.ActionTypes.GET_RATING_REVIEW_COUNT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: false,
        ratingReviewCount: payload.data
      });
    }

    case actions.ActionTypes.GET_RATING_REVIEW_COUNT_LIST_FAIL: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }


    default: {
      return state;
    }
  }
}

export const getRatingReviewList = (state: RatingReviewState) =>
  state.ratingReviewList;
export const getRatingReviewListCount = (state: RatingReviewState) =>
  state.ratingReviewCount;
export const getRatingReviewListDropDown = (state: RatingReviewState) =>
  state.ratingReviewDropDown;
