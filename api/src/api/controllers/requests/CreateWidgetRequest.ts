/*
 * Spurtcommerce PRO
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateWidget {

    @IsNotEmpty()
    @MaxLength(255, {
        message: 'name should be maximum 255 characters',
    })
    public title: string;

    public content: string;

    @IsNotEmpty()
    public widgetLinkType: number;

    @MaxLength(60, {
        message: 'metatagTitle should be maximum 60 characters',
    })
    public metaTagTitle: string;
    @MaxLength(160, {
        message: 'metaTagDescription should be maximum 160 character',
    })
    public metaTagDescription: string;
    @MaxLength(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    })
    public metaTagKeyword: string;

    public position: number;
    @IsNotEmpty()
    public status: number;

    public refId: [];
}
