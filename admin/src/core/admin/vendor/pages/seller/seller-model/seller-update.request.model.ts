/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class SellerUpdateRequest {

    public customerGroupId: any;
    public firstName: string;
    public lastName: string;
    public mobileNumber: number;
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
    public companyEmailId: string;
    public companyGstNumber: any;
    public companyCoverImage: any;
    public password: string;
    public confirmPassword: string;



    constructor(sellerUpdateRequest: any) {
        this.customerGroupId = sellerUpdateRequest.customerGroupId || 'null';
        this.firstName = sellerUpdateRequest.firstName || '';
        this.lastName = sellerUpdateRequest.lastName || '';
        this.mobileNumber = sellerUpdateRequest.mobileNumber || '';
        this.avatar = sellerUpdateRequest.avatar || '';
        this.companyName = sellerUpdateRequest.companyName || '';
        this.companyLogo = sellerUpdateRequest.companyLogo || '';
        this.companyDescription = sellerUpdateRequest.companyDescription || '';
        this.companyAddress1 = sellerUpdateRequest.companyAddress1 || '';
        this.companyAddress2 = sellerUpdateRequest.companyAddress2 || '';
        this.companyCity = sellerUpdateRequest.companyCity || '';
        this.companyCountryId = sellerUpdateRequest.companyCountryId || '';
        this.companyState = sellerUpdateRequest.companyState || '' ;
        this.pincode = sellerUpdateRequest.pincode || '';
        this.companyWebsite = sellerUpdateRequest.companyWebsite || '';
        this.mailStatus = sellerUpdateRequest.mailStatus || 0;
        this.status = sellerUpdateRequest.status || 0;
        this.ApprovalFlag = sellerUpdateRequest.ApprovalFlag || 1;
        this.commission = sellerUpdateRequest.commission || '';
        this.customerId = sellerUpdateRequest.customerId || '';
        this.paymentInformation = sellerUpdateRequest.paymentInformation || '';
        this.companyEmailId = sellerUpdateRequest.companyEmailId || 'test@gmail.com';
        this.companyCoverImage = sellerUpdateRequest.companyCoverImage || '';
        this.password = sellerUpdateRequest.password || '';
        this.confirmPassword = sellerUpdateRequest.confirmPassword || '';

    }
}
