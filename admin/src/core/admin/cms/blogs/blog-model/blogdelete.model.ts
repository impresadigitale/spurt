/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BlogdeleteModel {

    public blogId: number;

    constructor(deleteblog: any) {
            this.blogId = deleteblog.blogId || '';
    }
}
