/*
*
* Copyright (c) 2021 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BloglistModel {


    public limit: number;
    public offset: number;
    public categoryId: any;
    public keyword: string;
    public status: number;
    public count: number;

    constructor(bloglistForm: any) {
        this.limit = bloglistForm.limit || 0;
        this.offset = bloglistForm.offset || 0;
        this.categoryId = bloglistForm.categoryId || '';
        this.keyword = bloglistForm.keyword || '';
        if (bloglistForm.status === 0) {
            this.status = bloglistForm.status || 0 ;
        } else if (bloglistForm.status === 1) {
            this.status = bloglistForm.status || 0 ;
        }
        if (bloglistForm.count ) {
            this.count = bloglistForm.count || 1 ;
        }
    }
}
