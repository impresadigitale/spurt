/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MinLength, IsOptional, Matches} from 'class-validator';
export class VendorRegisterRequest {
    @IsNotEmpty({
        message: 'first name is required',
    })
    public firstName: string;

    public lastName: string;

    public contactPersonName: string;

    @MinLength(8, {
        message: 'password must contain minimum 8 character',
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/, {message: 'Password must contain at least one number or one uppercase and lowercase letter, and at least 8 or more characters'})
    @IsNotEmpty({
        message: 'password is required',
    })
    public password: string;

    @IsNotEmpty()
    public confirmPassword: string;

    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;

    @IsOptional()
    public phoneNumber: number;
}
