/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class SellerAddRequest {

    public customerGroupId: any;
    public firstName: string;
    public lastName: string;
    public email: string;
    public mobileNumber: number;
    public password: string;
    public confirmPassword: string;
    public avatar: string;
    public companyName: string;
    public companyLogo: string;
    public companyDescription: string;
    public companyAddress1: string;
    public companyAddress2: string;
    public companyCity: string;
    public companyState: string;
    public companyCountryId: number;
    public pincode: string;
    public companyWebsite: string;
    public mailStatus: number;
    public status: number;
    public ApprovalFlag: number;
    public commission: number;
    public customerId: number;
    public vendorId: number;
    public paymentInformation: string;
    public companyGstNumber: any;
    public companyCoverImage: any;

    constructor(sellerAddRequest: any) {
        this.customerGroupId = sellerAddRequest.customerGroupId || 'null';
        this.firstName = sellerAddRequest.firstName || '';
        this.lastName = sellerAddRequest.lastName || '';
        this.email = sellerAddRequest.email || '';
        this.mobileNumber = sellerAddRequest.mobileNumber || '';
        this.password = sellerAddRequest.password || '';
        this.confirmPassword = sellerAddRequest.confirmPassword || '';
        this.avatar = sellerAddRequest.avatar || '';
        this.companyName = sellerAddRequest.companyName || '';
        this.companyLogo = sellerAddRequest.companyLogo || '';
        this.companyDescription = sellerAddRequest.companyDescription || '';
        // this.paymentMethod = sellerAddRequest.paymentMethod;
        // this.chequePayeeName = sellerAddRequest.chequePayeeName || '';
        // this.paypalEmailAccount = sellerAddRequest.paypalEmailAccount || '';
        // this.bankName = sellerAddRequest.bankName || '';
        // this.accountNumber = sellerAddRequest.accountNumber || '';
        // this.accountName = sellerAddRequest.accountName || '';
        this.companyAddress1 = sellerAddRequest.companyAddress1 || '';
        this.companyAddress2 = sellerAddRequest.companyAddress2 || '';
        this.companyCity = sellerAddRequest.companyCity || '';
        this.companyCountryId = sellerAddRequest.companyCountryId || '';
        this.companyState = sellerAddRequest.companyState || '' ;
        this.pincode = sellerAddRequest.pincode || '';
        this.companyWebsite = sellerAddRequest.companyWebsite || '';
        this.mailStatus = sellerAddRequest.mailStatus || 0;
        this.status = sellerAddRequest.status || 0;
        this.ApprovalFlag = sellerAddRequest.ApprovalFlag || 1;
        this.commission = sellerAddRequest.commission || '';
        this.customerId = sellerAddRequest.customerId || '';
        this.paymentInformation = sellerAddRequest.paymentInformation || '';
        this.companyGstNumber = sellerAddRequest.companyGstNumber || '';
        this.companyCoverImage = sellerAddRequest.companyCoverImage || '';


    }
}
