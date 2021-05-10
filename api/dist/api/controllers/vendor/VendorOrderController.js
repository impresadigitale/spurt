"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const VendorOrderService_1 = require("../../services/VendorOrderService");
const OrderService_1 = require("../../services/OrderService");
const ProductService_1 = require("../../services/ProductService");
const ProductImageService_1 = require("../../services/ProductImageService");
const VendorService_1 = require("../../services/VendorService");
const OrderProductService_1 = require("../../services/OrderProductService");
const OrderStatusService_1 = require("../../services/OrderStatusService");
const VendorOrderLogService_1 = require("../../services/VendorOrderLogService");
const PdfService_1 = require("../../services/PdfService");
const S3Service_1 = require("../../services/S3Service");
const ImageService_1 = require("../../services/ImageService");
const SettingService_1 = require("../../services/SettingService");
const VendorInvoiceService_1 = require("../../services/VendorInvoiceService");
const VendorInvoiceItemService_1 = require("../../services/VendorInvoiceItemService");
const VendorProductService_1 = require("../../services/VendorProductService");
const VendorInvoiceItem_1 = require("../../models/VendorInvoiceItem");
const VendorInvoice_1 = require("../../models/VendorInvoice");
const env_1 = require("../../../env");
const to_words_1 = require("to-words");
const moment_1 = tslib_1.__importDefault(require("moment"));
let VendorOrderController = class VendorOrderController {
    constructor(vendorOrdersService, orderService, orderProductService, vendorService, productService, productImageService, vendorOrderLogService, orderStatusService, pdfService, settingService, s3Service, vendorInvoiceService, vendorInvoiceItemService, vendorProductService, imageService) {
        this.vendorOrdersService = vendorOrdersService;
        this.orderService = orderService;
        this.orderProductService = orderProductService;
        this.vendorService = vendorService;
        this.productService = productService;
        this.productImageService = productImageService;
        this.vendorOrderLogService = vendorOrderLogService;
        this.orderStatusService = orderStatusService;
        this.pdfService = pdfService;
        this.settingService = settingService;
        this.s3Service = s3Service;
        this.vendorInvoiceService = vendorInvoiceService;
        this.vendorInvoiceItemService = vendorInvoiceItemService;
        this.vendorProductService = vendorProductService;
        this.imageService = imageService;
    }
    // order List API
    /**
     * @api {get} /api/admin-vendor-order/order-list Order List API
     * @apiGroup Admin Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-order/order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    orderList(limit, offset, customerName, startDate, endDate, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'orderDetail.customerId as customerId',
                'orderDetail.createdDate as createdDate',
                'orderDetail.orderId as orderId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.shippingFirstname as shippingFirstName',
                'orderDetail.shippingCity as shippingCity',
                'orderDetail.shippingCountry as shippingCountry'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
            ];
            const groupBy = [
                {
                    name: 'VendorOrders.order_id',
                },
            ];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`orderDetail`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            whereConditions.push({
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            });
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`orderDetail`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (customerName && customerName !== '') {
                searchConditions.push({
                    name: ['shipping_firstname'],
                    value: customerName.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            if (count) {
                const Response = {
                    status: 1,
                    message: 'Successfully got count.',
                    data: orderList,
                };
                return response.status(200).send(Response);
            }
            const orderStatus = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const status = yield this.orderStatusService.findOne({
                    where: { orderStatusId: value.orderStatusId },
                    select: ['orderStatusId', 'name', 'colorCode'],
                });
                const vendorOrders = yield this.vendorOrdersService.findAll({
                    where: { orderId: value.orderId },
                });
                const vendorCount = yield this.vendorOrdersService.findVendorCount(value.orderId);
                const temp = value;
                temp.orderStatus = status;
                temp.productCount = vendorOrders.length;
                temp.vendorCount = vendorCount.vendorCount;
                return temp;
            }));
            const results = yield Promise.all(orderStatus);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order list.',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  Order Detail API
    /**
     * @api {get} /api/admin-vendor-order/order-detail  Order Detail API
     * @apiGroup Admin Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParamExample {json} Input
     * {
     *      "orderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor-order/order-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderDetail(orderid, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderService.findOrder({
                where: { orderId: orderid }, select: ['orderId', 'orderStatusId', 'customerId', 'email', 'telephone', 'invoiceNo', 'invoicePrefix', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingAddress1',
                    'shippingAddress2', 'shippingCity', 'email', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'customerId', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight', 'paymentStatus', 'paymentFlag'],
            });
            orderData.productList = yield this.vendorOrdersService.findAll({ where: { orderId: orderid }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total'] }).then((val) => {
                const productVal = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const vendor = yield this.vendorService.findOne({
                        where: { vendorId: value.vendorId },
                        select: ['customerId', 'companyName', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId'],
                    });
                    const vendorOrderProduct = yield this.orderProductService.find({ select: ['orderProductId', 'productId', 'name', 'quantity', 'total', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'orderProductPrefixId', 'skuName', 'varientName'], where: { orderProductId: value.orderProductId } });
                    const list = [];
                    for (const product of vendorOrderProduct) {
                        const productImage = yield this.productImageService.findOne({
                            where: { productId: product.productId, defaultImage: 1 },
                            select: ['image', 'containerName'],
                        });
                        const productDetail = yield this.productService.findOne({
                            where: { productId: product.productId },
                            select: ['sku'],
                        });
                        const obj = {};
                        obj.basePrice = product.basePrice;
                        obj.taxType = product.taxType;
                        obj.taxValue = product.taxValue;
                        if (product.taxType === 2) {
                            obj.taxValueInAmount = +product.basePrice * ((+product.taxValue) / 100);
                        }
                        else {
                            obj.taxValueInAmount = product.taxValue;
                        }
                        obj.productId = product.productId;
                        obj.name = product.name;
                        obj.quantity = product.quantity;
                        obj.total = product.total;
                        if (productImage) {
                            obj.image = productImage.image;
                            obj.containerName = productImage.containerName;
                        }
                        obj.sku = productDetail.sku;
                        obj.discountAmount = product.discountAmount;
                        obj.discountedAmount = product.discountedAmount;
                        obj.skuName = product.skuName;
                        obj.varientName = product.varientName;
                        list.push(obj);
                    }
                    const tempVal = value;
                    tempVal.companyName = vendor.companyName;
                    tempVal.companyAddress1 = vendor.companyAddress1;
                    tempVal.companyAddress2 = vendor.companyAddress2;
                    tempVal.companyCity = vendor.companyCity;
                    tempVal.companyState = vendor.companyState;
                    let total = 0;
                    for (const id of vendorOrderProduct) {
                        const OrderProductTotal = yield this.orderProductService.findOne({ select: ['total', 'discountAmount', 'discountedAmount'], where: { orderProductId: id.orderProductId } });
                        if (OrderProductTotal.discountedAmount) {
                            total += +OrderProductTotal.discountedAmount;
                        }
                        else {
                            total += +OrderProductTotal.total;
                        }
                    }
                    const subOrderStatus = yield this.orderStatusService.findOne({
                        where: { orderStatusId: value.subOrderStatusId },
                        select: ['name', 'colorCode'],
                    });
                    if (subOrderStatus) {
                        tempVal.subOrderStatusName = subOrderStatus.name;
                        tempVal.subOrderStatusColorCode = subOrderStatus.colorCode;
                    }
                    tempVal.vendorOrderTotal = total;
                    tempVal.vendorProductList = list;
                    return tempVal;
                }));
                const results = Promise.all(productVal);
                return results;
            });
            const orderStatusData = yield this.orderStatusService.findOne({
                where: { orderStatusId: orderData.orderStatusId },
                select: ['name', 'colorCode'],
            });
            orderData.orderStatusName = orderStatusData.name;
            orderData.statusColorCode = orderStatusData.colorCode;
            const productData = orderData.productList;
            // for getting total vendor product amount per order
            let ttl = 0;
            for (const id of productData) {
                const OrderProductTotal = yield this.orderProductService.findOne({ select: ['total', 'discountAmount', 'discountedAmount'], where: { orderProductId: id.orderProductId } });
                if (OrderProductTotal.discountedAmount) {
                    ttl += +OrderProductTotal.discountedAmount;
                }
                else {
                    ttl += +OrderProductTotal.total;
                }
            }
            orderData.total = ttl;
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order Detail. ',
                data: orderData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // vendor order log List API
    /**
     * @api {get} /api/admin-vendor-order/vendor-order-log-list Vendor Order Log List API
     * @apiGroup Admin Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got vendor order log list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateAdded" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-order/vendor-order-log-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    orderLogList(vendorOrderId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['vendorOrderLogId', 'vendorId', 'vendorOrderId', 'orderId', 'subOrderId', 'subOrderStatusId', 'createdDate', 'modifiedDate'];
            const WhereConditions = [
                {
                    name: 'vendorOrderId',
                    op: 'where',
                    value: vendorOrderId,
                },
            ];
            const orderList = yield this.vendorOrderLogService.list(0, 0, select, WhereConditions, 0);
            const orderStatuss = yield this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 }, orderBy: { priority: 'ASC' } });
            const order = orderStatuss.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const user = orderList.find(item => item.subOrderStatusId === value.orderStatusId);
                const temp = value;
                if (user === undefined) {
                    temp.createdDate = '';
                }
                else {
                    temp.createdDate = user.createdDate;
                }
                return temp;
            }));
            const result = yield Promise.all(order);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete Vendor Order Status Log list.',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Make Archive/revoke  API
    /**
     * @api {put} /api/admin-vendor-order/make-archive/:orderId Make Archive/revoke API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} archiveFlag archive flag should should be 1 or 0
     * @apiParamExample {json} Input
     * {
     *      "archiveFlag" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully .",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/make-archive/:orderId
     * @apiErrorExample {json} vendor approval error
     * HTTP/1.1 500 Internal Server Error
     */
    makeArchive(orderId, archiveFlag, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderService.findOne({
                where: {
                    orderId,
                },
            });
            if (!order) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid orderId',
                };
                return response.status(400).send(errorResponse);
            }
            order.makeArchive = archiveFlag;
            const orderSave = yield this.orderService.create(order);
            if (archiveFlag === 0) {
                const sucResponse = {
                    status: 1,
                    message: 'Successfully Revoked this order ',
                    data: orderSave,
                };
                return response.status(200).send(sucResponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: 'Successfully Archived this product. ',
                    data: orderSave,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    //  Order Export PDF API
    /**
     * @api {get} /api/admin-vendor-order/order-export-pdf  Order Export PDF API
     * @apiGroup Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParamExample {json} Input
     * {
     *      "orderId" : "",
     *      "vendorId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor-order/order-export-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderExportPdf(orderId, vendorId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderService.findOrder({
                where: { orderId }, select: ['orderId', 'invoicePrefix', 'telephone', 'orderPrefixId', 'customerGstNo', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1', 'shippingAddress2', 'shippingCity',
                    'shippingPostcode', 'shippingCountry', 'shippingZone', 'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'telephone',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'createdDate', 'currencyCode', 'currencySymbolLeft', 'currencySymbolRight'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Order Id',
                };
                return response.status(400).send(errorResponse);
            }
            const vendor = yield this.vendorService.findOne({ where: { vendorId } });
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Id',
                };
                return response.status(400).send(errorResponse);
            }
            const invoice = yield this.vendorInvoiceService.findOne({ where: { orderId, vendorId } });
            if (!invoice) {
                const orderProducts = yield this.orderProductService.find({ select: ['orderProductId', 'productId', 'name', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'varientName', 'skuName'], where: { orderId } });
                for (const orderProduct of orderProducts) {
                    const val = yield this.vendorProductService.findOne({ where: { productId: orderProduct.productId } });
                    if (val !== undefined) {
                        const newVendorInvoice = new VendorInvoice_1.VendorInvoice();
                        newVendorInvoice.vendorId = val.vendorId;
                        newVendorInvoice.invoicePrefix = orderData.invoicePrefix;
                        newVendorInvoice.orderId = orderData.orderId;
                        newVendorInvoice.email = orderData.email;
                        newVendorInvoice.total = 0;
                        newVendorInvoice.shippingFirstname = orderData.shippingFirstname;
                        newVendorInvoice.shippingLastname = orderData.shippingLastname;
                        yield this.vendorInvoiceService.create(newVendorInvoice);
                        const vendorInvoiceData = yield this.vendorInvoiceService.findOne({ where: { vendorId: val.vendorId, orderId: orderData.orderId } });
                        vendorInvoiceData.total = vendorInvoiceData.total + +orderProduct.total;
                        const stringPad = String(vendorInvoiceData.vendorInvoiceId).padStart(5, '0');
                        vendorInvoiceData.invoiceNo = 'INV'.concat(stringPad);
                        yield this.vendorInvoiceService.create(vendorInvoiceData);
                        const newVendorInvoiceItem = new VendorInvoiceItem_1.VendorInvoiceItem();
                        newVendorInvoiceItem.vendorInvoiceId = vendorInvoiceData.vendorInvoiceId;
                        newVendorInvoiceItem.orderProductId = orderProduct.orderProductId;
                        yield this.vendorInvoiceItemService.create(newVendorInvoiceItem);
                    }
                }
            }
            let amount = parseFloat('0.00');
            const invoiceData = yield this.vendorInvoiceService.findOne({ where: { orderId, vendorId } });
            orderData.productList = yield this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: invoiceData.vendorInvoiceId }, select: ['orderProductId', 'vendorInvoiceId', 'vendorInvoiceItemId'] }).then((val) => {
                const productVal = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const vendorOrderProduct = yield this.orderProductService.findOne({ select: ['orderProductId', 'productId', 'name', 'quantity', 'total', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'skuName', 'varientName'], where: { orderProductId: value.orderProductId } });
                    const product = yield this.productService.findOne({ select: ['sku', 'hsn'], where: { productId: vendorOrderProduct.productId } });
                    const obj = {};
                    obj.basePrice = vendorOrderProduct.basePrice;
                    obj.taxType = vendorOrderProduct.taxType;
                    obj.taxValue = vendorOrderProduct.taxValue;
                    obj.discountAmount = vendorOrderProduct.discountAmount;
                    obj.discountedAmount = vendorOrderProduct.discountedAmount;
                    obj.sku = product.sku;
                    obj.skuName = vendorOrderProduct.skuName;
                    obj.varientName = vendorOrderProduct.varientName;
                    obj.hsn = product.hsn;
                    if (obj.taxType === 2) {
                        obj.taxValueInAmount = (+vendorOrderProduct.basePrice * ((+vendorOrderProduct.taxValue) / 100)).toFixed(2);
                    }
                    else {
                        obj.taxValueInAmount = vendorOrderProduct.taxValue;
                    }
                    obj.productId = vendorOrderProduct.productId;
                    obj.name = vendorOrderProduct.name;
                    obj.quantity = vendorOrderProduct.quantity;
                    obj.total = vendorOrderProduct.total;
                    obj.productPrice = vendorOrderProduct.productPrice;
                    const amt = vendorOrderProduct.discountedAmount ? vendorOrderProduct.discountedAmount : vendorOrderProduct.total;
                    amount += parseFloat(amt);
                    return obj;
                }));
                const results = Promise.all(productVal);
                return results;
            });
            const settings = yield this.settingService.findOne();
            const settingDetails = settings;
            orderData.vendor = vendor;
            orderData.currencyCode = orderData.currencyCode;
            orderData.symbolLeft = orderData.currencySymbolLeft;
            orderData.symbolRight = orderData.currencySymbolRight;
            orderData.invoiceNo = invoiceData.invoiceNo;
            orderData.invoicePrefix = invoiceData.invoicePrefix;
            let toWords;
            if (orderData.currencyCode === 'INR') {
                toWords = new to_words_1.ToWords({ localeCode: 'en-IN' });
            }
            else {
                toWords = new to_words_1.ToWords({ localeCode: 'en-US' });
            }
            const words = toWords.convert(amount, { currency: true });
            orderData.currencyInWords = words;
            let image;
            if (env_1.env.imageserver === 's3') {
                image = yield this.s3Service.resizeImageBase64(settingDetails.storeLogo, settingDetails.storeLogoPath, '150', '150');
            }
            else {
                image = yield this.imageService.resizeImageBase64(settingDetails.storeLogo, settingDetails.storeLogoPath, '150', '150');
            }
            orderData.logo = image;
            const htmlData = yield this.pdfService.readHtmlToString('vendor-invoice', orderData);
            const pdfBinary = yield this.pdfService.createPDFFile(htmlData, true, '');
            return response.status(200).send({
                data: pdfBinary,
                status: 1,
                message: 'pdf exported',
            });
        });
    }
    // Vendor Order List API
    /**
     * @api {get} /api/admin-vendor-order/vendor-order-list  Vendor Order list API
     * @apiGroup Admin Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, company name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} amountFrom search by starting amount
     * @apiParam (Request body) {String} amountTo search by ending Amount
     * @apiParam (Request body) {String} vendorIds search by vendorIds
     * @apiParam (Request body) {String} orderStatus search by orderStatus
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got order list",
     *      "data":{
     *      "orderId" : "",
     *      "orderStatusId" : "",
     *      "customerName" : "",
     *      "totalAmount" : "",
     *      "dateModified" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor-order/vendor-order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    orderListtt(limit, offset, keyword, vendorIds, orderStatus, startDate, endDate, amountFrom, amountTo, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'VendorOrders.subOrderId as subOrderId',
                'orderDetail.createdDate as createdDate',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as customerFirstName',
                'orderDetail.paymentStatus as paymentStatus',
                'VendorOrders.total as total',
                'VendorOrders.commission as commission',
                'orderDetail.isActive as isActive',
                'orderDetail.shippingCity as shippingCity',
                'orderDetail.shippingCountry as shippingCountry',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
                'vendor.companyName as companyName'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.vendor',
                    aliasName: 'vendor',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
                {
                    tableName: 'VendorOrders.orderStatus',
                    aliasName: 'orderStatus',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            }, {
                name: 'VendorOrders.makeSettlement',
                op: 'and',
                value: 0,
            }, {
                name: 'orderProduct.cancelRequestStatus',
                op: 'raw',
                sign: '!=',
                value: 1,
            });
            if (vendorIds && vendorIds !== undefined) {
                whereConditions.push({
                    name: 'vendor.vendorId',
                    op: 'IN',
                    value: vendorIds.split(','),
                });
            }
            if (orderStatus && orderStatus !== undefined) {
                whereConditions.push({
                    name: 'VendorOrders.subOrderStatusId',
                    op: 'IN',
                    value: orderStatus.split(','),
                });
            }
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`orderDetail`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`orderDetail`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            if (amountFrom && amountFrom !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`total`',
                    op: 'raw',
                    sign: '>=',
                    value: amountFrom,
                });
            }
            if (amountTo && amountTo !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`total`',
                    op: 'raw',
                    sign: '<=',
                    value: amountTo,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['vendor.companyName', 'orderProduct.orderProductPrefixId'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderCount = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successCount = {
                    status: 1,
                    message: 'Successfully got the vendor order count.',
                    data: orderCount,
                };
                return response.status(200).send(successCount);
            }
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderResponse = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const defCommission = (value.commission && value.commission > 0) ? value.commission : 0;
                const commission = value.total * (defCommission / 100);
                temp.CommissionAmount = commission.toFixed(2);
                temp.NetAmount = value.total - temp.CommissionAmount;
                return temp;
            }));
            const paymentListDetails = yield Promise.all(orderResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order list.',
                data: paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/order-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('customerName')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(5, routing_controllers_1.QueryParam('count')), tslib_1.__param(6, routing_controllers_1.Req()), tslib_1.__param(7, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-detail'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('orderId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-order-log-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('vendorOrderId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderLogList", null);
tslib_1.__decorate([
    routing_controllers_1.Put('make-archive/:orderId'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('orderId')), tslib_1.__param(1, routing_controllers_1.BodyParam('archiveFlag')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "makeArchive", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-export-pdf'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('orderId')), tslib_1.__param(1, routing_controllers_1.QueryParam('vendorId')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderExportPdf", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-order-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('vendorIds')), tslib_1.__param(4, routing_controllers_1.QueryParam('orderStatus')),
    tslib_1.__param(5, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(6, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(7, routing_controllers_1.QueryParam('amountFrom')), tslib_1.__param(8, routing_controllers_1.QueryParam('amountTo')),
    tslib_1.__param(9, routing_controllers_1.QueryParam('count')), tslib_1.__param(10, routing_controllers_1.Req()), tslib_1.__param(11, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderListtt", null);
VendorOrderController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/admin-vendor-order'),
    tslib_1.__metadata("design:paramtypes", [VendorOrderService_1.VendorOrdersService,
        OrderService_1.OrderService,
        OrderProductService_1.OrderProductService,
        VendorService_1.VendorService,
        ProductService_1.ProductService,
        ProductImageService_1.ProductImageService,
        VendorOrderLogService_1.VendorOrderLogService,
        OrderStatusService_1.OrderStatusService,
        PdfService_1.PdfService,
        SettingService_1.SettingService,
        S3Service_1.S3Service,
        VendorInvoiceService_1.VendorInvoiceService,
        VendorInvoiceItemService_1.VendorInvoiceItemService,
        VendorProductService_1.VendorProductService,
        ImageService_1.ImageService])
], VendorOrderController);
exports.VendorOrderController = VendorOrderController;
//# sourceMappingURL=VendorOrderController.js.map