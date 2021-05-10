import * as actions from '../document-action/document-action';
import { DocumentState, DocumentRecord } from './document.state';

export const initialState: DocumentState = new DocumentRecord() as unknown as DocumentState;

export function reducer(state = initialState, { type, payload }: any): DocumentState {

  if (!type) {
    return state;
  }

  switch (type) {
    // document List
    case actions.ActionTypes.GET_DOCUMENT_LIST: {
      return Object.assign({}, state, {
        documentList: [],
        documentListLoading: true,
        documentListLoaded: false,
        documentListFailed: false,
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        documentList: payload.data,
        documentListLoading: false,
        documentListLoaded: true,
        documentListFailed: false,
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        documentList: [],
        documentListLoading: false,
        documentListLoaded: true,
        documentListFailed: true,
      });
    }

    // Document List Count
    case actions.ActionTypes.GET_DOCUMENT_LIST_COUNT: {
      return Object.assign({}, state, {
        documentListCount: 0,
        documentListCountLoading: true,
        documentListCountLoaded: false,
        documentListCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        documentListCount: payload.data,
        documentListCountLoading: false,
        documentListCountLoaded: true,
        documentListCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        documentListCount: 0,
        documentListCountLoading: false,
        documentListCountLoaded: true,
        documentListCountFailed: true,
      });
    }

    // Document Detail
    case actions.ActionTypes.GET_DOCUMENT_DETAIL: {
      return Object.assign({}, state, {
        documentDetail: [],
        documentDetailLoading: true,
        documentDetailLoaded: false,
        documentDetailFailed: false,
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        documentDetail: payload.data,
        documentDetailLoading: false,
        documentDetailLoaded: true,
        documentDetailFailed: false,
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_DETAIL_FAIL: {
      return Object.assign({}, state, {
        documentDetail: [],
        documentDetailLoading: false,
        documentDetailLoaded: true,
        documentDetailFailed: true,
      });
    }

    // Document Dashboard Count
    case actions.ActionTypes.DOCUMENT_STATUS_CHANGE: {
      return Object.assign({}, state, {
        totalAmount: 0,
        totalOrder: 0,
        totalCommission: 0,
        totalVendor: 0,
        documentStatusChangeLoading: true,
        documentStatusChangeLoaded: false,
        documentStatusChangeFailed: false,
      });
    }

    case actions.ActionTypes.DOCUMENT_STATUS_CHANGE_SUCCESS: {
      return Object.assign({}, state, {
        totalAmount: payload.data && payload.data.totalAmount ? payload.data.totalAmount : 0,
        totalOrder: payload.data && payload.data.totalOrders ? payload.data.totalOrders : 0,
        totalCommission: payload.data && payload.data.totalCommission ? payload.data.totalCommission : 0,
        totalVendor: payload.data && payload.data.totalVendor ? payload.data.totalVendor : 0,
        documentStatusChangeLoading: false,
        documentStatusChangeLoaded: true,
        documentStatusChangeFailed: false,
      });
    }

    case actions.ActionTypes.DOCUMENT_STATUS_CHANGE_FAIL: {
      return Object.assign({}, state, {
        totalAmount: 0,
        totalOrder: 0,
        totalCommission: 0,
        totalVendor: 0,
        documentStatusChangeLoading: false,
        documentStatusChangeLoaded: true,
        documentStatusChangeFailed: true,
      });
    }

    // download invoice
    case actions.ActionTypes.DOWNLOAD_DOCUMENT: {
      return Object.assign({}, state, {
        invoiceDetail: false,
        invoiceDetailLoading: true,
        invoiceDetailLoaded: false,
        invoiceDetailFailed: false,
      });
    }

    // download invoice
    case actions.ActionTypes.CLEAR_INVOICE: {
      return Object.assign({}, state, {
        invoiceDetail: false,
        invoiceDetailLoading: false,
        invoiceDetailLoaded: false,
        invoiceDetailFailed: false,
      });
    }

    case actions.ActionTypes.DOWNLOAD_DOCUMENT_SUCCESS: {
      return Object.assign({}, state, {
        invoiceDetail: payload.data,
        invoiceDetailLoading: false,
        invoiceDetailLoaded: true,
        invoiceDetailFailed: false,
      });
    }

    case actions.ActionTypes.DOWNLOAD_DOCUMENT_FAIL: {
      return Object.assign({}, state, {
        invoiceDetail: false,
        invoiceDetailLoading: false,
        invoiceDetailLoaded: true,
        invoiceDetailFailed: true,
      });
    }

    default: {
      return state;
    }
  }
}

export const getDocumentList = (state: DocumentState) => state.documentList;
export const getDocumentListLoading = (state: DocumentState) => state.documentListLoading;
export const getDocumentListLoaded = (state: DocumentState) => state.documentListLoaded;
export const getDocumentListFailed = (state: DocumentState) => state.documentListFailed;

export const getDocumentListCount = (state: DocumentState) => state.documentListCount;
export const getDocumentListCountLoading = (state: DocumentState) => state.documentListCountLoading;
export const getDocumentListCountLoaded = (state: DocumentState) => state.documentListCountLoading;
export const getDocumentListCountFailed = (state: DocumentState) => state.documentListCountFailed;

export const getDocumentDetail = (state: DocumentState) => state.documentDetail;
export const getDocumentDetailLoading = (state: DocumentState) => state.documentDetailLoading;
export const getDocumentDetailLoaded = (state: DocumentState) => state.documentDetailLoading;
export const getDocumentDetailFailed = (state: DocumentState) => state.documentDetailFailed;


export const totalAmount = (state: DocumentState) => state.totalAmount;
export const totalOrder = (state: DocumentState) => state.totalOrder;
export const totalCommission = (state: DocumentState) => state.totalCommission;
export const totalVendor = (state: DocumentState) => state.totalVendor;
export const getDocumentDashboardCountLoading = (state: DocumentState) => state.documentStatusChangeLoading;
export const getDocumentDashboardCountLoaded = (state: DocumentState) => state.documentStatusChangeLoading;
export const getDocumentDashboardCountFailed = (state: DocumentState) => state.documentStatusChangeFailed;
