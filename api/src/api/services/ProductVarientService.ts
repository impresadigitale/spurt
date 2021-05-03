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
import { ProductVarient } from '../models/ProductVarient';
import { ProductVarientRepository } from '../repositories/ProductVarientRepository';
import { Like } from 'typeorm';

@Service()
export class ProductVarientService {

    constructor(
        @OrmRepository() private productVarientRepository: ProductVarientRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find one condition
    public findOne(data: any): Promise<any> {
        return this.productVarientRepository.findOne(data);
    }

    // find all
    public findAll(data: any): Promise<any> {
        this.log.info('Find all');
        return this.productVarientRepository.find(data);
    }

    // list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
                const operator: string = item.op;
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;

        }
        if (count) {
            return this.productVarientRepository.count(condition);
        } else {
            return this.productVarientRepository.find(condition);
        }
    }

    // create
    public async create(productVarient: ProductVarient): Promise<ProductVarient> {
        const newVarient = await this.productVarientRepository.save(productVarient);
        return newVarient;
    }

    // update
    public update(id: any, productVarient: ProductVarient): Promise<ProductVarient> {
        this.log.info('Update a product varient');
        productVarient.id = id;
        return this.productVarientRepository.save(productVarient);
    }

    // delete
    public async delete(id: any): Promise<any> {
        this.log.info('Delete a product varient');
        const newVarient = await this.productVarientRepository.delete(id);
        return newVarient;
    }
}
