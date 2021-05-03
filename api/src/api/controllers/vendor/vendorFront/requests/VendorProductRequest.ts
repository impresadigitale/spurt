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

export class VendorProductRequest {

    @IsNotEmpty()
    public productName: string;

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

    @IsNotEmpty()
    public image: string;

    @IsNotEmpty()
    public price: number;

    public manufacturerId: number;

    public location: string;

    public outOfStockStatus: number;

    public requiredShipping: number;

    public dateAvailable: string;

    public sortOrder: number;

    public defaultImage: number;

    public relatedProductId: string;

    public packingCost: number;

    public shippingCost: number;

    public tax: number;

    public taxType: number;

    public others: number;

    public productDiscount: [];

    public productSpecial: [];

    public productVarient: [];

    public productVarientOption: ProductVarientOption[];
}
