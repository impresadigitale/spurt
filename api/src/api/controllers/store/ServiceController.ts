/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Post, Body, JsonController, Res, QueryParam } from 'routing-controllers';
import { ServiceService } from '../../services/ServiceService';
import { ServiceEnquiryService } from '../../services/ServiceEnquiryService';
import { ServiceCategoryService } from '../../services/ServiceCategoryService';
import { ServiceEnquiry } from '../../models/ServiceEnquiry';
import { ServiceCategory } from '../../models/ServiceCategory';
import { EnquiryRequest } from './requests/CreateEnquiryRequest';
import { EmailTemplateService } from '../../services/EmailTemplateService';
import { ServiceImageService } from '../../services/ServiceImageService';
import arrayToTree from 'array-to-tree';
import { MAILService } from '../../../auth/mail.services';
import { SettingService } from '../../services/SettingService';
import { env } from '../../../env';

@JsonController('/store-service')
export class StoreServiceController {
    constructor(private serviceService: ServiceService, private serviceEnquiryService: ServiceEnquiryService, private settingService: SettingService,
                private serviceCategoryService: ServiceCategoryService, private emailTemplateService: EmailTemplateService, private serviceImageService: ServiceImageService) {
    }

    // Service List API
    /**
     * @api {get} /api/store-service/service-list Service List API
     * @apiGroup Store Service
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} categoryId categoryId in number
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get service list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-service/service-list
     * @apiErrorExample {json} store-service error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/service-list')
    public async ServiceList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('categoryId') categoryId: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['service.serviceId AS serviceId', 'service.title AS title', 'mobile', 'description', 'price', 'service.isActive AS isActive', 'service.createdDate AS createdDate'];
        const searchConditions = [
            {
                name: 'service.title',
                op: 'and',
                value: keyword,
            }, {
                name: 'service.isActive',
                op: 'or',
                value: 1,
            },
        ];
        const whereConditions: any = [{
            name: 'service.serviceId',
            op: 'inraw',
            value: categoryId,
        }];
        const serviceList = await this.serviceService.serviceList(limit, offset, select, searchConditions, whereConditions, categoryId, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully got service count',
                data: serviceList,
            };
            return response.status(200).send(Response);
        }
        const promise = serviceList.map(async (val: any) => {
            const serviceimage = await this.serviceImageService.findOne({
                select: ['serviceId', 'image', 'containerName', 'defaultImage'],
                where: {
                    serviceId: val.serviceId,
                    defaultImage: 1,
                },
            });
            const temp: any = val;
            temp.serviceImage = serviceimage;
            return temp;
        });
        const finalResult = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all service List',
            data: finalResult,
        };
        return response.status(200).send(successResponse);
    }

    // store service Enquiry API
    /**
     * @api {post} /api/store-service/service-enquiry Add Service Enquiry API
     * @apiGroup Store Service
     * @apiParam (Request body) {Number} serviceId serviceId(required)
     * @apiParam (Request body) {String} name name(required)
     * @apiParam (Request body) {String} email email(required)
     * @apiParam (Request body) {Number} mobile mobile(required)
     * @apiParam (Request body) {String} comments comments
     * @apiParamExample {json} Input
     * {
     *      "serviceId" : "",
     *      "name" : "",
     *      "email" : "",
     *      "mobile" : "",
     *      "comments" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your enquiry is sended successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-service/store-enquiry
     * @apiErrorExample {json} Enquiry error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/store-enquiry')
    public async SendEnquiry(@Body({ validate: true }) enquiryParam: EnquiryRequest, @Res() response: any): Promise<any> {
        const enquiry = new ServiceEnquiry();
        enquiry.serviceId = enquiryParam.serviceId;
        enquiry.name = enquiryParam.name;
        enquiry.email = enquiryParam.email;
        enquiry.mobile = enquiryParam.mobile;
        enquiry.comments = enquiryParam.comments;
        enquiry.isActive = 1;
        const enquirySave = await this.serviceEnquiryService.create(enquiry);
        const getServiceData = await this.serviceService.findOne({ select: ['title'], where: { serviceId: enquirySave.serviceId } });
        if (enquirySave) {
            const emailContent = await this.emailTemplateService.findOne(8);
            const logo = await this.settingService.findOne();
            const message = emailContent.content.replace('{name}', enquiryParam.name).replace('{email}', enquiryParam.email).replace('{mobile}',
                enquiryParam.mobile).replace('{comments}', enquiryParam.comments).replace('{title}', getServiceData.title);
            const redirectUrl = env.storeRedirectUrl;
            MAILService.customerLoginMail(logo, message, enquiryParam.email, emailContent.subject, redirectUrl);
            const successResponse: any = {
                status: 1,
                message: 'Enquiry send successfully',
                data: enquirySave,
            };
            return response.status(200).send(successResponse);
        }
    }
    // Service Category List API
    /**
     * @api {get} /api/store-service/category-list Category List API
     * @apiGroup Store Service
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list.",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/store-service/category-list
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category-list')
    public async CategoryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<ServiceCategory> {
        const select = ['serviceCategoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive'];
        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
        ];
        const WhereConditions = [
            {
                name: 'isActive',
                value: 1,
            },
        ];
        const category: any = await this.serviceCategoryService.list(limit, offset, select, search, WhereConditions, 0, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got category list count',
                data: category,
            };
            return response.status(200).send(successResponse);
        } else {
            const categoryList = arrayToTree(category, {
                parentProperty: 'parentInt',
                customID: 'serviceCategoryId',
            });
            const successResponse: any = {
                status: 1,
                message: 'successfully got the service category list.',
                data: categoryList,
            };
            return response.status(200).send(successResponse);
        }
    }
}
