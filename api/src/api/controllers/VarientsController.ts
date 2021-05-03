/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Put, Delete, Param, QueryParam, Post, Body, JsonController, Authorized, Res, Req } from 'routing-controllers';
import { Varients } from '../models/Varients';
import { VarientsValue } from '../models/VarientsValue';
import { VarientsService } from '../services/VarientsService';
import { VarientsValueService } from '../services/VarientsValueService';
import { UpdateVarients } from './requests/UpdateVarientsRequest';
import { CreateVarients } from './requests/CreateVarientRequest';
import { ProductVarientService } from '../services/ProductVarientService';
import { SiteFilterSectionService } from '../services/SiteFilterSectionService';

@JsonController('/varients')
export class VarientsController {
    constructor(private varientsService: VarientsService, private productVarientService: ProductVarientService, private siteFilterSectionService: SiteFilterSectionService, private varientsValueService: VarientsValueService) {
    }

    // Create Varients API
    /**
     * @api {post} /api/varients/add-varients Add Varients API
     * @apiGroup Varients
     * @apiParam (Request body) {String} type type
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {String} sortOrder sortOrder
     * @apiParam (Request body) {Object} varientsValue varientsValue
     * @apiParam (Request body) {String}  varientsValue.valueName valueName
     * @apiParam (Request body) {String}  varientsValue.sortOrder valueName
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "type" : "",
     *      "name" : "",
     *      "sortOrder" : "",
     *      "varientsValue" : [{
     *      "valueName" : "",
     *      "sortOrder" : "",
     * }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "varients is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/varients/add-varients
     * @apiErrorExample {json} varients error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-varients')
    @Authorized()
    public async createPage(@Body({ validate: true }) varientParam: CreateVarients, @Res() response: any): Promise<any> {

        const varients = new Varients();
        varients.name = varientParam.name;
        varients.sortOrder = varientParam.sortOrder;
        varients.type = varientParam.type;
        const varientsSave = await this.varientsService.create(varients);
        if (varientParam.varientsValue) {
            const varientsValue = varientParam.varientsValue;
            for (const varientVal of varientsValue) {
                const varValue = new VarientsValue();
                varValue.valueName = varientVal.valueName;
                varValue.sortOrder = varientVal.sortOrder;
                varValue.varientsId = varientsSave.id;
                await this.varientsValueService.create(varValue);
            }
        }
        if (varientsSave !== undefined) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created varients.',
                data: varientsSave,
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

    // Varients List API
    /**
     * @api {get} /api/varients/varientslist Varients List API
     * @apiGroup Varients
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get varient list",
     *      "data":{
     *      "id" : "",
     *      "name" : "",
     *      "type" : "",
     *      "sortOrder" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/varients/varientslist
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/varientslist')
    public async varientslist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('status') status: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['id', 'type', 'name', 'sortOrder'];
        const relation = [];
        const WhereConditions = [];
        const varientsList = await this.varientsService.list(limit, offset, select, relation, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count',
                data: varientsList,
            };
            return response.status(200).send(successRes);
        }
        const promise = varientsList.map(async (result: any) => {
            const data: any = await this.varientsValueService.find({ where: { varientsId: result.id }, order: {sortOrder : 'ASC'}});
            const temp: any = result;
            if (data) {
                temp.varientsValue = data;
            } else {
                temp.varientsValue = [];
            }
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete list of varients. ',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // Update Varients API
    /**
     * @api {put} /api/varients/update-varients/:id Update Varients API
     * @apiGroup Varients
     * @apiParam (Request body) {String} type type
     * @apiParam (Request body) {String} name name
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Object} varientsValue varientsValue
     * @apiParam (Request body) {String} varientsValue.valueName valueName
     * @apiParam (Request body) {String} varientsValue.sortOrder sortOrder
     * @apiParam (Request body) {String} varientsValue.id varient value id
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "type" : "",
     *      "name" : "",
     *      "sortOrder" : "",
     *      "varientsValue" : [{
     *      "id" : "",
     *      "valueName" : "",
     *      "sortOrder" : "",
     * }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": " Varients are updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/varients/update-varients/:id
     * @apiErrorExample {json} updateVarients error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-varients/:id')
    @Authorized()
    public async updateVarients(@Param('id') id: number, @Body({ validate: true }) varientParam: UpdateVarients, @Res() response: any): Promise<any> {
        const varients = await this.varientsService.findOne({
            where: {
                id,
            },
        });
        if (!varients) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid varient',
            };
            return response.status(400).send(errorResponse);
        }

        varients.type = varientParam.type;
        varients.name = varientParam.name;
        varients.sortOrder = varientParam.sortOrder;
        const varientsSave = await this.varientsService.create(varients);
        await this.varientsValueService.delete({ varientsId: varientsSave.id });
        if (varientParam.varientsValue) {
            const varientsValue = varientParam.varientsValue;
            for (const varientVal of varientsValue) {
                if (varientVal.id) {
                    const varientValue = await this.varientsValueService.findOne(varientVal.id);
                    if (!varientValue) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'invalid varientValueId',
                    };
                    return response.status(400).send(errorResponse);
                    }
                    const varValue = new VarientsValue();
                    varValue.id = varientVal.id;
                    varValue.valueName = varientVal.valueName;
                    varValue.sortOrder = varientVal.sortOrder;
                    varValue.varientsId = varientsSave.id;
                    await this.varientsValueService.create(varValue);
                } else {
                    const varValue = new VarientsValue();
                    varValue.valueName = varientVal.valueName;
                    varValue.sortOrder = varientVal.sortOrder;
                    varValue.varientsId = varientsSave.id;
                    await this.varientsValueService.create(varValue);
                }
            }
        }
        if (varientsSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated the Varient',
                data: varientsSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Delete Varient API
    /**
     * @api {delete} /api/varients/delete-varient/:id Delete Varient API
     * @apiGroup Varients
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted varients.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/varients/delete-varient/:id
     * @apiErrorExample {json} Varients error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-varient/:id')
    @Authorized()
    public async deleteVarients(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const varients = await this.varientsService.findOne({
            where: {
                id,
            },
        });
        if (!varients) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid varientId',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductId = await this.productVarientService.findOne({ where: { varientsId: id } });
        if (orderProductId) {
            const errorResponse: any = {
                status: 0,
                message: 'products are mapped for this varient, so you cannot delete',
            };
            return response.status(400).send(errorResponse);
        }
        const filter = await this.siteFilterSectionService.findOne({ where: { sectionId: id, sectionType: 1 } });
        if (filter) {
            const errorResponse: any = {
                status: 0,
                message: 'filters are mapped for this varient, so you cannot delete',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteVarient = await this.varientsService.delete(id);
        if (!deleteVarient) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted varient.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete varient',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // varients Detail
    /**
     * @api {get} /api/varients/varients-detail Varients Detail API
     * @apiGroup Varients
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id id
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Varients detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/varients/varients-detail
     * @apiErrorExample {json} varients Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/varients-detail')
    @Authorized()
    public async varientsDetail(@QueryParam('id') varientsId: number, @Res() response: any): Promise<any> {
        const varients = await this.varientsService.findOne({
            where: {
                id: varientsId,
            },
        });
        if (!varients) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid varients Id',
            };
            return response.status(400).send(errorResponse);
        }
        varients.varientsValue = await this.varientsValueService.find({
            where: {
                varientsId: varients.id,
            },
            order: {
                sortOrder: 'ASC',
            },
        });

        const successResponse: any = {
            status: 1,
            message: 'Successfully got varients detail',
            data: varients,
        };
        return response.status(200).send(successResponse);
    }
}
