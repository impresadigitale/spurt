/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Map, Record } from 'immutable';

export interface RatingReviewState extends Map<string, any> {
  ratingReviewList: any;
  ratingReviewCount: any;
  ratingReviewDropDown: any;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;
}

export const RatingReviewStateRecord = Record({
  ratingReviewList: [],
  ratingReviewCount: 0,
  ratingReviewDropDown: {},

  listLoading: false,
  listLoaded: false,
  listFailed: false,

  countLoading: false,
  countLoaded: false,
  countFailed: false
});
