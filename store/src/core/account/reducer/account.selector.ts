/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {createSelector} from 'reselect';

import * as  fromAuth from './account.reducer';
import {AppState} from '../../state.interface';

export const getState = (State: AppState) => State.account;
export const getNewPassword = createSelector(getState, fromAuth.getNewPassword);
export const getOrderHistoryList = createSelector(getState, fromAuth.getorderHistoryList);
export const getorderHistoryCount = createSelector(getState, fromAuth.getorderHistoryCount);

export const getOrderHistoryDetail = createSelector(getState, fromAuth.getorderHistoryDetail);
export const getOrderHistoryDetailLoaded = createSelector(getState, fromAuth.getOrderHistoryDetailLoaded);
export const getOrderHistoryDetailLoading = createSelector(getState, fromAuth.getOrderHistoryDetailLoading);
export const getOrderHistoryDetailFailed = createSelector(getState, fromAuth.getOrderHistoryDetailFailed);

export const getHistoryListLoaded = createSelector(getState, fromAuth.getHistoryListLoaded);
export const getHistoryListLoading = createSelector(getState, fromAuth.getHistoryListLoading);
export const getHistoryListFailed = createSelector(getState, fromAuth.getHistoryListFailed);

export const getChangepasswordLoading = createSelector(getState, fromAuth.getChangepasswordLoading);
export const getChangepasswordLoaded = createSelector(getState, fromAuth.getChangepasswordLoaded);
export const getChangepasswordFailed = createSelector(getState, fromAuth.getChangepasswordFailed);

export const getEdittedStatus = createSelector(getState, fromAuth.getEdittedStatus);
export const getEditProfileLoading = createSelector(getState, fromAuth.getEditProfileLoading);
export const getEditProfileLoaded = createSelector(getState, fromAuth.getEditProfileLoaded);
export const getEditProfileFailed = createSelector(getState, fromAuth.getEditProfileFailed);

export const getAddressList = createSelector(getState, fromAuth.getCustomerAddressList);
export const getAddressListLoading = createSelector(getState, fromAuth.getCustomerAddressListLoading);
export const getAddressListLoaded = createSelector(getState, fromAuth.getCustomerAddressListLoaded);
export const getAddressListFailed = createSelector(getState, fromAuth.getCustomerAddressListFailed);

export const getAddAddress = createSelector(getState, fromAuth.addCustomerAddress);
export const getAddAddressLoading = createSelector(getState, fromAuth.addCustomerAddressLoading);
export const getAddAddressLoaded = createSelector(getState, fromAuth.addCustomerAddressLoaded);
export const getAddAddressFailed = createSelector(getState, fromAuth.addCustomerAddressFailed);

export const getUpdateAddress = createSelector(getState, fromAuth.updateCustomerAddress);
export const getUpdateAddressLoading = createSelector(getState, fromAuth.updateCustomerAddressLoading);
export const getUpdateAddressLoaded = createSelector(getState, fromAuth.updateCustomerAddressLoaded);
export const getUpdateAddressFailed = createSelector(getState, fromAuth.updateCustomerAddressFailed);

export const getDeleteAddress = createSelector(getState, fromAuth.deleteCustomerAddress);
export const getDeleteAddressLoading = createSelector(getState, fromAuth.deleteCustomerAddressLoading);
export const getDeleteAddressLoaded = createSelector(getState, fromAuth.deleteCustomerAddressLoaded);
export const getDeleteAddressFailed = createSelector(getState, fromAuth.deleteCustomerAddressFailed);

export const getReview = createSelector(getState, fromAuth.getReview);
export const getReviewLoading = createSelector(getState, fromAuth.getReviewLoading);
export const getReviewLoaded = createSelector(getState, fromAuth.getReviewLoaded);
export const getReviewFailed = createSelector(getState, fromAuth.getReviewFailed);

export const getRating = createSelector(getState, fromAuth.getRating);
export const getRatingLoading = createSelector(getState, fromAuth.getRatingLoading);
export const getRatingLoaded = createSelector(getState, fromAuth.getRatingLoaded);
export const getRatingFailed = createSelector(getState, fromAuth.getRatingFailed);

export const orderList = createSelector(getState, fromAuth.orderList);
export const orderListLoading = createSelector(getState, fromAuth.orderListLoading);
export const orderListLoaded = createSelector(getState, fromAuth.orderListLoaded);
export const orderListFailed = createSelector(getState, fromAuth.orderListFailed);

export const orderListCount = createSelector(getState, fromAuth.orderListCount);
export const orderListCountLoading = createSelector(getState, fromAuth.orderListCountLoading);
export const orderListCountLoaded = createSelector(getState, fromAuth.orderListCountLoaded);
export const orderListCountFailed = createSelector(getState, fromAuth.orderListCountFailed);

export const myOrderDetails = createSelector(getState, fromAuth.myOrderDetails);
export const myOrderDetailsLoading = createSelector(getState, fromAuth.myOrderDetailsLoading);
export const myOrderDetailsLoaded = createSelector(getState, fromAuth.myOrderDetailsLoaded);
export const myOrderDetailsFailed = createSelector(getState, fromAuth.myOrderDetailsFailed);

export const orderTrackDetails = createSelector(getState, fromAuth.orderTrackDetails);
export const orderTrackDetailsLoading = createSelector(getState, fromAuth.orderTrackDetailsLoading);
export const orderTrackDetailsLoaded = createSelector(getState, fromAuth.orderTrackDetailsLoaded);
export const orderTrackDetailsFailed = createSelector(getState, fromAuth.orderTrackDetailsFailed);

export const addProductReview = createSelector(getState, fromAuth.addProductReview);
export const addProductReviewLoading = createSelector(getState, fromAuth.addProductReviewLoading);
export const addProductReviewLoaded = createSelector(getState, fromAuth.addProductReviewLoaded);
export const addProductReviewFailed = createSelector(getState, fromAuth.addProductReviewFailed);

export const downloadInvoice = createSelector(getState, fromAuth.downloadInvoice);
export const downloadInvoiceLoading = createSelector(getState, fromAuth.downloadInvoiceLoading);
export const downloadInvoiceLoaded = createSelector(getState, fromAuth.downloadInvoiceLoaded);
export const downloadInvoiceFailed = createSelector(getState, fromAuth.downloadInvoiceFailed);

export const cancelOrder = createSelector(getState, fromAuth.cancelOrder);
export const cancelOrderLoading = createSelector(getState, fromAuth.cancelOrderLoading);
export const cancelOrderLoaded = createSelector(getState, fromAuth.cancelOrderLoaded);
export const cancelOrderFailed = createSelector(getState, fromAuth.cancelOrderFailed);

export const cancelOrderReasonList = createSelector(getState, fromAuth.cancelOrderReasonList);
export const cancelOrderReasonListLoading = createSelector(getState, fromAuth.cancelOrderReasonListLoading);
export const cancelOrderReasonListLoaded = createSelector(getState, fromAuth.cancelOrderReasonListLoaded);
export const cancelOrderReasonListFailed = createSelector(getState, fromAuth.cancelOrderReasonListFailed);

export const quotationList = createSelector(getState, fromAuth.quotationList);
export const quotationListLoading = createSelector(getState, fromAuth.quotationListLoading);
export const quotationListLoaded = createSelector(getState, fromAuth.quotationListLoaded);

export const quotationListCount = createSelector(getState, fromAuth.quotationListCount);
export const quotationListCountLoading = createSelector(getState, fromAuth.quotationListCountLoading);
export const quotationListCountLoaded = createSelector(getState, fromAuth.quotationListCountLoaded);

export const zoneList = createSelector(getState, fromAuth.zoneList);
