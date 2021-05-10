/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class CreateQuestion {

    @IsNotEmpty({
        message: 'question is required',
    })
    public question: string;

    @IsNotEmpty({
        message: 'ProductId is required',
    })
    public productId: number;

    public answer: string;

    }
