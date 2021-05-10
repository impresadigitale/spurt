/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Get, Authorized, QueryParam, Req, Res, Post, BodyParam } from 'routing-controllers';
import { OrderProductService } from '../../../services/OrderProductService';
import { ProductImageService } from '../../../services/ProductImageService';
import { ProductService } from '../../../services/ProductService';
import { VendorProductService } from '../../../services/VendorProductService';
import { VendorOrdersService } from '../../../services/VendorOrderService';
import { OrderService } from '../../../services/OrderService';
import { VendorPaymentService } from '../../../services/VendorPaymentService';
import { VendorPaymentArchiveService } from '../../../services/VendorPaymentArchiveService';
import { VendorPaymentArchive } from '../../../models/VendorPaymentArchive';
import { VendorOrderArchiveService } from '../../../services/VendorOrderArchiveService';
import { PaymentItemsService } from '../../../services/PaymentItemsService';
import * as fs from 'fs';
import moment from 'moment';

@JsonController('/vendor-sales')
export class VendorOrderController {
    constructor(private productImageService: ProductImageService,
                private productService: ProductService,
                private vendorProductService: VendorProductService,
                private vendorOrdersService: VendorOrdersService,
                private vendorPaymentService: VendorPaymentService,
                private orderService: OrderService,
                private vendorPaymentArchiveService: VendorPaymentArchiveService,
                private vendorOrderArchiveService: VendorOrderArchiveService,
                private paymentItemsService: PaymentItemsService,
                private orderProductService: OrderProductService
    ) {
    }

    // Payment List API
    /**
     * @api {get} /api/vendor-sales/payment-list  Payment list API
     * @apiGroup Vendor Sales
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got payment list",
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
     * @apiSampleRequest /api/vendor-sales/payment-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/payment-list')
    @Authorized('vendor')
    public async paymentList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string,
                             @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('deliverylist') deliverylist: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'VendorPayment.vendorPaymentId as vendorPaymentId',
            'VendorPayment.vendorOrderId as vendorOrderId',
            'vendorOrders.subOrderId as subOrderId',
            'order.shippingFirstname as customerFirstName',
            'order.shippingCity as shippingCity',
            'order.shippingCountry as shippingCountry',
            'order.shippingZone as shippingZone',
            'order.currencyCode as currencyCode',
            'order.currencySymbolLeft as currencySymbolLeft',
            'order.currencySymbolRight as currencySymbolRight',
            'VendorPayment.createdDate as createdDate',
            'VendorPayment.amount as amount',
            'VendorPayment.commissionAmount as commissionAmount',
            'orderStatus.name as orderStatusName',
            'orderStatus.colorCode as orderStatusColorCode',
            'vendorOrders.makeSettlement as makeSettlement',
            'orderProduct.orderProductPrefixId as orderProductPrefixId',
        ];

        const relations = [
            {
                tableName: 'VendorPayment.vendorOrders',
                aliasName: 'vendorOrders',
            },
            {
                tableName: 'vendorOrders.order',
                aliasName: 'order',
            },
            {
                tableName: 'vendorOrders.orderStatus',
                aliasName: 'orderStatus',
            },
            {
                tableName: 'vendorOrders.orderProduct',
                aliasName: 'orderProduct',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'VendorPayment.vendorId',
            op: 'and',
            value: request.user.vendorId,
        });

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`VendorPayment`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`VendorPayment`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });

        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['order.shippingFirstname', 'vendorOrders.subOrderId'],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'VendorPayment.createdDate',
            order: 'DESC',
        });

        const orderList: any = await this.vendorPaymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderResponse = orderList.map(async (value: any) => {
            const temp: any = value;
            temp.NetAmount = value.amount - value.commissionAmount;
            return temp;
        });
        const paymentListDetails = await Promise.all(orderResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete payment list.',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Payment List count API
    /**
     * @api {get} /api/vendor-sales/payment-list-count  Payment list Count API
     * @apiGroup Vendor Sales
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got payment list count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-sales/payment-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/payment-list')
    @Authorized('vendor')
    public async paymentListCount(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string,
                                  @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('deliverylist') deliverylist: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'VendorPayment.vendorPaymentId as vendorPaymentId',
            'VendorPayment.vendorOrderId as vendorOrderId',
            'vendorOrders.subOrderId as subOrderId',
            'order.shippingFirstname as customerFirstName',
            'order.shippingCity as shippingCity',
            'order.shippingCountry as shippingCountry',
            'order.shippingZone as shippingZone',
            'order.currencyCode as currencyCode',
            'order.currencySymbolLeft as currencySymbolLeft',
            'order.currencySymbolRight as currencySymbolRight',
            'VendorPayment.createdDate as createdDate',
            'VendorPayment.amount as amount',
            'VendorPayment.commissionAmount as commissionAmount',
            'orderStatus.name as orderStatusName',
            'orderStatus.colorCode as orderStatusColorCode',
        ];

        const relations = [
            {
                tableName: 'VendorPayment.vendorOrders',
                aliasName: 'vendorOrders',
            },
            {
                tableName: 'vendorOrders.order',
                aliasName: 'order',
            },
            {
                tableName: 'vendorOrders.orderStatus',
                aliasName: 'orderStatus',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'VendorPayment.vendorId',
            op: 'and',
            value: request.user.vendorId,
        });

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`VendorPayment`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`VendorPayment`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });

        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['order.shippingFirstname', 'vendorOrders.subOrderId'],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'VendorPayment.createdDate',
            order: 'DESC',
        });

        const orderList: any = await this.vendorPaymentService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete payment list count.',
            data: orderList,
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Earings List API
    /**
     * @api {get} /api/vendor-sales/vendor-earning-list Vendor Earning List API
     * @apiGroup  Vendor Sales
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status 0->inactive 1-> active
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get your product earnings list",
     *      "data":{
     *      "vendorId" : "",
     *      "vendorName" : "",
     *      "productName" : "",
     *      "sku" : "",
     *      "model" : "",
     *      "price" : "",
     *      "quantity" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-sales/vendor-earning-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-earning-list')
    @Authorized('vendor')
    public async vendorProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('keyword') keyword: string, @QueryParam('price') price: string, @QueryParam('count') count: number, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorId = request.user.vendorId;
        const selects = ['VendorProducts.vendorProductId as vendorProductId',
            'VendorProducts.vendorProductCommission as vendorProductCommission',
            'VendorProducts.quotationAvailable as quotationAvailable',
            'VendorProducts.approvalFlag as approvalFlag',
            'vendor.vendorId as vendorId',
            'product.productId as productId',
            'product.pincodeBasedDelivery as pincodeBasedDelivery',
            'product.name as name',
            'product.sku as sku',
            'product.price as productPrice',
            'product.quantity as quantity',
            'customer.firstName as vendorName',
            'product.sortOrder as sortOrder',
            'product.isActive as isActive',
            'product.productSlug as productSlug',
            'VendorProducts.createdDate as createdDate',
            'product.keywords as keywords',
            'product.attributeKeyword as attributeKeyword'];
        const whereCondition = [];
        const relations = [];
        const groupBy = [];
        relations.push({
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            },

            {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            },
            {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            });
        if (status) {
            whereCondition.push({
                name: 'product.isActive',
                op: 'and',
                value: status,
            });
        }
        whereCondition.push({
            name: 'vendor.vendorId',
            op: 'and',
            value: vendorId,
        });
        const searchConditions = [];
        if (keyword) {
            searchConditions.push({
                name: ['product.keywords', 'product.name', 'customer.first_name'],
                value: keyword.toLowerCase(),
            });
        }
        const sort = [];
        sort.push({
            name: 'VendorProducts.createdDate',
            order: 'DESC',
        });

        if (count) {
            const vendorProductListCount: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
            const sucResponse: any = {
                status: 1,
                message: 'Successfully got Vendor Product list.',
                data: vendorProductListCount,
            };
            return response.status(200).send(sucResponse);
        }
        const vendorProductList: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
        const productList = vendorProductList.map(async (value: any) => {
            const defaultValue = await this.productImageService.findOne({
                select: ['image', 'containerName'],
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = value;
            temp.productImage = defaultValue;
            const orderProduct = await this.orderProductService.getEarnings(value.productId);
            const vendorOrder = await this.vendorOrdersService.getEachProductRevenue(value.productId, request.user.vendorId);
            if (vendorOrder !== undefined) {
                let total = 0;
                for (const val of vendorOrder) {
                    const commissionPercent = val.commission;
                    let commissionAmount;
                    let NetAmount;
                    if (val.discountedAmount && val.discountedAmount !== undefined) {
                        commissionAmount = val.discountedAmount * (commissionPercent / 100);
                        NetAmount = val.discountedAmount - commissionAmount;
                    } else {
                        commissionAmount = val.total * (commissionPercent / 100);
                        NetAmount = val.total - commissionAmount;
                    }
                    total += +NetAmount;
                }
                temp.totalRevenue = total;
            }
            if (orderProduct !== undefined) {
                temp.soldCount = orderProduct.quantityCount;
            } else {
                temp.soldCount = 0;
            }
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got your product Earnings list.',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Earning Export Download
    /**
     * @api {get} /api/vendor-sales/earning-export Vendor Earning Export
     * @apiGroup Vendor Sales
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the vendor earning List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-sales/earning-export
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/earning-export')
    public async earningExport(@QueryParam('vendorId') vendorId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Earning export detail');
        const rows = [];
        const dataId = await this.vendorProductService.find({ where: { vendorId } });
        if (dataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'No data found',
            };
            return response.status(400).send(errorResponse);
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Product Id', key: 'id', size: 16, width: 15 },
            { header: 'Product Name', key: 'product_name', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'Sold', key: 'Sold', size: 16, width: 24 },
            { header: 'Buyers', key: 'Buyers', size: 16, width: 15 },
            { header: 'Revenue', key: 'Revenue', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const vendorProducts = await this.vendorProductService.find({ where: { vendorId } });
        for (const vendorProduct of vendorProducts) {
            const productValue = await this.productService.findOne({
                select: ['productId', 'name', 'sku'],
                where: {
                    productId: vendorProduct.productId,
                },
            });
            const orderProduct = await this.orderProductService.getEarnings(vendorProduct.productId);
            const vendorOrder = await this.vendorOrdersService.getEachProductRevenue(vendorProduct.productId, vendorId);
            let total = 0;
            if (vendorOrder !== undefined) {
                for (const val of vendorOrder) {
                    const commissionPercent = val.commission;
                    let commissionAmount;
                    let NetAmount;
                    if (val.discountedAmount && val.discountedAmount !== undefined) {
                        commissionAmount = val.discountedAmount * (commissionPercent / 100);
                        NetAmount = val.discountedAmount - commissionAmount;
                    } else {
                        commissionAmount = val.total * (commissionPercent / 100);
                        NetAmount = val.total - commissionAmount;
                    }
                    total += +NetAmount;
                }
            }
            const totalRevenue = total;
            rows.push([productValue.productId, productValue.name, productValue.sku, orderProduct.quantityCount, orderProduct.buyerCount, totalRevenue]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorEarningExcel_' + Date.now() + '.xlsx';
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

    // recent sales export Download
    /**
     * @api {get} /api/vendor-sales/sales-export Sales list Export
     * @apiGroup Vendor Sales
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the vendor sales List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-sales/sales-export
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/sales-export')
    public async salesExport(@QueryParam('vendorId') vendorId: number, @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sales export detail');
        const rows = [];
        const dataId = await this.vendorOrdersService.searchOrderList(vendorId, '', startDate, endDate, '', 1);
        if (dataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'No data found',
            };
            return response.status(400).send(errorResponse);
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'SubOrderId', key: 'subOrderId', size: 16, width: 15 },
            { header: 'paidDate', key: 'paidDate', size: 16, width: 15 },
            { header: 'CustomerName', key: 'customerName', size: 16, width: 15 },
            { header: 'CustomerAddress', key: 'CustomerAdress', size: 16, width: 24 },
            { header: 'OrderAmount', key: 'TotalAmount', size: 16, width: 15 },
            { header: 'CommissionAmount', key: 'CommissionAmount', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        // Add all rows data in sheet
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'VendorPayment.vendorPaymentId as vendorPaymentId',
            'VendorPayment.vendorOrderId as vendorOrderId',
            'vendorOrders.subOrderId as subOrderId',
            'order.shippingFirstname as customerFirstName',
            'order.shippingCity as shippingCity',
            'order.shippingCountry as shippingCountry',
            'order.shippingZone as shippingZone',
            'order.currencyCode as currencyCode',
            'order.currencySymbolLeft as currencySymbolLeft',
            'order.currencySymbolRight as currencySymbolRight',
            'VendorPayment.createdDate as createdDate',
            'VendorPayment.amount as amount',
            'VendorPayment.commissionAmount as commissionAmount',
            'orderStatus.name as orderStatusName',
            'orderStatus.colorCode as orderStatusColorCode',
        ];

        const relations = [
            {
                tableName: 'VendorPayment.vendorOrders',
                aliasName: 'vendorOrders',
            },
            {
                tableName: 'vendorOrders.order',
                aliasName: 'order',
            },
            {
                tableName: 'vendorOrders.orderStatus',
                aliasName: 'orderStatus',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'VendorPayment.vendorId',
            op: 'and',
            value: vendorId,
        });

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`VendorPayment`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`VendorPayment`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });

        }

        const searchConditions = [];
        const sort = [];
        sort.push({
            name: 'VendorPayment.createdDate',
            order: 'DESC',
        });

        const paymentList: any = await this.vendorPaymentService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        for (const vendorProduct of paymentList) {
            rows.push([vendorProduct.subOrderId, vendorProduct.createdDate, vendorProduct.customerFirstName, vendorProduct.shippingCity + ' , ' + vendorProduct.shippingCountry, vendorProduct.amount, vendorProduct.commissionAmount]);
        }
        worksheet.addRows(rows);
        const fileName = './SalesExcel_' + Date.now() + '.xlsx';
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

    // payment Counts
    /**
     * @api {get} /api/vendor-sales/payment-counts payment counts
     * @apiGroup Vendor Sales
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got payment counts",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-sales/payment-counts
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/payment-counts')
    @Authorized('vendor')
    public async salesCounts(@Req() request: any, @Res() response: any): Promise<any> {
        const salesCount = await this.vendorPaymentService.getSalesCount(request.user.vendorId);
        // without login
        const WhereConditions = [
            {
                name: 'vendorId',
                op: 'where',
                value: request.user.vendorId,
            },
        ];
        const buyerList = await this.vendorPaymentService.list(0, 0, [], [], WhereConditions, 0);
        let withoutLoginCount = 0;
        for (const list of buyerList) {
            const vendorOrder = await this.vendorOrdersService.findOne({ where: { vendorOrderId: list.vendorOrderId } });
            const order = await this.orderService.findOrder({ where: { orderId: vendorOrder.orderId } });
            if (order.customerId === 0) {
                withoutLoginCount += +1;
            }
        }
        // with login
        let value;
        const buyerCount = await this.vendorPaymentService.getBuyerCount(request.user.vendorId);
        if (buyerCount) {
            value = buyerCount.buyerCount;
        }
        const buyerCountValue = +withoutLoginCount + (+value);
        const revenue = await this.vendorPaymentService.getTotalVendorRevenue(request.user.vendorId);
        let total = 0;
        if (revenue !== undefined) {
            for (const val of revenue) {
                const NetAmount = val.amount - val.commissionAmount;
                total += +NetAmount;
            }
        }
        const totalRevenue = total;
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Today order count',
            data: {
                buyersCount: buyerCountValue,
                salesCount: salesCount.salesCount,
                revenue: totalRevenue,
            },
        };
        return response.status(200).send(successResponse);

    }

    // vendor sales export Download
    /**
     * @api {get} /api/vendor-sales/vendor-sales-export Vendor sales list Export
     * @apiGroup Vendor Sales
     * @apiParam (Request body) {String} vendorOrderId vendorOrderId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the vendor sales List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-sales/vendor-sales-export
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/vendor-sales-export')
    public async vendorSalesExport(@QueryParam('vendorOrderId') vendorOrderId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Vendor sales export detail');
        const rows = [];
        const splitOrder = vendorOrderId.split(',');
        for (const data of splitOrder) {
            const value = parseInt(data, 10);
            const dataId = await this.vendorOrdersService.searchOrderListt(value, 1);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'No data found',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'SubOrderId', key: 'subOrderId', size: 16, width: 15 },
            { header: 'paidDate', key: 'paidDate', size: 16, width: 15 },
            { header: 'CustomerName', key: 'customerName', size: 16, width: 15 },
            { header: 'CustomerAddress', key: 'CustomerAdress', size: 16, width: 24 },
            { header: 'OrderAmount', key: 'TotalAmount', size: 16, width: 15 },
            { header: 'CommissionAmount', key: 'CommissionAmount', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const arr: any = [];
        for (const record of splitOrder) {
            const val = parseInt(record, 10);
            const vendorOrders: any = await this.vendorOrdersService.searchOrderListt(val, 1);
            arr.push(vendorOrders);
        }
        for (const vendorProduct of arr) {
            const defCommission = vendorProduct.commission;
            let commissionAmount;
            if (vendorProduct.discountedAmount && (vendorProduct.discountedAmount !== undefined)) {
                commissionAmount = vendorProduct.discountedAmount * (defCommission / 100);
            } else {
                commissionAmount = vendorProduct.total * (defCommission / 100);
            }
            rows.push([vendorProduct.subOrderId, vendorProduct.date, vendorProduct.customerFirstName, vendorProduct.shippingCity + ' , ' + vendorProduct.shippingCountry, vendorProduct.discountedAmount ? vendorProduct.discountedAmount : vendorProduct.total, commissionAmount]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorSalesExcel_' + Date.now() + '.xlsx';
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

    // Vendor Product Earning Export Download
    /**
     * @api {get} /api/vendor-sales/product-earning-export Vendor Product Earning Export
     * @apiGroup Vendor Sales
     * @apiParam (Request body) {String} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the vendor product earning List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-sales/product-earning-export
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/product-earning-export')
    public async productEarningExport(@QueryParam('productId') productId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Product earning export detail');
        const rows = [];
        const splitProduct = productId.split(',');
        for (const record of splitProduct) {
            const dataId = await this.vendorProductService.find({ where: { productId: record } });
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Product not found',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Product Id', key: 'id', size: 16, width: 15 },
            { header: 'Product Name', key: 'product_name', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'Sold', key: 'Sold', size: 16, width: 24 },
            { header: 'Buyers', key: 'Buyers', size: 16, width: 15 },
            { header: 'Revenue', key: 'Revenue', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const arr: any = [];
        for (const data of splitProduct) {
            const vendorProducts = await this.vendorProductService.findOne({ where: { productId: data } });
            arr.push(vendorProducts);
        }
        for (const vendorProduct of arr) {
            const productValue = await this.productService.findOne({
                select: ['productId', 'name', 'sku'],
                where: {
                    productId: vendorProduct.productId,
                },
            });
            const orderProduct = await this.orderProductService.getEarnings(vendorProduct.productId);
            const vendorOrder = await this.vendorOrdersService.getEachProductRevenue(vendorProduct.productId, vendorProduct.vendorId);
            let total = 0;
            if (vendorOrder !== undefined) {
                for (const val of vendorOrder) {
                    const commissionPercent = val.commission;
                    let commissionAmount;
                    let NetAmount;
                    if (val.discountedAmount && val.discountedAmount !== undefined) {
                        commissionAmount = val.discountedAmount * (commissionPercent / 100);
                        NetAmount = val.discountedAmount - commissionAmount;
                    } else {
                        commissionAmount = val.total * (commissionPercent / 100);
                        NetAmount = val.total - commissionAmount;
                    }
                    total += +NetAmount;
                }
            }
            const totalRevenue = total;
            rows.push([productValue.productId, productValue.name, productValue.sku, orderProduct.orderCount, orderProduct.buyerCount, totalRevenue]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorProductEarningExcel_' + Date.now() + '.xlsx';
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

    // Make Vendor payment Archive API
    /**
     * @api {post} /api/vendor-sales/make-vendor-payment-archive Make Vendor Payment Archive API
     * @apiGroup Vendor Sales
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorPaymentId VendorPaymentId
     * @apiParamExample {json} Input
     * {
     *   "vendorPaymentId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Archived Payments",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-sales/make-vendor-payment-archive
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/make-vendor-payment-archive')
    @Authorized('vendor')
    public async makePaymentArchive(@BodyParam('vendorPaymentId') vendorPaymentId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorPayment = await this.vendorPaymentService.findOne({
            where: {
                vendorPaymentId,
            },
        });
        if (!vendorPayment) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid Vendor Payment Id',
            };
            return response.status(400).send(errorResponse);
        }
        const newVendorPaymentArchive: any = new VendorPaymentArchive();
        newVendorPaymentArchive.vendorId = vendorPayment.vendorId;
        newVendorPaymentArchive.vendorOrderId = vendorPayment.vendorOrderId;
        newVendorPaymentArchive.paymentItemId = vendorPayment.paymentItemId;
        newVendorPaymentArchive.amount = vendorPayment.amount;
        newVendorPaymentArchive.commissionAmount = vendorPayment.commissionAmount;
        await this.vendorPaymentArchiveService.create(newVendorPaymentArchive);
        await this.vendorPaymentService.delete(vendorPayment.vendorPaymentId);
        const successResponse: any = {
            status: 1,
            message: 'Successfully archived your payments',
        };
        return response.status(200).send(successResponse);
    }

    // Archive Payment List API
    /**
     * @api {get} /api/vendor-sales/archive-payment-list  Archive-Payment list API
     * @apiGroup Vendor Sales
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by orderId, customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got archive payment list",
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
     * @apiSampleRequest /api/vendor-sales/archive-payment-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/archive-payment-list')
    @Authorized('vendor')
    public async paymentArchiveList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string,
                                    @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('deliverylist') deliverylist: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'VendorPaymentArchive.id as vendorArchivePaymentId',
            'VendorPaymentArchive.vendorOrderId as vendorOrderId',
            'VendorPaymentArchive.vendorOrderArchive as vendorOrderArchive',
            'orderDetail.shippingFirstname as customerFirstName',
            'orderDetail.shippingCity as shippingCity',
            'orderDetail.shippingCountry as shippingCountry',
            'orderDetail.shippingZone as shippingZone',
            'orderDetail.currencyCode as currencyCode',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'VendorPaymentArchive.createdDate as createdDate',
            'VendorPaymentArchive.amount as amount',
            'orderProduct.orderProductPrefixId as orderProductPrefixId',
            'VendorPaymentArchive.commissionAmount as commissionAmount',
        ];

        const relations = [
            {
                tableName: 'VendorPaymentArchive.paymentItems',
                aliasName: 'paymentItems',
            },
            {
                tableName: 'paymentItems.payment',
                aliasName: 'payment',
            },
            {
                tableName: 'paymentItems.orderProduct',
                aliasName: 'orderProduct',
            },
            {
                tableName: 'payment.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'VendorPaymentArchive.vendorId',
            op: 'and',
            value: request.user.vendorId,
        });

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`VendorPaymentArchive`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`VendorPaymentArchive`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });

        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['orderDetail.shippingFirstname'],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'VendorPaymentArchive.createdDate',
            order: 'DESC',
        });

        const orderList: any = await this.vendorPaymentArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderResponse = orderList.map(async (value: any) => {
            const temp: any = value;
            temp.NetAmount = value.amount - value.commissionAmount;
            if (value.vendorOrderArchive === 1) {
                const orderArchive = await this.vendorOrderArchiveService.findOne({
                    select: ['subOrderId', 'orderId'],
                    where: {
                        vendorOrderArchiveId: value.vendorOrderId,
                    },
                });
                if (orderArchive) {
                    temp.subOrderId = orderArchive.subOrderId;
                } else {
                    temp.subOrderId = '';
                }

            } else {
                const vendorOrder = await this.vendorOrdersService.findOne({
                    select: ['subOrderId'],
                    where: {
                        vendorOrderId: value.vendorOrderId,
                    },
                });
                if (vendorOrder) {
                    temp.subOrderId = vendorOrder.subOrderId;
                } else {
                    temp.subOrderId = '';
                }
            }
            return temp;
        });
        const paymentListDetails = await Promise.all(orderResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete payment list.',
            data: paymentListDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Archive Payment List count API
    /**
     * @api {get} /api/vendor-sales/archive-payment-list-count  Archive-Payment list count API
     * @apiGroup Vendor Sales
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search customer name
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got archive payment list count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-sales/archive-payment-list-count
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/archive-payment-list-count')
    @Authorized('vendor')
    public async paymentArchiveListCount(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string,
                                         @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('deliverylist') deliverylist: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'VendorPaymentArchive.id as vendorArchivePaymentId',
            'VendorPaymentArchive.vendorOrderId as vendorOrderId',
            'orderDetail.shippingFirstname as customerFirstName',
            'orderDetail.shippingCity as shippingCity',
            'orderDetail.shippingCountry as shippingCountry',
            'orderDetail.shippingZone as shippingZone',
            'orderDetail.currencyCode as currencyCode',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'VendorPaymentArchive.createdDate as createdDate',
            'VendorPaymentArchive.amount as amount',
            'VendorPaymentArchive.commissionAmount as commissionAmount',
        ];

        const relations = [
            {
                tableName: 'VendorPaymentArchive.paymentItems',
                aliasName: 'paymentItems',
            },
            {
                tableName: 'paymentItems.payment',
                aliasName: 'payment',
            },
            {
                tableName: 'payment.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'VendorPaymentArchive.vendorId',
            op: 'and',
            value: request.user.vendorId,
        });

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`VendorPaymentArchive`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`VendorPaymentArchive`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });

        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['orderDetail.shippingFirstname'],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'VendorPaymentArchive.createdDate',
            order: 'DESC',
        });

        const orderList: any = await this.vendorPaymentArchiveService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete payment list count.',
            data: orderList,
        };
        return response.status(200).send(successResponse);
    }
    // Archive Payment Export API
    /**
     * @api {get} /api/vendor-sales/bulk-archive-payment-export  Bulk Archive Payment Export API
     * @apiGroup Vendor Sales
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got archive payment list",
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
     * @apiSampleRequest /api/vendor-sales/bulk-archive-payment-export
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/bulk-archive-payment-export')
    // @Authorized('vendor')
    public async paymentArchiveExportBulk(@QueryParam('vendorId') vendorId: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Product earning export detail');
        // Excel sheet column define
        worksheet.columns = [
            { header: 'SubOrderId', key: 'subOrderId', size: 16, width: 15 },
            { header: 'orderDate', key: 'orderDate', size: 16, width: 15 },
            { header: 'archiveDate', key: 'archiveDate', size: 16, width: 15 },
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
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const rows = [];
        const select = [
            'VendorPaymentArchive.id as vendorArchivePaymentId',
            'VendorPaymentArchive.vendorOrderId as vendorOrderId',
            'orderDetail.shippingFirstname as customerFirstName',
            'orderDetail.shippingCity as shippingCity',
            'orderDetail.shippingCountry as shippingCountry',
            'orderDetail.shippingZone as shippingZone',
            'orderDetail.currencyCode as currencyCode',
            'orderDetail.currencySymbolLeft as currencySymbolLeft',
            'orderDetail.currencySymbolRight as currencySymbolRight',
            'orderDetail.createdDate as orderCreatedDate',
            'VendorPaymentArchive.createdDate as archivedDate',
            'VendorPaymentArchive.amount as amount',
            'VendorPaymentArchive.commissionAmount as commissionAmount',
        ];

        const relations = [
            {
                tableName: 'VendorPaymentArchive.paymentItems',
                aliasName: 'paymentItems',
            },
            {
                tableName: 'paymentItems.payment',
                aliasName: 'payment',
            },
            {
                tableName: 'payment.orderDetail',
                aliasName: 'orderDetail',
            },
        ];
        const groupBy = [];

        const whereConditions = [];

        whereConditions.push({
            name: 'VendorPaymentArchive.vendorId',
            op: 'and',
            value: vendorId,
        });

        const searchConditions = [];
        const sort = [];
        sort.push({
            name: 'VendorPaymentArchive.createdDate',
            order: 'DESC',
        });

        const orderList: any = await this.vendorPaymentArchiveService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        for (const payment of orderList) {
            const netAmount = payment.amount - payment.commissionAmount;
            const vendorOrder = await this.vendorOrdersService.findOne({ where: { vendorOrderId: payment.vendorOrderId } });
            let subOrderId;
            if (vendorOrder) {
                subOrderId = vendorOrder.subOrderId;
            } else {
                subOrderId = '';
            }
            if (payment.currencySymbolLeft !== undefined) {
                rows.push([subOrderId, payment.orderCreatedDate, payment.archivedDate, payment.customerFirstName, payment.shippingCity + ',' + payment.shippingCountry, payment.currencySymbolLeft + payment.amount,
                    payment.currencySymbolLeft + payment.commissionAmount, payment.currencySymbolLeft + netAmount]);
            } else if (payment.currencySymbolRight !== undefined) {
                rows.push([subOrderId, payment.orderCreatedDate, payment.archivedDate, payment.customerFirstName, payment.shippingCity + ',' + payment.shippingCountry, payment.amount + payment.currencySymbolRight,
                    payment.commissionAmount + payment.currencySymbolRight, netAmount + payment.currencySymbolRight]);
            } else {
                rows.push([subOrderId, payment.orderCreatedDate, payment.archivedDate, payment.customerFirstName, payment.shippingCity + ',' + payment.shippingCountry, payment.amount,
                    payment.commissionAmount, netAmount]);
            }
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorPaymentArchiveExcel_' + Date.now() + '.xlsx';
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

    // Archive Payment Export API
    /**
     * @api {get} /api/vendor-sales/archive-payment-export  Archive Payment Export API
     * @apiGroup Vendor Sales
     * @apiParam (Request body) {String} vendorPaymentArchiveId vendorPaymentArchiveId
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got archive payment list",
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
     * @apiSampleRequest /api/vendor-sales/archive-payment-export
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/archive-payment-export')
    @Authorized('vendor')
    public async paymentArchiveExport(@QueryParam('vendorPaymentArchiveId') vendorPaymentArchiveId: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Payment Archive detail');
        const splitPaymentArchive = vendorPaymentArchiveId.split(',');
        for (const record of splitPaymentArchive) {
            const dataId = await this.vendorPaymentArchiveService.findOne({ where: { id: record } });
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid ArchiveId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'SubOrderId', key: 'subOrderId', size: 16, width: 15 },
            { header: 'orderDate', key: 'orderDate', size: 16, width: 15 },
            { header: 'archiveDate', key: 'archiveDate', size: 16, width: 15 },
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
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const rows = [];
        for (const payments of splitPaymentArchive) {
            const payment = await this.vendorPaymentArchiveService.findOne({ where: { id: payments } });
            const paymentItem = await this.paymentItemsService.findOne({ where: { paymentItemId: payment.paymentItemId } });
            const orderProduct = await this.orderProductService.findOne({ where: { orderProductId: paymentItem.orderProductId } });
            const order = await this.orderService.findOrder({ where: { orderId: orderProduct.orderId } });
            const vendorOrder = await this.vendorOrdersService.findOne({ where: { vendorOrderId: payment.vendorOrderId } });
            let subOrderId;
            if (vendorOrder) {
                subOrderId = vendorOrder.subOrderId;
            } else {
                subOrderId = '';
            }
            const netAmount = payment.amount - payment.commissionAmount;
            if (order.currencySymbolLeft !== undefined) {
                rows.push([subOrderId, order.createdDate, payment.createdDate, order.shippingFirstname, order.shippingCity + ',' + order.shippingCountry, order.currencySymbolLeft + payment.amount,
                    order.currencySymbolLeft + payment.commissionAmount, order.currencySymbolLeft + netAmount]);
            } else if (order.currencySymbolRight !== undefined) {
                rows.push([subOrderId, order.createdDate, payment.createdDate, order.shippingFirstname, order.shippingCity + ',' + order.shippingCountry, payment.amount + order.currencySymbolRight,
                    payment.commissionAmount + order.currencySymbolRight, netAmount + order.currencySymbolRight]);
            } else {
                rows.push([subOrderId, order.createdDate, payment.createdDate, order.shippingFirstname, order.shippingCity + ',' + order.shippingCountry, payment.amount,
                    payment.commissionAmount, netAmount]);
            }
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './VendorPaymentArchiveExcel_' + Date.now() + '.xlsx';
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
