"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryLocationController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const DeliveryLocation_1 = require("../../../models/DeliveryLocation");
const DeliveryLocationService_1 = require("../../../services/DeliveryLocationService");
const DeliveryLocationToLocationService_1 = require("../../../services/DeliveryLocationToLocationService");
const DeliveryLocationToLocation_1 = require("../../../models/DeliveryLocationToLocation");
const CreateDeliveryLocationRequest_1 = require("./requests/CreateDeliveryLocationRequest");
const fs = require("fs");
const path = require("path");
let DeliveryLocationController = class DeliveryLocationController {
    constructor(deliveryLocationService, deliveryLocationToLocationService) {
        this.deliveryLocationService = deliveryLocationService;
        this.deliveryLocationToLocationService = deliveryLocationToLocationService;
    }
    // Create Delivery Location API
    /**
     * @api {post} /api/delivery-location/add-delivery-location Add Delivery Location API
     * @apiGroup Delivery Location
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} zipCode zipCode
     * @apiParam (Request body) {String} locationName locationName
     * @apiParamExample {json} Input
     * {
     *      "zipCode" : "",
     *      "locationName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Delivery Location Created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-location/add-delivery-location
     * @apiErrorExample {json} Delivery Location error
     * HTTP/1.1 500 Internal Server Error
     */
    addDeliveryLocation(deliveryLocationParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const create = new DeliveryLocation_1.DeliveryLocation();
            create.zipCode = deliveryLocationParam.zipCode;
            if (deliveryLocationParam.locationName) {
                const row = [];
                const loc = deliveryLocationParam.locationName;
                const locations = loc.split(',');
                for (const location of locations) {
                    const name = '~' + location + '~';
                    row.push(name);
                }
                const value = row.toString();
                create.locationName = value;
            }
            create.vendorId = request.user.vendorId;
            const createDeliveryLocation = yield this.deliveryLocationService.create(create);
            if (deliveryLocationParam.locationName) {
                const deliveryLocations = deliveryLocationParam.locationName;
                const locations = deliveryLocations.split(',');
                for (const location of locations) {
                    const deliveryLocationToLocation = new DeliveryLocationToLocation_1.DeliveryLocationToLocation();
                    deliveryLocationToLocation.deliveryLocationId = createDeliveryLocation.deliveryLocationId;
                    deliveryLocationToLocation.location = location;
                    yield this.deliveryLocationToLocationService.create(deliveryLocationToLocation);
                }
            }
            if (createDeliveryLocation) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully create delivery location',
                    data: createDeliveryLocation,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Delete Delivery Location API
    /**
     * @api {delete} /api/delivery-location/delete-delivery-location/:deliveryLocationId Delete Delivery Location API
     * @apiGroup Delivery Location
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "deliveryLocationId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted delivery location.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-location/delete-delivery-location/:deliveryLocationId
     * @apiErrorExample {json} Delete Delivery Location API error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteDeliveryLocation(deliveryLocationId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deliveryLocation = yield this.deliveryLocationService.findOne({
                where: {
                    deliveryLocationId, vendorId: request.user.vendorId,
                },
            });
            if (!deliveryLocation) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Delivery Location',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteDeliveryLocation = yield this.deliveryLocationService.delete(deliveryLocation);
            if (deleteDeliveryLocation) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted Delivery Location',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete Delivery Location',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Delivery Location API
    /**
     * @api {put} /api/delivery-location/update-delivery-location/:deliveryLocationId Update Delivery Location API
     * @apiGroup Delivery Location
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} zipCode Zip Code
     * @apiParam (Request body) {String} locationName Location Name
     * @apiParamExample {json} Input
     * {
     *      "zipCode" : "",
     *      "locationName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Updated successfully"
     *      "data" : "{}"
     * }
     * @apiSampleRequest /api/delivery-location/update-delivery-location/:deliveryLocationId
     * @apiErrorExample {json} Update Delivery Location API error
     * HTTP/1.1 500 Internal Server Error
     */
    updateDeliveryLocation(updateParam, deliveryLocationId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deliveryLocation = yield this.deliveryLocationService.findOne({
                where: {
                    deliveryLocationId, vendorId: request.user.vendorId,
                },
            });
            if (!deliveryLocation) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Delivery Location',
                };
                return response.status(400).send(errorResponse);
            }
            deliveryLocation.zipCode = updateParam.zipCode;
            if (updateParam.locationName) {
                const row = [];
                const loc = updateParam.locationName;
                const locations = loc.split(',');
                for (const location of locations) {
                    const name = '~' + location + '~';
                    row.push(name);
                }
                const value = row.toString();
                deliveryLocation.locationName = value;
            }
            const updateLocation = yield this.deliveryLocationService.update(deliveryLocation.deliveryLocationId, deliveryLocation);
            if (updateParam.locationName) {
                const deliveryLoc = yield this.deliveryLocationToLocationService.findAll({
                    where: {
                        deliveryLocationId,
                    },
                });
                for (const val of deliveryLoc) {
                    yield this.deliveryLocationToLocationService.delete(val.id);
                }
                const deliveryLocations = updateParam.locationName;
                const locations = deliveryLocations.split(',');
                for (const location of locations) {
                    const deliveryLocationToLocation = new DeliveryLocationToLocation_1.DeliveryLocationToLocation();
                    deliveryLocationToLocation.deliveryLocationId = updateLocation.deliveryLocationId;
                    deliveryLocationToLocation.location = location;
                    yield this.deliveryLocationToLocationService.create(deliveryLocationToLocation);
                }
            }
            if (updateLocation) {
                const successResponse = {
                    status: 1,
                    message: 'Updated successfully',
                    data: {
                        deliveryLocationId: updateLocation.deliveryLocationId,
                        zipCode: updateParam.zipCode,
                        locationName: updateParam.locationName,
                    },
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Delivery Location List API
    /**
     * @api {get} /api/delivery-location/delivery-location-list Delivery Location List API
     * @apiGroup Delivery Location
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
     * @apiSampleRequest /api/delivery-location/delivery-location-list
     * @apiErrorExample {json} Delivery Location List API error
     * HTTP/1.1 500 Internal Server Error
     */
    listDeliveryLocation(limit, offset, keyword, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['deliveryLocationId', 'zipCode', 'locationName'];
            const WhereConditions = [
                {
                    name: 'vendorId',
                    op: 'where',
                    value: request.user.vendorId,
                },
                {
                    name: 'locationName',
                    op: 'like',
                    value: keyword,
                },
            ];
            const deliveryLocationList = yield this.deliveryLocationService.list(limit, offset, select, WhereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got delivery location list',
                    data: deliveryLocationList,
                });
            }
            const result = [];
            for (const val of deliveryLocationList) {
                const obj = {};
                obj.deliveryLocationId = val.deliveryLocationId;
                obj.zipCode = val.zipCode;
                const loc = val.locationName.replace(/~/g, ' ');
                obj.locationName = loc.trim('');
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
    // Import Delivery Location
    /**
     * @api {post} /api/delivery-location/import-delivery-location Import Delivery Location
     * @apiGroup Delivery Location
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} deliveryLocationData File
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully saved imported data..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/delivery-location/import-delivery-location
     * @apiErrorExample {json} Import Location Data
     * HTTP/1.1 500 Internal Server Error
     */
    importDeliveryLocation(file, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const name = file.originalname;
            const type = name.split('.')[1];
            if (type !== 'csv') {
                const errorResponse = {
                    status: 0,
                    message: 'CSV file only allowed',
                };
                return response.status(400).send(errorResponse);
            }
            const directoryPath = path.join(process.cwd(), '/');
            const fileName = 'DeliveryLocation_' + Date.now() + '.' + type;
            const filePath = directoryPath + fileName;
            fs.writeFile(filePath, file.buffer, ((err) => {
                if (err) {
                    throw err;
                }
            }));
            const csv = require('csvtojson');
            const subjectData = yield csv().fromFile(filePath);
            if (subjectData.length === 0) {
                return response.status(400).send({
                    status: 0,
                    message: 'File is empty',
                });
            }
            for (const data of subjectData) {
                const newDeliveryLocation = new DeliveryLocation_1.DeliveryLocation();
                newDeliveryLocation.vendorId = request.user.vendorId;
                newDeliveryLocation.zipCode = data.Pincode;
                if (data.DeliveryLocation) {
                    const row = [];
                    const loc = data.DeliveryLocation;
                    const locations = loc.split(',');
                    for (const location of locations) {
                        const val = '~' + location + '~';
                        row.push(val);
                    }
                    const value = row.toString();
                    newDeliveryLocation.locationName = value;
                }
                const createLocation = yield this.deliveryLocationService.create(newDeliveryLocation);
                if (data.DeliveryLocation) {
                    const deliveryLocations = data.DeliveryLocation;
                    const locations = deliveryLocations.split(',');
                    for (const location of locations) {
                        const deliveryLocationToLocation = new DeliveryLocationToLocation_1.DeliveryLocationToLocation();
                        deliveryLocationToLocation.deliveryLocationId = createLocation.deliveryLocationId;
                        deliveryLocationToLocation.location = location;
                        yield this.deliveryLocationToLocationService.create(deliveryLocationToLocation);
                    }
                }
            }
            fs.unlinkSync(filePath);
            const successResponse = {
                status: 1,
                message: 'Successfully saved import data',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Download Delivery Location
    /**
     * @api {get} /api/delivery-location/download-delivery-location Download Delivery Location
     * @apiGroup Delivery Location
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the file..!!",
     *      "status": "1",
     * }
     * @apiSampleRequest /api/delivery-location/download-delivery-location
     * @apiErrorExample {json} Download Location Data
     * HTTP/1.1 500 Internal Server Error
     */
    downloadLocation(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const file = path.basename('/DeliveryLocation.csv');
            return new Promise(() => {
                response.download(file, 'DeliveryLocation.csv');
            });
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-delivery-location'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateDeliveryLocationRequest_1.CreateDeliveryLocationRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "addDeliveryLocation", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-delivery-location/:deliveryLocationId'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('deliveryLocationId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "deleteDeliveryLocation", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-delivery-location/:deliveryLocationId'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })),
    tslib_1.__param(1, routing_controllers_1.Param('deliveryLocationId')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateDeliveryLocationRequest_1.CreateDeliveryLocationRequest, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "updateDeliveryLocation", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/delivery-location-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "listDeliveryLocation", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/import-delivery-location'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.UploadedFile('deliveryLocationData')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "importDeliveryLocation", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/download-delivery-location'),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryLocationController.prototype, "downloadLocation", null);
DeliveryLocationController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/delivery-location'),
    tslib_1.__metadata("design:paramtypes", [DeliveryLocationService_1.DeliveryLocationService, DeliveryLocationToLocationService_1.DeliveryLocationToLocationService])
], DeliveryLocationController);
exports.DeliveryLocationController = DeliveryLocationController;
//# sourceMappingURL=DeliveryLocationController.js.map