/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ServiceCategorylistForm {


    public limit: number;
    public offset: number;
    public keyword: string;
    public count: number;
    public sortOrder: number;


    constructor(categorylistForm: any) {
        this.limit = categorylistForm.limit || 0;
        this.offset = categorylistForm.offset || '';
        this.keyword = categorylistForm.keyword || '';
        this.count = categorylistForm.count || 0;
        this.sortOrder = categorylistForm.sortOrder || 0;
    }
}
