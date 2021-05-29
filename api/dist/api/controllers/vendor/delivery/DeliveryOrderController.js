"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryOrderController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const Logger_1 = require("../../../../decorators/Logger");
const DeliveryAllocationService_1 = require("../../../services/DeliveryAllocationService");
const DeliveryStatusService_1 = require("../../../services/DeliveryStatusService");
const DeliveryPersonToLocationService_1 = require("../../../services/DeliveryPersonToLocationService");
let DeliveryOrderController = class DeliveryOrderController {
    constructor(deliveryAllocationService, deliveryPersonToLocationService, deliveryStatusService, log) {
        this.deliveryAllocationService = deliveryAllocationService;
        this.deliveryPersonToLocationService = deliveryPersonToLocationService;
        this.deliveryStatusService = deliveryStatusService;
        this.log = log;
    }
    // Assigned Order List
    /**
     * @api {get} /api/delivery-order/assigned-list Assigned Order List API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order list",
     *      "data":[{
     *      "customerId" : "",
     *      "createdDate" : "",
     *      "allocatedDate" : "",
     *      "orderId" : "",
     *      "orderPrefixId" : "",
     *      "status" : "",
     *      }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-order/assigned-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    assignedList(limit, offset, count, Response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'orderDetail.createdDate as createdDate',
                'DeliveryAllocation.createdDate as allocatedDate',
                'DeliveryAllocation.deliveryOrderStatusId as statusId',
                'DeliveryAllocation.deliveryAllocationId as allocationId',
                'orderDetail.orderId as orderId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'statusDetail.name as status',
                'orderDetail.firstname as firstName',
                'orderDetail.lastname as lastName',
                'orderDetail.email as email',
                'orderDetail.telephone as telephone',
                'orderDetail.shippingFirstname as shippingFirstName',
                'orderDetail.shippingAddress1 as shippingAddress1',
                'orderDetail.shippingAddress2 as shippingAddress2',
                'orderDetail.shippingPostcode as shippingPostcode',
                'orderDetail.shippingCity as shippingCity',
                'orderDetail.shippingCountry as shippingCountry'
            ];
            const relations = [
                {
                    tableName: 'DeliveryAllocation.statusDetail',
                    aliasName: 'statusDetail',
                },
                {
                    tableName: 'DeliveryAllocation.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'DeliveryAllocation.vendorOrderDetail',
                    aliasName: 'vendorOrderDetail',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'delivery_person_id',
                op: 'where',
                value: request.user.id,
            });
            whereConditions.push({
                name: 'delivery_order_status_id',
                op: 'and',
                value: 1,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'DeliveryAllocation.createdDate',
                order: 'DESC',
            });
            const assignedOrderList = yield this.deliveryAllocationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, count, true);
            this.log.info('assignedOrderList', assignedOrderList);
            const successResponse = {
                status: 1,
                message: 'Successfully got list.',
                data: class_transformer_1.classToPlain(assignedOrderList),
            };
            return Response.status(200).send(successResponse);
        });
    }
    // Completed Order List
    /**
     * @api {get} /api/delivery-order/completed-list Completed Order List API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order list",
     *      "data":[{
     *      "customerId" : "",
     *      "createdDate" : "",
     *      "allocatedDate" : "",
     *      "orderId" : "",
     *      "orderPrefixId" : "",
     *      "status" : "",
     *      }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-order/completed-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    completedList(limit, offset, count, Response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'orderDetail.createdDate as createdDate',
                'DeliveryAllocation.createdDate as allocatedDate',
                'DeliveryAllocation.modifiedDate as modifiedDate',
                'DeliveryAllocation.deliveryAllocationId as allocationId',
                'DeliveryAllocation.deliveryOrderStatusId as statusId',
                'orderDetail.orderId as orderId',
                'orderDetail.orderPrefixId as orderPrefixId',
                'statusDetail.name as status',
                'orderDetail.firstname as firstName',
                'orderDetail.lastname as lastName',
                'orderDetail.email as email',
                'orderDetail.telephone as telephone',
                'orderDetail.shippingFirstname as shippingFirstName',
                'orderDetail.shippingAddress1 as shippingAddress1',
                'orderDetail.shippingAddress2 as shippingAddress2',
                'orderDetail.shippingPostcode as shippingPostcode',
                'orderDetail.shippingCity as shippingCity',
                'orderDetail.shippingCountry as shippingCountry'
            ];
            const relations = [
                {
                    tableName: 'DeliveryAllocation.statusDetail',
                    aliasName: 'statusDetail',
                },
                {
                    tableName: 'DeliveryAllocation.orderDetail',
                    aliasName: 'orderDetail',
                },
                {
                    tableName: 'DeliveryAllocation.vendorOrderDetail',
                    aliasName: 'vendorOrderDetail',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'delivery_person_id',
                op: 'where',
                value: request.user.id,
            });
            whereConditions.push({
                name: '`delivery_order_status_id`',
                op: 'and',
                sign: '!=',
                value: 1,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'DeliveryAllocation.createdDate',
                order: 'DESC',
            });
            const assignedOrderList = yield this.deliveryAllocationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, count, true);
            this.log.info('assignedOrderList', assignedOrderList);
            const successResponse = {
                status: 1,
                message: 'Successfully got list.',
                data: class_transformer_1.classToPlain(assignedOrderList),
            };
            return Response.status(200).send(successResponse);
        });
    }
    // Delivery Status List
    /**
     * @api {get} /api/delivery-order/delivery-status-list Delivery Status List API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get delivery status list",
     *      "data":[{
     *      "status" : "",
     *      }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-order/delivery-status-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    deliveryStatusList(limit, offset, count, Response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'name as name',
                'is_active as isActive',
                'priority as priority',
                'color_code as colorCode',
                'delivery_status_id as id'
            ];
            const relations = [];
            const groupBy = [];
            const whereConditions = [];
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'priority',
                order: 'ASC',
            });
            const deliveryStatusList = yield this.deliveryStatusService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, count, true);
            this.log.info('deliveryStatusList', deliveryStatusList);
            const successResponse = {
                status: 1,
                message: 'Successfully got list.',
                data: class_transformer_1.classToPlain(deliveryStatusList),
            };
            return Response.status(200).send(successResponse);
        });
    }
    // Update Delivery Status List
    /**
     * @api {post} /api/delivery-order/update-delivery-status Delivery Status List API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} statusId Status
     * @apiParam (Request body) {Number} allocatedId allocated Id
     * @apiParam (Request body) {String} comment comment
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get delivery status list",
     *      "data":[{
     *      "status" : "",
     *      }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-order/update-delivery-status
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    updateDeliveryStatus(params, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allocatedDetails = yield this.deliveryAllocationService.findOne({
                where: {
                    deliveryAllocationId: params.allocatedId,
                },
            });
            if (!allocatedDetails) {
                const errorResponse = {
                    status: 0,
                    message: 'Given allocated id not found',
                };
                return response.status(400).send(errorResponse);
            }
            const statusDetails = yield this.deliveryStatusService.findOne({
                where: {
                    deliveryStatusId: params.statusId,
                },
            });
            if (!statusDetails) {
                const errorResponse = {
                    status: 0,
                    message: 'Given status id not found',
                };
                return response.status(400).send(errorResponse);
            }
            allocatedDetails.deliveryOrderStatusId = params.statusId;
            allocatedDetails.comment = params.comment;
            const updateStatusResponse = yield this.deliveryAllocationService.create(allocatedDetails);
            if (updateStatusResponse) {
                const select = [
                    'orderDetail.createdDate as createdDate',
                    'DeliveryAllocation.createdDate as allocatedDate',
                    'DeliveryAllocation.modifiedDate as modifiedDate',
                    'DeliveryAllocation.deliveryAllocationId as allocationId',
                    'DeliveryAllocation.deliveryOrderStatusId as statusId',
                    'orderDetail.orderId as orderId',
                    'orderDetail.orderPrefixId as orderPrefixId',
                    'statusDetail.name as status',
                    'orderDetail.firstname as firstName',
                    'orderDetail.lastname as lastName',
                    'orderDetail.email as email',
                    'orderDetail.telephone as telephone',
                    'orderDetail.shippingFirstname as shippingFirstName',
                    'orderDetail.shippingAddress1 as shippingAddress1',
                    'orderDetail.shippingAddress2 as shippingAddress2',
                    'orderDetail.shippingPostcode as shippingPostcode',
                    'orderDetail.shippingCity as shippingCity',
                    'orderDetail.shippingCountry as shippingCountry'
                ];
                const relations = [
                    {
                        tableName: 'DeliveryAllocation.statusDetail',
                        aliasName: 'statusDetail',
                    },
                    {
                        tableName: 'DeliveryAllocation.orderDetail',
                        aliasName: 'orderDetail',
                    },
                    {
                        tableName: 'DeliveryAllocation.vendorOrderDetail',
                        aliasName: 'vendorOrderDetail',
                    },
                ];
                const groupBy = [];
                const whereConditions = [];
                whereConditions.push({
                    name: 'delivery_allocation_id',
                    op: 'where',
                    value: updateStatusResponse.deliveryAllocationId,
                });
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'DeliveryAllocation.createdDate',
                    order: 'DESC',
                });
                const allocatedResponseDetails = yield this.deliveryAllocationService.listByQueryBuilder(1, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                const successResponse = {
                    status: 1,
                    message: 'Status updated successfully.',
                    data: allocatedResponseDetails && allocatedResponseDetails.length > 0 ? class_transformer_1.classToPlain(allocatedResponseDetails[0]) : {},
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Assigned Location List
    /**
     * @api {get} /api/delivery-order/assigned-location-list Assigned Location List API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get list",
     *      "data":[{
     *      "customerId" : "",
     *      "createdDate" : "",
     *      "allocatedDate" : "",
     *      "orderId" : "",
     *      "orderPrefixId" : "",
     *      "status" : "",
     *      }]
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-order/assigned-location-list
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    assignedLocationList(limit, offset, count, Response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'deliveryLocation.locationName as locationName',
                'deliveryLocation.zipCode as zipCode',
            ];
            const relations = [
                {
                    tableName: 'DeliveryPersonToLocation.deliveryLocation',
                    aliasName: 'deliveryLocation',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'delivery_person_id',
                op: 'where',
                value: request.user.id,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'DeliveryPersonToLocation.createdDate',
                order: 'DESC',
            });
            const assignedLocationList = yield this.deliveryPersonToLocationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, count, true);
            this.log.info('assignedLocationList', assignedLocationList);
            const locationList = [];
            if (assignedLocationList && assignedLocationList.length > 0) {
                assignedLocationList.forEach(element => {
                    const locationArray = element.locationName ? element.locationName.replace(/~/g, '').split(',') : [];
                    if (locationArray && locationArray.length > 0) {
                        locationArray.forEach(location => {
                            const tempParam = {};
                            tempParam.pinCode = element.zipCode;
                            tempParam.location = location;
                            locationList.push(tempParam);
                        });
                    }
                });
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got list.',
                data: class_transformer_1.classToPlain(locationList),
            };
            return Response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/assigned-list'),
    routing_controllers_1.Authorized('delivery-person'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Res()), tslib_1.__param(4, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Boolean, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryOrderController.prototype, "assignedList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/completed-list'),
    routing_controllers_1.Authorized('delivery-person'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Res()), tslib_1.__param(4, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Boolean, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryOrderController.prototype, "completedList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/delivery-status-list'),
    routing_controllers_1.Authorized('delivery-person'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Res()), tslib_1.__param(4, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Boolean, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryOrderController.prototype, "deliveryStatusList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/update-delivery-status'),
    routing_controllers_1.Authorized('delivery-person'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryOrderController.prototype, "updateDeliveryStatus", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/assigned-location-list'),
    routing_controllers_1.Authorized('delivery-person'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Res()), tslib_1.__param(4, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Boolean, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryOrderController.prototype, "assignedLocationList", null);
DeliveryOrderController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/delivery-order'),
    tslib_1.__param(3, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [DeliveryAllocationService_1.DeliveryAllocationService,
        DeliveryPersonToLocationService_1.DeliveryPersonToLocationService,
        DeliveryStatusService_1.DeliveryStatusService, Object])
], DeliveryOrderController);
exports.DeliveryOrderController = DeliveryOrderController;
//# sourceMappingURL=DeliveryOrderController.js.map