/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ProductAddModel {
    public vendorId: number;
    public productName: string;
    public productDescription: string;
    public upc: string;
    public sku: string;
    public hsn: any;
    public image: string;
    public productSlug: string;
    public categoryId: string;
    public location: string;
    public price: number;
    public quantity: string;
    public outOfStockStatus: number;
    public requiredShipping: number;
    public dateAvailable: string;
    public sortOrder: number;
    public relatedProductId: string;
    public productOptions: Array<any>;
    public productDiscount: Array<any>;
    public productSpecial: Array<any>;
    public packingCost: number;
    public shippingCost: number;
    public tax: number;
    public others: number;
    public metaTagTitle: string;
    public metaTagKeyword: string;
    public metaTagDescription: string;
    public manufacturerId: number;
    public pincodeBasedDelivery: number;

    public productVarientOption: any;
    public productVarient: any;

    public taxType: number;


    constructor(fromProductAdd: any) {
        this.vendorId = fromProductAdd.vendorId || '';
      this.productName = fromProductAdd.productName || '';
      this.productDescription = fromProductAdd.productDescription || '';
      this.upc = fromProductAdd.upc || '';
      this.sku = fromProductAdd.sku || '';
      this.hsn = fromProductAdd.hsn || '';
      this.image = fromProductAdd.image || '';
      this.productSlug = fromProductAdd.productSlug || '';
      this.categoryId = fromProductAdd.categoryId || '';
      this.location = fromProductAdd.location || '';
      this.price = fromProductAdd.price || '';
      this.packingCost = fromProductAdd.packingCost || 0;
      this.shippingCost = fromProductAdd.shippingCost || 0;
      this.tax = fromProductAdd.tax || 0;
      this.others = fromProductAdd.others || 0;
      this.quantity = fromProductAdd.quantity || 0;
      this.outOfStockStatus = fromProductAdd.outOfStockStatus || '';
      this.requiredShipping = fromProductAdd.requiredShipping !== '' ? fromProductAdd.requiredShipping : null;
      this.dateAvailable = fromProductAdd.dateAvailable || '';
      this.sortOrder = fromProductAdd.sortOrder || 0;
      this.relatedProductId = fromProductAdd.relatedProductId || '';
      this.productOptions = fromProductAdd.productOptions || [];
      this.productDiscount = fromProductAdd.productDiscount || [];
      this.productSpecial = fromProductAdd.productSpecial || [];
      this.metaTagTitle = fromProductAdd.metaTagTitle || '';
      this.metaTagKeyword = fromProductAdd.metaTagKeyword || '';
      this.metaTagDescription = fromProductAdd.metaTagDescription || '';
      this.manufacturerId = fromProductAdd.manufacturerId || '';
      this.pincodeBasedDelivery = fromProductAdd.pincodeBasedDelivery || 0;
      this.productVarientOption = fromProductAdd.productVarientOption;
      this.productVarient = fromProductAdd.productVarient;
      this.taxType = fromProductAdd.taxType;

    }
  }
