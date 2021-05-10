/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    Post,
    Delete,
    Put,
    Body,
    QueryParam,
    Param,
    JsonController,
    Authorized,
    Req,
    Res,
} from 'routing-controllers';
import * as AWS from 'aws-sdk';
import { classToPlain } from 'class-transformer';
import { aws_setup, env } from '../../env';
import { CustomerService } from '../services/CustomerService';
import { Customer } from '../models/Customer';
import { CreateCustomer } from './requests/CreateCustomerRequest';
import { User } from '../models/User';
import { MAILService } from '../../auth/mail.services';
import { UpdateCustomer } from './requests/UpdateCustomerRequest';
import { OrderService } from '../services/OrderService';
import { ProductImageService } from '../services/ProductImageService';
import { ProductService } from '../services/ProductService';
import { SettingService } from '../services/SettingService';
import { CustomerGroupService } from '../services/CustomerGroupService';
import { OrderProductService } from '../services/OrderProductService';
import { EmailTemplateService } from '../services/EmailTemplateService';
import { ProductViewLogService } from '../services/ProductViewLogService';
import { DeleteCustomerRequest } from './requests/DeleteCustomerRequest';
import * as fs from 'fs';

@JsonController('/customer')
export class CustomerController {
    constructor(private customerService: CustomerService, private orderProductService: OrderProductService,
                private productViewLogService: ProductViewLogService,
                private productService: ProductService,
                private productImageService: ProductImageService,
                private orderService: OrderService,
                private customerGroupService: CustomerGroupService,
                private settingService: SettingService,
                private emailTemplateService: EmailTemplateService) {
    }

    // Create Customer API
    /**
     * @api {post} /api/customer/add-customer Add Customer API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} customerGroupId Customer customerGroupId
     * @apiParam (Request body) {String} username Customer username
     * @apiParam (Request body) {String} email Customer email
     * @apiParam (Request body) {Number} mobileNumber Customer mobileNumber
     * @apiParam (Request body) {String} password Customer password
     * @apiParam (Request body) {String} confirmPassword Customer confirmPassword
     * @apiParam (Request body) {String} avatar Customer avatar
     * @apiParam (Request body) {Number} mailStatus Customer mailStatus should be 1 or 0
     * @apiParam (Request body) {Number} status Customer status
     * @apiParamExample {json} Input
     * {
     *      "customerGroupId" : "",
     *      "userName" : "",
     *      "email" : "",
     *      "mobileNumber" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "avatar" : "",
     *      "mailStatus" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Customer Created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/add-customer
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-customer')
    @Authorized()
    public async addCustomer(@Body({ validate: true }) customerParam: CreateCustomer, @Res() response: any): Promise<any> {
        const avatar = customerParam.avatar;
        const newCustomer: any = new Customer();
        const resultUser = await this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0 } });
        if (resultUser) {
            const successResponse: any = {
                status: 1,
                message: 'Already registered with this emailId.',
            };
            return response.status(400).send(successResponse);
        }
        if (avatar) {
            const type = avatar.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const s3 = new AWS.S3();
            const path = 'customer/';
            const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const params = {
                Bucket: aws_setup.AWS_BUCKET,
                Key: 'customer/' + name,
                Body: base64Data,
                ACL: 'public-read',
                ContentEncoding: 'base64',
                ContentType: `image/${type}`,
            };
            newCustomer.avatar = name;
            newCustomer.avatarPath = path;
            s3.upload(params, (err, data) => {
                if (err) {
                    throw err;
                }
            });
        }
        if (customerParam.password === customerParam.confirmPassword) {
            const partsOfThreeLetters = customerParam.email.match(/.{3}/g).concat(
                                        customerParam.email.substr(1).match(/.{3}/g),
                                        customerParam.email.substr(2).match(/.{3}/g) );
            const matchEmail =  new RegExp(partsOfThreeLetters.join('|'), 'i').test(customerParam.password);
            if (matchEmail === true) {
                    const validationMessage = [];
                    validationMessage.push('Password must not duplicate any part of the email address');
                    const passwordDuplicateErrorResponse: any = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
                        data: {message: validationMessage},
                    };
                    return response.status(422).send(passwordDuplicateErrorResponse);
            }
            const password = await User.hashPassword(customerParam.password);
            newCustomer.customerGroupId = customerParam.customerGroupId;
            newCustomer.firstName = customerParam.username;
            newCustomer.username = customerParam.email;
            newCustomer.email = customerParam.email;
            newCustomer.mobileNumber = customerParam.mobileNumber;
            newCustomer.password = password;
            newCustomer.mailStatus = customerParam.mailStatus;
            newCustomer.deleteFlag = 0;
            newCustomer.isActive = customerParam.status;
            const customerSave = await this.customerService.create(newCustomer);
            if (customerSave) {
                if (customerParam.mailStatus === 1) {
                    const emailContent = await this.emailTemplateService.findOne(4);
                    const logo = await this.settingService.findOne();
                    const message = emailContent.content.replace('{name}', customerParam.username).replace('{username}', customerParam.email).replace('{password}', customerParam.password);
                    const redirectUrl = env.storeRedirectUrl;
                    MAILService.customerLoginMail(logo, message, customerParam.email, emailContent.subject, redirectUrl);
                    const successResponse: any = {
                        status: 1,
                        message: 'Successfully created new Customer with user name and password and send an email. ',
                        data: customerSave,
                    };
                    return response.status(200).send(successResponse);
                } else {
                    const successResponse: any = {
                        status: 1,
                        message: 'Customer Created Successfully',
                        data: customerSave,
                    };
                    return response.status(200).send(successResponse);
                }
            }
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Password does not match.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Customer List API
    /**
     * @api {get} /api/customer/customerlist Customer List API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} name search by name
     * @apiParam (Request body) {String} email search by email
     * @apiParam (Request body) {Number} status 0->inactive 1-> active
     * @apiParam (Request body) {String} customerGroup search by customerGroup
     * @apiParam (Request body) {String} date search by date
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get customer list",
     *      "data":{
     *      "customerGroupId" : "",
     *      "username" : "",
     *      "email" : "",
     *      "mobileNUmber" : "",
     *      "password" : "",
     *      "avatar" : "",
     *      "avatarPath" : "",
     *      "status" : "",
     *      "safe" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/customerlist
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/customerlist')
    @Authorized()
    public async customerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('name') name: string, @QueryParam('status') status: string, @QueryParam('email') email: string, @QueryParam('customerGroup') customerGroup: string, @QueryParam('date') date: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const search = [
            {
                name: 'firstName',
                op: 'like',
                value: name,
            },
            {
                name: 'email',
                op: 'like',
                value: email,
            },
            {
                name: 'createdDate',
                op: 'like',
                value: date,
            },
            {
                name: 'customerGroupId',
                op: 'like',
                value: customerGroup,
            },
            {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const WhereConditions = [
            {
                name: 'deleteFlag',
                value: 0,
            },
        ];
        const customerList = await this.customerService.list(limit, offset, search, WhereConditions, 0, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: customerList,
            };
            return response.status(200).send(successRes);
        }
        const data: any = customerList.map(async (value: any) => {
            const temp: any = value;
            if (value.customerGroupId !== null) {
                const customerGrp = await this.customerGroupService.findOne({ groupId: value.customerGroupId });
                if (customerGrp) {
                    temp.customerGroupName = customerGrp.name;
                } else {
                    temp.customerGroupName = '';
                }
            } else {
                temp.customerGroupName = '';
            }
            return temp;
        });
        const Customers = await Promise.all(data);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got Customer list.',
            data: Customers,
        };
        return response.status(200).send(successResponse);

    }

    // Delete Customer API
    /**
     * @api {delete} /api/customer/delete-customer/:id Delete Customer API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "customerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted customer.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/delete-customer/:id
     * @apiErrorExample {json} Customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-customer/:id')
    @Authorized()
    public async deleteCustomer(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const customer = await this.customerService.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid customerId',
            };
            return response.status(400).send(errorResponse);
        }
        customer.deleteFlag = 1;
        const deleteCustomer = await this.customerService.create(customer);
        if (deleteCustomer) {
            const successResponse: any = {
                status: 1,
                message: 'Customer Deleted Successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to change delete flag status',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Customer API
    /**
     * @api {put} /api/customer/update-customer/:id Update Customer API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} customerGroupId Customer customerGroupId
     * @apiParam (Request body) {String} username Customer username
     * @apiParam (Request body) {String} email Customer email
     * @apiParam (Request body) {Number} mobileNumber Customer mobileNumber
     * @apiParam (Request body) {String} password Customer password
     * @apiParam (Request body) {String} confirmPassword Customer confirmPassword
     * @apiParam (Request body) {String} avatar Customer avatar
     * @apiParam (Request body) {Number} mailStatus Customer mailStatus should be 1 or 0
     * @apiParam (Request body) {Number} status Customer status
     * @apiParamExample {json} Input
     * {
     *      "customerGroupId" : "",
     *      "userName" : "",
     *      "email" : "",
     *      "mobileNumber" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "avatar" : "",
     *      "mailStatus" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Customer is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/update-customer/:id
     * @apiErrorExample {json} updateCustomer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-customer/:id')
    @Authorized()
    public async updateCustomer(@Param('id') id: number, @Body({ validate: true }) customerParam: UpdateCustomer, @Res() response: any): Promise<any> {
        const customer = await this.customerService.findOne({
            where: {
                id,
            },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid customer id',
            };
            return response.status(400).send(errorResponse);
        }
        if (customerParam.password === customerParam.confirmPassword) {

            const avatar = customerParam.avatar;
            if (avatar) {
                const type = avatar.split(';')[0].split('/')[1];
                const name = 'Img_' + Date.now() + '.' + type;
                const s3 = new AWS.S3();
                const path = 'customer/';
                const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const params = {
                    Bucket: aws_setup.AWS_BUCKET,
                    Key: 'customer/' + name,
                    Body: base64Data,
                    ACL: 'public-read',
                    ContentEncoding: 'base64',
                    ContentType: `image/${type}`,
                };
                s3.upload(params, (err, data) => {
                    if (err) {
                        throw err;
                    }
                });
                customer.avatar = name;
                customer.avatarPath = path;
            }
            customer.customerGroupId = customerParam.customerGroupId;
            customer.firstName = customerParam.username;
            customer.username = customerParam.email;
            customer.email = customerParam.email;
            customer.mobileNumber = customerParam.mobileNumber;
            if (customerParam.password) {
                const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
                if (!customerParam.password.match(pattern)) {
                    const passwordValidatingMessage = [];
                    passwordValidatingMessage.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
                    const errResponse: any = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
                        data: {message : passwordValidatingMessage},
                    };
                    return response.status(422).send(errResponse);
                }
                const partsOfThreeLetters = customerParam.email.match(/.{3}/g).concat(
                                            customerParam.email.substr(1).match(/.{3}/g),
                                            customerParam.email.substr(2).match(/.{3}/g) );
                const matchEmail =  new RegExp(partsOfThreeLetters.join('|'), 'i').test(customerParam.password);
                if (matchEmail === true) {
                    const message = [];
                    message.push('Password must not duplicate any part of the email address');
                    const passwordDuplicateErrorResponse: any = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
                        data: {message},
                    };
                    return response.status(422).send(passwordDuplicateErrorResponse);
                }
                const password = await User.hashPassword(customerParam.password);
                customer.password = password;
            }
            customer.mailStatus = customerParam.mailStatus;
            customer.isActive = customerParam.status;
            const customerSave = await this.customerService.create(customer);
            if (customerSave) {
                const successResponse: any = {
                    status: 1,
                    message: 'Customer Updated Successfully',
                    data: customerSave,
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

    // Get Customer Detail API
    /**
     * @api {get} /api/customer/customer-details/:id Customer Details API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get customer Details",
     * "data":{
     * "customerGroupId" : "",
     * "username" : "",
     * "email" : "",
     * "mobileNumber" : "",
     * "password" : "",
     * "avatar" : "",
     * "avatarPath" : "",
     * "newsletter" : "",
     * "status" : "",
     * "safe" : "",
     * }
     * "status": "1"
     * }
     * @apiSampleRequest /api/customer/customer-details/:id
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/customer-details/:id')
    @Authorized()
    public async customerDetails(@Param('id') Id: number, @Res() response: any): Promise<any> {
        const customer = await this.customerService.findOne({
            select: ['id', 'firstName', 'email', 'mobileNumber', 'address', 'lastLogin', 'isActive', 'mailStatus', 'customerGroupId'],
            where: { id: Id },
        });
        if (!customer) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid CustomerId',
            };
            return response.status(400).send(errorResponse);
        }
        customer.productLists = await this.orderService.find({
            select: ['orderId', 'createdDate'],
            where: { customerId: Id },
        }).then((val) => {
            const orderProducts = val.map(async (value: any) => {
                const productNames = await this.orderProductService.findOne({ orderId: value.orderId });
                const productImage = await this.productImageService.findOne({ where: { productId: productNames.productId, defaultImage: 1 } });
                const temp: any = value;
                temp.productName = productNames.name;
                if (productImage) {
                    temp.image = productImage.image;
                    temp.containerName = productImage.containerName;
                }
                return temp;
            });
            const results = Promise.all(orderProducts);
            return results;
        });

        customer.productViewedData = await this.productViewLogService.find({
            select: ['productId', 'createdDate'],
            where: { customerId: Id },
        }).then((productView) => {
            const orderProducts = productView.map(async (value: any) => {
                const productNames = await this.productService.findOne({ productId: value.productId });
                if (productNames !== undefined) {
                    const productImage = await this.productImageService.findOne({ where: { productId: productNames.productId, defaultImage: 1 } });
                    const temp: any = value;
                    temp.productName = productNames.name;
                    if (productImage) {
                        temp.image = productImage.image;
                        temp.containerName = productImage.containerName;
                    }
                    return temp;
                }
            });
            const results = Promise.all(orderProducts);
            return results;
        });
        const successResponse: any = {
            status: 1,
            message: 'successfully got Customer details. ',
            data: customer,
        };
        return response.status(200).send(successResponse);
    }

    // Recently Added Customer List API
    /**
     * @api {get} /api/customer/recent-customerlist Recent Customer List API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get customer list",
     *      "data":{
     *      "location" : "",
     *      "name" : "",
     *      "created date" : "",
     *      "isActive" : "",
     *      }
     * }
     * @apiSampleRequest /api/customer/recent-customerlist
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/recent-customerlist')
    @Authorized()
    public async recentCustomerList(@Res() response: any): Promise<any> {
        const order = 1;
        const WhereConditions = [
            {
                name: 'deleteFlag',
                value: 0,
            },
        ];
        const customerList = await this.customerService.list(0, 0, 0, WhereConditions, order, 0);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got Customer list.',
            data: classToPlain(customerList),
        };

        return response.status(200).send(successResponse);
    }

    //  Today Customer Count API
    /**
     * @api {get} /api/customer/today-customercount Today Customer Count API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today customer count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/today-customercount
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/today-customercount')
    @Authorized()
    public async customerCount(@Res() response: any): Promise<any> {

        const nowDate = new Date();
        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        const customerCount = await this.customerService.todayCustomerCount(todaydate);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get customerCount',
            data: customerCount,
        };
        return response.status(200).send(successResponse);

    }

    // Delete Multiple Customer API
    /**
     * @api {post} /api/customer/delete-customer Delete Multiple Customer API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} customerId customerId
     * @apiParamExample {json} Input
     * {
     * "customerId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted customer.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/customer/delete-customer
     * @apiErrorExample {json} customerDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-customer')
    @Authorized()
    public async deleteMultipleCustomer(@Body({ validate: true }) deleteCustomerId: DeleteCustomerRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const customers = deleteCustomerId.customerId.toString();
        const customer: any = customers.split(',');
        const data: any = customer.map(async (id: any) => {
            const dataId = await this.customerService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose customer for delete',
                };
                return response.status(400).send(errorResponse);
            } else {
                dataId.deleteFlag = 1;
                return await this.customerService.create(dataId);
            }
        });
        const deleteCustomer = await Promise.all(data);
        if (deleteCustomer) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted customer',
            };
            return response.status(200).send(successResponse);
        }
    }

    // Customer Details Excel Document Download
    /**
     * @api {get} /api/customer/customer-excel-list Customer Excel
     * @apiGroup Customer
     * @apiParam (Request body) {String} customerId customerId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Customer Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/customer/customer-excel-list
     * @apiErrorExample {json} Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/customer-excel-list')
    public async excelCustomerView(@QueryParam('customerId') customerId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Customer Export sheet');
        const rows = [];
        const customerid = customerId.split(',');
        for (const id of customerid) {
            const dataId = await this.customerService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid customerId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Customer Id', key: 'id', size: 16, width: 15 },
            { header: 'Customer Name', key: 'first_name', size: 16, width: 15 },
            { header: 'User Name', key: 'username', size: 16, width: 24 },
            { header: 'Email Id', key: 'email', size: 16, width: 15 },
            { header: 'Mobile Number', key: 'mobileNumber', size: 16, width: 15 },
            { header: 'Date Of Registration', key: 'createdDate', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const id of customerid) {
            const dataId = await this.customerService.findOne(id);
            if (dataId.lastName === null) {
                dataId.lastName = '';
            }
            rows.push([dataId.id, dataId.firstName + ' ' + dataId.lastName, dataId.username, dataId.email, dataId.mobileNumber, dataId.createdDate]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './CustomerExcel_' + Date.now() + '.xlsx';
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

    // Customer Details Excel Document Download
    /**
     * @api {get} /api/customer/allcustomer-excel-list All Customer Excel
     * @apiGroup Customer
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the All Customer Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/customer/allcustomer-excel-list
     * @apiErrorExample {json} All Customer Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/allcustomer-excel-list')
    public async AllCustomerExcel(@Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Bulk Customer Export');
        const rows = [];
        const dataId = await this.customerService.find({ where: { deleteFlag: 0 } });
        if (dataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid customerId',
            };
            return response.status(400).send(errorResponse);
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Customer Id', key: 'id', size: 16, width: 15 },
            { header: 'Customer Name', key: 'first_name', size: 16, width: 15 },
            { header: 'User Name', key: 'username', size: 16, width: 24 },
            { header: 'Email Id', key: 'email', size: 16, width: 15 },
            { header: 'Mobile Number', key: 'mobileNumber', size: 16, width: 15 },
            { header: 'Date Of Registration', key: 'createdDate', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const customers = await this.customerService.find({ where: { deleteFlag: 0 } });
        for (const customer of customers) {
            if (customer.lastName === null) {
                customer.lastName = '';
            }
            rows.push([customer.id, customer.firstName + ' ' + customer.lastName, customer.username, customer.email, customer.mobileNumber, customer.createdDate]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './CustomerExcel_' + Date.now() + '.xlsx';
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

    // Customer Count API
    /**
     * @api {get} /api/customer/customer-count Customer Count API
     * @apiGroup Customer
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get customer count",
     *      "data":{},
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/customer-count
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/customer-count')
    @Authorized()
    public async customerCounts(@Res() response: any): Promise<any> {
        const customer: any = {};
        const select = [];
        const search = [];
        const WhereConditions = [{
            name: 'deleteFlag',
            op: 'like',
            value: 0,
        }];
        const allCustomerCount = await this.customerService.list(0, 0, search, WhereConditions, 0, 1);
        const whereConditionsActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 1,
            },
            {
                name: 'deleteFlag',
                op: 'like',
                value: 0,
            },
        ];
        const activeCustomerCount = await this.customerService.list(0, 0, search, whereConditionsActive, 0, 1);
        const whereConditionsInActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 0,
            },
            {
                name: 'deleteFlag',
                op: 'like',
                value: 0,
            },
        ];
        const inActiveCustomerCount = await this.customerService.list(0, 0, search, whereConditionsInActive, 0, 1);
        const WhereConditionss = [];
        const allCustomerGroupCount = await this.customerGroupService.list(0, 0, select, WhereConditionss, 1);
        const whereConditionsGroupInActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 0,
            },
        ];
        const whereConditionsGroupActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 1,
            },
        ];
        const activeCustomerGroupCount = await this.customerGroupService.list(0, 0, select, whereConditionsGroupActive, 1);
        const inActiveCustomerGroupCount = await this.customerGroupService.list(0, 0, select, whereConditionsGroupInActive, 1);
        customer.totalCustomer = allCustomerCount;
        customer.activeCustomer = activeCustomerCount;
        customer.inActiveCustomer = inActiveCustomerCount;
        customer.totalCustomerGroup = allCustomerGroupCount;
        customer.activeCustomerGroup = activeCustomerGroupCount;
        customer.inActiveCustomerGroup = inActiveCustomerGroupCount;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the Customer Count',
            data: customer,
        };
        return response.status(200).send(successResponse);
    }
}
