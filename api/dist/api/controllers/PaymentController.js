"use strict";
/*
 * spurtcommerce marketplace API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const PaymentService_1 = require("../services/PaymentService");
const PaymentItemsService_1 = require("../services/PaymentItemsService");
const PaymentArchiveService_1 = require("../services/PaymentArchiveService");
const PaymentItemsArchiveService_1 = require("../services/PaymentItemsArchiveService");
const PaymentArchive_1 = require("../models/PaymentArchive");
const PaymentItemsArchive_1 = require("../models/PaymentItemsArchive");
const fs = tslib_1.__importStar(require("fs"));
const moment_1 = tslib_1.__importDefault(require("moment"));
let PaymentController = class PaymentController {
    constructor(paymentService, paymentItemsService, paymentArchiveService, paymentItemsArchiveService) {
        this.paymentService = paymentService;
        this.paymentItemsService = paymentItemsService;
        this.paymentArchiveService = paymentArchiveService;
        this.paymentItemsArchiveService = paymentItemsArchiveService;
    }
    // Payment List API
    /**
     * @api {get} /api/payment/payment-list Payment List API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list",
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
     * @apiSampleRequest /api/payment/payment-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    paymentList(limit, offset, customerName, startDate, endDate, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'Payment.paymentId as paymentId',
                'orderDetail.orderId as orderId',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as shippingFirstname',
                'orderDetail.total as total',
                'orderDetail.createdDate as createdDate',
                'orderDetail.paymentType as paymentType',
                'orderDetail.paymentDetails as paymentDetails',
                'orderDetail.customerId as customerId',
                'orderDetail.isActive as isActive'
            ];
            const relations = [
                {
                    tableName: 'Payment.orderDetail',
                    aliasName: 'orderDetail',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`Payment`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`Payment`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (customerName && customerName !== '') {
                searchConditions.push({
                    name: ['orderDetail.shippingFirstname'],
                    value: customerName.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'Payment.createdDate',
                order: 'DESC',
            });
            const paymentList = yield this.paymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const paymentResponse = paymentList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const payment = value;
                const subOrderSelect = [
                    'orderProduct.orderProductId as orderProductId',
                    'orderProduct.orderProductPrefixId as orderProductPrefixId',
                    'orderProduct.productId as productId',
                    'orderProduct.orderId as orderId',
                    'orderProduct.quantity as quantity',
                    'orderProduct.name as name',
                    'orderProduct.productPrice as price',
                    'orderProduct.total as total',
                    'orderProduct.discountAmount as discountAmount',
                    'orderProduct.discountedAmount as discountedAmount',
                    'orderProduct.orderProductPrefixId as orderProductPrefixId',
                    'orderProduct.skuName as skuName',
                    'orderProduct.varientName as varientName',
                ];
                const subOrderRelations = [
                    {
                        tableName: 'PaymentItems.orderProduct',
                        aliasName: 'orderProduct',
                    },
                ];
                const subOrderWhereConditions = [
                    {
                        name: 'orderProduct.order_id',
                        op: 'where',
                        value: value.orderId,
                    },
                ];
                const paymentItemsList = yield this.paymentItemsService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
                payment.subOrderDetails = paymentItemsList;
                return payment;
            }));
            const paymentListDetails = yield Promise.all(paymentResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete payment list.',
                data: paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Payment List Count API
    /**
     * @api {get} /api/payment/payment-list-count Payment List Count API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list",
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
     * @apiSampleRequest /api/payment/payment-list-count
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    paymentListCount(limit, offset, customerName, startDate, endDate, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'Payment.paymentId as paymentId',
                'orderDetail.orderId as orderId',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as shippingFirstname',
                'orderDetail.total as total',
                'orderDetail.createdDate as createdDate',
                'orderDetail.paymentType as paymentType',
                'orderDetail.paymentDetails as paymentDetails',
                'orderDetail.customerId as customerId',
                'orderDetail.isActive as isActive'
            ];
            const relations = [
                {
                    tableName: 'Payment.orderDetail',
                    aliasName: 'orderDetail',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`Payment`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`Payment`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (customerName && customerName !== '') {
                searchConditions.push({
                    name: ['orderDetail.shippingFirstname'],
                    value: customerName.toLowerCase(),
                });
            }
            const paymentList = yield this.paymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, [], true, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got the payment list count.',
                data: paymentList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Export Payment List API
    /**
     * @api {get} /api/payment/export-payment-list Export Payment List API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} paymentId paymentId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list",
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
     * @apiSampleRequest /api/payment/export-payment-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    exportPaymentList(paymentId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('payment Excel Sheet');
            const rows = [];
            const paymentid = paymentId.split(',');
            for (const id of paymentid) {
                const dataId = yield this.paymentService.findOne({ where: { paymentId: id } });
                if (!dataId) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid paymentId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
                { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
                { header: 'Email', key: 'email', size: 16, width: 15 },
                { header: 'Total Amount', key: 'total', size: 16, width: 15 },
                { header: 'Payment Date', key: 'paymentDate', size: 16, width: 15 },
                { header: 'Payment Method', key: 'paymentMethod', size: 16, width: 15 },
                { header: 'Payment Detail', key: 'paymentDetail', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const id of paymentid) {
                const select = [
                    'Payment.paymentId as paymentId',
                    'orderDetail.orderId as orderId',
                    'orderDetail.orderPrefixId as orderPrefixId',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
                    'orderDetail.shippingFirstname as shippingFirstname',
                    'orderDetail.email as email',
                    'orderDetail.total as total',
                    'orderDetail.createdDate as createdDate',
                    'orderDetail.paymentType as paymentType',
                    'orderDetail.paymentDetails as paymentDetails',
                    'orderDetail.customerId as customerId',
                    'orderDetail.isActive as isActive'
                ];
                const relations = [
                    {
                        tableName: 'Payment.orderDetail',
                        aliasName: 'orderDetail',
                    },
                ];
                const groupBy = [];
                const whereConditions = [];
                whereConditions.push({
                    name: 'Payment.paymentId',
                    op: 'and',
                    value: id,
                });
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'Payment.createdDate',
                    order: 'DESC',
                });
                const paymentList = yield this.paymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                rows.push([paymentList[0].orderPrefixId, paymentList[0].shippingFirstname, paymentList[0].email, paymentList[0].total, paymentList[0].createdDate, paymentList[0].paymentType, paymentList[0].paymentDetails]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './PaymentExcel_' + Date.now() + '.xlsx';
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
    // Bulk Export Payment List API
    /**
     * @api {get} /api/payment/bulk-export-payment-list Bulk Export Payment List API
     * @apiGroup Payment
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get payment list",
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
     * @apiSampleRequest /api/payment/bulk-export-payment-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    bulkExportPaymentList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('payment Excel Sheet');
            const rows = [];
            const dataId = yield this.paymentService.findData();
            if (dataId.length < 0) {
                const errorResponse = {
                    status: 0,
                    message: 'list is empty',
                };
                return response.status(400).send(errorResponse);
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
                { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
                { header: 'Email', key: 'email', size: 16, width: 15 },
                { header: 'Total Amount', key: 'total', size: 16, width: 15 },
                { header: 'Payment Date', key: 'paymentDate', size: 16, width: 15 },
                { header: 'Payment Method', key: 'paymentMethod', size: 16, width: 15 },
                { header: 'Payment Detail', key: 'paymentDetail', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const id of dataId) {
                const select = [
                    'Payment.paymentId as paymentId',
                    'orderDetail.orderId as orderId',
                    'orderDetail.orderPrefixId as orderPrefixId',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
                    'orderDetail.shippingFirstname as shippingFirstname',
                    'orderDetail.email as email',
                    'orderDetail.total as total',
                    'orderDetail.createdDate as createdDate',
                    'orderDetail.paymentType as paymentType',
                    'orderDetail.paymentDetails as paymentDetails',
                    'orderDetail.customerId as customerId',
                    'orderDetail.isActive as isActive'
                ];
                const relations = [
                    {
                        tableName: 'Payment.orderDetail',
                        aliasName: 'orderDetail',
                    },
                ];
                const groupBy = [];
                const whereConditions = [];
                whereConditions.push({
                    name: 'Payment.paymentId',
                    op: 'and',
                    value: id.paymentId,
                });
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'orderDetail.createdDate',
                    order: 'DESC',
                });
                const paymentList = yield this.paymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                rows.push([paymentList[0].orderPrefixId, paymentList[0].shippingFirstname, paymentList[0].email, paymentList[0].total, paymentList[0].createdDate, paymentList[0].paymentType, paymentList[0].paymentDetails]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './BulkPaymentExcel_' + Date.now() + '.xlsx';
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
    // Make Payment Archive API
    /**
     * @api {post} /api/payment/make-payment-archive Make Payment Archive API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} paymentId  paymentId
     * @apiParamExample {json} Input
     * {
     *   "paymentId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Archived this payment",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/payment/make-payment-archive
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    makeArchive(paymentId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payment = yield this.paymentService.findOne({
                where: {
                    paymentId,
                },
            });
            if (!payment) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid PaymentId',
                };
                return response.status(400).send(errorResponse);
            }
            const newPaymentArchive = new PaymentArchive_1.PaymentArchive();
            newPaymentArchive.orderId = payment.orderId;
            newPaymentArchive.paidDate = payment.paidDate;
            newPaymentArchive.paymentNumber = payment.paymentNumber;
            newPaymentArchive.paymentInformation = payment.paymentInformation;
            newPaymentArchive.paymentAmount = payment.paymentAmount;
            newPaymentArchive.paymentCommissionAmount = payment.paymentCommissionAmount;
            const archive = yield this.paymentArchiveService.create(newPaymentArchive);
            const paymentItems = yield this.paymentItemsService.findAll({
                where: {
                    paymentId,
                },
            });
            const arr = [];
            for (const data of paymentItems) {
                const newPaymentItemsArchiveLog = new PaymentItemsArchive_1.PaymentItemsArchive();
                newPaymentItemsArchiveLog.paymentArchiveId = archive.paymentArchiveId;
                newPaymentItemsArchiveLog.orderProductId = data.orderProductId;
                newPaymentItemsArchiveLog.totalAmount = data.totalAmount;
                newPaymentItemsArchiveLog.productName = data.productName;
                newPaymentItemsArchiveLog.productQuantity = data.productQuantity;
                newPaymentItemsArchiveLog.productPrice = data.productPrice;
                arr.push(newPaymentItemsArchiveLog);
            }
            yield this.paymentItemsArchiveService.create(arr);
            yield this.paymentService.delete(payment);
            const successResponse = {
                status: 1,
                message: 'Successfully Archived this payment',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Archive Payment List API
    /**
     * @api {get} /api/payment/archive-payment-list Archive Payment List API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Archive payment list",
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
     * @apiSampleRequest /api/payment/archive-payment-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    archivePaymentList(limit, offset, customerName, startDate, endDate, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'PaymentArchive.paymentArchiveId as paymentArchiveId',
                'orderDetail.orderId as orderId',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as shippingFirstname',
                'orderDetail.total as total',
                'orderDetail.createdDate as createdDate',
                'orderDetail.paymentType as paymentType',
                'orderDetail.paymentDetails as paymentDetails',
                'orderDetail.customerId as customerId',
                'orderDetail.isActive as isActive'
            ];
            const relations = [
                {
                    tableName: 'PaymentArchive.orderDetail',
                    aliasName: 'orderDetail',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`PaymentArchive`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`PaymentArchive`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (customerName && customerName !== '') {
                searchConditions.push({
                    name: ['orderDetail.shippingFirstname'],
                    value: customerName.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'PaymentArchive.createdDate',
                order: 'DESC',
            });
            const paymentList = yield this.paymentArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const paymentResponse = paymentList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const payment = value;
                const subOrderSelect = [
                    'orderProduct.orderProductId as orderProductId',
                    'orderProduct.orderProductPrefixId as orderProductPrefixId',
                    'orderProduct.productId as productId',
                    'orderProduct.orderId as orderId',
                    'orderProduct.quantity as quantity',
                    'orderProduct.name as name',
                    'orderProduct.productPrice as price',
                    'orderProduct.total as total',
                    'orderProduct.discountAmount as discountAmount',
                    'orderProduct.discountedAmount as discountedAmount',
                    'orderProduct.orderProductPrefixId as orderProductPrefixId',
                    'orderProduct.skuName as skuName',
                    'orderProduct.varientName as varientName',
                ];
                const subOrderRelations = [
                    {
                        tableName: 'PaymentItemsArchive.orderProduct',
                        aliasName: 'orderProduct',
                    },
                ];
                const subOrderWhereConditions = [
                    {
                        name: 'orderProduct.order_id',
                        op: 'where',
                        value: value.orderId,
                    },
                ];
                const paymentItemsList = yield this.paymentItemsArchiveService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
                payment.subOrderDetails = paymentItemsList;
                return payment;
            }));
            const paymentListDetails = yield Promise.all(paymentResponse);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete archive payment list.',
                data: paymentListDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Archive Payment List count API
    /**
     * @api {get} /api/payment/archive-payment-list-count Archive Payment List Count API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} customerName search by customerName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Archive payment count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/payment/archive-payment-list-count
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    archivePaymentListCount(limit, offset, customerName, startDate, endDate, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const startDateMin = moment_1.default(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const date = endDate + ' 23:59:59';
            const endDateMin = moment_1.default(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
            const select = [
                'PaymentArchive.paymentArchiveId as paymentArchiveId',
                'orderDetail.orderId as orderId',
                'orderDetail.orderStatusId as orderStatusId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.currencySymbolLeft as currencySymbolLeft',
                'orderDetail.currencySymbolRight as currencySymbolRight',
                'orderDetail.shippingFirstname as shippingFirstname',
                'orderDetail.total as total',
                'orderDetail.createdDate as createdDate',
                'orderDetail.paymentType as paymentType',
                'orderDetail.paymentDetails as paymentDetails',
                'orderDetail.customerId as customerId',
                'orderDetail.isActive as isActive'
            ];
            const relations = [
                {
                    tableName: 'PaymentArchive.orderDetail',
                    aliasName: 'orderDetail',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            if (startDate && startDate !== '') {
                whereConditions.push({
                    name: '`PaymentArchive`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                whereConditions.push({
                    name: '`PaymentArchive`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            const searchConditions = [];
            if (customerName && customerName !== '') {
                searchConditions.push({
                    name: ['orderDetail.shippingFirstname'],
                    value: customerName.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'PaymentArchive.createdDate',
                order: 'DESC',
            });
            const paymentList = yield this.paymentArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete archive payment list count.',
                data: paymentList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Export Payment Archive List API
    /**
     * @api {get} /api/payment/export-payment-archive-list Export Payment Archive List API
     * @apiGroup Payment
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} paymentArchiveId paymentArchiveId
     * @apiSampleRequest /api/payment/export-payment-archive-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    exportPaymentArchiveList(paymentArchiveId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('payment Archive Excel Sheet');
            const rows = [];
            const paymentid = paymentArchiveId.split(',');
            for (const id of paymentid) {
                const dataId = yield this.paymentArchiveService.findOne({ where: { paymentArchiveId: id } });
                if (!dataId) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid paymentArchiveId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
                { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
                { header: 'Email', key: 'email', size: 16, width: 15 },
                { header: 'Total Amount', key: 'total', size: 16, width: 15 },
                { header: 'Payment Date', key: 'paymentDate', size: 16, width: 15 },
                { header: 'Payment Method', key: 'paymentMethod', size: 16, width: 15 },
                { header: 'Payment Detail', key: 'paymentDetail', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const id of paymentid) {
                const select = [
                    'PaymentArchive.paymentArchiveId as paymentArchiveId',
                    'orderDetail.orderId as orderId',
                    'orderDetail.orderPrefixId as orderPrefixId',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
                    'orderDetail.shippingFirstname as shippingFirstname',
                    'orderDetail.email as email',
                    'orderDetail.total as total',
                    'orderDetail.createdDate as createdDate',
                    'orderDetail.paymentType as paymentType',
                    'orderDetail.paymentDetails as paymentDetails',
                    'orderDetail.customerId as customerId',
                    'orderDetail.isActive as isActive'
                ];
                const relations = [
                    {
                        tableName: 'PaymentArchive.orderDetail',
                        aliasName: 'orderDetail',
                    },
                ];
                const groupBy = [];
                const whereConditions = [];
                whereConditions.push({
                    name: 'PaymentArchive.paymentArchiveId',
                    op: 'and',
                    value: id,
                });
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'PaymentArchive.createdDate',
                    order: 'DESC',
                });
                const paymentList = yield this.paymentArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                rows.push([paymentList[0].orderPrefixId, paymentList[0].shippingFirstname, paymentList[0].email, paymentList[0].total, paymentList[0].createdDate, paymentList[0].paymentType, paymentList[0].paymentDetails]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './PaymentArchiveExcel_' + Date.now() + '.xlsx';
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
    // Bulk Export Payment Archive List API
    /**
     * @api {get} /api/payment/bulk-export-payment-archive-list Bulk Export Payment Archive List API
     * @apiGroup Payment
     * @apiSampleRequest /api/payment/bulk-export-payment-archive-list
     * @apiErrorExample {json} payment error
     * HTTP/1.1 500 Internal Server Error
     */
    bulkExportPaymentArchiveList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Bulk payment Archive Excel Sheet');
            const rows = [];
            const dataId = yield this.paymentArchiveService.findData();
            if (dataId.length < 0) {
                const errorResponse = {
                    status: 0,
                    message: 'list is empty',
                };
                return response.status(400).send(errorResponse);
            }
            // Excel sheet column define
            worksheet.columns = [
                { header: 'Order Id', key: 'orderPrefixId', size: 16, width: 15 },
                { header: 'Customer Name', key: 'shippingFirstname', size: 16, width: 15 },
                { header: 'Email', key: 'email', size: 16, width: 15 },
                { header: 'Total Amount', key: 'total', size: 16, width: 15 },
                { header: 'Payment Date', key: 'paymentDate', size: 16, width: 15 },
                { header: 'Payment Method', key: 'paymentMethod', size: 16, width: 15 },
                { header: 'Payment Detail', key: 'paymentDetail', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            for (const id of dataId) {
                const select = [
                    'PaymentArchive.paymentArchiveId as paymentArchiveId',
                    'orderDetail.orderId as orderId',
                    'orderDetail.orderPrefixId as orderPrefixId',
                    'orderDetail.currencySymbolLeft as currencySymbolLeft',
                    'orderDetail.currencySymbolRight as currencySymbolRight',
                    'orderDetail.shippingFirstname as shippingFirstname',
                    'orderDetail.email as email',
                    'orderDetail.total as total',
                    'orderDetail.createdDate as createdDate',
                    'orderDetail.paymentType as paymentType',
                    'orderDetail.paymentDetails as paymentDetails',
                    'orderDetail.customerId as customerId',
                    'orderDetail.isActive as isActive'
                ];
                const relations = [
                    {
                        tableName: 'PaymentArchive.orderDetail',
                        aliasName: 'orderDetail',
                    },
                ];
                const groupBy = [];
                const whereConditions = [];
                whereConditions.push({
                    name: 'PaymentArchive.paymentArchiveId',
                    op: 'and',
                    value: id.paymentArchiveId,
                });
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'orderDetail.createdDate',
                    order: 'DESC',
                });
                const paymentList = yield this.paymentArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                rows.push([paymentList[0].orderPrefixId, paymentList[0].shippingFirstname, paymentList[0].email, paymentList[0].total, paymentList[0].createdDate, paymentList[0].paymentType, paymentList[0].paymentDetails]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './BulkPaymentExcel_' + Date.now() + '.xlsx';
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
};
tslib_1.__decorate([
    routing_controllers_1.Get('/payment-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('customerName')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(5, routing_controllers_1.QueryParam('count')), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "paymentList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/payment-list-count'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('customerName')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(5, routing_controllers_1.QueryParam('count')), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "paymentListCount", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/export-payment-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('paymentId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "exportPaymentList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/bulk-export-payment-list'),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "bulkExportPaymentList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/make-payment-archive'),
    routing_controllers_1.Authorized(''),
    tslib_1.__param(0, routing_controllers_1.BodyParam('paymentId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "makeArchive", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/archive-payment-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('customerName')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(5, routing_controllers_1.QueryParam('count')), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "archivePaymentList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/archive-payment-list-count'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('customerName')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "archivePaymentListCount", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/export-payment-archive-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('paymentArchiveId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "exportPaymentArchiveList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/bulk-export-payment-archive-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "bulkExportPaymentArchiveList", null);
PaymentController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/payment'),
    tslib_1.__metadata("design:paramtypes", [PaymentService_1.PaymentService,
        PaymentItemsService_1.PaymentItemsService,
        PaymentArchiveService_1.PaymentArchiveService,
        PaymentItemsArchiveService_1.PaymentItemsArchiveService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=PaymentController.js.map