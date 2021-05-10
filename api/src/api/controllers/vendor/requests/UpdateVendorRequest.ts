/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class UpdateVendor {

    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsNotEmpty()
    public mobileNumber: number;

    public avatar: string;

    @IsNotEmpty()
    public mailStatus: number;

    @IsNotEmpty()
    public status: number;

    public approvalFlag: number;

    public commission: number;

    public companyName: string;

    public companyLogo: string;

    public companyCoverImage: string;

    public companyDescription: string;

    public companyAddress1: string;

    public companyAddress2: string;

    public companyCity: string;

    public companyState: string;

    public companyCountryId: number;

    public pincode: string;

    public companyMobileNumber: number;

    public companyEmailId: string;

    public companyWebsite: string;

    public companyGstNumber: string;

    public companyPanNumber: string;

    public paymentInformation: number;

}
