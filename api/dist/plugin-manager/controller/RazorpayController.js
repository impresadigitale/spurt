"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorPayController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Order_1 = require("../../api/models/Order");
const Plugin_1 = require("../models/Plugin");
const RazorpayOrder_1 = require("../models/RazorpayOrder");
const RazorpayOrderTransaction_1 = require("../models/RazorpayOrderTransaction");
const OrderProduct_1 = require("../../api/models/OrderProduct");
const EmailTemplate_1 = require("../../api/models/EmailTemplate");
const ProductModel_1 = require("../../api/models/ProductModel");
const ProductImage_1 = require("../../api/models/ProductImage");
const Setting_1 = require("../../api/models/Setting");
const Currency_1 = require("../../api/models/Currency");
const User_1 = require("../../api/models/User");
const mail_services_1 = require("../../auth/mail.services");
const env_1 = require("../../env");
const Payment_1 = require("../../api/models/Payment");
const PaymentItems_1 = require("../../api/models/PaymentItems");
const VendorPayment_1 = require("../../api/models/VendorPayment");
const VendorProducts_1 = require("../../api/models/VendorProducts");
const Vendor_1 = require("../../api/models/Vendor");
const VendorGlobalSettings_1 = require("../../api/models/VendorGlobalSettings");
const VendorOrders_1 = require("../../api/models/VendorOrders");
const moment = require("moment");
const VendorInvoice_1 = require("../../api/models/VendorInvoice");
const VendorInvoiceItem_1 = require("../../api/models/VendorInvoiceItem");
const Customer_1 = require("../../api/models/Customer");
const ProductVarientOptionImage_1 = require("../../api/models/ProductVarientOptionImage");
class RazorPayController {
    static razorPaySuccess(instance, paymentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                instance.payments.fetch(paymentId).then((response) => {
                    return resolve(response);
                }).catch((error) => {
                    return reject(error);
                });
            });
        });
    }
    constructor() {
        // ---
    }
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            res.render('pages/razorpay/form', {
                title: 'Razorpay',
                path: '../razorpay/form',
                clientId: paypalAdditionalInfo.clientId ? paypalAdditionalInfo.clientId : '',
                clientSecret: paypalAdditionalInfo.clientSecret ? paypalAdditionalInfo.clientSecret : '',
                isTest: paypalAdditionalInfo.isTest,
            });
        });
    }
    updateSettings(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            req.assert('clientId', 'Client Id cannot be blank').notEmpty();
            req.assert('clientSecret', 'Client Secret cannot be blank').notEmpty();
            const errors = req.validationErrors();
            if (errors) {
                req.flash('errors', errors);
                return res.redirect('paypal');
            }
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            paypalAdditionalInfo.clientId = req.body.clientId;
            paypalAdditionalInfo.clientSecret = req.body.clientSecret;
            paypalAdditionalInfo.isTest = req.body.isTest;
            pluginDetail.pluginAdditionalInfo = JSON.stringify(paypalAdditionalInfo);
            const saveResponse = yield pluginRepository.save(pluginDetail);
            if (saveResponse) {
                req.flash('success', ['Razorpay settings updated successfully']);
                return res.redirect('home');
            }
            req.flash('errors', ['Unable to update the razorpay settings']);
            return res.redirect('home');
        });
    }
    process(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderPrefixId = req.params.orderPrefixId;
            const orderRepository = typeorm_1.getManager().getRepository(Order_1.Order);
            const razorpayOrderRepository = typeorm_1.getManager().getRepository(RazorpayOrder_1.RazorpayOrder);
            const order = yield orderRepository.findOne({ where: { orderPrefixId }, select: ['orderId'] });
            const orderId = order.orderId;
            const orderDetail = yield orderRepository.findOne(orderId);
            if (!orderDetail) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('error');
            }
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const total = orderDetail.total;
            const params = {
                amount: +total * 100,
                receipt: orderDetail.orderPrefixId,
                currency: 'INR',
                payment_capture: true,
            };
            instance.orders.create(params).then((response) => {
                // ---
                const paypalParams = new RazorpayOrder_1.RazorpayOrder();
                paypalParams.orderId = orderDetail.orderId;
                paypalParams.razorpayRefId = response.id;
                paypalParams.total = total.toString();
                paypalParams.status = 0;
                razorpayOrderRepository.save(paypalParams).then((val) => {
                    // ---
                    res.render('pages/razorpay/process', {
                        title: 'Razorpay',
                        orderRefId: response.id,
                        key: paypalAdditionalInfo.clientId,
                        amount: total,
                        orderId: orderDetail.orderPrefixId,
                        orderIncrementId: orderDetail.orderId,
                        description: val.id,
                        username: orderDetail.paymentFirstname + ' ' + orderDetail.paymentLastname,
                        email: orderDetail.email,
                        contact: orderDetail.telephone,
                        layout: 'pages/layouts/auth',
                    });
                }).catch((err) => {
                    throw err;
                });
            }).catch((error) => {
                // ---
                throw error;
            });
        });
    }
    success(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const EmailTemplateRepository = typeorm_1.getManager().getRepository(EmailTemplate_1.EmailTemplate);
            const orderProductRepository = typeorm_1.getManager().getRepository(OrderProduct_1.OrderProduct);
            const productImageRepository = typeorm_1.getManager().getRepository(ProductImage_1.ProductImage);
            const productRepository = typeorm_1.getManager().getRepository(ProductModel_1.Product);
            const settingRepository = typeorm_1.getManager().getRepository(Setting_1.Settings);
            const currencyRepository = typeorm_1.getManager().getRepository(Currency_1.Currency);
            const userRepository = typeorm_1.getManager().getRepository(User_1.User);
            const razorpayOrderRepository = typeorm_1.getManager().getRepository(RazorpayOrder_1.RazorpayOrder);
            const razorpayOrderTransactionRepository = typeorm_1.getManager().getRepository(RazorpayOrderTransaction_1.RazorpayOrderTransaction);
            const paymentRepository = typeorm_1.getManager().getRepository(Payment_1.Payment);
            const paymentItemsRepository = typeorm_1.getManager().getRepository(PaymentItems_1.PaymentItems);
            const vendorPaymentRepository = typeorm_1.getManager().getRepository(VendorPayment_1.VendorPayment);
            const VendorProductsRepository = typeorm_1.getManager().getRepository(VendorProducts_1.VendorProducts);
            const VendorRepository = typeorm_1.getManager().getRepository(Vendor_1.Vendor);
            const VendorGlobalSettingRepository = typeorm_1.getManager().getRepository(VendorGlobalSettings_1.VendorGlobalSetting);
            const VendorOrdersRepository = typeorm_1.getManager().getRepository(VendorOrders_1.VendorOrders);
            const productVarientOptionImageRepository = typeorm_1.getManager().getRepository(ProductVarientOptionImage_1.ProductVarientOptionImage);
            const VendorInvoiceRepository = typeorm_1.getManager().getRepository(VendorInvoice_1.VendorInvoice);
            const VendorInvoiceItemRepository = typeorm_1.getManager().getRepository(VendorInvoiceItem_1.VendorInvoiceItem);
            const CustomerRepository = typeorm_1.getManager().getRepository(Customer_1.Customer);
            const queryParams = req.query;
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const paymentDetails = yield RazorPayController.razorPaySuccess(instance, queryParams.razorpay_payment_id);
            const razorpayDetail = yield razorpayOrderRepository.findOne({
                where: {
                    razorpayRefId: paymentDetails.order_id,
                },
            });
            if (!razorpayDetail) {
                req.flash('errors', ['Invalid Payment Details']);
                return res.redirect('error');
            }
            const orderRepository = typeorm_1.getManager().getRepository(Order_1.Order);
            const orderData = yield orderRepository.findOne(razorpayDetail.orderId);
            if (!orderData) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('error');
            }
            const setting = yield settingRepository.findOne();
            const currencySymbol = yield currencyRepository.findOne(setting.storeCurrencyId);
            orderData.currencyRight = currencySymbol.symbolRight;
            orderData.currencyLeft = currencySymbol.symbolLeft;
            const orderStatus = yield orderRepository.findOne({ where: { orderId: razorpayDetail.orderId, paymentFlag: 1 } });
            if (orderStatus) {
                req.flash('errors', ['Already Paid for this Order']);
                return res.redirect('error');
            }
            const intvalue = Math.round(paymentDetails.amount);
            const intVal = intvalue / 100;
            if (paymentDetails.status === 'captured' && intVal === +razorpayDetail.total) {
                const transactionsParams = new RazorpayOrderTransaction_1.RazorpayOrderTransaction();
                transactionsParams.paymentType = paymentDetails.method;
                transactionsParams.razorpayOrderId = razorpayDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 1;
                yield razorpayOrderTransactionRepository.save(transactionsParams);
                razorpayDetail.status = 1;
                yield razorpayOrderRepository.save(razorpayDetail);
                orderData.paymentFlag = 1;
                orderData.paymentStatus = 1;
                orderData.paymentProcess = 1;
                orderData.paymentType = 'razorpay';
                orderData.paymentDetails = paymentDetails.id;
                yield orderRepository.save(orderData);
                const paymentParams = new Payment_1.Payment();
                paymentParams.orderId = razorpayDetail.orderId;
                const date = new Date();
                paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                paymentParams.paymentNumber = paymentDetails.id;
                paymentParams.paymentAmount = orderData.total;
                paymentParams.paymentInformation = JSON.stringify(paymentDetails);
                const payments = yield paymentRepository.save(paymentParams);
                const productDetailData = [];
                let i;
                const orderProduct = yield orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount'] });
                for (i = 0; i < orderProduct.length; i++) {
                    const paymentItems = new PaymentItems_1.PaymentItems();
                    paymentItems.paymentId = payments.paymentId;
                    paymentItems.orderProductId = orderProduct[i].orderProductId;
                    paymentItems.totalAmount = orderProduct[i].discountedAmount ? orderProduct[i].discountedAmount : orderProduct[i].total;
                    paymentItems.productName = orderProduct[i].name;
                    paymentItems.productQuantity = orderProduct[i].quantity;
                    paymentItems.productPrice = orderProduct[i].productPrice;
                    const payItem = yield paymentItemsRepository.save(paymentItems);
                    const vendorProduct = yield VendorProductsRepository.findOne({ where: { productId: orderProduct[i].productId } });
                    if (vendorProduct) {
                        const vendor = yield VendorRepository.findOne({ where: { vendorId: vendorProduct.vendorId } });
                        const vendorOrders = yield VendorOrdersRepository.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                        const vendorPayments = new VendorPayment_1.VendorPayment();
                        vendorPayments.vendorId = vendorProduct.vendorId;
                        vendorPayments.paymentItemId = payItem.paymentItemId;
                        vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                        vendorPayments.amount = orderProduct[i].discountedAmount ? orderProduct[i].discountedAmount : orderProduct[i].total;
                        if (vendorProduct.vendorProductCommission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (vendorProduct.vendorProductCommission / 100);
                        }
                        else if (vendor.commission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (vendor.commission / 100);
                        }
                        else {
                            const defaultCommission = yield VendorGlobalSettingRepository.findOne();
                            const defCommission = defaultCommission.defaultCommission;
                            vendorPayments.commissionAmount = vendorPayments.amount * (defCommission / 100);
                        }
                        yield vendorPaymentRepository.save(vendorPayments);
                    }
                    const productInformation = yield orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountedAmount', 'discountAmount', 'basePrice', 'varientName', 'skuName', 'taxValue', 'taxType', 'productVarientOptionId', 'orderProductPrefixId'] });
                    const productImageData = yield productRepository.findOne(productInformation.productId);
                    let productImageDetail;
                    if (productInformation.productVarientOptionId) {
                        const image = yield productVarientOptionImageRepository.findOne({ where: { productVarientOptionId: productInformation.productVarientOptionId } });
                        if (image) {
                            productImageDetail = image;
                        }
                        else {
                            productImageDetail = yield productImageRepository.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                        }
                    }
                    else {
                        productImageDetail = yield productImageRepository.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                    }
                    productImageData.productInformationData = productInformation;
                    productImageData.productImage = productImageDetail;
                    productDetailData.push(productImageData);
                }
                const emailContent = yield EmailTemplateRepository.findOne(5);
                const adminEmailContent = yield EmailTemplateRepository.findOne(6);
                const nowDate = new Date();
                const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
                const customerFirstName = orderData.shippingFirstname;
                const customerLastName = orderData.shippingLastname;
                const customerName = customerFirstName + ' ' + customerLastName;
                const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                const customerMessage = emailContent.content.replace('{name}', customerName);
                const adminId = [];
                const adminUser = yield userRepository.find({ select: ['username'], where: { userGroupId: 1 } });
                for (const user of adminUser) {
                    const val = user.username;
                    adminId.push(val);
                }
                const logo = yield settingRepository.findOne();
                const vendorInvoice = yield VendorInvoiceRepository.find({ where: { orderId: orderData.orderId } });
                if (vendorInvoice.length > 0) {
                    for (const vendInvoice of vendorInvoice) {
                        const vendorProductDetailData = [];
                        const vendor = yield VendorRepository.findOne({ where: { vendorId: vendInvoice.vendorId } });
                        const customer = yield CustomerRepository.findOne({ where: { id: vendor.customerId } });
                        const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                        const vendorInvoiceItem = yield VendorInvoiceItemRepository.find({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                        for (const vendInvoiceItem of vendorInvoiceItem) {
                            const vendorProductInformation = yield orderProductRepository.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'varientName', 'skuName', 'taxValue', 'taxType', 'productVarientOptionId', 'orderProductPrefixId'] });
                            const vendorProductImageData = yield productRepository.findOne(vendorProductInformation.productId);
                            let vendorProductImageDetail;
                            if (vendorProductInformation.productVarientOptionId) {
                                const image = yield productVarientOptionImageRepository.findOne({ where: { productVarientOptionId: vendorProductInformation.productVarientOptionId } });
                                if (image) {
                                    vendorProductImageDetail = image;
                                }
                                else {
                                    vendorProductImageDetail = yield productImageRepository.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                                }
                            }
                            else {
                                vendorProductImageDetail = yield productImageRepository.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
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
            }
            else {
                const transactionsParams = new RazorpayOrderTransaction_1.RazorpayOrderTransaction();
                transactionsParams.paymentType = 'FAILURE';
                transactionsParams.razorpayOrderId = razorpayDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 2;
                yield razorpayOrderTransactionRepository.save(transactionsParams);
                razorpayDetail.status = 2;
                yield razorpayOrderRepository.save(razorpayDetail);
                orderData.paymentFlag = 2;
                orderData.paymentStatus = 2;
                yield orderRepository.save(orderData);
            }
            res.render('pages/paypal/success', {
                title: 'Paypal',
                storeUrl: env_1.env.storeUrl,
                layout: 'pages/layouts/auth',
            });
        });
    }
    cancel(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/razorpay/cancel', {
                title: 'Razorpay',
                layout: 'pages/layouts/auth',
                storeUrl: env_1.env.cancelUrl,
            });
        });
    }
    proceed(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.orderId;
            const orderRepository = typeorm_1.getManager().getRepository(Order_1.Order);
            const razorpayOrderRepository = typeorm_1.getManager().getRepository(RazorpayOrder_1.RazorpayOrder);
            const orderDetail = yield orderRepository.findOne(orderId);
            if (!orderDetail) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('error');
            }
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const params = {
                amount: +orderDetail.total,
                receipt: orderDetail.orderPrefixId,
                currency: 'INR',
                payment_capture: true,
            };
            instance.orders.create(params).then((response) => {
                // ---
                const paypalParams = new RazorpayOrder_1.RazorpayOrder();
                paypalParams.orderId = orderDetail.orderId;
                paypalParams.razorpayRefId = response.id;
                paypalParams.total = params.amount.toString();
                paypalParams.status = 0;
                razorpayOrderRepository.save(paypalParams).then((val) => {
                    // ---
                    res.render('pages/razorpay/proceed', {
                        title: 'Razorpay',
                        orderRefId: response.id,
                        key: paypalAdditionalInfo.clientId,
                        amount: orderDetail.total,
                        orderId: orderDetail.orderPrefixId,
                        orderIncrementId: orderDetail.orderId,
                        description: val.id,
                        username: orderDetail.paymentFirstname + ' ' + orderDetail.paymentLastname,
                        email: orderDetail.email,
                        contact: orderDetail.telephone,
                        layout: 'pages/layouts/auth',
                    });
                }).catch((err) => {
                    throw err;
                });
            }).catch((error) => {
                // ---
                throw error;
            });
        });
    }
    processAPI(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.orderPrefixId;
            const orderRepository = typeorm_1.getManager().getRepository(Order_1.Order);
            const razorpayOrderRepository = typeorm_1.getManager().getRepository(RazorpayOrder_1.RazorpayOrder);
            const orderDetail = yield orderRepository.findOne({ where: { orderPrefixId: orderId } });
            if (!orderDetail) {
                return res.status(400).send({
                    status: 0,
                    message: 'Invalid Order Id',
                });
            }
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                return res.status(400).send({
                    status: 0,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const params = {
                amount: +orderDetail.total * 100,
                receipt: orderDetail.orderPrefixId,
                currency: 'INR',
                payment_capture: true,
            };
            instance.orders.create(params).then((response) => {
                // ---
                const paypalParams = new RazorpayOrder_1.RazorpayOrder();
                paypalParams.orderId = orderDetail.orderId;
                paypalParams.razorpayRefId = response.id;
                paypalParams.total = params.amount.toString();
                paypalParams.status = 0;
                razorpayOrderRepository.save(paypalParams).then((val) => {
                    // ---
                    const successResponse = {
                        status: 1,
                        message: 'payment made successful',
                        data: {
                            title: 'Razorpay',
                            orderRefId: response.id,
                            key: paypalAdditionalInfo.clientId,
                            amount: +orderDetail.total * 100,
                            orderId: orderDetail.orderPrefixId,
                            orderIncrementId: orderDetail.orderId,
                            description: val.id,
                            username: orderDetail.paymentFirstname + ' ' + orderDetail.paymentLastname,
                            email: orderDetail.email,
                            contact: orderDetail.telephone,
                            successURL: env_1.env.baseUrl + paypalAdditionalInfo.successAPIRoute,
                            cancelURL: env_1.env.baseUrl + paypalAdditionalInfo.cancelAPIRoute,
                            failureURL: env_1.env.baseUrl + paypalAdditionalInfo.failureAPIRoute,
                            layout: 'pages/layouts/auth',
                        },
                    };
                    return res.status(200).send(successResponse);
                }).catch((err) => {
                    return res.status(400).send({
                        status: 0,
                        message: 'You not install this plugin. or problem in installation',
                    });
                });
            }).catch((error) => {
                // ---
                return res.status(400).send({
                    status: 0,
                    message: 'You not install this plugin. or problem in installation',
                });
            });
        });
    }
    successAPI(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const EmailTemplateRepository = typeorm_1.getManager().getRepository(EmailTemplate_1.EmailTemplate);
            const orderProductRepository = typeorm_1.getManager().getRepository(OrderProduct_1.OrderProduct);
            const productImageRepository = typeorm_1.getManager().getRepository(ProductImage_1.ProductImage);
            const productRepository = typeorm_1.getManager().getRepository(ProductModel_1.Product);
            const settingRepository = typeorm_1.getManager().getRepository(Setting_1.Settings);
            const currencyRepository = typeorm_1.getManager().getRepository(Currency_1.Currency);
            const userRepository = typeorm_1.getManager().getRepository(User_1.User);
            const razorpayOrderRepository = typeorm_1.getManager().getRepository(RazorpayOrder_1.RazorpayOrder);
            const razorpayOrderTransactionRepository = typeorm_1.getManager().getRepository(RazorpayOrderTransaction_1.RazorpayOrderTransaction);
            const paymentRepository = typeorm_1.getManager().getRepository(Payment_1.Payment);
            const paymentItemsRepository = typeorm_1.getManager().getRepository(PaymentItems_1.PaymentItems);
            const vendorPaymentRepository = typeorm_1.getManager().getRepository(VendorPayment_1.VendorPayment);
            const VendorProductsRepository = typeorm_1.getManager().getRepository(VendorProducts_1.VendorProducts);
            const VendorRepository = typeorm_1.getManager().getRepository(Vendor_1.Vendor);
            const VendorGlobalSettingRepository = typeorm_1.getManager().getRepository(VendorGlobalSettings_1.VendorGlobalSetting);
            const VendorOrdersRepository = typeorm_1.getManager().getRepository(VendorOrders_1.VendorOrders);
            const queryParams = req.query;
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'razorpay',
                },
            });
            if (!pluginDetail) {
                return res.status(400).send({
                    status: 0,
                    message: 'You not install this plugin. or problem in installation',
                });
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const razorPay = require('razorpay');
            const instance = new razorPay({
                key_id: paypalAdditionalInfo.clientId,
                key_secret: paypalAdditionalInfo.clientSecret,
            });
            const paymentDetails = yield RazorPayController.razorPaySuccess(instance, queryParams.razorpay_payment_id);
            const razorpayDetail = yield razorpayOrderRepository.findOne({
                where: {
                    razorpayRefId: paymentDetails.order_id,
                },
            });
            if (!razorpayDetail) {
                return res.status(400).send({
                    status: 0,
                    message: 'Invalid Payment Details',
                });
            }
            const orderRepository = typeorm_1.getManager().getRepository(Order_1.Order);
            const orderData = yield orderRepository.findOne(razorpayDetail.orderId);
            if (!orderData) {
                return res.status(400).send({
                    status: 0,
                    message: 'Invalid Order Id',
                });
            }
            const setting = yield settingRepository.findOne();
            const currencySymbol = yield currencyRepository.findOne(setting.storeCurrencyId);
            orderData.currencyRight = currencySymbol.symbolRight;
            orderData.currencyLeft = currencySymbol.symbolLeft;
            const orderStatus = yield orderRepository.findOne({ where: { orderId: razorpayDetail.orderId, paymentFlag: 1 } });
            if (orderStatus) {
                return res.status(400).send({
                    status: 0,
                    message: 'Already Paid for this Order',
                });
            }
            const intvalue = Math.round(paymentDetails.amount);
            if (paymentDetails.status === 'captured' && intvalue === +razorpayDetail.total) {
                const transactionsParams = new RazorpayOrderTransaction_1.RazorpayOrderTransaction();
                transactionsParams.paymentType = paymentDetails.method;
                transactionsParams.razorpayOrderId = razorpayDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 1;
                yield razorpayOrderTransactionRepository.save(transactionsParams);
                razorpayDetail.status = 1;
                yield razorpayOrderRepository.save(razorpayDetail);
                orderData.paymentFlag = 1;
                orderData.paymentStatus = 1;
                orderData.paymentProcess = 1;
                orderData.paymentType = 'razorpay';
                orderData.paymentDetails = paymentDetails.id;
                yield orderRepository.save(orderData);
                const paymentParams = new Payment_1.Payment();
                paymentParams.orderId = razorpayDetail.orderId;
                const date = new Date();
                paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                paymentParams.paymentNumber = paymentDetails.id;
                paymentParams.paymentAmount = orderData.total;
                paymentParams.paymentInformation = JSON.stringify(paymentDetails);
                const payments = yield paymentRepository.save(paymentParams);
                const productDetailData = [];
                let i;
                const orderProduct = yield orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount'] });
                for (i = 0; i < orderProduct.length; i++) {
                    const paymentItems = new PaymentItems_1.PaymentItems();
                    paymentItems.paymentId = payments.paymentId;
                    paymentItems.orderProductId = orderProduct[i].orderProductId;
                    paymentItems.totalAmount = orderProduct[i].discountedAmount ? orderProduct[i].discountedAmount : orderProduct[i].total;
                    paymentItems.productName = orderProduct[i].name;
                    paymentItems.productQuantity = orderProduct[i].quantity;
                    paymentItems.productPrice = orderProduct[i].productPrice;
                    const payItem = yield paymentItemsRepository.save(paymentItems);
                    const vendorProduct = yield VendorProductsRepository.findOne({ where: { productId: orderProduct[i].productId } });
                    if (vendorProduct) {
                        const vendor = yield VendorRepository.findOne({ where: { vendorId: vendorProduct.vendorId } });
                        const vendorOrders = yield VendorOrdersRepository.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                        const vendorPayments = new VendorPayment_1.VendorPayment();
                        vendorPayments.vendorId = vendorProduct.vendorId;
                        vendorPayments.paymentItemId = payItem.paymentItemId;
                        vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                        vendorPayments.amount = orderProduct[i].discountedAmount ? orderProduct[i].discountedAmount : orderProduct[i].total;
                        if (vendorProduct.vendorProductCommission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (vendorProduct.vendorProductCommission / 100);
                        }
                        else if (vendor.commission > 0) {
                            vendorPayments.commissionAmount = vendorPayments.amount * (vendor.commission / 100);
                        }
                        else {
                            const defaultCommission = yield VendorGlobalSettingRepository.findOne();
                            const defCommission = defaultCommission.defaultCommission;
                            vendorPayments.commissionAmount = vendorPayments.amount * (defCommission / 100);
                        }
                        yield vendorPaymentRepository.save(vendorPayments);
                    }
                    const productInformation = yield orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount'] });
                    const productImageData = yield productRepository.findOne(productInformation.productId);
                    const productImageDetail = yield productImageRepository.findOne({ where: { productId: productInformation.productId } });
                    productImageData.productInformationData = productInformation;
                    productImageData.productImage = productImageDetail;
                    productDetailData.push(productImageData);
                }
                const emailContent = yield EmailTemplateRepository.findOne(5);
                const adminEmailContent = yield EmailTemplateRepository.findOne(6);
                const nowDate = new Date();
                const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
                const customerFirstName = orderData.shippingFirstname;
                const customerLastName = orderData.shippingLastname;
                const customerName = customerFirstName + ' ' + customerLastName;
                const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                const customerMessage = emailContent.content.replace('{name}', customerName);
                const adminId = [];
                const adminUser = yield userRepository.find({ select: ['username'], where: { userGroupId: 1 } });
                for (const user of adminUser) {
                    const val = user.username;
                    adminId.push(val);
                }
                const logo = yield settingRepository.findOne();
                const adminRedirectUrl = env_1.env.adminRedirectUrl;
                mail_services_1.MAILService.adminOrderMail(logo, adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId, adminRedirectUrl);
                const storeRedirectUrl = env_1.env.storeRedirectUrl;
                mail_services_1.MAILService.customerOrderMail(logo, customerMessage, orderData, emailContent.subject, productDetailData, today, storeRedirectUrl);
            }
            else {
                const transactionsParams = new RazorpayOrderTransaction_1.RazorpayOrderTransaction();
                transactionsParams.paymentType = 'FAILURE';
                transactionsParams.razorpayOrderId = razorpayDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 2;
                yield razorpayOrderTransactionRepository.save(transactionsParams);
                razorpayDetail.status = 2;
                yield razorpayOrderRepository.save(razorpayDetail);
                orderData.paymentFlag = 2;
                yield orderRepository.save(orderData);
            }
            const successResponse = {
                status: 1,
                message: 'payment made successful',
            };
            return res.status(200).send(successResponse);
        });
    }
}
exports.RazorPayController = RazorPayController;
//# sourceMappingURL=RazorpayController.js.map