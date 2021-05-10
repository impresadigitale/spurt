/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, JsonController, Res, Req, Authorized, Body, Get, QueryParam } from 'routing-controllers';
import { Quotation } from '../../models/Quotation';
import { QuotationRequest } from './requests/CreateQuotationRequest';
import { QuotationService } from '../../services/QuotationService';
import { ProductService } from '../../services/ProductService';
import { VendorProductService } from '../../services/VendorProductService';
import { VendorService } from '../../services/VendorService';
import { CustomerService } from '../../services/CustomerService';
import { EmailTemplateService } from '../../services/EmailTemplateService';
import { UserService } from '../../services/UserService';
import { SettingService } from '../../services/SettingService';
import { MAILService } from '../../../auth/mail.services';
import { env } from '../../../env';
import {ProductImageService} from '../../services/ProductImageService';

@JsonController('/quotation')
export class QuotationController {
    constructor(private quotationService: QuotationService, private productService: ProductService, private vendorProductService: VendorProductService, private vendorService: VendorService, private productImageService: ProductImageService,
                private customerService: CustomerService, private emailTemplateService: EmailTemplateService, private userService: UserService, private settingService: SettingService) {
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
    @Post('/quotation-request')
    @Authorized('customer')
    public async quotationRequest(@Body({ validate: true }) quotationParam: QuotationRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const product = await this.productService.findOne({
            where: {
                productId: quotationParam.productId,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid ProductId',
            };
            return response.status(400).send(errorResponse);
        }
        const quote = new Quotation();
        quote.productId = quotationParam.productId;
        quote.customerId = request.user.id;
        quote.quantity = quotationParam.quantity;
        quote.quantityUnit = quotationParam.quantityUnit;
        quote.orderValue = quotationParam.orderValue;
        quote.comments = quotationParam.comments;
        quote.purpose = quotationParam.purpose;
        const result = await this.quotationService.create(quote);
        const val = await this.vendorProductService.findOne({ where: { productId: quotationParam.productId } });
        const customer = await this.customerService.findOne({ where: { id: request.user.id } });
        const emailContent = await this.emailTemplateService.findOne(22);
        const adminId: any = [];
        const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1, deleteFlag: 0 } });
        const logo = await this.settingService.findOne();
        for (const user of adminUser) {
            const value = user.username;
            adminId.push(value);
        }
        if (val !== undefined) {
            const vendor = await this.vendorService.findOne({ where: { vendorId: val.vendorId } });
            const vendorCustomer = await this.customerService.findOne({ where: { id: vendor.customerId } });
            const vendorRedirectUrl = env.vendorRedirectUrl;
            const message = emailContent.content.replace('{name}', 'Vendor').replace('{title}', product.name).replace('{customername}', customer.firstName);
            MAILService.questionAndAnswerMail(logo, message, vendorCustomer.email, emailContent.subject, adminId, vendorRedirectUrl);
        } else {
            const adminRedirectUrl = env.adminRedirectUrl;
            const message = emailContent.content.replace('{name}', 'Admin').replace('{title}', product.name).replace('{customername}', customer.firstName);
            MAILService.questionAndAnswerMail(logo, message, adminId, emailContent.subject, [], adminRedirectUrl);
        }
        const quotation: any = {
            status: 1,
            message: 'Your quotation posted successfully.',
            data: result,
        };
        return response.status(200).send(quotation);

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
    @Get('/quotation-request-list')
    @Authorized('customer')
    public async reasonList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('productName') productName: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
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
            const quotationCount: any = await this.quotationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const countVal: any = {
                status: 1,
                message: 'Successfully listed quotation requested list count',
                data: quotationCount,
            };
            return response.status(200).send(countVal);
        }
        const quotationList: any = await this.quotationService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const promises = quotationList.map(async (result: any) => {
            const productImage = await this.productImageService.findOne({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = result;
            temp.images = productImage ? productImage : {};
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully listed quotation requested list',
            data: finalResult,
        };
        return response.status(200).send(successResponse);
    }
}
