/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/

export class BlogdeleteResponseModel {

    public blogdelete: any = {};

    constructor(deleteblog: any) {
        this.blogdelete = deleteblog || '';
    }
}
