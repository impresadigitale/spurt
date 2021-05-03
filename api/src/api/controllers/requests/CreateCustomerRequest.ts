/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MinLength, Matches, MaxLength} from 'class-validator';
export class CreateCustomer {

    @IsNotEmpty()
    public customerGroupId: number;

    @IsNotEmpty()
    public username: string;

    @MaxLength(96, {
        message: 'email should be maximum 96 characters',
    })
    @IsNotEmpty()
    public email: string;

    @MaxLength(15, {
        message: 'mobile number should be maximum 15 characters',
    })
    @IsNotEmpty({
        message: 'mobile number is required',
    })
    @MinLength(6, {
        message: 'mobile number should be minimum 6 character',
    })
    public mobileNumber: number;

    @MinLength(8, {
        message: 'password must contain minimum 8 character',
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/, {message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 or more characters'})
    @IsNotEmpty({
        message: 'password is required',
    })
    public password: string;

    @MinLength(8, {
        message: 'confirm password must contain minimum 8 character',
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/, {message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 or more characters'})
    @IsNotEmpty({
        message: 'confirm password is required',
    })
    public confirmPassword: string;
    public avatar: string;

    public newsletter: number;

    @IsNotEmpty()
    public mailStatus: number;

    @IsNotEmpty()
    public status: number;
}
