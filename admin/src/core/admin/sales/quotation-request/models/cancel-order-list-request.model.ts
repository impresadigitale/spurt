/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

export class CancelOrderListRequestModel {
    public limit: number;
    public offset: number;
    public keyword: string;
    public count: string;

    constructor(cancelOrderListForm: any) {
      this.limit = cancelOrderListForm.limit || '';
      this.offset = cancelOrderListForm.offset || '';
      this.keyword = cancelOrderListForm.keyword || '';
      this.count = cancelOrderListForm.count || '';
    }
  }
