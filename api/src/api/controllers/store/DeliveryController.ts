/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    JsonController,
    Res,
    Req,
    Get,
    QueryParam,
} from 'routing-controllers';
import { DeliveryLocationService } from '../../services/DeliveryLocationService';
import { DeliveryLocationToLocationService } from '../../services/DeliveryLocationToLocationService';

@JsonController('/delivery-store')
export class DeliveryStoreController {
    constructor(private deliveryLocationToLocationService: DeliveryLocationToLocationService, private deliveryLocationService: DeliveryLocationService
    ) {
    }

    // Delivery Location List API
    /**
     * @api {get} /api/delivery-store/delivery-location-list Delivery Location List API
     * @apiGroup Delivery Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword Enter delivery location
     * @apiParam (Request body) {Number} count Count should be number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset" : "",
     *      "keyword" : "",
     *      "count" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Delivery Location List Successfully"
     *      "data" : "{ }"
     * }
     * @apiSampleRequest /api/delivery-store/delivery-location-list
     * @apiErrorExample {json} Delivery Location List API error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/delivery-location-list')
    public async deliveryLocationList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['id', 'deliveryLocationId', 'location'];
        const WhereConditions = [
            {
                name: 'location',
                op: 'like',
                value: keyword,
            },
        ];
        const deliveryLocationList: any = await this.deliveryLocationToLocationService.list(limit, offset, select, WhereConditions, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully got delivery location count',
                data: deliveryLocationList,
            });
        }
        const result: any = [];
        for (const val of deliveryLocationList) {
            const obj: any = {};
            obj.id = val.id;
            obj.deliveryLocationId = val.deliveryLocationId;
            const deliveryLocation = await this.deliveryLocationService.findOne({
                select: ['zipCode'],
                where: {
                    deliveryLocationId: val.deliveryLocationId,
                },
            });
            obj.zipCode = deliveryLocation ? deliveryLocation.zipCode : '';
            obj.location = val.location;
            result.push(obj);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got delivery location list',
            data: result,
        };
        return response.status(200).send(successResponse);
    }
}
