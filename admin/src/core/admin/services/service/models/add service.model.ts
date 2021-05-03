/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class AddserviceForm {


    public serviceCategoryId: string;
    public title: string;
    public description: string;
    public mobile: number;
    public price: number;
    public image: string;
    public metaTagTitle: string;
    public metaTagDescription: string;
    public metaTagKeyword: string;
    public status: number;


    constructor(addServiceForm: any) {
        this.serviceCategoryId = addServiceForm.categoryId || '';
        this.title = addServiceForm.title || '';
        this.description = addServiceForm.description || '';
        this.mobile = addServiceForm.mobile || 0;
        this.price = addServiceForm.price || 0;
        this.image = addServiceForm.image || '';
        this.metaTagTitle = addServiceForm.metaTagTitle || '';
        this.metaTagDescription = addServiceForm.metaTagDescription || '';
        this.metaTagKeyword = addServiceForm.metaTagKeyword || '';
        this.status = addServiceForm.status || 0;
    }
}
