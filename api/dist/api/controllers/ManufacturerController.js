"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const AWS = tslib_1.__importStar(require("aws-sdk"));
const CreateManufacturerRequest_1 = require("./requests/CreateManufacturerRequest");
const ManufacturerModel_1 = require("../models/ManufacturerModel");
const ManufacturerService_1 = require("../services/ManufacturerService");
const env_1 = require("../../env");
const UpdateManufacturerRequest_1 = require("./requests/UpdateManufacturerRequest");
const DeleteManufacturerRequest_1 = require("./requests/DeleteManufacturerRequest");
const S3Service_1 = require("../services/S3Service");
const ImageService_1 = require("../services/ImageService");
const fs = tslib_1.__importStar(require("fs"));
const ProductService_1 = require("../services/ProductService");
// S3 SetUp
AWS.config.update({
    accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID,
    secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY,
    region: env_1.aws_setup.AWS_DEFAULT_REGION,
});
let ManufacturerController = class ManufacturerController {
    constructor(manufacturerService, s3Service, productService, imageService) {
        this.manufacturerService = manufacturerService;
        this.s3Service = s3Service;
        this.productService = productService;
        this.imageService = imageService;
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
    createManufacturer(manufacturer, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((path + name), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((path + name), base64Data);
                    }
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'File size is too large, give less than 2 mb. ',
                    };
                    return response.status(400).send(errorResponse);
                }
                const newManufacturer = new ManufacturerModel_1.Manufacturer();
                newManufacturer.name = manufacturer.name;
                newManufacturer.image = name;
                newManufacturer.imagePath = path;
                newManufacturer.sortOrder = manufacturer.sortOrder;
                newManufacturer.isActive = manufacturer.status;
                yield this.manufacturerService.create(newManufacturer);
                const successResponse = {
                    status: 1,
                    message: 'Successfully created a new Brand.',
                    data: { name, path },
                };
                return response.status(200).send(successResponse);
            }
        });
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
    manufacturerList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const manufacturerList = yield this.manufacturerService.list(limit, offset, select, search, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete brand list.',
                data: manufacturerList,
            };
            return response.status(200).send(successResponse);
        });
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
    updateManufacturer(manufacturerParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const manufacturer = yield this.manufacturerService.findOne({
                where: {
                    manufacturerId: manufacturerParam.manufacturerId,
                },
            });
            if (!manufacturer) {
                const errorResponse = {
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
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((path + name), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((path + name), base64Data);
                    }
                }
                else {
                    const errorResponse = {
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
            const manufacturerSave = yield this.manufacturerService.create(manufacturer);
            if (manufacturerSave !== undefined) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated the Brand.',
                    data: manufacturerSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update Brand',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteManufacturer(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ManufacturerData = yield this.manufacturerService.findOne({
                where: {
                    manufacturerId: id,
                },
            });
            if (!ManufacturerData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid manufacturerId',
                };
                return response.status(400).send(errorResponse);
            }
            const findproduct = yield this.productService.findOne({
                where: {
                    manufacturerId: ManufacturerData.manufacturerId,
                },
            });
            if (findproduct) {
                const errorResponse = {
                    status: 0,
                    message: 'product mapped for this manufacturer',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteManufacturer = yield this.manufacturerService.delete(ManufacturerData.manufacturerId);
            if (!deleteManufacturer) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted the Brand. ',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete manufacturer',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteMultipleManufacturer(deleteManufacturer, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const manufacturerIdNo = deleteManufacturer.manufacturerId.toString();
            const manufacturerid = manufacturerIdNo.split(',');
            const err = [];
            for (const id of manufacturerid) {
                const findproduct = yield this.productService.findOne({
                    where: {
                        manufacturerId: id,
                    },
                });
                if (findproduct) {
                    err.push(1);
                }
            }
            if (err.length > 0) {
                const errorResponse = {
                    status: 0,
                    message: 'products mapped for selected manufacturer',
                };
                return response.status(400).send(errorResponse);
            }
            for (const id of manufacturerid) {
                const dataId = yield this.manufacturerService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid manufacturerId',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    const deleteManufacturerId = parseInt(id, 10);
                    yield this.manufacturerService.delete(deleteManufacturerId);
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully deleted manufacturer',
            };
            return response.status(200).send(successResponse);
        });
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
    ManufacturerDetail(manufacturerId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const manufacturer = yield this.manufacturerService.findOne({
                where: {
                    manufacturerId,
                },
            });
            if (!manufacturer) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Manufacturer Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got manufacturer detail',
                data: manufacturer,
            };
            return response.status(200).send(successResponse);
        });
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
    excelManufacturerView(manufacturerId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('manufacturer excel Sheet');
            const rows = [];
            if (manufacturerId === '') {
                const errorResponse = {
                    status: 0,
                    message: 'choose atleast one manufacturer',
                };
                return response.status(400).send(errorResponse);
            }
            const manufacturerid = manufacturerId.split(',');
            for (const id of manufacturerid) {
                const dataId = yield this.manufacturerService.findOne({ where: { manufacturerId: id } });
                if (dataId === undefined) {
                    const errorResponse = {
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
                const dataId = yield this.manufacturerService.findOne(id);
                rows.push([dataId.manufacturerId, dataId.name, dataId.isActive, dataId.createdDate]);
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './ManufacturerExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
            });
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/create-manufacturer'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateManufacturerRequest_1.CreateManufacturer, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ManufacturerController.prototype, "createManufacturer", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/manufacturerlist'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('status')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ManufacturerController.prototype, "manufacturerList", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-manufacturer/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateManufacturerRequest_1.UpdateManufacturer, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ManufacturerController.prototype, "updateManufacturer", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-manufacturer/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ManufacturerController.prototype, "deleteManufacturer", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/delete-manufacturer'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteManufacturerRequest_1.DeleteManufacturer, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ManufacturerController.prototype, "deleteMultipleManufacturer", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/manufacturer-detail'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('manufacturerId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ManufacturerController.prototype, "ManufacturerDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/manufacturer-excel-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('manufacturerId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ManufacturerController.prototype, "excelManufacturerView", null);
ManufacturerController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/manufacturer'),
    tslib_1.__metadata("design:paramtypes", [ManufacturerService_1.ManufacturerService, S3Service_1.S3Service, ProductService_1.ProductService,
        ImageService_1.ImageService])
], ManufacturerController);
exports.ManufacturerController = ManufacturerController;
//# sourceMappingURL=ManufacturerController.js.map