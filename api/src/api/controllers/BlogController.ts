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
import { Get, Put, Post, Delete, Body, QueryParam, Param, JsonController, Authorized, Res, Req } from 'routing-controllers';
import { Blog } from '../models/Blog';
import { BlogService } from '../services/BlogService';
import { env } from '../../env';
import { CreateBlog } from './requests/CreateBlogRequest';
import { DeleteBlog } from './requests/DeleteBlogRequest';
import { S3Service } from '../services/S3Service';
import { ImageService } from '../services/ImageService';
import { CategoryService } from '../services/CategoryService';
import { BlogRelatedService } from '../services/BlogRelatedService';
import { BlogRelated } from '../models/BlogRelated';

@JsonController('/blog')
export class BlogController {
    constructor(private blogService: BlogService, private s3Service: S3Service, private blogRelatedService: BlogRelatedService,
                private imageService: ImageService, private categoryService: CategoryService) {
    }

    // Create Blog
    /**
     * @api {post} /api/blog/add-blog Add Blog API
     * @apiGroup Blog
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {Number} categoryId category id
     * @apiParam (Request body) {String} description description
     * @apiParam (Request body) {String} image image
     * @apiParam (Request body) {Number} status status/isActive
     * @apiParam (Request body) {String} metaTagTitle meta tag title
     * @apiParam (Request body) {String} metaTagDescription meta tag description
     * @apiParam (Request body) {String} metaTagKeyword meta tag keyword
     * @apiParam (Request body) {String} relatedBlogId relatedBlogId
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "categoryId" : "",
     *      "description" : ""
     *      "image" : "",
     *      "status" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagkeyword" : "",
     *      "relatedBlogId" : [],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New blog is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog/add-blog
     * @apiErrorExample {json} Add Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-blog')
    @Authorized()
    public async createBlog(@Body({ validate: true }) blogParam: CreateBlog, @Req() request: any, @Res() response: any): Promise<any> {
        const category = blogParam.categoryId;
        const getcategory = await this.categoryService.findOne(category);
        if (!getcategory) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Category Id',
            };
            return response.status(400).send(errorResponse);
        }
        const image = blogParam.image;
        const newBlog = new Blog();
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'blog/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }
            newBlog.image = name;
            newBlog.imagePath = path;
        }
        newBlog.title = blogParam.title;
        newBlog.categoryId = blogParam.categoryId;
        newBlog.description = blogParam.description;
        newBlog.isActive = blogParam.status;
        newBlog.metaTagTitle = blogParam.metaTagTitle;
        newBlog.metaTagDescription = blogParam.metaTagDescription;
        newBlog.metaTagKeyword = blogParam.metaTagKeyword;
        newBlog.createdBy = request.user.userId;
        const metaTagTitle = blogParam.metaTagTitle;
        if (metaTagTitle) {
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getBlogSlug = await this.blogService.slugData(metaTagTitle);
            if (getBlogSlug.length === 0) {
                newBlog.blogSlug = data;
            } else if (getBlogSlug.length === 1 && (data === getBlogSlug[0].blogSlug)) {
                newBlog.blogSlug = data + '-' + 1;
            } else {
                const slugVal = getBlogSlug[getBlogSlug.length - 1];
                const value = slugVal.blogSlug;
                const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                const slugNumber = parseInt(getSlugInt, 0);
                newBlog.blogSlug = data + '-' + (slugNumber + 1);
            }
        } else {
            const title = blogParam.title;
            const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getBlogSlug = await this.blogService.slugData(title);
            if (getBlogSlug.length === 0) {
                newBlog.blogSlug = data;
            } else if (getBlogSlug.length === 1 && (data === getBlogSlug[0].blogSlug)) {
                newBlog.blogSlug = data + '-' + 1;
            } else {
                const slugVal = getBlogSlug[getBlogSlug.length - 1];
                const value = slugVal.blogSlug;
                const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                const slugNumber = parseInt(getSlugInt, 0);
                newBlog.blogSlug = data + '-' + (slugNumber + 1);
            }
        }
        const blogSave = await this.blogService.create(newBlog);
        // Add related blog
        if (blogParam.relatedBlogId) {
            const relatedBlog: any = blogParam.relatedBlogId;
            for (const relatedblog of relatedBlog) {
                const newBlogRelated: any = new BlogRelated();
                newBlogRelated.blogId = blogSave.id;
                newBlogRelated.relatedBlogId = relatedblog;
                newBlogRelated.isActive = 1;
                await this.blogRelatedService.create(newBlogRelated);
            }
        }
        if (blogSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created new blog.',
                data: blogSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to create new blog. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Blog List
    /**
     * @api {get} /api/blog/blog-list Blog List API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} categoryId categoryId
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Blog list",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog/blog-list
     * @apiErrorExample {json} Blog List error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/blog-list')
    @Authorized()
    public async BlogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('categoryId') categoryId: number, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['id', 'title', 'categoryId', 'description', 'image', 'imagePath', 'isActive', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'blogSlug', 'createdDate'];
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            }, {
                name: 'categoryId',
                op: 'like',
                value: categoryId,
            }, {
                name: 'isActive',
                op: 'where',
                value: status,
            },
        ];
        const WhereConditions = [];
        const getBlogList: any = await this.blogService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got blog count',
                data: getBlogList,
            };
            return response.status(200).send(successResponse);
        } else {
            const blogList = getBlogList.map(async (val: any) => {
                const datas: any = val;
                const getCategoryName = await this.categoryService.findOne({
                    where: { categoryId: val.categoryId },
                    select: ['name'],
                });
                if (getCategoryName) {
                    datas.categoryName = getCategoryName.name;
                }
                return datas;
            });
            const results = await Promise.all(blogList);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got blog list',
                data: results,
            };
            return response.status(200).send(successResponse);
        }
    }
    // Update Blog
    /**
     * @api {put} /api/blog/update-blog/:id Update Blog API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {Number} categoryId category id
     * @apiParam (Request body) {String} description description
     * @apiParam (Request body) {String} image image
     * @apiParam (Request body) {Number} status status/isActive
     * @apiParam (Request body) {String} metaTagTitle meta tag title
     * @apiParam (Request body) {String} metaTagDescription meta tag description
     * @apiParam (Request body) {String} metaTagKeyword meta tag keyword
     * @apiParam (Request body) {String} relatedBlogId relatedBlogId
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "categoryId" : "",
     *      "description" : ""
     *      "image" : "",
     *      "status" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagkeyword" : "",
     *      "relatedBlogId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated blog.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog/update-blog/:id
     * @apiErrorExample {json} Update Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-blog/:id')
    @Authorized()
    public async updateBlog(@Param('id') blogId: number, @Body({ validate: true }) blogParam: CreateBlog, @Res() response: any, @Req() request: any): Promise<any> {
        const blog = await this.blogService.findOne(blogId);
        if (!blog) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid blog',
            };
            return response.status(400).send(errorResponse);
        }
        const category = blogParam.categoryId;
        const getcategory = await this.categoryService.findOne(category);
        if (!getcategory) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Category Id',
            };
            return response.status(400).send(errorResponse);
        }
        const image = blogParam.image;
        if (image) {
            const type = image.split(';')[0].split('/')[1];
            const name = 'Img_' + Date.now() + '.' + type;
            const path = 'blog/';
            const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            if (env.imageserver === 's3') {
                await this.s3Service.imageUpload((path + name), base64Data, type);
            } else {
                await this.imageService.imageUpload((path + name), base64Data);
            }
            blog.image = name;
            blog.imagePath = path;
        }
        blog.title = blogParam.title;
        blog.categoryId = blogParam.categoryId;
        blog.description = blogParam.description;
        blog.isActive = blogParam.status;
        blog.metaTagTitle = blogParam.metaTagTitle;
        blog.metaTagDescription = blogParam.metaTagDescription;
        blog.metaTagKeyword = blogParam.metaTagKeyword;
        blog.createdBy = request.user.userId;
        const metaTagTitle = blogParam.metaTagTitle;
        if (metaTagTitle) {
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getBlogSlug = await this.blogService.slugData(metaTagTitle);
            if (getBlogSlug.length === 0 || getBlogSlug === '' || getBlogSlug === undefined) {
                blog.blogSlug = data;
            } else if (getBlogSlug.length === 1 && (metaTagTitle !== getBlogSlug[getBlogSlug.length - 1].metaTagTitle)) {
                blog.blogSlug = data + '-' + 1;
            } else if (getBlogSlug.length > 1 && getBlogSlug !== undefined && getBlogSlug !== '') {
                const slugVal = getBlogSlug[getBlogSlug.length - 1];
                const val = slugVal.blogSlug;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                blog.blogSlug = data + '-' + (slugNumber + 1);
            }
        } else {
            const title = blogParam.title;
            const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getBlogSlug = await this.blogService.slugData(title);
            if (getBlogSlug === '' || getBlogSlug === undefined || getBlogSlug.length === 0) {
                blog.blogSlug = data;
            } else if (getBlogSlug.length === 1 && (title !== getBlogSlug[getBlogSlug.length - 1].title)) {
                blog.blogSlug = data + '-' + 1;
            } else if (getBlogSlug.length > 1 && getBlogSlug !== undefined && getBlogSlug !== '') {
                const slugVal = getBlogSlug[getBlogSlug.length - 1];
                const val = slugVal.blogSlug;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                blog.blogSlug = data + '-' + (slugNumber + 1);
            }
        }
        const blogSave = await this.blogService.create(blog);

        const findBlog: any = await this.blogRelatedService.findOne({
            where: {
                blogId: blogSave.id,
            },
        });
        if (findBlog) {

            // delete previous related blog
            this.blogRelatedService.delete({ blogId: blogSave.id });

            // update related blog
            if (blogParam.relatedBlogId) {
                const relatedBlog: any = blogParam.relatedBlogId;
                for (const relatedblog of relatedBlog) {
                    const newRelatedBlog: any = new BlogRelated();
                    newRelatedBlog.blogId = blogSave.id;
                    newRelatedBlog.relatedBlogId = relatedblog;
                    await this.blogRelatedService.create(newRelatedBlog);
                }
            }
        } else {

            // update related blog
            if (blogParam.relatedBlogId) {
                const relatedBlog: any = blogParam.relatedBlogId;
                for (const relatedblog of relatedBlog) {
                    const newRelatedBlog: any = new BlogRelated();
                    newRelatedBlog.blogId = blogSave.id;
                    newRelatedBlog.relatedBlogId = relatedblog;
                    await this.blogRelatedService.create(newRelatedBlog);
                }
            }

        }

        if (blogSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated blog',
                data: blogSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update the blog',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Delete Blog API
    /**
     * @api {delete} /api/blog/delete-blog/:id Delete Blog API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} blogId  blogId
     * @apiParamExample {json} Input
     * {
     * "blogId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Blog.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/blog/delete-blog/:id
     * @apiErrorExample {json} Delete Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-blog/:id')
    @Authorized()
    public async deleteBlog(@Param('id') blogId: number, @Res() response: any, @Req() request: any): Promise<any> {

        const dataId = await this.blogService.findOne({ where: { id: blogId } });
        if (dataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Please choose a blog to delete',
            };
            return response.status(400).send(errorResponse);
        } else {
            await this.blogService.delete(dataId);
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Blog',
            };
            return response.status(200).send(successResponse);
        }
    }
    // Delete Multiple Blog API
    /**
     * @api {post} /api/blog/delete-multiple-blog Delete Multiple Blog API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam {Number} blogId Blog Id
     * @apiParamExample {json} Input
     * {
     *   "BlogId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Blog.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/blog/delete-multiple-blog
     * @apiErrorExample {json} Delete multiple Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-multiple-blog')
    @Authorized()
    public async deleteMultipleBlog(@Body({ validate: true }) deleteBlog: DeleteBlog, @Res() response: any, @Req() request: any): Promise<any> {
        const blogData = deleteBlog.blogId.toString();
        const blog: any = blogData.split(',');
        const data: any = blog.map(async (id: any) => {
            const dataId = await this.blogService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid Blog Id',
                };
                return response.status(400).send(errorResponse);
            } else {
                await this.blogService.delete(dataId);
            }
        });
        const deleteBlogs = await Promise.all(data);
        if (deleteBlogs) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted blog',
            };
            return response.status(200).send(successResponse);
        }
    }

    // Blog Detail
    /**
     * @api {get} /api/blog/blog-detail Blog Detail API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} blogId Blog Id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Blog detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog/blog-detail
     * @apiErrorExample {json} Blog Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/blog-detail')
    @Authorized()
    public async BlogDetail(@QueryParam('blogId') blogId: number, @Res() response: any): Promise<any> {
        const blog = await this.blogService.findOne({
            where: {
                id: blogId,
            },
        });
        if (!blog) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Blog Id',
            };
            return response.status(400).send(errorResponse);
        }
        const category = await this.categoryService.findOne({
            where: {
                categoryId: blog.categoryId,
            },
        });
        if (category) {
            blog.categoryName = category.name;
        }
        blog.blogRelated = await this.blogRelatedService.findAll({ where: { blogId: blog.id } }).then((val) => {
            const relatedBlog = val.map(async (value: any) => {
                const idBlog = value.relatedBlogId;
                const blogDetail = await this.blogService.findOne({
                    select: ['id', 'title', 'image', 'imagePath'],
                    where: { id: idBlog },
                });
                return (blogDetail);
            });
            const resultData = Promise.all(relatedBlog);
            return resultData;
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got blog list',
            data: blog,
        };
        return response.status(200).send(successResponse);
    }

    // Blog Count API
    /**
     * @api {get} /api/blog/blog-count Blog Count API
     * @apiGroup Blog
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog count",
     *      "data":{},
     *      "status": "1"
     * }
     * @apiSampleRequest /api/blog/blog-count
     * @apiErrorExample {json} Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/blog-count')
    @Authorized()
    public async blogCount(@Res() response: any): Promise<any> {
        const blog: any = {};
        const select = [];
        const search = [];
        const WhereConditions = [];
        const allBlogCount = await this.blogService.list(0, 0, select, search, WhereConditions, 1);
        const whereConditionsActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 1,
            },
        ];
        const activeBlogCount = await this.blogService.list(0, 0, select, search, whereConditionsActive, 1);
        const whereConditionsInActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 0,
            },
        ];
        const inActiveBlogCount = await this.blogService.list(0, 0, select, search, whereConditionsInActive, 1);
        blog.totalBlog = allBlogCount;
        blog.activeBlog = activeBlogCount;
        blog.inActiveBlog = inActiveBlogCount;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the blog count',
            data: blog,
        };
        return response.status(200).send(successResponse);
    }
}
