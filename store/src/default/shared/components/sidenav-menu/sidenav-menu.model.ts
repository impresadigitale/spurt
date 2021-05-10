/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class SidenavMenu {
    constructor(public id: number,
                public title: string,
                public routerLink: string,
                public href: string,
                public target: string,
                public hasSubMenu: boolean,
                public parentId: number) { }
}

