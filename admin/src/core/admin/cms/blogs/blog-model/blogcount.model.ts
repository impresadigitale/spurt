/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BlogcountModel {


    public limit: number;
    public offset: number;
    public keyword: string;
    public count: string;
    public categoryId: any;



    constructor(blogcountForm: any) {
        this.limit = blogcountForm.limit || 0;
        this.offset = blogcountForm.offset || 0;
        this.keyword = blogcountForm.keyword || '';
        this.count = blogcountForm.count || '';
        this.categoryId = blogcountForm.categoryId || '';


    }
}
