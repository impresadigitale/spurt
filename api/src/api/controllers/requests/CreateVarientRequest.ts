/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength} from 'class-validator';

export interface VarientsValue {
    valueName?: string;
    sortOrder?: number;
}

export class CreateVarients {
    @MaxLength(255, {
        message: 'name should be maximum 255 character',
    })
    @IsNotEmpty()
    public name: string;

    public type: string;

    @IsNotEmpty()
    public sortOrder: number;

    public varientsValue: VarientsValue[];
}