/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import 'reflect-metadata';
export class CreateCartRequest {
    @IsNotEmpty({
        message: 'productId is required',
    })
    public productId: number;

    public productPrice: number;

    public tirePrice: number;

    public quantity: number;

    public optionName: string;

    public optionValueName: string;

    public varientName: string;

    public productVarientOptionId: string;

    public skuName: string;

    public type: string;
}
