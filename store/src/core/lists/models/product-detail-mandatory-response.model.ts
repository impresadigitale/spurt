/*
 * spurtcommerce
 * version 4.4
 * www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { ProductOptionsDetailMandatoryResponseModel } from './product-options-detail-mandatory-response.model';

export class ProductDetailMandatoryResponseModel {
  public Category: Array<any>;
  public dateAvailable: string;
  public description: string;
  public location: string;
  public manufacturerId: string;
  public metaTagTitle: string;
  public minimumQuantity: string;
  public name: string;
  public price: string;
  public productId: string;
  public productImage: Array<any>;
  public quantity: string;
  public shipping: string;
  public sku: string;
  public sortOrder: string;
  public stockStatusId: string;
  public subtractStock: string;
  public pricerefer: number;
  public flag: any;
  public upc: string;
  public productOption: ProductOptionsDetailMandatoryResponseModel;
  public rating: number;
  public vendorId: number;
  public vendorName: string;
  public vendorCompanyName: string;
  public companyLogo: string;
  public companyLogoPath: string;
  public productSlug: string;
  public taxType: number;
  public taxValue: number;

  constructor(listResponse: any) {
    this.description = listResponse.description || '';
    this.Category = listResponse.Category || [];
    this.location = listResponse.location || '';
    this.dateAvailable = listResponse.dateAvailable || '';
    this.manufacturerId = listResponse.manufacturerId || '';
    this.metaTagTitle = listResponse.metaTagTitle || '';
    this.minimumQuantity = listResponse.minimumQuantity || '';
    this.name = listResponse.name || '';
    this.price = listResponse.price || '';
    this.productId = listResponse.productId || '';
    this.productImage = listResponse.productImage || [];
    this.quantity = listResponse.quantity || '';
    this.shipping = listResponse.shipping || '';
    this.sku = listResponse.sku || '';
    this.sortOrder = listResponse.sortOrder || '';
    this.stockStatusId = listResponse.stockStatusId || '';
    this.subtractStock = listResponse.subtractStock || '';
    this.upc = listResponse.upc || '';
    if (listResponse.flag === 0) {
      this.flag = listResponse.flag;
    } else if (listResponse.flag === 1) {
      this.flag = listResponse.flag;
    } else {
      this.flag = listResponse.flag;
    }
    this.pricerefer = listResponse.pricerefer || '';
    this.productOption = listResponse.productOption || [];
    this.vendorId = listResponse.vendorId || 0;
    this.vendorName = listResponse.vendorName || '';
    this.vendorCompanyName = listResponse.vendorCompanyName || '';
    this.companyLogo = listResponse.companyLogo || '';
    this.companyLogoPath = listResponse.companyLogoPath || '';
    this.productSlug = listResponse.productSlug || '';
    this.taxType = listResponse.taxType || 0;
    this.taxValue = listResponse.taxValue || 0;
  }
}
