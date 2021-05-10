import {Subject} from 'rxjs';
/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import * as authAction from './action/account.action';
import * as store from '../state.interface';
import {ChangePasswordModel} from './models/changePassword.model';
import {
    getChangepasswordFailed,
    getChangepasswordLoaded,
    getChangepasswordLoading, getEditProfileFailed, getEditProfileLoaded, getEditProfileLoading, getEdittedStatus,
    getHistoryListFailed, getHistoryListLoaded, getHistoryListLoading, getNewPassword, getOrderHistoryDetail,
    getOrderHistoryList, getOrderHistoryDetailLoading, getOrderHistoryDetailFailed, getOrderHistoryDetailLoaded,
    getorderHistoryCount, getAddressList, getAddressListLoading, getAddressListLoaded, getAddressListFailed,
    getAddAddress, getAddAddressLoading, getAddAddressLoaded , getAddAddressFailed, getUpdateAddress, getUpdateAddressLoading,
    getUpdateAddressLoaded, getUpdateAddressFailed, getDeleteAddress, getDeleteAddressLoading, getDeleteAddressLoaded, getDeleteAddressFailed,
    getReview,
    getReviewLoading,
    getReviewLoaded,
    getReviewFailed,
    getRating,
    getRatingLoading,
    getRatingLoaded,
    getRatingFailed,
    orderList,
    orderListLoading,
    orderListLoaded,
    orderListCount,
    myOrderDetails,
    orderTrackDetails,
    orderTrackDetailsLoading,
    myOrderDetailsLoading,
    myOrderDetailsLoaded,
    orderTrackDetailsLoaded,
    addProductReviewLoading,
    downloadInvoiceLoading,
    addProductReview,
    cancelOrder,
    cancelOrderLoading,
    cancelOrderLoaded,
    cancelOrderReasonList,
    cancelOrderReasonListLoading,
    cancelOrderReasonListLoaded,
    quotationList,
    quotationListLoaded,
    quotationListLoading,
    quotationListCount,
    zoneList
} from './reducer/account.selector';
import {EditProfileModal} from './models/editProfile.modal';
import {OrderHistoryRequestModel} from './models/order-history-request.model';
import {CommonSandbox} from '../common/common.sandbox';
import {AddressModel} from './models/address.model';


@Injectable()
export class AccountSandbox {
    /* order history detail*/
    public orderHistoryList$ = this.appState$.select(getOrderHistoryList);
    public orderHistoryCount$ = this.appState$.select(getorderHistoryCount);
    public orderHistoryDetail$ = this.appState$.select(getOrderHistoryDetail);
    public orderHistoryDetailLoaded$ = this.appState$.select(getOrderHistoryDetailLoaded);
    public orderHistoryDetailLoading$ = this.appState$.select(getOrderHistoryDetailLoading);
    public orderHistoryDetailFailed$ = this.appState$.select(getOrderHistoryDetailFailed);
    /* order history */
    public historyListLoaded$ = this.appState$.select(getHistoryListLoaded);
    public historyListLoading$ = this.appState$.select(getHistoryListLoading);
    public historyListFailed$ = this.appState$.select(getHistoryListFailed);
    /* change password */
    public newPassword$ = this.appState$.select(getNewPassword);
    public changePasswordLoading$ = this.appState$.select(getChangepasswordLoading);
    public changePasswordLoaded$ = this.appState$.select(getChangepasswordLoaded);
    public changePasswordFailed$ = this.appState$.select(getChangepasswordFailed);
    /* edit profile */
    public getEdittedStatus$ = this.appState$.select(getEdittedStatus);
    public getEditProfileLoaded$ = this.appState$.select(getEditProfileLoaded);
    public getEditProfileLoading$ = this.appState$.select(getEditProfileLoading);
    public getEditProfileFailed$ = this.appState$.select(getEditProfileFailed);
    /* Address List */

    public getCustAddressList$ = this.appState$.select(getAddressList);
    public getCustAddressListLoaded$ = this.appState$.select(getAddressListLoading);
    public getCustAddressListLoading$ = this.appState$.select(getAddressListLoaded);
    public getCustAddressListFailed$ = this.appState$.select(getAddressListFailed);

    // add rating
    public getReview$ = this.appState$.select(getReview);
    public getReviewLoading$ = this.appState$.select(getReviewLoading);
    public getReviewLoaded$ = this.appState$.select(getReviewLoaded);
    public getReviewFailed$ = this.appState$.select(getReviewFailed);
    // add review
    public getRating$ = this.appState$.select(getRating);
    public getRatingLoading$ = this.appState$.select(getRatingLoading);
    public getRatingLoaded$ = this.appState$.select(getRatingLoaded);
    public getRatingFailed$ = this.appState$.select(getRatingFailed);

    /* Add Address */
    public getCustAddAddress$ = this.appState$.select(getAddAddress);

    /* Update Address */
    public getCustUpdateAddress$ = this.appState$.select(getUpdateAddress);

    /* Delete Address  */
    public getCustDeleteAddress$ = this.appState$.select(getDeleteAddress);

     /* my order list */
     public orderList$ = this.appState$.select(orderList);
     public orderListLoading$ = this.appState$.select(orderListLoading);
     public orderListLoaded$ = this.appState$.select(orderListLoaded);
     public orderListCount$ = this.appState$.select(orderListCount);

     public myOrderDetails$ = this.appState$.select(myOrderDetails);
     public myOrderDetailsLoading$ = this.appState$.select(myOrderDetailsLoading);
     public orderTrackDetails$ = this.appState$.select(orderTrackDetails);

     public orderTrackDetailsLoading$ = this.appState$.select(orderTrackDetailsLoading);
     public myOrderDetailsLoaded$ = this.appState$.select(myOrderDetailsLoaded);
     public orderTrackDetailsLoaded$ = this.appState$.select(orderTrackDetailsLoaded);
     public addProductReviewLoading$ = this.appState$.select(addProductReviewLoading);
     public downloadInvoiceLoading$ = this.appState$.select(downloadInvoiceLoading);
     public addProductReview$ = this.appState$.select(addProductReview);

     public cancelOrder$ = this.appState$.select(cancelOrder);
     public cancelOrderLoading$ = this.appState$.select(cancelOrderLoading);
     public cancelOrderLoaded$ = this.appState$.select(cancelOrderLoaded);

     public cancelOrderReasonList$ = this.appState$.select(cancelOrderReasonList);
     public cancelOrderReasonListLoading$ = this.appState$.select(cancelOrderReasonListLoading);
     public cancelOrderReasonListLoaded$ = this.appState$.select(cancelOrderReasonListLoaded);

     public quotationList$ = this.appState$.select(quotationList);
     public quotationListLoading$ = this.appState$.select(quotationListLoading);
     public quotationListLoaded$ = this.appState$.select(quotationListLoaded);
     public quotationListCount$ = this.appState$.select(quotationListCount);

     public zoneList$ = this.appState$.select(zoneList);



    private subscriptions: Array<Subscription> = [];
    public getCustomerAddressList: any = {};
    profileImageData = new Subject<any>();

    constructor(private router: Router,
                protected appState$: Store<store.AppState>,
                public commonSandbox: CommonSandbox) {
        this.registerEvents();
    }

    /**
     * trigger change password action
     */
    public doChangepassword(params): void {
        this.appState$.dispatch(new authAction.ChangePassword(new ChangePasswordModel(params)));
    }

    /**
     * trigger edit profile action
     */
    public doEditProfile(params): void {
        this.appState$.dispatch(new authAction.EditProfile(new EditProfileModal(params)));
    }

    /**
     * trigger get order history action
     */
    public getOrderHistory(params): void {
        this.appState$.dispatch(new authAction.GetOrderHistory(new OrderHistoryRequestModel(params)));
    }

    /**
     * trigger get order history count action
     */
    public getOrderHistoryCount(params): void {
        this.appState$.dispatch(new authAction.GetOrderHistoryCount(new OrderHistoryRequestModel(params)));
    }

    /**
     * trigger get order history detail action
     */
    public getOrderDetail(params): void {
        this.appState$.dispatch(new authAction.GetOrderDetail(params));
    }

    /**
     * clear state value of the order detail
     */
    public clearDetail(): void {
        this.appState$.dispatch(new authAction.ClearOrderDetail());
    }
    // add review
    public addReview(value) {
        this.appState$.dispatch(new authAction.ReviewDetail(value));
    }

    // add rating
    public addRatings(value) {
        this.appState$.dispatch(new authAction.RatingDetail(value));
    }
    /**
     * trigger get customer address list action
     */
    public getAddressList(params): void {
        this.appState$.dispatch(new authAction.GetCustomerAddressList(params));
    }

    /**
     * trigger Add customer address  action
     */
    public addCustomerAddress(params): void {
        this.appState$.dispatch(new authAction.AddCustomerAddress (new AddressModel(params)));
    }

    /**
     * trigger Update customer address  action
     */
    public updateCustomerAddress(params): void {
        this.appState$.dispatch(new authAction.UpdateCustomerAddress(params));
    }

    /**
     * trigger Update customer address  action
     */
    public deleteCustomerAddress(params): void {
        this.appState$.dispatch(new authAction.DeleteCustomerAddress(params));
    }
    /**
     * trigger order list  action
     */
    public getOrderList(params): void {
        this.appState$.dispatch(new authAction.GetOrderListAction(params));
    }
    /**
     * trigger order list count  action
     */
    public getOrderListCount(params): void {
        this.appState$.dispatch(new authAction.GetOrderListCountAction(params));
    }

    /**
     * trigger order details  action
     */
    public myOrderDetails(params): void {
        this.appState$.dispatch(new authAction.MyOrderDetailsAction(params));
    }

    /**
     * trigger track product details  action
     */
    public trackProductDetails(params): void {
        this.appState$.dispatch(new authAction.OrderTrackDetailsAction(params));
    }

     /**
     * trigger add review to product
     */

    public addProductReview(params): void {
        this.appState$.dispatch(new authAction.AddProductReviewAction(params));
    }

     /**
     * trigger download invoice
     */

    public downloadInvoice(params): void {
        this.appState$.dispatch(new authAction.DownloadInvoiceAction(params));
    }

     /**
     *  cancel order reason list
     */

    public getCancelOrderReasonList(params): void {
        this.appState$.dispatch(new authAction.CancelOrderReasonListAction(params));
    }

     /**
     *  cancel order
     */

    public cancelOrder(params): void {
        this.appState$.dispatch(new authAction.CancelOrderAction(params));
    }

      /**
     *  get Quotation List
     */

    public getQuotationList(params): void {
        this.appState$.dispatch(new authAction.QuotationListAction(params));
    }

        /**
     *  get Quotation List Count
     */

    public getQuotationListCount(params): void {
        this.appState$.dispatch(new authAction.QuotationListCountAction(params));
    }


    public getZoneList(params): void {
        this.appState$.dispatch(new authAction.ZoneListAction(params));
    }


    /**
     * subscribe events
     */
    public registerEvents() {
        this.subscriptions.push(this.newPassword$.subscribe(password => {
            if (password) {
                if (password.message) {
                    this.router.navigate(['/']);
                }
            }
        }));

        this.subscriptions.push(this.getEdittedStatus$.subscribe(edit => {
            if (edit && edit.status === 1) {
                this.commonSandbox.doGetProfile();
                this.router.navigate(['/']);
            }
        }));


        this.subscriptions.push(this.getCustUpdateAddress$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/account/addresses']);
            }

        }));

        this.subscriptions.push(this.getCustDeleteAddress$.subscribe(data => {
            if (data && data.status === 1) {
                this.router.navigate(['/account/addresses']);
            }

        }));

    }
}
