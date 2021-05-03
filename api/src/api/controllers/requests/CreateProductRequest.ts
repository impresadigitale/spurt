/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty, MaxLength} from 'class-validator';

export interface Attribute {
    attributeId?: number;
    text?: string;
}
export interface Image {
    image?: string;
    containerName?: string;
    defaultImage?: number;
}

export interface ProductVarientOption {
    varientName?: string;
    price?: string;
    sku?: string;
    isActive?: number;
    quantity?: number;
    optionValue?: [];
    optionImage?: Image[];
}

export class AddProductRequest {
    @MaxLength(255, {
        message: 'productName should be maximum 255 character',
    })
    @IsNotEmpty({
        message: 'productName is required',
    })
    public productName: string;

    // @IsNotEmpty()
    public productDescription: string;
    @MaxLength(64, {
        message: 'sku should be maximum 64 character',
    })
    @IsNotEmpty()
    public sku: string;
    @MaxLength(12, {
        message: 'upc should be maximum 12 characters',
    })
    public upc: string;
    @MaxLength(64, {
        message: 'hsn should be maximum 64 characters',
    })
    public hsn: string;

    @MaxLength(255, {
        message: 'productSlug should be maximum 255 characters',
    })
    public productSlug: string;
    @MaxLength(60, {
        message: 'metatagTitle should be maximum 60 characters',
    })
    public metaTagTitle: string;
    @MaxLength(160, {
        message: 'metaTagDescription should be maximum 160 character',
    })
    public metaTagDescription: string;
    @MaxLength(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    })
    public metaTagKeyword: string;

    @IsNotEmpty()
    public categoryId: string;

    @IsNotEmpty()
    public image: string;

    @IsNotEmpty()
    public price: string;

    public quantity: number;

    public outOfStockStatus: number;

    // @IsNotEmpty()
    public requiredShipping: number;

    // @IsNotEmpty()
    public dateAvailable: string;

    @IsNotEmpty()
    public status: number;

    public manufacturerId: number;

    // @IsNotEmpty()
    public sortOrder: number;

    public defaultImage: number;

    public relatedProductId: string;

    public packingCost: number;

    public shippingCost: number;

    public tax: number;

    public taxType: number;

    public others: number;

    public height: string;

    public weight: string;

    public width: string;

    public length: string;

    public hasTirePrice: number;

    public pincodeBasedDelivery: number;

    public productDiscount: [];

    public productSpecial: [];

    public tirePrices: [];

    public productAttribute: Attribute[];

    public productVarient: [];

    public productVarientOption: ProductVarientOption[];
}
