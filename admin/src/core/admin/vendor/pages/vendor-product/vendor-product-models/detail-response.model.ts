/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class DetailResponseModel {
    public vendorId: number;
    public productId: number;
    public sku: string;
    public upc: string;
    public location: string;
    public quantity: number;
    public minimumQuantity: number;
    public subtractStock: number;
    public stockStatusId: number;
    public manufacturerId: string;
    public shipping: string;
    public dateAvailable: string;
    public sortOrder: string;
    public price: number;
    public name: string;
    public description: string;
    public metaTagTitle: string;

    public Category: any;
    public productImage: any;
    public relatedProductDetail: any;
    public productOption: any;
    public productDiscount: any;
    public productSpecialPrice: any;
    public pricerefer: number;
    public productSlug: string;
    public metaTagDescription: string;
    public metaTagKeyword: string;
    public productCost: number;
    public packingCost: number;
    public shippingCost: number;
    public tax: number;
    public others: number;

    public productvarientList: any;
    public productVarient: any;

    public taxType: number;



    constructor(detailResponse: any) {
      this.vendorId = detailResponse.vendorId || '';
      this.productId = detailResponse.productId || '';
      this.sku = detailResponse.sku || '';
      this.upc = detailResponse.upc || '';
      this.location = detailResponse.location || '';
      this.shipping = detailResponse.shipping || '';
      this.dateAvailable = detailResponse.dateAvailable || '';
      this.sortOrder = detailResponse.sortOrder || '';
      this.quantity = detailResponse.quantity || 0;
      this.minimumQuantity = detailResponse.minimumQuantity || 0;
      this.subtractStock = detailResponse.subtractStock || 0;
      this.stockStatusId = detailResponse.stockStatusId || 0;
      this.manufacturerId = detailResponse.manufacturerId || 0;
      this.price = detailResponse.price || 0;
      this.name = detailResponse.name || '';
      this.description = detailResponse.description || '';
      this.metaTagTitle = detailResponse.metaTagTitle || '';
      this.metaTagDescription = detailResponse.metaTagDescription || '';
      this.metaTagKeyword = detailResponse.metaTagKeyword || '';
  
      this.Category = detailResponse.Category || [];
      this.productImage = detailResponse.productImage || [];
      this.relatedProductDetail = detailResponse.relatedProductDetail || [];
      this.productOption = detailResponse.productOption || [];
      this.productDiscount = detailResponse.productDiscountData || [];
      this.productSpecialPrice = detailResponse.productSpecialPrice || [];
      this.pricerefer = detailResponse.pricerefer || 0;
      this.productSlug = detailResponse.productSlug || 0;
      this.productCost = detailResponse.productCost || 0;
      this.packingCost = detailResponse.packingCost || 0;
      this.shippingCost = detailResponse.shippingCost || 0;
      this.tax = detailResponse.tax || 0;
      this.others = detailResponse.others || 0;

      this.productvarientList = detailResponse.productvarientList;
      this.productVarient = detailResponse.productVarient;
      this.taxType = detailResponse.taxType || 0;


    }
  }
