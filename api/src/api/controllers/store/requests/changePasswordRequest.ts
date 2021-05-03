/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty , Matches, MinLength} from 'class-validator';

export class ChangePassword {

    @MinLength(5, {
        message: 'Old Password is minimum 5 character',
    })
    @IsNotEmpty()
    public oldPassword: string;

    @MinLength(8, {
        message: 'password must contain minimum 8 character',
    })
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/, {message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 or more characters'})
    @IsNotEmpty({
        message: 'password is required',
    })
    public newPassword: string;
}
