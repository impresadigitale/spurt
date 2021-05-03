/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BlogForm {


    public title: string;
    public content: string;
    public image: string;
    public link: string;
    public position: string;
    public blogId: number;

    constructor(blogForm: any) {

        this.title = blogForm.title || '';
        this.content = blogForm.content || '';
        this.image = blogForm.image || '';
        this.link = blogForm.link || '';
        this.position = blogForm.position || '';
        if (blogForm.blogId) {
            this.blogId = blogForm.blogId || '';
        }
    }
}
