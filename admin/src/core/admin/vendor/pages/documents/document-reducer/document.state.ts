import { Map, Record } from 'immutable';

export interface DocumentState extends Map<string, any> {
  documentList: any;
  documentListLoading: boolean;
  documentListLoaded: boolean;
  documentListFailed: boolean;

  documentListCount: number;
  documentListCountLoading: boolean;
  documentListCountLoaded: boolean;
  documentListCountFailed: boolean;

  documentDetail: any;
  documentDetailLoading: boolean;
  documentDetailLoaded: boolean;
  documentDetailFailed: boolean;


  totalAmount: number;
  totalOrder: number;
  totalCommission: number;
  totalVendor: number;
  documentStatusChangeLoading: boolean;
  documentStatusChangeLoaded: boolean;
  documentStatusChangeFailed: boolean;

  invoiceDetail: any;
  invoiceDetailLoading: boolean;
  invoiceDetailLoaded: boolean;
  invoiceDetailFailed: boolean;
}

export const DocumentRecord = Record({
  documentList: [],
  documentListLoading: false,
  documentListLoaded: false,
  documentListFailed: false,

  documentListCount: 0,
  documentListCountLoading: false,
  documentListCountLoaded: false,
  documentListCountFailed: false,

  documentDetail: [],
  documentDetailLoading: false,
  documentDetailLoaded: false,
  documentDetailFailed: false,

  totalAmount: 0,
  totalOrder: 0,
  totalCommission: 0,
  totalVendor: 0,
  documentStatusChangeLoading: false,
  documentStatusChangeLoaded: false,
  documentStatusChangeFailed: false,


  invoiceDetail: false,
  invoiceDetailLoading: false,
  invoiceDetailLoaded: false,
  invoiceDetailFailed: false,

});
