/*
 * spurtcommerce
 * version 4.4
* www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
export class FeaturedProductResponseModel {
    public productId: string;
    public title: string;
    public name: string;
    public price: string;
    public sku: string;
    public quantity: number;
    public image: Array<any>;
    public rating: number;
    public flag: any;
    public pricerefer: any;
    public description: string;
    public option: Array<any>;
    public optionRequired: number;
    public wishListStatus: number;
    public productSlug: string;
    public taxType: number;
    public taxValue: number;

    constructor(featureResponse: any) {
        this.productId = featureResponse.productId || '';
        this.title = featureResponse.metaTagTitle || '';
        if (featureResponse.flag === 0) {
            this.flag = 0;
        } else {
            this.flag = featureResponse.flag || '';
        }
        this.description = featureResponse.description || '';
        this.pricerefer = featureResponse.pricerefer || '';
        this.name = featureResponse.name || '';
        this.price = featureResponse.price || '';
        this.sku = featureResponse.sku || '';
        this.quantity = featureResponse.quantity || 0;
        this.image = featureResponse.Images;
        this.rating = featureResponse.rating || 0;
        this.option = featureResponse.option || [];
        this.optionRequired = featureResponse.optionRequired || 0;
        this.wishListStatus = featureResponse.wishListStatus || 0;
        this.productSlug = featureResponse.productSlug || '';
        this.taxType = featureResponse.taxType || 0;
        this.taxValue = featureResponse.taxValue || 0;
    }
}
