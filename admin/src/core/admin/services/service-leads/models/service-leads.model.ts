/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ServiceLeadsListRequest {


    public limit: number;
    public offset: number;
    public keyword: string;
    public sortOrder: string;


    constructor(leadlistForm: any) {
        this.limit = leadlistForm.limit || '';
        this.offset = leadlistForm.offset || '';
        this.keyword = leadlistForm.keyword || '';
        this.sortOrder = leadlistForm.sortOrder || '';
    }
}
