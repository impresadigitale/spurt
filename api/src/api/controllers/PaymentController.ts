/*
 * spurtcommerce marketplace API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, QueryParam, JsonController, Authorized, Res, Post, BodyParam, Req } from 'routing-controllers';
import { PaymentService } from '../services/PaymentService';
import { PaymentItemsService } from '../services/PaymentItemsService';
import { PaymentArchiveService } from '../services/PaymentArchiveService';
import { PaymentItemsArchiveService } from '../services/PaymentItemsArchiveService';
import { PaymentArchive } from '../models/PaymentArchive';
import { PaymentItemsArchive } from '../models/PaymentItemsArchive';
import * as fs from 'fs';
import moment from 'moment';

@JsonController('/payment')
export class PaymentController {
    constructor(private paymentService: PaymentService,
                private paymentItemsService: PaymentItemsService,
                private paymentArchiveService: PaymentArchiveService,
                private paymentItemsArchiveService: PaymentItemsArchiveService) {
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
    @Get('/payment-list')
    @Authorized()
    public async paymentList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string,
                             @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
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
            'orderDetail.isActive as isActive'];

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

        const paymentList: any = await this.paymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const paymentResponse = paymentList.map(async (value: any) => {
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
            const paymentItemsList: any = await this.paymentItemsService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
            payment.subOrderDetails = paymentItemsList;
            return payment;
        });
        const paymentListDetails = await Promise.all(paymentResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete payment list.',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
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
    @Get('/payment-list-count')
    @Authorized()
    public async paymentListCount(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string,
                                  @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
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
            'orderDetail.isActive as isActive'];

        const relations = [
            {
                tableName: 'Payment.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [
        ];

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
        const paymentList: any = await this.paymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, [], true, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the payment list count.',
            data: paymentList,
        };
        return response.status(200).send(successResponse);
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
    @Get('/export-payment-list')
    @Authorized()
    public async exportPaymentList(@QueryParam('paymentId') paymentId: string, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('payment Excel Sheet');
        const rows = [];
        const paymentid = paymentId.split(',');
        for (const id of paymentid) {
            const dataId = await this.paymentService.findOne({ where: { paymentId: id } });
            if (!dataId) {
                const errorResponse: any = {
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
                'orderDetail.isActive as isActive'];

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

            const paymentList: any = await this.paymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            rows.push([paymentList[0].orderPrefixId, paymentList[0].shippingFirstname, paymentList[0].email, paymentList[0].total, paymentList[0].createdDate, paymentList[0].paymentType, paymentList[0].paymentDetails]);
        }

        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './PaymentExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
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
    @Get('/bulk-export-payment-list')
    public async bulkExportPaymentList(@Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('payment Excel Sheet');
        const rows = [];
        const dataId = await this.paymentService.findData();
        if (dataId.length < 0) {
            const errorResponse: any = {
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
                'orderDetail.isActive as isActive'];

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

            const paymentList: any = await this.paymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            rows.push([paymentList[0].orderPrefixId, paymentList[0].shippingFirstname, paymentList[0].email, paymentList[0].total, paymentList[0].createdDate, paymentList[0].paymentType, paymentList[0].paymentDetails]);
        }

        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './BulkPaymentExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
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
    @Post('/make-payment-archive')
    @Authorized('')
    public async makeArchive(@BodyParam('paymentId') paymentId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const payment = await this.paymentService.findOne({
            where: {
                paymentId,
            },
        });
        if (!payment) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid PaymentId',
            };
            return response.status(400).send(errorResponse);
        }
        const newPaymentArchive: any = new PaymentArchive();
        newPaymentArchive.orderId = payment.orderId;
        newPaymentArchive.paidDate = payment.paidDate;
        newPaymentArchive.paymentNumber = payment.paymentNumber;
        newPaymentArchive.paymentInformation = payment.paymentInformation;
        newPaymentArchive.paymentAmount = payment.paymentAmount;
        newPaymentArchive.paymentCommissionAmount = payment.paymentCommissionAmount;
        const archive = await this.paymentArchiveService.create(newPaymentArchive);
        const paymentItems = await this.paymentItemsService.findAll({
            where: {
                paymentId,
            },
        });
        const arr: any = [];
        for (const data of paymentItems) {
            const newPaymentItemsArchiveLog: any = new PaymentItemsArchive();
            newPaymentItemsArchiveLog.paymentArchiveId = archive.paymentArchiveId;
            newPaymentItemsArchiveLog.orderProductId = data.orderProductId;
            newPaymentItemsArchiveLog.totalAmount = data.totalAmount;
            newPaymentItemsArchiveLog.productName = data.productName;
            newPaymentItemsArchiveLog.productQuantity = data.productQuantity;
            newPaymentItemsArchiveLog.productPrice = data.productPrice;
            arr.push(newPaymentItemsArchiveLog);
        }
        await this.paymentItemsArchiveService.create(arr);
        await this.paymentService.delete(payment);
        const successResponse: any = {
            status: 1,
            message: 'Successfully Archived this payment',
        };
        return response.status(200).send(successResponse);
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
    @Get('/archive-payment-list')
    @Authorized()
    public async archivePaymentList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string,
                                    @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
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
            'orderDetail.isActive as isActive'];

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

        const paymentList: any = await this.paymentArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const paymentResponse = paymentList.map(async (value: any) => {
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
            const paymentItemsList: any = await this.paymentItemsArchiveService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], false, true);
            payment.subOrderDetails = paymentItemsList;
            return payment;
        });
        const paymentListDetails = await Promise.all(paymentResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete archive payment list.',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
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
    @Get('/archive-payment-list-count')
    @Authorized()
    public async archivePaymentListCount(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('customerName') customerName: string,
                                         @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
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
            'orderDetail.isActive as isActive'];

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

        const paymentList: any = await this.paymentArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete archive payment list count.',
            data: paymentList,
        };
        return response.status(200).send(successResponse);
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
    @Get('/export-payment-archive-list')
    @Authorized()
    public async exportPaymentArchiveList(@QueryParam('paymentArchiveId') paymentArchiveId: string, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('payment Archive Excel Sheet');
        const rows = [];
        const paymentid = paymentArchiveId.split(',');
        for (const id of paymentid) {
            const dataId = await this.paymentArchiveService.findOne({ where: { paymentArchiveId: id } });
            if (!dataId) {
                const errorResponse: any = {
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
                'orderDetail.isActive as isActive'];

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

            const paymentList: any = await this.paymentArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            rows.push([paymentList[0].orderPrefixId, paymentList[0].shippingFirstname, paymentList[0].email, paymentList[0].total, paymentList[0].createdDate, paymentList[0].paymentType, paymentList[0].paymentDetails]);
        }

        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './PaymentArchiveExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
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
    @Get('/bulk-export-payment-archive-list')
    @Authorized()
    public async bulkExportPaymentArchiveList(@Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Bulk payment Archive Excel Sheet');
        const rows = [];
        const dataId = await this.paymentArchiveService.findData();
        if (dataId.length < 0) {
            const errorResponse: any = {
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
                'orderDetail.isActive as isActive'];

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

            const paymentList: any = await this.paymentArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            rows.push([paymentList[0].orderPrefixId, paymentList[0].shippingFirstname, paymentList[0].email, paymentList[0].total, paymentList[0].createdDate, paymentList[0].paymentType, paymentList[0].paymentDetails]);
        }

        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './BulkPaymentExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }
}
