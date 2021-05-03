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
  public productName: string;
  public productDescription: string;
  public upc: string;
  public sku: string;
  public image: string;
  public metaTagTitle: string;
  public categoryId: string;
  public model: number;
  public location: string;
  public price: number;
  public packingCost: number;
  public shippingCost: number;
  public tax: number;
  public others: number;
  public outOfStockStatus: number;
  public requiredShipping: number;
  public dateAvailable: string;
  public status: number;
  public sortOrder: number;
  public productId: number;
  public condition: string;
  public relatedProductId: string;
  public productOptions: Array<any>;
  public productDiscount: Array<any>;
  public productSpecial: Array<any>;
  public pincodeBasedDelivery: any;
  public manufacturerId: any;

  public productVarientOption: any;
  public productVarient: any;
  public taxType: number;
  public hsn: any;




  constructor(ProdupdateForm: any) {
    this.productName = ProdupdateForm.productName || '';
    this.productDescription = ProdupdateForm.productDescription || '';
    this.upc = ProdupdateForm.upc || '';
    this.sku = ProdupdateForm.sku || '';
    this.image = ProdupdateForm.image || '';
    this.metaTagTitle = ProdupdateForm.metaTagTitle || '';
    this.categoryId = ProdupdateForm.categoryId || '';
    this.model = ProdupdateForm.model || 0;
    this.location = ProdupdateForm.location || '';
    this.price = ProdupdateForm.price || 0;
    this.packingCost = ProdupdateForm.packingCost || 0;
    this.shippingCost = ProdupdateForm.shippingCost || 0;
    this.tax = ProdupdateForm.tax || 0;
    this.others = ProdupdateForm.others || 0;
    this.outOfStockStatus = ProdupdateForm.outOfStockStatus || '';
    this.dateAvailable = ProdupdateForm.dateAvailable || '';
    this.status = ProdupdateForm.status || 0;
    this.sortOrder = ProdupdateForm.sortOrder || 0;
    this.productId = ProdupdateForm.productId || 0;
    this.condition = ProdupdateForm.condition || '';
    this.relatedProductId = ProdupdateForm.relatedProductId || '';
    this.productOptions = ProdupdateForm.productOptions || [];
    this.productDiscount = ProdupdateForm.productDiscount || [];
    this.productSpecial = ProdupdateForm.productSpecial || [];
    this.pincodeBasedDelivery = ProdupdateForm.pincodeBasedDelivery;
    this.manufacturerId = ProdupdateForm.manufacturerId;

    this.productVarientOption = ProdupdateForm.productVarientOption;
    this.productVarient = ProdupdateForm.productVarient;
    this.taxType = ProdupdateForm.taxType || 0;
    this.hsn = ProdupdateForm.hsn || '';

  }
}
