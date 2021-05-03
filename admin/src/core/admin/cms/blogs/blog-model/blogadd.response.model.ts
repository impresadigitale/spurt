/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/


export class BlogaddResponseModel {

    public blogId: number;
    public position: number;
    public content: string;
    public image: string;
    public imagePath: string;
    public link: string;
    public title: string;
    public createdDate: string;


    constructor(blogaddResponse: any) {
        this.blogId = blogaddResponse.blogId || 0;
        this.position = blogaddResponse.position || 0;
        this.content = blogaddResponse.content || '';
        this.image = blogaddResponse.image || '';
        this.imagePath = blogaddResponse.imagePath || '';
        this.link = blogaddResponse.link || '';
        this.title = blogaddResponse.title || '';
        this.createdDate = blogaddResponse.createdDate || '';


    }

}
