/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength, MinLength, ValidateIf} from 'class-validator';
export class ContactRequest {
    @MaxLength(255, {
        message: 'name should be maximum 255 character',
    })
    @IsNotEmpty({
        message: 'name is required',
    })
    public name: string;
    @MaxLength(255, {
        message: 'Email Id should be maximum 96 character',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public email: string;
    @MaxLength(255, {
        message: 'Phone Number should be maximum 15 character',
    })
    @ValidateIf(o => o.phoneNumber !== '')
    @IsNotEmpty({
        message: 'Phone Number is required',
    })
    public phoneNumber: string;

    @MinLength(6, {
        message: 'Message should be minimum 6 character',
    })
    @IsNotEmpty({
        message: 'Message is required',
    })
    public message: string;
}
