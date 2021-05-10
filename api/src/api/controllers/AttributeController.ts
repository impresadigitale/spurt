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
    Param, Body
} from 'routing-controllers';
import { Attribute } from '../models/Attribute';
import { AttributeService } from '../services/AttributeService';
import { CreateAttribute } from './requests/CreateAttributeRequest';
import { classToPlain } from 'class-transformer';
import { SiteFilterSectionService } from '../services/SiteFilterSectionService';
import { ProductAttributeService } from '../services/ProductAttributeService';

@JsonController('/attribute')
export class AttributeController {
    constructor(private attributeService: AttributeService, private siteFilterSectionService: SiteFilterSectionService, private productAttributeService: ProductAttributeService) {
    }

    // Create Attribute API
    /**
     * @api {post} /api/attribute/add-attribute Add Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} attributeName
     * @apiParam (Request body) {Number} groupId
     * @apiParam (Request body) {Number} sortOrder
     * @apiParamExample {json} Input
     * {
     *      "attributeName" : "",
     *      "groupId" : "",
     *      "sortOrder" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created attribute.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/add-attribute
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-attribute')
    @Authorized()
    public async addAttributeGroup(@Body({ validate: true }) attributeParam: CreateAttribute, @Res() response: any): Promise<any> {
        const newAttribute = new Attribute();
        newAttribute.attributeName = attributeParam.attributeName;
        newAttribute.sortOrder = attributeParam.sortOrder;
        newAttribute.groupId = attributeParam.groupId;
        const AttributeSaved = await this.attributeService.create(newAttribute);
        if (AttributeSaved) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully added Attribute.',
                data: AttributeSaved,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Attribute List API
    /**
     * @api {get} /api/attribute/Attributelist Attribute list API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Attribute list API",
     *      "data":{
     *       "groupId" : "",
     *       "attributeName" : "",
     *       "sortOrder" : "",
     *       "attributeId" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/Attributelist
     * @apiErrorExample {json} Attribute Group error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/Attributelist')
    @Authorized()
    public async Attributelist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['attributeId', 'groupId', 'attributeName', 'sortOrder'];
        const search = [];
        const WhereConditions = [];
        const relations = ['attributeGroup'];
        const attributeList = await this.attributeService.list(limit, offset, select, search, relations, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got the attribute list.',
                data: attributeList,
            };
            return response.status(200).send(successRes);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the attribute list.',
            data: classToPlain(attributeList),
        };
        return response.status(200).send(successResponse);
    }

    // update Attribute Group
    /**
     * @api {put} /api/attribute/update-attribute/:id Update Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} attributeName attributeName
     * @apiParam (Request body) {Number} groupId groupId
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParamExample {json} Input
     * {
     *      "attributeName" : "",
     *      "groupId" : "",
     *      "sortOrder" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated attribute.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/update-attribute/:id
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-attribute/:id')
    @Authorized()
    public async updateAttribute(@Param('id') id: number, @Body({ validate: true }) attributeParam: CreateAttribute, @Res() response: any): Promise<any> {

        const attribute = await this.attributeService.findOne({
            where: {
                attributeId: id,
            },
        });
        if (!attribute) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid attributeId',
            };
            return response.status(400).send(errorResponse);
        }
        attribute.attributeName = attributeParam.attributeName;
        attribute.groupId = attributeParam.groupId;
        attribute.sortOrder = attributeParam.sortOrder;
        const attributeSave = await this.attributeService.create(attribute);
        if (attributeSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Attribute.',
                data: attributeSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update Attribute',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // delete Attribute API
    /**
     * @api {delete} /api/attribute/delete-attribute/:id Delete Attribute API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Attribute.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/delete-attribute/:id
     * @apiErrorExample {json} attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-attribute/:id')
    @Authorized()
    public async deleteAttribute(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const attribute = await this.attributeService.findOne({
            where: {
                attributeId: id,
            },
        });
        if (!attribute) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid attributeId',
            };
            return response.status(400).send(errorResponse);
        }
        const filter = await this.siteFilterSectionService.findOne({ where: { sectionId: id, sectionType: 2 } });
        if (filter) {
            const errorResponse: any = {
                status: 0,
                message: 'filters are mapped for this attribute. so you cannot delete',
            };
            return response.status(400).send(errorResponse);
        }

        const productAttribute = await this.productAttributeService.findOne({ where: { attributeId: id } });
        if (productAttribute) {
            const errorResponse: any = {
                status: 0,
                message: 'products are mapped for this attribute. so you cannot delete',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteAttribute = await this.attributeService.delete(id);
        if (deleteAttribute) {
            const successResponse: any = {
                status: 1,
                message: 'Successfullly deleted attribute.',
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

    //   Get attribute API
    /**
     * @api {get} /api/attribute/get-attribute/:id Get Attribute  API
     * @apiGroup Attribute
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get attribute",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/attribute/get-attribute/:id
     * @apiErrorExample {json} Attribute error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get-attribute/:id')
    @Authorized()
    public async getAttribute(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const attribute = await this.attributeService.findOne({ where: { attributeId: id } });
        if (!attribute) {
            const errorResponse: any = {
                status: 0,
                message: ' invalid attribute Id',
            };
            return response.status(400).send(errorResponse);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully Got attribute',
            data: attribute,
        };
        return response.status(200).send(successResponse);
    }
}
