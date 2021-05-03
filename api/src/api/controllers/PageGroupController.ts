/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Put,
    Delete,
    Get,
    Post,
    JsonController,
    Authorized,
    Res,
    Req,
    QueryParam,
    Param, BodyParam
} from 'routing-controllers';
import {PageGroup} from '../models/PageGroup';
import {PageGroupService} from '../services/PageGroupService';
import {PageService} from '../services/PageService';

@JsonController('/page-group')
export class PageGroupController {
    constructor(private pageGroupService: PageGroupService, private pageService: PageService) {
    }

    // Create Page Group API
    /**
     * @api {post} /api/page-group/add-page-group Add Page group API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} pageGroupName
     * @apiParam (Request body) {Number} status
     * @apiParamExample {json} Input
     * {
     *      "pageGroupName" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created page group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/add-page-group
     * @apiErrorExample {json} Page group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-page-group')
    @Authorized()
    public async addAttributeGroup(@BodyParam('pageGroupName') pageGroupName: string, @BodyParam('status') status: number, @Res() response: any): Promise<any> {
        const newPageGroup = new PageGroup();
        newPageGroup.groupName = pageGroupName;
        newPageGroup.isActive = status;
        const PageGroupSaved = await this.pageGroupService.create(newPageGroup);
        if (PageGroupSaved) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added Page Group.',
                data: PageGroupSaved,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create ',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Page Group List API
    /**
     * @api {get} /api/page-group/PageGrouplist Page Group list API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Page Group list API",
     *      "data":{
     *       "groupId" : "",
     *       "pageGroupName" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/PageGrouplist
     * @apiErrorExample {json} Page Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/PageGrouplist')
    @Authorized()
    public async PageGrouplist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['groupId', 'groupName', 'isActive'];
        const search = [
             {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const WhereConditions = [];
        const relations = [];
        const pageGroupList = await this.pageGroupService.list(limit, offset, select, search, relations, WhereConditions, count);
        const successResponse: any = {
                status: 1,
                message: 'Successfully got the group list.',
                data: pageGroupList,
            };
        return response.status(200).send(successResponse);
    }

    // update Attribute Group
    /**
     * @api {put} /api/page-group/update-page-group/:id Update Page Group API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} pageGroupName pageGroupName
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "pageGroupName" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated page group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/update-page-group/:id
     * @apiErrorExample {json} Page Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-page-group/:id')
    @Authorized()
    public async updatePageGroup(@Param('id') id: number, @BodyParam('pageGroupName') pageGroupName: string, @BodyParam('status') status: number, @Res() response: any): Promise<any> {

        const group = await this.pageGroupService.findOne({
            where: {
                groupId: id,
            },
        });
        if (!group) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid groupId',
            };
            return response.status(400).send(errorResponse);
        }
        group.groupName = pageGroupName;
        group.isActive = status;
        const groupSave = await this.pageGroupService.create(group);
        if (groupSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Page Group.',
                data: groupSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update Page Group',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // delete Page Group API
    /**
     * @api {delete} /api/page-group/delete-page-group/:id Delete Page group API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Page group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/delete-page-group/:id
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-page-group/:id')
    @Authorized()
    public async deletePageGroup(@Param('id')id: number, @Res() response: any, @Req() request: any): Promise<any> {
        const pageGroup = await this.pageGroupService.findOne({
            where: {
                groupId: id,
            },
        });
        if (!pageGroup) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid pageId',
            };
            return response.status(400).send(errorResponse);
        }
        const page = await this.pageService.findOne({
            where: {
                pageGroupId: id,
            },
        });
        if (page) {
            const errorResponse: any = {
                status: 0,
                message: 'pages are mapped for group, so you cannot delete',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteGroup = await this.pageGroupService.delete(id);
        if (deleteGroup) {
            const successResponse: any = {
                status: 1,
                message: 'Successfullly deleted group.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete',
            };
            return response.status(400).send(errorResponse);
        }
    }

    //   Get Page Group API
    /**
     * @api {get} /api/page-group/get-page-group/:id Get Page Group  API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page Group",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/get-page-group/:id
     * @apiErrorExample {json} Page Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get-page-group/:id')
    @Authorized()
    public async getPageGroup(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const page = await this.pageGroupService.findOne({where: {groupId: id}});
        if (!page) {
            const errorResponse: any = {
                status: 0,
                message: ' invalid group Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully Got page group',
            data: page,
        };
        return response.status(200).send(successResponse);
    }
}
