/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ServiceupdateForm {


    public serviceCategoryId: string;
    public serviceId: string;
    public title: string;
    public description: string;
    public mobile: number;
    public price: number;
    public image: string;
    public metaTagTitle: string;
    public metaTagDescription: string;
    public metaTagKeyword: string;
    public status: number;

    constructor(serviceupdateForm: any) {
        this.serviceId = serviceupdateForm.serviceId || '';
        this.serviceCategoryId = serviceupdateForm.categoryId || '';
        this.title = serviceupdateForm.title || '';
        this.description = serviceupdateForm.description || '';
        this.mobile = serviceupdateForm.mobile || 0;
        this.price = serviceupdateForm.price || 0;
        this.image = serviceupdateForm.image || '';
        this.metaTagTitle = serviceupdateForm.metaTagTitle || '';
        this.metaTagDescription = serviceupdateForm.metaTagDescription || '';
        this.metaTagKeyword = serviceupdateForm.metaTagKeyword || '';
        this.status = serviceupdateForm.status || 0;
    }
}
