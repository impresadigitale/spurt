/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import * as express from 'express';

export class CashondeliveryController {
    constructor(
    ) {
        // ---
    }

    public async cashondelivery(req: express.Request, res: express.Response): Promise<any> {
        res.render('pages/cashOnDelivery', {
            title: 'Cashondelivery',
            path: '../cashOnDelivery',
            });
    }
}
