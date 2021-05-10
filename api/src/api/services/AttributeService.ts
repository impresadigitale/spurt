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
import { AttributeRepository } from '../repositories/AttributeRepository';
import { Attribute } from '../models/Attribute';

@Service()
export class AttributeService {

    constructor(
        @OrmRepository() private attributeRepository: AttributeRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create
    public async create(attribute: Attribute): Promise<any> {
        this.log.info('Create a new attribute ');
        return this.attributeRepository.save(attribute);
    }

    // findOne
    public findOne(data: any): Promise<any> {
        return this.attributeRepository.findOne(data);
    }
    // update
    public update(id: number, attribute: Attribute): Promise<any> {
        attribute.attributeId = id;
        return this.attributeRepository.save(attribute);
    }

    // address
    public list(limit: number, offset: number, select: any = [], search: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            sortOrder: 'ASC',
        };
        if (count) {
            return this.attributeRepository.count(condition);
        } else {
            return this.attributeRepository.find(condition);
        }
    }

    // delete
    public async delete(id: number): Promise<any> {
        return this.attributeRepository.delete(id);
    }

    // find All
    public find(data: any): Promise<any> {
        return this.attributeRepository.find(data);
    }
}
