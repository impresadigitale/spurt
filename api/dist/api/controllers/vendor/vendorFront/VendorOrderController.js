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
const VendorOrderService_1 = require("../../../services/VendorOrderService");
const OrderService_1 = require("../../../services/OrderService");
const OrderProductService_1 = require("../../../services/OrderProductService");
const ProductService_1 = require("../../../services/ProductService");
const ProductImageService_1 = require("../../../services/ProductImageService");
const PluginService_1 = require("../../../services/PluginService");
const VendorOrderLogService_1 = require("../../../services/VendorOrderLogService");
const VendorProductService_1 = require("../../../services/VendorProductService");
const VendorOrderLog_1 = require("../../../models/VendorOrderLog");
const PdfService_1 = require("../../../services/PdfService");
const CountryService_1 = require("../../../services/CountryService");
const zoneService_1 = require("../../../services/zoneService");
const S3Service_1 = require("../../../services/S3Service");
const ImageService_1 = require("../../../services/ImageService");
const SettingService_1 = require("../../../services/SettingService");
const DeliveryAllocationService_1 = require("../../../services/DeliveryAllocationService");
const env_1 = require("../../../../env");
const VendorOrderArchive_1 = require("../../../models/VendorOrderArchive");
const VendorOrderArchiveLog_1 = require("../../../models/VendorOrderArchiveLog");
const VendorOrderArchiveLogService_1 = require("../../../services/VendorOrderArchiveLogService");
const VendorOrderArchiveService_1 = require("../../../services/VendorOrderArchiveService");
const VendorOrders_1 = require("../../../models/VendorOrders");
const OrderStatusService_1 = require("../../../services/OrderStatusService");
const OrderProductLogService_1 = require("../../../services/OrderProductLogService");
const EmailTemplateService_1 = require("../../../services/EmailTemplateService");
const OrderProductLog_1 = require("../../../models/OrderProductLog");
const moment_1 = tslib_1.__importDefault(require("moment"));
const fs = tslib_1.__importStar(require("fs"));
const mail_services_1 = require("../../../../auth/mail.services");
const VendorPaymentService_1 = require("../../../services/VendorPaymentService");
const VendorPaymentArchiveService_1 = require("../../../services/VendorPaymentArchiveService");
const VendorInvoiceService_1 = require("../../../services/VendorInvoiceService");
const VendorInvoiceItemService_1 = require("../../../services/VendorInvoiceItemService");
const VendorPaymentArchive_1 = require("../../../models/VendorPaymentArchive");
const VendorService_1 = require("../../../services/VendorService");
const CustomerService_1 = require("../../../services/CustomerService");
const to_words_1 = require("to-words");
let VendorOrderController = class VendorOrderController {
    constructor(vendorOrdersService, orderService, orderProductService, pluginService, vendorProductService, productImageService, vendorOrderLogService, productService, pdfService, countryService, zoneService, s3Service, vendorOrderArchiveLogService, vendorOrderArchiveService, orderStatusService, orderProductLogService, emailTemplateService, vendorPaymentService, vendorPaymentArchiveService, vendorInvoiceService, vendorInvoiceItemService, vendorService, imageService, settingService, customerService, deliveryAllocationService) {
        this.vendorOrdersService = vendorOrdersService;
        this.orderService = orderService;
        this.orderProductService = orderProductService;
        this.pluginService = pluginService;
        this.vendorProductService = vendorProductService;
        this.productImageService = productImageService;
        this.vendorOrderLogService = vendorOrderLogService;
        this.productService = productService;
        this.pdfService = pdfService;
        this.countryService = countryService;
        this.zoneService = zoneService;
        this.s3Service = s3Service;
        this.vendorOrderArchiveLogService = vendorOrderArchiveLogService;
        this.vendorOrderArchiveService = vendorOrderArchiveService;
        this.orderStatusService = orderStatusService;
        this.orderProductLogService = orderProductLogService;
        this.emailTemplateService = emailTemplateService;
        this.vendorPaymentService = vendorPaymentService;
        this.vendorPaymentArchiveService = vendorPaymentArchiveService;
        this.vendorInvoiceService = vendorInvoiceService;
        this.vendorInvoiceItemService = vendorInvoiceItemService;
        this.vendorService = vendorService;
        this.imageService = imageService;
        this.settingService = settingService;
        this.customerService = customerService;
        this.deliveryAllocationService = deliveryAllocationService;
    }
    // Recent order List API
    /**
     * @api {get} /api/vendor-order/recent-order-list Recent Vendor Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get recent order list",
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
     * @apiSampleRequest /api/vendor-order/recent-order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorRecentOrderList(limit, offset, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'total', 'createdDate'];
            const WhereConditions = [
                {
                    name: 'vendorId',
                    op: 'where',
                    value: request.user.vendorId,
                },
                {
                    name: 'subOrderStatusId',
                    op: 'where',
                    value: status,
                },
                {
                    name: 'paymentProcess',
                    op: 'where',
                    value: 1,
                },
            ];
            const search = [];
            const relation = ['orderDetail'];
            const orderList = yield this.vendorOrdersService.list(limit, offset, select, relation, search, WhereConditions, count);
            if (count) {
                const Response = {
                    status: 1,
                    message: 'Successfully got count.',
                    data: orderList,
                };
                return response.status(200).send(Response);
            }
            const ordersList = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const order = yield this.orderService.findOrder({
                    where: { orderId: value.orderId },
                    select: ['orderId', 'orderPrefixId', 'customerId', 'shippingFirstname', 'shippingCountry', 'shippingCity', 'currencySymbolLeft', 'currencySymbolRight'],
                });
                const orderStatus = yield this.orderStatusService.findOne({
                    where: { orderStatusId: value.subOrderStatusId },
                    select: ['name'],
                });
                const temp = value;
                temp.orderPrefixId = order.orderPrefixId;
                temp.productTotal = value.total;
                temp.customerFirstName = order.shippingFirstname;
                temp.city = order.shippingCity;
                temp.country = order.shippingCountry;
                temp.currencySymbolLeft = order.currencySymbolLeft;
                temp.currencySymbolRight = order.currencySymbolRight;
                if (orderStatus) {
                    temp.orderStatusName = orderStatus.name;
                }
                return temp;
            }));
            const results = yield Promise.all(ordersList);
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
     * @api {get} /api/vendor-order/order-detail/:vendorOrderId  Order Detail API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
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
     * @apiSampleRequest /api/vendor-order/order-detail/:vendorOrderId
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderDetail(vendorOrderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.vendorOrdersService.findOne({
                where: { vendorOrderId, vendorId: request.user.vendorId }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total', 'createdDate', 'trackingUrl', 'trackingNo'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid order',
                };
                return response.status(400).send(errorResponse);
            }
            orderData.productList = yield this.orderProductService.find({ where: { orderProductId: orderData.orderProductId }, select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'skuName', 'varientName', 'orderProductPrefixId'] }).then((val) => {
                const vendorOrder = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const ProductImage = yield this.productImageService.findOne({ where: { productId: value.productId, defaultImage: 1 } });
                    const temp = value;
                    if (ProductImage) {
                        temp.image = ProductImage.image;
                        temp.containerName = ProductImage.containerName;
                    }
                    return temp;
                }));
                const results = Promise.all(vendorOrder);
                return results;
            });
            const order = yield this.orderService.findOrder({
                where: { orderId: orderData.orderId },
                select: ['shippingFirstname', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingCountry', 'currencySymbolLeft', 'currencySymbolRight', 'shippingZone', 'paymentMethod', 'paymentStatus', 'orderPrefixId'],
            });
            const plugin = yield this.pluginService.findOne({ where: { id: order.paymentMethod } });
            const orderStatusData = yield this.orderStatusService.findOne({
                where: { orderStatusId: orderData.subOrderStatusId },
                select: ['name', 'colorCode'],
            });
            const deliveryAllocation = yield this.deliveryAllocationService.findOne({
                where: { vendorOrderId },
                select: ['deliveryPersonId'],
            });
            if (deliveryAllocation) {
                orderData.deliveryPersonId = deliveryAllocation.deliveryPersonId;
            }
            else {
                orderData.deliveryPersonId = 0;
            }
            orderData.customerFirstName = order.shippingFirstname;
            orderData.shippingAddress1 = order.shippingAddress1;
            orderData.shippingAddress2 = order.shippingAddress2;
            orderData.shippingCity = order.shippingCity;
            orderData.shippingPostcode = order.shippingPostcode;
            orderData.shippingCountry = order.shippingCountry;
            orderData.shippingZone = order.shippingZone;
            orderData.orderPrefixId = order.orderPrefixId;
            if (orderStatusData) {
                orderData.orderStatusName = orderStatusData.name;
                orderData.statusColorCode = orderStatusData.colorCode;
            }
            if (plugin) {
                orderData.paymentMethod = plugin.pluginName;
            }
            orderData.currencySymbolLeft = order.currencySymbolLeft;
            orderData.currencySymbolRight = order.currencySymbolRight;
            orderData.paymentFlag = order.paymentFlag;
            orderData.paymentStatus = order.paymentStatus;
            const successResponse = {
                status: 1,
                message: 'Successfully shown the order Detail. ',
                data: orderData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Today order count API
    /**
     * @api {get} /api/vendor-order/today-vendor-order-count Today Vendor Order Count API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today order count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/today-vendor-order-count
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    orderCount(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const orderCount = yield this.vendorOrdersService.findVendorTodayOrderCount(request.user.vendorId, todaydate);
            const successResponse = {
                status: 1,
                message: 'Successfully get Today order count',
                data: orderCount,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Order Counts
    /**
     * @api {get} /api/vendor-order/order-counts order counts
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today order count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/order-counts
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    orderCounts(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const todayOrderCount = yield this.vendorOrdersService.findVendorTodayOrderCount(request.user.vendorId, todaydate);
            const buyerAndRevenueCount = yield this.vendorOrdersService.getBuyersCount(request.user.vendorId);
            const orderList = yield this.vendorOrdersService.searchOrderList(request.user.vendorId, '', '', '', '', 0);
            const successResponse = {
                status: 1,
                message: 'Successfully get Today order count',
                data: {
                    totalOrderCount: orderList.length,
                    todayOrderCount: todayOrderCount.orderCount,
                    paidCount: buyerAndRevenueCount.salesCount,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Order API
    /**
     * @api {delete} /api/vendor-order/delete-vendor-order/:id Delete Vendor Order API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Vendor Order.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/delete-order/:id
     * @apiErrorExample {json} orderDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteOrder(orderid, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderService.find({ where: { orderId: orderid } });
            if (orderData.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid orderId',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteOrder = yield this.orderService.delete(orderid);
            if (deleteOrder) {
                const successResponse = {
                    status: 1,
                    message: 'Order Deleted Successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete Order',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // update Order Status API
    /**
     * @api {put} /api/vendor-order/update-order-status/:vendorOrderId Update OrderStatus API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} subOrderStatusId OrderStatus subOrderStatusId
     * @apiParamExample {json} Input
     * {
     *      "subOrderStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated orderStatus.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/update-order-status/:vendorOrderId
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    updateOrderStatus(vendorOrderId, subOrderStatusId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorOrder = yield this.vendorOrdersService.findOne({
                where: {
                    vendorOrderId, vendorId: request.user.vendorId,
                },
            });
            if (!vendorOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Order',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProductStatus = yield this.orderProductService.findOne({
                where: {
                    orderProductId: vendorOrder.orderProductId,
                },
            });
            if (orderProductStatus.cancelRequestStatus === 1) {
                const errorResponse = {
                    status: 0,
                    message: 'Cancel request for this product is approved, so you cannot update order status',
                };
                return response.status(400).send(errorResponse);
            }
            const vendorOrderLog = new VendorOrderLog_1.VendorOrderLog();
            vendorOrderLog.vendorId = vendorOrder.vendorId;
            vendorOrderLog.vendorOrderId = vendorOrder.vendorOrderId;
            vendorOrderLog.orderId = vendorOrder.orderId;
            vendorOrderLog.subOrderId = vendorOrder.subOrderId;
            vendorOrderLog.subOrderStatusId = subOrderStatusId;
            vendorOrderLog.total = vendorOrder.total;
            yield this.vendorOrderLogService.create(vendorOrderLog);
            vendorOrder.subOrderStatusId = subOrderStatusId;
            const orderStatusUpdate = yield this.vendorOrdersService.update(vendorOrder.vendorOrderId, vendorOrder);
            orderProductStatus.orderStatusId = subOrderStatusId;
            const orderProductStatusUpdate = yield this.orderProductService.update(orderProductStatus.orderProductId, orderProductStatus);
            const orderProductLog = new OrderProductLog_1.OrderProductLog();
            orderProductLog.model = orderProductStatusUpdate.model;
            orderProductLog.name = orderProductStatusUpdate.name;
            orderProductLog.orderId = orderProductStatusUpdate.orderId;
            orderProductLog.orderProductId = orderProductStatusUpdate.orderProductId;
            orderProductLog.orderStatusId = orderProductStatusUpdate.orderStatusId;
            orderProductLog.productId = orderProductStatusUpdate.productId;
            orderProductLog.productPrice = orderProductStatusUpdate.productPrice;
            orderProductLog.quantity = orderProductStatusUpdate.quantity;
            orderProductLog.total = orderProductStatusUpdate.total;
            orderProductLog.trace = orderProductStatusUpdate.trace;
            orderProductLog.tax = orderProductStatusUpdate.tax;
            orderProductLog.trackingNo = orderProductStatusUpdate.trackingNo;
            orderProductLog.trackingUrl = orderProductStatusUpdate.trackingUrl;
            orderProductLog.isActive = orderProductStatusUpdate.isActive;
            yield this.orderProductLogService.create(orderProductLog);
            const vendorOrderStatus = yield this.orderStatusService.findOne({
                where: {
                    orderStatusId: orderStatusUpdate.subOrderStatusId,
                },
            });
            orderStatusUpdate.subOrderStatusId = vendorOrderStatus.orderStatusId;
            orderStatusUpdate.name = vendorOrderStatus.name;
            if (orderStatusUpdate !== undefined) {
                const emailContent = yield this.emailTemplateService.findOne(21);
                const logo = yield this.settingService.findOne();
                const order = yield this.orderService.findOrder(orderProductStatus.orderId);
                const orderStatus = yield this.orderStatusService.findOne(subOrderStatusId);
                const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{title}', orderProductStatusUpdate.name).replace('{status}', orderStatus.name).replace('{order}', order.orderPrefixId);
                const redirectUrl = env_1.env.storeRedirectUrl;
                mail_services_1.MAILService.customerLoginMail(logo, message, order.email, emailContent.subject, redirectUrl);
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the order status.',
                    data: orderStatusUpdate,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to update OrderStatus.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Vendor Order Status List API
    /**
     * @api {get} /api/vendor-order/vendor-order-status-list OrderStatus List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor order status list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-order-status-list
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    orderStatusList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderStatusId', 'name', 'colorCode', 'priority', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            const WhereConditions = [];
            const orderStatusList = yield this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
            if (orderStatusList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the complete order status list.',
                    data: orderStatusList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get OrderStatus.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Vendor order List based on order status API
    /**
     * @api {get} /api/vendor-order/vendor-orders-based-status-list Vendor order List based on order status API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor order list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-orders-based-status-list
     * @apiErrorExample {json} OrderStatus error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorOrderBasedStatusList(limit, offset, keyword, status, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderStatusId', 'name', 'colorCode', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            const WhereConditions = [];
            const orderStatusList = yield this.orderStatusService.list(limit, offset, select, search, WhereConditions, count);
            const promise = orderStatusList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const selectOrder = [
                    'VendorOrders.vendorOrderId as vendorOrderId',
                    'VendorOrders.subOrderId as subOrderId',
                    'orderDetail.createdDate as createdDate',
                    'VendorOrders.subOrderStatusId as subOrderStatusId',
                    'orderDetail.createdDate as createdDate',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
                    'orderDetail.shippingFirstname as firstName',
                    'orderDetail.paymentStatus as paymentStatus',
                    'VendorOrders.total as total',
                    'orderProduct.discountAmount as discountAmount',
                    'orderProduct.discountedAmount as discountedAmount',
                    'orderProduct.orderProductPrefixId as orderProductPrefixId',
                    'orderDetail.shippingAddress1 as shippingAdress1',
                    'orderDetail.shippingCity as shippingCity',
                    'orderDetail.shippingZone as shippingZone',
                    'orderDetail.shippingCountry as shippingCountry'
                ];
                const relations = [
                    {
                        tableName: 'VendorOrders.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'VendorOrders.orderProduct',
                        aliasName: 'orderProduct',
                    },
                ];
                const groupBy = [];
                const whereConditions = [];
                whereConditions.push({
                    name: 'VendorOrders.vendorId',
                    op: 'and',
                    value: request.user.vendorId,
                }, {
                    name: 'orderDetail.paymentProcess',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'VendorOrders.subOrderStatusId',
                    op: 'and',
                    value: value.orderStatusId,
                });
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'orderDetail.createdDate',
                    order: 'DESC',
                });
                const orderList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, selectOrder, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                const order = orderList.map((valuee) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const tempVal = valuee;
                    tempVal.createdDate = moment_1.default.utc(value.createdDate).local().format('YYYY-MM-DD');
                    return tempVal;
                }));
                const orders = yield Promise.all(order);
                temp.vendorOrders = orders;
                temp.orderCount = orderList.length;
                return temp;
            }));
            const results = yield Promise.all(promise);
            if (results) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the complete order status list.',
                    data: results,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // order log List API
    /**
     * @api {get} /api/vendor-order/vendorOrderLoglist Vendor Order Log List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor order log list",
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
     * @apiSampleRequest /api/vendor-order/vendorOrderLoglist
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
    //  Top Selling Product List API
    /**
     * @api {get} /api/vendor-order/top-selling-productlist  Top selling ProductList API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> thisWeek 2-> thisMonth 3-> thisYear
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top selling product..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-order/top-selling-productlist
     * @apiErrorExample {json} top selling product error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    topSellingProductList(duration, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.vendorProductService.topProductSelling(request.user.vendorId, duration, 4);
            const promise = data.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const product = yield this.productService.findOne({
                    select: ['productId', 'price', 'name'],
                    where: { productId: result.product },
                });
                const temp = result;
                temp.product = product;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get Top Selling Product..!',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    //  update shipping information API
    /**
     * @api {post} /api/vendor-order/update-shipping-information   update shipping information API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId VendorOrderId
     * @apiParam (Request body) {String} trackingUrl shipping tracking url
     * @apiParam (Request body) {String} trackingNo shipping tracking no
     * @apiParamExample {json} Input
     * {
     *   "orderId" : "",
     *   "trackingUrl" : "",
     *   "trackingNo" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated shipping information.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/update-shipping-information
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    updateShippingInformation(vendorOrderId, trackingUrl, trackingNo, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updateOrder = yield this.vendorOrdersService.findOne({ where: { vendorOrderId, vendorId: request.user.vendorId } });
            if (!updateOrder) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid Vendor Order',
                };
                return response.status(400).send(errResponse);
            }
            const updateOrderProduct = yield this.orderProductService.findOne(updateOrder.orderProductId);
            if (updateOrderProduct.cancelRequestStatus === 1) {
                const errorResponse = {
                    status: 0,
                    message: 'Cancel request for this product is approved, so you cannot update order status',
                };
                return response.status(400).send(errorResponse);
            }
            updateOrder.trackingUrl = trackingUrl;
            updateOrder.trackingNo = trackingNo;
            const orderSave = yield this.vendorOrdersService.create(updateOrder);
            updateOrderProduct.trackingUrl = trackingUrl;
            updateOrderProduct.trackingNo = trackingNo;
            yield this.orderProductService.createData(updateOrderProduct);
            if (orderSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated Shipping Information',
                    data: orderSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update Shipping Information',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    //  Order Export PDF API
    /**
     * @api {get} /api/vendor-order/order-export-pdf  Order Export PDF API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiParamExample {json} Input
     * {
     *      "vendorOrderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-order/order-export-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderExportPdf(vendorOrderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.vendorOrdersService.findOne({
                where: { vendorOrderId, vendorId: request.user.vendorId }, select: ['vendorOrderId', 'orderId', 'vendorId', 'subOrderId', 'subOrderStatusId', 'orderProductId', 'total', 'createdDate'],
            });
            if (!orderData) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid Vendor Order',
                };
                return response.status(400).send(errResponse);
            }
            orderData.productList = yield this.orderProductService.find({ where: { orderProductId: orderData.orderProductId }, select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount'] }).then((val) => {
                const vendorOrder = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const ProductImage = yield this.productImageService.findOne({ where: { productId: value.productId, defaultImage: 1 } });
                    const temp = value;
                    if (ProductImage) {
                        temp.image = ProductImage.image;
                        temp.containerName = ProductImage.containerName;
                    }
                    if (value.taxType === 2) {
                        temp.taxValueInAmount = (value.basePrice * (value.taxValue / 100)).toFixed(2);
                    }
                    else {
                        temp.taxValueInAmount = value.taxValue;
                    }
                    return temp;
                }));
                const results = Promise.all(vendorOrder);
                return results;
            });
            const order = yield this.orderService.findOrder({
                where: { orderId: orderData.orderId },
                select: ['invoicePrefix', 'invoiceNo', 'orderPrefixId', 'shippingFirstname', 'shippingLastname', 'shippingAddress1', 'shippingAddress2', 'shippingCity', 'shippingPostcode', 'shippingCountry',
                    'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity',
                    'paymentPostcode', 'paymentCountry', 'currencySymbolLeft', 'currencySymbolRight', 'shippingZone', 'paymentMethod'],
            });
            const plugin = yield this.pluginService.findOne({ where: { id: order.paymentMethod } });
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
            orderData.shippingFirstname = order.shippingFirstname;
            orderData.shippingLastname = order.shippingLastname;
            orderData.shippingAddress1 = order.shippingAddress1;
            orderData.shippingAddress2 = order.shippingAddress2;
            orderData.shippingCity = order.shippingCity;
            orderData.shippingPostcode = order.shippingPostcode;
            orderData.paymentFirstname = order.paymentFirstname;
            orderData.paymentLastname = order.paymentLastname;
            orderData.paymentAddress1 = order.paymentAddress1;
            orderData.paymentAddress2 = order.paymentAddress2;
            orderData.paymentCity = order.paymentCity;
            orderData.paymentPostcode = order.paymentPostcode;
            orderData.paymentMethod = plugin.pluginName;
            orderData.symbolLeft = order.currencySymbolLeft;
            orderData.symbolRight = order.currencySymbolRight;
            orderData.invoiceNo = order.invoiceNo;
            orderData.invoicePrefix = order.invoicePrefix;
            orderData.orderPrefixId = order.orderPrefixId;
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
    // Make Vendor Order Archive API
    /**
     * @api {post} /api/vendor-order/make-vendor-order-archive Make Vendor Order Archive API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId Vendor Order Id
     * @apiParamExample {json} Input
     * {
     *   "vendorOrderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Archive",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/make-vendor-order-archive
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    makeArchive(vendorOrderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorOrder = yield this.vendorOrdersService.findOne({
                where: {
                    vendorOrderId, vendorId: request.user.vendorId,
                },
            });
            if (!vendorOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Order',
                };
                return response.status(400).send(errorResponse);
            }
            const newVendorOrderArchive = new VendorOrderArchive_1.VendorOrderArchive();
            newVendorOrderArchive.vendorId = vendorOrder.vendorId;
            newVendorOrderArchive.orderId = vendorOrder.orderId;
            newVendorOrderArchive.subOrderId = vendorOrder.subOrderId;
            newVendorOrderArchive.subOrderStatusId = vendorOrder.subOrderStatusId;
            newVendorOrderArchive.order_product_Id = vendorOrder.orderProductId;
            newVendorOrderArchive.total = vendorOrder.total;
            newVendorOrderArchive.commission = vendorOrder.commission;
            newVendorOrderArchive.trackingUrl = vendorOrder.trackingUrl;
            newVendorOrderArchive.trackingNo = vendorOrder.trackingNo;
            const archive = yield this.vendorOrderArchiveService.create(newVendorOrderArchive);
            const vendorOrderLog = yield this.vendorOrderLogService.find({
                where: {
                    vendorOrderId,
                },
            });
            const arr = [];
            for (const data of vendorOrderLog) {
                const newVendorOrderArchiveLog = new VendorOrderArchiveLog_1.VendorOrderArchiveLog();
                newVendorOrderArchiveLog.vendorOrderArchiveId = archive.vendorOrderArchiveId;
                newVendorOrderArchiveLog.vendorId = data.vendorId;
                newVendorOrderArchiveLog.orderId = data.orderId;
                newVendorOrderArchiveLog.subOrderId = data.subOrderId;
                newVendorOrderArchiveLog.subOrderStatusId = data.subOrderStatusId;
                newVendorOrderArchiveLog.order_product_Id = data.orderProductId;
                newVendorOrderArchiveLog.total = data.total;
                newVendorOrderArchiveLog.commission = data.commission;
                newVendorOrderArchiveLog.trackingUrl = data.trackingUrl;
                newVendorOrderArchiveLog.trackingNo = data.trackingNo;
                arr.push(newVendorOrderArchiveLog);
            }
            yield this.vendorOrderArchiveLogService.create(arr);
            const vendorPayment = yield this.vendorPaymentService.findOne({
                where: {
                    vendorOrderId,
                },
            });
            if (vendorPayment) {
                const newVendorPaymentArchive = new VendorPaymentArchive_1.VendorPaymentArchive();
                newVendorPaymentArchive.vendorId = vendorPayment.vendorId;
                newVendorPaymentArchive.vendorOrderId = archive.vendorOrderArchiveId;
                newVendorPaymentArchive.vendorOrderArchive = 1;
                newVendorPaymentArchive.paymentItemId = vendorPayment.paymentItemId;
                newVendorPaymentArchive.amount = vendorPayment.amount;
                newVendorPaymentArchive.commissionAmount = vendorPayment.commissionAmount;
                yield this.vendorPaymentArchiveService.create(newVendorPaymentArchive);
            }
            yield this.vendorOrdersService.delete(vendorOrder);
            const successResponse = {
                status: 1,
                message: 'Successfully archived',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Revoke Vendor Order Archive API
    /**
     * @api {post} /api/vendor-order/revoke-vendor-order-archive Revoke Vendor Order Archive API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderArchiveId Vendor Order Archive Id
     * @apiParamExample {json} Input
     * {
     *   "vendorOrderArchiveId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Revoked Archive",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/revoke-vendor-order-archive
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    revokeArchive(vendorOrderArchiveId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorOrderArchive = yield this.vendorOrderArchiveService.findOne({
                where: {
                    vendorOrderArchiveId,
                },
            });
            if (!vendorOrderArchive) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid Vendor Order Archive Id',
                };
                return response.status(400).send(errorResponse);
            }
            const newVendorOrders = new VendorOrders_1.VendorOrders();
            newVendorOrders.vendorId = vendorOrderArchive.vendorId;
            newVendorOrders.orderId = vendorOrderArchive.orderId;
            newVendorOrders.subOrderId = vendorOrderArchive.subOrderId;
            newVendorOrders.subOrderStatusId = vendorOrderArchive.subOrderStatusId;
            newVendorOrders.orderProductId = vendorOrderArchive.orderProductId;
            newVendorOrders.total = vendorOrderArchive.total;
            newVendorOrders.commission = vendorOrderArchive.commission;
            newVendorOrders.trackingUrl = vendorOrderArchive.trackingUrl;
            newVendorOrders.trackingNo = vendorOrderArchive.trackingNo;
            const vendorOrders = yield this.vendorOrdersService.create(newVendorOrders);
            const vendorOrderArchiveLog = yield this.vendorOrderArchiveLogService.find({
                where: {
                    vendorOrderArchiveId,
                },
            });
            const arr = [];
            for (const data of vendorOrderArchiveLog) {
                const newVendorOrderLog = new VendorOrderLog_1.VendorOrderLog();
                newVendorOrderLog.vendorOrderId = vendorOrders.vendorOrderId;
                newVendorOrderLog.vendorId = data.vendorId;
                newVendorOrderLog.orderId = data.orderId;
                newVendorOrderLog.subOrderId = data.subOrderId;
                newVendorOrderLog.subOrderStatusId = data.subOrderStatusId;
                newVendorOrderLog.total = data.total;
                arr.push(newVendorOrderLog);
            }
            yield this.vendorOrderLogService.create(arr);
            yield this.vendorOrderArchiveService.delete(vendorOrderArchive);
            const successResponse = {
                status: 1,
                message: 'Successfully archived',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Archive Order List API
    /**
     * @api {get} /api/vendor-order/archive-order-list  Archive Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got archive order list",
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
     * @apiSampleRequest /api/vendor-order/archive-order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    archiveOrderList(limit, offset, keyword, startDate, endDate, deliverylist, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorOrderArchive.vendorOrderArchiveId as vendorOrderArchiveId',
                'VendorOrderArchive.orderId as orderId',
                'VendorOrderArchive.vendorId as vendorId',
                'VendorOrderArchive.subOrderId as subOrderId',
                'VendorOrderArchive.subOrderStatusId as subOrderStatusId',
                'vendorOrderStatus.name as orderStatusName',
                'vendorOrderStatus.colorCode as orderColorCode',
                'order.orderStatusId as orderStatusId',
                'order.createdDate as createdDate',
                'order.currencySymbolLeft as currencySymbolLeft',
                'order.currencySymbolRight as currencySymbolRight',
                'order.shippingFirstname as customerFirstName',
                'order.paymentStatus as paymentStatus',
                'VendorOrderArchive.total as total',
                'VendorOrderArchive.commission as commission',
                'order.isActive as isActive',
                'order.shippingCity as shippingCity',
                'order.shippingCountry as shippingCountry',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.discountedAmount as discountedAmount'
            ];
            const relations = [
                {
                    tableName: 'VendorOrderArchive.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'VendorOrderArchive.orderStatus',
                    aliasName: 'vendorOrderStatus',
                },
                {
                    tableName: 'VendorOrderArchive.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrderArchive.vendorId',
                op: 'and',
                value: request.user.vendorId,
            });
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`order`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`order`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['shipping_firstname', 'VendorOrderArchive.subOrderId'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'order.createdDate',
                order: 'DESC',
            });
            const orderArchiveList = yield this.vendorOrderArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderArchiveResponse = orderArchiveList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const defCommission = (value.commission && value.commission > 0) ? value.commission : 0;
                let commission;
                if (value.discountedAmount && value.discountedAmount !== undefined) {
                    commission = value.discountedAmount * (defCommission / 100);
                    temp.NetAmount = value.discountedAmount - commission;
                }
                else {
                    commission = value.total * (defCommission / 100);
                    temp.NetAmount = value.total - commission;
                }
                temp.CommissionAmount = commission;
                return temp;
            }));
            const paymentListDetails = yield Promise.all(orderArchiveResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order archive list.',
                data: paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Archive Order List Count API
    /**
     * @api {get} /api/vendor-order/archive-order-list-count  Archive Order list count API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got archive order list count",
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
     * @apiSampleRequest /api/vendor-order/archive-order-list-count
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    archiveOrderListCount(limit, offset, keyword, startDate, endDate, deliverylist, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorOrderArchive.vendorOrderArchiveId as vendorOrderArchiveId',
                'VendorOrderArchive.orderId as orderId',
                'VendorOrderArchive.vendorId as vendorId',
                'VendorOrderArchive.subOrderId as subOrderId',
                'VendorOrderArchive.subOrderStatusId as subOrderStatusId',
                'vendorOrderStatus.name as orderStatusName',
                'vendorOrderStatus.colorCode as orderColorCode',
                'order.orderStatusId as orderStatusId',
                'order.createdDate as createdDate',
                'order.currencySymbolLeft as currencySymbolLeft',
                'order.currencySymbolRight as currencySymbolRight',
                'order.shippingFirstname as customerFirstName',
                'order.paymentStatus as paymentStatus',
                'VendorOrderArchive.total as total',
                'VendorOrderArchive.commission as commission',
                'order.isActive as isActive',
                'order.shippingCity as shippingCity',
                'order.shippingCountry as shippingCountry',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.discountedAmount as discountedAmount'
            ];
            const relations = [
                {
                    tableName: 'VendorOrderArchive.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'VendorOrderArchive.orderStatus',
                    aliasName: 'vendorOrderStatus',
                },
                {
                    tableName: 'VendorOrderArchive.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrderArchive.vendorId',
                op: 'and',
                value: request.user.vendorId,
            });
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`order`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`order`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['shipping_firstname', 'VendorOrderArchive.subOrderId'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'order.createdDate',
                order: 'DESC',
            });
            const orderArchiveList = yield this.vendorOrderArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order archive list count.',
                data: orderArchiveList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Order List API
    /**
     * @api {get} /api/vendor-order/order-list  Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {Number} deliverylist deliverylist
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
     * @apiSampleRequest /api/vendor-order/order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    orderListtt(limit, offset, keyword, startDate, endDate, deliverylist, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'VendorOrders.subOrderId as subOrderId',
                'VendorOrders.subOrderStatusId as subOrderStatusId',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.createdDate as createdDate',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as customerFirstName',
                'orderDetail.paymentStatus as paymentStatus',
                'VendorOrders.total as total',
                'VendorOrders.commission as commission',
                'orderDetail.isActive as isActive',
                'orderDetail.shippingCity as shippingCity',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.discountedAmount as discountedAmount'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.orderStatus',
                    aliasName: 'orderStatus',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrders.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            });
            if (deliverylist && deliverylist !== 0) {
                whereConditions.push({
                    name: 'orderDetail.paymentStatus',
                    op: 'and',
                    value: 1,
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
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['shipping_firstname', 'VendorOrders.subOrderId'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderResponse = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const defCommission = (value.commission && value.commission > 0) ? value.commission : 0;
                let commission;
                if (value.discountedAmount && value.discountedAmount !== undefined) {
                    commission = value.discountedAmount * (defCommission / 100);
                    temp.NetAmount = value.discountedAmount - commission;
                }
                else {
                    commission = value.total * (defCommission / 100);
                    temp.NetAmount = value.total - commission;
                }
                temp.CommissionAmount = commission;
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
    // Bulk Archive Order Export API
    /**
     * @api {get} /api/vendor-order/bulk-archive-order-export  Bulk Archive Order Export API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiSampleRequest /api/vendor-order/bulk-archive-order-export
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    archiveOrderExportBulk(vendorId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Bulk Archive Order Archive Excel');
            // Excel sheet column define
            worksheet.columns = [
                { header: 'SubOrderId', key: 'subOrderId', size: 16, width: 15 },
                { header: 'orderDate', key: 'orderDate', size: 16, width: 15 },
                { header: 'CustomerName', key: 'customerName', size: 16, width: 15 },
                { header: 'CustomerAddress', key: 'CustomerAdress', size: 16, width: 24 },
                { header: 'OrderAmount', key: 'TotalAmount', size: 16, width: 15 },
                { header: 'CommissionAmount', key: 'CommissionAmount', size: 16, width: 15 },
                { header: 'NetAmount', key: 'NetAmount', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const rows = [];
            const select = [
                'VendorOrderArchive.vendorOrderArchiveId as vendorOrderArchiveId',
                'VendorOrderArchive.orderId as orderId',
                'VendorOrderArchive.vendorId as vendorId',
                'VendorOrderArchive.subOrderId as subOrderId',
                'order.orderStatusId as orderStatusId',
                'order.createdDate as createdDate',
                'order.currencySymbolLeft as currencySymbolLeft',
                'order.currencySymbolRight as currencySymbolRight',
                'order.shippingFirstname as customerFirstName',
                'order.paymentStatus as paymentStatus',
                'VendorOrderArchive.total as total',
                'VendorOrderArchive.commission as commission',
                'order.isActive as isActive',
                'order.shippingCity as shippingCity',
                'order.shippingCountry as shippingCountry',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.discountedAmount as discountedAmount'
            ];
            const relations = [
                {
                    tableName: 'VendorOrderArchive.order',
                    aliasName: 'order',
                },
                {
                    tableName: 'VendorOrderArchive.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrderArchive.vendorId',
                op: 'and',
                value: vendorId,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'order.createdDate',
                order: 'DESC',
            });
            const orderArchiveList = yield this.vendorOrderArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            for (const val of orderArchiveList) {
                const defCommission = (val.commission && val.commission > 0) ? val.commission : 0;
                let commission;
                let CommissionAmount;
                let netAmount;
                if (val.discountedAmount) {
                    commission = val.discountedAmount * (defCommission / 100);
                    CommissionAmount = commission;
                    netAmount = val.discountedAmount - commission;
                }
                else {
                    commission = val.total * (defCommission / 100);
                    CommissionAmount = commission;
                    netAmount = val.total - commission;
                }
                if (val.currencySymbolLeft !== undefined) {
                    rows.push([val.subOrderId, val.createdDate, val.customerFirstName, val.shippingCity + ',' + val.shippingCountry, val.currencySymbolLeft + (parseFloat(val.total) + parseFloat(val.discountAmount)),
                        val.currencySymbolLeft + CommissionAmount, val.currencySymbolLeft + netAmount]);
                }
                else if (val.currencySymbolRight !== undefined) {
                    rows.push([val.subOrderId, val.createdDate, val.customerFirstName, val.shippingCity + ',' + val.shippingCountry, (parseFloat(val.total) + parseFloat(val.discountAmount)) + val.currencySymbolRight,
                        CommissionAmount + val.currencySymbolLeft, netAmount + val.currencySymbolLeft]);
                }
                else {
                    rows.push([val.subOrderId, val.createdDate, val.customerFirstName, val.shippingCity + ',' + val.shippingCountry, (parseFloat(val.total) + parseFloat(val.discountAmount)),
                        CommissionAmount, netAmount]);
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './VendorOrderArchiveExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // Archive Order Export API
    /**
     * @api {get} /api/vendor-order/archive-order-export  Archive Order Export API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} vendorOrderArchiveId vendorOrderArchiveId
     * @apiSampleRequest /api/vendor-order/archive-order-export
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    archiveOrderExport(vendorOrderArchiveId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Order Archive Excel');
            // Excel sheet column define
            const splitOrderArchive = vendorOrderArchiveId.split(',');
            for (const record of splitOrderArchive) {
                const dataId = yield this.vendorOrderArchiveService.findOne({ where: { vendorOrderArchiveId: record, vendorId: request.user.vendorId } });
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid ArchiveId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            worksheet.columns = [
                { header: 'SubOrderId', key: 'subOrderId', size: 16, width: 15 },
                { header: 'orderDate', key: 'orderDate', size: 16, width: 15 },
                { header: 'ArchiveDate', key: 'archiveDate', size: 16, width: 15 },
                { header: 'CustomerName', key: 'customerName', size: 16, width: 15 },
                { header: 'CustomerAddress', key: 'CustomerAdress', size: 16, width: 24 },
                { header: 'OrderAmount', key: 'TotalAmount', size: 16, width: 15 },
                { header: 'CommissionAmount', key: 'CommissionAmount', size: 16, width: 15 },
                { header: 'NetAmount', key: 'NetAmount', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const rows = [];
            for (const val of splitOrderArchive) {
                const orderArchive = yield this.vendorOrderArchiveService.findOne({ where: { vendorOrderArchiveId: val } });
                const order = yield this.orderService.findOrder({ where: { orderId: orderArchive.orderId } });
                const orderProduct = yield this.orderProductService.findOne({ where: { orderProductId: orderArchive.order_product_Id } });
                const defCommission = (orderArchive.commission && orderArchive.commission > 0) ? orderArchive.commission : 0;
                let commission;
                let CommissionAmount;
                let netAmount;
                if (orderProduct.discountedAmount) {
                    commission = orderProduct.discountedAmount * (defCommission / 100);
                    CommissionAmount = commission;
                    netAmount = orderProduct.discountedAmount - commission;
                }
                else {
                    commission = orderArchive.total * (defCommission / 100);
                    CommissionAmount = commission;
                    netAmount = orderArchive.total - commission;
                }
                if (order.currencySymbolLeft !== undefined) {
                    rows.push([orderArchive.subOrderId, order.createdDate, orderArchive.createdDate, order.shippingFirstname, order.shippingCity + ',' + order.shippingCountry, order.currencySymbolLeft + (parseFloat(orderArchive.total) + parseFloat(orderProduct.discountAmount)),
                        order.currencySymbolLeft + CommissionAmount, order.currencySymbolLeft + netAmount]);
                }
                else if (order.currencySymbolRight !== undefined) {
                    rows.push([orderArchive.subOrderId, order.createdDate, orderArchive.createdDate, order.shippingFirstname, order.shippingCity + ',' + order.shippingCountry, (parseFloat(orderArchive.total) + parseFloat(orderProduct.discountAmount)) + order.currencySymbolRight,
                        CommissionAmount + order.currencySymbolLeft, netAmount + order.currencySymbolLeft]);
                }
                else {
                    rows.push([orderArchive.subOrderId, order.createdDate, orderArchive.createdDate, order.shippingFirstname, order.shippingCity + ',' + order.shippingCountry, (parseFloat(orderArchive.total) + parseFloat(orderProduct.discountAmount)),
                        CommissionAmount, netAmount]);
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './VendorOrderArchiveExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // Cancel Order List API
    /**
     * @api {get} /api/vendor-order/cancel-order-list  Cancel Order list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got cancel order list",
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
     * @apiSampleRequest /api/vendor-order/cancel-order-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    cancelorderListtt(limit, offset, keyword, startDate, endDate, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'VendorOrders.subOrderId as subOrderId',
                'VendorOrders.subOrderStatusId as subOrderStatusId',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
                'orderDetail.orderStatusId as orderStatusId',
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
                'orderProduct.orderProductId as orderProductId',
                'orderProduct.name as name',
                'orderProduct.cancelRequest as cancelRequest',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
                'orderProduct.cancelReason as cancelReason',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.discountedAmount as discountedAmount',
                'orderProduct.cancelReasonDescription as cancelReasonDescription'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.orderStatus',
                    aliasName: 'orderStatus',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrders.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderProduct.cancelRequest',
                op: 'and',
                value: 1,
            });
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
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['shipping_firstname', 'orderProduct.orderProductPrefixId'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderListCount = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successRes = {
                    status: 1,
                    message: 'Successfully got the cancel request count.',
                    data: orderListCount,
                };
                return response.status(200).send(successRes);
            }
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const orderResponse = orderList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const defCommission = (value.commission && value.commission > 0) ? value.commission : 0;
                let commission;
                if (value.discountedAmount && value.discountedAmount !== undefined) {
                    commission = value.discountedAmount * (defCommission / 100);
                    temp.NetAmount = value.discountedAmount - commission;
                }
                else {
                    commission = value.total * (defCommission / 100);
                    temp.NetAmount = value.total - commission;
                }
                temp.CommissionAmount = commission;
                return temp;
            }));
            const paymentListDetails = yield Promise.all(orderResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete cancel order list.',
                data: paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // update Vendor Order Cancel Request Status API
    /**
     * @api {put} /api/vendor-order/update-vendor-order-cancel-request/:orderProductId Update Vendor Order Cancel Request Status API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} cancelStatusId send 1 -> approved 2 ->rejected
     * @apiParamExample {json} Input
     * {
     *      "cancelStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated order cancel status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/update-vendor-order-cancel-request/:orderProductId
     * @apiErrorExample {json} Vendor Order error
     * HTTP/1.1 500 Internal Server Error
     */
    updateVendorOrderCancelStatus(orderProductId, cancelStatusId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProduct = yield this.orderProductService.findOne({
                where: {
                    orderProductId,
                },
            });
            if (!orderProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid orderProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const vendorOrder = yield this.vendorOrdersService.findOne({
                where: {
                    orderProductId, vendorId: request.user.vendorId,
                },
            });
            if (!vendorOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid orderProductId for vendor',
                };
                return response.status(400).send(errorResponse);
            }
            orderProduct.cancelRequestStatus = cancelStatusId;
            const orderProductStatusUpdate = yield this.orderProductService.update(orderProduct.orderProductId, orderProduct);
            const order = yield this.orderService.findOrder({ where: { orderId: orderProduct.orderId } });
            const emailContent = yield this.emailTemplateService.findOne(20);
            const logo = yield this.settingService.findOne();
            let status;
            if (orderProductStatusUpdate.cancelRequestStatus === 1) {
                status = 'approved';
            }
            else if (orderProductStatusUpdate.cancelRequestStatus === 2) {
                status = 'rejected';
            }
            else if (orderProductStatusUpdate.cancelRequestStatus === 0) {
                status = 'pending';
            }
            const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{productname}', orderProduct.name).replace('{status}', status);
            const redirectUrl = env_1.env.storeRedirectUrl;
            mail_services_1.MAILService.customerLoginMail(logo, message, order.email, emailContent.subject, redirectUrl);
            if (orderProductStatusUpdate !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the order cancel status.',
                    data: orderProductStatusUpdate,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to update Order Cancel Status.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // update Bulk Order Cancel Request Status API
    /**
     * @api {get} /api/vendor-order/update-bulk-vendor-order-cancel-request Update bulk Vendor Order Cancel Request Status API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderProductId
     * @apiParam (Request body) {Number} cancelStatusId send 1 -> approved 2 ->rejected
     * @apiParamExample {json} Input
     * {
     *      "cancelStatusId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Bulk order cancel status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/update-bulk-vendor-order-cancel-request
     * @apiErrorExample {json} Vendor Order error
     * HTTP/1.1 500 Internal Server Error
     */
    updateBulkVendorOrderCancelStatus(orderProductId, cancelStatusId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProducts = orderProductId.split(',');
            const arr = [];
            for (const orderProduct of orderProducts) {
                const orderProd = yield this.orderProductService.findOne({
                    where: {
                        orderProductId: orderProduct,
                    },
                });
                if (!orderProd) {
                    arr.push(1);
                }
            }
            if (arr.length > 0) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid orderProductId',
                };
                return response.status(400).send(errorResponse);
            }
            for (const orderProduct of orderProducts) {
                const vendorOrder = yield this.vendorOrdersService.findOne({
                    where: {
                        orderProductId: orderProduct, vendorId: request.user.vendorId,
                    },
                });
                if (!vendorOrder) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid orderProductId for vendor',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const orderProduct of orderProducts) {
                const orderProdt = yield this.orderProductService.findOne({
                    where: {
                        orderProductId: orderProduct,
                    },
                });
                orderProdt.cancelRequestStatus = cancelStatusId;
                const orderProductStatusUpdate = yield this.orderProductService.update(orderProdt.orderProductId, orderProdt);
                const order = yield this.orderService.findOrder({ where: { orderId: orderProdt.orderId } });
                const emailContent = yield this.emailTemplateService.findOne(20);
                const logo = yield this.settingService.findOne();
                let status;
                if (orderProductStatusUpdate.cancelRequestStatus === 1) {
                    status = 'approved';
                }
                else if (orderProductStatusUpdate.cancelRequestStatus === 2) {
                    status = 'rejected';
                }
                else if (orderProductStatusUpdate.cancelRequestStatus === 0) {
                    status = 'pending';
                }
                const message = emailContent.content.replace('{name}', order.shippingFirstname).replace('{productname}', orderProdt.name).replace('{status}', status);
                const redirectUrl = env_1.env.storeRedirectUrl;
                mail_services_1.MAILService.customerLoginMail(logo, message, order.email, emailContent.subject, redirectUrl);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully updated the order cancel status.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Export bulk order cancel request
    /**
     * @api {get} /api/vendor-order/vendor-order-cancel-excel-list Vendor Order Cancel Excel list
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderProductId orderProductId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Vendor Order Cancel Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-order/vendor-order-cancel-excel-list
     * @apiErrorExample {json} Vendor Order Cancel Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    exportCancelRequest(orderProductId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Order Detail Sheet');
            const rows = [];
            const orderid = orderProductId.split(',');
            for (const id of orderid) {
                const dataId = yield this.orderProductService.findOne({ where: { orderProductId: id } });
                if (dataId.length === 0) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid orderProductId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Sub Order Id', key: 'subOrderId', size: 16, width: 15 },
                { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
                { header: 'Email', key: 'email', size: 16, width: 15 },
                { header: 'Product Name', key: 'productName', size: 16, width: 15 },
                { header: 'Product Price', key: 'productPrice', size: 16, width: 15 },
                { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
                { header: 'total', key: 'total', size: 16, width: 15 },
                { header: 'Order Cancel Status', key: 'cancelRequestStatus', size: 16, width: 15 },
                { header: 'Order Cancel Reason', key: 'cancelRequestReason', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const id of orderid) {
                const vendorOrder = yield this.vendorOrdersService.findOne({
                    where: {
                        orderProductId: id, vendorId: request.user.vendorId,
                    },
                });
                if (vendorOrder) {
                    const data = yield this.orderProductService.findOne(id);
                    const dataId = yield this.orderService.findOrder(data.orderId);
                    let status;
                    if (data.cancelRequestStatus === 1) {
                        status = 'approved';
                    }
                    else if (data.cancelRequestStatus === 2) {
                        status = 'rejected';
                    }
                    else if (data.cancelRequestStatus === 0) {
                        status = 'pending';
                    }
                    const right = dataId.currencySymbolRight;
                    const left = dataId.currencySymbolLeft;
                    if (left === null && right === null) {
                        rows.push([vendorOrder.subOrderId, dataId.shippingFirstname, dataId.email, data.name, data.productPrice, data.quantity, data.discountedAmount ? data.discountedAmount : data.total, data.cancelReason, status]);
                    }
                    else {
                        if (left !== undefined) {
                            rows.push([vendorOrder.subOrderId, dataId.shippingFirstname, dataId.email, data.name, data.productPrice, data.quantity, left + (data.discountedAmount ? data.discountedAmount : data.total), data.cancelReason, status]);
                        }
                        else {
                            rows.push([vendorOrder.subOrderId, dataId.shippingFirstname, dataId.email, data.name, data.productPrice, data.quantity, (data.discountedAmount ? data.discountedAmount : data.total) + right, data.cancelReason, status]);
                        }
                    }
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './OrderCancelExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // Export bulk Vendor order cancel request api
    /**
     * @api {get} /api/vendor-order/bulk-vendor-order-cancel-excel-list Bulk Order Cancel Excel list
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Bulk Order Cancel Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-order/bulk-vendor-order-cancel-excel-list
     * @apiErrorExample {json} Order Cancel Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    bulkExportVendorOrderCancelRequest(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Order Detail Sheet');
            const rows = [];
            const select = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'VendorOrders.subOrderId as subOrderId',
                'VendorOrders.subOrderStatusId as subOrderStatusId',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.createdDate as createdDate',
                'orderDetail.email as email',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as customerFirstName',
                'orderDetail.paymentStatus as paymentStatus',
                'VendorOrders.total as total',
                'VendorOrders.commission as commission',
                'orderDetail.isActive as isActive',
                'orderDetail.shippingCity as shippingCity',
                'orderDetail.shippingCountry as shippingCountry',
                'orderProduct.orderProductId as orderProductId',
                'orderProduct.cancelRequest as cancelRequest',
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
                'orderProduct.cancelReason as cancelReason',
                'orderProduct.name as name',
                'orderProduct.productPrice as productPrice',
                'orderProduct.quantity as quantity',
                'orderProduct.discountAmount as discountAmount',
                'orderProduct.discountedAmount as discountedAmount',
                'orderProduct.cancelReasonDescription as cancelReasonDescription'
            ];
            const relations = [
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.orderStatus',
                    aliasName: 'orderStatus',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorOrders.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderProduct.cancelRequest',
                op: 'and',
                value: 1,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'orderDetail.createdDate',
                order: 'DESC',
            });
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            // Excel sheet column define
            if (orderList.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'file is empty',
                };
                return response.status(400).send(errorResponse);
            }
            worksheet.columns = [
                { header: 'sub Order Id', key: 'subOrderId', size: 16, width: 15 },
                { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
                { header: 'Email', key: 'email', size: 16, width: 15 },
                { header: 'Product Name', key: 'productName', size: 16, width: 15 },
                { header: 'Product Price', key: 'productPrice', size: 16, width: 15 },
                { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
                { header: 'total', key: 'total', size: 16, width: 15 },
                { header: 'Order Cancel Status', key: 'cancelRequestStatus', size: 16, width: 15 },
                { header: 'Order Cancel Reason', key: 'cancelRequestReason', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const id of orderList) {
                let status;
                if (id.cancelRequestStatus === 1) {
                    status = 'approved';
                }
                else if (id.cancelRequestStatus === 2) {
                    status = 'rejected';
                }
                else if (id.cancelRequestStatus === 0) {
                    status = 'pending';
                }
                const right = id.currencySymbolRight;
                const left = id.currencySymbolLeft;
                if (left === null && right === null) {
                    rows.push([id.subOrderId, id.customerFirstName, id.email, id.name, id.productPrice, id.quantity, id.discountedAmount ? id.discountedAmount : id.total, id.cancelReason, status]);
                }
                else {
                    if (left !== undefined) {
                        rows.push([id.subOrderId, id.customerFirstName, id.email, id.name, id.productPrice, id.quantity, left + (id.discountedAmount ? id.discountedAmount : id.total), id.cancelReason, status]);
                    }
                    else {
                        rows.push([id.subOrderId, id.customerFirstName, id.email, id.name, id.productPrice, id.quantity, (id.discountedAmount ? id.discountedAmount : id.total) + right, id.cancelReason, status]);
                    }
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './BulkOrderCancelExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    // invoice list API
    /**
     * @api {get} /api/vendor-order/vendor-invoice-list Vendor Invoice List API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor invoice list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/vendor-invoice-list
     * @apiErrorExample {json} vendor invoice error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorInvoiceList(limit, offset, keyword, startDate, endDate, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'VendorInvoice.vendorInvoiceId as vendorInvoiceId',
                'VendorInvoice.invoiceNo as invoiceNo',
                'VendorInvoice.invoicePrefix as invoicePrefix',
                'VendorInvoice.shippingFirstname as shippingFirstname',
                'VendorInvoice.shippingLastname as shippingLastname',
                'VendorInvoice.orderId as orderId',
                'VendorInvoice.vendorId as vendorId',
                'VendorInvoice.createdDate as createdDate',
                'VendorInvoice.email as email',
                'orderDetail.orderPrefixId as orderPrefixId',
            ];
            const relations = [{
                    tableName: 'VendorInvoice.orderDetail',
                    aliasName: 'orderDetail',
                }];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'VendorInvoice.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            });
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: 'VendorInvoice.createdDate',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: 'VendorInvoice.createdDate',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (keyword && keyword !== '') {
                searchConditions.push({
                    name: ['VendorInvoice.shippingFirstname', 'VendorInvoice.shippingLastname', 'VendorInvoice.invoiceNo'],
                    value: keyword.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'VendorInvoice.createdDate',
                order: 'DESC',
            });
            if (count) {
                const orderListCount = yield this.vendorInvoiceService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const successRes = {
                    status: 1,
                    message: 'Successfully got the cancel request count.',
                    data: orderListCount,
                };
                return response.status(200).send(successRes);
            }
            const invoiceList = yield this.vendorInvoiceService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const invoiceResponse = invoiceList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const vendorOrder = yield this.vendorInvoiceItemService.findAll({
                    where: {
                        vendorInvoiceId: value.vendorInvoiceId,
                    },
                });
                let amount = parseFloat('0.00');
                for (const val of vendorOrder) {
                    const orderProduct = yield this.orderProductService.findOne({
                        where: {
                            orderProductId: val.orderProductId,
                        },
                    });
                    const amt = orderProduct.discountedAmount ? orderProduct.discountedAmount : orderProduct.total;
                    amount += parseFloat(amt);
                }
                temp.total = amount;
                temp.products = vendorOrder.length;
                return temp;
            }));
            const vendorInvoiceList = yield Promise.all(invoiceResponse);
            if (invoiceList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the vendor invoice list.',
                    data: vendorInvoiceList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get list.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    //  Order invoice export PDF API
    /**
     * @api {get} /api/vendor-order/order-invoice-export-pdf  Order Invoice Export PDF API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId orderId
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
     * @apiSampleRequest /api/vendor-order/order-invoice-export-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderInvoiceExportPdf(orderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.vendorInvoiceService.findOne({
                where: { orderId, vendorId: request.user.vendorId }, select: ['vendorInvoiceId', 'orderId', 'vendorId', 'invoiceNo', 'invoicePrefix', 'shippingFirstname', 'shippingLastname', 'total', 'createdDate'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invoice not found for this order',
                };
                return response.status(400).send(errorResponse);
            }
            const vendor = yield this.vendorService.findOne({
                select: ['vendorId', 'customerId', 'companyName', 'companyLogo', 'companyLogoPath', 'companyMobileNumber', 'companyEmailId', 'companyWebsite', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId', 'pincode', 'companyGstNumber', 'companyPanNumber', 'paymentInformation', 'commission'],
                where: { vendorId: request.user.vendorId },
            });
            const order = yield this.orderService.findOrder({
                where: { orderId: orderData.orderId },
                select: ['paymentFirstname', 'email', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'customerGstNo', 'telephone',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1', 'shippingAddress2', 'shippingCity',
                    'shippingPostcode', 'shippingCountry', 'shippingZone', 'currencySymbolLeft', 'currencySymbolRight', 'currencyCode', 'paymentMethod', 'orderPrefixId'],
            });
            let amount = parseFloat('0.00');
            orderData.productList = yield this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: orderData.vendorInvoiceId }, select: ['vendorInvoiceItemId', 'vendorInvoiceId', 'orderProductId'] }).then((val) => {
                const vendorOrder = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const orderProduct = yield this.orderProductService.findOne({ where: { orderProductId: value.orderProductId }, select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'varientName', 'skuName'] });
                    const product = yield this.productService.findOne({ select: ['sku', 'hsn'], where: { productId: orderProduct.productId } });
                    const temp = orderProduct;
                    if (orderProduct.taxType === 2) {
                        temp.taxValueInAmount = (orderProduct.basePrice * (orderProduct.taxValue / 100)).toFixed(2);
                    }
                    else {
                        temp.taxValueInAmount = orderProduct.taxValue;
                    }
                    temp.sku = product.sku;
                    temp.hsn = product.hsn;
                    const amt = orderProduct.discountedAmount ? orderProduct.discountedAmount : orderProduct.total;
                    amount += parseFloat(amt);
                    return temp;
                }));
                const results = Promise.all(vendorOrder);
                return results;
            });
            const settings = yield this.settingService.findOne();
            const country = yield this.countryService.findOne({ select: ['name'], where: { countryId: vendor.companyCountryId } });
            vendor.countryName = country ? country.name : '';
            orderData.vendor = vendor;
            const settingDetails = settings;
            orderData.symbolLeft = order.currencySymbolLeft;
            orderData.symbolRight = order.currencySymbolRight;
            orderData.currencyCode = order.currencyCode;
            orderData.orderPrefixId = order.orderPrefixId;
            orderData.paymentFirstname = order.paymentFirstname;
            orderData.paymentLastname = order.paymentLastname;
            orderData.paymentAddress1 = order.paymentAddress1;
            orderData.paymentAddress2 = order.paymentAddress2;
            orderData.paymentCity = order.paymentCity;
            orderData.paymentPostcode = order.paymentPostcode;
            orderData.paymentZone = order.paymentZone;
            orderData.paymentCountry = order.paymentCountry;
            orderData.shippingFirstname = order.shippingFirstname;
            orderData.shippingLastname = order.shippingLastname;
            orderData.shippingAddress1 = order.shippingAddress1;
            orderData.shippingAddress2 = order.shippingAddress2;
            orderData.shippingCity = order.shippingCity;
            orderData.shippingPostcode = order.shippingPostcode;
            orderData.shippingZone = order.shippingZone;
            orderData.shippingCountry = order.shippingCountry;
            orderData.customerGstNo = order.customerGstNo;
            orderData.telephone = order.telephone;
            let toWords;
            if (order.currencyCode === 'INR') {
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
    // Vendor Report List API
    /**
     * @api {get} /api/vendor-order/sales-report-list  Sales Report list API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got vendor sales report list",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-order/sales-report-list
     * @apiErrorExample {json} Vendor Order error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorSalesReportList(limit, offset, startDate, endDate, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const subOrderSelect = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'vendor.companyState as companyState',
                'VendorOrders.vendorId as vendorId',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.quantity as quantity',
                'orderProduct.name as name',
                'orderProduct.productPrice as price',
                'orderProduct.quantity as quantity',
                'orderProduct.basePrice as basePrice',
                'orderProduct.skuName as skuName',
                'orderProduct.varientName as varientName',
                'orderProduct.taxType as taxType',
                'orderProduct.taxValue as taxValue',
                'VendorOrders.total as total',
                'VendorOrders.subOrderId as subOrderId',
                'VendorOrders.commission as commission',
                'VendorOrders.createdDate as createdDate',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
                'orderDetail.paymentZone as paymentZone',
                'orderProduct.name as productName',
                'orderProduct.skuName as skuName',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
            ];
            const subOrderRelations = [
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                },
                {
                    tableName: 'VendorOrders.vendor',
                    aliasName: 'vendor',
                },
                {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'VendorOrders.orderStatus',
                    aliasName: 'orderStatus',
                },
            ];
            const subOrderWhereConditions = [];
            subOrderWhereConditions.push({
                name: 'VendorOrders.vendor_id',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            });
            if (startDate && startDate !== '') {
                subOrderWhereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                subOrderWhereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const sortOrder = [{
                    name: 'vendorOrderId',
                    order: 'DESC',
                }];
            if (count) {
                const vendorOrderCount = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, true, true);
                const countResponse = {
                    status: 1,
                    message: 'Successfully got vendor sales count.',
                    data: vendorOrderCount,
                };
                return response.status(200).send(countResponse);
            }
            const vendorOrderList = yield this.vendorOrdersService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
            const val = vendorOrderList.map((element) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = element;
                if (temp.cancelRequestStatus === 1) {
                    temp.orderStatusName = 'Cancelled';
                }
                if (element.taxType !== 0) {
                    if (element.companyState.toLowerCase() === element.paymentZone.toLowerCase()) {
                        temp.taxTypeValue = 'SGST,CGST';
                    }
                    else if (element.companyState.toLowerCase() !== element.paymentZone.toLowerCase()) {
                        temp.taxTypeValue = 'IGST';
                    }
                }
                else {
                    temp.taxTypeValue = '';
                }
                const invoice = yield this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: element.orderId, vendorId: element.vendorId } });
                temp.invoiceNo = invoice.invoiceNo;
                temp.invoicePrefix = invoice.invoicePrefix;
                return temp;
            }));
            const product = yield Promise.all(val);
            const successResponse = {
                status: 1,
                message: 'Successfully got vendor sales list.',
                data: product,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Total sales report Download
    /**
     * @api {get} /api/vendor-order/sales-report-export-list sales report excel download
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} amountFrom search by amountFrom
     * @apiParam (Request body) {String} amountTo search by amountTo
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download total sales report excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-order/sales-report-export-list
     * @apiErrorExample {json} Total sales report excel error
     * HTTP/1.1 500 Internal Server Error
     */
    totalSalesExcelView(amountFrom, startDate, endDate, amountTo, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Total Sales Export sheet');
            const rows = [];
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Order Line No', key: 'id', size: 16, width: 15 },
                { header: 'OrderDate', key: 'orderDate', size: 16, width: 15 },
                { header: 'Vendor', key: 'vendor', size: 16, width: 24 },
                { header: 'Invoice', key: 'Invoice', size: 16, width: 15 },
                { header: 'Item', key: 'Item', size: 16, width: 15 },
                { header: 'Description', key: 'Description', size: 16, width: 15 },
                { header: 'Quantity', key: 'Quantity', size: 16, width: 15 },
                { header: 'Base Value', key: 'Base Value', size: 16, width: 15 },
                { header: 'Tax', key: 'Tax', size: 16, width: 15 },
                { header: 'Tax Type', key: 'Tax Type', size: 16, width: 15 },
                { header: 'Total Value', key: 'Total', size: 16, width: 15 },
                { header: 'Order Status', key: 'Order Status', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('J1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('K1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('L1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            const select = [
                'vendor.vendorId as vendorId',
                'vendor.companyName as companyName',
                'vendor.companyState as companyState',
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'orderProduct.quantity as quantity',
                'orderProduct.name as name',
                'orderProduct.productPrice as price',
                'orderProduct.quantity as quantity',
                'orderProduct.basePrice as basePrice',
                'orderProduct.skuName as skuName',
                'orderProduct.varientName as varientName',
                'orderProduct.taxType as taxType',
                'orderProduct.taxValue as taxValue',
                'VendorOrders.total as total',
                'VendorOrders.subOrderId as subOrderId',
                'VendorOrders.commission as commission',
                'VendorOrders.createdDate as createdDate',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.paymentZone as paymentZone',
                'orderProduct.name as productName',
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
                'orderProduct.skuName as skuName',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
            ];
            const relations = [{
                    tableName: 'VendorOrders.vendor',
                    aliasName: 'vendor',
                }, {
                    tableName: 'VendorOrders.orderDetail',
                    aliasName: 'orderDetail',
                }, {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
                }, {
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
                name: 'VendorOrders.vendorId',
                op: 'and',
                value: request.user.vendorId,
            });
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`VendorOrders`.`created_date`',
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
            const sort = [{
                    name: 'vendorOrderId',
                    order: 'DESC',
                }];
            const orderList = yield this.vendorOrdersService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            let quantity = 0;
            let basePrice = 0;
            let tax = 0;
            let total = 0;
            let currencySymbolLeft = undefined;
            let currencySymbolRight = undefined;
            for (const orderData of orderList) {
                if (orderData.cancelRequestStatus === 1) {
                    orderData.orderStatusName = 'Cancelled';
                }
                if (orderData.taxType !== 0) {
                    if (orderData.companyState.toLowerCase() === orderData.paymentZone.toLowerCase()) {
                        orderData.taxTypeValue = 'SGST,CGST';
                    }
                    else if (orderData.companyState.toLowerCase() !== orderData.paymentZone.toLowerCase()) {
                        orderData.taxTypeValue = 'IGST';
                    }
                }
                else {
                    orderData.taxTypeValue = '';
                }
                const invoice = yield this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: orderData.orderId, vendorId: orderData.vendorId } });
                let taxValueInAmount;
                if (orderData.taxType === 2) {
                    taxValueInAmount = (orderData.basePrice * (orderData.taxValue / 100)).toFixed(2);
                }
                else {
                    taxValueInAmount = orderData.taxValue;
                }
                quantity += parseFloat(orderData.quantity);
                basePrice += parseFloat(orderData.basePrice);
                tax += parseFloat(taxValueInAmount);
                total += parseFloat(orderData.total);
                currencySymbolLeft = orderData.currencySymbolLeft;
                currencySymbolRight = orderData.currencySymbolRight;
                rows.push([orderData.orderProductPrefixId, orderData.createdDate, orderData.companyName, invoice.invoiceNo, orderData.skuName, orderData.name, orderData.quantity, (currencySymbolLeft ? currencySymbolLeft : '') + orderData.basePrice + (currencySymbolRight ? currencySymbolRight : ''),
                    (currencySymbolLeft ? currencySymbolLeft : '') + taxValueInAmount + (currencySymbolRight ? currencySymbolRight : ''), orderData.taxTypeValue, (currencySymbolLeft ? currencySymbolLeft : '') + orderData.total + (currencySymbolRight ? currencySymbolRight : ''), orderData.orderStatusName]);
            }
            const left = (currencySymbolLeft !== undefined) ? currencySymbolLeft : '';
            const right = (currencySymbolRight !== undefined) ? currencySymbolRight : '';
            rows.push(['', '', '', '', '', 'Grand total', quantity, (left ? left : '') + basePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + tax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + total.toFixed(2) + (right ? right : ''), '']);
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './TotalSalesReportExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
    //  Order invoice export send email PDF API
    /**
     * @api {post} /api/vendor-order/order-invoice-export-send-email-pdf  Order Invoice Export Send Email API
     * @apiGroup Vendor Order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId orderId
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
     * @apiSampleRequest /api/vendor-order/order-invoice-export-send-email-pdf
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    orderInvoiceExportSendEmailPdf(orderId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.vendorInvoiceService.findOne({
                where: { orderId, vendorId: request.user.vendorId }, select: ['vendorInvoiceId', 'orderId', 'vendorId', 'invoiceNo', 'invoicePrefix', 'shippingFirstname', 'shippingLastname', 'total', 'createdDate'],
            });
            if (!orderData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invoice not found for this order',
                };
                return response.status(400).send(errorResponse);
            }
            const vendor = yield this.vendorService.findOne({
                select: ['vendorId', 'customerId', 'companyName', 'companyLogo', 'companyLogoPath', 'companyMobileNumber', 'companyEmailId', 'companyWebsite', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId', 'pincode', 'companyGstNumber', 'companyPanNumber', 'paymentInformation', 'commission'],
                where: { vendorId: request.user.vendorId },
            });
            const customer = yield this.customerService.findOne({
                select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'username'],
                where: { id: vendor.customerId },
            });
            const order = yield this.orderService.findOrder({
                where: { orderId: orderData.orderId },
                select: ['paymentFirstname', 'email', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity', 'customerGstNo', 'telephone',
                    'paymentPostcode', 'paymentCountry', 'paymentZone', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1', 'shippingAddress2', 'shippingCity',
                    'shippingPostcode', 'shippingCountry', 'shippingZone', 'currencySymbolLeft', 'currencySymbolRight', 'currencyCode', 'paymentMethod', 'orderPrefixId'],
            });
            let amount = parseFloat('0.00');
            orderData.productList = yield this.vendorInvoiceItemService.findAll({ where: { vendorInvoiceId: orderData.vendorInvoiceId }, select: ['vendorInvoiceItemId', 'vendorInvoiceId', 'orderProductId'] }).then((val) => {
                const vendorOrder = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const orderProduct = yield this.orderProductService.findOne({ where: { orderProductId: value.orderProductId }, select: ['orderProductId', 'name', 'quantity', 'total', 'productId', 'productPrice', 'basePrice', 'taxType', 'taxValue', 'discountAmount', 'discountedAmount', 'skuName', 'varientName'] });
                    const product = yield this.productService.findOne({ select: ['sku', 'hsn'], where: { productId: orderProduct.productId } });
                    const temp = orderProduct;
                    if (orderProduct.taxType === 2) {
                        temp.taxValueInAmount = (orderProduct.basePrice * (orderProduct.taxValue / 100)).toFixed(2);
                    }
                    else {
                        temp.taxValueInAmount = orderProduct.taxValue;
                    }
                    if (orderProduct.taxType !== 0) {
                        if (vendor.companyState.toLowerCase() === order.paymentZone.toLowerCase()) {
                            temp.taxTypeValue = 'SGST,CGST';
                        }
                        else if (vendor.companyState.toLowerCase() !== order.paymentZone.toLowerCase()) {
                            temp.taxTypeValue = 'IGST';
                        }
                    }
                    else {
                        temp.taxTypeValue = 0;
                    }
                    temp.sku = product.sku;
                    temp.hsn = product.hsn;
                    const amt = orderProduct.discountedAmount ? orderProduct.discountedAmount : orderProduct.total;
                    amount += parseFloat(amt);
                    return temp;
                }));
                const results = Promise.all(vendorOrder);
                return results;
            });
            const settings = yield this.settingService.findOne();
            const country = yield this.countryService.findOne({ select: ['name'], where: { countryId: vendor.companyCountryId } });
            vendor.countryName = country ? country.name : '';
            orderData.vendor = vendor;
            const settingDetails = settings;
            orderData.symbolLeft = order.currencySymbolLeft;
            orderData.symbolRight = order.currencySymbolRight;
            orderData.currencyCode = order.currencyCode;
            orderData.orderPrefixId = order.orderPrefixId;
            orderData.paymentFirstname = order.paymentFirstname;
            orderData.paymentLastname = order.paymentLastname;
            orderData.paymentAddress1 = order.paymentAddress1;
            orderData.paymentAddress2 = order.paymentAddress2;
            orderData.paymentCity = order.paymentCity;
            orderData.paymentPostcode = order.paymentPostcode;
            orderData.paymentZone = order.paymentZone;
            orderData.paymentCountry = order.paymentCountry;
            orderData.shippingFirstname = order.shippingFirstname;
            orderData.shippingLastname = order.shippingLastname;
            orderData.shippingAddress1 = order.shippingAddress1;
            orderData.shippingAddress2 = order.shippingAddress2;
            orderData.shippingCity = order.shippingCity;
            orderData.shippingPostcode = order.shippingPostcode;
            orderData.shippingZone = order.shippingZone;
            orderData.shippingCountry = order.shippingCountry;
            orderData.customerGstNo = order.customerGstNo;
            orderData.telephone = order.telephone;
            orderData.email = order.email;
            const toWords = new to_words_1.ToWords();
            const words = toWords.convert(amount, { currency: true });
            orderData.currencyInWords = words;
            let image;
            if (env_1.env.imageserver === 's3') {
                image = yield this.s3Service.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '100', '100');
            }
            else {
                image = yield this.imageService.resizeImageBase64(settingDetails.invoiceLogo, settingDetails.invoiceLogoPath, '100', '100');
            }
            orderData.logo = image;
            const htmlData = yield this.pdfService.readHtmlToString('vendor-invoice', orderData);
            const pdfBinary = yield this.pdfService.createPDFFile(htmlData, true, '');
            const emailContent = yield this.emailTemplateService.findOne(24);
            const redirectUrl = env_1.env.storeRedirectUrl;
            const message = emailContent.content.replace('{name}', customer.firstName).replace('{orderPrefixId}', orderData.orderPrefixId);
            const logo = yield this.settingService.findOne();
            mail_services_1.MAILService.invoiceMail(logo, message, pdfBinary, customer.email, orderData, emailContent.subject, redirectUrl);
            return response.status(200).send({
                status: 1,
                message: 'Mail sent to you',
            });
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/recent-order-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('status')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorRecentOrderList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-detail/:vendorOrderId'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('vendorOrderId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/today-vendor-order-count'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderCount", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-counts'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderCounts", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-order/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "deleteOrder", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-order-status/:vendorOrderId'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('vendorOrderId')), tslib_1.__param(1, routing_controllers_1.BodyParam('subOrderStatusId')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "updateOrderStatus", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-order-status-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('status')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderStatusList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-orders-based-status-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('status')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Req()), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorOrderBasedStatusList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendorOrderLoglist'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('vendorOrderId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderLogList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/top-selling-productlist'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('duration')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "topSellingProductList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/update-shipping-information'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.BodyParam('vendorOrderId')), tslib_1.__param(1, routing_controllers_1.BodyParam('trackingUrl')), tslib_1.__param(2, routing_controllers_1.BodyParam('trackingNo')), tslib_1.__param(3, routing_controllers_1.Req()), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "updateShippingInformation", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-export-pdf'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('vendorOrderId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderExportPdf", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/make-vendor-order-archive'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.BodyParam('vendorOrderId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "makeArchive", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/revoke-vendor-order-archive'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.BodyParam('vendorOrderArchiveId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "revokeArchive", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/archive-order-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(5, routing_controllers_1.QueryParam('deliverylist')),
    tslib_1.__param(6, routing_controllers_1.QueryParam('count')), tslib_1.__param(7, routing_controllers_1.Req()), tslib_1.__param(8, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "archiveOrderList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/archive-order-list-count'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')),
    tslib_1.__param(5, routing_controllers_1.QueryParam('deliverylist')), tslib_1.__param(6, routing_controllers_1.QueryParam('count')), tslib_1.__param(7, routing_controllers_1.Req()), tslib_1.__param(8, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "archiveOrderListCount", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(5, routing_controllers_1.QueryParam('deliverylist')), tslib_1.__param(6, routing_controllers_1.QueryParam('count')), tslib_1.__param(7, routing_controllers_1.Req()), tslib_1.__param(8, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderListtt", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/bulk-archive-order-export'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('vendorId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "archiveOrderExportBulk", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/archive-order-export'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('vendorOrderArchiveId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "archiveOrderExport", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/cancel-order-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(5, routing_controllers_1.QueryParam('count')), tslib_1.__param(6, routing_controllers_1.Req()), tslib_1.__param(7, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "cancelorderListtt", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-vendor-order-cancel-request/:orderProductId'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('orderProductId')), tslib_1.__param(1, routing_controllers_1.BodyParam('cancelStatusId')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "updateVendorOrderCancelStatus", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/update-bulk-vendor-order-cancel-request'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('orderProductId')), tslib_1.__param(1, routing_controllers_1.QueryParam('cancelStatusId')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "updateBulkVendorOrderCancelStatus", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-order-cancel-excel-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('orderProductId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "exportCancelRequest", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/bulk-vendor-order-cancel-excel-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "bulkExportVendorOrderCancelRequest", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-invoice-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(5, routing_controllers_1.QueryParam('count')), tslib_1.__param(6, routing_controllers_1.Req()), tslib_1.__param(7, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorInvoiceList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-invoice-export-pdf'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('orderId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderInvoiceExportPdf", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/sales-report-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')),
    tslib_1.__param(2, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(3, routing_controllers_1.QueryParam('endDate')),
    tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Req()), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "vendorSalesReportList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/sales-report-export-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('amountFrom')),
    tslib_1.__param(1, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(2, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(3, routing_controllers_1.QueryParam('amountTo')),
    tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "totalSalesExcelView", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/order-invoice-export-send-email-pdf'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.BodyParam('orderId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorOrderController.prototype, "orderInvoiceExportSendEmailPdf", null);
VendorOrderController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/vendor-order'),
    tslib_1.__metadata("design:paramtypes", [VendorOrderService_1.VendorOrdersService,
        OrderService_1.OrderService,
        OrderProductService_1.OrderProductService,
        PluginService_1.PluginService,
        VendorProductService_1.VendorProductService,
        ProductImageService_1.ProductImageService,
        VendorOrderLogService_1.VendorOrderLogService,
        ProductService_1.ProductService,
        PdfService_1.PdfService,
        CountryService_1.CountryService,
        zoneService_1.ZoneService,
        S3Service_1.S3Service,
        VendorOrderArchiveLogService_1.VendorOrderArchiveLogService,
        VendorOrderArchiveService_1.VendorOrderArchiveService,
        OrderStatusService_1.OrderStatusService,
        OrderProductLogService_1.OrderProductLogService,
        EmailTemplateService_1.EmailTemplateService,
        VendorPaymentService_1.VendorPaymentService,
        VendorPaymentArchiveService_1.VendorPaymentArchiveService,
        VendorInvoiceService_1.VendorInvoiceService,
        VendorInvoiceItemService_1.VendorInvoiceItemService,
        VendorService_1.VendorService,
        ImageService_1.ImageService,
        SettingService_1.SettingService,
        CustomerService_1.CustomerService,
        DeliveryAllocationService_1.DeliveryAllocationService])
], VendorOrderController);
exports.VendorOrderController = VendorOrderController;
//# sourceMappingURL=VendorOrderController.js.map