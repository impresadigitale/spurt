/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength} from 'class-validator';

export class UpdateManufacturer {

    @IsNotEmpty()
    public manufacturerId: number;

    @MaxLength(64, {
        message: 'Name should be maximum 64 character',
    })
    @IsNotEmpty()
    public name: string;

    public image: string;

    @IsNotEmpty({
        message: 'sortOrder is required',
    })
    public sortOrder: number;

    @IsNotEmpty({
        message: 'status is required',
    })
    public status: number;
}
