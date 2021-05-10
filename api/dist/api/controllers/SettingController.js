"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const SettingService_1 = require("../services/SettingService");
const Setting_1 = require("../models/Setting");
const CreateSettingRequest_1 = require("./requests/CreateSettingRequest");
const env_1 = require("../../env");
const S3Service_1 = require("../services/S3Service");
const ImageService_1 = require("../services/ImageService");
const CurrencyService_1 = require("../services/CurrencyService");
let SettingController = class SettingController {
    constructor(settingService, s3Service, imageService, currencyService) {
        this.settingService = settingService;
        this.s3Service = s3Service;
        this.imageService = imageService;
        this.currencyService = currencyService;
    }
    // Get Settings list API
    /**
     * @api {get} /api/settings/get-settings Get Setting API
     * @apiGroup Settings
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get settings",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/settings/get-settings
     * @apiErrorExample {json} getSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    settingsList(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = '';
            const relation = [];
            const WhereConditions = [];
            const limit = 1;
            const settings = yield this.settingService.list(limit, select, relation, WhereConditions);
            const promise = settings.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const currencyData = yield this.currencyService.findOne({ where: { currencyId: result.storeCurrencyId } });
                const temp = result;
                if (currencyData) {
                    temp.currencyCode = currencyData.code;
                    temp.symbolLeft = currencyData.symbolLeft;
                    temp.symbolRight = currencyData.symbolRight;
                }
                else {
                    temp.currencyCode = currencyData.code;
                    temp.symbolLeft = currencyData.symbolLeft;
                    temp.symbolRight = currencyData.symbolRight;
                }
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get settings',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // create and update settings API
    /**
     * @api {post} /api/settings/create-settings Create Settings API
     * @apiGroup Settings
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} url  store url
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeywords metaTagKeywords
     * @apiParam (Request body) {String} storeName storeName
     * @apiParam (Request body) {String} storeOwner storeOwner
     * @apiParam (Request body) {String} storeAddress storeAddress
     * @apiParam (Request body) {Number} countryId countryId
     * @apiParam (Request body) {String} zoneId zoneId
     * @apiParam (Request body) {String} storeEmail storeEmail
     * @apiParam (Request body) {String} storeTelephone storeTelephone
     * @apiParam (Request body) {String} storeFax storeFax
     * @apiParam (Request body) {String} storeLogo storeLogo
     * @apiParam (Request body) {String} emailLogo emailLogo
     * @apiParam (Request body) {String} invoiceLogo invoiceLogo
     * @apiParam (Request body) {Number} maintenanceMode maintenanceMode
     * @apiParam (Request body) {String} storeLanguageName storeLanguageName
     * @apiParam (Request body) {Number} storeCurrencyId storeCurrencyId
     * @apiParam (Request body) {String} storeImage storeImage
     * @apiParam (Request body) {String} invoicePrefix invoicePrefix
     * @apiParam (Request body) {Number} orderStatus orderStatus
     * @apiParam (Request body) {Number} categoryProductCount productCount should be 0 or 1
     * @apiParam (Request body) {Number} itemsPerPage ItemsPerPage
     * @apiParam (Request body) {String} facebook facebook
     * @apiParam (Request body) {String} twitter twitter
     * @apiParam (Request body) {String} instagram instagram
     * @apiParam (Request body) {String} google google
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "url" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeywords" : "",
     *      "storeName" : "",
     *      "storeOwner" : "",
     *      "storeAddress" : "",
     *      "countryId" : "",
     *      "zoneId" : "",
     *      "storeEmail" : "",
     *      "storeTelephone" : "",
     *      "storeFax" : "",
     *      "storeLogo" : "",
     *      "invoiceLogo" : "",
     *      "emailLogo" : "",
     *      "maintenanceMode" : "",
     *      "storeLanguageName" : "",
     *      "storeCurrencyId" : "",
     *      "storeImage" : "",
     *      "invoicePrefix" : "",
     *      "orderStatus" : "",
     *      "categoryProductCount" : "",
     *      "itemsPerPage" : "",
     *      "google" : "",
     *      "instagram" : "",
     *      "facebook" : "",
     *      "twitter" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created setting.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/settings/create-settings
     * @apiErrorExample {json} addSettings error
     * HTTP/1.1 500 Internal Server Error
     */
    createSettings(settings, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settingValue = yield this.settingService.findOne();
            if (settingValue === undefined) {
                const newSettings = new Setting_1.Settings();
                newSettings.url = settings.url;
                newSettings.metaTagTitle = settings.metaTagTitle;
                newSettings.metaTagDescription = settings.metaTagDescription;
                newSettings.metaTagKeyword = settings.metaTagKeywords;
                newSettings.storeName = settings.storeName;
                newSettings.storeOwner = settings.storeOwner;
                newSettings.storeAddress = settings.storeAddress;
                newSettings.countryId = settings.countryId;
                newSettings.zoneId = settings.zoneId;
                newSettings.storeEmail = settings.storeEmail;
                newSettings.storeTelephone = settings.storeTelephone;
                newSettings.storeFax = settings.storeFax;
                if (settings.storeLogo) {
                    const logo = settings.storeLogo;
                    const type = logo.split(';')[0].split('/')[1];
                    const name = 'Img_' + Date.now() + '.' + type;
                    const path = 'storeLogo/';
                    const base64Data = new Buffer(logo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((path + name), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((path + name), base64Data);
                    }
                    newSettings.storeLogo = name;
                    newSettings.storeLogoPath = path;
                }
                if (settings.emailLogo) {
                    const emaillogo = settings.emailLogo;
                    const type = emaillogo.split(';')[0].split('/')[1];
                    const emailLogoName = 'EmailLogo_' + Date.now() + '.' + type;
                    const emailLogoPath = 'storeLogo/';
                    const base64Data = new Buffer(emaillogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((emailLogoPath + emailLogoName), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((emailLogoPath + emailLogoName), base64Data);
                    }
                    newSettings.emailLogo = emailLogoName;
                    newSettings.emailLogoPath = emailLogoPath;
                }
                if (settings.invoiceLogo) {
                    const invoiceLogo = settings.invoiceLogo;
                    const type = invoiceLogo.split(';')[0].split('/')[1];
                    const InvoiceLogoName = 'InvoiceLogo_' + Date.now() + '.' + type;
                    const InvoiceLogoPath = 'storeLogo/';
                    const base64Data = new Buffer(invoiceLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data);
                    }
                    newSettings.invoiceLogo = InvoiceLogoName;
                    newSettings.invoiceLogoPath = InvoiceLogoPath;
                }
                newSettings.maintainanceMode = settings.maintenanceMode;
                newSettings.storeLanguageName = settings.storeLanguageName;
                newSettings.storeCurrencyId = settings.storeCurrencyId;
                newSettings.storeImage = settings.storeImage;
                settingValue.invoicePrefix = settings.invoicePrefix;
                settingValue.orderStatus = settings.orderStatus;
                settingValue.categoryProductCount = settings.categoryProductCount;
                settingValue.itemsPerPage = settings.itemsPerPage;
                newSettings.google = settings.google;
                newSettings.facebook = settings.facebook;
                newSettings.twitter = settings.twitter;
                newSettings.instagram = settings.instagram;
                newSettings.isActive = settings.status;
                const createdData = yield this.settingService.create(newSettings);
                const successResponse = {
                    status: 1,
                    message: 'Settings created Successfully',
                    data: createdData,
                };
                return response.status(200).send(successResponse);
            }
            else {
                settingValue.url = settings.url;
                settingValue.metaTagTitle = settings.metaTagTitle;
                settingValue.metaTagDescription = settings.metaTagDescription;
                settingValue.metaTagKeyword = settings.metaTagKeywords;
                settingValue.storeName = settings.storeName;
                settingValue.storeOwner = settings.storeOwner;
                settingValue.storeAddress = settings.storeAddress;
                settingValue.countryId = settings.countryId;
                settingValue.zoneId = settings.zoneId;
                settingValue.storeEmail = settings.storeEmail;
                settingValue.storeTelephone = settings.storeTelephone;
                settingValue.storeFax = settings.storeFax;
                settingValue.storeLogo = settings.storeLogo;
                if (settings.storeLogo) {
                    const logo = settings.storeLogo;
                    const type = logo.split(';')[0].split('/')[1];
                    const name = 'Img_' + Date.now() + '.' + type;
                    const path = 'storeLogo/';
                    const base64Data = new Buffer(logo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((path + name), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((path + name), base64Data);
                    }
                    settingValue.storeLogo = name;
                    settingValue.storeLogoPath = path;
                }
                if (settings.emailLogo) {
                    const emaillogo = settings.emailLogo;
                    const type = emaillogo.split(';')[0].split('/')[1];
                    const emailLogoName = 'EmailLogo_' + Date.now() + '.' + type;
                    const emailLogoPath = 'storeLogo/';
                    const base64Data = new Buffer(emaillogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((emailLogoPath + emailLogoName), base64Data, type);
                    }
                    else {
                        yield this.imageService.imageUpload((emailLogoPath + emailLogoName), base64Data);
                    }
                    settingValue.emailLogo = emailLogoName;
                    settingValue.emailLogoPath = emailLogoPath;
                }
                if (settings.invoiceLogo) {
                    const invoiceLogo = settings.invoiceLogo;
                    const extType = invoiceLogo.split(';')[0].split('/')[1];
                    const InvoiceLogoName = 'InvoiceLogo_' + Date.now() + '.' + extType;
                    const InvoiceLogoPath = 'storeLogo/';
                    const base64Data = new Buffer(invoiceLogo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    if (env_1.env.imageserver === 's3') {
                        yield this.s3Service.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data, extType);
                    }
                    else {
                        yield this.imageService.imageUpload((InvoiceLogoPath + InvoiceLogoName), base64Data);
                    }
                    settingValue.invoiceLogo = InvoiceLogoName;
                    settingValue.invoiceLogoPath = InvoiceLogoPath;
                }
                settingValue.maintenanceMode = settings.maintenanceMode;
                settingValue.storeLanguageName = settings.storeLanguageName;
                settingValue.storeCurrencyId = settings.storeCurrencyId;
                settingValue.storeImage = settings.storeImage;
                settingValue.invoicePrefix = settings.invoicePrefix;
                settingValue.orderStatus = settings.orderStatus;
                settingValue.categoryProductCount = settings.categoryProductCount;
                settingValue.itemsPerPage = settings.itemsPerPage;
                settingValue.google = settings.google;
                settingValue.facebook = settings.facebook;
                settingValue.twitter = settings.twitter;
                settingValue.instagram = settings.instagram;
                settingValue.isActive = settings.status;
                const updatedData = yield this.settingService.create(settingValue);
                const successResponse = {
                    status: 1,
                    message: 'Settings Updated Successfully',
                    data: updatedData,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/get-settings'),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettingController.prototype, "settingsList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/create-settings'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateSettingRequest_1.CreateSettingRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SettingController.prototype, "createSettings", null);
SettingController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/settings'),
    tslib_1.__metadata("design:paramtypes", [SettingService_1.SettingService, S3Service_1.S3Service, ImageService_1.ImageService, CurrencyService_1.CurrencyService])
], SettingController);
exports.SettingController = SettingController;
//# sourceMappingURL=SettingController.js.map