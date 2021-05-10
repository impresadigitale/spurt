/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class SettingListRequest {


    public limit: number;
    public offset: number;
    public name: string;
    public email: string;
    public status: number;
    public count: number;
    public customerId: number;


    constructor(settingListRequest: any) {
        this.limit = settingListRequest.limit || '';
        this.offset = settingListRequest.offset || '';
        this.name = settingListRequest.name || '';
        this.email = settingListRequest.email || '';
        this.status = settingListRequest.status;
        this.count = settingListRequest.count || '';
        this.customerId = settingListRequest.customerId || '';
    }
}
