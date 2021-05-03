/*
 * spurtcommerce
 * version 2.1
* www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class ServiceCategoryModel {
    public limit: number;
    public offset: number;
    public keyword: string;
    public count: number;

    constructor(serviceCategory: any) {
        this.limit = serviceCategory.limit || 0;
        this.offset = serviceCategory.offset || 0;
        this.keyword = serviceCategory.keyword || '';
        this.count = serviceCategory.count || 0;
    }
}
