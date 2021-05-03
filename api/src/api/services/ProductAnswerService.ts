/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Service} from 'typedi';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Logger, LoggerInterface} from '../../decorators/Logger';
import {ProductAnswer} from '../models/ProductAnswer';
import {ProductAnswerRepository} from '../repositories/ProductAnswerRepository';
import {Like} from 'typeorm/index';

@Service()
export class ProductAnswerService {

    constructor(@OrmRepository() private productAnswerRepository: ProductAnswerRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create Country
    public async create(answer: any): Promise<ProductAnswer> {
        this.log.info('Create a new product answer ');
        return this.productAnswerRepository.save(answer);
    }

    // findCondition
    public findOne(answer: any): Promise<any> {
        return this.productAnswerRepository.findOne(answer);
    }

    // update country
    public update(id: any, answer: ProductAnswer): Promise<any> {
        answer.answerId = id;
        return this.productAnswerRepository.save(answer);
    }

    // country List
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
            return this.productAnswerRepository.count(condition);
        } else {
            return this.productAnswerRepository.find(condition);
        }
    }

    // delete Country
    public async delete(id: number): Promise<any> {
        return await this.productAnswerRepository.delete(id);
    }

     // find a data
     public findAll(productDiscount: any): Promise<ProductAnswer[]> {
        this.log.info('Find a data');
        return this.productAnswerRepository.find(productDiscount);
    }
}
