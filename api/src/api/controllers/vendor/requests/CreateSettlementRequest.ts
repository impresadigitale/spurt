/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSettlementRequest {
    @IsNotEmpty({
        message: 'title is required',
    })
    @MaxLength(255, {
        message: 'productName should be maximum 255 character',
    })
    public title: string;

    @IsNotEmpty()
    public vendorOrderId: [];

}
