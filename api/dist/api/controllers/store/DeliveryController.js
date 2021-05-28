"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStoreController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const DeliveryLocationService_1 = require("../../services/DeliveryLocationService");
const DeliveryLocationToLocationService_1 = require("../../services/DeliveryLocationToLocationService");
let DeliveryStoreController = class DeliveryStoreController {
    constructor(deliveryLocationToLocationService, deliveryLocationService) {
        this.deliveryLocationToLocationService = deliveryLocationToLocationService;
        this.deliveryLocationService = deliveryLocationService;
    }
    // Delivery Location List API
    /**
     * @api {get} /api/delivery-store/delivery-location-list Delivery Location List API
     * @apiGroup Delivery Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword Enter delivery location
     * @apiParam (Request body) {Number} count Count should be number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset" : "",
     *      "keyword" : "",
     *      "count" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Delivery Location List Successfully"
     *      "data" : "{ }"
     * }
     * @apiSampleRequest /api/delivery-store/delivery-location-list
     * @apiErrorExample {json} Delivery Location List API error
     * HTTP/1.1 500 Internal Server Error
     */
    deliveryLocationList(limit, offset, keyword, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'deliveryLocationId', 'location'];
            const WhereConditions = [
                {
                    name: 'location',
                    op: 'like',
                    value: keyword,
                },
            ];
            const deliveryLocationList = yield this.deliveryLocationToLocationService.list(limit, offset, select, WhereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got delivery location count',
                    data: deliveryLocationList,
                });
            }
            const result = [];
            for (const val of deliveryLocationList) {
                const obj = {};
                obj.id = val.id;
                obj.deliveryLocationId = val.deliveryLocationId;
                const deliveryLocation = yield this.deliveryLocationService.findOne({
                    select: ['zipCode'],
                    where: {
                        deliveryLocationId: val.deliveryLocationId,
                    },
                });
                obj.zipCode = deliveryLocation ? deliveryLocation.zipCode : '';
                obj.location = val.location;
                result.push(obj);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got delivery location list',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/delivery-location-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryStoreController.prototype, "deliveryLocationList", null);
DeliveryStoreController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/delivery-store'),
    tslib_1.__metadata("design:paramtypes", [DeliveryLocationToLocationService_1.DeliveryLocationToLocationService, DeliveryLocationService_1.DeliveryLocationService])
], DeliveryStoreController);
exports.DeliveryStoreController = DeliveryStoreController;
//# sourceMappingURL=DeliveryController.js.map