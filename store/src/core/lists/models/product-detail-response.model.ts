/*
 * spurtcommerce
 * version 4.4
* www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */


import {ProductOptionsDetailResponseModel} from './product-options-detail-response.model';

export class ProductDetailResponseModel {
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
    public productOriginalImage: Array<any>;
    public quantity: string;
    public shipping: string;
    public sku: string;
    public sortOrder: string;
    public stockStatusId: string;
    public subtractStock: string;
    public pricerefer: string;
    public flag: any;
    public upc: string;
    public productOption: ProductOptionsDetailResponseModel;
    public rating: number;
    public wishListStatus: number;
    public vendorId: number;
    public vendorName: string;
    public vendorCompanyName: string;
    public companyLogo: string;
    public companyLogoPath: string;
    public productSlug: string;
    public taxType: number;
    public taxValue: number;
    public buyed: number;
    public pincodeBasedDelivery: number;
    public hasStock: number;
    public minQuantityAllowedCart: number;
    public maxQuantityAllowedCart: number;
    public outOfStockThreshold: number;
    public enableBackOrders: number;
    public stockStatus: string;
    public hasTirePrice: number;
    public productTirePrices: Array<any>;
    public tirePrice: any;
    public vendorSlugName: any;
    public quotationAvailable: number;
    public discount: number;

    public  vendorCompanyCity: any;
    public  vendorCompanyState: any;
    public vendorPrefixId: string;

    public productVariant: any;
    public productVariantDetail: any;
    public productVariantList: any;
    public skuName: string;
    public skuId: number;
    public isSimplified: number;
    public selectedVariant: any;
    public variantName: string;
    public variantId: number;
    public isAvailable: boolean;
    public variantTirePrice: any;
    public productAttributes: any;


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
        this.productOriginalImage = listResponse.productOriginalImage || [];
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
        this.rating = listResponse.rating || 0;
        this.wishListStatus = listResponse.wishListStatus || 0;
        this.vendorId = listResponse.vendorId || 0;
        this.vendorName = listResponse.vendorName || '';
        this.vendorCompanyName = listResponse.vendorCompanyName || '';
        this.companyLogo = listResponse.companyLogo || '';
        this.companyLogoPath = listResponse.companyLogoPath || '';
        this.productSlug = listResponse.productSlug || '';
        this.taxType = listResponse.taxType || 0;
        this.taxValue = listResponse.taxValue || 0;
        this.pincodeBasedDelivery = listResponse.pincodeBasedDelivery || 0;
        this.buyed = listResponse.buyed || 0;
        this.hasStock = listResponse.hasStock;
        this.minQuantityAllowedCart = listResponse.minQuantityAllowedCart;
        this.maxQuantityAllowedCart = listResponse.maxQuantityAllowedCart;
        this.outOfStockThreshold = listResponse.outOfStockThreshold;
        this.enableBackOrders = listResponse.enableBackOrders;
        this.stockStatus = listResponse.stockStatus || '';
        this.hasTirePrice = listResponse.hasTirePrice;
        this.productTirePrices = listResponse.productTirePrices || [];
        this.tirePrice = listResponse.tirePrice || '';
        this.vendorSlugName = listResponse.vendorSlugName || '';
        this.quotationAvailable = listResponse.quotationAvailable || 0;
        this.discount = listResponse.discount || 0;
        this.vendorCompanyCity = listResponse.vendorCompanyCity || '';
        this.vendorCompanyState = listResponse.vendorCompanyState || '';
        this.vendorPrefixId = listResponse.vendorPrefixId || '';
        this.productVariant = listResponse.productVarient || [];
        this.productVariantDetail = listResponse.productVarientOption || [];
        this.skuId = listResponse.skuId || 0;
        this.skuName = listResponse.skuName || '';
        this.isSimplified = listResponse.isSimplified || 0;
        this.productVariantList = listResponse.productvarientList || [];
        this.selectedVariant = listResponse.selectedVariant || [];
        this.variantName = listResponse.variantName || '';
        this.variantId = listResponse.variantId || 0;
        this.isAvailable = listResponse.isAvailable;
        this.variantTirePrice = listResponse.variantTirePrice || [];
        this.productAttributes = listResponse.productAttributes || [];

    }
}
