/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BlogupdateResponseModel {
    public title: string;
    public content: string;
    public image: string;
    public link: string;
    public position: string;
    public blogId: number;

    constructor(updateResponse: any) {
        this.title = updateResponse.title || '';
        this.content = updateResponse.content || '';
        this.image = updateResponse.image || '';
        this.link = updateResponse.link || '';
        this.position = updateResponse.position || '';
        this.blogId = updateResponse.blogId || '';
    }
}
