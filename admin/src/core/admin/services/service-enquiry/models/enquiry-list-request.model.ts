/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class EnquiryListRequest {


    public limit: number;
    public offset: number;
    public keyword: string;
    public count: number;

    constructor(enquirylistForm: any) {
        this.limit = enquirylistForm.limit || '';
        this.offset = enquirylistForm.offset || '';
        this.keyword = enquirylistForm.keyword || '';
        this.count = enquirylistForm.count || 0;
    }
}
