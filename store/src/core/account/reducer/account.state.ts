/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Map, Record} from 'immutable';
import {OrderHistoryResponseModel} from '../models/order-history-response.model';

export interface AccountState extends Map<string, any> {
    newPassword: any;
    orderHistory: Array<OrderHistoryResponseModel>;
    orderHistoryCount: number;
    orderHistoryDetail: any;
    orderHistoryDetailLoading: boolean;
    orderHistoryDetailLoaded: boolean;
    orderHistoryDetailFailed: boolean;

    historyListLoading: boolean;
    historyListLoaded: boolean;
    historyListFailed: boolean;

    changepasswordLoading: boolean;
    changepasswordLoaded: boolean;
    changepasswordFailed: boolean;

    edited: any;
    editProfileLoading: boolean;
    editProfileLoaded: boolean;
    editProfileFailed: boolean;

    addresslist: any;
    addresslistLoading: boolean;
    addresslistLoaded: boolean;
    addresslistFailed: boolean;

    addaddress: any;
    addaddressLoading: boolean;
    addaddressLoaded: boolean;
    addaddressFailed: boolean;

    updateCustomerAddress: any;
    updateCustomerAddressLoading: boolean;
    updateCustomerAddressLoaded: boolean;
    updateCustomerAddressFailed: boolean;

    deleteCustomerAddress: any;
    deleteCustomerAddressLoading: boolean;
    deleteCustomerAddressLoaded: boolean;
    deleteCustomerAddressFailed: boolean;

    review: any;
    reviewLoading: boolean;
    reviewLoaded: boolean;
    reviewFailed: boolean;

    rating: any;
    ratingLoading: boolean;
    ratingLoaded: boolean;
    ratingFailed: boolean;

    orderList: any;
    orderListLoading: boolean;
    orderListLoaded: boolean;
    orderListFailed: boolean;

    orderListCount: any;
    orderListCountLoading: boolean;
    orderListCountLoaded: boolean;
    orderListCountFailed: boolean;

    myOrderDetails: any;
    myOrderDetailsLoading: boolean;
    myOrderDetailsLoaded: boolean;
    myOrderDetailsFailed: boolean;

    orderTrackDetails: any;
    orderTrackDetailsLoading: boolean;
    orderTrackDetailsLoaded: boolean;
    orderTrackDetailsFailed: boolean;

    addProductReview: any;
    addProductReviewLoading: boolean;
    addProductReviewLoaded: boolean;
    addProductReviewFailed: boolean;

    downloadInvoice: any;
    downloadInvoiceLoading: boolean;
    downloadInvoiceLoaded: boolean;
    downloadInvoiceFailed: boolean;

    cancelOrder: any;
    cancelOrderLoading: boolean;
    cancelOrderLoaded: boolean;
    cancelOrderFailed: boolean;

    cancelOrderReasonList: any;
    cancelOrderReasonListLoading: boolean;
    cancelOrderReasonListLoaded: boolean;
    cancelOrderReasonListFailed: boolean;

    quotationList: any;
    quotationListLoading: boolean;
    quotationListLoaded: boolean;
    quotationListFailed: boolean;

    quotationListCount: any;
    quotationListCountLoading: boolean;
    quotationListCountLoaded: boolean;
    quotationListCountFailed: boolean;

    zoneList: any;
    zoneListLoading:  boolean;
    zoneListLoaded:  boolean;
    zoneListFailed:  boolean;
}

export const accountrecord = Record({
        newPassword: {},
        orderHistory: [],
        orderHistoryCount: 0,
        orderHistoryDetail: {},
        addresslist: {},
        updateCustomerAddress: {},
        deleteCustomerAddress: {},

        orderHistoryDetailLoading: false,
        orderHistoryDetailLoaded: false,
        orderHistoryDetailFailed: false,

        historyListLoading: false,
        historyListLoaded: false,
        historyListFailed: false,

        changepasswordLoading: false,
        changepasswordLoaded: false,
        changepasswordFailed: false,

        editProfileLoading: false,
        editProfileLoaded: false,
        editProfileFailed: false,

        addresslistLoading: false,
        addresslistLoaded: false,
        addresslistFailed: false,

        updateCustomerAddressLoading: false,
        updateCustomerAddressLoaded: false,
        updateCustomerAddressFailed: false,

        deleteCustomerAddressLoading: false,
        deleteCustomerAddressLoaded: false,
        deleteCustomerAddressFailed: false,

        reviewLoading: false,
        reviewLoaded: false,
        reviewFailed: false,

        ratingLoading: false,
        ratingLoaded: false,
        ratingFailed: false,

        orderList: [],
        orderListLoading: false,
        orderListLoaded: false,
        orderListFailed: false,

        orderListCount: [],
        orderListCountLoading: false,
        orderListCountLoaded: false,
        orderListCountFailed: false,

        myOrderDetails: [],
        myOrderDetailsLoading: false,
        myOrderDetailsLoaded: false,
        myOrderDetailsFailed: false,

        orderTrackDetails: [],
        orderTrackDetailsLoading: false,
        orderTrackDetailsLoaded: false,
        orderTrackDetailsFailed: false,

        addProductReview: [],
        addProductReviewLoading: false,
        addProductReviewLoaded: false,
        addProductReviewFailed: false,

        downloadInvoice: [],
        downloadInvoiceLoading: false,
        downloadInvoiceLoaded: false,
        downloadInvoiceFailed: false,

        cancelOrder: {},
        cancelOrderLoading: false,
        cancelOrderLoaded: false,
        cancelOrderFailed: false,

        cancelOrderReasonList: [],
        cancelOrderReasonListLoading: false,
        cancelOrderReasonListLoaded: false,
        cancelOrderReasonListFailed: false,

        quotationList: [],
        quotationListLoading:  false,
        quotationListLoaded:  false,
        quotationListFailed:  false,

        quotationListCount: '',
        quotationListCountLoading:  false,
        quotationListCountLoaded:  false,
        quotationListCountFailed:  false,

        zoneList: [],
        zoneListLoading:  false,
        zoneListLoaded:  false,
        zoneListFailed:  false,
    })
;
