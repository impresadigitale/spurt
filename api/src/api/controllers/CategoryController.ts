/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Post, Put, Delete, Body, JsonController, Authorized, QueryParam, Res, Req } from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import { CategoryService } from '../services/CategoryService';
import { AddCategory } from './requests/AddCategoryRequest';
import { UpdateCategoryRequest } from './requests/UpdateCategoryRequest';
import { Category } from '../models/CategoryModel';
import { CategoryPath } from '../models/CategoryPath';
import arrayToTree from 'array-to-tree';
import { DeleteCategoryRequest } from './requests/DeleteCategoryRequest';
import { CategoryPathService } from '../services/CategoryPathService';
import { S3Service } from '../services/S3Service';
import { env } from '../../env';
import { ImageService } from '../services/ImageService';
import { WidgetItemService } from '../services/WidgetItemService';

@JsonController()
export class CategoryController {
    constructor(private categoryService: CategoryService,
                private categoryPathService: CategoryPathService,
                private s3Service: S3Service,
                private widgetItemService: WidgetItemService,
                private imageService: ImageService) {
    }

    // create Category API
    /**
     * @api {post} /api/add-category Add Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name Category name
     * @apiParam (Request body) {String} image Category image
     * @apiParam (Request body) {number} parentInt Category  parentInt
     * @apiParam (Request body) {number} sortOrder Category sortOrder
     * @apiParam (Request body) {String} metaTagTitle Category metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription Category metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword Category metaTagKeyword
     * @apiParam (Request body) {Number} status Category status 1-> Active 0-> inactive
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
     *      "message": "Successfully created new Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/add-category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-category')
    @Authorized()
    public async addCategory(@Body({ validate: true }) category: AddCategory, @Res() response: any): Promise<Category> {
        const newCategory = new Category();
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
                    message: 'File size is too large, give less than 2 mb. ',
                };
                return response.status(400).send(errorResponse);
            }
            newCategory.image = name;
            newCategory.imagePath = path;
        }
        newCategory.parentInt = category.parentInt;
        newCategory.sortOrder = category.sortOrder;
        newCategory.metaTagTitle = category.metaTagTitle;
        const metaTagTitle = category.metaTagTitle;
        if (metaTagTitle) {
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getCategorySlug = await this.categoryService.find({ where: { metaTagTitle: category.metaTagTitle } });
            if (getCategorySlug.length === 0) {
                newCategory.categorySlug = data;
            } else if (getCategorySlug.length === 1 && (data === getCategorySlug[0].categorySlug)) {
                newCategory.categorySlug = data + '-' + 1;
            } else {
                const slugVal = getCategorySlug[getCategorySlug.length - 1];
                const val = slugVal.categorySlug;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                newCategory.categorySlug = data + '-' + (slugNumber + 1);
            }
        } else {
            const title = category.name;
            const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getCategorySlug = await this.categoryService.find({ where: { name: category.name } });
            if (getCategorySlug.length === 0) {
                newCategory.categorySlug = data;
            } else if (getCategorySlug.length === 1 && (data === getCategorySlug[0].categorySlug)) {
                newCategory.categorySlug = data + '-' + 1;
            } else {
                const slugVal = getCategorySlug[getCategorySlug.length - 1];
                const val = slugVal.categorySlug;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                newCategory.categorySlug = data + '-' + (slugNumber + 1);
            }
        }
        newCategory.metaTagDescription = category.metaTagDescription;
        newCategory.metaTagKeyword = category.metaTagKeyword;
        newCategory.isActive = category.status;
        const categorySave = await this.categoryService.create(newCategory);
        const getAllPath: any = await this.categoryPathService.find({
            where: { categoryId: category.parentInt },
            order: { level: 'ASC' },
        });
        let level = 0;
        for (const path of getAllPath) {
            const CategoryPathLoop: any = new CategoryPath();
            CategoryPathLoop.categoryId = categorySave.categoryId;
            CategoryPathLoop.pathId = path.pathId;
            CategoryPathLoop.level = level;
            await this.categoryPathService.create(CategoryPathLoop);
            level++;
        }

        const newCategoryPath = new CategoryPath();
        newCategoryPath.categoryId = categorySave.categoryId;
        newCategoryPath.pathId = categorySave.categoryId;
        newCategoryPath.level = level;
        await this.categoryPathService.create(newCategoryPath);

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

    // Update Category API
    /**
     * @api {put} /api/update-category/:id Update Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} categoryId Category categoryId
     * @apiParam (Request body) {String} name Category name
     * @apiParam (Request body) {String} image Category image
     * @apiParam (Request body) {number} parentInt Category  parentInt
     * @apiParam (Request body) {number} sortOrder Category sortOrder
     * @apiParam (Request body) {String} metaTagTitle Category metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription Category metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword Category metaTagKeyword
     * @apiParam (Request body) {Number} status Category status 1-> Active 0-> inactive
     * @apiParamExample {json} Input
     * {
     *      "categoryId" : "",
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
     *      "message": "Successfully updated Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/update-category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-category/:id')
    @Authorized()
    public async updateCategory(@Body({ validate: true }) category: UpdateCategoryRequest, @Res() response: any, @Req() request: any): Promise<Category> {
        const categoryId = await this.categoryService.findOne({
            where: {
                categoryId: category.categoryId,
            },
        });
        if (!categoryId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid categoryId',
            };
            return response.status(400).send(errorResponse);
        }
        categoryId.name = category.name;
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
                    message: 'File size is too large, give less than 2 mb. ',
                };
                return response.status(400).send(errorResponse);
            }
            categoryId.image = name;
            categoryId.imagePath = path;
        }
        categoryId.parentInt = category.parentInt;
        categoryId.sortOrder = category.sortOrder;
        categoryId.metaTagTitle = category.metaTagTitle;
        const metaTagTitle = category.metaTagTitle;
        if (metaTagTitle) {
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getCategorySlug = await this.categoryService.slugData(metaTagTitle);
            if (getCategorySlug.length === 0 || getCategorySlug === '' || getCategorySlug === undefined) {
                categoryId.categorySlug = data;
            } else if (getCategorySlug.length === 1 && (metaTagTitle !== getCategorySlug[getCategorySlug.length - 1].metaTagTitle) && (data === getCategorySlug[0].categorySlug)) {
                categoryId.categorySlug = data + '-' + 1;
            } else if (getCategorySlug.length > 1 && getCategorySlug !== undefined && getCategorySlug !== '') {
                const slugVal = getCategorySlug[getCategorySlug.length - 1];
                const val = slugVal.categorySlug;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                categoryId.categorySlug = data + '-' + (slugNumber + 1);
            }
        } else {
            const title = category.name;
            const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getCategorySlug = await this.categoryService.slugData(title);
            if (getCategorySlug === '' || getCategorySlug === undefined || getCategorySlug.length === 0) {
                categoryId.categorySlug = data;
            } else if (getCategorySlug.length === 1 && (title !== getCategorySlug[getCategorySlug.length - 1].name) && (data === getCategorySlug[0].categorySlug)) {
                categoryId.categorySlug = data + '-' + 1;
            } else if (getCategorySlug.length > 1 && getCategorySlug !== undefined && getCategorySlug !== '') {
                const slugVal = getCategorySlug[getCategorySlug.length - 1];
                const val = slugVal.categorySlug;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                categoryId.categorySlug = data + '-' + (slugNumber + 1);
            }
        }
        categoryId.metaTagDescription = category.metaTagDescription;
        categoryId.metaTagKeyword = category.metaTagKeyword;
        categoryId.isActive = category.status;
        const categorySave = await this.categoryService.create(categoryId);

        const deleteCategory = await this.categoryPathService.find({ where: { categoryId: category.categoryId } });
        for (const val of deleteCategory) {
            await this.categoryPathService.delete(val.categoryPathId);
        }

        const getAllPath: any = await this.categoryPathService.find({
            where: { categoryId: category.parentInt },
            order: { level: 'ASC' },
        });
        let level = 0;
        for (const path of getAllPath) {
            const CategoryPathLoop: any = new CategoryPath();
            CategoryPathLoop.categoryId = categorySave.categoryId;
            CategoryPathLoop.pathId = path.pathId;
            CategoryPathLoop.level = level;
            this.categoryPathService.create(CategoryPathLoop);
            level++;
        }

        const newCategoryPath = new CategoryPath();
        newCategoryPath.categoryId = categorySave.categoryId;
        newCategoryPath.pathId = categorySave.categoryId;
        newCategoryPath.level = level;
        await this.categoryPathService.create(newCategoryPath);

        if (+category.status === 0) {
            const categories = await this.categoryPathService.find({ where: { pathId: categorySave.categoryId } });
            for (const cat of categories) {
                const disableCategory = await this.categoryService.findOne({ where: { categoryId: cat.categoryId } });
                disableCategory.isActive = 0;
                await this.categoryService.create(disableCategory);
            }

        } else {
            const categories = await this.categoryPathService.find({ where: { pathId: categorySave.categoryId } });
            for (const cat of categories) {
                const disableCategory = await this.categoryService.findOne({ where: { categoryId: cat.categoryId } });
                disableCategory.isActive = 1;
                await this.categoryService.create(disableCategory);
            }
        }

        if (categorySave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated category.',
                data: classToPlain(categorySave),
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

    // delete Category API
    /**
     * @api {delete} /api/delete-category/:id Delete Category API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} categoryId Category categoryId
     * @apiParamExample {json} Input
     * {
     *      "categoryId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Category.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/delete-category/:id
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-category/:id')
    @Authorized()
    public async deleteCategory(@Body({ validate: true }) category: DeleteCategoryRequest, @Res() response: any, @Req() request: any): Promise<Category> {

        const categoryId = await this.categoryService.findOne({
            where: {
                categoryId: category.categoryId,
            },
        });
        if (!categoryId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid categoryId',
            };
            return response.status(400).send(errorResponse);
        }
        const parentCategoryId = await this.categoryService.findOne({
            where: {
                parentInt: category.categoryId,
            },
        });
        if (parentCategoryId) {
            const errorresponse: any = {
                status: 0,
                message: 'you cannot delete parent categoryId',
            };
            return response.status(400).send(errorresponse);
        }
        const categoryPath: any = await this.categoryPathService.find({ where: { categoryId: category.categoryId } });
        for (const path of categoryPath) {
            await this.categoryPathService.delete(path.categoryPathId);
        }

        const widgetCategoryItems = await this.widgetItemService.findCategory(category.categoryId);
        for (const relatedCategoryItem of widgetCategoryItems) {
            await this.widgetItemService.delete(relatedCategoryItem.id);
        }
        const deleteCategory = await this.categoryService.delete(categoryId);
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

    // Category List API
    /**
     * @api {get} /api/categorylist Category List API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/categorylist
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/categorylist')
    @Authorized()
    public async categorylist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [
            'CategoryPath.categoryId as categoryId',
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
        ];
        const groupBy = [
            {
                name: 'CategoryPath.category_id',
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
                name: ['category.name'],
                value: keyword,
            });
        }

        const sort = [];
        if (sortOrder) {
            sort.push({
                name: 'sortOrder',
                order: sortOrder === 2 ? 'DESC' : 'ASC',
            });
        } else {
            sort.push({
                name: 'createdDate',
                order: 'DESC',
            });
        }

        const vendorCategoryList = await this.categoryPathService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the vendor category list.',
            data: vendorCategoryList,
        };
        return response.status(200).send(successResponse);
    }

    // Category List Tree API
    /**
     * @api {get} /api/category-list-intree Category List InTree API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category list.",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-list-intree
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category-list-intree')
    @Authorized()
    public async categoryListTree(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<Category> {
        const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive'];

        const search = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            },
        ];
        const WhereConditions = [];
        const category: any = await this.categoryService.list(limit, offset, select, search, WhereConditions, sortOrder, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get category List count',
                data: category,
            };
            return response.status(200).send(successResponse);
        } else {
            const categoryList = arrayToTree(category, {
                parentProperty: 'parentInt',
                customID: 'categoryId',
            });
            const successResponse: any = {
                status: 1,
                message: 'successfully got the complete category list.',
                data: categoryList,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Update Category Slug API
    /**
     * @api {put} /api/update-category-slug Update Category Slug API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Category Slug.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/update-category-slug
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-category-slug')
    public async updateSlug(@Res() response: any): Promise<Category> {
        const arr = [];
        const category = await this.categoryService.findAll();
        for (const val of category) {
            const metaTagTitle = val.metaTagTitle;
            if (metaTagTitle) {
                const dat = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const data = dat.replace(/--/gi, '-');
                const getCategorySlug = await this.categoryService.slug(metaTagTitle);
                if (getCategorySlug.length === 0 || getCategorySlug === '' || getCategorySlug === undefined) {
                    val.categorySlug = data;
                } else if (getCategorySlug.length === 1 && (metaTagTitle !== getCategorySlug[getCategorySlug.length - 1].metaTagTitle)) {
                    val.categorySlug = data + '-' + 1;
                } else if (getCategorySlug.length > 1 && getCategorySlug !== undefined && getCategorySlug !== '') {
                    const slugVal = getCategorySlug[getCategorySlug.length - 1];
                    const value = slugVal.categorySlug;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    val.categorySlug = data + '-' + (slugNumber + 1);
                }
            } else {
                const title = val.name;
                const dat = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const data = dat.replace(/--/gi, '-');
                const getCategorySlug = await this.categoryService.slug(title);
                if (getCategorySlug === '' || getCategorySlug === undefined || getCategorySlug.length === 0) {
                    val.categorySlug = data;
                } else if (getCategorySlug.length === 1 && (title !== getCategorySlug[getCategorySlug.length - 1].title)) {
                    val.categorySlug = data + '-' + 1;
                } else if (getCategorySlug.length > 1 && getCategorySlug !== undefined && getCategorySlug !== '') {
                    const slugVal = getCategorySlug[getCategorySlug.length - 1];
                    const value = slugVal.categorySlug;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    val.categorySlug = data + '-' + (slugNumber + 1);
                }
            }
            arr.push(val);
        }
        await this.categoryService.create(arr);
        const successResponse: any = {
            status: 1,
            message: 'successfully update the category slug.',
        };
        return response.status(200).send(successResponse);
    }

    // Category List API
    /**
     * @api {get} /api/category-count Category Count API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} status status
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the complete category count.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-count
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category-count')
    @Authorized()
    public async categorycount(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('status') status: number, @Res() response: any): Promise<any> {
        const productCount = await this.categoryService.categoryCount(limit, offset, keyword, sortOrder, status);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Product Count',
            data: {
                productCount: productCount.categoryCount,
            },
        };
        return response.status(200).send(successResponse);
    }

    // category Detail
    /**
     * @api {get} /api/category-detail Category Detail API
     * @apiGroup Category
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Category detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/category-detail
     * @apiErrorExample {json} category error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/category-detail')
    @Authorized()
    public async CategoryDetail(@QueryParam('categoryId') categoryId: number, @Res() response: any): Promise<any> {
        const category = await this.categoryService.findOne({
            where: {
                categoryId,
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
            message: 'Successfully got category detail',
            data: category,
        };
        return response.status(200).send(successResponse);
    }
}
