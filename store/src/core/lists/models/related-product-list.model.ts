/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class RelatedProductListModel {
  public name: string;
  public description: string;
  public price: string;
  public image: Array<any>;
  public productId: number;
  public flag: any;
  public pricerefer: any;
  public productSlug: string;
  public taxType: number;
  public taxValue: number;


  constructor(listResponse: any) {
    this.name = listResponse.name || '';
    if (listResponse.flag === 0) {
      this.flag = 0;
    } else {
      this.flag = listResponse.flag || '';
    }
    this.pricerefer = listResponse.pricerefer || '';
    this.description = listResponse.description || '';
    this.price = listResponse.price || '';
    this.image = listResponse.productImage || [];
    this.productId = listResponse.productId || 0;
    this.productSlug = listResponse.productSlug || '';
    this.taxType = listResponse.taxType || 0;
    this.taxValue = listResponse.taxValue || 0;
  }
}
