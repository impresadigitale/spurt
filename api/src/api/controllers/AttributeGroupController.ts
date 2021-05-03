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
import { AttributeGroup } from '../models/AttributeGroup';
import { AttributeGroupService } from '../services/AttributeGroupService';

@JsonController('/attribute-group')
export class AttributeGroupController {
    constructor(private attributeGroupService: AttributeGroupService) {
    }

    // Create Attribute Group API
    /**
     * @api {post} /api/attribute-group/add-attribute-group Add Attribute group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} attributeGroupName
     * @apiParam (Request body) {Number} sortOrder
     * @apiParamExample {json} Input
     * {
     *      "attributeGroupName" : "",
     *      "sortOrder" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created attribute group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/add-attribute-group
     * @apiErrorExample {json} Attribute group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-attribute-group')
    @Authorized()
    public async addAttributeGroup(@BodyParam('attributeGroupName') attributeGroupName: string, @BodyParam('sortOrder') sortOrder: number, @Res() response: any): Promise<any> {
        const newAttributeGroup = new AttributeGroup();
        newAttributeGroup.attributeGroupName = attributeGroupName;
        newAttributeGroup.sortOrder = sortOrder;
        const AttributeGroupSaved = await this.attributeGroupService.create(newAttributeGroup);
        if (AttributeGroupSaved) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added Attribute Group.',
                data: AttributeGroupSaved,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create currency',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Attribute Group List API
    /**
     * @api {get} /api/attribute-group/AttributeGrouplist Attribute Group list API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Attribute Group list API",
     *      "data":{
     *       "groupId" : "",
     *       "attributeGroupName" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/AttributeGrouplist
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/AttributeGrouplist')
    @Authorized()
    public async AttributeGrouplist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['groupId', 'attributeGroupName', 'sortOrder'];
        const search = [];
        const WhereConditions = [];
        const relations = ['attribute'];
        const currencyList = await this.attributeGroupService.list(limit, offset, select, search, relations, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the attribute group list.',
            data: currencyList,
        };
        return response.status(200).send(successResponse);
    }

    // update Attribute Group
    /**
     * @api {put} /api/attribute-group/update-attribute-group/:id Update Attribute Group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} attributeGroupName attributeGroupName
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParamExample {json} Input
     * {
     *      "attributeGroupName" : "",
     *      "sortOrder" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated attribute group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/update-attribute-group/:id
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-attribute-group/:id')
    @Authorized()
    public async updateAttributeGroup(@Param('id') id: number, @BodyParam('attributeGroupName') attributeGroupName: string, @BodyParam('sortOrder') sortOrder: number, @Res() response: any): Promise<any> {

        const group = await this.attributeGroupService.findOne({
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
        group.attributeGroupName = attributeGroupName;
        group.sortOrder = sortOrder;
        const groupSave = await this.attributeGroupService.create(group);
        if (groupSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Attribute Group.',
                data: groupSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update Attribute Group',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // delete AttributeGroup API
    /**
     * @api {delete} /api/attribute-group/delete-attribute-group/:id Delete Attribute group API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Attribute group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/delete-attribute-group/:id
     * @apiErrorExample {json} Currency error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-attribute-group/:id')
    @Authorized()
    public async deleteAttributeGroup(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const attributeGroup = await this.attributeGroupService.findOne({
            where: {
                groupId: id,
            },
        });
        if (!attributeGroup) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid attributeId',
            };
            return response.status(400).send(errorResponse);
        }

        const deleteGroup = await this.attributeGroupService.delete(id);
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

    //   Get attribute Group API
    /**
     * @api {get} /api/attribute-group/get-attribute-group/:id Get Attribute Group  API
     * @apiGroup Attribute Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get attribute Group",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute-group/get-attribute-group/:id
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get-attribute-group/:id')
    @Authorized()
    public async getAttributeGroup(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const attribute = await this.attributeGroupService.findOne({ where: { groupId: id } });
        if (!attribute) {
            const errorResponse: any = {
                status: 0,
                message: ' invalid group Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully Got attribute group',
            data: attribute,
        };
        return response.status(200).send(successResponse);
    }
}
