/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ServiceslistForm {


    public limit: number;
    public offset: number;
    public keyword: string;
    public count: number;
    public status: any;
    public price: any;

    constructor(serviceslistForm: any) {
        this.limit = serviceslistForm.limit || 0;
        this.offset = serviceslistForm.offset || '';
        this.keyword = serviceslistForm.keyword || '';
        this.count = serviceslistForm.count || 0;
        this.status = serviceslistForm.status;
        this.price = serviceslistForm.price || '';
    }
}
