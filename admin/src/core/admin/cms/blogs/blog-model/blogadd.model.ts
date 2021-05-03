/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BlogaddModel {


    public title: string;
    public categoryId: any;
    public description: string;
    public image: string;
    public status: string;
    public metaTagTitle: string;
    public metaTagDescription: string;
    public metaTagKeyword: string;
    public relatedBlogId: any;
    constructor(blogForm: any) {
        this.title = blogForm.blogTitle || '';
        this.categoryId = blogForm.categories || '';
        this.description = blogForm.description	 || '';
        this.image = blogForm.image || '';
        this.status = String(blogForm.status) || '';
        this.metaTagTitle = blogForm.metaTitle || '';
        this.metaTagDescription = blogForm.metaContent || '';
        this.metaTagKeyword = blogForm.metaKeyword || '';
        this.relatedBlogId = blogForm.relatedBlogId || [];
    }
}
