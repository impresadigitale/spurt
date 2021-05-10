"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPersonController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const DeliveryPersonLoginRequest_1 = require("./requests/DeliveryPersonLoginRequest");
const Customer_1 = require("../../../models/Customer");
const DeliveryPerson_1 = require("../../../models/DeliveryPerson");
const DeliveryPersonService_1 = require("../../../services/DeliveryPersonService");
const S3Service_1 = require("../../../services/S3Service");
const env_1 = require("../../../../env");
const ImageService_1 = require("../../../services/ImageService");
const UpdateDeliveryPersonRequest_1 = require("./requests/UpdateDeliveryPersonRequest");
const CreateDeliveryPersonRequest_1 = require("./requests/CreateDeliveryPersonRequest");
const CreateDeliveryAllocationRequest_1 = require("./requests/CreateDeliveryAllocationRequest");
const DeliveryAllocationService_1 = require("../../../services/DeliveryAllocationService");
const DeliveryAllocation_1 = require("../../../models/DeliveryAllocation");
const VendorOrderService_1 = require("../../../services/VendorOrderService");
const DeliveryPersonToLocationService_1 = require("../../../services/DeliveryPersonToLocationService");
const DeliveryLocationService_1 = require("../../../services/DeliveryLocationService");
const DeliveryPersonToLocation_1 = require("../../../models/DeliveryPersonToLocation");
const mail_services_1 = require("../../../../auth/mail.services");
const EmailTemplateService_1 = require("../../../services/EmailTemplateService");
const VendorService_1 = require("../../../services/VendorService");
const CustomerService_1 = require("../../../services/CustomerService");
const SettingService_1 = require("../../../services/SettingService");
let DeliveryPersonController = class DeliveryPersonController {
    constructor(deliveryPersonService, imageService, vendorOrderService, deliveryPersonToLocationService, deliveryLocationService, emailTemplateService, customerService, vendorService, settingService, s3Service, deliveryAllocationService) {
        this.deliveryPersonService = deliveryPersonService;
        this.imageService = imageService;
        this.vendorOrderService = vendorOrderService;
        this.deliveryPersonToLocationService = deliveryPersonToLocationService;
        this.deliveryLocationService = deliveryLocationService;
        this.emailTemplateService = emailTemplateService;
        this.customerService = customerService;
        this.vendorService = vendorService;
        this.settingService = settingService;
        this.s3Service = s3Service;
        this.deliveryAllocationService = deliveryAllocationService;
    }
    // Login API
    /**
     * @api {post} /api/delivery-person/login Login
     * @apiGroup Delivery Person
     * @apiParam (Request body) {String} emailId User EmailId
     * @apiParam (Request body) {String} password User Password
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "password" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "data": "{
     *         "token":''
     *      }",
     *      "message": "Successfully login",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-person/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    login(loginParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.deliveryPersonService.findOne({
                where: {
                    email: loginParam.emailId,
                    deleteFlag: 0,
                },
            });
            if (user) {
                if (yield Customer_1.Customer.comparePassword(user, loginParam.password)) {
                    // create a token
                    const token = jsonwebtoken_1.default.sign({ id: user.id }, '123##$$)(***&');
                    const successResponse = {
                        status: 1,
                        message: 'Loggedin successful',
                        data: {
                            token,
                            user: class_transformer_1.classToPlain(user),
                        },
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid password',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid emailId',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Create Delivery person API
    /**
     * @api {post} /api/delivery-person/add-delivery-person Add Delivery Person API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName firstName
     * @apiParam (Request body) {String} lastName lastName
     * @apiParam (Request body) {String} mobileNumber Delivery Person mobileNumber
     * @apiParam (Request body) {String} emailId Email Id
     * @apiParam (Request body) {String} password Password
     * @apiParam (Request body) {String} confirmPassword Confirm Password
     * @apiParam (Request body) {Number} allLocation allLocation
     * @apiParam (Request body) {String} location Location
     * @apiParam (Request body) {String} image Delivery Person Image
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "emailId" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "allLocation" : "",
     *      "mobileNumber" : "",
     *      "location" : "",
     *      "image" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Delivery Person Created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-person/add-delivery-person
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    addDeliveryPerson(deliveryPersonParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newDeliveryPerson = new DeliveryPerson_1.DeliveryPerson();
            const resultUser = yield this.deliveryPersonService.findOne({ where: { email: deliveryPersonParam.emailId, deleteFlag: 0 } });
            if (resultUser) {
                const errorResponse = {
                    status: 1,
                    message: 'Already registered with this emailId.',
                };
                return response.status(400).send(errorResponse);
            }
            if (deliveryPersonParam.password === deliveryPersonParam.confirmPassword) {
                const avatar = deliveryPersonParam.image;
                if (avatar) {
                    const type = avatar.split(';')[0].split('/')[1];
                    const name = 'Img_' + Date.now() + '.' + type;
                    const path = 'user/';
                    const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((path + name), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((path + name), base64Data);
                    }
                    newDeliveryPerson.image = name;
                    newDeliveryPerson.imagePath = path;
                }
                const password = yield DeliveryPerson_1.DeliveryPerson.hashPassword(deliveryPersonParam.password);
                newDeliveryPerson.vendorId = request.user.vendorId;
                newDeliveryPerson.firstName = deliveryPersonParam.firstName;
                newDeliveryPerson.lastName = deliveryPersonParam.lastName;
                newDeliveryPerson.mobileNumber = deliveryPersonParam.mobileNumber;
                newDeliveryPerson.email = deliveryPersonParam.emailId;
                newDeliveryPerson.password = password;
                newDeliveryPerson.allLocation = deliveryPersonParam.allLocation ? deliveryPersonParam.allLocation : 0;
                newDeliveryPerson.deleteFlag = 0;
                newDeliveryPerson.isActive = deliveryPersonParam.status;
                const deliveryPerson = yield this.deliveryPersonService.create(newDeliveryPerson);
                const location = deliveryPersonParam.location;
                if (location) {
                    const locations = location.split(',');
                    for (const deliveryLocation of locations) {
                        const newDeliveryLocation = new DeliveryPersonToLocation_1.DeliveryPersonToLocation();
                        newDeliveryLocation.deliveryPersonId = newDeliveryPerson.id;
                        newDeliveryLocation.deliveryLocationId = deliveryLocation;
                        this.deliveryPersonToLocationService.create(newDeliveryLocation);
                    }
                }
                if (deliveryPerson) {
                    const vendor = yield this.vendorService.findOne({ where: { vendorId: request.user.vendorId } });
                    const vendorCustomer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                    const emailContent = yield this.emailTemplateService.findOne(14);
                    const logo = yield this.settingService.findOne();
                    const message = emailContent.content.replace('{name}', deliveryPersonParam.firstName).replace('{username}', deliveryPersonParam.emailId).replace('{password}', deliveryPersonParam.password).replace('{vendorname}', vendorCustomer.firstName);
                    const redirectUrl = env_1.env.storeRedirectUrl;
                    mail_services_1.MAILService.registerMail(logo, message, deliveryPersonParam.emailId, emailContent.subject, redirectUrl);
                    const successResponse = {
                        status: 1,
                        message: 'Successfully created new Delivery with user name and password and send an email. ',
                        data: deliveryPerson,
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Password does not match.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // List Delivery Person API
    /**
     * @api {get} /api/delivery-person/list-delivery-person List Delivery Person API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword Keyword
     * @apiParam (Request body) {Number} status Status
     * @apiParam (Request body) {Number} count Count should be number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset" : "",
     *      "keyword" : "",
     *      "status" : "",
     *      "count" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Delivery Person List Successfully"
     *      "data" : "{
     *      "id" : "",
     *      "firstName" : "",
     *      "lastName" : "",
     *      "mobileNumber" : "",
     *      "email" : "",
     *      "password" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "isActive" : "",
     *      }"
     * }
     * @apiSampleRequest /api/delivery-person/list-delivery-person
     * @apiErrorExample {json} List Delivery Person API error
     * HTTP/1.1 500 Internal Server Error
     */
    list(limit, offset, keyword, status, count, req, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'vendorId', 'firstName', 'lastName', 'email', 'mobileNumber', 'allLocation', 'image', 'imagePath', 'isActive'];
            const WhereConditions = [
                {
                    name: 'firstName',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'vendorId',
                    op: 'where',
                    value: req.user.vendorId,
                },
            ];
            const deliveryPersonList = yield this.deliveryPersonService.list(limit, offset, select, WhereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully got delivery person count',
                    data: deliveryPersonList,
                });
            }
            const promise = deliveryPersonList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                const locations = [];
                const deliveryPersonToLocations = yield this.deliveryPersonToLocationService.findAll({
                    where: { deliveryPersonId: value.id },
                    select: ['deliveryPersonId', 'deliveryLocationId'],
                });
                for (const deliveryPersonToLocation of deliveryPersonToLocations) {
                    const obj = {};
                    const deliveryLocation = yield this.deliveryLocationService.findOne({
                        where: { deliveryLocationId: deliveryPersonToLocation.deliveryLocationId },
                        select: ['deliveryLocationId', 'zipCode', 'locationName'],
                    });
                    if (deliveryLocation) {
                        const loc = deliveryLocation.locationName.replace(/~/g, ' ');
                        const val = loc.trim('');
                        obj.location = deliveryLocation.zipCode + ',' + val;
                        obj.deliveryLocationId = deliveryLocation.deliveryLocationId;
                        locations.push(obj);
                    }
                }
                temp.locations = locations;
                temp.locationsCount = locations.length;
                return temp;
            }));
            const results = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got delivery person list',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Delivery Person API
    /**
     * @api {delete} /api/delivery-person/delete-delivery-person/:id Delete Delivery Person API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted delivery person.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-person/delete-delivery-person/:id
     * @apiErrorExample {json} Delete Delivery Person API error
     * HTTP/1.1 500 Internal Server Error
     */
    delete(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deliveryPerson = yield this.deliveryPersonService.findOne({
                where: {
                    id, vendorId: request.user.vendorId,
                },
            });
            if (!deliveryPerson) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Delivery Person',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteDeliveryPerson = yield this.deliveryPersonService.delete(deliveryPerson);
            if (deleteDeliveryPerson) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted Person',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete Person',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Update Delivery Person API
    /**
     * @api {put} /api/delivery-person/update-delivery-person/:id Update Delivery Person API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName First Name
     * @apiParam (Request body) {String} lastName Last Name
     * @apiParam (Request body) {String} emailId Email Id
     * @apiParam (Request body) {String} password Password
     * @apiParam (Request body) {String} confirmPassword Confirm Password
     * @apiParam (Request body) {String} mobileNumber Mobile Number
     * @apiParam (Request body) {String} location location
     * @apiParam (Request body) {Number} allLocation allLocation
     * @apiParam (Request body) {String} image Image
     * @apiParam (Request body) {Number} status Status
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "emailId" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "mobileNumber" : "",
     *      "location" : "",
     *      "allLocation" : "",
     *      "image" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Updated successfully"
     *      "data" : "{}"
     * }
     * @apiSampleRequest /api/delivery-person/update-delivery-person/:id
     * @apiErrorExample {json} Update Delivery Person API error
     * HTTP/1.1 500 Internal Server Error
     */
    update(updateParam, id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.deliveryPersonService.findOne({
                where: {
                    id, vendorId: request.user.vendorId,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Delivery Person',
                };
                return response.status(400).send(errorResponse);
            }
            if (updateParam.password === updateParam.confirmPassword) {
                const image = updateParam.image;
                if (image) {
                    const type = image.split(';')[0].split('/')[1];
                    const name = 'Img_' + Date.now() + '.' + type;
                    const path = 'logo/';
                    const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((path + name), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((path + name), base64Data);
                    }
                    user.image = name;
                    user.imagePath = path;
                }
                user.firstName = updateParam.firstName;
                user.lastName = updateParam.lastName;
                user.mobileNumber = updateParam.mobileNumber;
                user.email = updateParam.emailId;
                if (updateParam.password) {
                    const password = yield DeliveryPerson_1.DeliveryPerson.hashPassword(updateParam.password);
                    user.password = password;
                }
                user.allLocation = updateParam.allLocation ? updateParam.allLocation : 0;
                user.isActive = updateParam.status;
                const updateUser = yield this.deliveryPersonService.update(user.id, user);
                if (updateParam.location) {
                    this.deliveryPersonToLocationService.delete({ deliveryPersonId: updateUser.id });
                    const locations = updateParam.location;
                    const location = locations.split(',');
                    for (const deliveryLocation of location) {
                        const newDeliveryLocation = new DeliveryPersonToLocation_1.DeliveryPersonToLocation();
                        newDeliveryLocation.deliveryPersonId = updateUser.id;
                        newDeliveryLocation.deliveryLocationId = deliveryLocation;
                        this.deliveryPersonToLocationService.create(newDeliveryLocation);
                    }
                }
                if (updateUser) {
                    const successResponse = {
                        status: 1,
                        message: 'Updated successfully',
                        data: user,
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Password does not match.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Create Delivery Allocation API
    /**
     * @api {post} /api/delivery-person/add-delivery-allocation Add Delivery Allocation API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorOrderId vendorOrderId
     * @apiParam (Request body) {Number} deliveryPersonId deliveryPersonId
     * @apiParamExample {json} Input
     * {
     *      "vendorOrderId" : "",
     *      "deliveryPersonId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Delivery Allocation Created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delivery-person/add-delivery-allocation
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    addDeliveryAllocation(deliveryAllocationParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorOrder = yield this.vendorOrderService.findOne({
                where: {
                    vendorOrderId: deliveryAllocationParam.vendorOrderId, vendorId: request.user.vendorId,
                },
            });
            if (!vendorOrder) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid vendor order id',
                };
                return response.status(400).send(errorResponse);
            }
            const deliveryPerson = yield this.deliveryPersonService.findOne({
                where: {
                    id: deliveryAllocationParam.deliveryPersonId,
                },
            });
            if (!deliveryPerson) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid delivery person id',
                };
                return response.status(400).send(errorResponse);
            }
            const deliveryAllocation = yield this.deliveryAllocationService.findOne({
                where: {
                    vendorOrderId: deliveryAllocationParam.vendorOrderId,
                },
            });
            if (deliveryAllocation) {
                deliveryAllocation.deliveryPersonId = deliveryPerson.id;
                yield this.deliveryAllocationService.create(deliveryAllocation);
            }
            else {
                const newDeliveryAllocation = new DeliveryAllocation_1.DeliveryAllocation();
                newDeliveryAllocation.vendorOrderId = vendorOrder.vendorOrderId;
                newDeliveryAllocation.orderId = vendorOrder.orderId;
                newDeliveryAllocation.deliveryPersonId = deliveryPerson.id;
                newDeliveryAllocation.deliveryOrderStatusId = 1;
                newDeliveryAllocation.isActive = 1;
                yield this.deliveryAllocationService.create(newDeliveryAllocation);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully create delivery allocation',
            };
            return response.status(200).send(successResponse);
        });
    }
    // List Delivery Person API
    /**
     * @api {get} /api/delivery-person/delivery-person-list-delivery-allocation   List Delivery Person for delivery allocation API
     * @apiGroup Delivery Person
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} location location
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset" : "",
     *      "keyword" : "",
     *      "status" : "",
     *      "count" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Delivery Person List Successfully"
     *      "data" : "{
     *      "id" : "",
     *      "firstName" : "",
     *      "lastName" : "",
     *      "mobileNumber" : "",
     *      "email" : "",
     *      "password" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "isActive" : "",
     *      }"
     * }
     * @apiSampleRequest /api/delivery-person/delivery-person-list-delivery-allocation
     * @apiErrorExample {json} List Delivery Person API error
     * HTTP/1.1 500 Internal Server Error
     */
    allocationPersonList(limit, offset, location, req, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deliveryPersonList = yield this.deliveryPersonService.queryList(limit, offset, req.user.vendorId, location);
            const successResponse = {
                status: 1,
                message: 'Successfully got delivery person list',
                data: deliveryPersonList,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/login'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeliveryPersonLoginRequest_1.DeliveryPersonLogin, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPersonController.prototype, "login", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/add-delivery-person'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateDeliveryPersonRequest_1.CreateDeliveryPersonRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPersonController.prototype, "addDeliveryPerson", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/list-delivery-person'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('status')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Req()), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPersonController.prototype, "list", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-delivery-person/:id'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPersonController.prototype, "delete", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-delivery-person/:id'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })),
    tslib_1.__param(1, routing_controllers_1.Param('id')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateDeliveryPersonRequest_1.UpdateDeliveryPersonRequest, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPersonController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/add-delivery-allocation'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateDeliveryAllocationRequest_1.CreateDeliveryAllocationRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPersonController.prototype, "addDeliveryAllocation", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/delivery-person-list-delivery-allocation'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('location')), tslib_1.__param(3, routing_controllers_1.Req()), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPersonController.prototype, "allocationPersonList", null);
DeliveryPersonController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/delivery-person'),
    tslib_1.__metadata("design:paramtypes", [DeliveryPersonService_1.DeliveryPersonService, ImageService_1.ImageService,
        VendorOrderService_1.VendorOrdersService,
        DeliveryPersonToLocationService_1.DeliveryPersonToLocationService,
        DeliveryLocationService_1.DeliveryLocationService,
        EmailTemplateService_1.EmailTemplateService,
        CustomerService_1.CustomerService,
        VendorService_1.VendorService,
        SettingService_1.SettingService,
        S3Service_1.S3Service, DeliveryAllocationService_1.DeliveryAllocationService])
], DeliveryPersonController);
exports.DeliveryPersonController = DeliveryPersonController;
//# sourceMappingURL=DeliveryPersonController.js.map