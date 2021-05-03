/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, JsonController, Req, Res, Get, QueryParam, Body, Authorized } from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import { CustomerCheckoutRequest } from './requests/CustomerCheckoutRequest';
import { OrderCancelRequest } from './requests/OrderCancelRequest';
import { OrderService } from '../../services/OrderService';
import { OrderProductService } from '../../services/OrderProductService';
import { OrderTotalService } from '../../services/OrderTotalService';
import { Order } from '../../models/Order';
import { OrderProduct } from '../../models/OrderProduct';
import { OrderTotal } from '../../models/OrderTotal';
import { CustomerService } from '../../services/CustomerService';
import { MAILService } from '../../../auth/mail.services';
import { ProductService } from '../../services/ProductService';
import { ProductImageService } from '../../services/ProductImageService';
import { SettingService } from '../../services/SettingService';
import { EmailTemplateService } from '../../services/EmailTemplateService';
import { ProductRatingService } from '../../services/RatingService';
import { ProductRating } from '../../models/ProductRating';
import { CountryService } from '../../services/CountryService';
import { UserService } from '../../services/UserService';
import { Customer } from '../../models/Customer';
import { VendorOrders } from '../../models/VendorOrders';
import { VendorService } from '../../services/VendorService';
import { PluginService } from '../../services/PluginService';
import jwt from 'jsonwebtoken';
import { CurrencyService } from '../../services/CurrencyService';
import { env } from '../../../env';
import { VendorOrdersService } from '../../services/VendorOrderService';
import { VendorProductService } from '../../services/VendorProductService';
import { OrderLogService } from '../../services/OrderLogService';
import { VendorOrderLogService } from '../../services/VendorOrderLogService';
import { VendorOrderLog } from '../../models/VendorOrderLog';
import { VendorGlobalSettingService } from '../../services/VendorSettingService';
import { PdfService } from '../../services/PdfService';
import { ZoneService } from '../../services/zoneService';
import { S3Service } from '../../services/S3Service';
import { ImageService } from '../../services/ImageService';
import { OrderStatusService } from '../../services/OrderStatusService';
import { DeliveryLocationService } from '../../services/DeliveryLocationService';
import { OrderProductLogService } from '../../services/OrderProductLogService';
import { CustomerCartService } from '../../services/CustomerCartService';
import { CouponUsage } from '../../models/CouponUsage';
import { CouponUsageProduct } from '../../models/CouponUsageProduct';
import { CouponUsageService } from '../../services/CouponUsageService';
import { CouponUsageProductService } from '../../services/CouponUsageProductService';
import { VendorCouponService } from '../../services/VendorCouponService';
import { OrderCancelReasonService } from '../../services/OrderCancelReasonService';
import { StockLogService } from '../../services/StockLogService';
import moment = require('moment');
import { StockLog } from '../../models/StockLog';
import { ProductStockAlertService } from '../../services/ProductStockAlertService';
import { ProductStockAlert } from '../../models/ProductStockAlert';
import { ProductTirePriceService } from '../../services/ProductTirePriceService';
import { ProductSpecialService } from '../../services/ProductSpecialService';
import { ProductDiscountService } from '../../services/ProductDiscountService';
import { VendorInvoiceItemService } from '../../services/VendorInvoiceItemService';
import { VendorInvoiceService } from '../../services/VendorInvoiceService';
import { VendorInvoice } from '../../models/VendorInvoice';
import { VendorInvoiceItem } from '../../models/VendorInvoiceItem';
import { SkuService } from '../../services/SkuService';
import { ProductVarientOptionImageService } from '../../services/ProductVarientOptionImageService';
import { TaxService } from '../../services/TaxService';
import { CustomerBackorderRequest } from './requests/CustomerBackorderRequest';

@JsonController('/orders')
export class CustomerOrderController {
    constructor(private orderService: OrderService, private orderProductService: OrderProductService, private orderTotalService: OrderTotalService, private vendorService: VendorService, private vendorSettingService: VendorGlobalSettingService,
                private customerService: CustomerService, private productService: ProductService, private productImageService: ProductImageService, private settingService: SettingService,
                private emailTemplateService: EmailTemplateService, private productRatingService: ProductRatingService, private vendorProductService: VendorProductService, private orderLogService: OrderLogService,
                private countryService: CountryService, private pluginService: PluginService, private currencyService: CurrencyService, private vendorOrderService: VendorOrdersService, private userService: UserService, private vendorOrderLogService: VendorOrderLogService,
                private pdfService: PdfService,
                private zoneService: ZoneService,
                private s3Service: S3Service,
                private orderStatusService: OrderStatusService,
                private deliveryLocationService: DeliveryLocationService,
                private orderProductLogService: OrderProductLogService,
                private customerCartService: CustomerCartService,
                private couponUsageService: CouponUsageService,
                private couponUsageProductService: CouponUsageProductService,
                private vendorCouponService: VendorCouponService,
                private orderCancelReasonService: OrderCancelReasonService,
                private stockLogService: StockLogService,
                private productStockAlertService: ProductStockAlertService,
                private productTirePriceService: ProductTirePriceService,
                private productSpecialService: ProductSpecialService,
                private productDiscountService: ProductDiscountService,
                private vendorInvoiceService: VendorInvoiceService,
                private vendorInvoiceItemService: VendorInvoiceItemService,
                private productVarientOptionImageService: ProductVarientOptionImageService,
                private taxService: TaxService,
                private imageService: ImageService, private skuService: SkuService) {
    }

    // customer checkout
    /**
     * @api {post} /api/orders/customer-checkout Checkout
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productDetail Product Details
     * @apiParam (Request body) {Number} paymentMethod paymentMethod
     * @apiParam (Request body) {String} shippingFirstName Shipping First name
     * @apiParam (Request body) {String} shippingLastName Shipping Last Name
     * @apiParam (Request body) {String} shippingCompany Shipping Company
     * @apiParam (Request body) {String} shippingAddress_1 Shipping Address 1
     * @apiParam (Request body) {String} shippingAddress_2 Shipping Address 2
     * @apiParam (Request body) {String} shippingCity Shipping City
     * @apiParam (Request body) {Number} shippingPostCode Shipping PostCode
     * @apiParam (Request body) {String} shippingCountryId ShippingCountryId
     * @apiParam (Request body) {String} shippingZone Shipping Zone
     * @apiParam (Request body) {String} shippingAddressFormat Shipping Address Format
     * @apiParam (Request body) {String} paymentFirstName Payment First name
     * @apiParam (Request body) {String} PaymentLastName Payment Last Name
     * @apiParam (Request body) {String} PaymentCompany Payment Company
     * @apiParam (Request body) {String} paymentAddress_1 Payment Address 1
     * @apiParam (Request body) {String} paymentAddress_2 Payment Address 2
     * @apiParam (Request body) {String} paymentCity Payment City
     * @apiParam (Request body) {Number} paymentPostCode Payment PostCode
     * @apiParam (Request body) {String} paymentCountryId PaymentCountryId
     * @apiParam (Request body) {String} paymentZone Payment Zone
     * @apiParam (Request body) {Number} phoneNumber Customer Phone Number
     * @apiParam (Request body) {String} emailId Customer Email Id
     * @apiParam (Request body) {String} password Customer password
     * @apiParam (Request body) {String} couponCode couponCode
     * @apiParam (Request body) {Number} couponDiscountAmount couponDiscountAmount
     * @apiParam (Request body) {String} couponData
     * @apiParam (Request body) {String} gstNo gstNo
     * @apiParamExample {json} Input
     * {
     *      "productDetails" :[
     *      {
     *      "productId" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "model" : "",
     *      "name" : "",
     *      "varientName" : "",
     *      "productVarientOptionId" : "",
     *      "skuName" : "",
     *      }],
     *      "shippingFirstName" : "",
     *      "shippingLastName" : "",
     *      "shippingCompany" : "",
     *      "shippingAddress_1" : "",
     *      "shippingAddress_2" : "",
     *      "shippingCity" : "",
     *      "shippingPostCode" : "",
     *      "shippingCountryId" : "",
     *      "shippingZone" : "",
     *      "paymentFirstName" : "",
     *      "paymentLastName" : "",
     *      "paymentCompany" : "",
     *      "paymentAddress_1" : "",
     *      "paymentAddress_2" : "",
     *      "paymentCity" : "",
     *      "paymentPostCode" : "",
     *      "paymentCountryId" : "",
     *      "paymentZone" : "",
     *      "shippingAddressFormat" : "",
     *      "phoneNumber" : "",
     *      "emailId" : "",
     *      "password" : "",
     *      "paymentMethod" : "",
     *      "vendorId" : "",
     *      "couponCode" : "",
     *      "couponDiscountAmount" : "",
     *      "couponData" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Check Out the product successfully And Send order detail in your mail ..!!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/orders/customer-checkout
     * @apiErrorExample {json} Checkout error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Checkout Function
    @Post('/customer-checkout')
    public async customerCheckout(@Body({ validate: true }) checkoutParam: CustomerCheckoutRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const logo = await this.settingService.findOne();
        if (checkoutParam.couponCode) {
            const vendorCoupon = await this.vendorCouponService.findOne({ where: { couponCode: checkoutParam.couponCode } });
            if (!vendorCoupon) {
                const errResponse: any = {
                    status: 0,
                    message: 'Invalid coupon code',
                };
                return response.status(400).send(errResponse);
            }
        }
        const error: any = [];
        const dynamicData: any = {};
        const orderProducts: any = checkoutParam.productDetails;
        for (const val of orderProducts) {
            const productAvailability = await this.productService.findOne({ where: { productId: val.productId } });
            if (productAvailability.pincodeBasedDelivery === 1) {
                const value = await this.vendorProductService.findOne({ where: { productId: val.productId } });
                if (value) {
                    const deliveryLocation = await this.deliveryLocationService.findOne({ where: { zipCode: checkoutParam.shippingPostCode, vendorId: value.vendorId } });
                    if (!deliveryLocation) {
                        error.push(1);
                    }
                } else {
                    const deliveryLocation = await this.deliveryLocationService.findOne({ where: { zipCode: checkoutParam.shippingPostCode, vendorId: 0 } });
                    if (!deliveryLocation) {
                        error.push(1);
                    }
                }
            }
            /// for find product price with tax , option price, special, discount and tire price /////
            let price: any;
            let taxType: any;
            let taxValue: any;
            let tirePrice: any;
            let priceWithTax: any;
            const productTire = await this.productService.findOne({ where: { productId: val.productId } });
            taxType = productTire.taxType;
            if (taxType === 2 && taxType) {
                const tax = await this.taxService.findOne({ where: { taxId: productTire.taxValue } });
                taxValue = (tax !== undefined) ? tax.taxPercentage : 0;
            } else if (taxType === 1 && taxType) {
                taxValue = productTire.taxValue;
            }
            const sku = await this.skuService.findOne({ where: { skuName: val.skuName } });
            if (sku) {
                if (productTire.hasTirePrice === 1) {
                    const findWithQty = await this.productTirePriceService.findTirePrice(val.productId, sku.id, val.quantity);
                    if (findWithQty) {
                        tirePrice = findWithQty.price;
                    } else {
                        const dateNow = new Date();
                        const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                        const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(val.productId, sku.id, todaydate);
                        const productDiscount = await this.productDiscountService.findDiscountPricewithSku(val.productId, sku.id, todaydate);
                        if (productSpecial !== undefined) {
                            tirePrice = productSpecial.price;
                        } else if (productDiscount !== undefined) {
                            tirePrice = productDiscount.price;
                        } else {
                            tirePrice = sku.price;
                        }
                    }
                    if (taxType && taxType === 2) {
                        const percentVal = +tirePrice * (+taxValue / 100);
                        priceWithTax = +tirePrice + +percentVal;
                    } else if (taxType && taxType === 1) {
                        priceWithTax = +tirePrice + +val.taxValue;
                    } else {
                        priceWithTax = +tirePrice;
                    }
                    price = priceWithTax;
                } else {
                    const dateNow = new Date();
                    const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                    const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(val.productId, sku.id, todaydate);
                    const productDiscount = await this.productDiscountService.findDiscountPricewithSku(val.productId, sku.id, todaydate);
                    if (productSpecial !== undefined) {
                        tirePrice = productSpecial.price;
                    } else if (productDiscount !== undefined) {
                        tirePrice = productDiscount.price;
                    } else {
                        tirePrice = sku.price;
                    }
                    if (taxType && taxType === 2) {
                        const perVal = +tirePrice * (+taxValue / 100);
                        priceWithTax = +tirePrice + +perVal;
                    } else if (taxType && taxType === 1) {
                        priceWithTax = +tirePrice + +taxValue;
                    } else {
                        priceWithTax = +tirePrice;
                    }
                    price = priceWithTax;
                }
            } else {
                tirePrice = productTire.price;
                if (taxType && taxType === 2) {
                    const percentAmt = +tirePrice * (+taxValue / 100);
                    priceWithTax = +tirePrice + +percentAmt;
                } else if (taxType && taxType === 1) {
                    priceWithTax = +tirePrice + +taxValue;
                } else {
                    priceWithTax = +tirePrice;
                }
                price = priceWithTax;
            }
            ///// finding price from backend ends /////
            const obj: any = {};
            obj.price = price;
            obj.taxType = taxType;
            obj.taxValue = taxValue;
            obj.tirePrice = tirePrice;
            obj.productTire = productTire;
            obj.quantity = val.quantity;
            dynamicData[val.skuName] = obj;
        }
        if (error.length > 0) {
            const errResponse: any = {
                status: 0,
                message: 'Product not available for your pincode',
                data: error,
            };
            return response.status(400).send(errResponse);
        }
        for (const val of orderProducts) {
            const product = await this.productService.findOne(val.productId);
            const sku = await this.skuService.findOne({ where: { skuName: val.skuName } });
            if (product.hasStock === 1) {
                if (!(sku.minQuantityAllowedCart <= +val.quantity)) {
                    const minCart: any = {
                        status: 0,
                        message: 'Quantity should greater than min Quantity.',
                    };
                    return response.status(400).send(minCart);
                } else if (!(sku.maxQuantityAllowedCart >= +val.quantity)) {
                    const maxCart: any = {
                        status: 0,
                        message: 'Quantity should lesser than max Quantity.',
                    };
                    return response.status(400).send(maxCart);
                }
                if ((+sku.quantity <= 0)) {
                    const cart: any = {
                        status: 0,
                        message: 'item is Out of stock',
                    };
                    return response.status(400).send(cart);
                }
                if (!(+sku.quantity >= +val.quantity)) {
                    const cart: any = {
                        status: 0,
                        message: 'Available stock for' + product.name + ' - ' + val.skuName + 'is' + sku.quantity,
                    };
                    return response.status(400).send(cart);
                }
            }
        }
        const plugin = await this.pluginService.findOne({ where: { id: checkoutParam.paymentMethod } });
        if (plugin === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Payment method is invalid',
            };
            return response.status(400).send(errorResponse);
        }
        const newOrder: any = new Order();
        const newOrderTotal = new OrderTotal();
        let orderProduct = [];
        let i;
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];
        if (request.header('authorization')) {
            let customerId;
            jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                if (err) {
                    throw err;
                }
                customerId = decoded.id;
            });
            newOrder.customerId = customerId;
        } else {
            const customerEmail = await this.customerService.findOne({
                where: {
                    email: checkoutParam.emailId,
                    deleteFlag: 0,
                },
            });
            if (customerEmail === undefined) {
                if (checkoutParam.password) {
                    const newUser = new Customer();
                    newUser.firstName = checkoutParam.shippingFirstName;
                    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
                    if (!checkoutParam.password.match(pattern)) {
                        const passwordValidatingMessage = [];
                        passwordValidatingMessage.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
                        const errResponse: any = {
                            status: 0,
                            message: "You have an error in your request's body. Check 'errors' field for more details!",
                            data: { message: passwordValidatingMessage },
                        };
                        return response.status(422).send(errResponse);
                    }
                    const partsOfThreeLetters = checkoutParam.emailId.match(/.{3}/g).concat(
                        checkoutParam.emailId.substr(1).match(/.{3}/g),
                        checkoutParam.emailId.substr(2).match(/.{3}/g));
                    const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(checkoutParam.password);
                    if (matchEmail === true) {
                        const validationMessage = [];
                        validationMessage.push('Password must not duplicate any part of the email address');
                        const passwordDuplicateErrorResponse: any = {
                            status: 0,
                            message: "You have an error in your request's body. Check 'errors' field for more details!",
                            data: { message: validationMessage },
                        };
                        return response.status(422).send(passwordDuplicateErrorResponse);
                    }
                    newUser.password = await Customer.hashPassword(checkoutParam.password);
                    newUser.email = checkoutParam.emailId;
                    newUser.username = checkoutParam.emailId;
                    newUser.mobileNumber = checkoutParam.phoneNumber;
                    newUser.isActive = 1;
                    newUser.ip = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const resultDatas = await this.customerService.create(newUser);
                    const emailContents = await this.emailTemplateService.findOne(1);
                    const message = emailContents.content.replace('{name}', resultDatas.firstName);
                    const redirectUrl = env.storeRedirectUrl;
                    MAILService.registerMail(logo, message, resultDatas.email, emailContents.subject, redirectUrl);
                    newOrder.customerId = resultDatas.id;
                } else {
                    newOrder.customerId = 0;
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please login for checkout, emailId already exist',
                };
                return response.status(400).send(errorResponse);
            }
        }
        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;
        newOrder.shippingFirstname = checkoutParam.shippingFirstName;
        newOrder.shippingLastname = checkoutParam.shippingLastName;
        newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
        newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
        newOrder.shippingCompany = checkoutParam.shippingCompany;
        newOrder.shippingCity = checkoutParam.shippingCity;
        newOrder.shippingZone = checkoutParam.shippingZone;
        newOrder.shippingCountryId = checkoutParam.shippingCountryId;
        const country = await this.countryService.findOne({
            where: {
                countryId: checkoutParam.shippingCountryId,
            },
        });
        if (country) {
            newOrder.shippingCountry = country.name;
        }
        newOrder.shippingPostcode = checkoutParam.shippingPostCode;
        newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.paymentFirstname = checkoutParam.paymentFirstName;
        newOrder.paymentLastname = checkoutParam.paymentLastName;
        newOrder.paymentAddress1 = checkoutParam.paymentAddress_1;
        newOrder.paymentAddress2 = checkoutParam.paymentAddress_2;
        newOrder.paymentCompany = checkoutParam.paymentCompany;
        const paymentCountry = await this.countryService.findOne({
            where: {
                countryId: checkoutParam.paymentCountryId,
            },
        });
        if (paymentCountry) {
            newOrder.paymentCountry = paymentCountry.name;
        }
        newOrder.paymentCity = checkoutParam.paymentCity;
        newOrder.paymentZone = checkoutParam.paymentZone;
        newOrder.paymentPostcode = checkoutParam.paymentPostCode;
        newOrder.paymentMethod = checkoutParam.paymentMethod;
        newOrder.customerGstNo = checkoutParam.gstNo;
        newOrder.isActive = 1;
        const setting = await this.settingService.findOne();
        newOrder.orderStatusId = setting ? setting.orderStatus : 0;
        newOrder.invoicePrefix = setting ? setting.invoicePrefix : '';
        const currencyVal = await this.currencyService.findOne(setting.storeCurrencyId);
        newOrder.currencyCode = currencyVal ? currencyVal.code : '';
        newOrder.currencyValue = currencyVal ? currencyVal.value : '';
        newOrder.currencySymbolLeft = currencyVal ? currencyVal.symbolLeft : '';
        newOrder.currencySymbolRight = currencyVal ? currencyVal.symbolRight : '';
        newOrder.currencyValue = currencyVal ? currencyVal.value : '';
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        const orderData = await this.orderService.create(newOrder);
        await this.orderLogService.create(orderData);
        const currencySymbol = await this.currencyService.findOne(setting.storeCurrencyId);
        orderData.currencyRight = currencySymbol ? currencySymbol.symbolRight : '';
        orderData.currencyLeft = currencySymbol ? currencySymbol.symbolLeft : '';
        orderProduct = checkoutParam.productDetails;
        let j = 1;
        for (i = 0; i < orderProduct.length; i++) {
            ///// finding price from backend ends /////
            const dynamicPrices = dynamicData[orderProduct[i].skuName];
            const productDetails = new OrderProduct();
            productDetails.productId = orderProduct[i].productId;
            const nwDate = new Date();
            const odrDate = nwDate.getFullYear() + ('0' + (nwDate.getMonth() + 1)).slice(-2) + ('0' + nwDate.getDate()).slice(-2);
            productDetails.orderProductPrefixId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + j;
            productDetails.name = dynamicPrices.productTire.name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.productPrice = dynamicPrices.price;
            productDetails.basePrice = dynamicPrices.tirePrice;
            productDetails.taxType = dynamicPrices.taxType;
            productDetails.taxValue = dynamicPrices.taxValue;
            productDetails.total = +orderProduct[i].quantity * dynamicPrices.price;
            productDetails.model = dynamicPrices.productTire.name;
            productDetails.varientName = orderProduct[i].varientName ? orderProduct[i].varientName : '';
            productDetails.productVarientOptionId = orderProduct[i].productVarientOptionId ? orderProduct[i].productVarientOptionId : 0;
            productDetails.skuName = orderProduct[i].skuName ? orderProduct[i].skuName : '';
            productDetails.orderStatusId = 1;
            const productInformation = await this.orderProductService.createData(productDetails);
            await this.orderProductLogService.create(productInformation);
            const cart = await this.customerCartService.findOne({ where: { productId: orderProduct[i].productId, customerId: orderData.customerId } });
            if (cart !== undefined) {
                await this.customerCartService.delete(cart.id);
            }
            ///// for saving vendor orders starts///////
            const val = await this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
            if (val !== undefined) {
                const vendor = await this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                const vendororders = new VendorOrders();
                vendororders.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + val.vendorId + j;
                vendororders.vendorId = val.vendorId;
                vendororders.orderId = orderData.orderId;
                vendororders.orderProductId = productInformation.orderProductId;
                vendororders.total = productDetails.total;
                vendororders.subOrderStatusId = 1;
                vendororders.commission = 0;
                const date = new Date();
                vendororders.modifiedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                if (val.vendorProductCommission > 0) {
                    vendororders.commission = val.vendorProductCommission;
                } else if (vendor.commission > 0) {
                    vendororders.commission = vendor.commission;
                } else {
                    const defaultCommission = await this.vendorSettingService.findOne();
                    const defCommission = defaultCommission.defaultCommission;
                    vendororders.commission = defCommission;
                }
                const value = await this.vendorOrderService.create(vendororders);
                const vendorOrderLog = new VendorOrderLog();
                vendorOrderLog.vendorOrderId = value.vendorOrderId;
                vendorOrderLog.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + val.vendorId + j;
                vendorOrderLog.vendorId = val.vendorId;
                vendorOrderLog.orderId = orderData.orderId;
                vendorOrderLog.subOrderStatusId = 1;
                await this.vendorOrderLogService.create(vendorOrderLog);

                const vendorInvoice = await this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                if (!vendorInvoice) {
                    const newVendorInvoice: any = new VendorInvoice();
                    newVendorInvoice.vendorId = val.vendorId;
                    newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
                    newVendorInvoice.orderId = orderData.orderId;
                    newVendorInvoice.email = checkoutParam.emailId;
                    newVendorInvoice.total = 0;
                    newVendorInvoice.shippingFirstname = checkoutParam.shippingFirstName;
                    newVendorInvoice.shippingLastname = checkoutParam.shippingLastName;
                    await this.vendorInvoiceService.create(newVendorInvoice);
                }
                const vendorInvoiceData = await this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                vendorInvoiceData.total = vendorInvoiceData.total + +productDetails.total;
                const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                await this.vendorInvoiceService.create(vendorInvoiceData);

                const newVendorInvoiceItem = new VendorInvoiceItem();
                newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                newVendorInvoiceItem.orderProductId = productInformation.orderProductId;
                await this.vendorInvoiceItemService.create(newVendorInvoiceItem);
            }
            ///// for saving vendor orders ends //////
            const productImageData = await this.productService.findOne(productInformation.productId);
            // for stock management
            if (productImageData.hasStock === 1) {
                const product = await this.skuService.findOne({ where: { skuName: productInformation.skuName } });
                product.quantity = +product.quantity - +productInformation.quantity;
                const prod = await this.skuService.create(product);
                if (+prod.quantity <= +prod.notifyMinQuantity) {
                    const productStockAlert = new ProductStockAlert();
                    productStockAlert.productId = productInformation.productId;
                    productStockAlert.skuName = productInformation.skuName;
                    productStockAlert.mailFlag = 1;
                    await this.productStockAlertService.create(productStockAlert);
                }
                const stockLog = new StockLog();
                stockLog.productId = productInformation.productId;
                stockLog.orderId = orderData.orderId;
                stockLog.skuName = productInformation.skuName;
                stockLog.quantity = productInformation.quantity;
                await this.stockLogService.create(stockLog);
            }
            let productImageDetail;
            if (productDetails.productVarientOptionId) {
                const image = await this.productVarientOptionImageService.findOne({ where: { productVarientOptionId: productDetails.productVarientOptionId } });
                if (image) {
                    productImageDetail = image;
                } else {
                    productImageDetail = await this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                }
            } else {
                productImageDetail = await this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
            }
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            productDetailData.push(productImageData);
            j++;
        }
        let grandDiscountAmount = 0;
        if (checkoutParam.couponCode && checkoutParam.couponData) {
            const couponUsage = new CouponUsage();
            const vendorCoupon = await this.vendorCouponService.findOne({ where: { couponCode: checkoutParam.couponCode } });
            couponUsage.couponId = vendorCoupon.vendorCouponId;
            couponUsage.customerId = orderData.customerId;
            couponUsage.orderId = orderData.orderId;
            couponUsage.discountAmount = checkoutParam.couponDiscountAmount;
            const couponUsageData = await this.couponUsageService.create(couponUsage);
            const decryptedCouponCode = this.decrypt(checkoutParam.couponData);
            const ParseData = JSON.parse(decryptedCouponCode);
            for (const product of ParseData) {
                const couponUsageProduct = new CouponUsageProduct();
                couponUsageProduct.couponUsageId = couponUsageData.couponUsageId;
                couponUsageProduct.customerId = orderData.customerId;
                couponUsageProduct.orderId = orderData.orderId;
                const orderProductData = await this.orderProductService.findOne({ where: { orderId: orderData.orderId, productId: product.productId } });
                const dynamicPrices = dynamicData[product.skuName];
                const total = product.quantity * dynamicPrices.price;
                let discountAmount = 0;
                if (vendorCoupon.couponType === 1) {
                    discountAmount = total * (vendorCoupon.discount / 100);
                } else {
                    discountAmount = vendorCoupon.discount;
                }
                grandDiscountAmount += +discountAmount;
                orderProductData.discountAmount = +discountAmount;
                orderProductData.discountedAmount = +orderProductData.total - (+discountAmount);
                await this.orderProductService.createData(orderProductData);
                const vendorOrderData = await this.vendorOrderService.findOne({ where: { orderProductId: orderData.orderProductId } });
                if (vendorOrderData) {
                    vendorOrderData.total = +vendorOrderData.total - (+discountAmount);
                    await this.vendorOrderService.create(vendorOrderData);
                }
                couponUsageProduct.orderProductId = orderProductData.orderProductId;
                couponUsageProduct.quantity = product.quantity;
                couponUsageProduct.amount = dynamicPrices.price;
                couponUsageProduct.discountAmount = discountAmount;
                await this.couponUsageProductService.create(couponUsageProduct);
            }
            couponUsage.discountAmount = +grandDiscountAmount;
            await this.couponUsageService.create(couponUsage);
        }
        newOrder.amount = totalAmount;
        if (checkoutParam.couponCode && checkoutParam.couponData) {
            newOrder.total = totalAmount - (+grandDiscountAmount);
            newOrder.couponCode = checkoutParam.couponCode;
            newOrder.discountAmount = +grandDiscountAmount;
            newOrder.amount = totalAmount;
        } else {
            newOrder.total = totalAmount;
        }
        newOrder.invoiceNo = 'INV00'.concat(orderData.orderId);
        const nowDate = new Date();
        const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
        newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
        await this.orderService.update(orderData.orderId, newOrder);
        newOrderTotal.orderId = orderData.orderId;
        if (checkoutParam.couponCode && checkoutParam.couponData) {
            newOrderTotal.value = totalAmount - (+grandDiscountAmount);
        } else {
            newOrderTotal.value = totalAmount;
        }
        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        if (plugin.pluginName === 'CashOnDelivery') {
            const emailContent = await this.emailTemplateService.findOne(5);
            const adminEmailContent = await this.emailTemplateService.findOne(6);
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            const vendorInvoice = await this.vendorInvoiceService.findAll({ where: { orderId: orderData.orderId } });
            if (vendorInvoice.length > 0) {
                for (const vendInvoice of vendorInvoice) {
                    const vendorProductDetailData = [];
                    const vendor = await this.vendorService.findOne({ where: { vendorId: vendInvoice.vendorId } });
                    const customer = await this.customerService.findOne({ where: { id: vendor.customerId } });
                    const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                    const vendorInvoiceItem = await this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                    for (const vendInvoiceItem of vendorInvoiceItem) {
                        const vendorProductInformation = await this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'varientName', 'skuName', 'taxValue', 'taxType', 'productVarientOptionId'] });
                        const vendorProductImageData: any = await this.productService.findOne(vendorProductInformation.productId);
                        let vendorProductImageDetail;
                        if (vendorProductInformation.productVarientOptionId) {
                            const image = await this.productVarientOptionImageService.findOne({ where: { productVarientOptionId: vendorProductInformation.productVarientOptionId } });
                            if (image) {
                                vendorProductImageDetail = image;
                            } else {
                                vendorProductImageDetail = await this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                            }
                        } else {
                            vendorProductImageDetail = await this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                        }
                        vendorProductImageData.productInformationData = vendorProductInformation;
                        vendorProductImageData.productImage = vendorProductImageDetail;
                        vendorProductDetailData.push(vendorProductImageData);

                    }
                    const vendorRedirectUrl = env.vendorRedirectUrl;
                    MAILService.adminOrderMail(logo, vendorMessage, orderData, adminEmailContent.subject, vendorProductDetailData, today, customer.email, vendorRedirectUrl);
                }
            }
            const adminRedirectUrl = env.adminRedirectUrl;
            MAILService.adminOrderMail(logo, adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId, adminRedirectUrl);
            const storeRedirectUrl = env.storeRedirectUrl;
            MAILService.customerOrderMail(logo, customerMessage, orderData, emailContent.subject, productDetailData, today, storeRedirectUrl);
            const order = await this.orderService.findOrder(orderData.orderId);
            order.paymentType = plugin ? plugin.pluginName : '';
            order.productDetail = await this.orderProductService.find({where: {orderId: orderData.orderId}}).then((val) => {
                const productImage = val.map(async (value: any) => {
                    let image;
                    if (value.productVarientOptionId) {
                        const imageData = await this.productVarientOptionImageService.findOne({where: {productVarientOptionId: value.productVarientOptionId}});
                        if (imageData) {
                            image = imageData;
                        } else {
                            image = await this.productImageService.findOne({where: {productId: value.productId, defaultImage: 1}});
                        }
                    } else {
                        image = await this.productImageService.findOne({ where: { productId: value.productId } });
                    }
                    const temp: any = value;
                    temp.image = image;
                    return temp;
                });
                const results = Promise.all(productImage);
                return results;
            });
            const successResponse: any = {
                status: 1,
                message: 'You successfully checked out the product and order details send to your mail',
                data: order,
            };
            return response.status(200).send(successResponse);
        } else {

            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            orderData.paymentProcess = 0;
            await this.orderService.update(orderData.orderId, orderData);
            let route = env.baseUrl + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
            if (plugin.pluginName === 'razorpay' && checkoutParam.isMobile) {
                route = env.baseUrl + pluginInfo.processAPIRoute + '/' + orderData.orderPrefixId;
                return response.status(200).send({
                    status: 4,
                    message: 'Redirect to this url',
                    data: route,
                });
            }
            const successResponse: any = {
                status: 3,
                message: 'Redirect to this url',
                data: route,
            };
            return response.status(200).send(successResponse);

        }
    }

    // customer checkout
    /**
     * @api {post} /api/orders/back-order-checkout Checkout
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productDetail Product Details
     * @apiParam (Request body) {Number} paymentMethod paymentMethod
     * @apiParam (Request body) {String} shippingFirstName Shipping First name
     * @apiParam (Request body) {String} shippingLastName Shipping Last Name
     * @apiParam (Request body) {String} shippingCompany Shipping Company
     * @apiParam (Request body) {String} shippingAddress_1 Shipping Address 1
     * @apiParam (Request body) {String} shippingAddress_2 Shipping Address 2
     * @apiParam (Request body) {String} shippingCity Shipping City
     * @apiParam (Request body) {Number} shippingPostCode Shipping PostCode
     * @apiParam (Request body) {String} shippingCountryId ShippingCountryId
     * @apiParam (Request body) {String} shippingZone Shipping Zone
     * @apiParam (Request body) {String} shippingAddressFormat Shipping Address Format
     * @apiParam (Request body) {String} paymentFirstName Payment First name
     * @apiParam (Request body) {String} PaymentLastName Payment Last Name
     * @apiParam (Request body) {String} PaymentCompany Payment Company
     * @apiParam (Request body) {String} paymentAddress_1 Payment Address 1
     * @apiParam (Request body) {String} paymentAddress_2 Payment Address 2
     * @apiParam (Request body) {String} paymentCity Payment City
     * @apiParam (Request body) {Number} paymentPostCode Payment PostCode
     * @apiParam (Request body) {String} paymentCountryId PaymentCountryId
     * @apiParam (Request body) {String} paymentZone Payment Zone
     * @apiParam (Request body) {Number} phoneNumber Customer Phone Number
     * @apiParam (Request body) {String} emailId Customer Email Id
     * @apiParam (Request body) {String} password Customer password
     * @apiParam (Request body) {String} couponCode couponCode
     * @apiParam (Request body) {Number} couponDiscountAmount couponDiscountAmount
     * @apiParam (Request body) {String} couponData
     * @apiParamExample {json} Input
     * {
     *      "productDetail" :[
     *      {
     *      "productId" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "model" : "",
     *      "name" : "",
     *      "varientName" : "",
     *      "productVarientOptionId" : "",
     *      "skuName" : "",
     *      }],
     *      "shippingFirstName" : "",
     *      "shippingLastName" : "",
     *      "shippingCompany" : "",
     *      "shippingAddress_1" : "",
     *      "shippingAddress_2" : "",
     *      "shippingCity" : "",
     *      "shippingPostCode" : "",
     *      "shippingCountryId" : "",
     *      "shippingZone" : "",
     *      "shippingAddressFormat" : "",
     *      "paymentFirstName" : "",
     *      "paymentLastName" : "",
     *      "paymentCompany" : "",
     *      "paymentAddress_1" : "",
     *      "paymentAddress_2" : "",
     *      "paymentCity" : "",
     *      "paymentPostCode" : "",
     *      "paymentCountryId" : "",
     *      "paymentZone" : "",
     *      "phoneNumber" : "",
     *      "emailId" : "",
     *      "password" : "",
     *      "paymentMethod" : "",
     *      "vendorId" : "",
     *      "couponCode" : "",
     *      "couponDiscountAmount" : "",
     *      "couponData" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Check Out the product successfully And Send order detail in your mail ..!!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/orders/back-order-checkout
     * @apiErrorExample {json} Checkout error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Checkout Function
    @Post('/back-order-checkout')
    public async backOrderCustomerCheckout(@Body({ validate: true }) checkoutParam: CustomerBackorderRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const logo = await this.settingService.findOne();
        const error: any = [];
        const orderProducts: any = checkoutParam.productDetails;
        for (const val of orderProducts) {
            const productAvailability = await this.productService.findOne({ where: { productId: val.productId } });
            if (productAvailability.pincodeBasedDelivery === 1) {
                const value = await this.vendorProductService.findOne({ where: { productId: val.productId } });
                if (value) {
                    const deliveryLocation = await this.deliveryLocationService.findOne({ where: { zipCode: checkoutParam.shippingPostCode, vendorId: value.vendorId } });
                    if (!deliveryLocation) {
                        error.push(1);
                    }
                } else {
                    const deliveryLocation = await this.deliveryLocationService.findOne({ where: { zipCode: checkoutParam.shippingPostCode, vendorId: 0 } });
                    if (!deliveryLocation) {
                        error.push(1);
                    }
                }
            }
        }
        if (error.length > 0) {
            const errResponse: any = {
                status: 0,
                message: 'Product not available for your pincode',
                data: error,
            };
            return response.status(400).send(errResponse);
        }
        for (const val of orderProducts) {
            const product = await this.productService.findOne(val.productId);
            const sku = await this.skuService.findOne({ where: { skuName: val.skuName } });
            if (product.hasStock === 1) {
                if (!(sku.minQuantityAllowedCart <= +val.quantity)) {
                    const minCart: any = {
                        status: 0,
                        message: 'Quantity should greater than min Quantity.',
                    };
                    return response.status(400).send(minCart);
                } else if (!(sku.maxQuantityAllowedCart >= +val.quantity)) {
                    const maxCart: any = {
                        status: 0,
                        message: 'Quantity should lesser than max Quantity.',
                    };
                    return response.status(400).send(maxCart);
                }
            }
        }
        const plugin = await this.pluginService.findOne({ where: { id: checkoutParam.paymentMethod } });
        if (plugin === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Payment method is invalid',
            };
            return response.status(400).send(errorResponse);
        }
        const newOrder: any = new Order();
        const newOrderTotal = new OrderTotal();
        let orderProduct = [];
        let i;
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];
        if (request.header('authorization')) {
            let customerId;
            jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                if (err) {
                    throw err;
                }
                customerId = decoded.id;
            });
            newOrder.customerId = customerId;
        } else {
            const customerEmail = await this.customerService.findOne({
                where: {
                    email: checkoutParam.emailId,
                    deleteFlag: 0,
                },
            });
            if (customerEmail === undefined) {
                if (checkoutParam.password) {
                    const newUser = new Customer();
                    newUser.firstName = checkoutParam.shippingFirstName;
                    newUser.password = await Customer.hashPassword(checkoutParam.password);
                    newUser.email = checkoutParam.emailId;
                    newUser.username = checkoutParam.emailId;
                    newUser.mobileNumber = checkoutParam.phoneNumber;
                    newUser.isActive = 1;
                    newUser.ip = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const resultDatas = await this.customerService.create(newUser);
                    const emailContents = await this.emailTemplateService.findOne(1);
                    const message = emailContents.content.replace('{name}', resultDatas.firstName);
                    const redirectUrl = env.storeRedirectUrl;
                    MAILService.registerMail(logo, message, resultDatas.email, emailContents.subject, redirectUrl);
                    newOrder.customerId = resultDatas.id;
                } else {
                    newOrder.customerId = 0;
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please login for checkout, emailId already exist',
                };
                return response.status(400).send(errorResponse);
            }
        }
        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;
        newOrder.shippingFirstname = checkoutParam.shippingFirstName;
        newOrder.shippingLastname = checkoutParam.shippingLastName;
        newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
        newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
        newOrder.shippingCompany = checkoutParam.shippingCompany;
        newOrder.shippingCity = checkoutParam.shippingCity;
        newOrder.shippingZone = checkoutParam.shippingZone;
        newOrder.shippingCountryId = checkoutParam.shippingCountryId;
        const country = await this.countryService.findOne({
            where: {
                countryId: checkoutParam.shippingCountryId,
            },
        });
        if (country) {
            newOrder.shippingCountry = country.name;
        }
        newOrder.shippingPostcode = checkoutParam.shippingPostCode;
        newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.paymentMethod = checkoutParam.paymentMethod;
        newOrder.isActive = 1;
        newOrder.backOrders = 1;
        const setting = await this.settingService.findOne();
        newOrder.orderStatusId = setting.orderStatus;
        newOrder.invoicePrefix = setting.invoicePrefix;
        const currencyVal = await this.currencyService.findOne(setting.storeCurrencyId);
        if (currencyVal) {
            newOrder.currencyCode = currencyVal.code;
            newOrder.currencyValue = currencyVal.value;
            newOrder.currencySymbolLeft = currencyVal.symbolLeft;
            newOrder.currencySymbolRight = currencyVal.symbolRight;
            newOrder.currencyValue = currencyVal.value;
        }
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        const orderData = await this.orderService.create(newOrder);
        await this.orderLogService.create(orderData);
        const currencySymbol = await this.currencyService.findOne(setting.storeCurrencyId);
        if (currencySymbol) {
            orderData.currencyRight = currencySymbol.symbolRight;
            orderData.currencyLeft = currencySymbol.symbolLeft;
        }
        const nwDate = new Date();
        const orderDate = nwDate.getFullYear() + ('0' + (nwDate.getMonth() + 1)).slice(-2) + ('0' + nwDate.getDate()).slice(-2);
        orderProduct = checkoutParam.productDetails;
        let j = 1;
        for (i = 0; i < orderProduct.length; i++) {
            /// for find product price with tax , option price, special, discount and tire price /////
            let price: any;
            let taxType: any;
            let taxValue: any;
            let tirePrice: any;
            let priceWithTax: any;
            const productTire = await this.productService.findOne({ where: { productId: orderProduct[i].productId } });
            taxType = productTire.taxType;
            if (taxType === 2 && taxType) {
                const tax = await this.taxService.findOne({ where: { taxId: productTire.taxValue } });
                taxValue = (tax !== undefined) ? tax.taxPercentage : 0;
            } else if (taxType === 1 && taxType) {
                taxValue = productTire.taxValue;
            }
            const sku = await this.skuService.findOne({ where: { skuName: orderProduct[i].skuName } });
            if (sku) {
                if (productTire.hasTirePrice === 1) {
                    const findWithQty = await this.productTirePriceService.findTirePrice(orderProduct[i].productId, sku.id, orderProduct[i].quantity);
                    if (findWithQty) {
                        tirePrice = findWithQty.price;
                    } else {
                        const dateNow = new Date();
                        const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                        const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(orderProduct[i].productId, sku.id, todaydate);
                        const productDiscount = await this.productDiscountService.findDiscountPricewithSku(orderProduct[i].productId, sku.id, todaydate);
                        if (productSpecial !== undefined) {
                            tirePrice = productSpecial.price;
                        } else if (productDiscount !== undefined) {
                            tirePrice = productDiscount.price;
                        } else {
                            tirePrice = sku.price;
                        }
                    }
                    if (taxType && taxType === 2) {
                        const percentVal = +tirePrice * (+taxValue / 100);
                        priceWithTax = +tirePrice + +percentVal;
                    } else if (taxType && taxType === 1) {
                        priceWithTax = +tirePrice + +orderProduct[i].taxValue;
                    } else {
                        priceWithTax = +tirePrice;
                    }
                    price = priceWithTax;
                } else {
                    const dateNow = new Date();
                    const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                    const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(orderProduct[i].productId, sku.id, todaydate);
                    const productDiscount = await this.productDiscountService.findDiscountPricewithSku(orderProduct[i].productId, sku.id, todaydate);
                    if (productSpecial !== undefined) {
                        tirePrice = productSpecial.price;
                    } else if (productDiscount !== undefined) {
                        tirePrice = productDiscount.price;
                    } else {
                        tirePrice = sku.price;
                    }
                    if (taxType && taxType === 2) {
                        const perVal = +tirePrice * (+taxValue / 100);
                        priceWithTax = +tirePrice + +perVal;
                    } else if (taxType && taxType === 1) {
                        priceWithTax = +tirePrice + +taxValue;
                    } else {
                        priceWithTax = +tirePrice;
                    }
                    price = priceWithTax;
                }
            } else {
                tirePrice = productTire.price;
                if (taxType && taxType === 2) {
                    const percentAmt = +tirePrice * (+taxValue / 100);
                    priceWithTax = +tirePrice + +percentAmt;
                } else if (taxType && taxType === 1) {
                    priceWithTax = +tirePrice + +taxValue;
                } else {
                    priceWithTax = +tirePrice;
                }
                price = priceWithTax;
            }
            ///// finding price from backend ends /////
            const productDetails = new OrderProduct();
            productDetails.productId = orderProduct[i].productId;
            productDetails.orderProductPrefixId = orderData.invoicePrefix.concat('-' + orderDate + orderData.orderId) + j;
            productDetails.name = productTire.name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.productPrice = price;
            productDetails.basePrice = tirePrice;
            productDetails.taxType = taxType;
            productDetails.taxValue = taxValue;
            productDetails.total = +orderProduct[i].quantity * price;
            productDetails.model = productTire.name;
            productDetails.varientName = orderProduct[i].varientName ? orderProduct[i].varientName : '';
            productDetails.productVarientOptionId = orderProduct[i].productVarientOptionId ? orderProduct[i].productVarientOptionId : 0;
            productDetails.skuName = orderProduct[i].skuName ? orderProduct[i].skuName : '';
            productDetails.orderStatusId = 1;
            const productInformation = await this.orderProductService.createData(productDetails);
            await this.orderProductLogService.create(productInformation);
            const cart = await this.customerCartService.findOne({ where: { productId: orderProduct[i].productId, customerId: orderData.customerId } });
            if (cart !== undefined) {
                await this.customerCartService.delete(cart.id);
            }
            ///// for saving vendor orders starts///////
            const val = await this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
            if (val !== undefined) {
                const vendor = await this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                const vendororders = new VendorOrders();
                vendororders.subOrderId = orderData.invoicePrefix.concat('-' + orderDate + orderData.orderId) + val.vendorId + j;
                vendororders.vendorId = val.vendorId;
                vendororders.orderId = orderData.orderId;
                vendororders.orderProductId = productInformation.orderProductId;
                vendororders.total = productDetails.total;
                vendororders.subOrderStatusId = 1;
                vendororders.commission = 0;
                const date = new Date();
                vendororders.modifiedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                if (val.vendorProductCommission > 0) {
                    vendororders.commission = val.vendorProductCommission;
                } else if (vendor.commission > 0) {
                    vendororders.commission = vendor.commission;
                } else {
                    const defaultCommission = await this.vendorSettingService.findOne();
                    const defCommission = defaultCommission.defaultCommission;
                    vendororders.commission = defCommission;
                }
                const value = await this.vendorOrderService.create(vendororders);
                const vendorOrderLog = new VendorOrderLog();
                vendorOrderLog.vendorOrderId = value.vendorOrderId;
                vendorOrderLog.subOrderId = orderData.invoicePrefix.concat('-' + orderDate + orderData.orderId) + val.vendorId + j;
                vendorOrderLog.vendorId = val.vendorId;
                vendorOrderLog.orderId = orderData.orderId;
                vendorOrderLog.subOrderStatusId = 1;
                await this.vendorOrderLogService.create(vendorOrderLog);

                const vendorInvoice = await this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                if (!vendorInvoice) {
                    const newVendorInvoice: any = new VendorInvoice();
                    newVendorInvoice.vendorId = val.vendorId;
                    newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
                    newVendorInvoice.orderId = orderData.orderId;
                    newVendorInvoice.email = checkoutParam.emailId;
                    newVendorInvoice.total = 0;
                    newVendorInvoice.shippingFirstname = checkoutParam.shippingFirstName;
                    newVendorInvoice.shippingLastname = checkoutParam.shippingLastName;
                    await this.vendorInvoiceService.create(newVendorInvoice);
                }
                const vendorInvoiceData = await this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                vendorInvoiceData.total = vendorInvoiceData.total + +productDetails.total;
                const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                await this.vendorInvoiceService.create(vendorInvoiceData);

                const newVendorInvoiceItem = new VendorInvoiceItem();
                newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                newVendorInvoiceItem.orderProductId = productInformation.orderProductId;
                await this.vendorInvoiceItemService.create(newVendorInvoiceItem);
            }
            ///// for saving vendor orders ends //////
            let productImageDetail;
            if (productDetails.productVarientOptionId) {
                const image = await this.productVarientOptionImageService.findOne({ where: { productVarientOptionId: productDetails.productVarientOptionId } });
                if (image) {
                    productImageDetail = image;
                } else {
                    productImageDetail = await this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                }
            } else {
                productImageDetail = await this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
            }
            const productImageData = await this.productService.findOne(productInformation.productId);
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            productDetailData.push(productImageData);
            j++;
        }
        newOrder.amount = totalAmount;
        newOrder.total = totalAmount;
        newOrder.invoiceNo = 'INV00'.concat(orderData.orderId);
        newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
        await this.orderService.update(orderData.orderId, newOrder);
        newOrderTotal.orderId = orderData.orderId;
        newOrderTotal.value = totalAmount;
        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        if (plugin.pluginName === 'CashOnDelivery') {
            const emailContent = await this.emailTemplateService.findOne(5);
            const adminEmailContent = await this.emailTemplateService.findOne(6);
            const today = ('0' + nwDate.getDate()).slice(-2) + '.' + ('0' + (nwDate.getMonth() + 1)).slice(-2) + '.' + nwDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            const vendorInvoice = await this.vendorInvoiceService.findAll({ where: { orderId: orderData.orderId } });
            if (vendorInvoice.length > 0) {
                for (const vendInvoice of vendorInvoice) {
                    const vendorProductDetailData = [];
                    const vendor = await this.vendorService.findOne({ where: { vendorId: vendInvoice.vendorId } });
                    const customer = await this.customerService.findOne({ where: { id: vendor.customerId } });
                    const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                    const vendorInvoiceItem = await this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                    for (const vendInvoiceItem of vendorInvoiceItem) {
                        const vendorProductInformation = await this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'varientName', 'skuName', 'taxValue', 'taxType', 'productVarientOptionId', 'orderProductPrefixId'] });
                        const vendorProductImageData: any = await this.productService.findOne(vendorProductInformation.productId);
                        let vendorProductImageDetail;
                        if (vendorProductInformation.productVarientOptionId) {
                            const image = await this.productVarientOptionImageService.findOne({ where: { productVarientOptionId: vendorProductInformation.productVarientOptionId } });
                            if (image) {
                                vendorProductImageDetail = image;
                            } else {
                                vendorProductImageDetail = await this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                            }
                        } else {
                            vendorProductImageDetail = await this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                        }
                        vendorProductImageData.productInformationData = vendorProductInformation;
                        vendorProductImageData.productImage = vendorProductImageDetail;
                        vendorProductDetailData.push(vendorProductImageData);

                    }
                    const vendorRedirectUrl = env.vendorRedirectUrl;
                    MAILService.adminOrderMail(logo, vendorMessage, orderData, adminEmailContent.subject, vendorProductDetailData, today, customer.email, vendorRedirectUrl);
                }
            }
            const adminRedirectUrl = env.adminRedirectUrl;
            MAILService.adminOrderMail(logo, adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId, adminRedirectUrl);
            const storeRedirectUrl = env.storeRedirectUrl;
            MAILService.customerOrderMail(logo, customerMessage, orderData, emailContent.subject, productDetailData, today, storeRedirectUrl);
            const order = await this.orderService.findOrder(orderData.orderId);
            order.paymentType = plugin ? plugin.pluginName : '';
            order.productDetail = await this.orderProductService.find({where: {orderId: orderData.orderId}}).then((val) => {
                const productImage = val.map(async (value: any) => {
                    let image;
                    if (value.productVarientOptionId) {
                        const imageData = await this.productVarientOptionImageService.findOne({where: {productVarientOptionId: value.productVarientOptionId}});
                        if (imageData) {
                            image = imageData;
                        } else {
                            image = await this.productImageService.findOne({where: {productId: value.productId, defaultImage: 1}});
                        }
                    } else {
                        image = await this.productImageService.findOne({ where: { productId: value.productId } });
                    }
                    const temp: any = value;
                    temp.image = image;
                    return temp;
                });
                const results = Promise.all(productImage);
                return results;
            });
            const successResponse: any = {
                status: 1,
                message: 'You successfully checked out the product and order details send to your mail',
                data: order,
            };
            return response.status(200).send(successResponse);
        } else {

            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            orderData.paymentProcess = 0;
            await this.orderService.update(orderData.orderId, orderData);
            const route = env.baseUrl + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
            const successResponse: any = {
                status: 3,
                message: 'Redirect to this url',
                data: route,
            };
            return response.status(200).send(successResponse);

        }
    }

    // Customer Order List API
    /**
     * @api {get} /api/orders/order-list My Order List
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-list
     * @apiErrorExample {json} Order List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order List Function
    @Get('/order-list')
    @Authorized('customer')
    public async orderList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [
            'order.createdDate as createdDate',
            'order.orderPrefixId as orderPrefixId',
            'order.orderId as orderId',
            'order.shippingFirstname as customerFirstName',
            'order.shippingCity as shippingCity',
            'order.shippingCountry as shippingCountry',
            'order.shippingAddress1 as shippingAddress1',
            'order.shippingAddress2 as shippingAddress2',
            'order.shippingZone as shippingZone',
            'order.shippingZone as shippingPostcode',
            'order.currencyCode as currencyCode',
            'order.currencySymbolLeft as currencySymbolLeft',
            'order.currencySymbolRight as currencySymbolRight',
            'OrderProduct.orderProductId as orderProductId',
            'OrderProduct.orderStatusId as orderProductStatusId',
            'OrderProduct.productId as productId',
            'OrderProduct.name as name',
            'OrderProduct.total as total',
            'OrderProduct.orderProductPrefixId as orderProductPrefixId',
            'OrderProduct.productPrice as productPrice',
            'OrderProduct.quantity as quantity',
            'OrderProduct.cancelRequest as cancelRequest',
            'OrderProduct.cancelRequestStatus as cancelRequestStatus',
            'OrderProduct.discountAmount as discountAmount',
            'OrderProduct.discountedAmount as discountedAmount',
            'OrderProduct.varientName as varientName',
            'OrderProduct.skuName as skuName',
            'OrderProduct.productVarientOptionId as productVarientOptionId',
        ];

        const relations = [
            {
                tableName: 'OrderProduct.order',
                aliasName: 'order',
            },
            {
                tableName: 'order.orderStatus',
                aliasName: 'orderStatus',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'order.customerId',
            op: 'and',
            value: request.user.id,
        }, {
            name: 'order.paymentProcess',
            op: 'and',
            value: 1,
        });

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['OrderProduct.name', 'order.orderPrefixId', 'OrderProduct.orderProductPrefixId'],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'OrderProduct.createdDate',
            order: 'DESC',
        });
        if (count) {
            const orderCount: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const Response: any = {
                status: 1,
                message: 'Successfully get Count. ',
                data: orderCount,
            };
            return response.status(200).send(Response);
        }
        const orderList: any = await this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const promises = orderList.map(async (results: any) => {
            const temp = results;
            const productImage = await this.productImageService.findOne({
                where: { productId: results.productId, defaultImage: 1 },
                select: ['image', 'containerName'],
            });
            if (productImage !== undefined) {
                temp.image = productImage.image;
                temp.containerName = productImage.containerName;
            } else {
                temp.image = '';
                temp.containerName = '';
            }
            const passingOrderStatus = await this.orderStatusService.findOne({
                where: {
                    orderStatusId: results.orderProductStatusId,
                },
            });
            if (passingOrderStatus) {
                temp.orderStatusName = passingOrderStatus.name;
                temp.orderStatusColorCode = passingOrderStatus.colorCode;
            }
            const products = await this.productService.findOne({
                where: { productId: results.productId },
                select: ['productSlug'],
            });
            if (products) {
                temp.productSlug = products.productSlug;
            }
            return results;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order list. ',
            data: classToPlain(result),
        };
        return response.status(200).send(successResponse);
    }

    // Customer Order Detail API
    /**
     * @api {get} /api/orders/order-detail My OrderDetail
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId orderProductId
     * @apiParamExample {json} Input
     * {
     *      "orderProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @Get('/order-detail')
    @Authorized('customer')
    public async orderDetail(@QueryParam('orderProductId') orderProductId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const obj: any = {};
        const orderProduct = await this.orderProductService.findOne({
            select: ['basePrice', 'taxValue', 'taxType', 'orderProductId', 'orderId', 'productId', 'createdDate', 'modifiedDate', 'total', 'name', 'productPrice', 'orderProductPrefixId', 'quantity', 'orderStatusId', 'discountAmount', 'discountedAmount', 'varientName', 'skuName', 'productVarientOptionId'],
            where: {
                orderProductId,
            },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        const order = await this.orderService.findOrder({
            select: ['paymentType', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone', 'shippingCountry', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'paymentPostcode', 'paymentZone', 'paymentCountry', 'currencySymbolLeft', 'currencySymbolRight', 'customerGstNo'],
            where: {
                orderId: orderProduct.orderId, customerId: request.user.id,
            },
        });
        if (!order) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid order for this customer',
            };
            return response.status(400).send(errResponse);
        }
        const product = await this.productImageService.findOne({
            select: ['productId', 'image', 'containerName'],
            where: {
                productId: orderProduct.productId,
                defaultImage: 1,
            },
        });
        const products = await this.productService.findOne({
            select: ['productSlug'],
            where: {
                productId: orderProduct.productId,
            },
        });
        const passingOrderStatus = await this.orderStatusService.findOne({
            where: {
                orderStatusId: orderProduct.orderStatusId,
            },
        });
        obj.orderedDate = orderProduct.createdDate;
        obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
        obj.shippingAddress1 = order.shippingAddress1;
        obj.shippingAddress2 = order.shippingAddress2;
        obj.shippingCity = order.shippingCity;
        if (products) {
            obj.productSlug = products.productSlug;
        }
        obj.shippingPostcode = order.shippingPostcode;
        obj.shippingZone = order.shippingZone;
        obj.paymentMethod = order.paymentType;
        obj.total = orderProduct.total;
        if (passingOrderStatus) {
            obj.orderStatus = passingOrderStatus.name;
        }
        obj.currencySymbolLeft = order.currencySymbolLeft;
        obj.currencySymbolRight = order.currencySymbolRight;
        obj.discountAmount = orderProduct.discountAmount;
        obj.discountedAmount = orderProduct.discountedAmount;
        obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
        obj.customerGstNo = order.customerGstNo;
        obj.paymentAddress1 = order.paymentAddress1;
        obj.paymentAddress2 = order.paymentAddress2;
        obj.paymentCity = order.paymentCity;
        obj.paymentPostcode = order.paymentPostcode;
        obj.paymentZone = order.paymentZone;
        obj.paymentCountry = order.paymentCountry;
        obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
        if (orderProduct.modifiedDate) {
            obj.orderStatusDate = orderProduct.modifiedDate;
        } else {
            obj.orderStatusDate = orderProduct.createdDate;
        }
        if (product) {
            obj.productImage = product.image;
            obj.containerName = product.containerName;
        }
        obj.basePrice = orderProduct.basePrice;
        obj.taxValue = orderProduct.taxValue;
        obj.taxType = orderProduct.taxType;
        obj.orderId = orderProduct.orderId;
        obj.orderProductId = orderProduct.orderProductId;
        obj.productId = orderProduct.productId;
        obj.productName = orderProduct.name;
        obj.productQuantity = orderProduct.quantity;
        obj.productPrice = orderProduct.productPrice;
        obj.skuName = orderProduct.skuName;
        obj.varientName = orderProduct.varientName;
        obj.productVarientOptionId = orderProduct.productVarientOptionId;
        const orderStatus = await this.orderStatusService.findAll({
            select: ['orderStatusId', 'name'],
            where: {
                isActive: 1,
            },
        });
        const orderProductLog = await this.orderProductLogService.find({
            select: ['orderProductLogId', 'createdDate', 'orderStatusId'],
            where: {
                orderProductId: orderProduct.orderProductId,
            },
        });
        const orderStatusDate = orderStatus.map(async (value: any) => {
            const date = orderProductLog.find(item => item.orderStatusId === value.orderStatusId);
            const temp: any = value;
            if (date === undefined) {
                temp.createdDate = '';
            } else {
                temp.createdDate = date.createdDate;
            }
            return temp;
        });
        const result = await Promise.all(orderStatusDate);
        obj.deliveryStatus = result;
        const rating = await this.productRatingService.findOne({
            select: ['rating', 'review'],
            where: {
                customerId: request.user.id,
                orderProductId: orderProduct.orderProductId,
                productId: orderProduct.productId,
            },
        });
        if (rating !== undefined) {
            obj.rating = rating.rating;
            obj.review = rating.review;
        } else {
            obj.rating = 0;
            obj.review = '';
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully show the order details',
            data: obj,
        };
        return response.status(200).send(successResponse);
    }

    // Product Rating  API
    /**
     * @api {post} /api/orders/add-rating Add Rating  API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  productId
     * @apiParam (Request body) {Number}  orderProductId
     * @apiParam (Request body) {String} reviews productReviews
     * @apiParam (Request body) {Number} rating productRatings
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated your reviews and ratings!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/add-rating
     * @apiErrorExample {json} rating error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order List Function
    @Post('/add-rating')
    @Authorized('customer')
    public async Rating(@Body({ validate: true }) ratingValue: any, @Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.productService.findOne({

            where: { productId: request.body.productId },
        });
        if (!resultData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProduct = await this.orderProductService.findOne({
            where: {
                orderProductId: request.body.orderProductId,
            },
        });
        const order = await this.orderService.findOrder({
            where: {
                orderId: orderProduct.orderId, customerId: request.user.id,
            },
        });
        if (!order) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid rating for this user',
            };
            return response.status(400).send(errResponse);
        }
        const rating = await this.productRatingService.findOne({

            where: {
                orderProductId: request.body.orderProductId,
            },
        });
        if (rating) {
            rating.review = request.body.reviews;
            rating.rating = request.body.rating;
            const updateRatings = await this.productRatingService.create(rating);
            if (updateRatings) {
                const updateRating: any = await this.productRatingService.consolidateRating(request.body.productId);
                resultData.rating = updateRating.RatingSum / updateRating.RatingCount;
                await this.productService.create(resultData);
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully updated your reviews and ratings',
                };
                return response.status(200).send(successResponse);
            }
        } else {
            const customer = await this.customerService.findOne({ where: { id: request.user.id } });
            const newRating: any = new ProductRating();
            newRating.review = request.body.reviews;
            newRating.rating = request.body.rating;
            newRating.orderProductId = request.body.orderProductId;
            newRating.productId = request.body.productId;
            newRating.customerId = request.user.id;
            newRating.firstName = customer.firstName;
            newRating.lastName = customer.lastName;
            newRating.email = customer.email;
            newRating.isActive = 1;
            const AddRating = await this.productRatingService.create(newRating);
            if (AddRating) {
                const updateRating: any = await this.productRatingService.consolidateRating(request.body.productId);
                resultData.rating = updateRating.RatingSum / updateRating.RatingCount;
                await this.productService.create(resultData);
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully created your ratings and reviews',
                };
                return response.status(200).send(successResponse);
            }
        }
    }

    // Product Reviews  API
    /**
     * @api {post} /api/orders/add-reviews Add Reviews  API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  productId productId
     * @apiParam (Request body) {Number}  orderProductId
     * @apiParam (Request body) {String} reviews productReviews
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added reviews!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/add-reviews
     * @apiErrorExample {json} reviews error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order List Function
    @Post('/add-reviews')
    @Authorized('customer')
    public async Reviews(@Body({ validate: true }) Value: any, @Req() request: any, @Res() response: any): Promise<any> {
        const resultData = await this.productService.findOne({

            where: { productId: request.body.productId },
        });
        if (!resultData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const rating = await this.productRatingService.findOne({

            where: {
                orderProductId: request.body.orderProductId,
            },
        });
        if (rating) {
            rating.review = request.body.reviews;
            const updateRating = await this.productRatingService.create(rating);
            if (updateRating) {
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully updated your reviews',
                };
                return response.status(200).send(successResponse);
            }
        } else {
            const customer = await this.customerService.findOne({ where: { id: request.user.id } });
            const newRating: any = new ProductRating();
            newRating.review = request.body.reviews;
            newRating.productId = request.body.productId;
            newRating.orderProductId = request.body.orderProductId;
            newRating.customerId = request.user.id;
            newRating.firstName = customer.firstName;
            newRating.lastName = customer.lastName;
            newRating.email = customer.email;
            newRating.isActive = 1;
            await this.productRatingService.create(newRating);

            const successResponse: any = {
                status: 1,
                message: 'Successfully created your reviews',
            };
            return response.status(200).send(successResponse);

        }
    }

    // Track Order Product API
    /**
     * @api {get} /api/orders/track-order-product Track Order
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId Order Product Id
     * @apiParamExample {json} Input
     * {
     *      "orderProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Track Order..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/track-order-product
     * @apiErrorExample {json} Track Order error
     * HTTP/1.1 500 Internal Server Error
     */
    // Track Order Function
    @Get('/track-order-product')
    @Authorized('customer')
    public async trackOrder(@QueryParam('orderProductId') orderProductId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const obj: any = {};
        const orderProduct = await this.orderProductService.findOne({
            select: ['basePrice', 'taxValue', 'taxType', 'orderProductId', 'trackingNo', 'trackingUrl', 'name', 'productPrice', 'orderId', 'productId', 'orderProductPrefixId', 'total', 'quantity', 'discountAmount', 'discountedAmount', 'modifiedDate', 'orderStatusId', 'createdDate', 'varientName', 'skuName', 'productVarientOptionId'],
            where: { orderProductId },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        const product = await this.productImageService.findOne({
            select: ['image', 'containerName', 'productId'],
            where: { productId: orderProduct.productId, defaultImage: 1 },
        });
        const order = await this.orderService.findOrder({
            select: ['shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone', 'currencySymbolLeft', 'currencySymbolRight', 'orderPrefixId'],
            where: { orderId: orderProduct.orderId, customerId: request.user.id },
        });
        if (!order) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid order for this customer',
            };
            return response.status(400).send(errResponse);
        }
        const passingOrderStatus = await this.orderStatusService.findOne({
            where: {
                orderStatusId: orderProduct.orderStatusId,
            },
        });
        obj.basePrice = orderProduct.basePrice;
        obj.taxValue = orderProduct.taxValue;
        obj.taxType = orderProduct.taxType;
        obj.orderProductId = orderProduct.orderProductId;
        obj.orderId = orderProduct.orderId;
        obj.productId = orderProduct.productId;
        obj.orderProductPrefixId = orderProduct.orderProductPrefixId;
        obj.trackingId = orderProduct.trackingNo;
        obj.trackingUrl = orderProduct.trackingUrl;
        obj.productName = orderProduct.name;
        obj.productPrice = orderProduct.productPrice;
        obj.discountAmount = orderProduct.discountAmount;
        obj.discountedAmount = orderProduct.discountedAmount;
        obj.varientName = orderProduct.varientName;
        obj.skuName = orderProduct.skuName;
        obj.productVarientOptionId = orderProduct.productVarientOptionId;
        obj.total = orderProduct.total;
        if (orderProduct.modifiedDate) {
            obj.orderStatusDate = orderProduct.modifiedDate;
        } else {
            obj.orderStatusDate = orderProduct.createdDate;
        }
        if (passingOrderStatus) {
            obj.orderStatus = passingOrderStatus.name;
        }
        obj.productQuantity = orderProduct.quantity;
        obj.shippingAddress1 = order.shippingAddress1;
        obj.shippingAddress2 = order.shippingAddress2;
        obj.shippingCity = order.shippingCity;
        obj.shippingPostcode = order.shippingPostcode;
        obj.shippingZone = order.shippingZone;
        obj.currencySymbolLeft = order.currencySymbolLeft;
        obj.currencySymbolRight = order.currencySymbolRight;
        obj.orderPrefixId = order.orderPrefixId;
        if (product) {
            obj.productImage = product.image;
            obj.containerName = product.containerName;
        }
        const orderStatus = await this.orderStatusService.findAll({
            select: ['orderStatusId', 'name'],
            where: {
                isActive: 1,
            },
        });
        const orderProductLog = await this.orderProductLogService.find({
            select: ['orderProductLogId', 'createdDate', 'orderStatusId'],
            where: {
                orderProductId: orderProduct.orderProductId,
            },
        });
        const orderStatusDate = orderStatus.map(async (value: any) => {
            const date = orderProductLog.find(item => item.orderStatusId === value.orderStatusId);
            const temp: any = value;
            if (date === undefined) {
                temp.createdDate = '';
            } else {
                temp.createdDate = date.createdDate;
            }
            return temp;
        });
        const result = await Promise.all(orderStatusDate);
        obj.deliveryStatus = result;
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the Track Order.',
            data: obj,
        };
        return response.status(200).send(successResponse);
    }

    //  Order Export PDF API
    /**
     * @api {get} /api/orders/order-export-pdf  Order Export PDF API
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderProductId Order Product Id
     * @apiParamExample {json} Input
     * {
     *      "orderProductId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-export-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @Get('/order-export-pdf')
    @Authorized('customer')
    public async orderExportPdf(@QueryParam('orderProductId') orderProductId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderProduct = await this.orderProductService.findOne({
            where: {
                orderProductId,
            },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order Product Id',
            };
            return response.status(400).send(errorResponse);
        }
        const orderData = await this.orderService.findOrder({
            where: { orderId: orderProduct.orderId, customerId: request.user.id }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'couponCode', 'discountAmount', 'amount',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
        });
        if (!orderData) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid Order for this customer',
            };
            return response.status(400).send(errResponse);
        }
        orderData.productList = await this.orderProductService.find({ where: { orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount'] }).then((val) => {
            const productVal = val.map(async (value: any) => {
                const rating = await this.productRatingService.findOne({ select: ['rating', 'review'], where: { customerId: orderData.customerId, orderProductId: value.orderProductId, productId: value.productId } });
                const tempVal: any = value;
                tempVal.taxType = value.taxType;
                tempVal.taxValue = value.taxValue;
                if (value.taxType === 2) {
                    tempVal.taxValueInAmount = value.basePrice * (value.taxValue / 100);
                } else {
                    tempVal.taxValueInAmount = value.taxValue;
                }
                if (rating !== undefined) {
                    tempVal.rating = rating.rating;
                    tempVal.review = rating.review;
                } else {
                    tempVal.rating = 0;
                    tempVal.review = '';
                }
                return tempVal;
            });
            const results = Promise.all(productVal);
            return results;
        });
        const select = '';
        const relation = [];
        const WhereConditions = [];
        const limit = 1;

        const settings: any = await this.settingService.list(limit, select, relation, WhereConditions);
        const settingDetails = settings[0];
        const countryData: any = await this.countryService.findOne({ where: { countryId: settingDetails.countryId } });
        const zoneData: any = await this.zoneService.findOne({ where: { zoneId: settingDetails.zoneId } });
        orderData.settingDetails = settingDetails;
        orderData.zoneData = (zoneData !== undefined) ? zoneData : ' ';
        orderData.countryData = (countryData !== undefined) ? countryData : ' ';
        orderData.currencyCode = orderData.currencyCode;
        orderData.symbolLeft = orderData.currencySymbolLeft;
        orderData.symbolRight = orderData.currencySymbolRight;
        const orderStatusData = await this.orderStatusService.findOne({
            where: { orderStatusId: orderProduct.orderStatusId },
            select: ['name', 'colorCode'],
        });
        if (orderStatusData) {
            orderData.orderStatusName = orderStatusData.name;
            orderData.statusColorCode = orderStatusData.colorCode;
        }
        let image: any;
        if (env.imageserver === 's3') {
            image = await this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '50', '50');
        } else {
            image = await this.imageService.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '50', '50');
        }
        orderData.logo = image;
        const htmlData = await this.pdfService.readHtmlToString('invoice', orderData);
        const pdfBinary = await this.pdfService.createPDFFile(htmlData, true, '');
        return response.status(200).send({
            data: pdfBinary,
            status: 1,
            message: 'pdf exported',
        });
    }

    public decrypt(text: any): any {
        const crypto = require('crypto');
        const ENCRYPTION_KEY = '@##90kdu(**^$!!hj((&$2jhn^5$%9@q';
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    // Order Cancel Reason List
    /**
     * @api {get} /api/orders/order-cancel-reason-list Order Cancel Reason List
     * @apiGroup Store order
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Listed..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/orders/order-cancel-reason-list
     * @apiErrorExample {json} order cancel reason List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Abuse Reason list Function
    @Get('/order-cancel-reason-list')
    @Authorized('customer')
    public async reasonList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['id', 'reason'];
        const ReasonList: any = await this.orderCancelReasonService.list(limit, offset, select, 0, 0, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got Order Cancel Reason list',
            data: ReasonList,
        };
        return response.status(200).send(successResponse);
    }

    // order cancel Request API
    /**
     * @api {post} /api/orders/order-cancel-request order cancel request API
     * @apiGroup Store order
     * @apiParam (Request body) {String} description
     * @apiParam (Request body) {Number} orderProductId
     * @apiParam (Request body) {Number} reasonId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "description" : "",
     *      "orderProductId" : "",
     *      "reasonId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully posted your cancel request",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/orders/order-cancel-request
     * @apiErrorExample {json} Order Cancel Request error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/order-cancel-request')
    @Authorized('customer')
    public async createOrderCancel(@Body({ validate: true }) orderCancelParam: OrderCancelRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const orderProduct = await this.orderProductService.findOne({
            where: { orderProductId: orderCancelParam.orderProductId },
        });
        if (!orderProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Order ProductId',
            };
            return response.status(400).send(errorResponse);
        }
        const reason = await this.orderCancelReasonService.findOne({
            where: { id: orderCancelParam.reasonId },
        });
        if (!reason) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid reasonId',
            };
            return response.status(400).send(errorResponse);
        }
        const order = await this.orderService.findOrder({
            where: { orderId: orderProduct.orderId, customerId: request.user.id },
        });
        if (!order) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid request for this user',
            };
            return response.status(400).send(errResponse);
        }
        orderProduct.cancelReason = reason.reason;
        orderProduct.cancelReasonDescription = orderCancelParam.description;
        orderProduct.cancelRequest = 1;
        orderProduct.cancelRequestStatus = 0;
        const orderProductUpdated = await this.orderProductService.createData(orderProduct);
        if (orderProductUpdated !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Your order cancel request posted successfully',
                data: orderProductUpdated,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to post',
            };
            return response.status(400).send(errorResponse);
        }
    }

}
