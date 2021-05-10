/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MinLength, IsOptional, Matches, MaxLength} from 'class-validator';
export class CustomerRegisterRequest {
    @IsNotEmpty({
        message: 'firstname is required',
    })
    @MaxLength(32, {
        message: 'firstname should be maximum 32 character',
    })
    public name: string;

    public lastName: string;

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
    @MaxLength(96, {
        message: 'emailId should be maximum 96 character',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;

    @IsOptional()
    public phoneNumber: number;
}
