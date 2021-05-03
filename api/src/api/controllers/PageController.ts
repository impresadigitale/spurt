/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Put, Delete, Param, QueryParam, Post, Body, JsonController, Authorized, Res, Req } from 'routing-controllers';
import { Page } from '../models/Page';
import { CreatePage } from './requests/CreatePageRequest';
import { PageService } from '../services/PageService';
import { UpdatePage } from './requests/UpdatePageRequest';
import { DeletePageRequest } from './requests/DeletePageRequest';
import { PageGroupService } from '../services/PageGroupService';

@JsonController('/page')
export class PageController {
    constructor(private pageService: PageService, private pageGroupService: PageGroupService) {
    }

    // Create Page API
    /**
     * @api {post} /api/page/add-page Add Page API
     * @apiGroup Page
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} pageGroupId pageGroupId
     * @apiParam (Request body) {String} metaTagContent metaTagContent
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {Number} active active
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "metaTagTitle" : "",
     *      "pageGroupId" : "",
     *      "metaTagContent" : "",
     *      "metaTagKeyword" : "",
     *      "active" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New page is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/add-page
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-page')
    @Authorized()
    public async createPage(@Body({ validate: true }) pageParam: CreatePage, @Res() response: any): Promise<any> {

        const page = new Page();
        page.title = pageParam.title;
        page.content = pageParam.content;
        page.isActive = pageParam.active;
        page.pageGroupId = pageParam.pageGroupId;
        page.metaTagTitle = pageParam.metaTagTitle;
        page.metaTagContent = pageParam.metaTagContent;
        page.metaTagKeyword = pageParam.metaTagKeyword;
        const metaTagTitle = pageParam.metaTagTitle;
        if (metaTagTitle) {
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getBlogSlug = await this.pageService.slugData(metaTagTitle);
            if (getBlogSlug.length === 0) {
                page.slugName = data;
            } else if (getBlogSlug.length === 1 && (data === getBlogSlug[0].slugName)) {
                page.slugName = data + '-' + 1;
            } else {
                const slugVal = getBlogSlug[getBlogSlug.length - 1];
                const value = slugVal.slugName;
                const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                const slugNumber = parseInt(getSlugInt, 0);
                page.slugName = data + '-' + (slugNumber + 1);
            }
        } else {
            const title = pageParam.title;
            const data = title.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getBlogSlug = await this.pageService.slugData(title);
            if (getBlogSlug.length === 0) {
                page.slugName = data;
            } else if (getBlogSlug.length === 1 && (data === getBlogSlug[0].slugName)) {
                page.slugName = data + '-' + 1;
            } else {
                const slugVal = getBlogSlug[getBlogSlug.length - 1];
                const value = slugVal.slugName;
                const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                const slugNumber = parseInt(getSlugInt, 0);
                page.slugName = data + '-' + (slugNumber + 1);
            }
        }

        const pageSave = await this.pageService.create(page);
        if (pageSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created a new page.',
                data: pageSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create page',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Page List API
    /**
     * @api {get} /api/page/pagelist Page List API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page list",
     *      "data":{
     *      "pageId" : "",
     *      "title" : "",
     *      "content" : "",
     *      "active" : "",
     *      "metaTagTitle" : "",
     *      "metaTagContent" : "",
     *      "metaTagKeyword" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/pagelist
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/pagelist')
    @Authorized()
    public async pageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['pageId', 'title', 'pageGroupId', 'content', 'isActive', 'metaTagTitle', 'metaTagContent', 'metaTagKeyword', 'slugName'];
        const search = [
            {
                name: 'title',
                op: 'like',
                value: keyword,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const WhereConditions = [];
        const relations = [];
        const pageList = await this.pageService.list(limit, offset, select, relations, search, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got pages count',
                data: pageList,
            };
            return response.status(200).send(successRes);
        }
        const promise = pageList.map(async (result: any) => {
            const data: any = await this.pageGroupService.findOne({ where: { groupId: result.pageGroupId } });
            const temp: any = result;
            if (data) {
                temp.pageGroupName = data.groupName;
            } else {
                temp.pageGroupName = '';
            }
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete list of pages. ',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // Update Page API
    /**
     * @api {put} /api/page/update-page/:id Update Page API
     * @apiGroup Page
     * @apiParam (Request body) {Number} pageId pageId
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {Number} pageGroupId pageGroupId
     * @apiParam (Request body) {Number} active active
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagContent metaTagContent
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageId" : "",
     *      "title" : "",
     *      "content" : "",
     *      "pageGroupId" : "",
     *      "active" : "",
     *      "metaTagTitle" : "",
     *      "metaTagContent" : "",
     *      "metaTagKeyword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Page is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/update-page/:id
     * @apiErrorExample {json} updatePage error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-page/:id')
    @Authorized()
    public async updatePage(@Body({ validate: true }) pageParam: UpdatePage, @Res() response: any): Promise<any> {
        const page = await this.pageService.findOne({
            where: {
                pageId: pageParam.pageId,
            },
        });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid page id',
            };
            return response.status(400).send(errorResponse);
        }

        page.title = pageParam.title;
        page.content = pageParam.content;
        page.isActive = pageParam.active;
        page.pageGroupId = pageParam.pageGroupId;
        page.metaTagTitle = pageParam.metaTagTitle;
        page.metaTagContent = pageParam.metaTagContent;
        page.metaTagKeyword = pageParam.metaTagKeyword;
        const metaTagTitle = pageParam.metaTagTitle;
        if (metaTagTitle) {
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getPageSlug = await this.pageService.slugData(metaTagTitle);
            if (getPageSlug.length === 0 || getPageSlug === '' || getPageSlug === undefined) {
                page.slugName = data;
            } else if (getPageSlug.length === 1 && (metaTagTitle !== getPageSlug[getPageSlug.length - 1].metaTagTitle) && (data === getPageSlug[0].slugName)) {
                page.slugName = data + '-' + 1;
            } else if (getPageSlug.length > 1 && getPageSlug !== undefined && getPageSlug !== '') {
                const slugVal = getPageSlug[getPageSlug.length - 1];
                const val = slugVal.slugName;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                page.slugName = data + '-' + (slugNumber + 1);
            }
        } else {
            const title = page.title;
            const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getPageSlug = await this.pageService.slugData(title);
            if (getPageSlug === '' || getPageSlug === undefined || getPageSlug.length === 0) {
                page.slugName = data;
            } else if (getPageSlug.length === 1 && (title !== getPageSlug[getPageSlug.length - 1].title) && (data === getPageSlug[0].slugName)) {
                page.slugName = data + '-' + 1;
            } else if (getPageSlug.length > 1 && getPageSlug !== undefined && getPageSlug !== '') {
                const slugVal = getPageSlug[getPageSlug.length - 1];
                const val = slugVal.slugName;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                page.slugName = data + '-' + (slugNumber + 1);
            }
        }
        const pageSave = await this.pageService.create(page);
        if (pageSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the page.',
                data: pageSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update page',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Delete Page API
    /**
     * @api {delete} /api/page/delete-page/:id Delete Page API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "pageId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted page.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/delete-page/:id
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-page/:id')
    @Authorized()
    public async deletePage(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const page = await this.pageService.findOne({
            where: {
                pageId: id,
            },
        });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid pageId',
            };
            return response.status(400).send(errorResponse);
        }
        const deletePage = await this.pageService.delete(page);
        if (deletePage) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted the page.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete page',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Multiple Page API
    /**
     * @api {post} /api/page/delete-page Delete Multiple Page API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} pageId  pageId
     * @apiParamExample {json} Input
     * {
     * "pageId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Page.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/page/delete-page
     * @apiErrorExample {json} pageDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-page')
    @Authorized()
    public async deleteMultiplePage(@Body({ validate: true }) pageDelete: DeletePageRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const pageIdNo = pageDelete.pageId.toString();
        const pageid = pageIdNo.split(',');
        for (const id of pageid) {
            const dataId = await this.pageService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose pages for delete',
                };
                return response.status(400).send(errorResponse);
            } else {
                const deletePageId = parseInt(id, 10);
                await this.pageService.delete(deletePageId);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted page',
        };
        return response.status(200).send(successResponse);
    }

    // Page Count API
    /**
     * @api {get} /api/page/page-count Page Count API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page count",
     *      "data":{},
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/page-count
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/page-count')
    @Authorized()
    public async pageCount(@Res() response: any): Promise<any> {
        const page: any = {};
        const select = [];
        const search = [];
        const WhereConditions = [];
        const relations = [];
        const allPageCount = await this.pageService.list(0, 0, select, relations, search, WhereConditions, 1);
        const whereConditionsActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 1,
            },
        ];
        const activePageCount = await this.pageService.list(0, 0, select, relations, search, whereConditionsActive, 1);
        const whereConditionsInActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 0,
            },
        ];
        const inActivePageCount = await this.pageService.list(0, 0, select, relations, search, whereConditionsInActive, 1);
        page.totalPage = allPageCount;
        page.activePage = activePageCount;
        page.inActivePage = inActivePageCount;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the page count',
            data: page,
        };
        return response.status(200).send(successResponse);
    }

    // page Detail
    /**
     * @api {get} /api/page/page-detail Page Detail API
     * @apiGroup Page
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} pageId pageId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Page detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page/page-detail
     * @apiErrorExample {json} page Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/page-detail')
    @Authorized()
    public async PageDetail(@QueryParam('pageId') pageId: number, @Res() response: any): Promise<any> {
        const page = await this.pageService.findOne({
            where: {
                pageId,
            },
        });
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Page Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got page detail',
            data: page,
        };
        return response.status(200).send(successResponse);
    }
}
