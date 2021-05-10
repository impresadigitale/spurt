/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface QuotationRequestState extends Map<string, any> {

  quotationList: any;
  quotationListLoading: boolean;
  quotationListLoaded: boolean;
  quotationListFailed: boolean;

  quotationListCount: any;
  quotationListCountLoading: boolean;
  quotationListCountLoaded: boolean;
  quotationListCountFailed: boolean;


}

export const QuotationRequestStateRecord = Record({

  quotationList: [],
  quotationListLoading: false,
  quotationListLoaded: false,
  quotationListFailed: false,

  quotationListCount: '',
  quotationListCountLoading: false,
  quotationListCountLoaded: false,
  quotationListCountFailed: false,

});
