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
import { CustomerCart } from '../models/CustomerCart';
import { CustomerCartRepository } from '../repositories/CustomerCartRepository';
import { Like } from 'typeorm';

@Service()
export class CustomerCartService {
    constructor(
        @OrmRepository() private customerCartRepository: CustomerCartRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async createData(checkoutdata: any): Promise<CustomerCart> {
        this.log.info('create a order product data');
        return this.customerCartRepository.save(checkoutdata);
    }

    public find(order: any): Promise<any> {
        return this.customerCartRepository.find(order);
    }

    public list(limit: number, offset: number, select: any[], relation: any = [], whereConditions: any = [], search: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

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
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.customerCartRepository.count(condition);
        } else {
            return this.customerCartRepository.find(condition);
        }
    }
    // findOne cart
    public findOne(productData: any): Promise<any> {
        return this.customerCartRepository.findOne(productData);
    }

    // delete cart
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a cart');
        const newProduct = await this.customerCartRepository.delete(id);
        return newProduct;
    }

}
