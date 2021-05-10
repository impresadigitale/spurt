"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Quotation_1 = require("../../models/Quotation");
const CreateQuotationRequest_1 = require("./requests/CreateQuotationRequest");
const QuotationService_1 = require("../../services/QuotationService");
const ProductService_1 = require("../../services/ProductService");
const VendorProductService_1 = require("../../services/VendorProductService");
const VendorService_1 = require("../../services/VendorService");
const CustomerService_1 = require("../../services/CustomerService");
const EmailTemplateService_1 = require("../../services/EmailTemplateService");
const UserService_1 = require("../../services/UserService");
const SettingService_1 = require("../../services/SettingService");
const mail_services_1 = require("../../../auth/mail.services");
const env_1 = require("../../../env");
const ProductImageService_1 = require("../../services/ProductImageService");
let QuotationController = class QuotationController {
    constructor(quotationService, productService, vendorProductService, vendorService, productImageService, customerService, emailTemplateService, userService, settingService) {
        this.quotationService = quotationService;
        this.productService = productService;
        this.vendorProductService = vendorProductService;
        this.vendorService = vendorService;
        this.productImageService = productImageService;
        this.customerService = customerService;
        this.emailTemplateService = emailTemplateService;
        this.userService = userService;
        this.settingService = settingService;
    }
    // create Quotation Request API
    /**
     * @api {post} /api/quotation/quotation-request quotation request API
     * @apiGroup Store Quotation
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {String} quantityUnit quantityUnit
     * @apiParam (Request body) {String} orderValue orderValue
     * @apiParam (Request body) {Number} purpose 1-> for reselling 2-> for business 3-> for home use
     * @apiParam (Request body) {string} comments comments
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     *      "quantity" : "",
     *      "quantityUnit" : "",
     *      "orderValue" : "",
     *      "purpose" : "",
     *      "comments" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Requested for quote",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/quotation/quotation-request
     * @apiErrorExample {json} quotation  error
     * HTTP/1.1 500 Internal Server Error
     */
    quotationRequest(quotationParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId: quotationParam.productId,
                },
            });
            if (!product) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const quote = new Quotation_1.Quotation();
            quote.productId = quotationParam.productId;
            quote.customerId = request.user.id;
            quote.quantity = quotationParam.quantity;
            quote.quantityUnit = quotationParam.quantityUnit;
            quote.orderValue = quotationParam.orderValue;
            quote.comments = quotationParam.comments;
            quote.purpose = quotationParam.purpose;
            const result = yield this.quotationService.create(quote);
            const val = yield this.vendorProductService.findOne({ where: { productId: quotationParam.productId } });
            const customer = yield this.customerService.findOne({ where: { id: request.user.id } });
            const emailContent = yield this.emailTemplateService.findOne(22);
            const adminId = [];
            const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
            const logo = yield this.settingService.findOne();
            for (const user of adminUser) {
                const value = user.username;
                adminId.push(value);
            }
            if (val !== undefined) {
                const vendor = yield this.vendorService.findOne({ where: { vendorId: val.vendorId } });
                const vendorCustomer = yield this.customerService.findOne({ where: { id: vendor.customerId } });
                const vendorRedirectUrl = env_1.env.vendorRedirectUrl;
                const message = emailContent.content.replace('{name}', 'Vendor').replace('{title}', product.name).replace('{customername}', customer.firstName);
                mail_services_1.MAILService.questionAndAnswerMail(logo, message, vendorCustomer.email, emailContent.subject, adminId, vendorRedirectUrl);
            }
            else {
                const adminRedirectUrl = env_1.env.adminRedirectUrl;
                const message = emailContent.content.replace('{name}', 'Admin').replace('{title}', product.name).replace('{customername}', customer.firstName);
                mail_services_1.MAILService.questionAndAnswerMail(logo, message, adminId, emailContent.subject, [], adminRedirectUrl);
            }
            const quotation = {
                status: 1,
                message: 'Your quotation posted successfully.',
                data: result,
            };
            return response.status(200).send(quotation);
        });
    }
    // Quotation List
    /**
     * @api {get} /api/quotation/quotation-request-list Quotation Request List
     * @apiGroup Store Quotation
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "keyword": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Listed..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/quotation/quotation-request-list
     * @apiErrorExample {json} quotation List error
     * HTTP/1.1 500 Internal Server Error
     */
    // quotation request list Function
    reasonList(limit, offset, productName, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'Quotation.id as quotationId',
                'Quotation.quantity as quantity',
                'Quotation.quantityUnit as quantityUnit',
                'Quotation.orderValue as orderValue',
                'Quotation.purpose as purpose',
                'Quotation.comments as comments',
                'Quotation.productId as productId',
                'product.name as name',
                'Quotation.createdDate as createdDate',
                'Quotation.customerId as customerId',
            ];
            const relations = [
                {
                    tableName: 'Quotation.product',
                    aliasName: 'product',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'Quotation.customerId',
                op: 'where',
                value: request.user.id,
            });
            const searchConditions = [];
            if (productName && productName !== '') {
                searchConditions.push({
                    name: ['product.name'],
                    value: productName.toLowerCase(),
                });
            }
            const sort = [];
            sort.push({
                name: 'Quotation.createdDate',
                order: 'DESC',
            });
            if (count) {
                const quotationCount = yield this.quotationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const countVal = {
                    status: 1,
                    message: 'Successfully listed quotation requested list count',
                    data: quotationCount,
                };
                return response.status(200).send(countVal);
            }
            const quotationList = yield this.quotationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const promises = quotationList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productImage = yield this.productImageService.findOne({
                    select: ['productId', 'image', 'containerName', 'defaultImage'],
                    where: {
                        productId: result.productId,
                        defaultImage: 1,
                    },
                });
                const temp = result;
                temp.images = productImage ? productImage : {};
                return temp;
            }));
            const finalResult = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Successfully listed quotation requested list',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/quotation-request'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateQuotationRequest_1.QuotationRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationController.prototype, "quotationRequest", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/quotation-request-list'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('productName')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuotationController.prototype, "reasonList", null);
QuotationController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/quotation'),
    tslib_1.__metadata("design:paramtypes", [QuotationService_1.QuotationService, ProductService_1.ProductService, VendorProductService_1.VendorProductService, VendorService_1.VendorService, ProductImageService_1.ProductImageService,
        CustomerService_1.CustomerService, EmailTemplateService_1.EmailTemplateService, UserService_1.UserService, SettingService_1.SettingService])
], QuotationController);
exports.QuotationController = QuotationController;
//# sourceMappingURL=QuotationController.js.map