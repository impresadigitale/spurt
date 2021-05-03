/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength} from 'class-validator';

export class CreateAttribute {

    @IsNotEmpty({
        message: 'Attribute name is required',
    })
    @MaxLength(255, {
        message: 'attribute name should be maximum 255 characters',
    })
    public attributeName: string;

    @IsNotEmpty({
        message: 'group is required',
    })
    public groupId: number;

    @IsNotEmpty({
        message: 'sortOrder is required',
    })
    public sortOrder: number;

}
