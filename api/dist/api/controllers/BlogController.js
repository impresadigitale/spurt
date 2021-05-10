"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const Blog_1 = require("../models/Blog");
const BlogService_1 = require("../services/BlogService");
const env_1 = require("../../env");
const CreateBlogRequest_1 = require("./requests/CreateBlogRequest");
const DeleteBlogRequest_1 = require("./requests/DeleteBlogRequest");
const S3Service_1 = require("../services/S3Service");
const ImageService_1 = require("../services/ImageService");
const CategoryService_1 = require("../services/CategoryService");
const BlogRelatedService_1 = require("../services/BlogRelatedService");
const BlogRelated_1 = require("../models/BlogRelated");
let BlogController = class BlogController {
    constructor(blogService, s3Service, blogRelatedService, imageService, categoryService) {
        this.blogService = blogService;
        this.s3Service = s3Service;
        this.blogRelatedService = blogRelatedService;
        this.imageService = imageService;
        this.categoryService = categoryService;
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
    createBlog(blogParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = blogParam.categoryId;
            const getcategory = yield this.categoryService.findOne(category);
            if (!getcategory) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Category Id',
                };
                return response.status(400).send(errorResponse);
            }
            const image = blogParam.image;
            const newBlog = new Blog_1.Blog();
            if (image) {
                const type = image.split(';')[0].split('/')[1];
                const name = 'Img_' + Date.now() + '.' + type;
                const path = 'blog/';
                const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
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
                const getBlogSlug = yield this.blogService.slugData(metaTagTitle);
                if (getBlogSlug.length === 0) {
                    newBlog.blogSlug = data;
                }
                else if (getBlogSlug.length === 1 && (data === getBlogSlug[0].blogSlug)) {
                    newBlog.blogSlug = data + '-' + 1;
                }
                else {
                    const slugVal = getBlogSlug[getBlogSlug.length - 1];
                    const value = slugVal.blogSlug;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    newBlog.blogSlug = data + '-' + (slugNumber + 1);
                }
            }
            else {
                const title = blogParam.title;
                const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const getBlogSlug = yield this.blogService.slugData(title);
                if (getBlogSlug.length === 0) {
                    newBlog.blogSlug = data;
                }
                else if (getBlogSlug.length === 1 && (data === getBlogSlug[0].blogSlug)) {
                    newBlog.blogSlug = data + '-' + 1;
                }
                else {
                    const slugVal = getBlogSlug[getBlogSlug.length - 1];
                    const value = slugVal.blogSlug;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    newBlog.blogSlug = data + '-' + (slugNumber + 1);
                }
            }
            const blogSave = yield this.blogService.create(newBlog);
            // Add related blog
            if (blogParam.relatedBlogId) {
                const relatedBlog = blogParam.relatedBlogId;
                for (const relatedblog of relatedBlog) {
                    const newBlogRelated = new BlogRelated_1.BlogRelated();
                    newBlogRelated.blogId = blogSave.id;
                    newBlogRelated.relatedBlogId = relatedblog;
                    newBlogRelated.isActive = 1;
                    yield this.blogRelatedService.create(newBlogRelated);
                }
            }
            if (blogSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created new blog.',
                    data: blogSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create new blog. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    BlogList(limit, offset, keyword, categoryId, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const getBlogList = yield this.blogService.list(limit, offset, select, search, WhereConditions, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got blog count',
                    data: getBlogList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const blogList = getBlogList.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const datas = val;
                    const getCategoryName = yield this.categoryService.findOne({
                        where: { categoryId: val.categoryId },
                        select: ['name'],
                    });
                    if (getCategoryName) {
                        datas.categoryName = getCategoryName.name;
                    }
                    return datas;
                }));
                const results = yield Promise.all(blogList);
                const successResponse = {
                    status: 1,
                    message: 'Successfully got blog list',
                    data: results,
                };
                return response.status(200).send(successResponse);
            }
        });
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
    updateBlog(blogId, blogParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogService.findOne(blogId);
            if (!blog) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid blog',
                };
                return response.status(400).send(errorResponse);
            }
            const category = blogParam.categoryId;
            const getcategory = yield this.categoryService.findOne(category);
            if (!getcategory) {
                const errorResponse = {
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
                if (env_1.env.imageserver === 's3') {
                    yield this.s3Service.imageUpload((path + name), base64Data, type);
                }
                else {
                    yield this.imageService.imageUpload((path + name), base64Data);
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
                const getBlogSlug = yield this.blogService.slugData(metaTagTitle);
                if (getBlogSlug.length === 0 || getBlogSlug === '' || getBlogSlug === undefined) {
                    blog.blogSlug = data;
                }
                else if (getBlogSlug.length === 1 && (metaTagTitle !== getBlogSlug[getBlogSlug.length - 1].metaTagTitle)) {
                    blog.blogSlug = data + '-' + 1;
                }
                else if (getBlogSlug.length > 1 && getBlogSlug !== undefined && getBlogSlug !== '') {
                    const slugVal = getBlogSlug[getBlogSlug.length - 1];
                    const val = slugVal.blogSlug;
                    const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    blog.blogSlug = data + '-' + (slugNumber + 1);
                }
            }
            else {
                const title = blogParam.title;
                const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const getBlogSlug = yield this.blogService.slugData(title);
                if (getBlogSlug === '' || getBlogSlug === undefined || getBlogSlug.length === 0) {
                    blog.blogSlug = data;
                }
                else if (getBlogSlug.length === 1 && (title !== getBlogSlug[getBlogSlug.length - 1].title)) {
                    blog.blogSlug = data + '-' + 1;
                }
                else if (getBlogSlug.length > 1 && getBlogSlug !== undefined && getBlogSlug !== '') {
                    const slugVal = getBlogSlug[getBlogSlug.length - 1];
                    const val = slugVal.blogSlug;
                    const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    blog.blogSlug = data + '-' + (slugNumber + 1);
                }
            }
            const blogSave = yield this.blogService.create(blog);
            const findBlog = yield this.blogRelatedService.findOne({
                where: {
                    blogId: blogSave.id,
                },
            });
            if (findBlog) {
                // delete previous related blog
                this.blogRelatedService.delete({ blogId: blogSave.id });
                // update related blog
                if (blogParam.relatedBlogId) {
                    const relatedBlog = blogParam.relatedBlogId;
                    for (const relatedblog of relatedBlog) {
                        const newRelatedBlog = new BlogRelated_1.BlogRelated();
                        newRelatedBlog.blogId = blogSave.id;
                        newRelatedBlog.relatedBlogId = relatedblog;
                        yield this.blogRelatedService.create(newRelatedBlog);
                    }
                }
            }
            else {
                // update related blog
                if (blogParam.relatedBlogId) {
                    const relatedBlog = blogParam.relatedBlogId;
                    for (const relatedblog of relatedBlog) {
                        const newRelatedBlog = new BlogRelated_1.BlogRelated();
                        newRelatedBlog.blogId = blogSave.id;
                        newRelatedBlog.relatedBlogId = relatedblog;
                        yield this.blogRelatedService.create(newRelatedBlog);
                    }
                }
            }
            if (blogSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated blog',
                    data: blogSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update the blog',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteBlog(blogId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dataId = yield this.blogService.findOne({ where: { id: blogId } });
            if (dataId === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Please choose a blog to delete',
                };
                return response.status(400).send(errorResponse);
            }
            else {
                yield this.blogService.delete(dataId);
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted Blog',
                };
                return response.status(200).send(successResponse);
            }
        });
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
    deleteMultipleBlog(deleteBlog, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blogData = deleteBlog.blogId.toString();
            const blog = blogData.split(',');
            const data = blog.map((id) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const dataId = yield this.blogService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid Blog Id',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    yield this.blogService.delete(dataId);
                }
            }));
            const deleteBlogs = yield Promise.all(data);
            if (deleteBlogs) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted blog',
                };
                return response.status(200).send(successResponse);
            }
        });
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
    BlogDetail(blogId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogService.findOne({
                where: {
                    id: blogId,
                },
            });
            if (!blog) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Blog Id',
                };
                return response.status(400).send(errorResponse);
            }
            const category = yield this.categoryService.findOne({
                where: {
                    categoryId: blog.categoryId,
                },
            });
            if (category) {
                blog.categoryName = category.name;
            }
            blog.blogRelated = yield this.blogRelatedService.findAll({ where: { blogId: blog.id } }).then((val) => {
                const relatedBlog = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const idBlog = value.relatedBlogId;
                    const blogDetail = yield this.blogService.findOne({
                        select: ['id', 'title', 'image', 'imagePath'],
                        where: { id: idBlog },
                    });
                    return (blogDetail);
                }));
                const resultData = Promise.all(relatedBlog);
                return resultData;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got blog list',
                data: blog,
            };
            return response.status(200).send(successResponse);
        });
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
    blogCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blog = {};
            const select = [];
            const search = [];
            const WhereConditions = [];
            const allBlogCount = yield this.blogService.list(0, 0, select, search, WhereConditions, 1);
            const whereConditionsActive = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: 1,
                },
            ];
            const activeBlogCount = yield this.blogService.list(0, 0, select, search, whereConditionsActive, 1);
            const whereConditionsInActive = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: 0,
                },
            ];
            const inActiveBlogCount = yield this.blogService.list(0, 0, select, search, whereConditionsInActive, 1);
            blog.totalBlog = allBlogCount;
            blog.activeBlog = activeBlogCount;
            blog.inActiveBlog = inActiveBlogCount;
            const successResponse = {
                status: 1,
                message: 'Successfully got the blog count',
                data: blog,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-blog'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateBlogRequest_1.CreateBlog, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogController.prototype, "createBlog", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/blog-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('categoryId')), tslib_1.__param(4, routing_controllers_1.QueryParam('status')), tslib_1.__param(5, routing_controllers_1.QueryParam('count')), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogController.prototype, "BlogList", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-blog/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body({ validate: true })), tslib_1.__param(2, routing_controllers_1.Res()), tslib_1.__param(3, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateBlogRequest_1.CreateBlog, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogController.prototype, "updateBlog", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-blog/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogController.prototype, "deleteBlog", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/delete-multiple-blog'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [DeleteBlogRequest_1.DeleteBlog, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogController.prototype, "deleteMultipleBlog", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/blog-detail'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('blogId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogController.prototype, "BlogDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/blog-count'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BlogController.prototype, "blogCount", null);
BlogController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/blog'),
    tslib_1.__metadata("design:paramtypes", [BlogService_1.BlogService, S3Service_1.S3Service, BlogRelatedService_1.BlogRelatedService,
        ImageService_1.ImageService, CategoryService_1.CategoryService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=BlogController.js.map