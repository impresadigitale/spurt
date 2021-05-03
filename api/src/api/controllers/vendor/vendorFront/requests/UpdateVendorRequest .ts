/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';
export class UpdateVendorRequest {
    @IsNotEmpty({
        message: 'first name is required',
    })
    public firstName: string;

    @IsNotEmpty({
        message: 'last name is required',
    })
    public lastName: string;

    public avatar: string;

    public designation: string;

    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public email: string;

    @IsNotEmpty({
        message: 'mobile number is required',
    })
    public mobileNumber: number;

    public companyName: string;

    public companyLogo: string;

    public companyCoverImage: string;

    public companyAddress1: string;

    public companyAddress2: string;

    public companyCity: string;

    public companyState: string;

    public companyCountryId: number;

    public pincode: number;

    public companyMobileNumber: number;

    public companyEmailId: string;

    public companyWebsite: string;

    public companyGstNumber: string;

    public companyPanNumber: string;

    public paymentInformation: string;
}
