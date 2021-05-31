"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerOrderController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const CustomerCheckoutRequest_1 = require("./requests/CustomerCheckoutRequest");
const OrderCancelRequest_1 = require("./requests/OrderCancelRequest");
const OrderService_1 = require("../../services/OrderService");
const OrderProductService_1 = require("../../services/OrderProductService");
const OrderTotalService_1 = require("../../services/OrderTotalService");
const Order_1 = require("../../models/Order");
const OrderProduct_1 = require("../../models/OrderProduct");
const OrderTotal_1 = require("../../models/OrderTotal");
const CustomerService_1 = require("../../services/CustomerService");
const mail_services_1 = require("../../../auth/mail.services");
const ProductService_1 = require("../../services/ProductService");
const ProductImageService_1 = require("../../services/ProductImageService");
const SettingService_1 = require("../../services/SettingService");
const EmailTemplateService_1 = require("../../services/EmailTemplateService");
const RatingService_1 = require("../../services/RatingService");
const ProductRating_1 = require("../../models/ProductRating");
const CountryService_1 = require("../../services/CountryService");
const UserService_1 = require("../../services/UserService");
const Customer_1 = require("../../models/Customer");
const VendorOrders_1 = require("../../models/VendorOrders");
const VendorService_1 = require("../../services/VendorService");
const PluginService_1 = require("../../services/PluginService");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const CurrencyService_1 = require("../../services/CurrencyService");
const env_1 = require("../../../env");
const VendorOrderService_1 = require("../../services/VendorOrderService");
const VendorProductService_1 = require("../../services/VendorProductService");
const OrderLogService_1 = require("../../services/OrderLogService");
const VendorOrderLogService_1 = require("../../services/VendorOrderLogService");
const VendorOrderLog_1 = require("../../models/VendorOrderLog");
const VendorSettingService_1 = require("../../services/VendorSettingService");
const PdfService_1 = require("../../services/PdfService");
const zoneService_1 = require("../../services/zoneService");
const S3Service_1 = require("../../services/S3Service");
const ImageService_1 = require("../../services/ImageService");
const OrderStatusService_1 = require("../../services/OrderStatusService");
const DeliveryLocationService_1 = require("../../services/DeliveryLocationService");
const OrderProductLogService_1 = require("../../services/OrderProductLogService");
const CustomerCartService_1 = require("../../services/CustomerCartService");
const CouponUsage_1 = require("../../models/CouponUsage");
const CouponUsageProduct_1 = require("../../models/CouponUsageProduct");
const CouponUsageService_1 = require("../../services/CouponUsageService");
const CouponUsageProductService_1 = require("../../services/CouponUsageProductService");
const VendorCouponService_1 = require("../../services/VendorCouponService");
const OrderCancelReasonService_1 = require("../../services/OrderCancelReasonService");
const StockLogService_1 = require("../../services/StockLogService");
const moment = require("moment");
const StockLog_1 = require("../../models/StockLog");
const ProductStockAlertService_1 = require("../../services/ProductStockAlertService");
const ProductStockAlert_1 = require("../../models/ProductStockAlert");
const ProductTirePriceService_1 = require("../../services/ProductTirePriceService");
const ProductSpecialService_1 = require("../../services/ProductSpecialService");
const ProductDiscountService_1 = require("../../services/ProductDiscountService");
const VendorInvoiceItemService_1 = require("../../services/VendorInvoiceItemService");
const VendorInvoiceService_1 = require("../../services/VendorInvoiceService");
const VendorInvoice_1 = require("../../models/VendorInvoice");
const VendorInvoiceItem_1 = require("../../models/VendorInvoiceItem");
const SkuService_1 = require("../../services/SkuService");
const ProductVarientOptionImageService_1 = require("../../services/ProductVarientOptionImageService");
const TaxService_1 = require("../../services/TaxService");
const CustomerBackorderRequest_1 = require("./requests/CustomerBackorderRequest");
let CustomerOrderController = class CustomerOrderController {
    constructor(orderService, orderProductService, orderTotalService, vendorService, vendorSettingService, customerService, productService, productImageService, settingService, emailTemplateService, productRatingService, vendorProductService, orderLogService, countryService, pluginService, currencyService, vendorOrderService, userService, vendorOrderLogService, pdfService, zoneService, s3Service, orderStatusService, deliveryLocationService, orderProductLogService, customerCartService, couponUsageService, couponUsageProductService, vendorCouponService, orderCancelReasonService, stockLogService, productStockAlertService, productTirePriceService, productSpecialService, productDiscountService, vendorInvoiceService, vendorInvoiceItemService, productVarientOptionImageService, taxService, imageService, skuService) {
        this.orderService = orderService;
        this.orderProductService = orderProductService;
        this.orderTotalService = orderTotalService;
        this.vendorService = vendorService;
        this.vendorSettingService = vendorSettingService;
        this.customerService = customerService;
        this.productService = productService;
        this.productImageService = productImageService;
        this.settingService = settingService;
        this.emailTemplateService = emailTemplateService;
        this.productRatingService = productRatingService;
        this.vendorProductService = vendorProductService;
        this.orderLogService = orderLogService;
        this.countryService = countryService;
        this.pluginService = pluginService;
        this.currencyService = currencyService;
        this.vendorOrderService = vendorOrderService;
        this.userService = userService;
        this.vendorOrderLogService = vendorOrderLogService;
        this.pdfService = pdfService;
        this.zoneService = zoneService;
        this.s3Service = s3Service;
        this.orderStatusService = orderStatusService;
        this.deliveryLocationService = deliveryLocationService;
        this.orderProductLogService = orderProductLogService;
        this.customerCartService = customerCartService;
        this.couponUsageService = couponUsageService;
        this.couponUsageProductService = couponUsageProductService;
        this.vendorCouponService = vendorCouponService;
        this.orderCancelReasonService = orderCancelReasonService;
        this.stockLogService = stockLogService;
        this.productStockAlertService = productStockAlertService;
        this.productTirePriceService = productTirePriceService;
        this.productSpecialService = productSpecialService;
        this.productDiscountService = productDiscountService;
        this.vendorInvoiceService = vendorInvoiceService;
        this.vendorInvoiceItemService = vendorInvoiceItemService;
        this.productVarientOptionImageService = productVarientOptionImageService;
        this.taxService = taxService;
        this.imageService = imageService;
        this.skuService = skuService;
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
    customerCheckout(checkoutParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const logo = yield this.settingService.findOne();
            if (checkoutParam.couponCode) {
                const vendorCoupon = yield this.vendorCouponService.findOne({ where: { couponCode: checkoutParam.couponCode } });
                if (!vendorCoupon) {
                    const errResponse = {
                        status: 0,
                        message: 'Invalid coupon code',
                    };
                    return response.status(400).send(errResponse);
                }
            }
            const error = [];
            const dynamicData = {};
            const orderProducts = checkoutParam.productDetails;
            for (const val of orderProducts) {
                const productAvailability = yield this.productService.findOne({ where: { productId: val.productId } });
                if (productAvailability.pincodeBasedDelivery === 1) {
                    const value = yield this.vendorProductService.findOne({ where: { productId: val.productId } });
                    if (value) {
                        const deliveryLocation = yield this.deliveryLocationService.findOne({ where: { zipCode: checkoutParam.shippingPostCode, vendorId: value.vendorId } });
                        if (!deliveryLocation) {
                            error.push(1);
                        }
                    }
                    else {
                        const deliveryLocation = yield this.deliveryLocationService.findOne({ where: { zipCode: checkoutParam.shippingPostCode, vendorId: 0 } });
                        if (!deliveryLocation) {
                            error.push(1);
                        }
                    }
                }
                /// for find product price with tax , option price, special, discount and tire price /////
                let price;
                let taxType;
                let taxValue;
                let tirePrice;
                let priceWithTax;
                const productTire = yield this.productService.findOne({ where: { productId: val.productId } });
                taxType = productTire.taxType;
                if (taxType === 2 && taxType) {
                    const tax = yield this.taxService.findOne({ where: { taxId: productTire.taxValue } });
                    taxValue = (tax !== undefined) ? tax.taxPercentage : 0;
                }
                else if (taxType === 1 && taxType) {
                    taxValue = productTire.taxValue;
                }
                const sku = yield this.skuService.findOne({ where: { skuName: val.skuName } });
                if (sku) {
                    if (productTire.hasTirePrice === 1) {
                        const findWithQty = yield this.productTirePriceService.findTirePrice(val.productId, sku.id, val.quantity);
                        if (findWithQty) {
                            tirePrice = findWithQty.price;
                        }
                        else {
                            const dateNow = new Date();
                            const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                            const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(val.productId, sku.id, todaydate);
                            const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(val.productId, sku.id, todaydate);
                            if (productSpecial !== undefined) {
                                tirePrice = productSpecial.price;
                            }
                            else if (productDiscount !== undefined) {
                                tirePrice = productDiscount.price;
                            }
                            else {
                                tirePrice = sku.price;
                            }
                        }
                        if (taxType && taxType === 2) {
                            const percentVal = +tirePrice * (+taxValue / 100);
                            priceWithTax = +tirePrice + +percentVal;
                        }
                        else if (taxType && taxType === 1) {
                            priceWithTax = +tirePrice + +val.taxValue;
                        }
                        else {
                            priceWithTax = +tirePrice;
                        }
                        price = priceWithTax;
                    }
                    else {
                        const dateNow = new Date();
                        const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                        const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(val.productId, sku.id, todaydate);
                        const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(val.productId, sku.id, todaydate);
                        if (productSpecial !== undefined) {
                            tirePrice = productSpecial.price;
                        }
                        else if (productDiscount !== undefined) {
                            tirePrice = productDiscount.price;
                        }
                        else {
                            tirePrice = sku.price;
                        }
                        if (taxType && taxType === 2) {
                            const perVal = +tirePrice * (+taxValue / 100);
                            priceWithTax = +tirePrice + +perVal;
                        }
                        else if (taxType && taxType === 1) {
                            priceWithTax = +tirePrice + +taxValue;
                        }
                        else {
                            priceWithTax = +tirePrice;
                        }
                        price = priceWithTax;
                    }
                }
                else {
                    tirePrice = productTire.price;
                    if (taxType && taxType === 2) {
                        const percentAmt = +tirePrice * (+taxValue / 100);
                        priceWithTax = +tirePrice + +percentAmt;
                    }
                    else if (taxType && taxType === 1) {
                        priceWithTax = +tirePrice + +taxValue;
                    }
                    else {
                        priceWithTax = +tirePrice;
                    }
                    price = priceWithTax;
                }
                ///// finding price from backend ends /////
                const obj = {};
                obj.price = price;
                obj.taxType = taxType;
                obj.taxValue = taxValue;
                obj.tirePrice = tirePrice;
                obj.productTire = productTire;
                obj.quantity = val.quantity;
                dynamicData[val.skuName] = obj;
            }
            if (error.length > 0) {
                const errResponse = {
                    status: 0,
                    message: 'Product not available for your pincode',
                    data: error,
                };
                return response.status(400).send(errResponse);
            }
            for (const val of orderProducts) {
                const product = yield this.productService.findOne(val.productId);
                const sku = yield this.skuService.findOne({ where: { skuName: val.skuName } });
                if (product.hasStock === 1) {
                    if (!(sku.minQuantityAllowedCart <= +val.quantity)) {
                        const minCart = {
                            status: 0,
                            message: 'Quantity should greater than min Quantity.',
                        };
                        return response.status(400).send(minCart);
                    }
                    else if (!(sku.maxQuantityAllowedCart >= +val.quantity)) {
                        const maxCart = {
                            status: 0,
                            message: 'Quantity should lesser than max Quantity.',
                        };
                        return response.status(400).send(maxCart);
                    }
                    if ((+sku.quantity <= 0)) {
                        const cart = {
                            status: 0,
                            message: 'item is Out of stock',
                        };
                        return response.status(400).send(cart);
                    }
                    if (!(+sku.quantity >= +val.quantity)) {
                        const cart = {
                            status: 0,
                            message: 'Available stock for' + product.name + ' - ' + val.skuName + 'is' + sku.quantity,
                        };
                        return response.status(400).send(cart);
                    }
                }
            }
            const plugin = yield this.pluginService.findOne({ where: { id: checkoutParam.paymentMethod } });
            if (plugin === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Payment method is invalid',
                };
                return response.status(400).send(errorResponse);
            }
            const newOrder = new Order_1.Order();
            const newOrderTotal = new OrderTotal_1.OrderTotal();
            let orderProduct = [];
            let i;
            let n;
            let totalProductAmount;
            let totalAmount = 0;
            const productDetailData = [];
            if (request.header('authorization')) {
                let customerId;
                jsonwebtoken_1.default.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                    if (err) {
                        throw err;
                    }
                    customerId = decoded.id;
                });
                newOrder.customerId = customerId;
            }
            else {
                const customerEmail = yield this.customerService.findOne({
                    where: {
                        email: checkoutParam.emailId,
                        deleteFlag: 0,
                    },
                });
                if (customerEmail === undefined) {
                    if (checkoutParam.password) {
                        const newUser = new Customer_1.Customer();
                        newUser.firstName = checkoutParam.shippingFirstName;
                        const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
                        if (!checkoutParam.password.match(pattern)) {
                            const passwordValidatingMessage = [];
                            passwordValidatingMessage.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
                            const errResponse = {
                                status: 0,
                                message: "You have an error in your request's body. Check 'errors' field for more details!",
                                data: { message: passwordValidatingMessage },
                            };
                            return response.status(422).send(errResponse);
                        }
                        const partsOfThreeLetters = checkoutParam.emailId.match(/.{3}/g).concat(checkoutParam.emailId.substr(1).match(/.{3}/g), checkoutParam.emailId.substr(2).match(/.{3}/g));
                        const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(checkoutParam.password);
                        if (matchEmail === true) {
                            const validationMessage = [];
                            validationMessage.push('Password must not duplicate any part of the email address');
                            const passwordDuplicateErrorResponse = {
                                status: 0,
                                message: "You have an error in your request's body. Check 'errors' field for more details!",
                                data: { message: validationMessage },
                            };
                            return response.status(422).send(passwordDuplicateErrorResponse);
                        }
                        newUser.password = yield Customer_1.Customer.hashPassword(checkoutParam.password);
                        newUser.email = checkoutParam.emailId;
                        newUser.username = checkoutParam.emailId;
                        newUser.mobileNumber = checkoutParam.phoneNumber;
                        newUser.isActive = 1;
                        newUser.ip = (request.headers['x-forwarded-for'] ||
                            request.connection.remoteAddress ||
                            request.socket.remoteAddress ||
                            request.connection.socket.remoteAddress).split(',')[0];
                        const resultDatas = yield this.customerService.create(newUser);
                        const emailContents = yield this.emailTemplateService.findOne(1);
                        const message = emailContents.content.replace('{name}', resultDatas.firstName);
                        const redirectUrl = env_1.env.storeRedirectUrl;
                        mail_services_1.MAILService.registerMail(logo, message, resultDatas.email, emailContents.subject, redirectUrl);
                        newOrder.customerId = resultDatas.id;
                    }
                    else {
                        newOrder.customerId = 0;
                    }
                }
                else {
                    const errorResponse = {
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
            const country = yield this.countryService.findOne({
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
            const paymentCountry = yield this.countryService.findOne({
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
            const setting = yield this.settingService.findOne();
            newOrder.orderStatusId = setting ? setting.orderStatus : 0;
            newOrder.invoicePrefix = setting ? setting.invoicePrefix : '';
            const currencyVal = yield this.currencyService.findOne(setting.storeCurrencyId);
            newOrder.currencyCode = currencyVal ? currencyVal.code : '';
            newOrder.currencyValue = currencyVal ? currencyVal.value : '';
            newOrder.currencySymbolLeft = currencyVal ? currencyVal.symbolLeft : '';
            newOrder.currencySymbolRight = currencyVal ? currencyVal.symbolRight : '';
            newOrder.currencyValue = currencyVal ? currencyVal.value : '';
            newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
            const orderData = yield this.orderService.create(newOrder);
            yield this.orderLogService.create(orderData);
            const currencySymbol = yield this.currencyService.findOne(setting.storeCurrencyId);
            orderData.currencyRight = currencySymbol ? currencySymbol.symbolRight : '';
            orderData.currencyLeft = currencySymbol ? currencySymbol.symbolLeft : '';
            orderProduct = checkoutParam.productDetails;
            let j = 1;
            for (i = 0; i < orderProduct.length; i++) {
                ///// finding price from backend ends /////
                const dynamicPrices = dynamicData[orderProduct[i].skuName];
                const productDetails = new OrderProduct_1.OrderProduct();
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
                const productInformation = yield this.orderProductService.createData(productDetails);
                yield this.orderProductLogService.create(productInformation);
                const cart = yield this.customerCartService.findOne({ where: { productId: orderProduct[i].productId, customerId: orderData.customerId } });
                if (cart !== undefined) {
                    yield this.customerCartService.delete(cart.id);
                }
                ///// for saving vendor orders starts///////
                const val = yield this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
                if (val !== undefined) {
                    const vendor = yield this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                    const vendororders = new VendorOrders_1.VendorOrders();
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
                    }
                    else if (vendor.commission > 0) {
                        vendororders.commission = vendor.commission;
                    }
                    else {
                        const defaultCommission = yield this.vendorSettingService.findOne();
                        const defCommission = defaultCommission.defaultCommission;
                        vendororders.commission = defCommission;
                    }
                    const value = yield this.vendorOrderService.create(vendororders);
                    const vendorOrderLog = new VendorOrderLog_1.VendorOrderLog();
                    vendorOrderLog.vendorOrderId = value.vendorOrderId;
                    vendorOrderLog.subOrderId = orderData.invoicePrefix.concat('-' + odrDate + orderData.orderId) + val.vendorId + j;
                    vendorOrderLog.vendorId = val.vendorId;
                    vendorOrderLog.orderId = orderData.orderId;
                    vendorOrderLog.subOrderStatusId = 1;
                    yield this.vendorOrderLogService.create(vendorOrderLog);
                    const vendorInvoice = yield this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                    if (!vendorInvoice) {
                        const newVendorInvoice = new VendorInvoice_1.VendorInvoice();
                        newVendorInvoice.vendorId = val.vendorId;
                        newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
                        newVendorInvoice.orderId = orderData.orderId;
                        newVendorInvoice.email = checkoutParam.emailId;
                        newVendorInvoice.total = 0;
                        newVendorInvoice.shippingFirstname = checkoutParam.shippingFirstName;
                        newVendorInvoice.shippingLastname = checkoutParam.shippingLastName;
                        yield this.vendorInvoiceService.create(newVendorInvoice);
                    }
                    const vendorInvoiceData = yield this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                    vendorInvoiceData.total = vendorInvoiceData.total + +productDetails.total;
                    const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                    vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                    yield this.vendorInvoiceService.create(vendorInvoiceData);
                    const newVendorInvoiceItem = new VendorInvoiceItem_1.VendorInvoiceItem();
                    newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                    newVendorInvoiceItem.orderProductId = productInformation.orderProductId;
                    yield this.vendorInvoiceItemService.create(newVendorInvoiceItem);
                }
                ///// for saving vendor orders ends //////
                const productImageData = yield this.productService.findOne(productInformation.productId);
                // for stock management
                if (productImageData.hasStock === 1) {
                    const product = yield this.skuService.findOne({ where: { skuName: productInformation.skuName } });
                    product.quantity = +product.quantity - +productInformation.quantity;
                    const prod = yield this.skuService.create(product);
                    if (+prod.quantity <= +prod.notifyMinQuantity) {
                        const productStockAlert = new ProductStockAlert_1.ProductStockAlert();
                        productStockAlert.productId = productInformation.productId;
                        productStockAlert.skuName = productInformation.skuName;
                        productStockAlert.mailFlag = 1;
                        yield this.productStockAlertService.create(productStockAlert);
                    }
                    const stockLog = new StockLog_1.StockLog();
                    stockLog.productId = productInformation.productId;
                    stockLog.orderId = orderData.orderId;
                    stockLog.skuName = productInformation.skuName;
                    stockLog.quantity = productInformation.quantity;
                    yield this.stockLogService.create(stockLog);
                }
                let productImageDetail;
                if (productDetails.productVarientOptionId) {
                    const image = yield this.productVarientOptionImageService.findOne({ where: { productVarientOptionId: productDetails.productVarientOptionId } });
                    if (image) {
                        productImageDetail = image;
                    }
                    else {
                        productImageDetail = yield this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                    }
                }
                else {
                    productImageDetail = yield this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                }
                productImageData.productInformationData = productInformation;
                productImageData.productImage = productImageDetail;
                totalProductAmount = yield this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
                for (n = 0; n < totalProductAmount.length; n++) {
                    totalAmount += +totalProductAmount[n].total;
                }
                productDetailData.push(productImageData);
                j++;
            }
            let grandDiscountAmount = 0;
            if (checkoutParam.couponCode && checkoutParam.couponData) {
                const couponUsage = new CouponUsage_1.CouponUsage();
                const vendorCoupon = yield this.vendorCouponService.findOne({ where: { couponCode: checkoutParam.couponCode } });
                couponUsage.couponId = vendorCoupon.vendorCouponId;
                couponUsage.customerId = orderData.customerId;
                couponUsage.orderId = orderData.orderId;
                couponUsage.discountAmount = checkoutParam.couponDiscountAmount;
                const couponUsageData = yield this.couponUsageService.create(couponUsage);
                const decryptedCouponCode = this.decrypt(checkoutParam.couponData);
                const ParseData = JSON.parse(decryptedCouponCode);
                for (const product of ParseData) {
                    const couponUsageProduct = new CouponUsageProduct_1.CouponUsageProduct();
                    couponUsageProduct.couponUsageId = couponUsageData.couponUsageId;
                    couponUsageProduct.customerId = orderData.customerId;
                    couponUsageProduct.orderId = orderData.orderId;
                    const orderProductData = yield this.orderProductService.findOne({ where: { orderId: orderData.orderId, productId: product.productId } });
                    const dynamicPrices = dynamicData[product.skuName];
                    const total = product.quantity * dynamicPrices.price;
                    let discountAmount = 0;
                    if (vendorCoupon.couponType === 1) {
                        discountAmount = total * (vendorCoupon.discount / 100);
                    }
                    else {
                        discountAmount = vendorCoupon.discount;
                    }
                    grandDiscountAmount += +discountAmount;
                    orderProductData.discountAmount = +discountAmount;
                    orderProductData.discountedAmount = +orderProductData.total - (+discountAmount);
                    yield this.orderProductService.createData(orderProductData);
                    const vendorOrderData = yield this.vendorOrderService.findOne({ where: { orderProductId: orderData.orderProductId } });
                    if (vendorOrderData) {
                        vendorOrderData.total = +vendorOrderData.total - (+discountAmount);
                        yield this.vendorOrderService.create(vendorOrderData);
                    }
                    couponUsageProduct.orderProductId = orderProductData.orderProductId;
                    couponUsageProduct.quantity = product.quantity;
                    couponUsageProduct.amount = dynamicPrices.price;
                    couponUsageProduct.discountAmount = discountAmount;
                    yield this.couponUsageProductService.create(couponUsageProduct);
                }
                couponUsage.discountAmount = +grandDiscountAmount;
                yield this.couponUsageService.create(couponUsage);
            }
            newOrder.amount = totalAmount;
            if (checkoutParam.couponCode && checkoutParam.couponData) {
                newOrder.total = totalAmount - (+grandDiscountAmount);
                newOrder.couponCode = checkoutParam.couponCode;
                newOrder.discountAmount = +grandDiscountAmount;
                newOrder.amount = totalAmount;
            }
            else {
                newOrder.total = totalAmount;
            }
            newOrder.invoiceNo = 'INV00'.concat(orderData.orderId);
            const nowDate = new Date();
            const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
            newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
            yield this.orderService.update(orderData.orderId, newOrder);
            newOrderTotal.orderId = orderData.orderId;
            if (checkoutParam.couponCode && checkoutParam.couponData) {
                newOrderTotal.value = totalAmount - (+grandDiscountAmount);
            }
            else {
                newOrderTotal.value = totalAmount;
            }
            yield this.orderTotalService.createOrderTotalData(newOrderTotal);
            if (plugin.pluginName === 'CashOnDelivery') {
                const emailContent = yield this.emailTemplateService.findOne(5);
                const adminEmailContent = yield this.emailTemplateService.findOne(6);
                const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
                const customerFirstName = orderData.shippingFirstname;
                const customerLastName = orderData.shippingLastname;
                const customerName = customerFirstName + ' ' + customerLastName;
                const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                const customerMessage = emailContent.content.replace('{name}', customerName);
                const adminId = [];
                const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                for (const user of adminUser) {
                    const val = user.username;
                    adminId.push(val);
                }
                const vendorInvoice = yield this.vendorInvoiceService.findAll({ where: { orderId: orderData.orderId } });
                if (vendorInvoice.length > 0) {
                    for (const vendInvoice of vendorInvoice) {
                        const vendorProductDetailData = [];
                        const vendor = yield this.vendorService.findOne({ where: { vendorId: vendInvoice.vendorId } });
                        const customer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                        const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                        const vendorInvoiceItem = yield this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                        for (const vendInvoiceItem of vendorInvoiceItem) {
                            const vendorProductInformation = yield this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'varientName', 'skuName', 'taxValue', 'taxType', 'productVarientOptionId'] });
                            const vendorProductImageData = yield this.productService.findOne(vendorProductInformation.productId);
                            let vendorProductImageDetail;
                            if (vendorProductInformation.productVarientOptionId) {
                                const image = yield this.productVarientOptionImageService.findOne({ where: { productVarientOptionId: vendorProductInformation.productVarientOptionId } });
                                if (image) {
                                    vendorProductImageDetail = image;
                                }
                                else {
                                    vendorProductImageDetail = yield this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                                }
                            }
                            else {
                                vendorProductImageDetail = yield this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                            }
                            vendorProductImageData.productInformationData = vendorProductInformation;
                            vendorProductImageData.productImage = vendorProductImageDetail;
                            vendorProductDetailData.push(vendorProductImageData);
                        }
                        const vendorRedirectUrl = env_1.env.vendorRedirectUrl;
                        mail_services_1.MAILService.adminOrderMail(logo, vendorMessage, orderData, adminEmailContent.subject, vendorProductDetailData, today, customer.email, vendorRedirectUrl);
                    }
                }
                const adminRedirectUrl = env_1.env.adminRedirectUrl;
                mail_services_1.MAILService.adminOrderMail(logo, adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId, adminRedirectUrl);
                const storeRedirectUrl = env_1.env.storeRedirectUrl;
                mail_services_1.MAILService.customerOrderMail(logo, customerMessage, orderData, emailContent.subject, productDetailData, today, storeRedirectUrl);
                const order = yield this.orderService.findOrder(orderData.orderId);
                order.paymentType = plugin ? plugin.pluginName : '';
                order.productDetail = yield this.orderProductService.find({ where: { orderId: orderData.orderId } }).then((val) => {
                    const productImage = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        let image;
                        if (value.productVarientOptionId) {
                            const imageData = yield this.productVarientOptionImageService.findOne({ where: { productVarientOptionId: value.productVarientOptionId } });
                            if (imageData) {
                                image = imageData;
                            }
                            else {
                                image = yield this.productImageService.findOne({ where: { productId: value.productId, defaultImage: 1 } });
                            }
                        }
                        else {
                            image = yield this.productImageService.findOne({ where: { productId: value.productId } });
                        }
                        const temp = value;
                        temp.image = image;
                        return temp;
                    }));
                    const results = Promise.all(productImage);
                    return results;
                });
                const successResponse = {
                    status: 1,
                    message: 'You successfully checked out the product and order details send to your mail',
                    data: order,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                orderData.paymentProcess = 0;
                yield this.orderService.update(orderData.orderId, orderData);
                let route = env_1.env.baseUrl + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
                if (plugin.pluginName === 'razorpay' && checkoutParam.isMobile) {
                    route = env_1.env.baseUrl + pluginInfo.processAPIRoute + '/' + orderData.orderPrefixId;
                    return response.status(200).send({
                        status: 4,
                        message: 'Redirect to this url',
                        data: route,
                    });
                }
                const successResponse = {
                    status: 3,
                    message: 'Redirect to this url',
                    data: route,
                };
                return response.status(200).send(successResponse);
            }
        });
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
    backOrderCustomerCheckout(checkoutParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const logo = yield this.settingService.findOne();
            const error = [];
            const orderProducts = checkoutParam.productDetails;
            for (const val of orderProducts) {
                const productAvailability = yield this.productService.findOne({ where: { productId: val.productId } });
                if (productAvailability.pincodeBasedDelivery === 1) {
                    const value = yield this.vendorProductService.findOne({ where: { productId: val.productId } });
                    if (value) {
                        const deliveryLocation = yield this.deliveryLocationService.findOne({ where: { zipCode: checkoutParam.shippingPostCode, vendorId: value.vendorId } });
                        if (!deliveryLocation) {
                            error.push(1);
                        }
                    }
                    else {
                        const deliveryLocation = yield this.deliveryLocationService.findOne({ where: { zipCode: checkoutParam.shippingPostCode, vendorId: 0 } });
                        if (!deliveryLocation) {
                            error.push(1);
                        }
                    }
                }
            }
            if (error.length > 0) {
                const errResponse = {
                    status: 0,
                    message: 'Product not available for your pincode',
                    data: error,
                };
                return response.status(400).send(errResponse);
            }
            for (const val of orderProducts) {
                const product = yield this.productService.findOne(val.productId);
                const sku = yield this.skuService.findOne({ where: { skuName: val.skuName } });
                if (product.hasStock === 1) {
                    if (!(sku.minQuantityAllowedCart <= +val.quantity)) {
                        const minCart = {
                            status: 0,
                            message: 'Quantity should greater than min Quantity.',
                        };
                        return response.status(400).send(minCart);
                    }
                    else if (!(sku.maxQuantityAllowedCart >= +val.quantity)) {
                        const maxCart = {
                            status: 0,
                            message: 'Quantity should lesser than max Quantity.',
                        };
                        return response.status(400).send(maxCart);
                    }
                }
            }
            const plugin = yield this.pluginService.findOne({ where: { id: checkoutParam.paymentMethod } });
            if (plugin === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Payment method is invalid',
                };
                return response.status(400).send(errorResponse);
            }
            const newOrder = new Order_1.Order();
            const newOrderTotal = new OrderTotal_1.OrderTotal();
            let orderProduct = [];
            let i;
            let n;
            let totalProductAmount;
            let totalAmount = 0;
            const productDetailData = [];
            if (request.header('authorization')) {
                let customerId;
                jsonwebtoken_1.default.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                    if (err) {
                        throw err;
                    }
                    customerId = decoded.id;
                });
                newOrder.customerId = customerId;
            }
            else {
                const customerEmail = yield this.customerService.findOne({
                    where: {
                        email: checkoutParam.emailId,
                        deleteFlag: 0,
                    },
                });
                if (customerEmail === undefined) {
                    if (checkoutParam.password) {
                        const newUser = new Customer_1.Customer();
                        newUser.firstName = checkoutParam.shippingFirstName;
                        newUser.password = yield Customer_1.Customer.hashPassword(checkoutParam.password);
                        newUser.email = checkoutParam.emailId;
                        newUser.username = checkoutParam.emailId;
                        newUser.mobileNumber = checkoutParam.phoneNumber;
                        newUser.isActive = 1;
                        newUser.ip = (request.headers['x-forwarded-for'] ||
                            request.connection.remoteAddress ||
                            request.socket.remoteAddress ||
                            request.connection.socket.remoteAddress).split(',')[0];
                        const resultDatas = yield this.customerService.create(newUser);
                        const emailContents = yield this.emailTemplateService.findOne(1);
                        const message = emailContents.content.replace('{name}', resultDatas.firstName);
                        const redirectUrl = env_1.env.storeRedirectUrl;
                        mail_services_1.MAILService.registerMail(logo, message, resultDatas.email, emailContents.subject, redirectUrl);
                        newOrder.customerId = resultDatas.id;
                    }
                    else {
                        newOrder.customerId = 0;
                    }
                }
                else {
                    const errorResponse = {
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
            const country = yield this.countryService.findOne({
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
            const setting = yield this.settingService.findOne();
            newOrder.orderStatusId = setting.orderStatus;
            newOrder.invoicePrefix = setting.invoicePrefix;
            const currencyVal = yield this.currencyService.findOne(setting.storeCurrencyId);
            if (currencyVal) {
                newOrder.currencyCode = currencyVal.code;
                newOrder.currencyValue = currencyVal.value;
                newOrder.currencySymbolLeft = currencyVal.symbolLeft;
                newOrder.currencySymbolRight = currencyVal.symbolRight;
                newOrder.currencyValue = currencyVal.value;
            }
            newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
            const orderData = yield this.orderService.create(newOrder);
            yield this.orderLogService.create(orderData);
            const currencySymbol = yield this.currencyService.findOne(setting.storeCurrencyId);
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
                let price;
                let taxType;
                let taxValue;
                let tirePrice;
                let priceWithTax;
                const productTire = yield this.productService.findOne({ where: { productId: orderProduct[i].productId } });
                taxType = productTire.taxType;
                if (taxType === 2 && taxType) {
                    const tax = yield this.taxService.findOne({ where: { taxId: productTire.taxValue } });
                    taxValue = (tax !== undefined) ? tax.taxPercentage : 0;
                }
                else if (taxType === 1 && taxType) {
                    taxValue = productTire.taxValue;
                }
                const sku = yield this.skuService.findOne({ where: { skuName: orderProduct[i].skuName } });
                if (sku) {
                    if (productTire.hasTirePrice === 1) {
                        const findWithQty = yield this.productTirePriceService.findTirePrice(orderProduct[i].productId, sku.id, orderProduct[i].quantity);
                        if (findWithQty) {
                            tirePrice = findWithQty.price;
                        }
                        else {
                            const dateNow = new Date();
                            const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                            const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(orderProduct[i].productId, sku.id, todaydate);
                            const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(orderProduct[i].productId, sku.id, todaydate);
                            if (productSpecial !== undefined) {
                                tirePrice = productSpecial.price;
                            }
                            else if (productDiscount !== undefined) {
                                tirePrice = productDiscount.price;
                            }
                            else {
                                tirePrice = sku.price;
                            }
                        }
                        if (taxType && taxType === 2) {
                            const percentVal = +tirePrice * (+taxValue / 100);
                            priceWithTax = +tirePrice + +percentVal;
                        }
                        else if (taxType && taxType === 1) {
                            priceWithTax = +tirePrice + +orderProduct[i].taxValue;
                        }
                        else {
                            priceWithTax = +tirePrice;
                        }
                        price = priceWithTax;
                    }
                    else {
                        const dateNow = new Date();
                        const todaydate = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
                        const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(orderProduct[i].productId, sku.id, todaydate);
                        const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(orderProduct[i].productId, sku.id, todaydate);
                        if (productSpecial !== undefined) {
                            tirePrice = productSpecial.price;
                        }
                        else if (productDiscount !== undefined) {
                            tirePrice = productDiscount.price;
                        }
                        else {
                            tirePrice = sku.price;
                        }
                        if (taxType && taxType === 2) {
                            const perVal = +tirePrice * (+taxValue / 100);
                            priceWithTax = +tirePrice + +perVal;
                        }
                        else if (taxType && taxType === 1) {
                            priceWithTax = +tirePrice + +taxValue;
                        }
                        else {
                            priceWithTax = +tirePrice;
                        }
                        price = priceWithTax;
                    }
                }
                else {
                    tirePrice = productTire.price;
                    if (taxType && taxType === 2) {
                        const percentAmt = +tirePrice * (+taxValue / 100);
                        priceWithTax = +tirePrice + +percentAmt;
                    }
                    else if (taxType && taxType === 1) {
                        priceWithTax = +tirePrice + +taxValue;
                    }
                    else {
                        priceWithTax = +tirePrice;
                    }
                    price = priceWithTax;
                }
                ///// finding price from backend ends /////
                const productDetails = new OrderProduct_1.OrderProduct();
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
                const productInformation = yield this.orderProductService.createData(productDetails);
                yield this.orderProductLogService.create(productInformation);
                const cart = yield this.customerCartService.findOne({ where: { productId: orderProduct[i].productId, customerId: orderData.customerId } });
                if (cart !== undefined) {
                    yield this.customerCartService.delete(cart.id);
                }
                ///// for saving vendor orders starts///////
                const val = yield this.vendorProductService.findOne({ where: { productId: orderProduct[i].productId } });
                if (val !== undefined) {
                    const vendor = yield this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                    const vendororders = new VendorOrders_1.VendorOrders();
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
                    }
                    else if (vendor.commission > 0) {
                        vendororders.commission = vendor.commission;
                    }
                    else {
                        const defaultCommission = yield this.vendorSettingService.findOne();
                        const defCommission = defaultCommission.defaultCommission;
                        vendororders.commission = defCommission;
                    }
                    const value = yield this.vendorOrderService.create(vendororders);
                    const vendorOrderLog = new VendorOrderLog_1.VendorOrderLog();
                    vendorOrderLog.vendorOrderId = value.vendorOrderId;
                    vendorOrderLog.subOrderId = orderData.invoicePrefix.concat('-' + orderDate + orderData.orderId) + val.vendorId + j;
                    vendorOrderLog.vendorId = val.vendorId;
                    vendorOrderLog.orderId = orderData.orderId;
                    vendorOrderLog.subOrderStatusId = 1;
                    yield this.vendorOrderLogService.create(vendorOrderLog);
                    const vendorInvoice = yield this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                    if (!vendorInvoice) {
                        const newVendorInvoice = new VendorInvoice_1.VendorInvoice();
                        newVendorInvoice.vendorId = val.vendorId;
                        newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
                        newVendorInvoice.orderId = orderData.orderId;
                        newVendorInvoice.email = checkoutParam.emailId;
                        newVendorInvoice.total = 0;
                        newVendorInvoice.shippingFirstname = checkoutParam.shippingFirstName;
                        newVendorInvoice.shippingLastname = checkoutParam.shippingLastName;
                        yield this.vendorInvoiceService.create(newVendorInvoice);
                    }
                    const vendorInvoiceData = yield this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                    vendorInvoiceData.total = vendorInvoiceData.total + +productDetails.total;
                    const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                    vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                    yield this.vendorInvoiceService.create(vendorInvoiceData);
                    const newVendorInvoiceItem = new VendorInvoiceItem_1.VendorInvoiceItem();
                    newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                    newVendorInvoiceItem.orderProductId = productInformation.orderProductId;
                    yield this.vendorInvoiceItemService.create(newVendorInvoiceItem);
                }
                ///// for saving vendor orders ends //////
                let productImageDetail;
                if (productDetails.productVarientOptionId) {
                    const image = yield this.productVarientOptionImageService.findOne({ where: { productVarientOptionId: productDetails.productVarientOptionId } });
                    if (image) {
                        productImageDetail = image;
                    }
                    else {
                        productImageDetail = yield this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                    }
                }
                else {
                    productImageDetail = yield this.productImageService.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                }
                const productImageData = yield this.productService.findOne(productInformation.productId);
                productImageData.productInformationData = productInformation;
                productImageData.productImage = productImageDetail;
                totalProductAmount = yield this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
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
            yield this.orderService.update(orderData.orderId, newOrder);
            newOrderTotal.orderId = orderData.orderId;
            newOrderTotal.value = totalAmount;
            yield this.orderTotalService.createOrderTotalData(newOrderTotal);
            if (plugin.pluginName === 'CashOnDelivery') {
                const emailContent = yield this.emailTemplateService.findOne(5);
                const adminEmailContent = yield this.emailTemplateService.findOne(6);
                const today = ('0' + nwDate.getDate()).slice(-2) + '.' + ('0' + (nwDate.getMonth() + 1)).slice(-2) + '.' + nwDate.getFullYear();
                const customerFirstName = orderData.shippingFirstname;
                const customerLastName = orderData.shippingLastname;
                const customerName = customerFirstName + ' ' + customerLastName;
                const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                const customerMessage = emailContent.content.replace('{name}', customerName);
                const adminId = [];
                const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                for (const user of adminUser) {
                    const val = user.username;
                    adminId.push(val);
                }
                const vendorInvoice = yield this.vendorInvoiceService.findAll({ where: { orderId: orderData.orderId } });
                if (vendorInvoice.length > 0) {
                    for (const vendInvoice of vendorInvoice) {
                        const vendorProductDetailData = [];
                        const vendor = yield this.vendorService.findOne({ where: { vendorId: vendInvoice.vendorId } });
                        const customer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                        const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                        const vendorInvoiceItem = yield this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                        for (const vendInvoiceItem of vendorInvoiceItem) {
                            const vendorProductInformation = yield this.orderProductService.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'varientName', 'skuName', 'taxValue', 'taxType', 'productVarientOptionId', 'orderProductPrefixId'] });
                            const vendorProductImageData = yield this.productService.findOne(vendorProductInformation.productId);
                            let vendorProductImageDetail;
                            if (vendorProductInformation.productVarientOptionId) {
                                const image = yield this.productVarientOptionImageService.findOne({ where: { productVarientOptionId: vendorProductInformation.productVarientOptionId } });
                                if (image) {
                                    vendorProductImageDetail = image;
                                }
                                else {
                                    vendorProductImageDetail = yield this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                                }
                            }
                            else {
                                vendorProductImageDetail = yield this.productImageService.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                            }
                            vendorProductImageData.productInformationData = vendorProductInformation;
                            vendorProductImageData.productImage = vendorProductImageDetail;
                            vendorProductDetailData.push(vendorProductImageData);
                        }
                        const vendorRedirectUrl = env_1.env.vendorRedirectUrl;
                        mail_services_1.MAILService.adminOrderMail(logo, vendorMessage, orderData, adminEmailContent.subject, vendorProductDetailData, today, customer.email, vendorRedirectUrl);
                    }
                }
                const adminRedirectUrl = env_1.env.adminRedirectUrl;
                mail_services_1.MAILService.adminOrderMail(logo, adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId, adminRedirectUrl);
                const storeRedirectUrl = env_1.env.storeRedirectUrl;
                mail_services_1.MAILService.customerOrderMail(logo, customerMessage, orderData, emailContent.subject, productDetailData, today, storeRedirectUrl);
                const order = yield this.orderService.findOrder(orderData.orderId);
                order.paymentType = plugin ? plugin.pluginName : '';
                order.productDetail = yield this.orderProductService.find({ where: { orderId: orderData.orderId } }).then((val) => {
                    const productImage = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        let image;
                        if (value.productVarientOptionId) {
                            const imageData = yield this.productVarientOptionImageService.findOne({ where: { productVarientOptionId: value.productVarientOptionId } });
                            if (imageData) {
                                image = imageData;
                            }
                            else {
                                image = yield this.productImageService.findOne({ where: { productId: value.productId, defaultImage: 1 } });
                            }
                        }
                        else {
                            image = yield this.productImageService.findOne({ where: { productId: value.productId } });
                        }
                        const temp = value;
                        temp.image = image;
                        return temp;
                    }));
                    const results = Promise.all(productImage);
                    return results;
                });
                const successResponse = {
                    status: 1,
                    message: 'You successfully checked out the product and order details send to your mail',
                    data: order,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                orderData.paymentProcess = 0;
                yield this.orderService.update(orderData.orderId, orderData);
                const route = env_1.env.baseUrl + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
                const successResponse = {
                    status: 3,
                    message: 'Redirect to this url',
                    data: route,
                };
                return response.status(200).send(successResponse);
            }
        });
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
    orderList(limit, offset, keyword, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                const orderCount = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const Response = {
                    status: 1,
                    message: 'Successfully get Count. ',
                    data: orderCount,
                };
                return response.status(200).send(Response);
            }
            const orderList = yield this.orderProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const promises = orderList.map((results) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = results;
                const productImage = yield this.productImageService.findOne({
                    where: { productId: results.productId, defaultImage: 1 },
                    select: ['image', 'containerName'],
                });
                if (productImage !== undefined) {
                    temp.image = productImage.image;
                    temp.containerName = productImage.containerName;
                }
                else {
                    temp.image = '';
                    temp.containerName = '';
                }
                const passingOrderStatus = yield this.orderStatusService.findOne({
                    where: {
                        orderStatusId: results.orderProductStatusId,
                    },
                });
                if (passingOrderStatus) {
                    temp.orderStatusName = passingOrderStatus.name;
                    temp.orderStatusColorCode = passingOrderStatus.colorCode;
                }
                const products = yield this.productService.findOne({
                    where: { productId: results.productId },
                    select: ['productSlug'],
                });
                if (products) {
                    temp.productSlug = products.productSlug;
                }
                return results;
            }));
            const result = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order list. ',
                data: class_transformer_1.classToPlain(result),
            };
            return response.status(200).send(successResponse);
        });
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
    orderDetail(orderProductId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = {};
            const orderProduct = yield this.orderProductService.findOne({
                select: ['basePrice', 'taxValue', 'taxType', 'orderProductId', 'orderId', 'productId', 'createdDate', 'modifiedDate', 'total', 'name', 'productPrice', 'orderProductPrefixId', 'quantity', 'orderStatusId', 'discountAmount', 'discountedAmount', 'varientName', 'skuName', 'productVarientOptionId'],
                where: {
                    orderProductId,
                },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            const order = yield this.orderService.findOrder({
                select: ['paymentType', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone', 'shippingCountry', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'paymentPostcode', 'paymentZone', 'paymentCountry', 'currencySymbolLeft', 'currencySymbolRight', 'customerGstNo'],
                where: {
                    orderId: orderProduct.orderId, customerId: request.user.id,
                },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid order for this customer',
                };
                return response.status(400).send(errResponse);
            }
            const product = yield this.productImageService.findOne({
                select: ['productId', 'image', 'containerName'],
                where: {
                    productId: orderProduct.productId,
                    defaultImage: 1,
                },
            });
            const products = yield this.productService.findOne({
                select: ['productSlug'],
                where: {
                    productId: orderProduct.productId,
                },
            });
            const passingOrderStatus = yield this.orderStatusService.findOne({
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
            }
            else {
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
            const orderStatus = yield this.orderStatusService.findAll({
                select: ['orderStatusId', 'name'],
                where: {
                    isActive: 1,
                },
            });
            const orderProductLog = yield this.orderProductLogService.find({
                select: ['orderProductLogId', 'createdDate', 'orderStatusId'],
                where: {
                    orderProductId: orderProduct.orderProductId,
                },
            });
            const orderStatusDate = orderStatus.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const date = orderProductLog.find(item => item.orderStatusId === value.orderStatusId);
                const temp = value;
                if (date === undefined) {
                    temp.createdDate = '';
                }
                else {
                    temp.createdDate = date.createdDate;
                }
                return temp;
            }));
            const result = yield Promise.all(orderStatusDate);
            obj.deliveryStatus = result;
            const rating = yield this.productRatingService.findOne({
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
            }
            else {
                obj.rating = 0;
                obj.review = '';
            }
            const successResponse = {
                status: 1,
                message: 'Successfully show the order details',
                data: obj,
            };
            return response.status(200).send(successResponse);
        });
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
    Rating(ratingValue, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.productService.findOne({
                where: { productId: request.body.productId },
            });
            if (!resultData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProduct = yield this.orderProductService.findOne({
                where: {
                    orderProductId: request.body.orderProductId,
                },
            });
            const order = yield this.orderService.findOrder({
                where: {
                    orderId: orderProduct.orderId, customerId: request.user.id,
                },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid rating for this user',
                };
                return response.status(400).send(errResponse);
            }
            const rating = yield this.productRatingService.findOne({
                where: {
                    orderProductId: request.body.orderProductId,
                },
            });
            if (rating) {
                rating.review = request.body.reviews;
                rating.rating = request.body.rating;
                const updateRatings = yield this.productRatingService.create(rating);
                if (updateRatings) {
                    const updateRating = yield this.productRatingService.consolidateRating(request.body.productId);
                    resultData.rating = updateRating.RatingSum / updateRating.RatingCount;
                    yield this.productService.create(resultData);
                    const successResponse = {
                        status: 1,
                        message: 'Successfully updated your reviews and ratings',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
                const newRating = new ProductRating_1.ProductRating();
                newRating.review = request.body.reviews;
                newRating.rating = request.body.rating;
                newRating.orderProductId = request.body.orderProductId;
                newRating.productId = request.body.productId;
                newRating.customerId = request.user.id;
                newRating.firstName = customer.firstName;
                newRating.lastName = customer.lastName;
                newRating.email = customer.email;
                newRating.isActive = 1;
                const AddRating = yield this.productRatingService.create(newRating);
                if (AddRating) {
                    const updateRating = yield this.productRatingService.consolidateRating(request.body.productId);
                    resultData.rating = updateRating.RatingSum / updateRating.RatingCount;
                    yield this.productService.create(resultData);
                    const successResponse = {
                        status: 1,
                        message: 'Successfully created your ratings and reviews',
                    };
                    return response.status(200).send(successResponse);
                }
            }
        });
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
    Reviews(Value, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.productService.findOne({
                where: { productId: request.body.productId },
            });
            if (!resultData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const rating = yield this.productRatingService.findOne({
                where: {
                    orderProductId: request.body.orderProductId,
                },
            });
            if (rating) {
                rating.review = request.body.reviews;
                const updateRating = yield this.productRatingService.create(rating);
                if (updateRating) {
                    const successResponse = {
                        status: 1,
                        message: 'Successfully updated your reviews',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
                const newRating = new ProductRating_1.ProductRating();
                newRating.review = request.body.reviews;
                newRating.productId = request.body.productId;
                newRating.orderProductId = request.body.orderProductId;
                newRating.customerId = request.user.id;
                newRating.firstName = customer.firstName;
                newRating.lastName = customer.lastName;
                newRating.email = customer.email;
                newRating.isActive = 1;
                yield this.productRatingService.create(newRating);
                const successResponse = {
                    status: 1,
                    message: 'Successfully created your reviews',
                };
                return response.status(200).send(successResponse);
            }
        });
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
    trackOrder(orderProductId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const obj = {};
            const orderProduct = yield this.orderProductService.findOne({
                select: ['basePrice', 'taxValue', 'taxType', 'orderProductId', 'trackingNo', 'trackingUrl', 'name', 'productPrice', 'orderId', 'productId', 'orderProductPrefixId', 'total', 'quantity', 'discountAmount', 'discountedAmount', 'modifiedDate', 'orderStatusId', 'createdDate', 'varientName', 'skuName', 'productVarientOptionId'],
                where: { orderProductId },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            const product = yield this.productImageService.findOne({
                select: ['image', 'containerName', 'productId'],
                where: { productId: orderProduct.productId, defaultImage: 1 },
            });
            const order = yield this.orderService.findOrder({
                select: ['shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingZone', 'currencySymbolLeft', 'currencySymbolRight', 'orderPrefixId'],
                where: { orderId: orderProduct.orderId, customerId: request.user.id },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid order for this customer',
                };
                return response.status(400).send(errResponse);
            }
            const passingOrderStatus = yield this.orderStatusService.findOne({
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
            }
            else {
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
            const orderStatus = yield this.orderStatusService.findAll({
                select: ['orderStatusId', 'name'],
                where: {
                    isActive: 1,
                },
            });
            const orderProductLog = yield this.orderProductLogService.find({
                select: ['orderProductLogId', 'createdDate', 'orderStatusId'],
                where: {
                    orderProductId: orderProduct.orderProductId,
                },
            });
            const orderStatusDate = orderStatus.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const date = orderProductLog.find(item => item.orderStatusId === value.orderStatusId);
                const temp = value;
                if (date === undefined) {
                    temp.createdDate = '';
                }
                else {
                    temp.createdDate = date.createdDate;
                }
                return temp;
            }));
            const result = yield Promise.all(orderStatusDate);
            obj.deliveryStatus = result;
            const successResponse = {
                status: 1,
                message: 'Successfully shown the Track Order.',
                data: obj,
            };
            return response.status(200).send(successResponse);
        });
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
    orderExportPdf(orderProductId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield this.orderProductService.findOne({
                where: {
                    orderProductId,
                },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Product Id',
                };
                return response.status(400).send(errorResponse);
            }
            const orderData = yield this.orderService.findOrder({
                where: { orderId: orderProduct.orderId, customerId: request.user.id }, select: ['orderId', 'orderStatusId', 'customerId', 'telephone', 'invoiceNo', 'paymentStatus', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                    'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                    'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'couponCode', 'discountAmount', 'amount',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
            });
            if (!orderData) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid Order for this customer',
                };
                return response.status(400).send(errResponse);
            }
            orderData.productList = yield this.orderProductService.find({ where: { orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount'] }).then((val) => {
                const productVal = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const rating = yield this.productRatingService.findOne({ select: ['rating', 'review'], where: { customerId: orderData.customerId, orderProductId: value.orderProductId, productId: value.productId } });
                    const tempVal = value;
                    tempVal.taxType = value.taxType;
                    tempVal.taxValue = value.taxValue;
                    if (value.taxType === 2) {
                        tempVal.taxValueInAmount = value.basePrice * (value.taxValue / 100);
                    }
                    else {
                        tempVal.taxValueInAmount = value.taxValue;
                    }
                    if (rating !== undefined) {
                        tempVal.rating = rating.rating;
                        tempVal.review = rating.review;
                    }
                    else {
                        tempVal.rating = 0;
                        tempVal.review = '';
                    }
                    return tempVal;
                }));
                const results = Promise.all(productVal);
                return results;
            });
            const select = '';
            const relation = [];
            const WhereConditions = [];
            const limit = 1;
            const settings = yield this.settingService.list(limit, select, relation, WhereConditions);
            const settingDetails = settings[0];
            const countryData = yield this.countryService.findOne({ where: { countryId: settingDetails.countryId } });
            const zoneData = yield this.zoneService.findOne({ where: { zoneId: settingDetails.zoneId } });
            orderData.settingDetails = settingDetails;
            orderData.zoneData = (zoneData !== undefined) ? zoneData : ' ';
            orderData.countryData = (countryData !== undefined) ? countryData : ' ';
            orderData.currencyCode = orderData.currencyCode;
            orderData.symbolLeft = orderData.currencySymbolLeft;
            orderData.symbolRight = orderData.currencySymbolRight;
            const orderStatusData = yield this.orderStatusService.findOne({
                where: { orderStatusId: orderProduct.orderStatusId },
                select: ['name', 'colorCode'],
            });
            if (orderStatusData) {
                orderData.orderStatusName = orderStatusData.name;
                orderData.statusColorCode = orderStatusData.colorCode;
            }
            let image;
            if (env_1.env.imageserver === 's3') {
                image = yield this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '50', '50');
            }
            else {
                image = yield this.imageService.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '50', '50');
            }
            orderData.logo = image;
            const htmlData = yield this.pdfService.readHtmlToString('invoice', orderData);
            const pdfBinary = yield this.pdfService.createPDFFile(htmlData, true, '');
            return response.status(200).send({
                data: pdfBinary,
                status: 1,
                message: 'pdf exported',
            });
        });
    }
    decrypt(text) {
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
    reasonList(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'reason'];
            const ReasonList = yield this.orderCancelReasonService.list(limit, offset, select, 0, 0, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got Order Cancel Reason list',
                data: ReasonList,
            };
            return response.status(200).send(successResponse);
        });
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
    createOrderCancel(orderCancelParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield this.orderProductService.findOne({
                where: { orderProductId: orderCancelParam.orderProductId },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order ProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const reason = yield this.orderCancelReasonService.findOne({
                where: { id: orderCancelParam.reasonId },
            });
            if (!reason) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid reasonId',
                };
                return response.status(400).send(errorResponse);
            }
            const order = yield this.orderService.findOrder({
                where: { orderId: orderProduct.orderId, customerId: request.user.id },
            });
            if (!order) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid request for this user',
                };
                return response.status(400).send(errResponse);
            }
            orderProduct.cancelReason = reason.reason;
            orderProduct.cancelReasonDescription = orderCancelParam.description;
            orderProduct.cancelRequest = 1;
            orderProduct.cancelRequestStatus = 0;
            const orderProductUpdated = yield this.orderProductService.createData(orderProduct);
            if (orderProductUpdated !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Your order cancel request posted successfully',
                    data: orderProductUpdated,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to post',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/customer-checkout'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerCheckoutRequest_1.CustomerCheckoutRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "customerCheckout", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/back-order-checkout'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerBackorderRequest_1.CustomerBackorderRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "backOrderCustomerCheckout", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-list'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "orderList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-detail'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('orderProductId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "orderDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/add-rating'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "Rating", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/add-reviews'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "Reviews", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/track-order-product'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('orderProductId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "trackOrder", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-export-pdf'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('orderProductId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "orderExportPdf", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-cancel-reason-list'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "reasonList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/order-cancel-request'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [OrderCancelRequest_1.OrderCancelRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerOrderController.prototype, "createOrderCancel", null);
CustomerOrderController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/orders'),
    tslib_1.__metadata("design:paramtypes", [OrderService_1.OrderService, OrderProductService_1.OrderProductService, OrderTotalService_1.OrderTotalService, VendorService_1.VendorService, VendorSettingService_1.VendorGlobalSettingService,
        CustomerService_1.CustomerService, ProductService_1.ProductService, ProductImageService_1.ProductImageService, SettingService_1.SettingService,
        EmailTemplateService_1.EmailTemplateService, RatingService_1.ProductRatingService, VendorProductService_1.VendorProductService, OrderLogService_1.OrderLogService,
        CountryService_1.CountryService, PluginService_1.PluginService, CurrencyService_1.CurrencyService, VendorOrderService_1.VendorOrdersService, UserService_1.UserService, VendorOrderLogService_1.VendorOrderLogService,
        PdfService_1.PdfService,
        zoneService_1.ZoneService,
        S3Service_1.S3Service,
        OrderStatusService_1.OrderStatusService,
        DeliveryLocationService_1.DeliveryLocationService,
        OrderProductLogService_1.OrderProductLogService,
        CustomerCartService_1.CustomerCartService,
        CouponUsageService_1.CouponUsageService,
        CouponUsageProductService_1.CouponUsageProductService,
        VendorCouponService_1.VendorCouponService,
        OrderCancelReasonService_1.OrderCancelReasonService,
        StockLogService_1.StockLogService,
        ProductStockAlertService_1.ProductStockAlertService,
        ProductTirePriceService_1.ProductTirePriceService,
        ProductSpecialService_1.ProductSpecialService,
        ProductDiscountService_1.ProductDiscountService,
        VendorInvoiceService_1.VendorInvoiceService,
        VendorInvoiceItemService_1.VendorInvoiceItemService,
        ProductVarientOptionImageService_1.ProductVarientOptionImageService,
        TaxService_1.TaxService,
        ImageService_1.ImageService, SkuService_1.SkuService])
], CustomerOrderController);
exports.CustomerOrderController = CustomerOrderController;
//# sourceMappingURL=CustomerOrderController.js.map