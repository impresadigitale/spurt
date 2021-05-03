/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post,
    Body,
    JsonController,
    Authorized,
    Res,
    Put,
    Param,
    Get,
    QueryParam,
    Delete,
    Req,
} from 'routing-controllers';
import { VendorCategoryService } from '../../services/VendorCategoryService';
import { VendorCategory } from '../../models/VendorCategory';
import { CreateVendorCategoryRequest } from './requests/CreateVendorCategoryRequest';
import { CategoryPathService } from '../../services/CategoryPathService';
import { VendorProductService } from '../../services/VendorProductService';

@JsonController('/vendor-category')
export class VendorCategoryController {
    constructor(private vendorCategoryService: VendorCategoryService,
                private categoryPathService: CategoryPathService,
                private vendorProductService: VendorProductService
    ) {
    }

    // Create vendor category API
    /**
     * @api {post} /api/vendor-category/create-vendor-category Create Vendor Category API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number}  vendorId vendorId
     * @apiParam (Request body) {String}  categoryId CategoryId
     * @apiParam (Request body) {Number}  commission commission
     * @apiParamExample {json} Input
     * {
     *      "vendorId" : "",
     *      "categoryId" : "",
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added category",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-category/create-vendor-category
     * @apiErrorExample {json} vendor category  error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-vendor-category')
    @Authorized()
    public async createVendorCategory(@Body({ validate: true }) vendorCategories: CreateVendorCategoryRequest, @Res() response: any): Promise<any> {
        const arr: any = [];
        const category = vendorCategories.categoryId;
        const splitId = category.split(',');
        for (const data of splitId) {
            const newVendorCategory: any = new VendorCategory();
            newVendorCategory.vendorId = vendorCategories.vendorId;
            newVendorCategory.categoryId = data;
            newVendorCategory.vendorCategoryCommission = 0;
            arr.push(newVendorCategory);
        }
        const categoryVendor = await this.vendorCategoryService.create(arr);
        if (categoryVendor !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added vendor category.',
                data: categoryVendor,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to add vendor category',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update vendor category API
    /**
     * @api {put} /api/vendor-category/update-vendor-category Update Vendor Category API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {Number}  commission commission
     * @apiParamExample {json} Input
     * {
     *      "vendorId" : "",
     *      "categoryId" : "",
     *      "commission" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully update",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-category/update-vendor-category
     * @apiErrorExample {json} vendor category  error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-vendor-category')
    @Authorized()
    public async updateVendorCategory(@Body({ validate: true }) updateParam: CreateVendorCategoryRequest, @Res() response: any): Promise<any> {
        const VendorsCategory = await this.vendorCategoryService.findAll({
            where: {
                vendorId: updateParam.vendorId,
            },
        });
        if (VendorsCategory.length > 0) {
            await this.vendorCategoryService.delete(VendorsCategory);
        }
        const arr: any = [];
        const category = updateParam.categoryId;
        const splitId = category.split(',');
        for (const data of splitId) {
            const newVendorCategory: any = new VendorCategory();
            newVendorCategory.vendorId = updateParam.vendorId;
            newVendorCategory.categoryId = data;
            newVendorCategory.vendorCategoryCommission = 0;
            arr.push(newVendorCategory);
        }
        const categoryVendor = await this.vendorCategoryService.create(arr);
        if (categoryVendor !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully update vendor category.',
                data: categoryVendor,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update vendor category',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Vendor Category List API
    /**
     * @api {get} /api/vendor-category/vendorCategoryList/:id Vendor Category List API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Boolean} count count should be number or boolean
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
     * @apiSampleRequest /api/vendor-category/vendorCategoryList/:id
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendorCategoryList/:id')
    @Authorized()
    public async vendorCategoryList(@Param('id') id: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [
            'CategoryPath.categoryId as categoryId',
            'category.sortOrder as sortOrder',
            'category.parentInt as parentInt',
            'category.name as name',
            'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
        ];

        const relations = [
            {
                tableName: 'CategoryPath.category',
                aliasName: 'category',
            },
            {
                tableName: 'CategoryPath.path',
                aliasName: 'path',
            },
            {
                tableName: 'category.vendorCategory',
                aliasName: 'vendorCategory',
            },
        ];
        const groupBy = [
            {
                name: 'CategoryPath.category_id',
            },
        ];

        const whereConditions = [];
        const searchConditions = [];

        whereConditions.push({
            name: 'vendorCategory.vendorId',
            op: 'and',
            value: id,
        });

        const sort = [];
        sort.push({
            name: 'vendorCategory.category_id',
            order: 'ASC',
        });
        const vendorCategoryList: any = await this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const findProduct = vendorCategoryList.map(async (val: any) => {
            const temp: any = val;
            const productToCategory = await this.vendorProductService.findingProduct(val.categoryId, id);
            if (productToCategory) {
                temp.productAvailable = 1;
            } else {
                temp.productAvailable = 0;
            }
            return temp;
        });
        const results = await Promise.all(findProduct);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the vendor category list.',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Vendor Category API
    /**
     * @api {delete} /api/vendor-category/delete-vendor-category/:id Delete Vendor Category API
     * @apiGroup Admin Vendor Category
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendor category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-category/delete-vendor-category/:id
     * @apiErrorExample {json} Vendor category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-vendor-category/:id')
    @Authorized()
    public async deleteVendorCategory(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const vendor = await this.vendorCategoryService.findOne({
            where: {
                vendoryCategoryId: id,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendoryCategoryId',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteVendor = await this.vendorCategoryService.delete(id);
        if (deleteVendor) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the vendor category.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete vendor category',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
