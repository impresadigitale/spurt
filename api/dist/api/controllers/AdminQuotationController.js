"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const QuotationService_1 = require("../services/QuotationService");
let QuotationController = class QuotationController {
    constructor(quotationService) {
        this.quotationService = quotationService;
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
    reasonList(limit, offset, productName, startDate, endDate, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                const quotationCount = yield this.quotationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const countVal = {
                    status: 1,
                    message: 'Successfully listed quotation requested list count',
                    data: quotationCount,
                };
                return response.status(200).send(countVal);
            }
            const quotationList = yield this.quotationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully listed quotation requested list',
                data: quotationList,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/quotation-request-list'),
    routing_controllers_1.Authorized(''),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('productName')), tslib_1.__param(3, routing_controllers_1.QueryParam('startDate')), tslib_1.__param(4, routing_controllers_1.QueryParam('endDate')), tslib_1.__param(5, routing_controllers_1.QueryParam('count')), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationController.prototype, "reasonList", null);
QuotationController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/admin-quotation'),
    tslib_1.__metadata("design:paramtypes", [QuotationService_1.QuotationService])
], QuotationController);
exports.QuotationController = QuotationController;
//# sourceMappingURL=AdminQuotationController.js.map