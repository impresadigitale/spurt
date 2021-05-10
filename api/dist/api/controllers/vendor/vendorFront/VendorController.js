"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const mail_services_1 = require("../../../../auth/mail.services");
const VendorRegistrationRequest_1 = require("./requests/VendorRegistrationRequest");
const VendorForgotPasswordRequest_1 = require("./requests/VendorForgotPasswordRequest");
const Customer_1 = require("../../../models/Customer");
const Vendor_1 = require("../../../models/Vendor");
const LoginLog_1 = require("../../../models/LoginLog");
const CustomerService_1 = require("../../../services/CustomerService");
const VendorService_1 = require("../../../services/VendorService");
const UserService_1 = require("../../../services/UserService");
const VendorCategoryService_1 = require("../../../services/VendorCategoryService");
const LoginLogService_1 = require("../../../services/LoginLogService");
const EmailTemplateService_1 = require("../../../services/EmailTemplateService");
const CategoryService_1 = require("../../../services/CategoryService");
const CountryService_1 = require("../../../services/CountryService");
const VendorLoginRequest_1 = require("./requests/VendorLoginRequest");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const class_validator_1 = require("class-validator");
const S3Service_1 = require("../../../services/S3Service");
const ImageService_1 = require("../../../services/ImageService");
const env_1 = require("../../../../env");
const UpdateVendorRequest_1 = require("./requests/UpdateVendorRequest ");
const validator = new class_validator_1.Validator();
const VendorOrderService_1 = require("../../../services/VendorOrderService");
const VendorProductService_1 = require("../../../services/VendorProductService");
const OrderStatusService_1 = require("../../../services/OrderStatusService");
const SettingService_1 = require("../../../services/SettingService");
const CurrencyService_1 = require("../../../services/CurrencyService");
const CustomerDocument_1 = require("../../../models/CustomerDocument");
const CustomerDocumentService_1 = require("../../../services/CustomerDocumentService");
let VendorController = class VendorController {
    constructor(customerService, vendorService, emailTemplateService, userService, vendorCategoryService, categoryService, s3Service, imageService, countryService, loginLogService, vendorOrdersService, vendorProductService, settingService, currencyService, orderStatusService, customerDocumentService) {
        this.customerService = customerService;
        this.vendorService = vendorService;
        this.emailTemplateService = emailTemplateService;
        this.userService = userService;
        this.vendorCategoryService = vendorCategoryService;
        this.categoryService = categoryService;
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.countryService = countryService;
        this.loginLogService = loginLogService;
        this.vendorOrdersService = vendorOrdersService;
        this.vendorProductService = vendorProductService;
        this.settingService = settingService;
        this.currencyService = currencyService;
        this.orderStatusService = orderStatusService;
        this.customerDocumentService = customerDocumentService;
    }
    // Customer Register API
    /**
     * @api {post} /api/vendor/register register API
     * @apiGroup Vendor
     * @apiParam (Request body) {String} firstName first Name
     * @apiParam (Request body) {String} lastName last Name
     * @apiParam (Request body) {String} contactPersonName contactPersonName
     * @apiParam (Request body) {String} password Vendor Password
     * @apiParam (Request body) {String} confirmPassword Confirm Password
     * @apiParam (Request body) {String} emailId Vendor Email Id
     * @apiParam (Request body) {Number} phoneNumber User Phone Number (Optional)
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "contactPersonName" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "emailId" : "",
     *      "phoneNumber" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you for registering with us for selling your product and please check your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/register
     * @apiErrorExample {json} Vendor Register error
     * HTTP/1.1 500 Internal Server Error
     */
    // Vendor Register Function
    register(registerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (registerParam.phoneNumber) {
                if (!validator.maxLength(registerParam.phoneNumber, 15) ||
                    !validator.isNumberString(registerParam.phoneNumber)) {
                    return response.status(422).send({
                        message: 'Please provide valid mobile number',
                        status: 0,
                    });
                }
            }
            const logo = yield this.settingService.findOne();
            const resultUser = yield this.customerService.findOne({ where: { email: registerParam.emailId, deleteFlag: 0 } });
            if (resultUser) {
                const vendor = yield this.vendorService.findOne({ where: { customerId: resultUser.id } });
                if (vendor) {
                    const successResponse = {
                        status: 1,
                        message: 'You already registered please login.',
                    };
                    return response.status(400).send(successResponse);
                }
                else {
                    if (registerParam.password === registerParam.confirmPassword) {
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
                        const customer = yield this.customerService.findOne({ where: { email: registerParam.emailId, deleteFlag: 0 } });
                        customer.firstName = registerParam.firstName;
                        customer.lastName = registerParam.lastName;
                        customer.password = yield Customer_1.Customer.hashPassword(registerParam.password);
                        customer.username = registerParam.emailId;
                        customer.mobileNumber = registerParam.phoneNumber;
                        customer.isActive = 1;
                        customer.deleteFlag = 0;
                        const customerUpdated = yield this.customerService.create(customer);
                        if (customerUpdated) {
                            const newVendor = new Vendor_1.Vendor();
                            const vendorName = registerParam.firstName;
                            const data = vendorName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                            const getCustomerSlug = yield this.vendorService.slugData(vendorName);
                            if (getCustomerSlug.length === 0) {
                                newVendor.vendorSlugName = data;
                            }
                            else if (getCustomerSlug.length === 1 && (data === getCustomerSlug[0].vendorSlugName)) {
                                newVendor.vendorSlugName = data + '-' + 1;
                            }
                            else {
                                const slugVal = getCustomerSlug[getCustomerSlug.length - 1];
                                const val = slugVal.vendorSlugName;
                                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                                const slugNumber = parseInt(getSlugInt, 0);
                                newVendor.vendorSlugName = data + '-' + (slugNumber + 1);
                            }
                            newVendor.contactPersonName = registerParam.contactPersonName;
                            newVendor.customerId = customer.id;
                            newVendor.approvalFlag = 0;
                            const vendors = yield this.vendorService.create(newVendor);
                            const stringPad = String(vendors.vendorId).padStart(4, '0');
                            newVendor.vendorPrefixId = 'Ven'.concat(stringPad);
                            yield this.vendorService.update(vendors.vendorId, newVendor);
                        }
                        const emailContentVendor = yield this.emailTemplateService.findOne(11);
                        const emailContentAdmin = yield this.emailTemplateService.findOne(12);
                        const message = emailContentVendor.content.replace('{name}', resultUser.firstName);
                        const adminMessage = emailContentAdmin.content.replace('{vendorName}', resultUser.firstName);
                        const adminId = [];
                        const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                        for (const user of adminUser) {
                            const val = user.username;
                            adminId.push(val);
                        }
                        const redirectUrl = env_1.env.storeRedirectUrl;
                        const adminRedirectUrl = env_1.env.adminRedirectUrl;
                        mail_services_1.MAILService.registerMail(logo, adminMessage, adminId, emailContentAdmin.subject, adminRedirectUrl);
                        const sendMailRes = mail_services_1.MAILService.registerMail(logo, message, resultUser.email, emailContentVendor.subject, redirectUrl);
                        if (sendMailRes) {
                            const successResponse = {
                                status: 1,
                                message: 'Thank you for expressing your interest and registering with Spurtcommerce for selling your products. Kindly wait for admin approval',
                                data: class_transformer_1.classToPlain(resultUser),
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
                }
            }
            else {
                if (registerParam.password === registerParam.confirmPassword) {
                    const newUser = new Customer_1.Customer();
                    newUser.firstName = registerParam.firstName;
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
                    newUser.deleteFlag = 0;
                    newUser.ip = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const resultData = yield this.customerService.create(newUser);
                    const vendor = new Vendor_1.Vendor();
                    const vendorName = registerParam.firstName;
                    const data = vendorName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    const getCustomerSlug = yield this.vendorService.slugData(vendorName);
                    if (getCustomerSlug.length === 0) {
                        vendor.vendorSlugName = data;
                    }
                    else if (getCustomerSlug.length === 1 && (data === getCustomerSlug[0].vendorSlugName)) {
                        vendor.vendorSlugName = data + '-' + 1;
                    }
                    else {
                        const slugVal = getCustomerSlug[getCustomerSlug.length - 1];
                        const val = slugVal.vendorSlugName;
                        const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                        const slugNumber = parseInt(getSlugInt, 0);
                        vendor.vendorSlugName = data + '-' + (slugNumber + 1);
                    }
                    vendor.contactPersonName = registerParam.contactPersonName;
                    vendor.customerId = resultData.id;
                    vendor.approvalFlag = 0;
                    const vendors = yield this.vendorService.create(vendor);
                    const stringPad = String(vendors.vendorId).padStart(4, '0');
                    vendor.vendorPrefixId = 'Ven'.concat(stringPad);
                    yield this.vendorService.update(vendors.vendorId, vendor);
                    const emailContentVendor = yield this.emailTemplateService.findOne(11);
                    const emailContentAdmin = yield this.emailTemplateService.findOne(12);
                    const message = emailContentVendor.content.replace('{name}', resultData.firstName);
                    const adminMessage = emailContentAdmin.content.replace('{vendorName}', resultData.firstName);
                    const adminId = [];
                    const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
                    for (const user of adminUser) {
                        const val = user.username;
                        adminId.push(val);
                    }
                    const redirectUrl = env_1.env.storeRedirectUrl;
                    const adminRedirectUrl = env_1.env.adminRedirectUrl;
                    mail_services_1.MAILService.registerMail(logo, adminMessage, adminId, emailContentVendor.subject, adminRedirectUrl);
                    const sendMailRes = mail_services_1.MAILService.registerMail(logo, message, resultData.email, emailContentVendor.subject, redirectUrl);
                    if (sendMailRes) {
                        const successResponse = {
                            status: 1,
                            message: 'Thank you for expressing your interest and registering with Spurtcommerce for selling your products.Kindly wait for admin approval',
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
                else {
                    const errorPasswordResponse = {
                        status: 0,
                        message: 'A mismatch between password and confirm password. ',
                    };
                    return response.status(400).send(errorPasswordResponse);
                }
            }
        });
    }
    // Login API
    /**
     * @api {post} /api/vendor/login login API
     * @apiGroup Vendor
     * @apiParam (Request body) {String} emailId User Email Id
     * @apiParam (Request body) {String} password User Password
     * @apiParamExample {json} Input
     * {
     *      "emailId" : "",
     *      "password" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "data": "{
     *         "token":''
     *      }",
     *      "message": "Successfully loggedIn",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    // Login Function
    login(loginParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resultData = yield this.customerService.findOne({
                select: ['id', 'firstName', 'email', 'mobileNumber', 'password', 'avatar', 'avatarPath', 'isActive'],
                where: { email: loginParam.emailId, deleteFlag: 0 },
            });
            if (resultData === undefined) {
                const notFountResponse = {
                    status: 0,
                    message: 'Invalid EmailId',
                };
                return response.status(400).send(notFountResponse);
            }
            const findVendor = yield this.vendorService.findOne({
                where: { customerId: resultData.id, approvalFlag: 1 },
            });
            if (findVendor === undefined) {
                const errorUserNameResponse = {
                    status: 0,
                    message: 'Invalid EmailId or Not Approved',
                };
                return response.status(400).send(errorUserNameResponse);
            }
            resultData.vendorId = findVendor.vendorId;
            resultData.vendorPrefixId = findVendor.vendorPrefixId.replace('#', '');
            const setting = yield this.settingService.findOne();
            if (setting) {
                const currencyVal = yield this.currencyService.findOne(setting.storeCurrencyId);
                if (currencyVal) {
                    resultData.currencyCode = currencyVal.code;
                    resultData.currencySymbolLeft = currencyVal.symbolLeft;
                    resultData.currencySymbolRight = currencyVal.symbolRight;
                }
            }
            if (resultData.isActive === 0) {
                const errorUserInActiveResponse = {
                    status: 0,
                    message: 'InActive Vendor.',
                };
                return response.status(400).send(errorUserInActiveResponse);
            }
            if (yield Customer_1.Customer.comparePassword(resultData, loginParam.password)) {
                // create a token
                const token = jsonwebtoken_1.default.sign({ id: findVendor.vendorId }, '123##$$)(***&');
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
        });
    }
    // Get vendor profile API
    /**
     * @api {get} /api/vendor/vendor-profile Vendor Get Profile  API
     * @apiGroup  Vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully got vendor Details",
     * "data":{
     * "vendorId" : "",
     * "firstName" : "",
     * "lastName" : "",
     * "email" : "",
     * "mobileNumber" : "",
     * "avatar" : "",
     * "avatarPath" : "",
     * "commission" : "",
     * "status" : "",
     * }
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor/vendor-profile
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorDetails(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                select: ['vendorId', 'customerId', 'companyName', 'companyLogo', 'companyLogoPath', 'companyCoverImage', 'companyCoverImagePath', 'companyMobileNumber', 'companyEmailId', 'companyWebsite', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId', 'pincode', 'companyGstNumber', 'companyPanNumber', 'paymentInformation', 'commission'],
                where: { vendorId: request.user.vendorId },
            });
            vendor.customerDetail = yield this.customerService.findOne({
                select: ['firstName', 'lastName', 'avatar', 'avatarPath', 'email', 'mobileNumber', 'isActive'],
                where: { id: vendor.customerId },
            });
            const country = yield this.countryService.findOne({
                select: ['name'],
                where: { countryId: vendor.companyCountryId },
            });
            if (country) {
                vendor.countryName = country.name;
            }
            vendor.vendorCategories = yield this.vendorCategoryService.findAll({
                select: ['vendorCategoryId', 'categoryId', 'vendorId'],
                where: { vendorId: vendor.vendorId },
            }).then((val) => {
                const category = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const categoryNames = yield this.categoryService.findOne({ categoryId: value.categoryId });
                    const temp = value;
                    if (categoryNames !== undefined) {
                        temp.categoryName = categoryNames.name;
                    }
                    else {
                        temp.categoryName = '';
                    }
                    return temp;
                }));
                const results = Promise.all(category);
                return results;
            });
            const successResponse = {
                status: 1,
                message: 'successfully got Vendor profile. ',
                data: vendor,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Category List API
    /**
     * @api {get} /api/vendor/vendor-category-list Vendor Category List API
     * @apiGroup  Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor category list",
     *      "data":{
     *       "vendorId" : "",
     *       "vendorCategoryId" : "",
     *       "categoryId" : "",
     *       "commission" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/vendor-category-list
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorCategoryList(limit, offset, keyword, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorId = request.user.vendorId;
            const vendorCategoryList = yield this.vendorCategoryService.queryCategoryList(limit, offset, vendorId, keyword, count);
            if (vendorCategoryList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the vendor category list.',
                    data: vendorCategoryList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to list vendor category list',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Change Password API
    /**
     * @api {put} /api/vendor/change-password Change Password API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} newPassword User newPassword
     * @apiParamExample {json} Input
     * {
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Password changed",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/change-password
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */
    changePassword(newPassword, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId: request.user.vendorId,
                },
            });
            if (!vendor) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid vendorId',
                };
                return response.status(400).send(errResponse);
            }
            const resultData = yield this.customerService.findOne({ where: { id: vendor.customerId } });
            const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,}$/;
            if (!newPassword.match(pattern)) {
                const passwordValidatingMessage = [];
                passwordValidatingMessage.push('Password must contain at least one number or one uppercase and lowercase letter, and at least 8 or more characters');
                const errResponse = {
                    status: 0,
                    message: "You have an error in your request's body. Check 'errors' field for more details!",
                    data: { message: passwordValidatingMessage },
                };
                return response.status(422).send(errResponse);
            }
            const partsOfThreeLetters = resultData.email.match(/.{3}/g).concat(resultData.email.substr(1).match(/.{3}/g), resultData.email.substr(2).match(/.{3}/g));
            const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(newPassword);
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
            resultData.password = yield Customer_1.Customer.hashPassword(newPassword);
            const updateUserData = yield this.customerService.update(resultData.id, resultData);
            if (updateUserData) {
                const successResponse = {
                    status: 1,
                    message: 'Your password changed successfully',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Forgot Password API
    /**
     * @api {post} /api/vendor/forgot-password Forgot Password API
     * @apiGroup Vendor
     * @apiParam (Request body) {String} email User email
     * @apiParamExample {json} Input
     * {
     *      "email" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you. Your password send to your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/forgot-password
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */
    forgotPassword(forgotPasswordParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.customerService.findOne({
                where: {
                    email: forgotPasswordParam.email, deleteFlag: 0,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid emailId',
                };
                return response.status(400).send(errorResponse);
            }
            const findVendor = yield this.vendorService.findOne({
                where: { customerId: user.id },
            });
            if (findVendor === undefined) {
                const errorUserNameResponse = {
                    status: 0,
                    message: 'Invalid EmailId',
                };
                return response.status(400).send(errorUserNameResponse);
            }
            const tempPassword = Math.random().toString().substr(2, 5);
            const password = yield Customer_1.Customer.hashPassword(tempPassword);
            user.password = password;
            yield this.customerService.create(user);
            const emailContent = yield this.emailTemplateService.findOne(2);
            const logo = yield this.settingService.findOne();
            const message = emailContent.content.replace('{name}', user.firstName).replace('{xxxxxx}', tempPassword);
            const redirectUrl = env_1.env.vendorRedirectUrl;
            const sendMailRes = mail_services_1.MAILService.passwordForgotMail(logo, message, user.email, emailContent.subject, redirectUrl);
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
                    message: 'error in sending email.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Edit Vendor API
    /**
     * @api {put} /api/vendor/edit-vendor/:customerId Edit Vendor API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName First Name
     * @apiParam (Request body) {String} lastName Last Name
     * @apiParam (Request body) {String} avatar Avatar
     * @apiParam (Request body) {String} designation Designation
     * @apiParam (Request body) {String} email Email
     * @apiParam (Request body) {Number} mobileNumber Mobile Number
     * @apiParam (Request body) {String} companyName Company Name
     * @apiParam (Request body) {String} companyLogo Company Logo
     * @apiParam (Request body) {String} companyCoverImage CompanyCoverImage
     * @apiParam (Request body) {String} companyAddress1 Company Address1
     * @apiParam (Request body) {String} companyAddress2 Company Address2
     * @apiParam (Request body) {String} companyCity Company City
     * @apiParam (Request body) {String} companyState Company State
     * @apiParam (Request body) {Number} companyCountryId Company Country Id
     * @apiParam (Request body) {String} pincode Pincode
     * @apiParam (Request body) {Number} companyMobileNumber Company Mobile Number
     * @apiParam (Request body) {String} companyEmailId Company Email Id
     * @apiParam (Request body) {String} companyWebsite Company Website
     * @apiParam (Request body) {String} companyGstNumber Company Gst Number
     * @apiParam (Request body) {String} companyPanNumber Company Pan Number
     * @apiParam (Request body) {String} paymentInformation paymentInformation
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "avatar" : "",
     *      "designation" : "",
     *      "email" : "",
     *      "mobileNumber" : "",
     *      "companyName" : "",
     *      "companyLogo" : "",
     *      "companyCoverImage" : "",
     *      "companyAddress1" : "",
     *      "companyAddress2" : "",
     *      "companyCity" : "",
     *      "companyState" : "",
     *      "companyCountryId" : "",
     *      "pincode" : "",
     *      "companyMobileNumber" : "",
     *      "companyEmailId" : "",
     *      "companyWebsite" : "",
     *      "companyGstNumber" : "",
     *      "companyPanNumber" : "",
     *      "paymentInformation" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Edited successfully"
     *      "data" : "{}"
     * }
     * @apiSampleRequest /api/vendor/edit-vendor/:customerId
     * @apiErrorExample {json} Edit Vendor API error
     * HTTP/1.1 500 Internal Server Error
     */
    update(updateParam, customerId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    customerId,
                },
            });
            const companyLogo = updateParam.companyLogo;
            if (companyLogo) {
                const type = companyLogo.split(';')[0].split('/')[1];
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'logo/';
                const base64Data = new Buffer(companyLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                vendor.companyLogo = name;
                vendor.companyLogoPath = path;
            }
            const companyCoverImage = updateParam.companyCoverImage;
            if (companyCoverImage) {
                const covertype = companyCoverImage.split(';')[0].split('/')[1];
                const imgName = 'Img_' + Date.now() + '.' + covertype;
                const imgPath = 'logo/';
                const coverbase64Data = new Buffer(companyCoverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((imgPath + imgName), coverbase64Data, covertype);
                }
                else {
                    yield this.imageService.imageUpload((imgPath + imgName), coverbase64Data);
                }
                vendor.companyCoverImage = imgName;
                vendor.companyCoverImagePath = imgPath;
            }
            vendor.companyName = updateParam.companyName;
            vendor.companyAddress1 = updateParam.companyAddress1;
            vendor.companyAddress2 = updateParam.companyAddress2;
            vendor.companyCity = updateParam.companyCity;
            vendor.companyState = updateParam.companyState;
            vendor.designation = updateParam.designation;
            vendor.companyCountryId = updateParam.companyCountryId;
            vendor.pincode = updateParam.pincode;
            vendor.companyMobileNumber = updateParam.companyMobileNumber ? updateParam.companyMobileNumber : 0;
            vendor.companyEmailId = updateParam.companyEmailId;
            vendor.companyWebsite = updateParam.companyWebsite;
            vendor.companyGstNumber = updateParam.companyGstNumber;
            vendor.companyPanNumber = updateParam.companyPanNumber;
            vendor.paymentInformation = updateParam.paymentInformation;
            yield this.vendorService.update(vendor.vendorId, vendor);
            const customer = yield this.customerService.findOne({
                where: {
                    id: vendor.customerId,
                },
            });
            const avatar = updateParam.avatar;
            if (avatar) {
                const type = avatar.split(';')[0].split('/')[1];
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'customer/';
                const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
                }
                customer.avatar = name;
                customer.avatarPath = path;
            }
            customer.firstName = updateParam.firstName;
            customer.lastName = updateParam.lastName;
            customer.email = updateParam.email;
            customer.mobileNumber = updateParam.mobileNumber;
            const editCustomer = yield this.customerService.update(customer.customerId, customer);
            if (editCustomer) {
                const successResponse = {
                    status: 1,
                    message: 'Updated successfully',
                    data: customer,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Dashboard Counts
    /**
     * @api {get} /api/vendor/total-Dashboard-counts Total Dashboard Counts
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got total dashboard counts",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor/total-Dashboard-counts
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    totalProductCounts(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereCondition = [];
            const relations = [];
            relations.push({
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            }, {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            }, {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            });
            whereCondition.push({
                name: 'vendor.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'product.isActive',
                op: 'and',
                value: 1,
            });
            const vendorActiveProductListCount = yield this.vendorProductService.listByQueryBuilder(0, 0, [], whereCondition, [], relations, [], [], true, true);
            const inactiveWhereCondition = [];
            inactiveWhereCondition.push({
                name: 'vendor.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'product.isActive',
                op: 'and',
                value: 0,
            });
            const vendorInactiveProductListCount = yield this.vendorProductService.listByQueryBuilder(0, 0, [], inactiveWhereCondition, [], relations, [], [], true, true);
            const select = [];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'vendorId',
                    op: 'where',
                    value: request.user.vendorId,
                },
            ];
            const totalProductCount = yield this.vendorProductService.list(0, 0, select, relation, WhereConditions, '', 0);
            const orderList = yield this.vendorOrdersService.searchOrderList(request.user.vendorId, '', '', '', '', 0);
            const buyerAndRevenueCount = yield this.vendorOrdersService.getBuyersCount(request.user.vendorId);
            const revenue = yield this.vendorOrdersService.getTotalVendorRevenue(request.user.vendorId);
            let total = 0;
            if (revenue !== undefined) {
                for (const val of revenue) {
                    const commissionPercent = val.commission;
                    let NetAmount;
                    if (val.discountedAmount) {
                        const commissionAmount = val.discountedAmount * (commissionPercent / 100);
                        NetAmount = val.discountedAmount - commissionAmount;
                    }
                    else {
                        const commissionAmount = val.total * (commissionPercent / 100);
                        NetAmount = val.total - commissionAmount;
                    }
                    total += +NetAmount;
                }
            }
            const totalRevenue = total;
            const successResponse = {
                status: 1,
                message: 'Successfully get Total Dashboard count',
                data: {
                    inActiveVendorProductList: vendorInactiveProductListCount,
                    activeProductCount: vendorActiveProductListCount,
                    totalProductCount: totalProductCount.length,
                    totalOrderCount: orderList.length,
                    salesCount: buyerAndRevenueCount.salesCount,
                    revenue: totalRevenue,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    //  order chart API
    /**
     * @api {get} /api/vendor/order-graph  order graph API
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} duration 1-> thisWeek 2-> thisMonth 3-> thisYear
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order statics..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor/order-graph
     * @apiErrorExample {json} order statics error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    topSellingProductList(duration, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['orderStatusId', 'name', 'colorCode', 'isActive'];
            const search = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            const orderStatusList = yield this.orderStatusService.list(0, 0, select, search, WhereConditions, 0);
            const promise = orderStatusList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const order = yield this.vendorOrdersService.findOrderCountBasedStatus(request.user.vendorId, duration, result.orderStatusId);
                const temp = result;
                temp.orderCount = order.orderCount;
                return temp;
            }));
            const orderCount = yield this.vendorOrdersService.findOrderCountBasedDuration(request.user.vendorId, duration);
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get order count..!',
                data: { value, orderCount: orderCount.orderCount },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Upload Vendor Document
    /**
     * @api {post} /api/vendor/upload-customer-document Upload Vendor Document
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {String} customerData File
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully saved imported data..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor/upload-customer-document
     * @apiErrorExample {json} Import Customer Data
     * HTTP/1.1 500 Internal Server Error
     */
    uploadCustomerDocument(file, title, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const mime = require('mime');
            const vendor = yield this.vendorService.findOne({
                vendorId: request.user.vendorId,
            });
            if (!vendor) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid vendorId',
                };
                return response.status(400).send(errResponse);
            }
            const base64Data = new Buffer(file.replace(/^data:([A-Za-z-+\/]+);base64,/, ''), 'base64');
            const mimeType = this.base64MimeType(file);
            const fileType = mime.getExtension(mimeType);
            let uploadPath;
            let fileName;
            if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' || fileType === 'PNG' || fileType === 'JPG' || fileType === 'pdf') {
                uploadPath = 'vendordocument/';
                fileName = 'VendorDocument_' + Date.now() + '.' + fileType;
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.fileUpload((uploadPath + fileName), base64Data, mimeType);
                }
                else {
                    yield this.imageService.fileUpload((uploadPath + fileName), base64Data);
                }
            }
            else {
                return response.status(400).send({ status: 0, message: 'Only allow jpg/jpeg/png/PNG/JPG/pdf format!' });
            }
            const newCustomerData = new CustomerDocument_1.CustomerDocument();
            newCustomerData.customerId = vendor.customerId;
            newCustomerData.title = title;
            newCustomerData.name = fileName;
            newCustomerData.path = 'vendordocument/';
            yield this.customerDocumentService.create(newCustomerData);
            const successResponse = {
                status: 1,
                message: 'Document Uploaded Successfully',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Download Vendor Document API
    /**
     * @api {get} /api/vendor/download-customer-document/:customerDocumentId Download Vendor Document API
     * @apiGroup Vendor
     * @apiParamExample {json} Input
     * {
     *      "customerDocumentId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully download customer document file.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor/download-customer-document/:customerDocumentId
     * @apiErrorExample {json} Download error
     * HTTP/1.1 500 Internal Server Error
     */
    downloadCustomerDocument(customerDocumentId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerDocument = yield this.customerDocumentService.findOne(customerDocumentId);
            if (customerDocument === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid customer document Id',
                };
                return response.status(400).send(errorResponse);
            }
            const file = customerDocument.name;
            const filePath = customerDocument.path;
            let val;
            if (env_1.env.imageserver === 's3') {
                val = yield this.s3Service.fileDownload(filePath, file);
            }
            else {
                val = yield this.imageService.fileDownload(filePath, file);
            }
            if (val) {
                return new Promise((resolve, reject) => {
                    response.download(val, file);
                });
            }
            else {
                return response.status(400).send({ status: 0, message: 'Download Failed' });
            }
        });
    }
    // Get Vendor Document List
    /**
     * @api {get} /api/vendor/customer-document-list Get Vendor Document List
     * @apiGroup Vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get customer document list",
     * "data":{},
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor/customer-document-list
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    customerDocumentList(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId: request.user.vendorId,
                },
            });
            if (!vendor) {
                const errResponse = {
                    status: 1,
                    message: 'Invalid Vendor',
                };
                return response.status(400).send(errResponse);
            }
            const select = ['customerDocumentId', 'customerId', 'title', 'name', 'path', 'documentStatus', 'createdDate'];
            const whereConditions = [
                {
                    name: 'customerId',
                    value: vendor.customerId,
                },
            ];
            const search = [];
            const customerDoc = yield this.customerDocumentService.list(limit, offset, select, search, whereConditions, count);
            const successResponse = {
                status: 1,
                message: 'successfully list the customer document',
                data: customerDoc,
            };
            return response.status(200).send(successResponse);
        });
    }
    base64MimeType(encoded) {
        let result = undefined;
        if (typeof encoded !== 'string') {
            return result;
        }
        const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
        if (mime && mime.length) {
            result = mime[1];
        }
        return result;
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/register'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorRegistrationRequest_1.VendorRegisterRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "register", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/login'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorLoginRequest_1.VendorLogin, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "login", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-profile'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "vendorDetails", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-category-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "vendorCategoryList", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/change-password'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.BodyParam('newPassword')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "changePassword", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/forgot-password'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorForgotPasswordRequest_1.VendorForgotPasswordRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "forgotPassword", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/edit-vendor/:customerId'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })),
    tslib_1.__param(1, routing_controllers_1.Param('customerId')), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateVendorRequest_1.UpdateVendorRequest, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "update", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/total-Dashboard-counts'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "totalProductCounts", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/order-graph'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('duration')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "topSellingProductList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/upload-customer-document'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.BodyParam('customerData')), tslib_1.__param(1, routing_controllers_1.BodyParam('title')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "uploadCustomerDocument", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/download-customer-document/:customerDocumentId'),
    tslib_1.__param(0, routing_controllers_1.Param('customerDocumentId')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "downloadCustomerDocument", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/customer-document-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Req()), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "customerDocumentList", null);
VendorController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/vendor'),
    tslib_1.__metadata("design:paramtypes", [CustomerService_1.CustomerService,
        VendorService_1.VendorService,
        EmailTemplateService_1.EmailTemplateService,
        UserService_1.UserService,
        VendorCategoryService_1.VendorCategoryService,
        CategoryService_1.CategoryService,
        S3Service_1.S3Service,
        ImageService_1.ImageService,
        CountryService_1.CountryService,
        LoginLogService_1.LoginLogService,
        VendorOrderService_1.VendorOrdersService,
        VendorProductService_1.VendorProductService,
        SettingService_1.SettingService,
        CurrencyService_1.CurrencyService,
        OrderStatusService_1.OrderStatusService,
        CustomerDocumentService_1.CustomerDocumentService])
], VendorController);
exports.VendorController = VendorController;
//# sourceMappingURL=VendorController.js.map