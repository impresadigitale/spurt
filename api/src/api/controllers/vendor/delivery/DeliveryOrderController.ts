import 'reflect-metadata';
import {
    JsonController, Res, Authorized, Req, Get, QueryParam, Post, Body
} from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import { Logger, LoggerInterface } from '../../../../decorators/Logger';
import { DeliveryAllocationService } from '../../../services/DeliveryAllocationService';
import { DeliveryStatusService } from '../../../services/DeliveryStatusService';
import { DeliveryPersonToLocationService } from '../../../services/DeliveryPersonToLocationService';

@JsonController('/delivery-order')
export class DeliveryOrderController {

    constructor(
        private deliveryAllocationService: DeliveryAllocationService,
        private deliveryPersonToLocationService: DeliveryPersonToLocationService,
        private deliveryStatusService: DeliveryStatusService,
        @Logger(__filename) private log: LoggerInterface
    ) { }

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
    @Get('/assigned-list')
    @Authorized('delivery-person')
    public async assignedList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: boolean, @Res() Response: any, @Req() request: any): Promise<any> {
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
            'orderDetail.shippingCountry as shippingCountry'];

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

        const assignedOrderList: any = await this.deliveryAllocationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, count, true);
        this.log.info('assignedOrderList', assignedOrderList);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got list.',
            data: classToPlain(assignedOrderList),
        };
        return Response.status(200).send(successResponse);
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
    @Get('/completed-list')
    @Authorized('delivery-person')
    public async completedList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: boolean, @Res() Response: any, @Req() request: any): Promise<any> {
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
            'orderDetail.shippingCountry as shippingCountry'];

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

        const assignedOrderList: any = await this.deliveryAllocationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, count, true);
        this.log.info('assignedOrderList', assignedOrderList);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got list.',
            data: classToPlain(assignedOrderList),
        };
        return Response.status(200).send(successResponse);
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
    @Get('/delivery-status-list')
    @Authorized('delivery-person')
    public async deliveryStatusList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: boolean, @Res() Response: any, @Req() request: any): Promise<any> {
        const select = [
            'name as name',
            'is_active as isActive',
            'priority as priority',
            'color_code as colorCode',
            'delivery_status_id as id'];

        const relations = [];
        const groupBy = [];

        const whereConditions = [];
        const searchConditions = [];

        const sort = [];
        sort.push({
            name: 'priority',
            order: 'ASC',
        });

        const deliveryStatusList: any = await this.deliveryStatusService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, count, true);
        this.log.info('deliveryStatusList', deliveryStatusList);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got list.',
            data: classToPlain(deliveryStatusList),
        };
        return Response.status(200).send(successResponse);
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
    @Post('/update-delivery-status')
    @Authorized('delivery-person')
    public async updateDeliveryStatus(@Body({ validate: true }) params: any, @Res() response: any, @Req() request: any): Promise<any> {
        const allocatedDetails = await this.deliveryAllocationService.findOne({
            where: {
                deliveryAllocationId: params.allocatedId,
            },
        });

        if (!allocatedDetails) {
            const errorResponse: any = {
                status: 0,
                message: 'Given allocated id not found',
            };
            return response.status(400).send(errorResponse);
        }
        const statusDetails = await this.deliveryStatusService.findOne({
            where: {
                deliveryStatusId: params.statusId,
            },
        });

        if (!statusDetails) {
            const errorResponse: any = {
                status: 0,
                message: 'Given status id not found',
            };
            return response.status(400).send(errorResponse);
        }
        allocatedDetails.deliveryOrderStatusId = params.statusId;
        allocatedDetails.comment = params.comment;
        const updateStatusResponse = await this.deliveryAllocationService.create(allocatedDetails);
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
                'orderDetail.shippingCountry as shippingCountry'];

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

            const allocatedResponseDetails: any = await this.deliveryAllocationService.listByQueryBuilder(1, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const successResponse: any = {
                status: 1,
                message: 'Status updated successfully.',
                data: allocatedResponseDetails && allocatedResponseDetails.length > 0 ? classToPlain(allocatedResponseDetails[0]) : {},
            };
            return response.status(200).send(successResponse);
        }
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
    @Get('/assigned-location-list')
    @Authorized('delivery-person')
    public async assignedLocationList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: boolean, @Res() Response: any, @Req() request: any): Promise<any> {
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

        const assignedLocationList: any = await this.deliveryPersonToLocationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, count, true);
        this.log.info('assignedLocationList', assignedLocationList);
        const locationList = [];
        if (assignedLocationList && assignedLocationList.length > 0) {
            assignedLocationList.forEach(element => {
                const locationArray = element.locationName ? element.locationName.replace(/~/g, '').split(',') : [];
                if (locationArray && locationArray.length > 0) {
                    locationArray.forEach(location => {
                        const tempParam: any = {};
                        tempParam.pinCode = element.zipCode;
                        tempParam.location = location;
                        locationList.push(tempParam);
                    });
                }
            });
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got list.',
            data: classToPlain(locationList),
        };
        return Response.status(200).send(successResponse);
    }
}
