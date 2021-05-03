/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Authorized, Get, QueryParam, Delete, Param, Req, Put, UploadedFile
} from 'routing-controllers';
import { DeliveryLocation } from '../../../models/DeliveryLocation';
import { DeliveryLocationService } from '../../../services/DeliveryLocationService';
import { DeliveryLocationToLocationService } from '../../../services/DeliveryLocationToLocationService';
import { DeliveryLocationToLocation } from '../../../models/DeliveryLocationToLocation';
import { CreateDeliveryLocationRequest } from './requests/CreateDeliveryLocationRequest';
import fs = require('fs');
import path = require('path');

@JsonController('/delivery-location')
export class DeliveryLocationController {

    constructor(private deliveryLocationService: DeliveryLocationService, private deliveryLocationToLocationService: DeliveryLocationToLocationService) {
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
    @Post('/add-delivery-location')
    @Authorized('vendor')
    public async addDeliveryLocation(@Body({ validate: true }) deliveryLocationParam: CreateDeliveryLocationRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const create: any = new DeliveryLocation();
        create.zipCode = deliveryLocationParam.zipCode;
        if (deliveryLocationParam.locationName) {
            const row: any = [];
            const loc: any = deliveryLocationParam.locationName;
            const locations = loc.split(',');
            for (const location of locations) {
                const name = '~' + location + '~';
                row.push(name);
            }
            const value = row.toString();
            create.locationName = value;
        }
        create.vendorId = request.user.vendorId;
        const createDeliveryLocation = await this.deliveryLocationService.create(create);
        if (deliveryLocationParam.locationName) {
            const deliveryLocations: any = deliveryLocationParam.locationName;
            const locations = deliveryLocations.split(',');
            for (const location of locations) {
                const deliveryLocationToLocation: any = new DeliveryLocationToLocation();
                deliveryLocationToLocation.deliveryLocationId = createDeliveryLocation.deliveryLocationId;
                deliveryLocationToLocation.location = location;
                await this.deliveryLocationToLocationService.create(deliveryLocationToLocation);
            }
        }
        if (createDeliveryLocation) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully create delivery location',
                data: createDeliveryLocation,
            };
            return response.status(200).send(successResponse);
        }
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
    @Delete('/delete-delivery-location/:deliveryLocationId')
    @Authorized('vendor')
    public async deleteDeliveryLocation(@Param('deliveryLocationId') deliveryLocationId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const deliveryLocation = await this.deliveryLocationService.findOne({
            where: {
                deliveryLocationId, vendorId: request.user.vendorId,
            },
        });
        if (!deliveryLocation) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Delivery Location',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteDeliveryLocation = await this.deliveryLocationService.delete(deliveryLocation);
        if (deleteDeliveryLocation) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Delivery Location',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete Delivery Location',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Put('/update-delivery-location/:deliveryLocationId')
    @Authorized('vendor')
    public async updateDeliveryLocation(@Body({ validate: true }) updateParam: CreateDeliveryLocationRequest,
                                        @Param('deliveryLocationId') deliveryLocationId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const deliveryLocation = await this.deliveryLocationService.findOne({
            where: {
                deliveryLocationId, vendorId: request.user.vendorId,
            },
        });
        if (!deliveryLocation) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Delivery Location',
            };
            return response.status(400).send(errorResponse);
        }
        deliveryLocation.zipCode = updateParam.zipCode;
        if (updateParam.locationName) {
            const row: any = [];
            const loc: any = updateParam.locationName;
            const locations = loc.split(',');
            for (const location of locations) {
                const name = '~' + location + '~';
                row.push(name);
            }
            const value = row.toString();
            deliveryLocation.locationName = value;
        }
        const updateLocation = await this.deliveryLocationService.update(deliveryLocation.deliveryLocationId, deliveryLocation);
        if (updateParam.locationName) {
            const deliveryLoc = await this.deliveryLocationToLocationService.findAll({
                where: {
                    deliveryLocationId,
                },
            });
            for (const val of deliveryLoc) {
                await this.deliveryLocationToLocationService.delete(val.id);
            }
            const deliveryLocations: any = updateParam.locationName;
            const locations = deliveryLocations.split(',');
            for (const location of locations) {
                const deliveryLocationToLocation: any = new DeliveryLocationToLocation();
                deliveryLocationToLocation.deliveryLocationId = updateLocation.deliveryLocationId;
                deliveryLocationToLocation.location = location;
                await this.deliveryLocationToLocationService.create(deliveryLocationToLocation);
            }
        }
        if (updateLocation) {
            const successResponse: any = {
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
    @Get('/delivery-location-list')
    @Authorized('vendor')
    public async listDeliveryLocation(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
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
        const deliveryLocationList: any = await this.deliveryLocationService.list(limit, offset, select, WhereConditions, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got delivery location list',
                data: deliveryLocationList,
            });
        }
        const result: any = [];
        for (const val of deliveryLocationList) {
            const obj: any = {};
            obj.deliveryLocationId = val.deliveryLocationId;
            obj.zipCode = val.zipCode;
            const loc = val.locationName.replace(/~/g, ' ');
            obj.locationName = loc.trim('');
            result.push(obj);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got delivery location list',
            data: result,
        };
        return response.status(200).send(successResponse);
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
    @Post('/import-delivery-location')
    @Authorized('vendor')
    public async importDeliveryLocation(@UploadedFile('deliveryLocationData') file: any, @Req() request: any, @Res() response: any): Promise<any> {
        const name = file.originalname;
        const type = name.split('.')[1];
        if (type !== 'csv') {
            const errorResponse: any = {
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
        const subjectData = await csv().fromFile(filePath);
        if (subjectData.length === 0) {
            return response.status(400).send({
                status: 0,
                message: 'File is empty',
            });
        }
        for (const data of subjectData) {
            const newDeliveryLocation: any = new DeliveryLocation();
            newDeliveryLocation.vendorId = request.user.vendorId;
            newDeliveryLocation.zipCode = data.Pincode;
            if (data.DeliveryLocation) {
                const row: any = [];
                const loc: any = data.DeliveryLocation;
                const locations = loc.split(',');
                for (const location of locations) {
                    const val = '~' + location + '~';
                    row.push(val);
                }
                const value = row.toString();
                newDeliveryLocation.locationName = value;
            }
            const createLocation = await this.deliveryLocationService.create(newDeliveryLocation);
            if (data.DeliveryLocation) {
                const deliveryLocations: any = data.DeliveryLocation;
                const locations = deliveryLocations.split(',');
                for (const location of locations) {
                    const deliveryLocationToLocation: any = new DeliveryLocationToLocation();
                    deliveryLocationToLocation.deliveryLocationId = createLocation.deliveryLocationId;
                    deliveryLocationToLocation.location = location;
                    await this.deliveryLocationToLocationService.create(deliveryLocationToLocation);
                }
            }
        }
        fs.unlinkSync(filePath);
        const successResponse: any = {
            status: 1,
            message: 'Successfully saved import data',
        };
        return response.status(200).send(successResponse);
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
    @Get('/download-delivery-location')
    public async downloadLocation(@Res() response: any): Promise<any> {
        const file = path.basename('/DeliveryLocation.csv');
        return new Promise(() => {
            response.download(file, 'DeliveryLocation.csv');
        });
    }
}
