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
import { DeliveryLocationToLocation } from '../models/DeliveryLocationToLocation';
import { DeliveryLocationToLocationRepository } from '../repositories/DeliveryLocationToLocationRepository';
import { Like } from 'typeorm';

@Service()
export class DeliveryLocationToLocationService {

    constructor(
        @OrmRepository() private deliveryLocationToLocationRepository: DeliveryLocationToLocationRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find  location
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find location');
        return this.deliveryLocationToLocationRepository.findOne(findCondition);
    }

    // find  location
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find location');
        return this.deliveryLocationToLocationRepository.find(findCondition);
    }
    // Delivery Location list
    public list(limit: any, offset: any, select: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined && table.value !== '') {
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
            return this.deliveryLocationToLocationRepository.count(condition);
        }
        return this.deliveryLocationToLocationRepository.find(condition);
    }

    // create delivery location
    public async create(deliveryLocation: DeliveryLocationToLocation): Promise<DeliveryLocationToLocation> {
        const newDeliveryLocation = await this.deliveryLocationToLocationRepository.save(deliveryLocation);
        return newDeliveryLocation;
    }

    // update delivery location
    public update(id: any, deliveryLocation: DeliveryLocationToLocation): Promise<DeliveryLocationToLocation> {
        this.log.info('Update a delivery person');
        deliveryLocation.id = id;
        return this.deliveryLocationToLocationRepository.save(deliveryLocation);
    }

    // delete delivery location
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a delivery location');
        const deleteDeliveryLocation = await this.deliveryLocationToLocationRepository.delete(id);
        return deleteDeliveryLocation;
    }
}
