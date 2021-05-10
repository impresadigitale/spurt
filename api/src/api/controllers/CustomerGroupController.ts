/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Authorized, Put, Param, QueryParam, Get, Delete, Req
} from 'routing-controllers';

import { DeleteCustomerGroupRequest as DeleteGroupRequest } from './requests/DeleteCustomerGroupRequest';
import { CreateCustomerGroup } from './requests/CreateCustomerGroupRequest';
import { CustomerGroupService } from '../services/CustomerGroupService';
import { CustomerService } from '../services/CustomerService';
import { CustomerGroup } from '../models/CustomerGroup';

@JsonController('/customer-group')
export class CustomerGroupController {

    constructor(
        private customerGroupService: CustomerGroupService, private customerService: CustomerService) {
    }

    // Create Customer Group API
    /**
     * @api {post} /api/customer-group/create-customer-group Create customer group API
     * @apiGroup CustomerGroup
     * @apiParam (Request body) {String} name groupName
     * @apiParam (Request body) {String} description groupDescription
     * @apiParam (Request body) {String} colorcode colorcode
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "description" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New Customer group is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-group/create-customer-group
     * @apiErrorExample {json} createCustomer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-customer-group')
    @Authorized()
    public async createCustomerGroup(@Body({ validate: true }) createCustomerGroup: CreateCustomerGroup, @Res() response: any): Promise<any> {
        const customer = await this.customerGroupService.findOne({
            where: {
                name: createCustomerGroup.name,
            },
        });
        if (customer) {
            const errorResponse: any = {
                status: 0,
                message: 'this customerGroup already exist',
            };
            return response.status(400).send(errorResponse);
        }
        const newGroupParams: any = new CustomerGroup();
        newGroupParams.name = createCustomerGroup.name;
        newGroupParams.description = createCustomerGroup.description;
        newGroupParams.colorCode = createCustomerGroup.colorcode;
        newGroupParams.isActive = createCustomerGroup.status;
        const customerGroupSaveResponse = await this.customerGroupService.create(newGroupParams);
        if (customerGroupSaveResponse) {
            const successResponse: any = {
                status: 1,
                message: 'Customer Group Created Successfully',
                data: customerGroupSaveResponse,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to save Role',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // Update Customer Group API
    /**
     * @api {put} /api/customer-group/update-customer-group/:id Update Customer Group API
     * @apiGroup CustomerGroup
     * @apiParam (Request body) {String} name groupName
     * @apiParam (Request body) {String} description groupDescription
     * @apiParam (Request body) {String} colorcode colorcode
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "description" : "",
     *      "colorcode" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Customer Group is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-group/update-customer-group/:id
     * @apiErrorExample {json} update-customer-group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-customer-group/:id')
    @Authorized()
    public async updateCustomerRole(@Param('id') id: number, @Body({ validate: true }) createRoleParam: CreateCustomerGroup, @Res() response: any): Promise<any> {
        const customer = await this.customerGroupService.findOne({
            where: {
                groupId: id,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid groupId',
            };
            return response.status(400).send(errorResponse);
        }

        const newCustomerGroup: any = new CustomerGroup();
        newCustomerGroup.name = createRoleParam.name;
        newCustomerGroup.description = createRoleParam.description;
        newCustomerGroup.colorCode = createRoleParam.colorcode;
        newCustomerGroup.isActive = createRoleParam.status;
        const customerGroupSaveResponse = await this.customerGroupService.update(id, newCustomerGroup);
        if (customerGroupSaveResponse) {
            const successResponse: any = {
                status: 1,
                message: 'customerGroup updated successfully',
                data: customerGroupSaveResponse,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update customerGroup',
            };
            return response.status(400).send(errorResponse);
        }

    }

    // Customer Group List API
    /**
     * @api {get} /api/customer-group/customergroup-list customergroup-list API
     * @apiGroup CustomerGroup
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get customer group list",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/customer-group/customergroup-list
     * @apiErrorExample {json} customergroup error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/customergroup-list')
    @Authorized()
    public async customergroupList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['groupId', 'name', 'description', 'colorCode', 'isActive'];
        const whereConditions = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
            {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];

        const customerGroupList = await this.customerGroupService.list(limit, offset, select, whereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got all customer group List',
            data: customerGroupList,
        };
        return response.status(200).send(successResponse);
    }
    // delete Customer Group API
    /**
     * @api {delete} /api/customer-group/delete-customer-group/:id Delete Customer Group API
     * @apiGroup CustomerGroup
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} groupId  groupId
     * @apiParamExample {json} Input
     * {
     *      "groupId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted customerGroup.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-group/delete-customer-group/:id
     * @apiErrorExample {json} CustomerGroup error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-customer-group/:id')
    @Authorized()
    public async deleteGroup(@Body({ validate: true }) group: DeleteGroupRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const groupId = await this.customerGroupService.findOne({
            where: {
                groupId: group.groupId,
            },
        });
        if (!groupId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid groupId',
            };
            return response.status(400).send(errorResponse);
        }

        const defaultGroupId = await this.customerGroupService.findOne({
            where: {
                groupId: group.groupId,
                name: 'default',
            },
        });

        if (defaultGroupId) {
            const errorResponse: any = {
                status: 0,
                message: 'You cannot delete default Group',
            };
            return response.status(400).send(errorResponse);
        }

        const findCustomer = await this.customerService.findOne({
            where: {
                customerGroupId: group.groupId,
            },
        });

        if (findCustomer) {
            const errorResponse: any = {
                status: 0,
                message: 'Users are mapped for this group, So you cannot delete this customerGroup',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteGroup = await this.customerGroupService.delete(group.groupId);
        if (deleteGroup) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted group',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete group',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
