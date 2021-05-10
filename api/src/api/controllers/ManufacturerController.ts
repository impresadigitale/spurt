/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get, Put, Post, Delete, Body, JsonController, Authorized, Res, Req, QueryParam,
    Param
} from 'routing-controllers';
import * as AWS from 'aws-sdk';
import { CreateManufacturer } from './requests/CreateManufacturerRequest';
import { Manufacturer } from '../models/ManufacturerModel';
import { ManufacturerService } from '../services/ManufacturerService';
import { aws_setup, env } from '../../env';
import { UpdateManufacturer } from './requests/UpdateManufacturerRequest';
import { DeleteManufacturer } from './requests/DeleteManufacturerRequest';
import { S3Service } from '../services/S3Service';
import { ImageService } from '../services/ImageService';
import * as fs from 'fs';
import { ProductService } from '../services/ProductService';

// S3 SetUp
AWS.config.update({
    accessKeyId: aws_setup.AWS_ACCESS_KEY_ID,
    secretAccessKey: aws_setup.AWS_SECRET_ACCESS_KEY,
    region: aws_setup.AWS_DEFAULT_REGION,
});

@JsonController('/manufacturer')
export class ManufacturerController {
    constructor(private manufacturerService: ManufacturerService, private s3Service: S3Service, private productService: ProductService,
                private imageService: ImageService) {
    }

    // Create Manufacturer API
    /**
     * @api {post} /api/manufacturer/create-manufacturer Create Manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name Manufacturer name
     * @apiParam (Request body) {String} image Manufacturer image
     * @apiParam (Request body) {number} sortOrder Manufacturer sortOrder
     * @apiParam (Request body) {number} status status
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Manufacturer.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/create-manufacturer
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-manufacturer')
    @Authorized()
    public async createManufacturer(@Body({ validate: true }) manufacturer: CreateManufacturer, @Req() request: any, @Res() response: any): Promise<any> {
        const image = manufacturer.image;
        if (image) {
            const path = 'manufacturer/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const type = image.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const stringLength = image.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;
            if (+sizeInKb <= 2048) {
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'File size is too large, give less than 2 mb. ',
                };
                return response.status(400).send(errorResponse);
            }
            const newManufacturer: any = new Manufacturer();
            newManufacturer.name = manufacturer.name;
            newManufacturer.image = name;
            newManufacturer.imagePath = path;
            newManufacturer.sortOrder = manufacturer.sortOrder;
            newManufacturer.isActive = manufacturer.status;
            await this.manufacturerService.create(newManufacturer);
            const successResponse: any = {
                status: 1,
                message: 'Successfully created a new Brand.',
                data: { name, path },
            };
            return response.status(200).send(successResponse);
        }
    }

    // Manufacturer List API
    /**
     * @api {get} /api/manufacturer/manufacturerlist Manufacturer List API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status 0->active 1->inactive
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get manufacturer list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/manufacturerlist
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/manufacturerlist')
    public async manufacturerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['manufacturerId', 'name', 'image', 'imagePath', 'sortOrder', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'where',
                value: status,
            },
        ];
        const WhereConditions = [];
        const manufacturerList: any = await this.manufacturerService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete brand list.',
            data: manufacturerList,
        };
        return response.status(200).send(successResponse);
    }

    // Update Manufacturer API
    /**
     * @api {put} /api/manufacturer/update-manufacturer/:id Update Manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} manufacturerId Manufacturer manufacturerId
     * @apiParam (Request body) {String} name Manufacturer name
     * @apiParam (Request body) {String} image Manufacturer image
     * @apiParam (Request body) {number} sortOrder Manufacturer sortOrder
     * @apiParam (Request body) {number} status Manufacturer status
     * @apiParamExample {json} Input
     * {
     *      "manufacturerId" : "",
     *      "name" : "",
     *      "image" : "",
     *      "sortOrder" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Manufacturer.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/update-manufacturer/:id
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-manufacturer/:id')
    @Authorized()
    public async updateManufacturer(@Body({ validate: true }) manufacturerParam: UpdateManufacturer, @Res() response: any, @Req() request: any): Promise<any> {
        const manufacturer = await this.manufacturerService.findOne({
            where: {
                manufacturerId: manufacturerParam.manufacturerId,
            },
        });
        if (!manufacturer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid manufacturerId',
            };
            return response.status(400).send(errorResponse);
        }
        const image = manufacturerParam.image;
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'manufacturer/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const stringLength = image.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;
            if (+sizeInKb <= 2048) {
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'File size is too large, give less than 2 mb. ',
                };
                return response.status(400).send(errorResponse);
            }
            manufacturer.image = name;
            manufacturer.imagePath = path;
        }
        manufacturer.name = manufacturerParam.name;
        manufacturer.sortOrder = manufacturerParam.sortOrder;
        manufacturer.isActive = manufacturerParam.status;
        const manufacturerSave = await this.manufacturerService.create(manufacturer);

        if (manufacturerSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the Brand.',
                data: manufacturerSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update Brand',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete single Manufacturer API
    /**
     * @api {delete} /api/manufacturer/delete-manufacturer/:id Delete Manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "manufacturerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Manufacturer.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/delete-manufacturer/:id
     * @apiErrorExample {json} Manufacturer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-manufacturer/:id')
    @Authorized()
    public async deleteManufacturer(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<Manufacturer> {
        const ManufacturerData = await this.manufacturerService.findOne({
            where: {
                manufacturerId: id,
            },
        });
        if (!ManufacturerData) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid manufacturerId',
            };
            return response.status(400).send(errorResponse);
        }
        const findproduct = await this.productService.findOne({
            where: {
                manufacturerId: ManufacturerData.manufacturerId,
            },
        });

        if (findproduct) {
            const errorResponse: any = {
                status: 0,
                message: 'product mapped for this manufacturer',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteManufacturer: any = await this.manufacturerService.delete(ManufacturerData.manufacturerId);
        if (!deleteManufacturer) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the Brand. ',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete manufacturer',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Multiple Manufacturer API
    /**
     * @api {post} /api/manufacturer/delete-manufacturer Delete Multiple manufacturer API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} manufacturerId  manufacturerId
     * @apiParamExample {json} Input
     * {
     * "manufacturerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted manufacturer.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/delete-manufacturer
     * @apiErrorExample {json} manufacturerDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-manufacturer')
    @Authorized()
    public async deleteMultipleManufacturer(@Body({ validate: true }) deleteManufacturer: DeleteManufacturer, @Res() response: any, @Req() request: any): Promise<any> {
        const manufacturerIdNo = deleteManufacturer.manufacturerId.toString();
        const manufacturerid = manufacturerIdNo.split(',');
        const err: any = [];
        for (const id of manufacturerid) {
            const findproduct = await this.productService.findOne({
                where: {
                    manufacturerId: id,
                },
            });
            if (findproduct) {
                err.push(1);
            }
        }
        if (err.length > 0) {
            const errorResponse: any = {
                status: 0,
                message: 'products mapped for selected manufacturer',
            };
            return response.status(400).send(errorResponse);
        }
        for (const id of manufacturerid) {
            const dataId = await this.manufacturerService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid manufacturerId',
                };
                return response.status(400).send(errorResponse);
            } else {
                const deleteManufacturerId = parseInt(id, 10);
                await this.manufacturerService.delete(deleteManufacturerId);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted manufacturer',
        };
        return response.status(200).send(successResponse);
    }

    // Manufacturer Detail
    /**
     * @api {get} /api/manufacturer/manufacturer-detail Manufacturer Detail API
     * @apiGroup Manufacturer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} manufacturerId manufacurerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Manufacturer detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/manufacturer/manufacturer-detail
     * @apiErrorExample {json} manufacturer Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/manufacturer-detail')
    @Authorized()
    public async ManufacturerDetail(@QueryParam('manufacturerId') manufacturerId: number, @Res() response: any): Promise<any> {
        const manufacturer = await this.manufacturerService.findOne({
            where: {
                manufacturerId,
            },
        });
        if (!manufacturer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Manufacturer Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got manufacturer detail',
            data: manufacturer,
        };
        return response.status(200).send(successResponse);
    }

    // Manufacturer Excel Document download
    /**
     * @api {get} /api/manufacturer/manufacturer-excel-list Manufacturer Excel
     * @apiGroup Manufacturer
     * @apiParam (Request body) {String} manufacturerId manufacturerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Manufacturer Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/manufacturer/manufacturer-excel-list
     * @apiErrorExample {json} manufacturer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/manufacturer-excel-list')
    public async excelManufacturerView(@QueryParam('manufacturerId') manufacturerId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('manufacturer excel Sheet');
        const rows = [];
        if (manufacturerId === '') {
            const errorResponse: any = {
                status: 0,
                message: 'choose atleast one manufacturer',
            };
            return response.status(400).send(errorResponse);
        }
        const manufacturerid = manufacturerId.split(',');
        for (const id of manufacturerid) {
            const dataId = await this.manufacturerService.findOne({ where: { manufacturerId: id } });
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid manufacturerId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Manufacturer Id', key: 'manufacturerId', size: 16, width: 15 },
            { header: 'Manufacturer Name', key: 'manufacturerName', size: 16, width: 15 },
            { header: 'status', key: 'status', size: 16, width: 15 },
            { header: 'Created Date', key: 'createdDate', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const id of manufacturerid) {
            const dataId = await this.manufacturerService.findOne(id);
            rows.push([dataId.manufacturerId, dataId.name, dataId.isActive, dataId.createdDate]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './ManufacturerExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }
}
