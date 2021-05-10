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
const CustomerService_1 = require("../../services/CustomerService");
const CountryService_1 = require("../../services/CountryService");
const VendorService_1 = require("../../services/VendorService");
const CategoryService_1 = require("../../services/CategoryService");
const EmailTemplateService_1 = require("../../services/EmailTemplateService");
const VendorCategoryService_1 = require("../../services/VendorCategoryService");
const Customer_1 = require("../../models/Customer");
const CreateVendorRequest_1 = require("./requests/CreateVendorRequest");
const UpdateVendorRequest_1 = require("./requests/UpdateVendorRequest");
const Vendor_1 = require("../../models/Vendor");
const mail_services_1 = require("../../../auth/mail.services");
const env_1 = require("../../../env");
const S3Service_1 = require("../../services/S3Service");
const SettingService_1 = require("../../services/SettingService");
const ImageService_1 = require("../../services/ImageService");
const VendorProductService_1 = require("../../services/VendorProductService");
const VendorSettingService_1 = require("../../services/VendorSettingService");
const CustomerDocumentService_1 = require("../../services/CustomerDocumentService");
const fs = tslib_1.__importStar(require("fs"));
let VendorController = class VendorController {
    constructor(customerService, vendorService, categoryService, vendorCategoryService, emailTemplateService, s3Service, settingService, vendorGlobalSettingService, vendorProductService, countryService, customerDocumentService, imageService) {
        this.customerService = customerService;
        this.vendorService = vendorService;
        this.categoryService = categoryService;
        this.vendorCategoryService = vendorCategoryService;
        this.emailTemplateService = emailTemplateService;
        this.s3Service = s3Service;
        this.settingService = settingService;
        this.vendorGlobalSettingService = vendorGlobalSettingService;
        this.vendorProductService = vendorProductService;
        this.countryService = countryService;
        this.customerDocumentService = customerDocumentService;
        this.imageService = imageService;
    }
    // Create Vendor API
    /**
     * @api {post} /api/admin-vendor/add-vendor Add Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName Vendor firstName
     * @apiParam (Request body) {String} lastName Vendor lastName
     * @apiParam (Request body) {String} email Vendor email
     * @apiParam (Request body) {Number} mobileNumber Vendor mobileNumber
     * @apiParam (Request body) {String} password Vendor password
     * @apiParam (Request body) {String} confirmPassword Vendor confirmPassword
     * @apiParam (Request body) {String} avatar Vendor avatar
     * @apiParam (Request body) {Number} commission seller commission
     * @apiParam (Request body) {String} companyName companyName
     * @apiParam (Request body) {String} companyLogo company Logo
     * @apiParam (Request body) {String} companyCoverImage companyCoverImage
     * @apiParam (Request body) {String} companyDescription company description
     * @apiParam (Request body) {String} companyAddress1 company address1
     * @apiParam (Request body) {String} companyAddress2 company address2
     * @apiParam (Request body) {String} companyCity company city
     * @apiParam (Request body) {String} companyState company state
     * @apiParam (Request body) {Number} companyCountryId company country id
     * @apiParam (Request body) {String} pincode pincode
     * @apiParam (Request body) {Number} companyMobileNumber company mobile number
     * @apiParam (Request body) {String} companyEmailId company email id
     * @apiParam (Request body) {String} companyWebsite company website
     * @apiParam (Request body) {Number} companyGstNumber company gst number
     * @apiParam (Request body) {Number} companyPanNumber company pan number
     * @apiParam (Request body) {String} paymentInformation paymentInformation
     * @apiParam (Request body) {Number} mailStatus mailStatus
     * @apiParam (Request body) {Number} status Status
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "email" : "",
     *      "mobileNumber" : "",
     *      "password" : "",
     *      "confirmPassword" : "",
     *      "avatar" : "",
     *      "commission" : "",
     *      "companyName" : "",
     *      "companyLogo" : "",
     *      "companyDescription" : "",
     *      "companyAddress1" : "",
     *      "companyAddress2" : "",
     *      "companyCity" : "",
     *      "companyState" : "",
     *      "companyCountryId" : "",
     *      "pincode" : "",
     *      "companyCoverImage" : "",
     *      "companyMobileNumber" : "",
     *      "companyEmailId" : "",
     *      "companyWebsite" : "",
     *      "companyGstNumber" : "",
     *      "companyPanNumber" : "",
     *      "mailStatus" : "",
     *      "paymentInformation": "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Vendor Created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/add-vendor
     * @apiErrorExample {json} Vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    addVendor(customerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const avatar = customerParam.avatar;
            const newCustomer = new Customer_1.Customer();
            const resultUser = yield this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0 } });
            if (resultUser) {
                const vendor = yield this.vendorService.findOne({ where: { customerId: resultUser.id } });
                if (vendor) {
                    const successResponse = {
                        status: 1,
                        message: 'EmailId already exist.',
                    };
                    return response.status(400).send(successResponse);
                }
                else {
                    if (customerParam.password === customerParam.confirmPassword) {
                        const customer = yield this.customerService.findOne({ where: { email: customerParam.email, deleteFlag: 0 } });
                        customer.firstName = customerParam.firstName;
                        customer.lastName = customerParam.lastName;
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
                        const partsOfThreeLetters = customerParam.email.match(/.{3}/g).concat(customerParam.email.substr(1).match(/.{3}/g), customerParam.email.substr(2).match(/.{3}/g));
                        const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(customerParam.password);
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
                        customer.password = yield Customer_1.Customer.hashPassword(customerParam.password);
                        customer.email = customerParam.email;
                        customer.username = customerParam.email;
                        customer.mobileNumber = customerParam.mobileNumber;
                        customer.mailStatus = customerParam.mailStatus;
                        customer.isActive = customerParam.status;
                        const customerUpdated = yield this.customerService.create(customer);
                        if (customerUpdated) {
                            const newVendor = new Vendor_1.Vendor();
                            const companyLogo = customerParam.companyLogo;
                            if (companyLogo) {
                                const logoType = companyLogo.split(';')[0].split('/')[1];
                                const logoname = 'Img_' + Date.now() + '.' + logoType;
                                const logopath = 'logo/';
                                const logobase64Data = new Buffer(companyLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                                if (env_1.env.imageserver === 's3') {
                                    yield this.s3Service.imageUpload((logopath + logoname), logobase64Data, logoType);
                                }
                                else {
                                    yield this.imageService.imageUpload((logopath + logoname), logobase64Data);
                                }
                                newVendor.companyLogo = logoname;
                                newVendor.companyLogoPath = logopath;
                            }
                            const companyCoverImage = customerParam.companyCoverImage;
                            if (companyCoverImage) {
                                const covertype = companyCoverImage.split(';')[0].split('/')[1];
                                const imgName = 'Img_' + Date.now() + '.' + covertype;
                                const imgPath = 'logo/';
                                const base64DataCoverImage = new Buffer(companyCoverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                                if (env_1.env.imageserver === 's3') {
                                    yield this.s3Service.imageUpload((imgPath + imgName), base64DataCoverImage, covertype);
                                }
                                else {
                                    yield this.imageService.imageUpload((imgPath + imgName), base64DataCoverImage);
                                }
                                newVendor.companyCoverImage = imgName;
                                newVendor.companyCoverImagePath = imgPath;
                            }
                            newVendor.customerId = customer.id;
                            const vendorName = customerParam.firstName;
                            if (vendorName) {
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
                                    const value = slugVal.vendorSlugName;
                                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                                    const slugNumber = parseInt(getSlugInt, 0);
                                    newVendor.vendorSlugName = data + '-' + (slugNumber + 1);
                                }
                            }
                            newVendor.approvalFlag = 0;
                            if (customerParam.commission) {
                                newVendor.commission = customerParam.commission;
                            }
                            else {
                                const commission = yield this.vendorGlobalSettingService.findOne();
                                if (commission) {
                                    newVendor.commission = commission.defaultCommission;
                                }
                            }
                            newVendor.companyName = customerParam.companyName;
                            newVendor.companyDescription = customerParam.companyDescription;
                            newVendor.paymentInformation = customerParam.paymentInformation;
                            newVendor.companyAddress1 = customerParam.companyAddress1;
                            newVendor.companyAddress2 = customerParam.companyAddress2;
                            newVendor.companyCity = customerParam.companyCity;
                            newVendor.companyState = customerParam.companyState;
                            newVendor.companyCountryId = customerParam.companyCountryId;
                            newVendor.pincode = customerParam.pincode;
                            newVendor.companyMobileNumber = customerParam.companyMobileNumber;
                            newVendor.companyEmailId = customerParam.companyEmailId;
                            newVendor.companyWebsite = customerParam.companyWebsite;
                            newVendor.companyGstNumber = customerParam.companyGstNumber;
                            newVendor.companyPanNumber = customerParam.companyPanNumber;
                            newVendor.approvedBy = 0;
                            newVendor.approvalDate = undefined;
                            const vendors = yield this.vendorService.create(newVendor);
                            const stringPad = String(vendors.vendorId).padStart(4, '0');
                            newVendor.vendorPrefixId = 'Ven'.concat(stringPad);
                            yield this.vendorService.update(vendors.vendorId, newVendor);
                            if (customerParam.mailStatus === 1) {
                                const emailContent = yield this.emailTemplateService.findOne(13);
                                const logo = yield this.settingService.findOne();
                                const message = emailContent.content.replace('{name}', customerParam.firstName).replace('{username}', customerParam.email).replace('{password}', customerParam.password);
                                const redirectUrl = env_1.env.vendorRedirectUrl;
                                mail_services_1.MAILService.customerLoginMail(logo, message, customerParam.email, emailContent.subject, redirectUrl);
                                const successResponse = {
                                    status: 1,
                                    message: 'Successfully created new Vendor with user name and password and send an email. ',
                                };
                                return response.status(200).send(successResponse);
                            }
                            else {
                                const successResponse = {
                                    status: 1,
                                    message: 'Vendor Created Successfully',
                                };
                                return response.status(200).send(successResponse);
                            }
                        }
                    }
                    else {
                        const errorResponse = {
                            status: 0,
                            message: 'Password does not match.',
                        };
                        return response.status(400).send(errorResponse);
                    }
                }
            }
            else {
                if (customerParam.password === customerParam.confirmPassword) {
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
                        newCustomer.avatar = name;
                        newCustomer.avatarPath = path;
                    }
                    const partsOfThreeLetters = customerParam.email.match(/.{3}/g).concat(customerParam.email.substr(1).match(/.{3}/g), customerParam.email.substr(2).match(/.{3}/g));
                    const matchEmail = new RegExp(partsOfThreeLetters.join('|'), 'i').test(customerParam.password);
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
                    const password = yield Customer_1.Customer.hashPassword(customerParam.password);
                    newCustomer.firstName = customerParam.firstName;
                    newCustomer.lastName = customerParam.lastName;
                    newCustomer.email = customerParam.email;
                    newCustomer.username = customerParam.email;
                    newCustomer.mobileNumber = customerParam.mobileNumber;
                    newCustomer.password = password;
                    newCustomer.deleteFlag = 0;
                    newCustomer.mailStatus = customerParam.mailStatus;
                    newCustomer.isActive = customerParam.status;
                    const customerSave = yield this.customerService.create(newCustomer);
                    if (customerSave) {
                        const vendor = new Vendor_1.Vendor();
                        const companyLogo = customerParam.companyLogo;
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
                        const companyCoverImage = customerParam.companyCoverImage;
                        if (companyCoverImage) {
                            const covertype = companyCoverImage.split(';')[0].split('/')[1];
                            const imgName = 'Img_' + Date.now() + '.' + covertype;
                            const imgPath = 'logo/';
                            const base64DataCoverImage = new Buffer(companyCoverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                            if (env_1.env.imageserver === 's3') {
                                yield this.s3Service.imageUpload((imgPath + imgName), base64DataCoverImage, covertype);
                            }
                            else {
                                yield this.imageService.imageUpload((imgPath + imgName), base64DataCoverImage);
                            }
                            vendor.companyCoverImage = imgName;
                            vendor.companyCoverImagePath = imgPath;
                        }
                        vendor.approvalFlag = 0;
                        if (customerParam.commission) {
                            vendor.commission = customerParam.commission;
                        }
                        else {
                            const commission = yield this.vendorGlobalSettingService.findOne();
                            if (commission) {
                                vendor.commission = commission.defaultCommission;
                            }
                        }
                        const vendorName = customerParam.firstName;
                        if (vendorName) {
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
                        }
                        vendor.customerId = customerSave.id;
                        vendor.companyName = customerParam.companyName;
                        vendor.companyDescription = customerParam.companyDescription;
                        vendor.paymentInformation = customerParam.paymentInformation;
                        vendor.companyAddress1 = customerParam.companyAddress1;
                        vendor.companyAddress2 = customerParam.companyAddress2;
                        vendor.companyCity = customerParam.companyCity;
                        vendor.companyState = customerParam.companyState;
                        vendor.companyCountryId = customerParam.companyCountryId;
                        vendor.pincode = customerParam.pincode;
                        vendor.companyMobileNumber = customerParam.companyMobileNumber;
                        vendor.companyEmailId = customerParam.companyEmailId;
                        vendor.companyWebsite = customerParam.companyWebsite;
                        vendor.companyGstNumber = customerParam.companyGstNumber;
                        vendor.companyPanNumber = customerParam.companyPanNumber;
                        vendor.approvalFlag = 0;
                        const vendorSave = yield this.vendorService.create(vendor);
                        const stringPad = String(vendorSave.vendorId).padStart(4, '0');
                        vendor.vendorPrefixId = 'Ven'.concat(stringPad);
                        yield this.vendorService.update(vendorSave.vendorId, vendor);
                        if (vendorSave) {
                            if (customerParam.mailStatus === 1) {
                                const emailContent = yield this.emailTemplateService.findOne(13);
                                const logo = yield this.settingService.findOne();
                                const message = emailContent.content.replace('{name}', customerParam.firstName).replace('{username}', customerParam.email).replace('{password}', customerParam.password);
                                const redirectUrl = env_1.env.vendorRedirectUrl;
                                mail_services_1.MAILService.customerLoginMail(logo, message, customerParam.email, emailContent.subject, redirectUrl);
                                const successResponse = {
                                    status: 1,
                                    message: 'Successfully created new Vendor with user name and password and send an email. ',
                                };
                                return response.status(200).send(successResponse);
                            }
                            else {
                                const successResponse = {
                                    status: 1,
                                    message: 'Vendor Created Successfully',
                                };
                                return response.status(200).send(successResponse);
                            }
                        }
                    }
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Password does not match.',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
        });
    }
    // Update Vendor API
    /**
     * @api {put} /api/admin-vendor/Update-Vendor/:id Update Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} firstName Vendor firstName
     * @apiParam (Request body) {String} lastName Vendor lastName
     * @apiParam (Request body) {Number} mobileNumber Customer mobileNumber
     * @apiParam (Request body) {String} avatar Customer avatar
     * @apiParam (Request body) {Number} commission seller commission
     * @apiParam (Request body) {String} companyName companyName
     * @apiParam (Request body) {String} companyLogo company Logo
     * @apiParam (Request body) {String} companyCoverImage companyCoverImage
     * @apiParam (Request body) {String} companyDescription company description
     * @apiParam (Request body) {String} companyAddress1 company address1
     * @apiParam (Request body) {String} companyAddress2 company address2
     * @apiParam (Request body) {String} companyCity company city
     * @apiParam (Request body) {String} companyState company state
     * @apiParam (Request body) {Number} companyCountryId company country id
     * @apiParam (Request body) {String} pincode pincode
     * @apiParam (Request body) {Number} companyMobileNumber company mobile number
     * @apiParam (Request body) {String} companyEmailId company email id
     * @apiParam (Request body) {String} companyWebsite company website
     * @apiParam (Request body) {Number} companyGstNumber company gst number
     * @apiParam (Request body) {Number} companyPanNumber company pan number
     * @apiParam (Request body) {String} paymentInformation paymentInformation
     * @apiParam (Request body) {Number} mailStatus mailStatus
     * @apiParam (Request body) {Number} status Status
     * @apiParamExample {json} Input
     * {
     *      "firstName" : "",
     *      "lastName" : "",
     *      "mobileNumber" : "",
     *      "avatar" : "",
     *      "commission" : "",
     *      "companyName" : "",
     *      "companyLogo" : "",
     *      "companyCoverImage" : "",
     *      "companyDescription" : "",
     *      "paymentInformation" : "",
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
     *      "mailStatus" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Vendor Updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/Update-Vendor/:id
     * @apiErrorExample {json} Vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    UpdateVendor(id, updateCustomerParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerService.findOne({
                where: {
                    id,
                },
            });
            if (!customer) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid customer id',
                };
                return response.status(400).send(errorResponse);
            }
            const avatar = updateCustomerParam.avatar;
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
            customer.firstName = updateCustomerParam.firstName;
            customer.lastName = updateCustomerParam.lastName;
            customer.mobileNumber = updateCustomerParam.mobileNumber;
            customer.deleteFlag = 0;
            customer.mailStatus = updateCustomerParam.mailStatus;
            customer.isActive = updateCustomerParam.status;
            const customerSave = yield this.customerService.create(customer);
            const vendor = yield this.vendorService.findOne({
                where: {
                    customerId: id,
                },
            });
            const companyLogo = updateCustomerParam.companyLogo;
            if (companyLogo) {
                const logotype = companyLogo.split(';')[0].split('/')[1];
                const logoname = 'Img_' + Date.now() + '.' + logotype;
                const logopath = 'logo/';
                const logobase64Data = new Buffer(companyLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((logopath + logoname), logobase64Data, logotype);
                }
                else {
                    yield this.imageService.imageUpload((logopath + logoname), logobase64Data);
                }
                vendor.companyLogo = logoname;
                vendor.companyLogoPath = logopath;
            }
            const companyCoverImage = updateCustomerParam.companyCoverImage;
            if (companyCoverImage) {
                const covertype = companyCoverImage.split(';')[0].split('/')[1];
                const imgName = 'Img_' + Date.now() + '.' + covertype;
                const imgPath = 'logo/';
                const coverImagebase64Data = new Buffer(companyCoverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((imgPath + imgName), coverImagebase64Data, covertype);
                }
                else {
                    yield this.imageService.imageUpload((imgPath + imgName), coverImagebase64Data);
                }
                vendor.companyCoverImage = imgName;
                vendor.companyCoverImagePath = imgPath;
            }
            if (updateCustomerParam.commission) {
                vendor.commission = updateCustomerParam.commission;
            }
            else {
                const commission = yield this.vendorGlobalSettingService.findOne();
                if (commission) {
                    vendor.commission = commission.defaultCommission;
                }
            }
            const vendorName = updateCustomerParam.firstName;
            const data = vendorName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getCustomerSlug = yield this.vendorService.slugData(vendorName);
            if (getCustomerSlug === '' || getCustomerSlug === undefined || getCustomerSlug.length === 0) {
                vendor.vendorSlugName = data;
            }
            else if (getCustomerSlug.length === 1) {
                if ((vendorName === getCustomerSlug[getCustomerSlug.length - 1].firstName) && (getCustomerSlug[getCustomerSlug.length - 1].vendorSlugName === null)) {
                    vendor.vendorSlugName = data;
                }
                else {
                    vendor.vendorSlugName = data + '-' + 1;
                }
            }
            else if (getCustomerSlug.length > 1 && getCustomerSlug !== undefined && getCustomerSlug !== '') {
                const slugVal = getCustomerSlug[getCustomerSlug.length - 1];
                const val = slugVal.vendorSlugName;
                if (val === null) {
                    const vend = yield this.vendorService.findOne({ where: { vendorId: vendor.vendorId } });
                    vend.vendorSlugName = data;
                    yield this.vendorService.create(vend);
                    const vendorEmptySlugArr = yield this.vendorService.slugDataWithEmptySlug(vendorName);
                    let i = 1;
                    for (const empty of vendorEmptySlugArr) {
                        const ven = yield this.vendorService.findOne({ where: { vendorId: empty.vendorId } });
                        ven.vendorSlugName = data + '-' + i;
                        yield this.vendorService.create(ven);
                        i++;
                    }
                    vendor.vendorSlugName = vend.vendorSlugName;
                }
                else if ((vendorName !== getCustomerSlug[getCustomerSlug.length - 1].firstName)) {
                    const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    vendor.vendorSlugName = data + '-' + (slugNumber + 1);
                }
            }
            vendor.customerId = customerSave.id;
            vendor.companyName = updateCustomerParam.companyName;
            vendor.companyDescription = updateCustomerParam.companyDescription;
            vendor.paymentInformation = updateCustomerParam.paymentInformation;
            vendor.companyAddress1 = updateCustomerParam.companyAddress1;
            vendor.companyAddress2 = updateCustomerParam.companyAddress2;
            vendor.companyCity = updateCustomerParam.companyCity;
            vendor.companyState = updateCustomerParam.companyState;
            vendor.companyCountryId = updateCustomerParam.companyCountryId;
            vendor.pincode = updateCustomerParam.pincode;
            vendor.companyMobileNumber = updateCustomerParam.companyMobileNumber;
            vendor.companyEmailId = updateCustomerParam.companyEmailId;
            vendor.companyWebsite = updateCustomerParam.companyWebsite;
            vendor.companyGstNumber = updateCustomerParam.companyGstNumber;
            vendor.companyPanNumber = updateCustomerParam.companyPanNumber;
            const vendorSave = yield this.vendorService.create(vendor);
            if (vendorSave) {
                const successResponse = {
                    status: 1,
                    message: 'Vendor Updated Successfully',
                    data: customerSave,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Vendor List API
    /**
     * @api {get} /api/admin-vendor/vendorlist Vendor List API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} name search by name
     * @apiParam (Request body) {String} email search by email
     * @apiParam (Request body) {Number} status 0->inactive 1-> active
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor list",
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
     * @apiSampleRequest /api/admin-vendor/vendorlist
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorList(limit, offset, name, status, email, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['vendor.vendorId', 'vendor.vendorPrefixId', 'vendor.customerId', 'vendor.commission', 'vendor.approvalFlag', 'vendor.companyName'];
            const searchConditions = [];
            const whereConditions = [
                {
                    name: 'vendor.customerId',
                    op: 'where',
                    value: 0,
                },
                {
                    name: 'vendor.customerId',
                    op: 'email',
                    value: email,
                },
                {
                    name: 'vendor.customerId',
                    op: 'status',
                    value: status,
                },
                {
                    name: 'vendor.companyName',
                    op: 'name',
                    value: name,
                },
            ];
            const vendorList = yield this.vendorService.vendorList(limit, offset, select, searchConditions, whereConditions, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got vendor count',
                    data: vendorList,
                };
                return response.status(200).send(successRes);
            }
            const vendorCustomerList = vendorList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const customer = yield this.customerService.findOne({
                    where: {
                        id: value.customerId,
                    },
                });
                const temp = value;
                temp.firstName = customer.firstName;
                temp.lastName = customer.lastName;
                temp.email = customer.email;
                temp.mobileNumber = customer.mobileNumber;
                temp.avatar = customer.avatar;
                temp.avatarPath = customer.avatarPath;
                temp.customerGroupId = customer.customerGroupId;
                temp.isActive = customer.isActive;
                return temp;
            }));
            const results = yield Promise.all(vendorCustomerList);
            const successResponse = {
                status: 1,
                message: 'Successfully got Vendor list.',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Details Excel Document Download
    /**
     * @api {get} /api/admin-vendor/vendor-excel-list Vendor Excel
     * @apiGroup Admin vendor
     * @apiParam (Request body) {String} vendorId vendorId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Vendor Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/admin-vendor/vendor-excel-list
     * @apiErrorExample {json} Vendor Excel List error
     * HTTP/1.1 500 Internal Server Error
     */
    excelVendorView(vendorId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const excel = require('exceljs');
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Vendor list Sheet');
            const rows = [];
            worksheet.columns = [
                { header: 'Vendor Id', key: 'id', size: 16, width: 15 },
                { header: 'Vendor Prefix Id', key: 'vendorPrefixId', size: 16, width: 15 },
                { header: 'Vendor Name', key: 'firstName', size: 16, width: 15 },
                { header: 'Email Id', key: 'email', size: 16, width: 15 },
                { header: 'Mobile Number', key: 'mobileNumber', size: 16, width: 15 },
                { header: 'Date Of Registration', key: 'createdDate', size: 16, width: 15 },
                { header: 'commission', key: 'commission', size: 16, width: 15 },
                { header: 'companyName', key: 'createdDate', size: 16, width: 15 },
                { header: 'approvalFlag', key: 'approvalFlag', size: 16, width: 15 },
            ];
            worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            if (vendorId) {
                const vendorsid = vendorId.split(',');
                for (const id of vendorsid) {
                    const dataId = yield this.vendorService.findOne(id);
                    if (dataId === undefined) {
                        const errorResponse = {
                            status: 0,
                            message: 'Invalid vendorId',
                        };
                        return response.status(400).send(errorResponse);
                    }
                }
                for (const id of vendorsid) {
                    const dataId = yield this.vendorService.findOne(id);
                    const customer = yield this.customerService.findOne({ where: { id: dataId.customerId, deleteFlag: 0 } });
                    if (customer) {
                        rows.push([dataId.vendorId, dataId.vendorPrefixId, customer.firstName, customer.email, customer.mobileNumber, customer.createdDate, dataId.commission, dataId.companyName, dataId.approvalFlag]);
                    }
                }
            }
            else {
                const vendors = yield this.vendorService.findAll();
                if (vendors === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Vendors are empty',
                    };
                    return response.status(400).send(errorResponse);
                }
                for (const vendor of vendors) {
                    const dataId = yield this.vendorService.findOne(vendor.vendorId);
                    const customer = yield this.customerService.findOne({ where: { id: dataId.customerId, deleteFlag: 0 } });
                    if (customer) {
                        rows.push([dataId.vendorId, dataId.vendorPrefixId, customer.firstName, customer.email, customer.mobileNumber, customer.createdDate, dataId.commission, dataId.companyName, dataId.approvalFlag]);
                    }
                }
            }
            // Add all rows data in sheet
            worksheet.addRows(rows);
            const fileName = './VendorExcel_' + Date.now() + '.xlsx';
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
    // Get vendor Detail API
    /**
     * @api {get} /api/admin-vendor/vendor-details/:id Vendor Details API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get vendor Details",
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
     * @apiSampleRequest /api/admin-vendor/vendor-details/:id
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorDetails(Id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                select: ['vendorId', 'vendorPrefixId', 'customerId', 'commission', 'companyLogo', 'companyLogoPath', 'companyCoverImage', 'companyCoverImagePath', 'companyName',
                    'companyDescription', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId',
                    'pincode', 'companyPanNumber', 'companyGstNumber', 'companyEmailId', 'companyWebsite', 'companyMobileNumber', 'paymentInformation'],
                where: { vendorId: Id },
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
            const product = yield this.vendorProductService.find({
                select: ['productId'],
                where: { vendorId: Id },
            });
            vendor.productCount = product.length;
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
                message: 'successfully got Vendor details. ',
                data: vendor,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Approve vendors  API
    /**
     * @api {put} /api/admin-vendor/approve-vendor/:id Vendor Approval API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} approvalFlag approval flag should be 1
     * @apiParamExample {json} Input
     * {
     *      "approvalFlag" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully approved vendor.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/approve-vendor/:id
     * @apiErrorExample {json} vendor approval error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorApproval(id, approvalFlag, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId: id,
                },
            });
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid vendorId',
                };
                return response.status(400).send(errorResponse);
            }
            if (vendor.approvalFlag === 1) {
                const errorResponse = {
                    status: 0,
                    message: 'Vendor Already Approved',
                };
                return response.status(400).send(errorResponse);
            }
            vendor.approvalFlag = approvalFlag;
            vendor.approvedBy = request.user.userId;
            const today = new Date().toISOString().slice(0, 10);
            vendor.approvalDate = today;
            const vendorSave = yield this.vendorService.create(vendor);
            if (env_1.env.imageserver === 's3') {
                const prefixId = vendorSave.vendorPrefixId.replace('#', '');
                yield this.s3Service.createFolder(prefixId);
            }
            else {
                const prefixId = vendorSave.vendorPrefixId.replace('#', '');
                yield this.imageService.createFolder(prefixId);
            }
            const vendorCustomer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
            vendorCustomer.isActive = 1;
            yield this.customerService.create(vendorCustomer);
            if (vendorSave) {
                const emailContent = yield this.emailTemplateService.findOne(15);
                const setting = yield this.settingService.findOne();
                const message = emailContent.content.replace('{name}', vendorCustomer.firstName).replace('{sitename}', setting.storeName);
                const redirectUrl = env_1.env.vendorRedirectUrl;
                mail_services_1.MAILService.customerLoginMail(setting, message, vendorCustomer.email, emailContent.subject, redirectUrl);
                const successResponse = {
                    status: 1,
                    message: 'Vendor Approved and email sent to vendor with login credential',
                    data: vendorSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to approve vendor',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Vendor API
    /**
     * @api {delete} /api/admin-vendor/delete-vendor/:id Delete single Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "vendorId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendor.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/delete-vendor/:id
     * @apiErrorExample {json} Vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteVendor(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId: id,
                },
            });
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid vendorId',
                };
                return response.status(400).send(errorResponse);
            }
            const product = yield this.vendorProductService.findOne({ where: { vendorId: vendor.vendorId } });
            if (product) {
                const errorResponse = {
                    status: 0,
                    message: 'Products are mapped for this vendor.So please delete that product',
                };
                return response.status(400).send(errorResponse);
            }
            const customer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
            customer.deleteFlag = 1;
            const deleteCustomer = yield this.customerService.create(customer);
            if (deleteCustomer) {
                const successResponse = {
                    status: 1,
                    message: 'Vendor Deleted Successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to change delete flag status',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete Multiple Customer API
    /**
     * @api {post} /api/admin-vendor/delete-multiple-vendor Delete Multiple Vendor API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} vendorId vendorId
     * @apiParamExample {json} Input
     * {
     * "vendorId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted vendors.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/delete-multiple-vendor
     * @apiErrorExample {json} customerDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteMultipleCustomer(vendorId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = vendorId.split(',');
            const data = customer.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const dataId = yield this.vendorService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Please choose customer for delete',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    const product = yield this.vendorProductService.findOne({ where: { vendorId: dataId.vendorId } });
                    if (product) {
                        const errorResponse = {
                            status: 0,
                            message: 'Products are mapped for one of the selected vendor.So please delete that product',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    const customerDelete = yield this.customerService.findOne({ where: { id: dataId.customerId } });
                    customerDelete.deleteFlag = 1;
                    return yield this.customerService.create(customerDelete);
                }
            }));
            const deleteCustomer = yield Promise.all(data);
            if (deleteCustomer) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted vendor',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Update Vendor commission  API
    /**
     * @api {put} /api/admin-vendor/update-vendor-commission/:vendorId Update Vendor Commission API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} commission commission
     * @apiParamExample {json} Input
     * {
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated vendor commission",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/update-vendor-commission/:vendorId
     * @apiErrorExample {json} vendor approval error
     * HTTP/1.1 500 Internal Server Error
     */
    updateVendorCommission(vendorId, commission, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId,
                },
            });
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid vendorId',
                };
                return response.status(400).send(errorResponse);
            }
            vendor.commission = commission;
            const vendorSave = yield this.vendorService.create(vendor);
            if (vendorSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully Updated Vendor Commission ',
                    data: vendorSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable Updated Vendor Commission',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Verify Customer Document API
    /**
     * @api {put} /api/admin-vendor/verify-customer-document/:customerDocumentId Verify Customer Document API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} documentStatus documentStatus
     * @apiParamExample {json} Input
     * {
     *      "documentStatus" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully verify customer document list",
     * "data":{},
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/verify-customer-document/:customerDocumentId
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    verifyCustomerDocument(customerDocumentId, documentStatus, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customerDocument = yield this.customerDocumentService.findOne({
                where: {
                    customerDocumentId,
                },
            });
            if (!customerDocument) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid customerDocumentId',
                };
                return response.status(400).send(errorResponse);
            }
            customerDocument.documentStatus = documentStatus;
            const updateCustomer = yield this.customerDocumentService.create(customerDocument);
            const successResponse = {
                status: 1,
                message: 'successfully verified the customer document',
                data: updateCustomer,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Get Customer Document List
    /**
     * @api {get} /api/admin-vendor/customer-document-list Get Customer Document List
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {number} vendorId vendorId
     * @apiParam (Request body) {number} count count
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset" : "",
     *      "search" : "",
     *      "vendorId" : "",
     *      "count" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get customer document list",
     * "data":{},
     * "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/customer-document-list
     * @apiErrorExample {json} customer error
     * HTTP/1.1 500 Internal Server Error
     */
    customerDocumentList(limit, offset, keyword, vendorId, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                where: {
                    vendorId,
                },
            });
            const search = [
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                },
            ];
            const select = ['customerDocumentId', 'customerId', 'title', 'name', 'path', 'documentStatus', 'createdDate'];
            const whereConditions = [
                {
                    name: 'customerId',
                    value: vendor.customerId,
                },
            ];
            const customerDoc = yield this.customerDocumentService.list(limit, offset, select, search, whereConditions, count);
            const successResponse = {
                status: 1,
                message: 'successfully list the customer document',
                data: customerDoc,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Download Customer Document API
    /**
     * @api {get} /api/admin-vendor/download-customer-document/:customerDocumentId Download Customer Document API
     * @apiGroup Admin vendor
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
     * @apiSampleRequest /api/admin-vendor/download-customer-document/:customerDocumentId
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
    // Vendor Count API
    /**
     * @api {get} /api/admin-vendor/vendor-count Vendor Count API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get vendor count",
     *      "data":{},
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/vendor-count
     * @apiErrorExample {json} Admin Vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    vendorCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = {};
            const select = [];
            const searchConditions = [];
            const whereConditions = [{
                    name: 'vendor.customerId',
                    op: 'where',
                    value: 0,
                }];
            const allVendorCount = yield this.vendorService.vendorList(0, 0, select, searchConditions, whereConditions, 1);
            const activeWhereConditions = [
                {
                    name: 'vendor.customerId',
                    op: 'where',
                    value: 0,
                },
                {
                    name: 'vendor.customerId',
                    op: 'status',
                    value: 1,
                },
            ];
            const activeVendorCount = yield this.vendorService.vendorList(0, 0, select, searchConditions, activeWhereConditions, 1);
            const inActiveWhereConditions = [
                {
                    name: 'vendor.customerId',
                    op: 'where',
                    value: 0,
                },
                {
                    name: 'vendor.customerId',
                    op: 'status',
                    value: 0,
                },
            ];
            const inActiveVendorCount = yield this.vendorService.vendorList(0, 0, select, searchConditions, inActiveWhereConditions, 1);
            vendor.totalVendor = allVendorCount;
            vendor.activeVendor = activeVendorCount;
            vendor.inActiveVendor = inActiveVendorCount;
            const successResponse = {
                status: 1,
                message: 'Successfully got the vendor count',
                data: vendor,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Vendor Name Slug API
    /**
     * @api {put} /api/admin-vendor/update-vendor-slug Update Vendor Name Slug API
     * @apiGroup Admin vendor
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Vendor Slug.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-vendor/update-vendor-slug
     * @apiErrorExample {json} admin vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    updateSlug(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.vendorService.findAll();
            for (const value of product) {
                const customer = yield this.customerService.findOne({ where: { id: value.customerId } });
                const vendorName = customer.firstName;
                if (vendorName) {
                    const data = vendorName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                    const getCustomerSlug = yield this.vendorService.slugData(vendorName);
                    if (getCustomerSlug.length === 0 || getCustomerSlug === '' || getCustomerSlug === undefined) {
                        value.vendorSlugName = data;
                    }
                    else if (getCustomerSlug.length === 1) {
                        if ((vendorName === getCustomerSlug[getCustomerSlug.length - 1].firstName) && (getCustomerSlug[getCustomerSlug.length - 1].vendorSlugName === null)) {
                            value.vendorSlugName = data;
                        }
                        else {
                            value.vendorSlugName = data + '-' + 1;
                        }
                    }
                    else if (getCustomerSlug.length > 1 && getCustomerSlug !== undefined && getCustomerSlug !== '') {
                        const slugVal = getCustomerSlug[getCustomerSlug.length - 1];
                        const val = slugVal.vendorSlugName;
                        if (val === null) {
                            const vend = yield this.vendorService.findOne({ where: { vendorId: value.vendorId } });
                            vend.vendorSlugName = data;
                            yield this.vendorService.create(vend);
                            const vendorEmptySlugArr = yield this.vendorService.slugDataWithEmptySlug(vendorName);
                            let i = 1;
                            for (const empty of vendorEmptySlugArr) {
                                const ven = yield this.vendorService.findOne({ where: { vendorId: empty.vendorId } });
                                ven.vendorSlugName = data + '-' + i;
                                yield this.vendorService.create(ven);
                                i++;
                            }
                            value.vendorSlugName = vend.vendorSlugName;
                        }
                        else if ((vendorName !== getCustomerSlug[getCustomerSlug.length - 1].firstName)) {
                            const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                            const slugNumber = parseInt(getSlugInt, 0);
                            value.vendorSlugName = data + '-' + (slugNumber + 1);
                        }
                    }
                }
                yield this.vendorService.create(value);
            }
            const successResponse = {
                status: 1,
                message: 'successfully update the vendor slug.',
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-vendor'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateVendorRequest_1.CreateVendorRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "addVendor", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/Update-Vendor/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body({ validate: true })), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateVendorRequest_1.UpdateVendor, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "UpdateVendor", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendorlist'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('name')), tslib_1.__param(3, routing_controllers_1.QueryParam('status')), tslib_1.__param(4, routing_controllers_1.QueryParam('email')), tslib_1.__param(5, routing_controllers_1.QueryParam('count')), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "vendorList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-excel-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('vendorId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "excelVendorView", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-details/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "vendorDetails", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/approve-vendor/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.BodyParam('approvalFlag')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "vendorApproval", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-vendor/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "deleteVendor", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/delete-multiple-vendor'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.BodyParam('vendorId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "deleteMultipleCustomer", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-vendor-commission/:vendorId'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('vendorId')), tslib_1.__param(1, routing_controllers_1.BodyParam('commission')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "updateVendorCommission", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/verify-customer-document/:customerDocumentId'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('customerDocumentId')), tslib_1.__param(1, routing_controllers_1.BodyParam('documentStatus')), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "verifyCustomerDocument", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/customer-document-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('vendorId')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "customerDocumentList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/download-customer-document/:customerDocumentId'),
    tslib_1.__param(0, routing_controllers_1.Param('customerDocumentId')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "downloadCustomerDocument", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-count'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "vendorCount", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-vendor-slug'),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "updateSlug", null);
VendorController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/admin-vendor'),
    tslib_1.__metadata("design:paramtypes", [CustomerService_1.CustomerService,
        VendorService_1.VendorService,
        CategoryService_1.CategoryService,
        VendorCategoryService_1.VendorCategoryService,
        EmailTemplateService_1.EmailTemplateService,
        S3Service_1.S3Service,
        SettingService_1.SettingService,
        VendorSettingService_1.VendorGlobalSettingService,
        VendorProductService_1.VendorProductService,
        CountryService_1.CountryService,
        CustomerDocumentService_1.CustomerDocumentService,
        ImageService_1.ImageService])
], VendorController);
exports.VendorController = VendorController;
//# sourceMappingURL=VendorController.js.map