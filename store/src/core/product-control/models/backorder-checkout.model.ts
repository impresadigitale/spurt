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

export class CheckoutBackorderProductModel {
    public product: any = [];
    public productOptions: CheckoutOptionsArrayModel;

    constructor(productRequest: any) {

        for (let i = 0; i < productRequest.length; i++) {
            const details: any = {};
            details.productId = productRequest[i].productId || '';
            details.quantity = productRequest[i].productCount || '';
            let tempPrice = 0;
            if (productRequest[i].pricerefer && productRequest[i].pricerefer !== '') {
                tempPrice = productRequest[i]._totalOptions + productRequest[i].pricerefer;
            } else {
                tempPrice = productRequest[i]._totalOptions + productRequest[i].price;
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
            details.productOptions = productRequest[i].productOption || [];
            this.product.push(details);
            return this.product;
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

export class BackorderCheckoutModel {
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

    constructor(checkoutRequest: any) {
        this.shippingFirstName = checkoutRequest.shippingFirstName || '';
        this.shippingLastName = checkoutRequest.shippingLastName || '';
        this.shippingCompany = checkoutRequest.shippingCompany || '';
        this.shippingAddress_1 = checkoutRequest.shippingAddress_1 || '';
        this.shippingAddress_2 = checkoutRequest.shippingAddress_2 || '';
        this.shippingCity = checkoutRequest.shippingCity || '';
        this.shippingPostCode = checkoutRequest.shippingPostCode || '';
        this.shippingCountryId = checkoutRequest.shippingCountryId || '';
        this.shippingZone = checkoutRequest.shippingZone || '';
        this.phoneNumber = checkoutRequest.phoneNumber || '';
        if (checkoutRequest.setPassword) {
            this.password = checkoutRequest.setPassword;
        }
        this.shippingAddressFormat = '';
        this.emailId = checkoutRequest.emailId || '';
        this.paymentMethod = checkoutRequest.paymentMethod || '';
        this.productDetails = new CheckoutBackorderProductModel(checkoutRequest.productDetails);
    }
}



