/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { ProductAnswerLikeDislikeRepository } from '../repositories/ProductAnswerLikeDislikeRepository';
import { Like } from 'typeorm/index';

@Service()
export class ProductAnswerLikeService {

    constructor(@OrmRepository() private productAnswerLikeRepository: ProductAnswerLikeDislikeRepository) {
    }

    // create product answer like dislike
    public async create(product: any): Promise<any> {
        const newProduct = await this.productAnswerLikeRepository.save(product);
        return newProduct;
    }

    // find product answer like dislike
    public async findAll(data: any): Promise<any> {
        return await this.productAnswerLikeRepository.find(data);
    }

    // find product answer like dislike
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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.productAnswerLikeRepository.count(condition);
        } else {
            return this.productAnswerLikeRepository.find(condition);
        }
    }
    // delete productAnswerLikeRepository
    public async delete(id: any): Promise<any> {
        const newProduct = await this.productAnswerLikeRepository.delete(id);
        return newProduct;
    }

    // find one productAnswerLikeRepository
    public findOne(data: any): Promise<any> {
        return this.productAnswerLikeRepository.findOne(data);
    }

    // find like count
    public findLikeCount(answerId: any): Promise<any> {
        return this.productAnswerLikeRepository.findLikeCount(answerId);
    }

    // find dislike count
    public findDislikeCount(answerId: any): Promise<any> {
        return this.productAnswerLikeRepository.findDislikeCount(answerId);
    }
}
