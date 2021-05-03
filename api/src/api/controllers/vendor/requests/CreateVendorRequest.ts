/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, Matches, MinLength} from 'class-validator';

export class CreateVendorRequest {

    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    public email: string;

    @IsNotEmpty()
    public mobileNumber: number;

    @MinLength(8, {
        message: 'password is minimum 8 character',
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/, {message: 'Password must contain at least one number or one uppercase and lowercase letter, and at least 8 or more characters'})
    @IsNotEmpty({
        message: 'password is required',
    })
    public password: string;

    @IsNotEmpty()
    public confirmPassword: string;

    public avatar: string;

    @IsNotEmpty()
    public mailStatus: number;

    @IsNotEmpty()
    public status: number;

    public commission: number;

    public companyName: string;

    public companyLocation: string;

    public companyLogo: string;

    public companyCoverImage: string;

    public companyDescription: string;

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
