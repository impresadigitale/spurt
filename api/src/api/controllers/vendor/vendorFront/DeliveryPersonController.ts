/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Authorized, Get, QueryParam, Delete, Param, Req, Put
} from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { DeliveryPersonLogin } from './requests/DeliveryPersonLoginRequest';
import { Customer } from '../../../models/Customer';
import { DeliveryPerson } from '../../../models/DeliveryPerson';
import { DeliveryPersonService } from '../../../services/DeliveryPersonService';
import { S3Service } from '../../../services/S3Service';
import { env } from '../../../../env';
import { ImageService } from '../../../services/ImageService';
import { UpdateDeliveryPersonRequest } from './requests/UpdateDeliveryPersonRequest';
import { CreateDeliveryPersonRequest } from './requests/CreateDeliveryPersonRequest';
import { CreateDeliveryAllocationRequest } from './requests/CreateDeliveryAllocationRequest';
import { DeliveryAllocationService } from '../../../services/DeliveryAllocationService';
import { DeliveryAllocation } from '../../../models/DeliveryAllocation';
import { VendorOrdersService } from '../../../services/VendorOrderService';
import { DeliveryPersonToLocationService } from '../../../services/DeliveryPersonToLocationService';
import { DeliveryLocationService } from '../../../services/DeliveryLocationService';
import { DeliveryPersonToLocation } from '../../../models/DeliveryPersonToLocation';
import { MAILService } from '../../../../auth/mail.services';
import { EmailTemplateService } from '../../../services/EmailTemplateService';
import { VendorService } from '../../../services/VendorService';
import { CustomerService } from '../../../services/CustomerService';
import { SettingService } from '../../../services/SettingService';

@JsonController('/delivery-person')
export class DeliveryPersonController {

    constructor(private deliveryPersonService: DeliveryPersonService, private imageService: ImageService,
                private vendorOrderService: VendorOrdersService,
                private deliveryPersonToLocationService: DeliveryPersonToLocationService,
                private deliveryLocationService: DeliveryLocationService,
                private emailTemplateService: EmailTemplateService,
                private customerService: CustomerService,
                private vendorService: VendorService,
                private settingService: SettingService,
                private s3Service: S3Service, private deliveryAllocationService: DeliveryAllocationService) {
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
    @Post('/login')
    public async login(@Body({ validate: true }) loginParam: DeliveryPersonLogin, @Res() response: any): Promise<any> {
        const user = await this.deliveryPersonService.findOne({
            where: {
                email: loginParam.emailId,
                deleteFlag: 0,
            },
        });
        if (user) {
            if (await Customer.comparePassword(user, loginParam.password)) {
                // create a token
                const token = jwt.sign({ id: user.id }, '123##$$)(***&');
                const successResponse: any = {
                    status: 1,
                    message: 'Loggedin successful',
                    data: {
                        token,
                        user: classToPlain(user),
                    },
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid password',
                };
                return response.status(400).send(errorResponse);
            }
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid emailId',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Post('/add-delivery-person')
    @Authorized('vendor')
    public async addDeliveryPerson(@Body({ validate: true }) deliveryPersonParam: CreateDeliveryPersonRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const newDeliveryPerson: any = new DeliveryPerson();
        const resultUser = await this.deliveryPersonService.findOne({ where: { email: deliveryPersonParam.emailId, deleteFlag: 0 } });
        if (resultUser) {
            const errorResponse: any = {
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
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
                newDeliveryPerson.image = name;
                newDeliveryPerson.imagePath = path;
            }
            const password = await DeliveryPerson.hashPassword(deliveryPersonParam.password);
            newDeliveryPerson.vendorId = request.user.vendorId;
            newDeliveryPerson.firstName = deliveryPersonParam.firstName;
            newDeliveryPerson.lastName = deliveryPersonParam.lastName;
            newDeliveryPerson.mobileNumber = deliveryPersonParam.mobileNumber;
            newDeliveryPerson.email = deliveryPersonParam.emailId;
            newDeliveryPerson.password = password;
            newDeliveryPerson.allLocation = deliveryPersonParam.allLocation ? deliveryPersonParam.allLocation : 0;
            newDeliveryPerson.deleteFlag = 0;
            newDeliveryPerson.isActive = deliveryPersonParam.status;
            const deliveryPerson = await this.deliveryPersonService.create(newDeliveryPerson);
            const location: any = deliveryPersonParam.location;
            if (location) {
                const locations = location.split(',');
                for (const deliveryLocation of locations) {
                    const newDeliveryLocation: any = new DeliveryPersonToLocation();
                    newDeliveryLocation.deliveryPersonId = newDeliveryPerson.id;
                    newDeliveryLocation.deliveryLocationId = deliveryLocation;
                    this.deliveryPersonToLocationService.create(newDeliveryLocation);
                }
            }
            if (deliveryPerson) {
                const vendor = await this.vendorService.findOne({ where: { vendorId: request.user.vendorId } });
                const vendorCustomer = await this.customerService.findOne({ where: { id: vendor.customerId } });
                const emailContent = await this.emailTemplateService.findOne(14);
                const logo = await this.settingService.findOne();
                const message = emailContent.content.replace('{name}', deliveryPersonParam.firstName).replace('{username}', deliveryPersonParam.emailId).replace('{password}', deliveryPersonParam.password).replace('{vendorname}', vendorCustomer.firstName);
                const redirectUrl = env.storeRedirectUrl;
                MAILService.registerMail(logo, message, deliveryPersonParam.emailId, emailContent.subject, redirectUrl);
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully created new Delivery with user name and password and send an email. ',
                    data: deliveryPerson,
                };
                return response.status(200).send(successResponse);
            }
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Password does not match.',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get('/list-delivery-person')
    @Authorized('vendor')
    public async list(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Req() req: any, @Res() response: any): Promise<any> {
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
        const deliveryPersonList: any = await this.deliveryPersonService.list(limit, offset, select, WhereConditions, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got delivery person count',
                data: deliveryPersonList,
            });
        }
        const promise = deliveryPersonList.map(async (value: any) => {
            const temp: any = value;
            const locations: any = [];
            const deliveryPersonToLocations = await this.deliveryPersonToLocationService.findAll({
                where: { deliveryPersonId: value.id },
                select: ['deliveryPersonId', 'deliveryLocationId'],
            });
            for (const deliveryPersonToLocation of deliveryPersonToLocations) {
                const obj: any = {};
                const deliveryLocation = await this.deliveryLocationService.findOne({
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
        });
        const results = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got delivery person list',
            data: results,
        };
        return response.status(200).send(successResponse);
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
    @Delete('/delete-delivery-person/:id')
    @Authorized('vendor')
    public async delete(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {

        const deliveryPerson = await this.deliveryPersonService.findOne({
            where: {
                id, vendorId: request.user.vendorId,
            },
        });
        if (!deliveryPerson) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Delivery Person',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteDeliveryPerson = await this.deliveryPersonService.delete(deliveryPerson);
        if (deleteDeliveryPerson) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Person',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete Person',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Put('/update-delivery-person/:id')
    @Authorized('vendor')
    public async update(@Body({ validate: true }) updateParam: UpdateDeliveryPersonRequest,
                        @Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const user = await this.deliveryPersonService.findOne({
            where: {
                id, vendorId: request.user.vendorId,
            },
        });
        if (!user) {
            const errorResponse: any = {
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
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
                user.image = name;
                user.imagePath = path;
            }
            user.firstName = updateParam.firstName;
            user.lastName = updateParam.lastName;
            user.mobileNumber = updateParam.mobileNumber;
            user.email = updateParam.emailId;
            if (updateParam.password) {
                const password = await DeliveryPerson.hashPassword(updateParam.password);
                user.password = password;
            }
            user.allLocation = updateParam.allLocation ? updateParam.allLocation : 0;
            user.isActive = updateParam.status;
            const updateUser = await this.deliveryPersonService.update(user.id, user);
            if (updateParam.location) {
                this.deliveryPersonToLocationService.delete({ deliveryPersonId: updateUser.id });
                const locations: any = updateParam.location;
                const location = locations.split(',');
                for (const deliveryLocation of location) {
                    const newDeliveryLocation: any = new DeliveryPersonToLocation();
                    newDeliveryLocation.deliveryPersonId = updateUser.id;
                    newDeliveryLocation.deliveryLocationId = deliveryLocation;
                    this.deliveryPersonToLocationService.create(newDeliveryLocation);
                }
            }
            if (updateUser) {
                const successResponse: any = {
                    status: 1,
                    message: 'Updated successfully',
                    data: user,
                };
                return response.status(200).send(successResponse);
            }
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Password does not match.',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Post('/add-delivery-allocation')
    @Authorized('vendor')
    public async addDeliveryAllocation(@Body({ validate: true }) deliveryAllocationParam: CreateDeliveryAllocationRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorOrder = await this.vendorOrderService.findOne({
            where: {
                vendorOrderId: deliveryAllocationParam.vendorOrderId, vendorId: request.user.vendorId,
            },
        });
        if (!vendorOrder) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendor order id',
            };
            return response.status(400).send(errorResponse);
        }
        const deliveryPerson = await this.deliveryPersonService.findOne({
            where: {
                id: deliveryAllocationParam.deliveryPersonId,
            },
        });
        if (!deliveryPerson) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid delivery person id',
            };
            return response.status(400).send(errorResponse);
        }
        const deliveryAllocation = await this.deliveryAllocationService.findOne({
            where: {
                vendorOrderId: deliveryAllocationParam.vendorOrderId,
            },
        });
        if (deliveryAllocation) {
            deliveryAllocation.deliveryPersonId = deliveryPerson.id;
            await this.deliveryAllocationService.create(deliveryAllocation);
        } else {
            const newDeliveryAllocation: any = new DeliveryAllocation();
            newDeliveryAllocation.vendorOrderId = vendorOrder.vendorOrderId;
            newDeliveryAllocation.orderId = vendorOrder.orderId;
            newDeliveryAllocation.deliveryPersonId = deliveryPerson.id;
            newDeliveryAllocation.deliveryOrderStatusId = 1;
            newDeliveryAllocation.isActive = 1;
            await this.deliveryAllocationService.create(newDeliveryAllocation);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully create delivery allocation',
        };
        return response.status(200).send(successResponse);
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
    @Get('/delivery-person-list-delivery-allocation')
    @Authorized('vendor')
    public async allocationPersonList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('location') location: string, @Req() req: any, @Res() response: any): Promise<any> {
        const deliveryPersonList: any = await this.deliveryPersonService.queryList(limit, offset, req.user.vendorId, location);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got delivery person list',
            data: deliveryPersonList,
        };
        return response.status(200).send(successResponse);
    }

}
