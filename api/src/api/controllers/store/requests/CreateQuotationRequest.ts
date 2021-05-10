/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength} from 'class-validator';
export class QuotationRequest {
    @MaxLength(9, {
        message: 'quantity should be maximum 9 digit',
    })
    @IsNotEmpty()
    public quantity: number;

    @IsNotEmpty()
    public productId: number;

    public quantityUnit: string;
    @MaxLength(255, {
        message: 'orderValue should be maximum 255 character',
    })
    @IsNotEmpty()
    public orderValue: string;

    public purpose: number;

    public comments: string;
}
