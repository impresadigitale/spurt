/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import * as express from 'express';
import { getManager } from 'typeorm';
import { Order } from '../../api/models/Order';
import { Plugins } from '../models/Plugin';
import { RazorpayOrder } from '../models/RazorpayOrder';
import { RazorpayOrderTransaction } from '../models/RazorpayOrderTransaction';
import { OrderProduct } from '../../api/models/OrderProduct';
import { EmailTemplate } from '../../api/models/EmailTemplate';
import { Product } from '../../api/models/ProductModel';
import { ProductImage } from '../../api/models/ProductImage';
import { Settings } from '../../api/models/Setting';
import { Currency } from '../../api/models/Currency';
import { User } from '../../api/models/User';
import { MAILService } from '../../auth/mail.services';
import { env } from '../../env';
import { Payment as Payments } from '../../api/models/Payment';
import { PaymentItems } from '../../api/models/PaymentItems';
import { VendorPayment } from '../../api/models/VendorPayment';
import { VendorProducts } from '../../api/models/VendorProducts';
import { Vendor } from '../../api/models/Vendor';
import { VendorGlobalSetting } from '../../api/models/VendorGlobalSettings';
import { VendorOrders } from '../../api/models/VendorOrders';
import moment = require('moment');
import { VendorInvoice } from '../../api/models/VendorInvoice';
import { VendorInvoiceItem } from '../../api/models/VendorInvoiceItem';
import { Customer } from '../../api/models/Customer';
import { ProductVarientOptionImage } from '../../api/models/ProductVarientOptionImage';

export class RazorPayController {

    public static async razorPaySuccess(instance: any, paymentId: any): Promise<any> {
        return new Promise((resolve, reject) => {
            instance.payments.fetch(paymentId).then((response) => {
                return resolve(response);
            }).catch((error) => {
                return reject(error);
            });
        });
    }

    constructor() {
        // ---
    }

    public async index(req: express.Request | any, res: express.Response): Promise<any> {
        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
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
    }

    public async updateSettings(req: express.Request | any, res: express.Response): Promise<any> {
        req.assert('clientId', 'Client Id cannot be blank').notEmpty();
        req.assert('clientSecret', 'Client Secret cannot be blank').notEmpty();

        const errors = req.validationErrors();

        if (errors) {
            req.flash('errors', errors);
            return res.redirect('paypal');
        }

        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
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
        const saveResponse = await pluginRepository.save(pluginDetail);
        if (saveResponse) {
            req.flash('success', ['Razorpay settings updated successfully']);
            return res.redirect('home');
        }
        req.flash('errors', ['Unable to update the razorpay settings']);
        return res.redirect('home');
    }

    public async process(req: express.Request | any, res: express.Response): Promise<any> {
        const orderPrefixId = req.params.orderPrefixId;
        const orderRepository = getManager().getRepository(Order);
        const razorpayOrderRepository = getManager().getRepository(RazorpayOrder);
        const order = await orderRepository.findOne({ where: { orderPrefixId }, select: ['orderId'] });
        const orderId = order.orderId;
        const orderDetail = await orderRepository.findOne(orderId);
        if (!orderDetail) {
            req.flash('errors', ['Invalid Order Id']);
            return res.redirect('error');
        }
        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
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
        const params: any = {
            amount: +total * 100,
            receipt: orderDetail.orderPrefixId,
            currency: 'INR',
            payment_capture: true,
        };

        instance.orders.create(params).then((response: any) => {
            // ---
            const paypalParams = new RazorpayOrder();
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
    }

    public async success(req: express.Request | any, res: express.Response): Promise<any> {
        const pluginRepository = getManager().getRepository(Plugins);
        const EmailTemplateRepository = getManager().getRepository(EmailTemplate);
        const orderProductRepository = getManager().getRepository(OrderProduct);
        const productImageRepository = getManager().getRepository(ProductImage);
        const productRepository = getManager().getRepository(Product);
        const settingRepository = getManager().getRepository(Settings);
        const currencyRepository = getManager().getRepository(Currency);
        const userRepository = getManager().getRepository(User);
        const razorpayOrderRepository = getManager().getRepository(RazorpayOrder);
        const razorpayOrderTransactionRepository = getManager().getRepository(RazorpayOrderTransaction);
        const paymentRepository = getManager().getRepository(Payments);
        const paymentItemsRepository = getManager().getRepository(PaymentItems);
        const vendorPaymentRepository = getManager().getRepository(VendorPayment);
        const VendorProductsRepository = getManager().getRepository(VendorProducts);
        const VendorRepository = getManager().getRepository(Vendor);
        const VendorGlobalSettingRepository = getManager().getRepository(VendorGlobalSetting);
        const VendorOrdersRepository = getManager().getRepository(VendorOrders);
        const productVarientOptionImageRepository = getManager().getRepository(ProductVarientOptionImage);
        const VendorInvoiceRepository = getManager().getRepository(VendorInvoice);
        const VendorInvoiceItemRepository = getManager().getRepository(VendorInvoiceItem);
        const CustomerRepository = getManager().getRepository(Customer);
        const queryParams = req.query;
        const pluginDetail = await pluginRepository.findOne({
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
        const paymentDetails = await RazorPayController.razorPaySuccess(instance, queryParams.razorpay_payment_id);
        const razorpayDetail = await razorpayOrderRepository.findOne({
            where: {
                razorpayRefId: paymentDetails.order_id,
            },
        });
        if (!razorpayDetail) {
            req.flash('errors', ['Invalid Payment Details']);
            return res.redirect('error');
        }

        const orderRepository = getManager().getRepository(Order);
        const orderData: any = await orderRepository.findOne(razorpayDetail.orderId);
        if (!orderData) {
            req.flash('errors', ['Invalid Order Id']);
            return res.redirect('error');
        }
        const setting = await settingRepository.findOne();
        const currencySymbol = await currencyRepository.findOne(setting.storeCurrencyId);
        orderData.currencyRight = currencySymbol.symbolRight;
        orderData.currencyLeft = currencySymbol.symbolLeft;

        const orderStatus = await orderRepository.findOne({ where: { orderId: razorpayDetail.orderId, paymentFlag: 1 } });
        if (orderStatus) {
            req.flash('errors', ['Already Paid for this Order']);
            return res.redirect('error');
        }

        const intvalue = Math.round(paymentDetails.amount);
        const intVal = intvalue / 100;
        if (paymentDetails.status === 'captured' && intVal === +razorpayDetail.total) {
            const transactionsParams = new RazorpayOrderTransaction();
            transactionsParams.paymentType = paymentDetails.method;
            transactionsParams.razorpayOrderId = razorpayDetail.id;
            transactionsParams.paymentData = JSON.stringify(paymentDetails);
            transactionsParams.paymentStatus = 1;
            await razorpayOrderTransactionRepository.save(transactionsParams);
            razorpayDetail.status = 1;
            await razorpayOrderRepository.save(razorpayDetail);
            orderData.paymentFlag = 1;
            orderData.paymentStatus = 1;
            orderData.paymentProcess = 1;
            orderData.paymentType = 'razorpay';
            orderData.paymentDetails = paymentDetails.id;
            await orderRepository.save(orderData);
            const paymentParams = new Payments();
            paymentParams.orderId = razorpayDetail.orderId;
            const date = new Date();
            paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
            paymentParams.paymentNumber = paymentDetails.id;
            paymentParams.paymentAmount = orderData.total;
            paymentParams.paymentInformation = JSON.stringify(paymentDetails);
            const payments = await paymentRepository.save(paymentParams);
            const productDetailData = [];
            let i;
            const orderProduct = await orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount'] });
            for (i = 0; i < orderProduct.length; i++) {
                const paymentItems = new PaymentItems();
                paymentItems.paymentId = payments.paymentId;
                paymentItems.orderProductId = orderProduct[i].orderProductId;
                paymentItems.totalAmount = orderProduct[i].discountedAmount ? orderProduct[i].discountedAmount : orderProduct[i].total;
                paymentItems.productName = orderProduct[i].name;
                paymentItems.productQuantity = orderProduct[i].quantity;
                paymentItems.productPrice = orderProduct[i].productPrice;
                const payItem = await paymentItemsRepository.save(paymentItems);
                const vendorProduct = await VendorProductsRepository.findOne({ where: { productId: orderProduct[i].productId } });
                if (vendorProduct) {
                    const vendor = await VendorRepository.findOne({ where: { vendorId: vendorProduct.vendorId } });
                    const vendorOrders = await VendorOrdersRepository.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                    const vendorPayments = new VendorPayment();
                    vendorPayments.vendorId = vendorProduct.vendorId;
                    vendorPayments.paymentItemId = payItem.paymentItemId;
                    vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                    vendorPayments.amount = orderProduct[i].discountedAmount ? orderProduct[i].discountedAmount : orderProduct[i].total;
                    if (vendorProduct.vendorProductCommission > 0) {
                        vendorPayments.commissionAmount = vendorPayments.amount * (vendorProduct.vendorProductCommission / 100);
                    } else if (vendor.commission > 0) {
                        vendorPayments.commissionAmount = vendorPayments.amount * (vendor.commission / 100);
                    } else {
                        const defaultCommission = await VendorGlobalSettingRepository.findOne();
                        const defCommission = defaultCommission.defaultCommission;
                        vendorPayments.commissionAmount = vendorPayments.amount * (defCommission / 100);
                    }
                    await vendorPaymentRepository.save(vendorPayments);
                }
                const productInformation = await orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountedAmount', 'discountAmount', 'basePrice', 'varientName', 'skuName', 'taxValue', 'taxType', 'productVarientOptionId', 'orderProductPrefixId'] });
                const productImageData: any = await productRepository.findOne(productInformation.productId);
                let productImageDetail;
                if (productInformation.productVarientOptionId) {
                    const image = await productVarientOptionImageRepository.findOne({ where: { productVarientOptionId: productInformation.productVarientOptionId } });
                    if (image) {
                        productImageDetail = image;
                    } else {
                        productImageDetail = await productImageRepository.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                    }
                } else {
                    productImageDetail = await productImageRepository.findOne({ where: { productId: productInformation.productId, defaultImage: 1 } });
                }
                productImageData.productInformationData = productInformation;
                productImageData.productImage = productImageDetail;
                productDetailData.push(productImageData);
            }
            const emailContent = await EmailTemplateRepository.findOne(5);
            const adminEmailContent = await EmailTemplateRepository.findOne(6);
            const nowDate = new Date();
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{adminname}', 'Admin').replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await userRepository.find({ select: ['username'], where: { userGroupId: 1 } });
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            const logo = await settingRepository.findOne();
            const vendorInvoice = await VendorInvoiceRepository.find({ where: { orderId: orderData.orderId } });
            if (vendorInvoice.length > 0) {
                for (const vendInvoice of vendorInvoice) {
                    const vendorProductDetailData = [];
                    const vendor = await VendorRepository.findOne({ where: { vendorId: vendInvoice.vendorId } });
                    const customer = await CustomerRepository.findOne({ where: { id: vendor.customerId } });
                    const vendorMessage = adminEmailContent.content.replace('{adminname}', vendor.companyName).replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                    const vendorInvoiceItem = await VendorInvoiceItemRepository.find({ where: { vendorInvoiceId: vendInvoice.vendorInvoiceId } });
                    for (const vendInvoiceItem of vendorInvoiceItem) {
                        const vendorProductInformation = await orderProductRepository.findOne({ where: { orderProductId: vendInvoiceItem.orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'basePrice', 'varientName', 'skuName', 'taxValue', 'taxType', 'productVarientOptionId', 'orderProductPrefixId'] });
                        const vendorProductImageData: any = await productRepository.findOne(vendorProductInformation.productId);
                        let vendorProductImageDetail;
                        if (vendorProductInformation.productVarientOptionId) {
                            const image = await productVarientOptionImageRepository.findOne({ where: { productVarientOptionId: vendorProductInformation.productVarientOptionId } });
                            if (image) {
                                vendorProductImageDetail = image;
                            } else {
                                vendorProductImageDetail = await productImageRepository.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
                            }
                        } else {
                            vendorProductImageDetail = await productImageRepository.findOne({ where: { productId: vendorProductInformation.productId, defaultImage: 1 } });
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
        } else {
            const transactionsParams = new RazorpayOrderTransaction();
            transactionsParams.paymentType = 'FAILURE';
            transactionsParams.razorpayOrderId = razorpayDetail.id;
            transactionsParams.paymentData = JSON.stringify(paymentDetails);
            transactionsParams.paymentStatus = 2;
            await razorpayOrderTransactionRepository.save(transactionsParams);
            razorpayDetail.status = 2;
            await razorpayOrderRepository.save(razorpayDetail);
            orderData.paymentFlag = 2;
            orderData.paymentStatus = 2;
            await orderRepository.save(orderData);
        }
        res.render('pages/paypal/success', {
            title: 'Paypal',
            storeUrl: env.storeUrl,
            layout: 'pages/layouts/auth',
        });
    }

    public async cancel(req: express.Request | any, res: express.Response): Promise<any> {
        res.render('pages/razorpay/cancel', {
            title: 'Razorpay',
            layout: 'pages/layouts/auth',
            storeUrl: env.cancelUrl,
        });
    }

    public async proceed(req: express.Request | any, res: express.Response): Promise<any> {
        const orderId = req.params.orderId;
        const orderRepository = getManager().getRepository(Order);
        const razorpayOrderRepository = getManager().getRepository(RazorpayOrder);
        const orderDetail = await orderRepository.findOne(orderId);
        if (!orderDetail) {
            req.flash('errors', ['Invalid Order Id']);
            return res.redirect('error');
        }

        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
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
        const params: any = {
            amount: +orderDetail.total,
            receipt: orderDetail.orderPrefixId,
            currency: 'INR',
            payment_capture: true,
        };

        instance.orders.create(params).then((response: any) => {
            // ---
            const paypalParams = new RazorpayOrder();
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
    }

    public async processAPI(req: express.Request | any, res: express.Response): Promise<any> {
        const orderId = req.params.orderPrefixId;
        const orderRepository = getManager().getRepository(Order);
        const razorpayOrderRepository = getManager().getRepository(RazorpayOrder);
        const orderDetail = await orderRepository.findOne({ where: { orderPrefixId: orderId } });
        if (!orderDetail) {
            return res.status(400).send({
                status: 0,
                message: 'Invalid Order Id',
            });
        }

        const pluginRepository = getManager().getRepository(Plugins);
        const pluginDetail = await pluginRepository.findOne({
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
        const params: any = {
            amount: +orderDetail.total * 100,
            receipt: orderDetail.orderPrefixId,
            currency: 'INR',
            payment_capture: true,
        };

        instance.orders.create(params).then((response: any) => {
            // ---
            const paypalParams = new RazorpayOrder();
            paypalParams.orderId = orderDetail.orderId;
            paypalParams.razorpayRefId = response.id;
            paypalParams.total = params.amount.toString();
            paypalParams.status = 0;
            razorpayOrderRepository.save(paypalParams).then((val) => {
                // ---
                const successResponse: any = {
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
                        successURL: env.baseUrl + paypalAdditionalInfo.successAPIRoute,
                        cancelURL: env.baseUrl + paypalAdditionalInfo.cancelAPIRoute,
                        failureURL: env.baseUrl + paypalAdditionalInfo.failureAPIRoute,
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
    }

    public async successAPI(req: express.Request | any, res: express.Response): Promise<any> {
        const pluginRepository = getManager().getRepository(Plugins);
        const EmailTemplateRepository = getManager().getRepository(EmailTemplate);
        const orderProductRepository = getManager().getRepository(OrderProduct);
        const productImageRepository = getManager().getRepository(ProductImage);
        const productRepository = getManager().getRepository(Product);
        const settingRepository = getManager().getRepository(Settings);
        const currencyRepository = getManager().getRepository(Currency);
        const userRepository = getManager().getRepository(User);
        const razorpayOrderRepository = getManager().getRepository(RazorpayOrder);
        const razorpayOrderTransactionRepository = getManager().getRepository(RazorpayOrderTransaction);
        const paymentRepository = getManager().getRepository(Payments);
        const paymentItemsRepository = getManager().getRepository(PaymentItems);
        const vendorPaymentRepository = getManager().getRepository(VendorPayment);
        const VendorProductsRepository = getManager().getRepository(VendorProducts);
        const VendorRepository = getManager().getRepository(Vendor);
        const VendorGlobalSettingRepository = getManager().getRepository(VendorGlobalSetting);
        const VendorOrdersRepository = getManager().getRepository(VendorOrders);
        const queryParams = req.query;
        const pluginDetail = await pluginRepository.findOne({
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
        const paymentDetails = await RazorPayController.razorPaySuccess(instance, queryParams.razorpay_payment_id);
        const razorpayDetail = await razorpayOrderRepository.findOne({
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

        const orderRepository = getManager().getRepository(Order);
        const orderData: any = await orderRepository.findOne(razorpayDetail.orderId);
        if (!orderData) {
            return res.status(400).send({
                status: 0,
                message: 'Invalid Order Id',
            });
        }
        const setting = await settingRepository.findOne();
        const currencySymbol = await currencyRepository.findOne(setting.storeCurrencyId);
        orderData.currencyRight = currencySymbol.symbolRight;
        orderData.currencyLeft = currencySymbol.symbolLeft;

        const orderStatus = await orderRepository.findOne({ where: { orderId: razorpayDetail.orderId, paymentFlag: 1 } });
        if (orderStatus) {
            return res.status(400).send({
                status: 0,
                message: 'Already Paid for this Order',
            });
        }

        const intvalue = Math.round(paymentDetails.amount);
        if (paymentDetails.status === 'captured' && intvalue === +razorpayDetail.total) {
            const transactionsParams = new RazorpayOrderTransaction();
            transactionsParams.paymentType = paymentDetails.method;
            transactionsParams.razorpayOrderId = razorpayDetail.id;
            transactionsParams.paymentData = JSON.stringify(paymentDetails);
            transactionsParams.paymentStatus = 1;
            await razorpayOrderTransactionRepository.save(transactionsParams);
            razorpayDetail.status = 1;
            await razorpayOrderRepository.save(razorpayDetail);
            orderData.paymentFlag = 1;
            orderData.paymentStatus = 1;
            orderData.paymentProcess = 1;
            orderData.paymentType = 'razorpay';
            orderData.paymentDetails = paymentDetails.id;
            await orderRepository.save(orderData);
            const paymentParams = new Payments();
            paymentParams.orderId = razorpayDetail.orderId;
            const date = new Date();
            paymentParams.paidDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
            paymentParams.paymentNumber = paymentDetails.id;
            paymentParams.paymentAmount = orderData.total;
            paymentParams.paymentInformation = JSON.stringify(paymentDetails);
            const payments = await paymentRepository.save(paymentParams);
            const productDetailData = [];
            let i;
            const orderProduct = await orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount'] });
            for (i = 0; i < orderProduct.length; i++) {
                const paymentItems = new PaymentItems();
                paymentItems.paymentId = payments.paymentId;
                paymentItems.orderProductId = orderProduct[i].orderProductId;
                paymentItems.totalAmount = orderProduct[i].discountedAmount ? orderProduct[i].discountedAmount : orderProduct[i].total;
                paymentItems.productName = orderProduct[i].name;
                paymentItems.productQuantity = orderProduct[i].quantity;
                paymentItems.productPrice = orderProduct[i].productPrice;
                const payItem = await paymentItemsRepository.save(paymentItems);
                const vendorProduct = await VendorProductsRepository.findOne({ where: { productId: orderProduct[i].productId } });
                if (vendorProduct) {
                    const vendor = await VendorRepository.findOne({ where: { vendorId: vendorProduct.vendorId } });
                    const vendorOrders = await VendorOrdersRepository.findOne({ where: { vendorId: vendorProduct.vendorId, orderProductId: orderProduct[i].orderProductId } });
                    const vendorPayments = new VendorPayment();
                    vendorPayments.vendorId = vendorProduct.vendorId;
                    vendorPayments.paymentItemId = payItem.paymentItemId;
                    vendorPayments.vendorOrderId = vendorOrders.vendorOrderId;
                    vendorPayments.amount = orderProduct[i].discountedAmount ? orderProduct[i].discountedAmount : orderProduct[i].total;
                    if (vendorProduct.vendorProductCommission > 0) {
                        vendorPayments.commissionAmount = vendorPayments.amount * (vendorProduct.vendorProductCommission / 100);
                    } else if (vendor.commission > 0) {
                        vendorPayments.commissionAmount = vendorPayments.amount * (vendor.commission / 100);
                    } else {
                        const defaultCommission = await VendorGlobalSettingRepository.findOne();
                        const defCommission = defaultCommission.defaultCommission;
                        vendorPayments.commissionAmount = vendorPayments.amount * (defCommission / 100);
                    }
                    await vendorPaymentRepository.save(vendorPayments);
                }
                const productInformation = await orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice', 'discountAmount', 'discountedAmount'] });
                const productImageData: any = await productRepository.findOne(productInformation.productId);
                const productImageDetail = await productImageRepository.findOne({ where: { productId: productInformation.productId } });
                productImageData.productInformationData = productInformation;
                productImageData.productImage = productImageDetail;
                productDetailData.push(productImageData);
            }
            const emailContent = await EmailTemplateRepository.findOne(5);
            const adminEmailContent = await EmailTemplateRepository.findOne(6);
            const nowDate = new Date();
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await userRepository.find({ select: ['username'], where: { userGroupId: 1 } });
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            const logo = await settingRepository.findOne();
            const adminRedirectUrl = env.adminRedirectUrl;
            MAILService.adminOrderMail(logo, adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId, adminRedirectUrl);
            const storeRedirectUrl = env.storeRedirectUrl;
            MAILService.customerOrderMail(logo, customerMessage, orderData, emailContent.subject, productDetailData, today, storeRedirectUrl);
        } else {
            const transactionsParams = new RazorpayOrderTransaction();
            transactionsParams.paymentType = 'FAILURE';
            transactionsParams.razorpayOrderId = razorpayDetail.id;
            transactionsParams.paymentData = JSON.stringify(paymentDetails);
            transactionsParams.paymentStatus = 2;
            await razorpayOrderTransactionRepository.save(transactionsParams);
            razorpayDetail.status = 2;
            await razorpayOrderRepository.save(razorpayDetail);
            orderData.paymentFlag = 2;
            await orderRepository.save(orderData);
        }
        const successResponse: any = {
            status: 1,
            message: 'payment made successful',
        };
        return res.status(200).send(successResponse);
    }
}
