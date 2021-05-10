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

export interface ArchivePaymentState extends Map<string, any> {

  archivePaymentList: any;
  archivePaymentListLoading: boolean;
  archivePaymentListLoaded: boolean;
  archivePaymentListFailed: boolean;

  archivePaymentListCount: any;
  archivePaymentListCountLoading: boolean;
  archivePaymentListCountLoaded: boolean;
  archivePaymentListCountFailed: boolean;
}

export const ArchivePaymentStateRecord = Record({

  archivePaymentList: [],
  archivePaymentListLoading: false,
  archivePaymentListLoaded: false,
  archivePaymentListFailed: false,

  archivePaymentListCount: '',
  archivePaymentListCountLoading: false,
  archivePaymentListCountLoaded: false,
  archivePaymentListCountFailed: false,
});
