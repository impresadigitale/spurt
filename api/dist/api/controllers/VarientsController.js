"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarientsController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Varients_1 = require("../models/Varients");
const VarientsValue_1 = require("../models/VarientsValue");
const VarientsService_1 = require("../services/VarientsService");
const VarientsValueService_1 = require("../services/VarientsValueService");
const UpdateVarientsRequest_1 = require("./requests/UpdateVarientsRequest");
const CreateVarientRequest_1 = require("./requests/CreateVarientRequest");
const ProductVarientService_1 = require("../services/ProductVarientService");
const SiteFilterSectionService_1 = require("../services/SiteFilterSectionService");
let VarientsController = class VarientsController {
    constructor(varientsService, productVarientService, siteFilterSectionService, varientsValueService) {
        this.varientsService = varientsService;
        this.productVarientService = productVarientService;
        this.siteFilterSectionService = siteFilterSectionService;
        this.varientsValueService = varientsValueService;
    }
    // Create Varients API
    /**
     * @api {post} /api/varients/add-varients Add Varients API
     * @apiGroup Varients
     * @apiParam (Request body) {String} type type
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String} sortOrder sortOrder
     * @apiParam (Request body) {Object} varientsValue varientsValue
     * @apiParam (Request body) {String}  varientsValue.valueName valueName
     * @apiParam (Request body) {String}  varientsValue.sortOrder valueName
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "type" : "",
     *      "name" : "",
     *      "sortOrder" : "",
     *      "varientsValue" : [{
     *      "valueName" : "",
     *      "sortOrder" : "",
     * }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "varients is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/varients/add-varients
     * @apiErrorExample {json} varients error
     * HTTP/1.1 500 Internal Server Error
     */
    createPage(varientParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const varients = new Varients_1.Varients();
            varients.name = varientParam.name;
            varients.sortOrder = varientParam.sortOrder;
            varients.type = varientParam.type;
            const varientsSave = yield this.varientsService.create(varients);
            if (varientParam.varientsValue) {
                const varientsValue = varientParam.varientsValue;
                for (const varientVal of varientsValue) {
                    const varValue = new VarientsValue_1.VarientsValue();
                    varValue.valueName = varientVal.valueName;
                    varValue.sortOrder = varientVal.sortOrder;
                    varValue.varientsId = varientsSave.id;
                    yield this.varientsValueService.create(varValue);
                }
            }
            if (varientsSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created varients.',
                    data: varientsSave,
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
    // Varients List API
    /**
     * @api {get} /api/varients/varientslist Varients List API
     * @apiGroup Varients
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get varient list",
     *      "data":{
     *      "id" : "",
     *      "name" : "",
     *      "type" : "",
     *      "sortOrder" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/varients/varientslist
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    varientslist(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'type', 'name', 'sortOrder'];
            const relation = [];
            const WhereConditions = [];
            const varientsList = yield this.varientsService.list(limit, offset, select, relation, WhereConditions, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got count',
                    data: varientsList,
                };
                return response.status(200).send(successRes);
            }
            const promise = varientsList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const data = yield this.varientsValueService.find({ where: { varientsId: result.id }, order: { sortOrder: 'ASC' } });
                const temp = result;
                if (data) {
                    temp.varientsValue = data;
                }
                else {
                    temp.varientsValue = [];
                }
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete list of varients. ',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Varients API
    /**
     * @api {put} /api/varients/update-varients/:id Update Varients API
     * @apiGroup Varients
     * @apiParam (Request body) {String} type type
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Object} varientsValue varientsValue
     * @apiParam (Request body) {String} varientsValue.valueName valueName
     * @apiParam (Request body) {String} varientsValue.sortOrder sortOrder
     * @apiParam (Request body) {String} varientsValue.id varient value id
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "type" : "",
     *      "name" : "",
     *      "sortOrder" : "",
     *      "varientsValue" : [{
     *      "id" : "",
     *      "valueName" : "",
     *      "sortOrder" : "",
     * }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Varients are updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/varients/update-varients/:id
     * @apiErrorExample {json} updateVarients error
     * HTTP/1.1 500 Internal Server Error
     */
    updateVarients(id, varientParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const varients = yield this.varientsService.findOne({
                where: {
                    id,
                },
            });
            if (!varients) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid varient',
                };
                return response.status(400).send(errorResponse);
            }
            varients.type = varientParam.type;
            varients.name = varientParam.name;
            varients.sortOrder = varientParam.sortOrder;
            const varientsSave = yield this.varientsService.create(varients);
            yield this.varientsValueService.delete({ varientsId: varientsSave.id });
            if (varientParam.varientsValue) {
                const varientsValue = varientParam.varientsValue;
                for (const varientVal of varientsValue) {
                    if (varientVal.id) {
                        const varientValue = yield this.varientsValueService.findOne(varientVal.id);
                        if (!varientValue) {
                            const errorResponse = {
                                status: 0,
                                message: 'invalid varientValueId',
                            };
                            return response.status(400).send(errorResponse);
                        }
                        const varValue = new VarientsValue_1.VarientsValue();
                        varValue.id = varientVal.id;
                        varValue.valueName = varientVal.valueName;
                        varValue.sortOrder = varientVal.sortOrder;
                        varValue.varientsId = varientsSave.id;
                        yield this.varientsValueService.create(varValue);
                    }
                    else {
                        const varValue = new VarientsValue_1.VarientsValue();
                        varValue.valueName = varientVal.valueName;
                        varValue.sortOrder = varientVal.sortOrder;
                        varValue.varientsId = varientsSave.id;
                        yield this.varientsValueService.create(varValue);
                    }
                }
            }
            if (varientsSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the Varient',
                    data: varientsSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Varient API
    /**
     * @api {delete} /api/varients/delete-varient/:id Delete Varient API
     * @apiGroup Varients
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted varients.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/varients/delete-varient/:id
     * @apiErrorExample {json} Varients error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteVarients(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const varients = yield this.varientsService.findOne({
                where: {
                    id,
                },
            });
            if (!varients) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid varientId',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProductId = yield this.productVarientService.findOne({ where: { varientsId: id } });
            if (orderProductId) {
                const errorResponse = {
                    status: 0,
                    message: 'products are mapped for this varient, so you cannot delete',
                };
                return response.status(400).send(errorResponse);
            }
            const filter = yield this.siteFilterSectionService.findOne({ where: { sectionId: id, sectionType: 1 } });
            if (filter) {
                const errorResponse = {
                    status: 0,
                    message: 'filters are mapped for this varient, so you cannot delete',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteVarient = yield this.varientsService.delete(id);
            if (!deleteVarient) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted varient.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete varient',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // varients Detail
    /**
     * @api {get} /api/varients/varients-detail Varients Detail API
     * @apiGroup Varients
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Varients detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/varients/varients-detail
     * @apiErrorExample {json} varients Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    varientsDetail(varientsId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const varients = yield this.varientsService.findOne({
                where: {
                    id: varientsId,
                },
            });
            if (!varients) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid varients Id',
                };
                return response.status(400).send(errorResponse);
            }
            varients.varientsValue = yield this.varientsValueService.find({
                where: {
                    varientsId: varients.id,
                },
                order: {
                    sortOrder: 'ASC',
                },
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got varients detail',
                data: varients,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-varients'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateVarientRequest_1.CreateVarients, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VarientsController.prototype, "createPage", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/varientslist'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('status')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VarientsController.prototype, "varientslist", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-varients/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body({ validate: true })), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateVarientsRequest_1.UpdateVarients, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VarientsController.prototype, "updateVarients", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-varient/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VarientsController.prototype, "deleteVarients", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/varients-detail'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('id')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VarientsController.prototype, "varientsDetail", null);
VarientsController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/varients'),
    tslib_1.__metadata("design:paramtypes", [VarientsService_1.VarientsService, ProductVarientService_1.ProductVarientService, SiteFilterSectionService_1.SiteFilterSectionService, VarientsValueService_1.VarientsValueService])
], VarientsController);
exports.VarientsController = VarientsController;
//# sourceMappingURL=VarientsController.js.map