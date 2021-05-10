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

export interface SalesPaymentState extends Map<string, any> {

  paymentList: any;
  paymentListLoading: boolean;
  paymentListLoaded: boolean;
  paymentListFailed: boolean;

  paymentListCount: any;
  paymentListCountLoading: boolean;
  paymentListCountLoaded: boolean;
  paymentListCountFailed: boolean;

  makePaymentArchive: any;
  makePaymentArchiveLoading: boolean;
  makePaymentArchiveLoaded: boolean;
  makePaymentArchiveFailed: boolean;
}

export const SalesPaymentStateRecord = Record({

  paymentList: [],
  paymentListLoading: false,
  paymentListLoaded: false,
  paymentListFailed: false,

  paymentListCount: [],
  paymentListCountLoading: false,
  paymentListCountLoaded: false,
  paymentListCountFailed: false,

  makePaymentArchive: {},
  makePaymentArchiveLoading: false,
  makePaymentArchiveLoaded: false,
  makePaymentArchiveFailed: false,
});
