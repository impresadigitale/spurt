"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Attribute_1 = require("../models/Attribute");
const AttributeService_1 = require("../services/AttributeService");
const CreateAttributeRequest_1 = require("./requests/CreateAttributeRequest");
const class_transformer_1 = require("class-transformer");
const SiteFilterSectionService_1 = require("../services/SiteFilterSectionService");
const ProductAttributeService_1 = require("../services/ProductAttributeService");
let AttributeController = class AttributeController {
    constructor(attributeService, siteFilterSectionService, productAttributeService) {
        this.attributeService = attributeService;
        this.siteFilterSectionService = siteFilterSectionService;
        this.productAttributeService = productAttributeService;
    }
    // Create Attribute API
    /**
     * @api {post} /api/attribute/add-attribute Add Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} attributeName
     * @apiParam (Request body) {Number} groupId
     * @apiParam (Request body) {Number} sortOrder
     * @apiParamExample {json} Input
     * {
     *      "attributeName" : "",
     *      "groupId" : "",
     *      "sortOrder" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created attribute.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/add-attribute
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    addAttributeGroup(attributeParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newAttribute = new Attribute_1.Attribute();
            newAttribute.attributeName = attributeParam.attributeName;
            newAttribute.sortOrder = attributeParam.sortOrder;
            newAttribute.groupId = attributeParam.groupId;
            const AttributeSaved = yield this.attributeService.create(newAttribute);
            if (AttributeSaved) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully added Attribute.',
                    data: AttributeSaved,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to create',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Attribute List API
    /**
     * @api {get} /api/attribute/Attributelist Attribute list API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Attribute list API",
     *      "data":{
     *       "groupId" : "",
     *       "attributeName" : "",
     *       "sortOrder" : "",
     *       "attributeId" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/Attributelist
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    Attributelist(limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['attributeId', 'groupId', 'attributeName', 'sortOrder'];
            const search = [];
            const WhereConditions = [];
            const relations = ['attributeGroup'];
            const attributeList = yield this.attributeService.list(limit, offset, select, search, relations, WhereConditions, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got the attribute list.',
                    data: attributeList,
                };
                return response.status(200).send(successRes);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got the attribute list.',
                data: class_transformer_1.classToPlain(attributeList),
            };
            return response.status(200).send(successResponse);
        });
    }
    // update Attribute Group
    /**
     * @api {put} /api/attribute/update-attribute/:id Update Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} attributeName attributeName
     * @apiParam (Request body) {Number} groupId groupId
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParamExample {json} Input
     * {
     *      "attributeName" : "",
     *      "groupId" : "",
     *      "sortOrder" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated attribute.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/update-attribute/:id
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    updateAttribute(id, attributeParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attribute = yield this.attributeService.findOne({
                where: {
                    attributeId: id,
                },
            });
            if (!attribute) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid attributeId',
                };
                return response.status(400).send(errorResponse);
            }
            attribute.attributeName = attributeParam.attributeName;
            attribute.groupId = attributeParam.groupId;
            attribute.sortOrder = attributeParam.sortOrder;
            const attributeSave = yield this.attributeService.create(attribute);
            if (attributeSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated Attribute.',
                    data: attributeSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update Attribute',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // delete Attribute API
    /**
     * @api {delete} /api/attribute/delete-attribute/:id Delete Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Attribute.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/delete-attribute/:id
     * @apiErrorExample {json} attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteAttribute(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attribute = yield this.attributeService.findOne({
                where: {
                    attributeId: id,
                },
            });
            if (!attribute) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid attributeId',
                };
                return response.status(400).send(errorResponse);
            }
            const filter = yield this.siteFilterSectionService.findOne({ where: { sectionId: id, sectionType: 2 } });
            if (filter) {
                const errorResponse = {
                    status: 0,
                    message: 'filters are mapped for this attribute. so you cannot delete',
                };
                return response.status(400).send(errorResponse);
            }
            const productAttribute = yield this.productAttributeService.findOne({ where: { attributeId: id } });
            if (productAttribute) {
                const errorResponse = {
                    status: 0,
                    message: 'products are mapped for this attribute. so you cannot delete',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteAttribute = yield this.attributeService.delete(id);
            if (deleteAttribute) {
                const successResponse = {
                    status: 1,
                    message: 'Successfullly deleted attribute.',
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
    //   Get attribute API
    /**
     * @api {get} /api/attribute/get-attribute/:id Get Attribute  API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get attribute",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/get-attribute/:id
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    getAttribute(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const attribute = yield this.attributeService.findOne({ where: { attributeId: id } });
            if (!attribute) {
                const errorResponse = {
                    status: 0,
                    message: ' invalid attribute Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully Got attribute',
                data: attribute,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-attribute'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAttributeRequest_1.CreateAttribute, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeController.prototype, "addAttributeGroup", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/Attributelist'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeController.prototype, "Attributelist", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-attribute/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body({ validate: true })), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateAttributeRequest_1.CreateAttribute, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeController.prototype, "updateAttribute", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-attribute/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeController.prototype, "deleteAttribute", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/get-attribute/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeController.prototype, "getAttribute", null);
AttributeController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/attribute'),
    tslib_1.__metadata("design:paramtypes", [AttributeService_1.AttributeService, SiteFilterSectionService_1.SiteFilterSectionService, ProductAttributeService_1.ProductAttributeService])
], AttributeController);
exports.AttributeController = AttributeController;
//# sourceMappingURL=AttributeController.js.map