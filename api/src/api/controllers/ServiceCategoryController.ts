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
import { Get, Post, Put, Delete, Body, JsonController, Authorized, QueryParam, Param, Res, Req } from 'routing-controllers';
import { ServiceCategoryService } from '../services/ServiceCategoryService';
import { CreateServiceCategory } from './requests/CreateServiceCategoryRequest';
import { ServiceCategory } from '../models/ServiceCategory';
import { ServiceCategoryPath } from '../models/ServiceCategoryPath';
import { ServiceCategoryPathService } from '../services/ServiceCategoryPathService';
import { S3Service } from '../services/S3Service';
import { env } from '../../env';
import { ImageService } from '../services/ImageService';
import { ServiceToCategoryService } from '../services/ServiceToCategoryService';

@JsonController('/service-category')
export class ServiceCategoryController {
    constructor(
        private serviceCategoryService: ServiceCategoryService,
        private serviceCategoryPathService: ServiceCategoryPathService,
        private s3Service: S3Service,
        private serviceToCategoryService: ServiceToCategoryService,
        private imageService: ImageService) {
    }

    // create service Category API
    /**
     * @api {post} /api/service-category/add-service-category Add Service Category API
     * @apiGroup Service Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name Service Category name
     * @apiParam (Request body) {String} image Service Category image
     * @apiParam (Request body) {Number} parentInt Service Category  parentInt
     * @apiParam (Request body) {Number} sortOrder Service Category sortOrder
     * @apiParam (Request body) {String} metaTagTitle Service Category metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription Service Category metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword Service Category metaTagKeyword
     * @apiParam (Request body) {Number} status Service Category status 1-> Active 0-> inactive
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "image" : "",
     *      "parentInt" : "",
     *      "sortOrder" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Service Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/add-service-category
     * @apiErrorExample {json} Service Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-service-category')
    @Authorized()
    public async createServiceCategory(@Body({ validate: true }) category: CreateServiceCategory, @Res() response: any): Promise<ServiceCategory> {
        const newCategory = new ServiceCategory();
        newCategory.name = category.name;
        const image = category.image;
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'category/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const stringLength = image.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;
            if (+sizeInKb <= 2048) {
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'File size is too large for category image, give less than 2 mb. ',
                };
                return response.status(400).send(errorResponse);
            }
            newCategory.image = name;
            newCategory.imagePath = path;
        }
        newCategory.parentInt = category.parentInt ? category.parentInt : 0;
        newCategory.sortOrder = category.sortOrder;
        newCategory.metaTagTitle = category.metaTagTitle;
        newCategory.metaTagDescription = category.metaTagDescription;
        newCategory.metaTagKeyword = category.metaTagKeyword;
        newCategory.isActive = category.status;
        const categorySave = await this.serviceCategoryService.create(newCategory);
        const getAllPath: any = await this.serviceCategoryPathService.find({
            where: { serviceCategoryId: category.parentInt },
            order: { level: 'ASC' },
        });
        let level = 0;
        for (const path of getAllPath) {
            const CategoryPathLoop: any = new ServiceCategoryPath();
            CategoryPathLoop.serviceCategoryId = categorySave.serviceCategoryId;
            CategoryPathLoop.pathId = path.pathId;
            CategoryPathLoop.level = level;
            await this.serviceCategoryPathService.create(CategoryPathLoop);
            level++;
        }
        const newCategoryPath = new ServiceCategoryPath();
        newCategoryPath.serviceCategoryId = categorySave.serviceCategoryId;
        newCategoryPath.pathId = categorySave.serviceCategoryId;
        newCategoryPath.level = level;
        await this.serviceCategoryPathService.create(newCategoryPath);
        if (categorySave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created new category.',
                data: categorySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create the category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update service Category API
    /**
     * @api {put} /api/service-category/update-service-category/:id Update Service Category API
     * @apiGroup Service Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name ServiceCategory name
     * @apiParam (Request body) {String} image ServiceCategory image
     * @apiParam (Request body) {Number} parentInt ServiceCategory  parentInt
     * @apiParam (Request body) {Number} sortOrder ServiceCategory sortOrder
     * @apiParam (Request body) {String} metaTagTitle ServiceCategory metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription ServiceCategory metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword ServiceCategory metaTagKeyword
     * @apiParam (Request body) {Number} status ServiceCategory status 1-> Active 0-> inactive
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "parentInt" : "",
     *      "sortOrder" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Service Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/update-service-category/:id
     * @apiErrorExample {json} Service Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-service-category/:id')
    @Authorized()
    public async updateServiceCategory(@Param('id') id: number, @Body({ validate: true }) updateCategory: CreateServiceCategory, @Res() response: any, @Req() request: any): Promise<ServiceCategory> {
        const serviceCategoryId = await this.serviceCategoryService.findOne({ where: { serviceCategoryId: id } });
        if (!serviceCategoryId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid categoryId',
            };
            return response.status(400).send(errorResponse);
        }
        serviceCategoryId.name = updateCategory.name;
        const images = updateCategory.image;
        if (images) {
            const type = images.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'category/';
            const base64Data = new Buffer(images.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            const stringLength = images.replace(/^data:image\/\w+;base64,/, '').length;
            const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
            const sizeInKb = sizeInBytes / 1024;
            if (+sizeInKb <= 2048) {
                if (env.imageserver === 's3') {
                    await this.s3Service.imageUpload((path + name), base64Data, type);
                } else {
                    await this.imageService.imageUpload((path + name), base64Data);
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'File size is too large for category image, give less than 2 mb. ',
                };
                return response.status(400).send(errorResponse);
            }
            serviceCategoryId.image = name;
            serviceCategoryId.imagePath = path;
        }
        serviceCategoryId.parentInt = updateCategory.parentInt ? updateCategory.parentInt : 0;
        serviceCategoryId.sortOrder = updateCategory.sortOrder;
        serviceCategoryId.metaTagTitle = updateCategory.metaTagTitle;
        serviceCategoryId.metaTagDescription = updateCategory.metaTagDescription;
        serviceCategoryId.metaTagKeyword = updateCategory.metaTagKeyword;
        serviceCategoryId.isActive = updateCategory.status;
        const categorySave = await this.serviceCategoryService.create(serviceCategoryId);
        const deleteCategory = await this.serviceCategoryPathService.find({ where: { serviceCategoryId: id } });
        for (const val of deleteCategory) {
            await this.serviceCategoryPathService.delete(val.categoryPathId);
        }
        const getAllPath: any = await this.serviceCategoryPathService.find({
            where: { serviceCategoryId: updateCategory.parentInt },
            order: { level: 'ASC' },
        });
        let level = 0;
        for (const path of getAllPath) {
            const CategoryPathLoop: any = new ServiceCategoryPath();
            CategoryPathLoop.serviceCategoryId = categorySave.serviceCategoryId;
            CategoryPathLoop.pathId = path.pathId;
            CategoryPathLoop.level = level;
            this.serviceCategoryPathService.create(CategoryPathLoop);
            level++;
        }
        const newCategoryPath = new ServiceCategoryPath();
        newCategoryPath.serviceCategoryId = categorySave.serviceCategoryId;
        newCategoryPath.pathId = categorySave.serviceCategoryId;
        newCategoryPath.level = level;
        await this.serviceCategoryPathService.create(newCategoryPath);
        if (categorySave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated category.',
                data: categorySave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Service Category List API
    /**
     * @api {get} /api/service-category/service-category-list Service Category List API
     * @apiGroup Service Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status Status
     * @apiParam (Request body) {Number} sortOrder Sort order ( 1->ASC,  2->DESC )
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/service-category-list
     * @apiErrorExample {json} Service Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/service-category-list')
    @Authorized()
    public async serviceCategorylist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('sortOrder') sortOrder: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [
            'ServiceCategoryPath.serviceCategoryId as serviceCategoryId',
            'category.sortOrder as sortOrder',
            'category.parentInt as parentInt',
            'category.name as name',
            'category.image as image',
            'category.imagePath as imagePath',
            'category.metaTagTitle as metaTagTitle',
            'category.metaTagDescription as metaTagDescription',
            'category.metaTagKeyword as metaTagKeyword',
            'category.isActive as isActive',
            'category.createdDate as createdDate',
            'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'ServiceCategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
        ];
        const relations = [
            {
                tableName: 'ServiceCategoryPath.category',
                aliasName: 'category',
            },
            {
                tableName: 'ServiceCategoryPath.path',
                aliasName: 'path',
            },
        ];
        const groupBy = [
            {
                name: 'ServiceCategoryPath.service_category_id',
            },
        ];
        const whereConditions = [];
        if (status || status === 0) {
            whereConditions.push({
                name: 'category.isActive',
                op: 'or',
                value: status,
            });
        }
        const searchConditions = [];
        if (keyword && keyword !== '') {
            searchConditions.push({
                name: ['`category`.`name`'],
                value: keyword,
            });
        }
        const sort = [];
        if (sortOrder) {
            sort.push({
                name: 'category.sortOrder',
                order: sortOrder === 2 ? 'DESC' : 'ASC',
            });
        } else {
            sort.push({
                name: 'category.createdDate',
                order: 'DESC',
            });
        }
        if (count) {
            const counts = await this.serviceCategoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const sucResponse: any = {
                status: 1,
                message: 'Successfully got the service category list.',
                data: counts,
            };
            return response.status(200).send(sucResponse);
        }
        const vendorCategoryList = await this.serviceCategoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the service category list.',
            data: vendorCategoryList,
        };
        return response.status(200).send(successResponse);
    }
    // delete service Category API
    /**
     * @api {delete} /api/service-category/delete-service-category/:id Delete Service Category API
     * @apiGroup Service Category
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "Id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Service Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/delete-service-category/:id
     * @apiErrorExample {json} service category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-service-category/:id')
    @Authorized()
    public async deleteCategory(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<ServiceCategory> {
        const serviceCategoryId = await this.serviceCategoryService.findOne({ where: { serviceCategoryId: id } });
        if (!serviceCategoryId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid categoryId',
            };
            return response.status(400).send(errorResponse);
        }
        const parentCategoryId = await this.serviceCategoryService.findOne({ where: { parentInt: id } });
        if (parentCategoryId) {
            const errorresponse: any = {
                status: 0,
                message: 'you cannot delete parent categoryId',
            };
            return response.status(400).send(errorresponse);
        }
        const serviceToCategory = await this.serviceToCategoryService.findOne({
            where: {
                serviceCategoryId: id,
            },
        });
        if (serviceToCategory) {
            const errorresponse: any = {
                status: 0,
                message: 'This category is mapping to service so you cannot delete.',
            };
            return response.status(400).send(errorresponse);
        }
        const categoryPath: any = await this.serviceCategoryPathService.find({ where: { serviceCategoryId: id } });
        for (const path of categoryPath) {
            await this.serviceCategoryPathService.delete(path.categoryPathId);
        }
        const deleteCategory = await this.serviceCategoryService.delete(serviceCategoryId);
        if (!deleteCategory) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted category.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to delete the category. ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // service category Detail
    /**
     * @api {get} /api/service-category/service-category-detail Service Category Detail API
     * @apiGroup Service Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} serviceCategoryId serviceCategoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Service Category detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/service-category-detail
     * @apiErrorExample {json} service category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/service-category-detail')
    @Authorized()
    public async serviceCategoryDetail(@QueryParam('serviceCategoryId') serviceCategoryId: number, @Res() response: any): Promise<any> {
        const category = await this.serviceCategoryService.findOne({
            where: {
                serviceCategoryId,
            },
        });
        if (!category) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Category Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got service category detail',
            data: category,
        };
        return response.status(200).send(successResponse);
    }

    // Service Category Count API
    /**
     * @api {get} /api/service-category/service-category-count Service Category Count API
     * @apiGroup Service Category
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} status status
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the service category count.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/service-category/service-category-count
     * @apiErrorExample {json} Service error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/service-category-count')
    @Authorized()
    public async serviceCategoryCount(@QueryParam('keyword') keyword: string, @QueryParam('status') status: string, @Res() response: any): Promise<any> {
        const select = [];
        const search = [{
            name: 'name',
            op: 'like',
            value: keyword,
        }];
        if (status) {
            search.push({
                name: 'isActive',
                op: 'like',
                value: status,
            });
        }
        const WhereConditions = [];
        const serviceCategoryCount = await this.serviceCategoryService.list(0, 0, select, search, WhereConditions, 0, 1);
        const successResponse: any = {
            status: 1,
            message: 'successfully got the service category count.',
            data: serviceCategoryCount,
        };
        return response.status(200).send(successResponse);
    }
}
