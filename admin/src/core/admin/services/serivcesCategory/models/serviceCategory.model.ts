/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ServiceCategoryForm {

    public name: string;
    public sortOrder: number;
    public metaTagDescription: string;
    public metaTagKeyword: string;
    public metaTagTitle: string;
    public parentInt: number;
    public image: string;
    public status: number;
    public serviceCategoryId: number;


    constructor(categoryForm: any) {
        this.name = categoryForm.name || '';
        this.sortOrder = categoryForm.sortOrder || 0;
        this.metaTagDescription = categoryForm.metaTagDescription || '';
        this.metaTagKeyword = categoryForm.metaTagKeyword || '';
        this.metaTagTitle = categoryForm.metaTagTitle || '';
        this.parentInt = categoryForm.parentInt || 0;
        this.image = categoryForm.image || '';
        this.status = categoryForm.status || '';
        if (categoryForm && categoryForm.serviceCategoryId) {
            this.serviceCategoryId = categoryForm.serviceCategoryId || 0;
        }
    }
}
