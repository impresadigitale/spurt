"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerGroupController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const DeleteCustomerGroupRequest_1 = require("./requests/DeleteCustomerGroupRequest");
const CreateCustomerGroupRequest_1 = require("./requests/CreateCustomerGroupRequest");
const CustomerGroupService_1 = require("../services/CustomerGroupService");
const CustomerService_1 = require("../services/CustomerService");
const CustomerGroup_1 = require("../models/CustomerGroup");
let CustomerGroupController = class CustomerGroupController {
    constructor(customerGroupService, customerService) {
        this.customerGroupService = customerGroupService;
        this.customerService = customerService;
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
    createCustomerGroup(createCustomerGroup, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerGroupService.findOne({
                where: {
                    name: createCustomerGroup.name,
                },
            });
            if (customer) {
                const errorResponse = {
                    status: 0,
                    message: 'this customerGroup already exist',
                };
                return response.status(400).send(errorResponse);
            }
            const newGroupParams = new CustomerGroup_1.CustomerGroup();
            newGroupParams.name = createCustomerGroup.name;
            newGroupParams.description = createCustomerGroup.description;
            newGroupParams.colorCode = createCustomerGroup.colorcode;
            newGroupParams.isActive = createCustomerGroup.status;
            const customerGroupSaveResponse = yield this.customerGroupService.create(newGroupParams);
            if (customerGroupSaveResponse) {
                const successResponse = {
                    status: 1,
                    message: 'Customer Group Created Successfully',
                    data: customerGroupSaveResponse,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to save Role',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    updateCustomerRole(id, createRoleParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerGroupService.findOne({
                where: {
                    groupId: id,
                },
            });
            if (!customer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid groupId',
                };
                return response.status(400).send(errorResponse);
            }
            const newCustomerGroup = new CustomerGroup_1.CustomerGroup();
            newCustomerGroup.name = createRoleParam.name;
            newCustomerGroup.description = createRoleParam.description;
            newCustomerGroup.colorCode = createRoleParam.colorcode;
            newCustomerGroup.isActive = createRoleParam.status;
            const customerGroupSaveResponse = yield this.customerGroupService.update(id, newCustomerGroup);
            if (customerGroupSaveResponse) {
                const successResponse = {
                    status: 1,
                    message: 'customerGroup updated successfully',
                    data: customerGroupSaveResponse,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update customerGroup',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    customergroupList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const customerGroupList = yield this.customerGroupService.list(limit, offset, select, whereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got all customer group List',
                data: customerGroupList,
            };
            return response.status(200).send(successResponse);
        });
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
    deleteGroup(group, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const groupId = yield this.customerGroupService.findOne({
                where: {
                    groupId: group.groupId,
                },
            });
            if (!groupId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid groupId',
                };
                return response.status(400).send(errorResponse);
            }
            const defaultGroupId = yield this.customerGroupService.findOne({
                where: {
                    groupId: group.groupId,
                    name: 'default',
                },
            });
            if (defaultGroupId) {
                const errorResponse = {
                    status: 0,
                    message: 'You cannot delete default Group',
                };
                return response.status(400).send(errorResponse);
            }
            const findCustomer = yield this.customerService.findOne({
                where: {
                    customerGroupId: group.groupId,
                },
            });
            if (findCustomer) {
                const errorResponse = {
                    status: 0,
                    message: 'Users are mapped for this group, So you cannot delete this customerGroup',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteGroup = yield this.customerGroupService.delete(group.groupId);
            if (deleteGroup) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted group',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete group',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/create-customer-group'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCustomerGroupRequest_1.CreateCustomerGroup, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "createCustomerGroup", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-customer-group/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body({ validate: true })), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateCustomerGroupRequest_1.CreateCustomerGroup, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "updateCustomerRole", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/customergroup-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('status')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "customergroupList", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-customer-group/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteCustomerGroupRequest_1.DeleteCustomerGroupRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerGroupController.prototype, "deleteGroup", null);
CustomerGroupController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/customer-group'),
    tslib_1.__metadata("design:paramtypes", [CustomerGroupService_1.CustomerGroupService, CustomerService_1.CustomerService])
], CustomerGroupController);
exports.CustomerGroupController = CustomerGroupController;
//# sourceMappingURL=CustomerGroupController.js.map