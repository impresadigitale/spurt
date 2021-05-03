/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/account.action';
import {AccountState, accountrecord} from './account.state';
import {OrderHistoryResponseModel} from '../models/order-history-response.model';
import {AddresslistResponseModel} from '../models/addresslist-response.model';

export const initialState: AccountState = new accountrecord() as unknown as AccountState;


export function  reducer(state = initialState, {type, payload}: any): AccountState {

    if (!type) {

        return state;
    }
    switch (type) {

// <------------ CHANGE PASSWORD -----------> //

        case actions.ActionTypes.DO_CHANGE_PASSWORD:
        {
            return Object.assign({}, state, {
                changepasswordLoading: true,
                changepasswordLoaded: false,
                changepasswordFailed: false,
            });
        }

        case actions.ActionTypes.CHANGE_PASSWORD_SUCCESS: {

            return Object.assign({}, state, {
                newPassword: payload,
                changepasswordLoading: false,
                changepasswordLoaded: true,
                changepasswordFailed: false,
            });
        }
        case actions.ActionTypes.CHANGE_PASSWORD_FAIL:
        {
            return Object.assign({}, state, {
                changepasswordLoading: false,
                changepasswordLoaded: true,
                changepasswordFailed: true,
            });
        }

// <------------ EDIT PROFILE -----------> //


        case actions.ActionTypes.EDIT_PROFILE:
        {
            return Object.assign({}, state, {
                editProfileLoading: true,
                editProfileLoaded: false,
                editProfileFailed: false,
            });
        }

        case actions.ActionTypes.EDIT_PROFILE_SUCCESS: {
            return Object.assign({}, state, {
                edited: payload,
                editProfileLoading: false,
                editProfileLoaded: true,
                editProfileFailed: false,
            });
        }
        case actions.ActionTypes.EDIT_PROFILE_FAIL:
        {
            return Object.assign({}, state, {
                editProfileLoading: false,
                editProfileLoaded: true,
                editProfileFailed: true,
            });
        }


// <------------ ORDER HISTORY -----------> //

        case actions.ActionTypes.GET_ORDER_HISTORY: {

            return Object.assign({}, state, {
                historyListLoading: true,
                historyListLoaded: false,
                historyListFailed: false,
            });
        }

        case actions.ActionTypes.GET_ORDER_HISTORY_SUCCESS: {
            const tempHistory = payload.data.map(history => {
               const historyModel = new OrderHistoryResponseModel(history);
                return historyModel;
            });
            return Object.assign({}, state, {
                orderHistory: tempHistory,
                historyListLoading: false,
                historyListLoaded: true,
                historyListFailed: false,
            });
        }
        case actions.ActionTypes.GET_ORDER_HISTORY_SUCCESS_COUNT: {
            return Object.assign({}, state, {
                orderHistoryCount: payload.data,
                historyListLoading: false,
                historyListLoaded: true,
                historyListFailed: false,
            });
        }
        case actions.ActionTypes.GET_ORDER_HISTORY_FAIL:
        {
            return Object.assign({}, state, {
                historyListLoading: false,
                historyListLoaded: true,
                historyListFailed: true,
            });
        }

        case actions.ActionTypes.GET_ORDER_DETAIL:
        {

            return Object.assign({}, state, {
                orderHistoryDetail: {},
                orderHistoryDetailLoading: true,
                orderHistoryDetailLoaded: false,
                orderHistoryDetailFailed: false,
            });
        }
        case actions.ActionTypes.CLEAR_ORDER_DETAIL:
        {

            return Object.assign({}, state, {
                orderHistoryDetail: {},
            });
        }

        case actions.ActionTypes.GET_ORDER_DETAIL_SUCCESS: {
            return Object.assign({}, state, {
                orderHistoryDetail: payload.data,
                orderHistoryDetailLoading: false,
                orderHistoryDetailLoaded: true,
                orderHistoryDetailFailed: false,
            });
        }
        case actions.ActionTypes.GET_ORDER_DETAIL_FAIL:
        {
            return Object.assign({}, state, {
                orderHistoryDetail: {},
                orderHistoryDetailLoading: false,
                orderHistoryDetailLoaded: true,
                orderHistoryDetailFailed: true,
            });
        }

// <------------ GET ADDRESS LIST -----------> //

        case actions.ActionTypes.GET_CUSTOMER_ADDRESSLIST:
        {

            return Object.assign({}, state, {
                addresslistLoading: true,
                addresslistLoaded: false,
                addresslistFailed: false,
            });
        }

        case actions.ActionTypes.GET_CUSTOMER_ADDRESSLIST_SUCCESS: {
            const tempaddressModel = payload.data.map(address => {
                const addressModel = new AddresslistResponseModel(address);
                return addressModel;
            });
            return Object.assign({}, state, {
                addresslist: tempaddressModel,
                addresslistLoading: false,
                addresslistLoaded: true,
                addresslistFailed: false,
            });
        }
        case actions.ActionTypes.GET_CUSTOMER_ADDRESSLIST_FAIL:
        {
            return Object.assign({}, state, {
                addresslist: {},
                addresslistLoading: false,
                addresslistLoaded: true,
                addresslistFailed: true,
            });
        }

// <------------ ADD ADDRESS -----------> //

        case actions.ActionTypes.ADD_CUSTOMER_ADDRESS:
        {

            return Object.assign({}, state, {
                addaddressLoading: true,
                addaddressLoaded: false,
                addaddressFailed: false,
            });
        }

        case actions.ActionTypes.ADD_CUSTOMER_ADDRESS_SUCCESS: {
            return Object.assign({}, state, {
                addaddress: payload,
                addaddressLoading: false,
                addaddressLoaded: true,
                addaddressFailed: false,
            });
        }
        case actions.ActionTypes.ADD_CUSTOMER_ADDRESS_FAIL:
        {
            return Object.assign({}, state, {
                addaddress: payload,
                addaddressLoading: false,
                addaddressLoaded: true,
                addaddressFailed: true,
            });
        }

// <------------ UPDATE ADDRESS -----------> //

        case actions.ActionTypes.UPDATE_CUSTOMER_ADDRESS:
        {

            return Object.assign({}, state, {
                updateCustomerAddressLoading: true,
                updateCustomerAddressLoaded: false,
                updateCustomerAddressFailed: false,
            });
        }

        case actions.ActionTypes.UPDATE_CUSTOMER_ADDRESS_SUCCESS: {
            return Object.assign({}, state, {
                updateCustomerAddress: payload,
                updateCustomerAddressLoading: false,
                updateCustomerAddressLoaded: true,
                updateCustomerAddressFailed: false,
            });
        }
        case actions.ActionTypes.UPDATE_CUSTOMER_ADDRESS_FAIL:
        {
            return Object.assign({}, state, {
                updateCustomerAddress: {},
                updateCustomerAddressLoading: false,
                updateCustomerAddressLoaded: true,
                updateCustomerAddressFailed: true,
            });
        }

// <------------ DELETE ADDRESS -----------> //

        case actions.ActionTypes.DELETE_CUSTOMER_ADDRESS:
        {

            return Object.assign({}, state, {
                deleteCustomerAddressLoading: true,
                deleteCustomerAddressLoaded: false,
                deleteCustomerAddressFailed: false,
            });
        }

        case actions.ActionTypes.DELETE_CUSTOMER_ADDRESS_SUCCESS: {
            return Object.assign({}, state, {
                deleteCustomerAddress: payload,
                deleteCustomerAddressLoading: false,
                deleteCustomerAddressLoaded: true,
                deleteCustomerAddressFailed: false,
            });
        }
        case actions.ActionTypes.DELETE_CUSTOMER_ADDRESS_FAIL:
        {
            return Object.assign({}, state, {
                deleteCustomerAddress: {},
                deleteCustomerAddressLoading: false,
                deleteCustomerAddressLoaded: true,
                deleteCustomerAddressFailed: true,
            });
        }

// <------------ GET REVIEW DETAILS -----------> //

        case actions.ActionTypes.GET_REVIEW_DETAIL:
        {
            return Object.assign({}, state, {
                reviewLoading: true,
                reviewLoaded: false,
                reviewFailed: false,
            });
        }

        case actions.ActionTypes.GET_REVIEW_DETAIL_SUCCESS: {

            return Object.assign({}, state, {
                review: payload,
                reviewLoading: false,
                reviewLoaded: true,
                reviewFailed: false,
            });
        }
        case actions.ActionTypes.GET_REVIEW_DETAIL_FAIL:
        {
            return Object.assign({}, state, {
                reviewLoading: false,
                reviewLoaded: false,
                reviewFailed: true,
            });
        }

// <------------ GET RATING DETAILS -----------> //

        case actions.ActionTypes.GET_RATING_DETAIL:
        {
            return Object.assign({}, state, {
                ratingLoading: true,
                ratingLoaded: false,
                ratingFailed: false,
            });
        }

        case actions.ActionTypes.GET_RATING_DETAIL_SUCCESS: {

            return Object.assign({}, state, {
                rating: payload,
                ratingLoading: false,
                ratingLoaded: true,
                ratingFailed: false,
            });
        }
        case actions.ActionTypes.CHANGE_PASSWORD_FAIL:
        {
            return Object.assign({}, state, {
                ratingLoading: false,
                ratingLoaded: false,
                ratingFailed: true,
            });
        }


// <------------ GET ORDER LIST -----------> //

        case actions.ActionTypes.GET_ORDER_LIST: {
            return Object.assign({}, state, {
                orderList: [],
                orderListLoading: true,
                orderListLoaded: false,
                orderListFailed: false,
            });
        }
        case actions.ActionTypes.GET_ORDER_LIST_SUCCESS: {
            return Object.assign({}, state, {
                orderList: payload.data,
                orderListLoading: false,
                orderListLoaded: true,
                orderListFailed: false,
            });
        }
        case actions.ActionTypes.GET_ORDER_LIST_FAIL: {
            return Object.assign({}, state, {
                orderList: [],
                orderListLoading: false,
                orderListLoaded: false,
                orderListFailed: true,
            });
        }

// <------------ GET ORDER LIST COUNT-----------> //

         case actions.ActionTypes.GET_ORDER_LIST_COUNT: {
            return Object.assign({}, state, {
                orderListCount: [],
                orderListCountLoading: true,
                orderListCountLoaded: false,
                orderListCountFailed: false,
            });
        }
        case actions.ActionTypes.GET_ORDER_LIST_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                orderListCount: payload.data,
                orderListCountLoading: false,
                orderListCountLoaded: true,
                orderListCountFailed: false,
            });
        }
        case actions.ActionTypes.GET_ORDER_LIST_COUNT_FAIL: {
            return Object.assign({}, state, {
                orderListCount: [],
                orderListCountLoading: false,
                orderListCountLoaded: false,
                orderListCountFailed: true,
            });
        }


// <------------ GET MY ORDER DETAILS -----------> //

         case actions.ActionTypes.MY_ORDER_DETAILS: {
            return Object.assign({}, state, {
                myOrderDetails: [],
                myOrderDetailsLoading: true,
                myOrderDetailsLoaded: false,
                myOrderDetailsFailed: false,
            });
        }
        case actions.ActionTypes.MY_ORDER_DETAILS_SUCCESS: {
            return Object.assign({}, state, {
                myOrderDetails: payload.data,
                myOrderDetailsLoading: false,
                myOrderDetailsLoaded: true,
                myOrderDetailsFailed: false,
            });
        }
        case actions.ActionTypes.MY_ORDER_DETAILS_FAIL: {
            return Object.assign({}, state, {
                myOrderDetails: [],
                myOrderDetailsLoading: false,
                myOrderDetailsLoaded: false,
                myOrderDetailsFailed: true,
            });
        }

// <------------ ORDER TRACK DETAILS -----------> //

        case actions.ActionTypes.ORDER_TRACK_DETAILS: {
            return Object.assign({}, state, {
                orderTrackDetails: [],
                orderTrackDetailsLoading: true,
                orderTrackDetailsLoaded: false,
                orderTrackDetailsFailed: false,
            });
        }
        case actions.ActionTypes.ORDER_TRACK_DETAILS_SUCCESS: {
            if (payload.data) {
              payload.data.deliveryStatus.map(data => {
                  if (data.createdDate !== '') {
                   data.createdDate = new Date(new Date(data.createdDate).setMinutes(new Date(data.createdDate).getMinutes() + 330));
                  }
              });
            }
            return Object.assign({}, state, {
                orderTrackDetails: payload.data,
                orderTrackDetailsLoading: false,
                orderTrackDetailsLoaded: true,
                orderTrackDetailsFailed: false,
            });
        }
        case actions.ActionTypes.ORDER_TRACK_DETAILS_FAIL: {
            return Object.assign({}, state, {
                orderTrackDetails: [],
                orderTrackDetailsLoading: false,
                orderTrackDetailsLoaded: false,
                orderTrackDetailsFailed: true,
            });
        }

// <------------ ADD RATING TO PARTICULAR PRODUCT -----------> //

        case actions.ActionTypes.ADD_PRODUCT_REVIEW: {
            return Object.assign({}, state, {
                addProductReview: [],
                addProductReviewLoading: true,
                addProductReviewLoaded: false,
                addProductReviewFailed: false,
            });
        }
        case actions.ActionTypes.ADD_PRODUCT_REVIEW_SUCCESS: {
            return Object.assign({}, state, {
                addProductReview: payload,
                addProductReviewLoading: false,
                addProductReviewLoaded: true,
                addProductReviewFailed: false,
            });
        }
        case actions.ActionTypes.ADD_PRODUCT_REVIEW_FAIL: {
            return Object.assign({}, state, {
                addProductReview: [],
                addProductReviewLoading: false,
                addProductReviewLoaded: false,
                addProductReviewFailed: true,
            });
        }

// <------------ DOWNLOAD INVOICE AFTER PLACE ORDER -----------> //


        case actions.ActionTypes.DOWNLOAD_INVOICE: {
            return Object.assign({}, state, {
                downloadInvoice: [],
                downloadInvoiceLoading: true,
                downloadInvoiceLoaded: false,
                downloadInvoiceFailed: false,
            });
        }
        case actions.ActionTypes.DOWNLOAD_INVOICE_SUCCESS: {
            return Object.assign({}, state, {
                downloadInvoice: [],
                downloadInvoiceLoading: false,
                downloadInvoiceLoaded: true,
                downloadInvoiceFailed: false,
            });
        }
        case actions.ActionTypes.DOWNLOAD_INVOICE_FAIL: {
            return Object.assign({}, state, {
                downloadInvoice: [],
                downloadInvoiceLoading: false,
                downloadInvoiceLoaded: false,
                downloadInvoiceFailed: true,
            });
        }

// <------------ CANECEL ORDER (IF NO NEED) -----------> //

        case actions.ActionTypes.CANCEL_ORDER: {
            return Object.assign({}, state, {
                cancelOrder: {},
                cancelOrderLoading: true,
                cancelOrderLoaded: false,
                cancelOrderFailed: false,
            });
        }
        case actions.ActionTypes.CANCEL_ORDER_SUCCESS: {
            return Object.assign({}, state, {
                cancelOrder: payload,
                cancelOrderLoading: false,
                cancelOrderLoaded: true,
                cancelOrderFailed: false,
            });
        }
        case actions.ActionTypes.CANCEL_ORDER_FAIL: {
            return Object.assign({}, state, {
                cancelOrder: {},
                cancelOrderLoading: false,
                cancelOrderLoaded: false,
                cancelOrderFailed: true,
            });
        }

// <------------ REASON LIST FOR CANCEL ORDER -----------> //

          case actions.ActionTypes.CANCEL_ORDER_REASON_LIST: {
            return Object.assign({}, state, {
                cancelOrderReasonList: [],
                cancelOrderReasonListLoading: true,
                cancelOrderReasonListLoaded: false,
                cancelOrderReasonListFailed: false,
            });
        }
        case actions.ActionTypes.CANCEL_ORDER_REASON_LIST_SUCCESS: {
            return Object.assign({}, state, {
                cancelOrderReasonList: payload.data,
                cancelOrderReasonListLoading: false,
                cancelOrderReasonListLoaded: true,
                cancelOrderReasonListFailed: false,
            });
        }
        case actions.ActionTypes.CANCEL_ORDER_REASON_LIST_FAIL: {
            return Object.assign({}, state, {
                cancelOrderReasonList: [],
                cancelOrderReasonListLoading: false,
                cancelOrderReasonListLoaded: false,
                cancelOrderReasonListFailed: true,
            });
        }

// <------------ QUOTATION LIST -----------> //

        case actions.ActionTypes.QUOTATION_LIST: {
            return Object.assign({}, state, {
                quotationList: [],
                quotationListLoading:  true,
                quotationListLoaded:  false,
                quotationListFailed:  false,
            });
        }

        case actions.ActionTypes.QUOTATION_LIST_SUCCESS: {
            return Object.assign({}, state, {
                quotationList: payload.data,
                quotationListLoading:  false,
                quotationListLoaded:  true,
                quotationListFailed:  false,
            });
        }

        case actions.ActionTypes.QUOTATION_LIST_FAIL: {
            return Object.assign({}, state, {
                quotationList: [],
                quotationListLoading:  false,
                quotationListLoaded:  false,
                quotationListFailed:  true
            });
        }

// <------------ QUOTATION LIST COUNT-----------> //

        case actions.ActionTypes.QUOTATION_LIST_COUNT: {
            return Object.assign({}, state, {
                quotationListCount: '',
                quotationListCountLoading:  false,
                quotationListCountLoaded:  false,
                quotationListCountFailed:  false,
            });
        }

        case actions.ActionTypes.QUOTATION_LIST_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                quotationListCount: payload.data,
                quotationListCountLoading:  false,
                quotationListCountLoaded:  false,
                quotationListCountFailed:  false,
            });
        }

        case actions.ActionTypes.QUOTATION_LIST_COUNT_FAIL: {
            return Object.assign({}, state, {
                quotationListCount: '',
                quotationListCountLoading:  false,
                quotationListCountLoaded:  false,
                quotationListCountFailed:  false,
            });
        }

// <------------ GET ZONE LIST -----------> //

        case actions.ActionTypes.ZONE_LIST: {
            return Object.assign({}, state, {
                zoneListLoading:  true,
                zoneListLoaded:  false,
                zoneListFailed:  false,
            });
        }

        case actions.ActionTypes.ZONE_LIST_SUCCESS: {
            return Object.assign({}, state, {
                zoneList: payload.data,
                zoneListLoading:  false,
                zoneListLoaded:  true,
                zoneListFailed:  false,
            });
        }

        case actions.ActionTypes.ZONE_LIST_FAIL: {
            return Object.assign({}, state, {
                zoneList: [],
                zoneListLoading:  false,
                zoneListLoaded:  false,
                zoneListFailed:  true
            });
        }
        default: {
            return state;
        }
    }
}

export const getNewPassword = (state: AccountState) => state.newPassword;
export const getorderHistoryList = (state: AccountState) => state.orderHistory;
export const getorderHistoryCount = (state: AccountState) => state.orderHistoryCount;

export const getorderHistoryDetail = (state: AccountState) => state.orderHistoryDetail;
export const getOrderHistoryDetailLoading = (state: AccountState) => state.orderHistoryDetailLoading;
export const getOrderHistoryDetailLoaded = (state: AccountState) => state.orderHistoryDetailLoaded;
export const getOrderHistoryDetailFailed = (state: AccountState) => state.orderHistoryDetailFailed;

export const getHistoryListLoading = (state: AccountState) => state.historyListLoading;
export const getHistoryListLoaded = (state: AccountState) => state.historyListLoaded;
export const getHistoryListFailed = (state: AccountState) => state.historyListFailed;

export const getChangepasswordLoading = (state: AccountState) => state.changepasswordLoading;
export const getChangepasswordLoaded = (state: AccountState) => state.changepasswordLoaded;
export const getChangepasswordFailed = (state: AccountState) => state.changepasswordFailed;

export const getEdittedStatus = (state: AccountState) => state.edited;
export const getEditProfileLoading = (state: AccountState) => state.editProfileLoading;
export const getEditProfileLoaded = (state: AccountState) => state.editProfileLoaded;
export const getEditProfileFailed = (state: AccountState) => state.editProfileFailed;

export const getCustomerAddressList = (state: AccountState) => state.addresslist;
export const getCustomerAddressListLoading = (state: AccountState) => state.addresslistLoading;
export const getCustomerAddressListLoaded = (state: AccountState) => state.addresslistLoaded;
export const getCustomerAddressListFailed = (state: AccountState) => state.addresslistFailed;

export const addCustomerAddress = (state: AccountState) => state.addaddress;
export const addCustomerAddressLoading = (state: AccountState) => state.addaddressLoading;
export const addCustomerAddressLoaded = (state: AccountState) => state.addaddressLoaded;
export const addCustomerAddressFailed = (state: AccountState) => state.addaddressFailed;

export const updateCustomerAddress = (state: AccountState) => state.updateCustomerAddress;
export const updateCustomerAddressLoading = (state: AccountState) => state.updateCustomerAddressLoading;
export const updateCustomerAddressLoaded = (state: AccountState) => state.updateCustomerAddressLoaded;
export const updateCustomerAddressFailed = (state: AccountState) => state.updateCustomerAddressFailed;

export const deleteCustomerAddress = (state: AccountState) => state.deleteCustomerAddress;
export const deleteCustomerAddressLoading = (state: AccountState) => state.deleteCustomerAddressLoading;
export const deleteCustomerAddressLoaded = (state: AccountState) => state.deleteCustomerAddressLoaded;
export const deleteCustomerAddressFailed = (state: AccountState) => state.deleteCustomerAddressFailed;

export const getReview = (state: AccountState) => state.review;
export const getReviewLoading = (state: AccountState) => state.reviewLoading;
export const getReviewLoaded = (state: AccountState) => state.reviewLoaded;
export const getReviewFailed = (state: AccountState) => state.reviewFailed;

export const getRating = (state: AccountState) => state.rating;
export const getRatingLoading = (state: AccountState) => state.ratingLoading;
export const getRatingLoaded = (state: AccountState) => state.ratingLoaded;
export const getRatingFailed = (state: AccountState) => state.ratingFailed;

export const orderList = (state: AccountState) => state.orderList;
export const orderListLoading = (state: AccountState) => state.orderListLoading;
export const orderListLoaded = (state: AccountState) => state.orderListLoaded;
export const orderListFailed = (state: AccountState) => state.orderListFailed;

export const orderListCount = (state: AccountState) => state.orderListCount;
export const orderListCountLoading = (state: AccountState) => state.orderListCountLoading;
export const orderListCountLoaded = (state: AccountState) => state.orderListCountLoaded;
export const orderListCountFailed = (state: AccountState) => state.orderListCountFailed;

export const myOrderDetails = (state: AccountState) => state.myOrderDetails;
export const myOrderDetailsLoading = (state: AccountState) => state.myOrderDetailsLoading;
export const myOrderDetailsLoaded = (state: AccountState) => state.myOrderDetailsLoaded;
export const myOrderDetailsFailed = (state: AccountState) => state.myOrderDetailsFailed;

export const orderTrackDetails = (state: AccountState) => state.orderTrackDetails;
export const orderTrackDetailsLoading = (state: AccountState) => state.orderTrackDetailsLoading;
export const orderTrackDetailsLoaded = (state: AccountState) => state.orderTrackDetailsLoaded;
export const orderTrackDetailsFailed = (state: AccountState) => state.orderTrackDetailsFailed;

export const addProductReview = (state: AccountState) => state.addProductReview;
export const addProductReviewLoading = (state: AccountState) => state.addProductReviewLoading;
export const addProductReviewLoaded = (state: AccountState) => state.addProductReviewLoaded;
export const addProductReviewFailed = (state: AccountState) => state.addProductReviewFailed;

export const downloadInvoice = (state: AccountState) => state.downloadInvoice;
export const downloadInvoiceLoading = (state: AccountState) => state.downloadInvoiceLoading;
export const downloadInvoiceLoaded = (state: AccountState) => state.downloadInvoiceLoaded;
export const downloadInvoiceFailed = (state: AccountState) => state.downloadInvoiceFailed;

export const cancelOrder = (state: AccountState) => state.cancelOrder;
export const cancelOrderLoading = (state: AccountState) => state.cancelOrderLoading;
export const cancelOrderLoaded = (state: AccountState) => state.cancelOrderLoaded;
export const cancelOrderFailed = (state: AccountState) => state.cancelOrderFailed;

export const cancelOrderReasonList = (state: AccountState) => state.cancelOrderReasonList;
export const cancelOrderReasonListLoading = (state: AccountState) => state.cancelOrderReasonListLoading;
export const cancelOrderReasonListLoaded = (state: AccountState) => state.cancelOrderReasonListLoaded;
export const cancelOrderReasonListFailed = (state: AccountState) => state.cancelOrderReasonListFailed;

export const quotationList = (state: AccountState) => state.quotationList;
export const quotationListLoading = (state: AccountState) => state.quotationListLoading;
export const quotationListLoaded = (state: AccountState) => state.quotationListLoaded;

export const quotationListCount = (state: AccountState) => state.quotationListCount;
export const quotationListCountLoading = (state: AccountState) => state.quotationListCountLoading;
export const quotationListCountLoaded = (state: AccountState) => state.quotationListCountLoaded;

export const zoneList = (state: AccountState) => state.zoneList;
