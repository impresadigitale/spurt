/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {CheckoutOptionsArrayModel} from './checkoutOptionsArray.model';

export class CheckoutProductModel {
    public product: any = [];
    public productOptions: CheckoutOptionsArrayModel;

    constructor(productRequest: any) {
        for (let i = 0; i < productRequest.length; i++) {
            const details: any = {};
            details.productId = productRequest[i].productId || '';
            details.quantity = productRequest[i].productCount || '';
            let tempPrice = 0;
            if (productRequest[i].tirePrice && productRequest[i].tirePrice !== '') {
                tempPrice = (+productRequest[i]._totalOptions) + (+productRequest[i].tirePrice);
            } else if (productRequest[i].pricerefer && productRequest[i].pricerefer !== '') {
                tempPrice = (+productRequest[i]._totalOptions) + (+productRequest[i].pricerefer);
            } else {
                tempPrice = (+productRequest[i]._totalOptions) + (+productRequest[i].price);
            }
            details.basePrice = tempPrice;
            switch (productRequest[i].taxType) {
                case 1:
                    const priceWithOutTax = +tempPrice + productRequest[i].taxValue;
                    tempPrice = Math.round(priceWithOutTax);
                    break;
                case 2:
                    const percentToAmount = tempPrice * (productRequest[i].taxValue / 100);
                    const priceWithTax = +tempPrice + percentToAmount;
                    tempPrice = Math.round(priceWithTax);
                    break;
            }
            details.price = tempPrice;
            details.taxType = productRequest[i].taxType;
            details.taxValue = productRequest[i].taxValue;
            details.model = productRequest[i].metaTagTitle || '';
            details.name = productRequest[i].name || '';
            details.skuName = productRequest[i].skuName || '';
            details.varientName = productRequest[i].variantName || '';
            details.productVarientOptionId = productRequest[i].variantId || '';
            this.product.push(details);
        }
    }
}

function calculatePrice(price: number, taxType: number, taxValue: number) {
    switch (taxType) {
        case 1:
            const priceWithOutTax = +price + taxValue;
            return Math.round(priceWithOutTax);
        case 2:
            const percentToAmount = price * (taxValue / 100);
            const priceWithTax = +price + percentToAmount;
            return Math.round(priceWithTax);
        default:
            return price;
    }
}

export class CheckoutModel {
    public productDetails: any;
    public shippingFirstName: any;
    public shippingLastName: any;
    public shippingCompany: any;
    public shippingAddress_1: any;
    public shippingAddress_2: any;
    public shippingCity: any;
    public shippingPostCode: any;
    public shippingCountryId: any;
    public shippingZone: any;
    public shippingAddressFormat: any;
    public phoneNumber: any;
    public password: any;
    public emailId: any;
    public paymentMethod: any;
    public couponCode: string;
    public couponDiscountAmount: number;
    public couponData: string;
    public gstNo: any;
    public paymentFirstName: any;
    public paymentLastName: any;
    public paymentCompany: any;
    public paymentAddress_1: any;
    public paymentAddress_2: any;
    public paymentCity: any;
    public paymentPostCode: any;
    public paymentCountryId: any;
    public paymentZone: any;

    constructor(checkoutRequest: any) {
        this.shippingFirstName = checkoutRequest.firstName || '';
        this.shippingLastName = checkoutRequest.lastName || '';
        this.shippingCompany = checkoutRequest.shippingName || '';
        this.shippingAddress_1 = checkoutRequest.address || '';
        this.shippingAddress_2 = checkoutRequest.addressLine || '';
        this.shippingCity = checkoutRequest.city || '';
        this.shippingPostCode = checkoutRequest.zip || '';
        this.shippingCountryId = checkoutRequest.country || '';
        this.shippingZone = checkoutRequest.state || '';
        this.phoneNumber = checkoutRequest.phone || '';
        if (checkoutRequest.setPassword) {
            this.password = checkoutRequest.setPassword;
        }
        if (checkoutRequest.sameAsBilling) {
            this.paymentFirstName = checkoutRequest.firstName || '';
            this.paymentLastName = checkoutRequest.lastName || '';
            this.paymentCompany = checkoutRequest.shippingName || '';
            this.paymentAddress_1 = checkoutRequest.address || '';
            this.paymentAddress_2 = checkoutRequest.addressLine || '';
            this.paymentCity = checkoutRequest.city || '';
            this.paymentPostCode = checkoutRequest.zip || '';
            this.paymentCountryId = checkoutRequest.country || '';
            this.paymentZone = checkoutRequest.state || '';
        } else {
            this.paymentFirstName = checkoutRequest.firstName || '';
            this.paymentLastName = checkoutRequest.lastName || '';
            this.paymentCompany = checkoutRequest.billingName || '';
            this.paymentAddress_1 = checkoutRequest.billingAddress || '';
            this.paymentAddress_2 = checkoutRequest.billingAddressLine || '';
            this.paymentCity = checkoutRequest.billingCity || '';
            this.paymentPostCode = checkoutRequest.billingZip || '';
            this.paymentCountryId = checkoutRequest.billingCountry || '';
            this.paymentZone = checkoutRequest.billingState || '';
        }

        this.shippingAddressFormat = '';
        this.emailId = checkoutRequest.email || '';
        this.paymentMethod = checkoutRequest.paymentMethod || '';
        this.productDetails = new CheckoutProductModel(checkoutRequest.productDetail);
        this.couponCode = checkoutRequest.couponCode || '';
        this.couponDiscountAmount = checkoutRequest.couponDiscountAmount || 0;
        this.couponData = checkoutRequest.couponData || '';
        this.gstNo = checkoutRequest.gst;
    }
}



