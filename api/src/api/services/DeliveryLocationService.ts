/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { DeliveryLocation } from '../models/DeliveryLocation';
import { DeliveryLocationRepository } from '../repositories/DeliveryLocationRepository';
import {Like} from 'typeorm';

@Service()
export class DeliveryLocationService {

    constructor(
        @OrmRepository() private deliveryLocationRepository: DeliveryLocationRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find one delivery location
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.deliveryLocationRepository.findOne(findCondition);
    }
    // Delivery Location list
    public list(limit: any, offset: any, select: any= [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (count) {
            return this.deliveryLocationRepository.count(condition);
        }
        return this.deliveryLocationRepository.find(condition);
    }

    // create delivery location
    public async create(deliveryLocation: DeliveryLocation): Promise<DeliveryLocation> {
        const newDeliveryLocation = await this.deliveryLocationRepository.save(deliveryLocation);
        return newDeliveryLocation;
    }

    // update delivery location
    public update(id: any, deliveryLocation: DeliveryLocation): Promise<DeliveryLocation> {
        this.log.info('Update a delivery person');
        deliveryLocation.deliveryLocationId = id;
        return this.deliveryLocationRepository.save(deliveryLocation);
    }

    // delete delivery location
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a delivery location');
        const deleteDeliveryLocation = await this.deliveryLocationRepository.delete(id);
        return deleteDeliveryLocation;
    }
}
