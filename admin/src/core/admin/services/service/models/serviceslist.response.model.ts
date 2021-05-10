/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ServiceslistResponseModel {

    public createdDate: string;
    public description: string;
    public mobile: string;
    public serviceImage: string;
    public price: number;
    public serviceId: number;
    public title: string;
    public isActive: number;
    public metaTagDescription: string;
    public metaTagKeyword: string;
    public metaTagTitle: string;

    constructor(serviceslistResponse: any) {
        this.createdDate = serviceslistResponse.createdDate || '';
        this.description = serviceslistResponse.description || '';
        this.isActive = serviceslistResponse.isActive || 0;
        this.metaTagTitle = serviceslistResponse.metaTagTitle || '';
        this.metaTagKeyword = serviceslistResponse.metaTagKeyword || '';
        this.metaTagDescription = serviceslistResponse.metaTagDescription || '';
        this.mobile = serviceslistResponse.mobile || '';
        this.price = serviceslistResponse.price || 0;
        this.serviceId = serviceslistResponse.serviceId || 0;
        this.title = serviceslistResponse.title || '';
        this.serviceImage = serviceslistResponse.serviceImage || [];

    }

}
