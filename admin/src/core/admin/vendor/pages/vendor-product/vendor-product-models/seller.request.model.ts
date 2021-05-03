/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class SellerListRequest {


    public limit: number;
    public offset: number;
    public name: string;
    public email: string;
    public status: number;
    public count: number;
    public customerId: number;
    public vendorId: number;


    constructor(sellerListRequest: any) {
        this.limit = sellerListRequest.limit || '';
        this.offset = sellerListRequest.offset || '';
        this.name = sellerListRequest.name || '';
        this.email = sellerListRequest.email || '';
        this.status = sellerListRequest.status;
        this.count = sellerListRequest.count || '';
        this.customerId = sellerListRequest.customerId || '';
        this.vendorId = sellerListRequest.vendorId || '';
    }
}
