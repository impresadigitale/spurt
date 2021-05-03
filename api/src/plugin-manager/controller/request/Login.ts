/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class Login {

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty({
        message: 'Password is required',
    })
    public password: string;
}
