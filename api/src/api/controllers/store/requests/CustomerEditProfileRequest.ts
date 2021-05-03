/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength, ValidateIf} from 'class-validator';

export class CustomerEditProfileRequest {
    // @IsString()
    @MaxLength(32, {
        message: 'firstname should be maximum 32 character',
    })
    @IsNotEmpty({
        message: 'First name is required',
    })
    public firstName: string;
    @MaxLength(32, {
        message: 'lastname should be maximum 32 character',
    })
    public lastName: string;

    @MaxLength(96, {
        message: 'email should be maximum 96 character',
    })
    @IsNotEmpty({
        message: 'Email Id is required',
    })
    public emailId: string;

    @ValidateIf(o => o.phoneNumber !== '')
    @MaxLength(15, {
        message: 'Phone Number should be maximum 15 character',
    })
    public phoneNumber: number;

    public image: string;
}
