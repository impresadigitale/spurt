/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Res, Authorized, Get, QueryParam } from 'routing-controllers';
import { QuotationService } from '../services/QuotationService';

@JsonController('/admin-quotation')
export class QuotationController {
    constructor(private quotationService: QuotationService) {
    }

    // Quotation List
    /**
     * @api {get} /api/admin-quotation/quotation-request-list Quotation Request List
     * @apiGroup Admin Quotation
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} startDate search by startDate
     * @apiParam (Request body) {String} endDate search by endDate
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "productName": "",
     *      "startDate": "",
     *      "endDate": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Listed..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-quotation/quotation-request-list
     * @apiErrorExample {json} quotation List error
     * HTTP/1.1 500 Internal Server Error
     */
    // quotation request list Function
    @Get('/quotation-request-list')
    @Authorized('')
    public async reasonList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('productName') productName: string, @QueryParam('startDate') startDate: string, @QueryParam('endDate') endDate: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [
            'Quotation.id as quotationId',
            'Quotation.quantity as quantity',
            'Quotation.quantityUnit as quantityUnit',
            'Quotation.orderValue as orderValue',
            'Quotation.purpose as purpose',
            'Quotation.comments as comments',
            'Quotation.productId as productId',
            'product.name as name',
            'product.price as productPrice',
            'Quotation.createdDate as createdDate',
            'Quotation.customerId as customerId',
            'customer.firstName as customerfirstName',
            'customer.lastName as customerlastName',
            'customer.email as email',
        ];

        const relations = [
            {
                tableName: 'Quotation.product',
                aliasName: 'product',
            },
            {
                tableName: 'Quotation.customer',
                aliasName: 'customer',
            },
        ];
        const groupBy = [];

        const whereConditions = [];
        if (startDate && startDate !== '') {

            whereConditions.push({
                name: '`Quotation`.`created_date`',
                op: 'raw',
                sign: '>=',
                value: startDate + ' 00:00:00',
            });

        }
        if (endDate && endDate !== '') {

            whereConditions.push({
                name: '`Quotation`.`created_date`',
                op: 'raw',
                sign: '<=',
                value: endDate + ' 23:59:59',
            });

        }
        const searchConditions = [];
        if (productName && productName !== '') {
            searchConditions.push({
                name: ['product.name'],
                value: productName.toLowerCase(),
            });
        }

        const sort = [];
        sort.push({
            name: 'Quotation.createdDate',
            order: 'DESC',
        });
        if (count) {
            const quotationCount: any = await this.quotationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const countVal: any = {
                status: 1,
                message: 'Successfully listed quotation requested list count',
                data: quotationCount,
            };
            return response.status(200).send(countVal);
        }

        const quotationList: any = await this.quotationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully listed quotation requested list',
            data: quotationList,
        };
        return response.status(200).send(successResponse);
    }
}
