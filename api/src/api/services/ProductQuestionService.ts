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
import { ProductQuestion } from '../models/ProductQuestion';
import { ProductQuestionRepository } from '../repositories/ProductQuestionRepository';
import { Like } from 'typeorm/index';

@Service()
export class ProductQuestionService {

    constructor(
        @OrmRepository() private productQuestionRepository: ProductQuestionRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create Country
    public async create(question: any): Promise<ProductQuestion> {
        this.log.info('Create a new product question ');
        return this.productQuestionRepository.save(question);
    }

    // findCondition
    public findOne(question: any): Promise<any> {
        return this.productQuestionRepository.findOne(question);
    }

    // update country
    public update(id: any, question: ProductQuestion): Promise<any> {
        question.questionId = id;
        return this.productQuestionRepository.save(question);
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
            return this.productQuestionRepository.count(condition);
        } else {
            return this.productQuestionRepository.find(condition);
        }
    }

    // delete Country
    public async delete(id: number): Promise<any> {
        return await this.productQuestionRepository.delete(id);
    }

    // find a data
    public findAll(productDiscount: any): Promise<ProductQuestion[]> {
        this.log.info('Find a data');
        return this.productQuestionRepository.find(productDiscount);
    }
}
