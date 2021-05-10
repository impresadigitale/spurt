"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const mail_services_1 = require("../../../auth/mail.services");
const CustomerRegisterRequest_1 = require("./requests/CustomerRegisterRequest");
const CustomerLoginRequest_1 = require("./requests/CustomerLoginRequest");
const CustomerOauthLoginRequest_1 = require("./requests/CustomerOauthLoginRequest");
const changePasswordRequest_1 = require("./requests/changePasswordRequest");
const Customer_1 = require("../../models/Customer");
const CustomerService_1 = require("../../services/CustomerService");
const LoginLogService_1 = require("../../services/LoginLogService");
const CustomerEditProfileRequest_1 = require("./requests/CustomerEditProfileRequest");
const env_1 = require("../../../env");
const LoginLog_1 = require("../../models/LoginLog");
const CustomerActivity_1 = require("../../models/CustomerActivity");
const EmailTemplateService_1 = require("../../services/EmailTemplateService");
const CustomerActivityService_1 = require("../../services/CustomerActivityService");
const ImageService_1 = require("../../services/ImageService");
const S3Service_1 = require("../../services/S3Service");
const PluginService_1 = require("../../services/PluginService");
const SettingService_1 = require("../../services/SettingService");
let CustomerController = class CustomerController {
    constructor(customerService, s3Service, settingService, imageService, loginLogService, emailTemplateService, pluginService, customerActivityService) {
        this.customerService = customerService;
        this.s3Service = s3Service;
        this.settingService = settingService;
        this.imageService = imageService;
        this.loginLogService = loginLogService;
        this.emailTemplateService = emailTemplateService;
        this.pluginService = pluginService;
        this.customerActivityService = customerActivityService;
    }
    // Customer Register API
    /**
     * @api {post} /api/customer/register register API
     * @apiGroup Store
     * @apiParam (Request body) {String} name Name
     * @apiParam (Request body) {String} lastName lastName
     * @apiParam (Request body) {String} password User Password
     * @apiParam (Request body) {String} confirmPassword Confirm Password
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {Number} phoneNumber User Phone Number (Optional)
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "emailId" : "",
     *      "phoneNumber" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you for registering with us and please check your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/register
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Register Function
    register(registerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newUser = new Customer_1.Customer();
            newUser.firstName = registerParam.name;
            newUser.lastName = registerParam.lastName;
            const partsOfThreeLetters = registerParam.emailId.match(/.{3}/g).concat(registerParam.emailId.substr(1).match(/.{3}/g), registerParam.emailId.substr(2).match(/.{3}/g));
            const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(registerParam.password);
            if (matchEmail === true) {
                const validationMessage = [];
                validationMessage.push('Password must not duplicate any part of the email address');
                const passwordDuplicateErrorResponse = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details!",
                    data: { message: validationMessage },
                };
                return response.status(422).send(passwordDuplicateErrorResponse);
            }
            newUser.password = yield Customer_1.Customer.hashPassword(registerParam.password);
            newUser.email = registerParam.emailId;
            newUser.username = registerParam.emailId;
            newUser.mobileNumber = registerParam.phoneNumber;
            newUser.isActive = 1;
            newUser.ip = (request.headers['x-forwarded-for'] ||
                request.connection.remoteAddress ||
                request.socket.remoteAddress ||
                request.connection.socket.remoteAddress).split(',')[0];
            const resultUser = yield this.customerService.findOne({ where: { email: registerParam.emailId, deleteFlag: 0 } });
            if (resultUser) {
                const successResponse = {
                    status: 1,
                    message: 'You already registered please login.',
                };
                return response.status(400).send(successResponse);
            }
            if (registerParam.password === registerParam.confirmPassword) {
                const resultData = yield this.customerService.create(newUser);
                const emailContent = yield this.emailTemplateService.findOne(1);
                const message = emailContent.content.replace('{name}', resultData.firstName);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const logo = yield this.settingService.findOne();
                const sendMailRes = mail_services_1.MAILService.registerMail(logo, message, resultData.email, emailContent.subject, redirectUrl);
                if (sendMailRes) {
                    const successResponse = {
                        status: 1,
                        message: 'Thank you for registering with us. Kindly check your email inbox for further details. ',
                        data: class_transformer_1.classToPlain(resultData),
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Registration successful, but unable to send email. ',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            const errorPasswordResponse = {
                status: 0,
                message: 'A mismatch between password and confirm password. ',
            };
            return response.status(400).send(errorPasswordResponse);
        });
    }
    // Forgot Password API
    /**
     * @api {post} /api/customer/forgot-password Forgot Password API
     * @apiGroup Store
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParamExample {json} Input
     * {
     *      "emailId" : ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you,Your password send to your mail id please check your email.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/forgot-password
     * @apiErrorExample {json} Forgot Password error
     * HTTP/1.1 500 Internal Server Error
     */
    // Forgot Password Function
    forgotPassword(forgotparam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({ where: { email: forgotparam.emailId, deleteFlag: 0 } });
            if (!resultData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Email Id',
                };
                return response.status(400).send(errorResponse);
            }
            const randomize = require('randomatic');
            const tempPassword = randomize('0', 5).toString();
            resultData.password = yield Customer_1.Customer.hashPassword(tempPassword);
            const updateUserData = yield this.customerService.update(resultData.id, resultData);
            const emailContent = yield this.emailTemplateService.findOne(2);
            const logo = yield this.settingService.findOne();
            const message = emailContent.content.replace('{name}', updateUserData.username).replace('{xxxxxx}', tempPassword);
            emailContent.content = message;
            const redirectUrl = env_1.env.storeRedirectUrl;
            const sendMailRes = mail_services_1.MAILService.passwordForgotMail(logo, message, updateUserData.email, emailContent.subject, redirectUrl);
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Your password has been sent to your email inbox.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Error in sending email, Invalid email.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Login API
    /**
     * @api {post} /api/customer/login login API
     * @apiGroup Store
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {String} password User Password
     * @apiParam (Request body) {String} type  send as normal | facebook | gmail
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "password" : "",
     *      "type" : "",
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
     * @apiSampleRequest /api/customer/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    login(loginParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (loginParam.type === 'normal') {
                const resultData = yield this.customerService.findOne({
                    select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive'],
                    where: { email: loginParam.emailId, deleteFlag: 0 },
                });
                if (!resultData) {
                    const errorUserNameResponse = {
                        status: 0,
                        message: 'Invalid EmailId',
                    };
                    return response.status(400).send(errorUserNameResponse);
                }
                if (resultData.isActive === 0) {
                    const errorUserInActiveResponse = {
                        status: 0,
                        message: 'InActive Customer.',
                    };
                    return response.status(400).send(errorUserInActiveResponse);
                }
                if (yield Customer_1.Customer.comparePassword(resultData, loginParam.password)) {
                    // create a token
                    const token = jsonwebtoken_1.default.sign({ id: resultData.id }, '123##$$)(***&');
                    const customerActivity = new CustomerActivity_1.CustomerActivity();
                    customerActivity.customerId = resultData.id;
                    customerActivity.activityId = 1;
                    customerActivity.description = 'loggedIn';
                    yield this.customerActivityService.create(customerActivity);
                    const loginLog = new LoginLog_1.LoginLog();
                    loginLog.customerId = resultData.id;
                    loginLog.emailId = resultData.email;
                    loginLog.firstName = resultData.firstName;
                    loginLog.ipAddress = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const savedloginLog = yield this.loginLogService.create(loginLog);
                    const customer = yield this.customerService.findOne({ where: { email: loginParam.emailId, deleteFlag: 0 } });
                    customer.lastLogin = savedloginLog.createdDate;
                    yield this.customerService.create(customer);
                    const successResponse = {
                        status: 1,
                        message: 'Loggedin successfully',
                        data: {
                            token,
                            user: class_transformer_1.classToPlain(resultData),
                        },
                    };
                    return response.status(200).send(successResponse);
                }
                const errorResponse = {
                    status: 0,
                    message: 'Invalid password',
                };
                return response.status(400).send(errorResponse);
            }
            if (loginParam.type === 'gmail') {
                const plugin = yield this.pluginService.findOne({ where: { pluginName: loginParam.type, pluginStatus: 1 } });
                if (plugin) {
                    const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                    const route = env_1.env.baseUrl + pluginInfo.defaultRoute;
                    const successResponse = {
                        status: 1,
                        message: 'Redirect to this url.',
                        data: {
                            returnPath: route,
                            clientId: pluginInfo.clientId,
                        },
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const successResponse = {
                        status: 0,
                        message: 'You are not install this plugin or problem in installation',
                    };
                    return response.status(400).send(successResponse);
                }
            }
            else if (loginParam.type === 'facebook') {
                const plugin = yield this.pluginService.findOne({ where: { pluginName: loginParam.type, pluginStatus: 1 } });
                if (plugin) {
                    const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
                    const route = env_1.env.baseUrl + pluginInfo.defaultRoute;
                    const successResponse = {
                        status: 1,
                        message: 'Redirect to this url.',
                        data: {
                            returnPath: route,
                            AppId: pluginInfo.AppId,
                            AppSecretKey: pluginInfo.AppSecretKey,
                        },
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const successResponse = {
                        status: 0,
                        message: 'You are not install this plugin or problem in installation',
                    };
                    return response.status(400).send(successResponse);
                }
            }
        });
    }
    // Change Password API
    /**
     * @api {post} /api/customer/change-password Change Password API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} oldPassword Old Password
     * @apiParam (Request body) {String} newPassword New Password
     * @apiParamExample {json} Input
     *      "oldPassword" : "",
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your password changed successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/change-password
     * @apiErrorExample {json} Change Password error
     * HTTP/1.1 500 Internal Server Error
     */
    // Change Password Function
    changePassword(changePasswordParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({ where: { id: request.user.id } });
            if (yield Customer_1.Customer.comparePassword(resultData, changePasswordParam.oldPassword)) {
                const val = yield Customer_1.Customer.comparePassword(resultData, changePasswordParam.newPassword);
                if (val) {
                    const errResponse = {
                        status: 0,
                        message: 'you are given a same password, please try different one',
                    };
                    return response.status(400).send(errResponse);
                }
                const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
                if (!changePasswordParam.newPassword.match(pattern)) {
                    const passwordValidatingMessage = [];
                    passwordValidatingMessage.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
                    const errResponse = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
                        data: { message: passwordValidatingMessage },
                    };
                    return response.status(422).send(errResponse);
                }
                const partsOfThreeLetters = resultData.email.match(/.{3}/g).concat(resultData.email.substr(1).match(/.{3}/g), resultData.email.substr(2).match(/.{3}/g));
                const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(changePasswordParam.newPassword);
                if (matchEmail === true) {
                    const validationMessage = [];
                    validationMessage.push('Password must not duplicate any part of the email address');
                    const passwordDuplicateErrorResponse = {
                        status: 0,
                        message: "You have an error in your request's body. Check 'errors' field for more details!",
                        data: { message: validationMessage },
                    };
                    return response.status(422).send(passwordDuplicateErrorResponse);
                }
                resultData.password = yield Customer_1.Customer.hashPassword(changePasswordParam.newPassword);
                const updateUserData = yield this.customerService.update(resultData.id, resultData);
                if (updateUserData) {
                    const successResponse = {
                        status: 1,
                        message: 'Your password changed successfully',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            const errorResponse = {
                status: 0,
                message: 'Your old password is wrong',
            };
            return response.status(400).send(errorResponse);
        });
    }
    // Get Customer Profile API
    /**
     * @api {get} /api/customer/get-profile Get Profile API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Get the Profile..!",
     *      "status": "1"
     *       "data":{}
     * }
     * @apiSampleRequest /api/customer/get-profile
     * @apiErrorExample {json} Get Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    // Get Profile Function
    getProfile(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({ where: { id: request.user.id } });
            const successResponse = {
                status: 1,
                message: 'Successfully Get the Profile.',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Customer Edit Profile API
    /**
     * @api {post} /api/customer/edit-profile Edit Profile API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName First Name
     * @apiParam (Request body) {String} lastName Last Name
     * @apiParam (Request body) {String} password password
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {Number} phoneNumber User Phone Number (Optional)
     * @apiParam (Request body) {String} image Customer Image
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "password" "",
     *      "emailId" : "",
     *      "phoneNumber" : "",
     *      "image": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated your profile.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/edit-profile
     * @apiErrorExample {json} Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Profile Edit Function
    editProfile(customerEditProfileRequest, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const image = customerEditProfileRequest.image;
            let name;
            const resultData = yield this.customerService.findOne({
                select: ['id', 'firstName', 'lastName', 'email', 'mobileNumber', 'address', 'zoneId', 'countryId', 'pincode', 'avatar', 'avatarPath', 'password'],
                where: { id: request.user.id },
            });
            if (image) {
                const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const type = image.split(';')[0].split('/')[1];
                name = 'Img_' + Date.now() + '.' + type;
                const path = 'customer/';
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                resultData.avatar = name;
                resultData.avatarPath = path;
            }
            resultData.firstName = customerEditProfileRequest.firstName;
            resultData.lastName = customerEditProfileRequest.lastName;
            resultData.email = customerEditProfileRequest.emailId;
            resultData.mobileNumber = customerEditProfileRequest.phoneNumber;
            resultData.username = customerEditProfileRequest.emailId;
            const updateuserData = yield this.customerService.update(resultData.id, resultData);
            const successResponse = {
                status: 1,
                message: 'Your profile Update Successfully.',
                data: class_transformer_1.classToPlain(updateuserData),
            };
            return response.status(200).send(successResponse);
        });
    }
    // logList API
    /**
     * @api {get} /api/customer/login-log-list Login Log list API
     * @apiGroup Store
     * @apiParam (Request body) {Number} limit limit
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get login log list",
     *      "data":{
     *      "id"
     *      "customerId"
     *      "emailId"
     *      "firstName"
     *      "ipAddress"
     *      "createdDate"
     *      }
     * }
     * @apiSampleRequest /api/customer/login-log-list
     * @apiErrorExample {json} Front error
     * HTTP/1.1 500 Internal Server Error
     */
    LogList(limit, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const loginLogList = yield this.loginLogService.logList(limit);
            const promise = loginLogList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const moment = require('moment');
                const createdDate = moment.utc(result.createdDate).local().format('YYYY-MM-DD');
                const temp = result;
                temp.createdDate = createdDate;
                return temp;
            }));
            const finalResult = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get login Log list',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Oauth Login API
    /**
     * @api {post} /api/customer/Oauth-login Oauth login API
     * @apiGroup Store
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {String} source source
     * @apiParam (Request body) {String} oauthData oauthData
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "source" : "",
     *      "oauthData" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "data": "{
     *         "token":''
     *         "password":''
     *      }",
     *      "message": "Successfully login",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer/Oauth-login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    OauthLogin(loginParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({
                where: { email: loginParam.emailId },
            });
            if (!resultData) {
                const newUser = new Customer_1.Customer();
                const tempPassword = Math.random().toString().substr(2, 5);
                newUser.password = yield Customer_1.Customer.hashPassword(tempPassword);
                newUser.email = loginParam.emailId;
                newUser.username = loginParam.emailId;
                newUser.isActive = 1;
                newUser.ip = (request.headers['x-forwarded-for'] ||
                    request.connection.remoteAddress ||
                    request.socket.remoteAddress ||
                    request.connection.socket.remoteAddress).split(',')[0];
                const newCustomer = yield this.customerService.create(newUser);
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: newCustomer.id }, '123##$$)(***&', {
                    expiresIn: 86400,
                });
                const emailContent = yield this.emailTemplateService.findOne(1);
                const message = emailContent.content.replace('{name}', newCustomer.username);
                const redirectUrl = env_1.env.storeRedirectUrl;
                const logo = yield this.settingService.findOne();
                const sendMailRes = mail_services_1.MAILService.registerMail(logo, message, newCustomer.email, emailContent.subject, redirectUrl);
                if (sendMailRes) {
                    const successResponse = {
                        status: 1,
                        message: 'Loggedin successfully. ',
                        data: {
                            token,
                            user: class_transformer_1.classToPlain(resultData),
                            password: tempPassword,
                        },
                    };
                    return response.status(200).send(successResponse);
                }
            }
            else {
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: resultData.id }, '123##$$)(***&', {
                    expiresIn: 86400,
                });
                const successResponse = {
                    status: 1,
                    message: 'Loggedin successfully.',
                    data: {
                        token,
                        user: class_transformer_1.classToPlain(resultData),
                    },
                };
                return response.status(200).send(successResponse);
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/register'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerRegisterRequest_1.CustomerRegisterRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "register", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/forgot-password'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/login'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerLoginRequest_1.CustomerLogin, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "login", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/change-password'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [changePasswordRequest_1.ChangePassword, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "changePassword", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/get-profile'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "getProfile", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/edit-profile'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerEditProfileRequest_1.CustomerEditProfileRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "editProfile", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/login-log-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "LogList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/Oauth-login'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CustomerOauthLoginRequest_1.CustomerOauthLogin, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "OauthLogin", null);
CustomerController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/customer'),
    tslib_1.__metadata("design:paramtypes", [CustomerService_1.CustomerService, S3Service_1.S3Service, SettingService_1.SettingService,
        ImageService_1.ImageService, LoginLogService_1.LoginLogService, EmailTemplateService_1.EmailTemplateService, PluginService_1.PluginService, CustomerActivityService_1.CustomerActivityService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=CustomerController.js.map