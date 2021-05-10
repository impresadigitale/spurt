
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
import { AttributeGroupRepository } from '../repositories/AttributeGroupRepository';
import { AttributeGroup } from '../models/AttributeGroup';

@Service()
export class AttributeGroupService {

    constructor(
        @OrmRepository() private attributeGroupRepository: AttributeGroupRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create
    public async create(attribute: AttributeGroup): Promise<any> {
        this.log.info('Create a new attribute group ');
        return this.attributeGroupRepository.save(attribute);
    }

    // findOne
    public findOne(data: any): Promise<any> {
        return this.attributeGroupRepository.findOne(data);
    }
    // update
    public update(id: number, attributeGroup: AttributeGroup): Promise<any> {
        attributeGroup.groupId = id;
        return this.attributeGroupRepository.save(attributeGroup);
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
            return this.attributeGroupRepository.count(condition);
        } else {
            return this.attributeGroupRepository.find(condition);
        }
    }

    // delete
    public async delete(id: number): Promise<any> {
        return this.attributeGroupRepository.delete(id);
    }

    // find All
    public find(address: any): Promise<any> {
        return this.attributeGroupRepository.find(address);
    }
}
