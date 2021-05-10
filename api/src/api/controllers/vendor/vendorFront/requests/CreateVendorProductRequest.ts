/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export interface Image {
    image?: string;
    containerName?: string;
    defaultImage?: number;
}

export interface ProductVarientOption {
    id?: number;
    varientName?: string;
    price?: string;
    sku?: string;
    isActive?: number;
    quantity?: number;
    optionValue?: [];
    optionImage?: Image[];
}

export class CreateVendorProductRequest {

    @IsNotEmpty()
    public productName: string;

    // @IsNotEmpty()
    public productDescription: string;

    public pincodeBasedDelivery: number;

    @IsNotEmpty()
    public sku: string;

    public upc: string;

    public hsn: string;

    public productSlug: string;

    public quantity: number;

    public metaTagTitle: string;

    public metaTagDescription: string;

    public metaTagKeyword: string;

    @IsNotEmpty()
    public categoryId: string;

    public manufacturerId: number;

    @IsNotEmpty()
    public image: string;

    public price: number;

    public outOfStockStatus: number;

    // @IsNotEmpty()
    public requiredShipping: number;

    // @IsNotEmpty()
    public dateAvailable: string;

    // @IsNotEmpty()
    public sortOrder: number;

    public defaultImage: number;

    public relatedProductId: string;

    public packingCost: number;

    public shippingCost: number;

    public tax: number;

    public taxType: number;

    public others: number;

    public vendorProductCommission: number;

    public productOptions: [];

    public productDiscount: [];

    public productSpecial: [];

    @IsNotEmpty()
    public vendorId: number;

    public productVarient: [];

    public productVarientOption: ProductVarientOption[];
}
