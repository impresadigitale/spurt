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
// import {ProductOptionsAddResponseModel} from '../ratingReview-model/productOptions-add-response.model';

export interface SettlementHistoryState extends Map<string, any> {

  historyList: any;
  historyListCount: any;
  historyListLoading: boolean;
  historyListLoaded: boolean;
  historyListFailed: boolean;

  settlementDetails: any;
  settlementDetailsLoading: boolean;
  settlementDetailsLoaded: boolean;
  settlementDetailsFailed: boolean;

}

export const SettlementHistoryStateRecord = Record({

  historyList: [],
  historyListCount: '',
  historyListLoading: false,
  historyListLoaded: false,
  historyListFailed: false,

  settlementDetails: {},
  settlementDetailsLoading: false,
  settlementDetailsLoaded: false,
  settlementDetailsFailed: false,
});
