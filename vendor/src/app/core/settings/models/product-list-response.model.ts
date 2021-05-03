/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class ProductListResponseModel {
  public approvalFlag: number;
  public createdDate: string;
  public discount: string;
  public earnings: string;
  public isActive: number;
  public keywords: string;
  public name: string;
  public productId: number;
  public productImage: object;
  public productSlug: string;
  public productprice: string;
  public quantity: number;
  public sku: string;
  public sortOrder: number;
  public special: string;
  public vendorCategory: object;
  public vendorId: number;
  public vendorName: string;
  public vendorProductCommission: number;
  public vendorProductId: number;

  constructor(productListResponse: any) {
    this.approvalFlag = productListResponse.approvalFlag || null;
    this.createdDate = productListResponse.createdDate || null;
    this.discount = productListResponse.discount || null;
    this.earnings = productListResponse.earnings || null;
    this.isActive = productListResponse.isActive || null;
    this.keywords = productListResponse.keywords || null;
    this.name = productListResponse.name || null;
    this.productId = productListResponse.productId || null;
    this.productImage = productListResponse.productImage || {};
    this.productSlug = productListResponse.productSlug || null;
    this.productprice = productListResponse.productprice || null;
    this.quantity = productListResponse.quantity || null;
    this.sku = productListResponse.sku || null;
    this.sortOrder = productListResponse.sortOrder || null;
    this.special = productListResponse.special || null;
    this.vendorCategory = productListResponse.vendorCategory || {};
    this.vendorId = productListResponse.vendorId || null;
    this.vendorName = productListResponse.vendorName || null;
    this.vendorProductCommission = productListResponse.vendorProductCommission || null;
    this.vendorProductId = productListResponse.vendorProductId || null;

  }
}