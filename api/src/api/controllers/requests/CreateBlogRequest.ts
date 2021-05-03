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
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBlog {

    @MaxLength(255, {
        message: 'title should be maximum 255 characters',
    })
    @IsNotEmpty()
    public title: string;

    @IsNotEmpty({
        message: 'categoryId is required',
    })
    public categoryId: number;

    @IsNotEmpty({
        message: 'description is required',
    })
    public description: string;

    public image: string;

    @IsNotEmpty()
    public status: number;
    @MaxLength(60, {
        message: 'metaTagTitle should be maximum 60 characters',
    })
    public metaTagTitle: string;
    @MaxLength(160, {
        message: 'metaTagDescription should be maximum 160 characters',
    })
    public metaTagDescription: string;

    public metaTagKeyword: string;

    public relatedBlogId: string;
}
