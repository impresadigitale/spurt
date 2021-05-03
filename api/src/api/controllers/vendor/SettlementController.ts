/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post,
    Body,
    JsonController,
    Authorized,
    Res,
    Get,
    QueryParam,
    Req,
    Param,
    BodyParam,
} from 'routing-controllers';
import { CreateSettlementRequest } from './requests/CreateSettlementRequest';
import { Settlement } from '../../models/Settlement';
import { SettlementItem } from '../../models/SettlementItem';
import { SettlementService } from '../../services/SettlementService';
import { VendorOrdersService } from '../../services/VendorOrderService';
import { SettlementItemService } from '../../services/SettlementItemService';
import { OrderProductService } from '../../services/OrderProductService';
import { OrderService } from '../../services/OrderService';
import { VendorService } from '../../services/VendorService';
import { VendorInvoiceService } from '../../services/VendorInvoiceService';
import * as fs from 'fs';
import moment from 'moment';

@JsonController('/settlement')
export class SettlementController {
    constructor(private settlementItemService: SettlementItemService, private vendorService: VendorService, private vendorInvoiceService: VendorInvoiceService, private orderService: OrderService, private settlementService: SettlementService, private orderProductService: OrderProductService, private vendorOrderService: VendorOrdersService) {
    }

    // Create Settlement API
    /**
     * @api {post} /api/settlement/create-settlement Create settlement API
     * @apiGroup Settlement
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {String} vendorOrderId vendorOrderId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "vendorOrderId" : [],
     * }],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New settlement is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settlement/create-settlement
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-settlement')
    @Authorized()
    public async createSettlement(@Body({ validate: true }) settlementParam: CreateSettlementRequest, @Res() response: any): Promise<any> {

        const vendorOrders = settlementParam.vendorOrderId;
        for (const vendorOrder of vendorOrders) {
            const findOrder = await this.vendorOrderService.findOne({ where: { vendorOrderId: vendorOrder } });
            if (!findOrder) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid vendor order',
                };
                return response.status(400).send(errorResponse);
            }
        }
        const newSettlement: any = new Settlement();
        newSettlement.title = settlementParam.title;
        newSettlement.noOfOrders = vendorOrders.length;
        const settlement = await this.settlementService.create(newSettlement);
        let totalAmount = 0;
        let currencySymbolLeft = undefined;
        let currencySymbolRight = undefined;
        const arr: any = [];
        for (const vendorOrder of vendorOrders) {
            const settlementItem: any = new SettlementItem();
            const vendOrder = await this.vendorOrderService.findOne({ where: { vendorOrderId: vendorOrder } });
            vendOrder.makeSettlement = 1;
            await this.vendorOrderService.create(vendOrder);
            settlementItem.vendorId = vendOrder.vendorId;
            settlementItem.vendorOrderId = vendOrder.vendorOrderId;
            settlementItem.orderProductId = vendOrder.orderProductId;
            settlementItem.orderId = vendOrder.orderId;
            settlementItem.total = vendOrder.total;
            settlementItem.settlementId = settlement.id;
            const vendor = await this.vendorService.findOne({ where: { vendorId: vendOrder.vendorId } });
            settlementItem.companyName = vendor ? vendor.companyName : '';
            settlementItem.commission = vendOrder ? vendOrder.commission : '';
            const defCommission = (vendOrder.commission && vendOrder.commission > 0) ? vendOrder.commission : 0;
            const commission = vendOrder.total * (defCommission / 100);
            settlementItem.CommissionAmount = commission;
            const amount = vendOrder.total - commission;
            settlementItem.netAmount = amount;
            totalAmount += amount;
            const orderProduct = await this.orderProductService.findOne({ where: { orderProductId: vendOrder.orderProductId } });
            settlementItem.orderProductPrefixId = orderProduct.orderProductPrefixId;
            const order = await this.orderService.findOrder({ where: { orderId: vendOrder.orderId } });
            currencySymbolLeft = order.currencySymbolLeft;
            currencySymbolRight = order.currencySymbolRight;
            arr.push(settlementItem);
        }
        await this.settlementItemService.create(arr);
        newSettlement.totalAmount = totalAmount;
        newSettlement.currencySymbolLeft = currencySymbolLeft;
        newSettlement.currencySymbolRight = currencySymbolRight;
        await this.settlementService.create(newSettlement);
        const successResponse: any = {
            status: 1,
            message: 'Successfully created new Settlement',
        };
        return response.status(200).send(successResponse);
    }

    // Settlement List API
    /**
     * @api {get} /api/settlement/settlement-list  Settlement list API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword search by title
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} amountFrom search by starting amount
     * @apiParam (Request body) {String} amountTo search by ending Amount
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
     * @apiSampleRequest /api/settlement/settlement-list
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/settlement-list')
    @Authorized()
    public async orderListtt(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string,
                             @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('amountFrom') amountFrom: string, @QueryParam('amountTo') amountTo: string,
                             @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'Settlement.id as id',
            'Settlement.createdDate as createdDate',
            'Settlement.title as title',
            'Settlement.currencySymbolLeft as currencySymbolLeft',
            'Settlement.currencySymbolRight as currencySymbolRight',
            'Settlement.totalAmount as totalAmount',
            'Settlement.noOfOrders as noOfOrders'];

        const relations = [];
        const groupBy = [];

        const whereConditions = [];

        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`Settlement`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDateMin,
            });

        }

        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`Settlement`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDateMin,
            });

        }

        if (amountFrom && amountFrom !== '') {

            whereConditions.push({
                name: '`Settlement`.`total_amount`',
                op: 'raw',
                sign: '>=',
                value: amountFrom,
            });

        }

        if (amountTo && amountTo !== '') {

            whereConditions.push({
                name: '`Settlement`.`total_amount`',
                op: 'raw',
                sign: '<=',
                value: amountTo,
            });

        }

        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['Settlement.title'],
                value: keyword.toLowerCase(),
            });

        }

        const sort = [];
        sort.push({
            name: 'Settlement.createdDate',
            order: 'DESC',
        });

        if (count) {
            const orderCount = await this.settlementService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const successCount: any = {
                status: 1,
                message: 'Successfully got settlement count.',
                data: orderCount,
            };
            return response.status(200).send(successCount);
        }

        const orderList: any = await this.settlementService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got settlement list.',
            data: orderList,
        };
        return response.status(200).send(successResponse);
    }

    // Get Settlement Detail API
    /**
     * @api {get} /api/settlement/settlement/:id Settlement Detail API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get settlement detail",
     * "data":{
     * }
     * "status": "1"
     * }
     * @apiSampleRequest /api/settlement/settlement/:id
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/settlement/:id')
    @Authorized()
    public async settlementDetails(@Param('id') id: number, @Res() response: any): Promise<any> {
        const settlement = await this.settlementService.findOne({
            where: { id },
        });
        settlement.items = await this.settlementItemService.findAll({
            where: { settlementId: settlement.id },
        });
        const successResponse: any = {
            status: 1,
            message: 'successfully got Settlement details. ',
            data: settlement,
        };
        return response.status(200).send(successResponse);

    }

    // Delete Multiple Settlement API
    /**
     * @api {post} /api/settlement/delete-multiple-settlement Delete Multiple Settlement API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} settlementId settlementId
     * @apiParamExample {json} Input
     * {
     * "settlementId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted settlement.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/settlement/delete-multiple-settlement
     * @apiErrorExample {json} Settlement Delete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-multiple-settlement')
    @Authorized()
    public async deleteMultipleSettlement(@BodyParam('settlementId') settlementId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const settlements: any = settlementId.split(',');
        for (const settlement of settlements) {
            const dataId = await this.settlementService.findOne(settlement);
            if (!dataId) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid settlementId',
                };
                return response.status(400).send(errorResponse);
            } else {
                await this.settlementService.delete({ id: settlement });
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted settlement',
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Report List API
    /**
     * @api {get} /api/settlement/vendor-sales-report-list  Vendor Sales Report list API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} allVendor allVendor
     * @apiParam (Request body) {String} vendorsId vendorsId
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
     * @apiSampleRequest /api/settlement/vendor-sales-report-list
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-sales-report-list')
    @Authorized()
    public async vendorSalesReportList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('allVendor') allVendor: number, @QueryParam('vendorsId') vendorsId: string,
                                       @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string,
                                       @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'vendor.vendorId as vendorId',
            'vendor.companyName as companyName',
            'vendor.companyState as companyState',
            'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
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
        },
        ];
        const groupBy = [
            {
                name: 'VendorOrders.vendorId',
            },
        ];

        const whereConditions = [
        ];
        whereConditions.push({
            name: 'orderDetail.paymentProcess',
            op: 'and',
            value: 1,
        }, {
            name: 'orderDetail.paymentStatus',
            op: 'and',
            value: 1,
        });

        if (vendorsId && vendorsId !== undefined) {
            whereConditions.push({
                name: 'vendor.vendorId',
                op: 'IN',
                value: vendorsId.split(','),
            });
        }

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

        const searchConditions = [];
        const sort = [{
            name: 'vendorOrderId',
            order: 'DESC',
        }];
        if (count) {
            const orderCount = await this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const successCount: any = {
                status: 1,
                message: 'Successfully got sales report count.',
                data: orderCount,
            };
            return response.status(200).send(successCount);
        }

        const orderList: any = await this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderResponse = orderList.map(async (value: any) => {
            const vendorOrder = value;
            const subOrderSelect = [
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
                value: value.vendorId,
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
            const vendorOrderList: any = await this.vendorOrderService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
            const val = vendorOrderList.map(async (element: any) => {
                const temp = element;
                if (temp.cancelRequestStatus === 1) {
                    temp.orderStatusName = 'Cancelled';
                }
                if (element.taxType !== 0 && (value.companyState !== null)) {
                    if (value.companyState.toLowerCase() === element.paymentZone.toLowerCase()) {
                        temp.taxTypeValue = 'SGST,CGST';
                    } else if (value.companyState.toLowerCase() !== element.paymentZone.toLowerCase()) {
                        temp.taxTypeValue = 'IGST';
                    }
                } else {
                    temp.taxTypeValue = '';
                }
                const invoice = await this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: element.orderId, vendorId: element.vendorId } });
                if (invoice) {
                    temp.invoiceNo = invoice.invoiceNo;
                    temp.invoicePrefix = invoice.invoicePrefix;
                } else {
                    temp.invoiceNo = '';
                    temp.invoicePrefix = '';
                }
                return temp;
            });
            const product = await Promise.all(val);
            vendorOrder.vendorOrderDetails = product;
            vendorOrder.vendorOrderDetailsCount = await this.vendorOrderService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], true, true);
            return vendorOrder;
        });
        const orderListDetails = await Promise.all(orderResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got vendor sales list.',
            data: orderListDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Total Sales Report List API
    /**
     * @api {get} /api/settlement/total-sales-report-list  Total Sales Report list API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {String} amountFrom search by amountFrom
     * @apiParam (Request body) {String} amountTo search by amountTo
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got total sales report list",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settlement/total-sales-report-list
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/total-sales-report-list')
    @Authorized()
    public async totalSalesReportList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('amountFrom') amountFrom: string,
                                      @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('amountTo') amountTo: string,
                                      @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.orderId as orderId',
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
        const groupBy = [
            {
                name: 'VendorOrders.orderId',
            },
        ];
        const whereConditions = [
        ];
        whereConditions.push({
            name: 'orderDetail.paymentProcess',
            op: 'and',
            value: 1,
        }, {
            name: 'orderDetail.paymentStatus',
            op: 'and',
            value: 1,
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
        if (count) {
            const orderCount = await this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const successCount: any = {
                status: 1,
                message: 'Successfully got sales report count.',
                data: orderCount,
            };
            return response.status(200).send(successCount);
        }
        const orderList: any = await this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderResponse = orderList.map(async (value: any) => {
            const vendorOrder = value;
            const selectOrderProduct = [
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
                'orderDetail.orderPrefixId as orderPrefixId',
                'orderDetail.paymentZone as paymentZone',
                'orderProduct.name as productName',
                'orderProduct.skuName as skuName',
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
            ];
            const orderProductrelations = [{
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
            const orderProductgroupBy = [];
            const orderProductWhereConditions = [
            ];
            orderProductWhereConditions.push({
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            }, {
                name: 'VendorOrders.orderId',
                op: 'and',
                value: value.orderId,
            });
            if (startDate && startDate !== '') {
                orderProductWhereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '>=',
                    value: startDateMin,
                });
            }
            if (endDate && endDate !== '') {
                orderProductWhereConditions.push({
                    name: '`VendorOrders`.`created_date`',
                    op: 'raw',
                    sign: '<=',
                    value: endDateMin,
                });
            }
            if (amountFrom && amountFrom !== '') {
                orderProductWhereConditions.push({
                    name: '`VendorOrders`.`total`',
                    op: 'raw',
                    sign: '>=',
                    value: amountFrom,
                });
            }
            if (amountTo && amountTo !== '') {
                orderProductWhereConditions.push({
                    name: '`VendorOrders`.`total`',
                    op: 'raw',
                    sign: '<=',
                    value: amountTo,
                });
            }
            const orderProductSearchConditions = [];
            const orderProductSort = [{
                name: 'vendorOrderId',
                order: 'DESC',
            }];
            const orderProductList: any = await this.vendorOrderService.listByQueryBuilder(limit, offset, selectOrderProduct, orderProductWhereConditions, orderProductSearchConditions, orderProductrelations, orderProductgroupBy, orderProductSort, false, true);
            const val = orderProductList.map(async (element: any) => {
                const temp = element;
                if (temp.cancelRequestStatus === 1) {
                    temp.orderStatusName = 'Cancelled';
                }
                if (element.taxType !== 0 && (element.companyState !== null)) {
                    if (element.companyState.toLowerCase() === element.paymentZone.toLowerCase()) {
                        temp.taxTypeValue = 'SGST,CGST';
                    } else if (element.companyState.toLowerCase() !== element.paymentZone.toLowerCase()) {
                        temp.taxTypeValue = 'IGST';
                    }
                } else {
                    temp.taxTypeValue = '';
                }
                const invoice = await this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: element.orderId, vendorId: element.vendorId } });
                temp.invoiceNo = invoice ? invoice.invoiceNo : '';
                temp.invoicePrefix = invoice ? invoice.invoicePrefix : '';
                return temp;
            });
            const orderProductDetails = await Promise.all(val);
            vendorOrder.orderProduct = orderProductDetails;
            return vendorOrder;
        });
        const orderListDetails = await Promise.all(orderResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got total vendor sales list.',
            data: orderListDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Settlement Report List API
    /**
     * @api {get} /api/settlement/settlement-report-list  Settlement Report list API
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} vendorsId vendorsId
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {Number} settlementFlag 1->settled 2->not settled
     * @apiParam (Request body) {String} orderStatus search by orderStatus
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Settlement report list",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settlement/settlement-report-list
     * @apiErrorExample {json} settlement error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/settlement-report-list')
    @Authorized()
    public async settlementReportList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('vendorsId') vendorsId: string,
                                      @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('settlementFlag') settlementFlag: number, @QueryParam('orderStatus') orderStatus: string,
                                      @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const select = [
            'vendor.vendorId as vendorId',
            'vendor.companyName as companyName',
            'vendor.companyState as companyState',
            'VendorOrders.subOrderStatusId as subOrderStatusId',
            'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
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
        },
        ];
        const groupBy = [
            {
                name: 'VendorOrders.vendorId',
            },
        ];

        const whereConditions = [
        ];
        whereConditions.push({
            name: 'orderDetail.paymentProcess',
            op: 'and',
            value: 1,
        }, {
            name: 'orderDetail.paymentStatus',
            op: 'and',
            value: 1,
        });

        if (vendorsId && vendorsId !== undefined) {
            whereConditions.push({
                name: 'vendor.vendorId',
                op: 'IN',
                value: vendorsId.split(','),
            });
        }

        if (+(settlementFlag) === 1) {
            whereConditions.push({
                name: 'VendorOrders.makeSettlement',
                op: 'and',
                value: 1,
            });
        } else if (+(settlementFlag) === 2) {
            whereConditions.push({
                name: 'VendorOrders.makeSettlement',
                op: 'and',
                value: 0,
            });
        }

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

        if (orderStatus && orderStatus !== undefined) {
            whereConditions.push({
                name: 'VendorOrders.subOrderStatusId',
                op: 'IN',
                value: orderStatus.split(','),
            });
        }

        const searchConditions = [];
        const sort = [{
            name: 'vendorOrderId',
            order: 'DESC',
        }];
        if (count) {
            const orderCount = await this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const successCount: any = {
                status: 1,
                message: 'Successfully got sales report count.',
                data: orderCount,
            };
            return response.status(200).send(successCount);
        }

        const orderList: any = await this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const orderResponse = orderList.map(async (value: any) => {
            const vendorOrder = value;
            const subOrderSelect = [
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
                'orderProduct.name as productName',
                'orderProduct.skuName as skuName',
                'orderDetail.paymentZone as paymentZone',
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
                'VendorOrders.makeSettlement as makeSettlement',
            ];

            const subOrderRelations = [
                {
                    tableName: 'VendorOrders.vendor',
                    aliasName: 'vendor',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
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
                value: value.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            });
            if (vendorsId && vendorsId !== undefined) {
                subOrderWhereConditions.push({
                    name: 'vendor.vendorId',
                    op: 'IN',
                    value: vendorsId.split(','),
                });
            }
            if (orderStatus && orderStatus !== undefined) {
                subOrderWhereConditions.push({
                    name: 'VendorOrders.subOrderStatusId',
                    op: 'IN',
                    value: orderStatus.split(','),
                });
            }

            if (+(settlementFlag) === 1) {
                subOrderWhereConditions.push({
                    name: 'VendorOrders.makeSettlement',
                    op: 'and',
                    value: 1,
                });
            } else if (+(settlementFlag) === 2) {
                subOrderWhereConditions.push({
                    name: 'VendorOrders.makeSettlement',
                    op: 'and',
                    value: 0,
                });
            }
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
            const vendorOrderList: any = await this.vendorOrderService.listByQueryBuilder(limit, offset, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
            const val = vendorOrderList.map(async (element: any) => {
                const temp = element;
                if (temp.cancelRequestStatus === 1) {
                    temp.orderStatusName = 'Cancelled';
                }
                if (element.taxType !== 0 && (value.companyState !== null )) {
                    if (value.companyState.toLowerCase() === element.paymentZone.toLowerCase()) {
                        temp.taxTypeValue = 'SGST,CGST';
                    } else if (value.companyState.toLowerCase() !== element.paymentZone.toLowerCase()) {
                        temp.taxTypeValue = 'IGST';
                    }
                } else {
                    temp.taxTypeValue = '';
                }
                const invoice = await this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: element.orderId, vendorId: element.vendorId } });
                if (invoice) {
                    temp.invoiceNo = invoice.invoiceNo;
                    temp.invoicePrefix = invoice.invoicePrefix;
                } else {
                    temp.invoiceNo = '';
                    temp.invoicePrefix = '';
                }
                if (element.makeSettlement === 1) {
                    temp.settlementStatus = 'Settled';
                } else {
                    temp.settlementStatus = 'Not Settled';
                }
                return temp;
            });
            const product = await Promise.all(val);
            vendorOrder.vendorOrderDetails = product;
            vendorOrder.vendorOrderDetailsCount = await this.vendorOrderService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], [], true, true);
            return vendorOrder;
        });
        const orderListDetails = await Promise.all(orderResponse);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got settlement report list.',
            data: orderListDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Total sales report Download
    /**
     * @api {get} /api/settlement/total-sales-report-excel Total sales report excel download
     * @apiGroup Settlement
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
     * @apiSampleRequest /api/settlement/total-sales-report-excel
     * @apiErrorExample {json} Total sales report excel error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/total-sales-report-excel')
    @Authorized()
    public async totalSalesExcelView(@QueryParam('amountFrom') amountFrom: string,
                                     @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('amountTo') amountTo: string,
                                     @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Total Sales Export sheet', { properties: { defaultColWidth: 15 } });
        const rows = [];
        const select = [
            'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
            'orderDetail.orderPrefixId as orderPrefixId',
            'orderDetail.orderId as orderId',
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
        const groupBy = [
            {
                name: 'VendorOrders.orderId',
            },
        ];

        const whereConditions = [
        ];
        whereConditions.push({
            name: 'orderDetail.paymentProcess',
            op: 'and',
            value: 1,
        }, {
            name: 'orderDetail.paymentStatus',
            op: 'and',
            value: 1,
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

        const searchConditions = [];
        const sort = [{
            name: 'vendorOrderId',
            order: 'DESC',
        }];
        const orderList: any = await this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        let grandQuantity = 0;
        let grandBasePrice = 0;
        let grandTax = 0;
        let grandTotal = 0;
        let left: any;
        let right: any;
        for (const orderData of orderList) {
            rows.push(['Order No']);
            rows.push([orderData.orderPrefixId]);
            rows.push(['Order Line No', 'OrderDate', 'Invoice', 'Item', 'Description', 'Quantity', 'Base Value', 'Tax', 'Tax Type', 'Total Value', 'Order Status']);
            const subOrderSelect = [
                'VendorOrders.vendorOrderId as vendorOrderId',
                'VendorOrders.orderId as orderId',
                'VendorOrders.vendorId as vendorId',
                'vendor.companyState as companyState',
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
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
                'orderProduct.name as productName',
                'orderProduct.skuName as skuName',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
            ];

            const subOrderRelations = [
                {
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
            const subOrderWhereConditions = [];
            subOrderWhereConditions.push({
                name: 'VendorOrders.order_id',
                op: 'and',
                value: orderData.orderId,
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
            const vendorOrderList: any = await this.vendorOrderService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
            let quantity = 0;
            let basePrice = 0;
            let tax = 0;
            let total = 0;
            let currencySymbolLeft = undefined;
            let currencySymbolRight = undefined;
            for (const vendOrder of vendorOrderList) {
                if (vendOrder.cancelRequestStatus === 1) {
                    vendOrder.orderStatusName = 'Cancelled';
                }
                if (vendOrder.taxType !== 0 && (vendOrder.companyState !== null)) {
                    if (vendOrder.companyState.toLowerCase() === vendOrder.paymentZone.toLowerCase()) {
                        vendOrder.taxTypeValue = 'SGST,CGST';
                    } else if (vendOrder.companyState.toLowerCase() !== vendOrder.paymentZone.toLowerCase()) {
                        vendOrder.taxTypeValue = 'IGST';
                    }
                } else {
                    vendOrder.taxTypeValue = '';
                }
                const invoice = await this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: vendOrder.orderId, vendorId: vendOrder.vendorId } });
                let taxValueInAmount;
                if (vendOrder.taxType === 2) {
                    taxValueInAmount = (vendOrder.basePrice * (vendOrder.taxValue / 100)).toFixed(2);
                } else {
                    taxValueInAmount = vendOrder.taxValue;
                }
                quantity += parseFloat(vendOrder.quantity);
                basePrice += parseFloat(vendOrder.basePrice);
                tax += parseFloat(taxValueInAmount);
                total += parseFloat(vendOrder.total);
                currencySymbolLeft = vendOrder.currencySymbolLeft;
                currencySymbolRight = vendOrder.currencySymbolRight;
                rows.push([vendOrder.orderProductPrefixId, vendOrder.createdDate, invoice ? invoice.invoiceNo : '', vendOrder.skuName, vendOrder.name, vendOrder.quantity, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.basePrice + (currencySymbolRight ? currencySymbolRight : ''),
                (currencySymbolLeft ? currencySymbolLeft : '') + taxValueInAmount + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.taxTypeValue, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.total + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.orderStatusName]);
            }
            grandQuantity += quantity;
            grandBasePrice += basePrice;
            grandTax += tax;
            grandTotal += total;
            left = (currencySymbolLeft !== undefined) ? currencySymbolLeft : '';
            right = (currencySymbolRight !== undefined) ? currencySymbolRight : '';
            rows.push(['', '', '', '', 'Sub total', quantity, (left ? left : '') + basePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + tax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + total.toFixed(2) + (right ? right : ''), '']);
        }
        rows.push(['', '', '', '', 'Grand total', grandQuantity, (left ? left : '') + grandBasePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + grandTax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + grandTotal.toFixed(2) + (right ? right : ''), '']);
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './TotalSalesReportExcel_' + Date.now() + '.xlsx';
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

    // Total vendor sales report Download
    /**
     * @api {get} /api/settlement/total-vendor-sales-report-excel Total Vendor sales report excel download
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} allVendor allVendor
     * @apiParam (Request body) {String} vendorsId vendorsId
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download total sales report excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/settlement/total-vendor-sales-report-excel
     * @apiErrorExample {json} Total vendor sales report excel error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/total-vendor-sales-report-excel')
    @Authorized()
    public async totalVendorSalesExcelView(@QueryParam('allVendor') allVendor: number, @QueryParam('vendorsId') vendorsId: string,
                                           @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string,
                                           @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Total Vendor Sales Export sheet', { properties: { defaultColWidth: 15 } });
        const rows = [];
        const select = [
            'vendor.vendorId as vendorId',
            'vendor.companyName as companyName',
            'vendor.companyState as companyState',
            'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
            'COUNT(VendorOrders.vendorOrderId) as vendorOrderCount',
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
        },
        ];
        const groupBy = [
            {
                name: 'VendorOrders.vendorId',
            },
        ];

        const whereConditions = [
        ];
        whereConditions.push({
            name: 'orderDetail.paymentProcess',
            op: 'and',
            value: 1,
        }, {
            name: 'orderDetail.paymentStatus',
            op: 'and',
            value: 1,
        });

        if (vendorsId && vendorsId !== undefined) {
            whereConditions.push({
                name: 'vendor.vendorId',
                op: 'IN',
                value: vendorsId.split(','),
            });
        }

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

        const searchConditions = [];
        const sort = [{
            name: 'vendorOrderId',
            order: 'DESC',
        }];
        const orderList: any = await this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        let grandQuantity = 0;
        let grandBasePrice = 0;
        let grandTax = 0;
        let grandTotal = 0;
        let left: any;
        let right: any;
        for (const orderData of orderList) {
            rows.push(['Member', 'Records']);
            rows.push([orderData.companyName, orderData.vendorOrderCount]);
            rows.push(['Order Line No', 'OrderDate', 'Invoice', 'Item', 'Description', 'Quantity', 'Base Value', 'Tax', 'Tax Type', 'Total Value', 'Order Status']);
            const subOrderSelect = [
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
                'orderProduct.name as productName',
                'orderDetail.paymentZone as paymentZone',
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
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
                value: orderData.vendorId,
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
            const vendorOrderList: any = await this.vendorOrderService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
            let quantity = 0;
            let basePrice = 0;
            let tax = 0;
            let total = 0;
            let currencySymbolLeft = undefined;
            let currencySymbolRight = undefined;
            for (const vendOrder of vendorOrderList) {
                if (vendOrder.cancelRequestStatus === 1) {
                    vendOrder.orderStatusName = 'Cancelled';
                }
                if (vendOrder.taxType !== 0 && (orderData.companyState !== null )) {
                    if (orderData.companyState.toLowerCase() === vendOrder.paymentZone.toLowerCase()) {
                        vendOrder.taxTypeValue = 'SGST,CGST';
                    } else if (orderData.companyState.toLowerCase() !== vendOrder.paymentZone.toLowerCase()) {
                        vendOrder.taxTypeValue = 'IGST';
                    }
                } else {
                    vendOrder.taxTypeValue = '';
                }
                const invoice = await this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: vendOrder.orderId, vendorId: vendOrder.vendorId } });
                const invoiceNo = invoice ? invoice.invoiceNo : '';
                let taxValueInAmount;
                if (vendOrder.taxType === 2) {
                    taxValueInAmount = (vendOrder.basePrice * (vendOrder.taxValue / 100)).toFixed(2);
                } else {
                    taxValueInAmount = vendOrder.taxValue;
                }
                quantity += parseFloat(vendOrder.quantity);
                basePrice += parseFloat(vendOrder.basePrice);
                tax += parseFloat(taxValueInAmount);
                total += parseFloat(vendOrder.total);
                currencySymbolLeft = vendOrder.currencySymbolLeft;
                currencySymbolRight = vendOrder.currencySymbolRight;
                rows.push([vendOrder.orderProductPrefixId, vendOrder.createdDate, invoiceNo, vendOrder.skuName, vendOrder.name, vendOrder.quantity, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.basePrice + (currencySymbolRight ? currencySymbolRight : ''),
                (currencySymbolLeft ? currencySymbolLeft : '') + taxValueInAmount + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.taxTypeValue, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.total + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.orderStatusName]);
            }
            grandQuantity += quantity;
            grandBasePrice += basePrice;
            grandTax += tax;
            grandTotal += total;
            left = (currencySymbolLeft !== undefined) ? currencySymbolLeft : '';
            right = (currencySymbolRight !== undefined) ? currencySymbolRight : '';
            rows.push(['', '', '', '', 'Sub total', quantity, (left ? left : '') + basePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + tax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + total.toFixed(2) + (right ? right : ''), '']);
        }
        rows.push(['', '', '', '', 'Grand total', grandQuantity, (left ? left : '') + grandBasePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + grandTax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + grandTotal.toFixed(2) + (right ? right : ''), '']);
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './TotalVendorSalesReportExcel_' + Date.now() + '.xlsx';
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

    // Settlement report Download
    /**
     * @api {get} /api/settlement/settlement-report-excel Settlement Report excel download
     * @apiGroup Settlement
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} vendorsId vendorsId
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {Number} settlementFlag 1->settled 2->not settled
     * @apiParam (Request body) {String} orderStatus
     * @apiParam (Request body) {String} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download total settlement report excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/settlement/settlement-report-excel
     * @apiErrorExample {json} Settlement report excel error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/settlement-report-excel')
    // @Authorized()
    public async settlementReportView(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('vendorsId') vendorsId: string, @QueryParam('orderStatus') orderStatus: string,
                                      @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('settlementFlag') settlementFlag: number,
                                      @Req() request: any, @Res() response: any): Promise<any> {
        const startDateMin = moment(startDate).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const date = endDate + ' 23:59:59';
        const endDateMin = moment(date).subtract(5, 'hours').subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Settlement Export sheet', { views: [{ defaultColWidth: 25 }] });
        const rows = [];
        const select = [
            'vendor.vendorId as vendorId',
            'vendor.companyName as companyName',
            'vendor.companyState as companyState',
            'MAX(VendorOrders.vendorOrderId) as vendorOrderId',
            'COUNT(VendorOrders.vendorOrderId) as vendorOrderCount',
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
        },
        ];
        const groupBy = [
            {
                name: 'VendorOrders.vendorId',
            },
        ];

        const whereConditions = [
        ];
        whereConditions.push({
            name: 'orderDetail.paymentProcess',
            op: 'and',
            value: 1,
        }, {
            name: 'orderDetail.paymentStatus',
            op: 'and',
            value: 1,
        });
        if (orderStatus && orderStatus !== undefined) {
            whereConditions.push({
                name: 'VendorOrders.subOrderStatusId',
                op: 'IN',
                value: orderStatus.split(','),
            });
        }
        if (vendorsId && vendorsId !== undefined) {
            whereConditions.push({
                name: 'vendor.vendorId',
                op: 'IN',
                value: vendorsId.split(','),
            });
        }

        if (+(settlementFlag) === 1) {
            whereConditions.push({
                name: 'VendorOrders.makeSettlement',
                op: 'and',
                value: 1,
            });
        } else if (+(settlementFlag) === 2) {
            whereConditions.push({
                name: 'VendorOrders.makeSettlement',
                op: 'and',
                value: 0,
            });
        }

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

        const searchConditions = [];
        const sort = [{
            name: 'vendorOrderId',
            order: 'DESC',
        }];
        const orderList: any = await this.vendorOrderService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        let grandQuantity = 0;
        let grandBasePrice = 0;
        let grandTax = 0;
        let grandTotal = 0;
        let left: any;
        let right: any;
        for (const orderData of orderList) {
            rows.push(['Member', 'Records']);
            rows.push([orderData.companyName, orderData.vendorOrderCount]);
            rows.push(['Order Line No', 'OrderDate', 'Invoice', 'Item', 'Description', 'Settlement Status', 'Quantity', 'Base Value', 'Tax', 'Tax Type', 'Total Value', 'Order Status']);
            const subOrderSelect = [
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
                'orderProduct.name as productName',
                'orderProduct.skuName as skuName',
                'orderStatus.name as orderStatusName',
                'orderStatus.colorCode as orderColorCode',
                'VendorOrders.makeSettlement as makeSettlement',
                'orderDetail.paymentZone as paymentZone',
                'orderProduct.cancelRequestStatus as cancelRequestStatus',
            ];

            const subOrderRelations = [
                {
                    tableName: 'VendorOrders.vendor',
                    aliasName: 'vendor',
                },
                {
                    tableName: 'VendorOrders.orderProduct',
                    aliasName: 'orderProduct',
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
                value: orderData.vendorId,
            }, {
                name: 'orderDetail.paymentProcess',
                op: 'and',
                value: 1,
            }, {
                name: 'orderDetail.paymentStatus',
                op: 'and',
                value: 1,
            });
            if (+(settlementFlag) === 1) {
                subOrderWhereConditions.push({
                    name: 'VendorOrders.makeSettlement',
                    op: 'and',
                    value: 1,
                });
            } else if (+(settlementFlag) === 2) {
                subOrderWhereConditions.push({
                    name: 'VendorOrders.makeSettlement',
                    op: 'and',
                    value: 0,
                });
            }
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
            if (vendorsId && vendorsId !== undefined) {
                subOrderWhereConditions.push({
                    name: 'vendor.vendorId',
                    op: 'IN',
                    value: vendorsId.split(','),
                });
            }

            if (orderStatus && orderStatus !== undefined) {
                subOrderWhereConditions.push({
                    name: 'VendorOrders.subOrderStatusId',
                    op: 'IN',
                    value: orderStatus.split(','),
                });
            }
            const sortOrder = [{
                name: 'vendorOrderId',
                order: 'DESC',
            }];
            const vendorOrderList: any = await this.vendorOrderService.listByQueryBuilder(0, 0, subOrderSelect, subOrderWhereConditions, [], subOrderRelations, [], sortOrder, false, true);
            let quantity = 0;
            let basePrice = 0;
            let tax = 0;
            let total = 0;
            let currencySymbolLeft = undefined;
            let currencySymbolRight = undefined;
            for (const vendOrder of vendorOrderList) {
                if (vendOrder.cancelRequestStatus === 1) {
                    vendOrder.orderStatusName = 'Cancelled';
                }
                if (vendOrder.taxType !== 0 && (orderData.companyState !== null )) {
                    if (orderData.companyState.toLowerCase() === vendOrder.paymentZone.toLowerCase()) {
                        vendOrder.taxTypeValue = 'SGST,CGST';
                    } else if (orderData.companyState.toLowerCase() !== vendOrder.paymentZone.toLowerCase()) {
                        vendOrder.taxTypeValue = 'IGST';
                    }
                } else {
                    vendOrder.taxTypeValue = '';
                }
                const invoice = await this.vendorInvoiceService.findOne({ select: ['invoiceNo', 'invoicePrefix'], where: { orderId: vendOrder.orderId, vendorId: vendOrder.vendorId } });
                const invoiceNo = invoice ? invoice.invoiceNo : '';
                let taxValueInAmount;
                if (vendOrder.taxType === 2) {
                    taxValueInAmount = (vendOrder.basePrice * (vendOrder.taxValue / 100)).toFixed(2);
                } else {
                    taxValueInAmount = vendOrder.taxValue;
                }
                quantity += parseFloat(vendOrder.quantity);
                basePrice += parseFloat(vendOrder.basePrice);
                tax += parseFloat(taxValueInAmount);
                total += parseFloat(vendOrder.total);
                currencySymbolLeft = vendOrder.currencySymbolLeft;
                currencySymbolRight = vendOrder.currencySymbolRight;
                let settlementStatus: any;
                if (vendOrder.makeSettlement === 1) {
                    settlementStatus = 'Settled';
                } else {
                    settlementStatus = 'Not Settled';
                }
                rows.push([vendOrder.orderProductPrefixId, vendOrder.createdDate, invoiceNo, vendOrder.skuName, vendOrder.name, settlementStatus, vendOrder.quantity, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.basePrice + (currencySymbolRight ? currencySymbolRight : ''),
                (currencySymbolLeft ? currencySymbolLeft : '') + taxValueInAmount + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.taxTypeValue, (currencySymbolLeft ? currencySymbolLeft : '') + vendOrder.total + (currencySymbolRight ? currencySymbolRight : ''), vendOrder.orderStatusName]);
            }
            grandQuantity += quantity;
            grandBasePrice += basePrice;
            grandTax += tax;
            grandTotal += total;
            left = (currencySymbolLeft !== undefined) ? currencySymbolLeft : '';
            right = (currencySymbolRight !== undefined) ? currencySymbolRight : '';
            rows.push(['', '', '', '', '', 'Sub total', quantity, (left ? left : '') + basePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + tax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + total.toFixed(2) + (right ? right : ''), '']);
        }
        rows.push(['', '', '', '', '', 'Grand total', grandQuantity, (left ? left : '') + grandBasePrice.toFixed(2) + (right ? right : ''), (left ? left : '') + grandTax.toFixed(2) + (right ? right : ''), '', (left ? left : '') + grandTotal.toFixed(2) + (right ? right : ''), '']);
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './SettlementReportExcel_' + Date.now() + '.xlsx';
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
