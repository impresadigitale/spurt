/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ProductUpdateModel {
    public vendorId: number;
    public productName: string;
    public productDescription: string;
    public upc: string;
    public sku: string;
    public hsn: any;

    public image: string;
    public categoryId: string;
    public location: string;
    public price: number;
    public quantity: string;
    public outOfStockStatus: number;
    public requiredShipping: number;
    public dateAvailable: string;
    public sortOrder: number;
    public productId: number;
    public relatedProductId: string;
    public productOptions: Array<any>;
    public productDiscount: Array<any>;
    public productSpecial: Array<any>;
    public packingCost: number;
    public shippingCost: number;
    public tax: number;
    public others: number;
    public manufacturerId: number;
    public pincodeBasedDelivery: number;

    public productVarientOption: any;
    public productVarient: any;

    public taxType: number;

    public metaTagTitle: string;
    public metaTagKeyword: string;
    public metaTagDescription: string;
    public productSlug: any;


    constructor(ProdupdateForm: any) {
      this.vendorId = ProdupdateForm.vendorId || '';
      this.productName = ProdupdateForm.productName || '';
      this.productDescription = ProdupdateForm.productDescription || '';
      this.upc = ProdupdateForm.upc || '';
      this.sku = ProdupdateForm.sku || '';
      this.hsn = ProdupdateForm.hsn || '';
      this.image = ProdupdateForm.image || '';
      this.metaTagTitle = ProdupdateForm.metaTagTitle || '';
      this.categoryId = ProdupdateForm.categoryId || '';
      this.location = ProdupdateForm.location || '';
      this.price = ProdupdateForm.price || 0;
      this.packingCost = ProdupdateForm.packingCost || 0;
      this.shippingCost = ProdupdateForm.shippingCost || 0;
      this.tax = ProdupdateForm.tax || 0;
      this.others = ProdupdateForm.others || 0;
      this.quantity = ProdupdateForm.quantity || 0;
      this.outOfStockStatus = ProdupdateForm.outOfStockStatus || '';
      this.requiredShipping = ProdupdateForm.requiredShipping || '0';
      this.dateAvailable = ProdupdateForm.dateAvailable || '';
      this.sortOrder = ProdupdateForm.sortOrder || 0;
      this.productId = ProdupdateForm.productId || '';
      this.relatedProductId = ProdupdateForm.relatedProductId || '';
      this.productOptions = ProdupdateForm.productOptions || [];
      this.productDiscount = ProdupdateForm.productDiscount || [];
      this.productSpecial = ProdupdateForm.productSpecial || [];
      this.relatedProductId = ProdupdateForm.relatedProductId || '';
      this.productOptions = ProdupdateForm.productOptions || [];
      this.productDiscount = ProdupdateForm.productDiscount || [];
      this.productSpecial = ProdupdateForm.productSpecial || [];
      this.manufacturerId = ProdupdateForm.manufacturerId || '';
      this.pincodeBasedDelivery = ProdupdateForm.pincodeBasedDelivery || 0;
      this.metaTagKeyword = ProdupdateForm.metaTagKeyword || '';
      this.metaTagDescription = ProdupdateForm.metaTagDescription || '';


      this.productVarientOption = ProdupdateForm.productVarientOption;
      this.productVarient = ProdupdateForm.productVarient;
      this.taxType = ProdupdateForm.taxType;
      this.productSlug = ProdupdateForm.productSlug || '';


    }

  }
