"use strict";
/*
 * SpurtCommerce API
 * version 4.4
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const tslib_1 = require("tslib");
const AWS = tslib_1.__importStar(require("aws-sdk")); // Load the SDK for JavaScript
const routing_controllers_1 = require("routing-controllers");
const CreateFolderNameRequest_1 = require("./requests/CreateFolderNameRequest");
const CreateFileNameRequest_1 = require("./requests/CreateFileNameRequest");
const S3Service_1 = require("../services/S3Service");
const ImageService_1 = require("../services/ImageService");
const env_1 = require("../../env");
AWS.config.update({
    accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID,
    secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY,
    region: env_1.aws_setup.AWS_DEFAULT_REGION,
});
// const s3 = new AWS.S3();
let MediaController = class MediaController {
    constructor(s3Service, imageService) {
        this.s3Service = s3Service;
        this.imageService = imageService;
    }
    // Get Bucket Object List API
    /**
     * @api {get} /api/media/bucket-object-list bucket-object-list
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit list limit
     * @apiParam (Request body) {String} marker from where to list
     * @apiParam (Request body) {String} folderName Specific Folder Name
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "folderName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get bucket object list!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/bucket-object-list
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    ObjectList(folderName, limit, marker, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.listBucker(limit, marker, folderName);
                val.Contents.forEach((item, index) => {
                    const str = item.Key;
                    if (str.charAt(str.length - 1) === '/') {
                        val.Contents.splice(index, 1);
                    }
                });
            }
            else {
                val = yield this.imageService.listFolders(limit, marker, folderName);
            }
            if (val) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get bucket object list',
                    data: val,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Get Bucket Object COUNT API
    /**
     * @api {get} /api/media/bucket-object-count bucket-object-count
     * @apiGroup media
     * @apiParam (Request body) {Number} limit list limit
     * @apiParam (Request body) {Number} marker from where to list
     * @apiParam (Request body) {String} folderName Specific Folder Name
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "folderName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get bucket object count!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/bucket-object-count
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    ObjectCount(folderName, limit, marker, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let isTruncated = true;
            let count = 0;
            while (isTruncated) {
                try {
                    const respons = yield yield this.s3Service.listBucker(limit, marker, folderName);
                    count += respons.Contents.length + respons.CommonPrefixes.length;
                    isTruncated = respons.IsTruncated;
                    if (isTruncated) {
                        marker = respons.Contents.slice(-1)[0].Key;
                    }
                }
                catch (error) {
                    throw error;
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully get bucket object list',
                data: { bucketObjectCount: count },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create Bucket Object --- Like Folder
    /**
     * @api {post} /api/media/create-folder Create Folder
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} folderName Specific Folder Name
     * @apiParamExample {json} Input
     * {
     *      "folderName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Created folder!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/create-folder
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    CreateFolder(folderNameValidation, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.createFolder(folderNameValidation.folderName);
            }
            else {
                val = yield this.imageService.createFolder(folderNameValidation.folderName);
            }
            if (val) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created folder',
                    data: val,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Delete Bucket Object --- Like Folder
    /**
     * @api {post} /api/media/delete-folder delete folder API
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} folderName Specific Folder Name
     * @apiParamExample {json} Input
     * {
     *      "folderName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Deleted folder!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/delete-folder
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    DeleteFolder(folderNameValidation, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const val = yield this.s3Service.deleteFolder(folderNameValidation.folderName);
            if (val) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted folder',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Delete file API
    /**
     * @api {get} /api/media/delete-file delete file API
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} fileName  File Name
     * @apiParamExample {json} Input
     * {
     *      "fileName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Deleted file!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/delete-file
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    DeleteFile(fileName, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (fileName === '') {
                const successResponse = {
                    status: 0,
                    message: 'please choose file',
                };
                return response.status(400).send(successResponse);
            }
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.deleteFile(fileName);
            }
            else {
                val = yield this.imageService.deleteFile(fileName);
            }
            if (val) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted file',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    //  Upload Image File
    /**
     * @api {post} /api/media/upload-file  Upload File
     * @apiGroup media
     * @apiParam (Request body) {String} image image
     * @apiParam (Request body) {String} path Directory Name
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     *    {
     *      "file":"",
     *      "path" : "",
     *    }
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "Successfully upload file",
     *      "status": "1"
     *    }
     * @apiSampleRequest /api/media/upload-file
     * @apiErrorExample {json} media error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *        "message": "Unable to upload file",
     *        "status": 0,
     *    }
     */
    uploadFile(fileNameRequest, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const base64 = fileNameRequest.image;
            const path = fileNameRequest.path;
            AWS.config.update({ accessKeyId: env_1.aws_setup.AWS_ACCESS_KEY_ID, secretAccessKey: env_1.aws_setup.AWS_SECRET_ACCESS_KEY });
            const base64Data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const type = base64.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const stringLength = base64.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;
            let val;
            if (+sizeInKb <= 4096) {
                if (env_1.env.imageserver === 's3') {
                    val = yield this.s3Service.imageUpload((path === '' ? name : path + name), base64Data, type);
                }
                else {
                    val = yield this.imageService.imageUpload((path === '' ? name : path + name), base64Data);
                }
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'File size is too large, give less than 2 mb. ',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Image successfully uploaded',
                data: {
                    image: name,
                    path: val.path,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // image resize API
    /**
     * @api {get} /api/media/image-resize  Resize Image On The Fly
     * @apiGroup Resize-Image
     * @apiParam (Request body) {String} width width
     * @apiParam (Request body) {String} height height
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String} path path
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "message": "Successfully resize image",
     *      "status": "1"
     *    }
     *    @apiSampleRequest /api/media/image-resize
     * @apiErrorExample {json} media error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *        "message": "Unable to resize the image",
     *        "status": 0,
     *    }
     */
    image_resize(width, height, name, path, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widthString = width;
            const heightString = height;
            const imgPath = path;
            const imgName = name;
            const ext = imgName.split('.');
            if (ext[1] === 'jpg' || ext[1] === 'jpeg' || ext[1] === 'png' || ext[1] === 'PNG' || ext[1] === 'JPG') {
                let val;
                if (env_1.env.imageserver === 's3') {
                    val = yield this.s3Service.resizeImage(imgName, imgPath, widthString, heightString);
                }
                else {
                    val = yield this.imageService.resizeImage(imgName, imgPath, widthString, heightString);
                }
                if (val) {
                    return new Promise(() => {
                        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        response.write(val, 'binary');
                        response.end(undefined, 'binary');
                    });
                }
                else {
                    return response.status(400).send({ status: 0, message: 'Only allow jpg/jpeg/png/PNG/JPG format image!' });
                }
            }
            else {
                return response.status(400).send({ status: 0, message: 'Only allow jpg/jpeg/png/PNG/JPG format image!' });
            }
        });
    }
    // Get folder API
    /**
     * @api {get} /api/media/search-folder search Folder API
     * @apiGroup media
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} folderName  folderName
     * @apiParamExample {json} Input
     * {
     *      "FolderName" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Folder!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/media/search-folder
     * @apiErrorExample {json} media error
     * HTTP/1.1 500 Internal Server Error
     */
    getFolder(folderName, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.getFolder(folderName);
            }
            else {
                val = yield this.imageService.getFolder(folderName);
            }
            if (val) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got folder details',
                    data: val,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/bucket-object-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('folderName')), tslib_1.__param(1, routing_controllers_1.QueryParam('limit')), tslib_1.__param(2, routing_controllers_1.QueryParam('marker')), tslib_1.__param(3, routing_controllers_1.Req()), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "ObjectList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/bucket-object-count'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('folderName')), tslib_1.__param(1, routing_controllers_1.QueryParam('limit')), tslib_1.__param(2, routing_controllers_1.QueryParam('marker')), tslib_1.__param(3, routing_controllers_1.Req()), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "ObjectCount", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/create-folder'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateFolderNameRequest_1.FolderNameRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "CreateFolder", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/delete-folder'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateFolderNameRequest_1.FolderNameRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "DeleteFolder", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/delete-file'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('fileName')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "DeleteFile", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/upload-file'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateFileNameRequest_1.FileNameRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "uploadFile", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/image-resize'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('width')), tslib_1.__param(1, routing_controllers_1.QueryParam('height')), tslib_1.__param(2, routing_controllers_1.QueryParam('name')), tslib_1.__param(3, routing_controllers_1.QueryParam('path')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "image_resize", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/search-folder'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('folderName')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MediaController.prototype, "getFolder", null);
MediaController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/media'),
    tslib_1.__metadata("design:paramtypes", [S3Service_1.S3Service,
        ImageService_1.ImageService])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=MediaController.js.map