/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
export class UpdateFeatureProduct {

    @IsNotEmpty({
        message: 'isFeature is required',
    })
    public isFeature: number;
}
