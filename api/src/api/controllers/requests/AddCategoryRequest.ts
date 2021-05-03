/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';
export class AddCategory {

    @MaxLength(15, {
        message: 'Category name should be maximum 255 character',
    })
    @IsNotEmpty()
    public name: string;

    public image: string;

    public parentInt: number;

    @IsNotEmpty()
    public sortOrder: number;
    @MaxLength(60, {
        message: 'metatagTitle should be maximum 60 character',
    })
    public metaTagTitle: string;
    @MaxLength(160, {
        message: 'metatagDescription should be maximum 160 character',
    })
    public metaTagDescription: string;
    @MaxLength(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    })
    public metaTagKeyword: string;
    @IsNotEmpty()
    public status: number;
}
