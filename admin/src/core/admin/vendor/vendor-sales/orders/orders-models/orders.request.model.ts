/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class OrdersListRequest {


    public limit: number;
    public offset: number;
    public customerName: string;
    public startDate: string;
    public endDate: number;
    public count: number;


    constructor(ordersListRequest: any) {
        this.limit = ordersListRequest.limit || '';
        this.offset = ordersListRequest.offset || '';
        this.customerName	 = ordersListRequest.customerName	 || '';
        this.startDate = ordersListRequest.startDate || '';
        this.endDate = ordersListRequest.endDate;
        this.count = ordersListRequest.count || '';
    }
}
