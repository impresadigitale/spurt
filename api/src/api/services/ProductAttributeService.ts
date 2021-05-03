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
import { ProductAttribute } from '../models/ProductAttribute';
import { ProductAttributeRepository } from '../repositories/ProductAttributeRepository';
import { Like } from 'typeorm/index';

@Service()
export class ProductAttributeService {

    constructor(
        @OrmRepository() private productAttributeRepository: ProductAttributeRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create Product Attribute
    public async create(data: any): Promise<ProductAttribute> {
        this.log.info('Create a new product attribute ');
        return this.productAttributeRepository.save(data);
    }

    // findCondition
    public findOne(data: any): Promise<any> {
        return this.productAttributeRepository.findOne(data);
    }

    // update product attribute
    public update(id: any, attribute: ProductAttribute): Promise<any> {
        attribute.id = id;
        return this.productAttributeRepository.save(attribute);
    }

    // product attribute List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
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
            return this.productAttributeRepository.count(condition);
        } else {
            return this.productAttributeRepository.find(condition);
        }
    }

    // delete
    public async delete(id: any): Promise<any> {
        return await this.productAttributeRepository.delete(id);
    }

    // find a data
    public findAll(attribute: any): Promise<ProductAttribute[]> {
        this.log.info('Find a data');
        return this.productAttributeRepository.find(attribute);
    }
}
