"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroupController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const AttributeGroup_1 = require("../models/AttributeGroup");
const AttributeGroupService_1 = require("../services/AttributeGroupService");
let AttributeGroupController = class AttributeGroupController {
    constructor(attributeGroupService) {
        this.attributeGroupService = attributeGroupService;
    }
    // Create Attribute Group API
    /**
     * @api {post} /api/attribute-group/add-attribute-group Add Attribute group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} attributeGroupName
     * @apiParam (Request body) {Number} sortOrder
     * @apiParamExample {json} Input
     * {
     *      "attributeGroupName" : "",
     *      "sortOrder" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created attribute group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/add-attribute-group
     * @apiErrorExample {json} Attribute group error
     * HTTP/1.1 500 Internal Server Error
     */
    addAttributeGroup(attributeGroupName, sortOrder, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newAttributeGroup = new AttributeGroup_1.AttributeGroup();
            newAttributeGroup.attributeGroupName = attributeGroupName;
            newAttributeGroup.sortOrder = sortOrder;
            const AttributeGroupSaved = yield this.attributeGroupService.create(newAttributeGroup);
            if (AttributeGroupSaved) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully added Attribute Group.',
                    data: AttributeGroupSaved,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to create currency',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Attribute Group List API
    /**
     * @api {get} /api/attribute-group/AttributeGrouplist Attribute Group list API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Attribute Group list API",
     *      "data":{
     *       "groupId" : "",
     *       "attributeGroupName" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/AttributeGrouplist
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    AttributeGrouplist(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['groupId', 'attributeGroupName', 'sortOrder'];
            const search = [];
            const WhereConditions = [];
            const relations = ['attribute'];
            const currencyList = yield this.attributeGroupService.list(limit, offset, select, search, relations, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got the attribute group list.',
                data: currencyList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // update Attribute Group
    /**
     * @api {put} /api/attribute-group/update-attribute-group/:id Update Attribute Group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} attributeGroupName attributeGroupName
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParamExample {json} Input
     * {
     *      "attributeGroupName" : "",
     *      "sortOrder" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated attribute group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/update-attribute-group/:id
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    updateAttributeGroup(id, attributeGroupName, sortOrder, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const group = yield this.attributeGroupService.findOne({
                where: {
                    groupId: id,
                },
            });
            if (!group) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid groupId',
                };
                return response.status(400).send(errorResponse);
            }
            group.attributeGroupName = attributeGroupName;
            group.sortOrder = sortOrder;
            const groupSave = yield this.attributeGroupService.create(group);
            if (groupSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated Attribute Group.',
                    data: groupSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update Attribute Group',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // delete AttributeGroup API
    /**
     * @api {delete} /api/attribute-group/delete-attribute-group/:id Delete Attribute group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Attribute group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/delete-attribute-group/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteAttributeGroup(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attributeGroup = yield this.attributeGroupService.findOne({
                where: {
                    groupId: id,
                },
            });
            if (!attributeGroup) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid attributeId',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteGroup = yield this.attributeGroupService.delete(id);
            if (deleteGroup) {
                const successResponse = {
                    status: 1,
                    message: 'Successfullly deleted group.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    //   Get attribute Group API
    /**
     * @api {get} /api/attribute-group/get-attribute-group/:id Get Attribute Group  API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get attribute Group",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/get-attribute-group/:id
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    getAttributeGroup(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attribute = yield this.attributeGroupService.findOne({ where: { groupId: id } });
            if (!attribute) {
                const errorResponse = {
                    status: 0,
                    message: ' invalid group Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully Got attribute group',
                data: attribute,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-attribute-group'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.BodyParam('attributeGroupName')), tslib_1.__param(1, routing_controllers_1.BodyParam('sortOrder')), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupController.prototype, "addAttributeGroup", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/AttributeGrouplist'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupController.prototype, "AttributeGrouplist", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-attribute-group/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.BodyParam('attributeGroupName')), tslib_1.__param(2, routing_controllers_1.BodyParam('sortOrder')), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupController.prototype, "updateAttributeGroup", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-attribute-group/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupController.prototype, "deleteAttributeGroup", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/get-attribute-group/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroupController.prototype, "getAttributeGroup", null);
AttributeGroupController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/attribute-group'),
    tslib_1.__metadata("design:paramtypes", [AttributeGroupService_1.AttributeGroupService])
], AttributeGroupController);
exports.AttributeGroupController = AttributeGroupController;
//# sourceMappingURL=AttributeGroupController.js.map