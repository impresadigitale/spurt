/*
 * spurtcommerce
 * version 2.1
* www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class BlogListModel {
    public createdDate: string;
    public title: string;
    public id: number;
    public categoryId: string;
    public description: string;
    public image: string;
    public imagePath: string;
    public isActive: string;
    public metaTagTitle: string;
    public metaTagDescription: string;
    public metaTagKeyword: string;
    public categoryName: string;
    public createdByImage: string;
    public createdByImagePath: string;
    public blogSlug: string;
    constructor(blog: any) {
        this.createdDate = blog.createdDate || '';
        this.id = blog.id;
        this.title = blog.title || '';
        this.categoryId = blog.categoryId || '';
        this.description = blog.description || '';
        this.image = blog.image || '';
        this.imagePath = blog.imagePath || '';
        this.isActive = blog.isActive || '';
        this.metaTagTitle = blog.metaTagTitle || '';
        this.metaTagDescription = blog.metaTagDescription || '';
        this.categoryName = blog.categoryName || '';
        this.metaTagKeyword = blog.metaTagKeyword || '';
        this.createdByImage = blog.createdByImage || '';
        this.createdByImagePath = blog.createdByImagePath || '';
        this.blogSlug = blog.blogSlug || '';
    }
}
