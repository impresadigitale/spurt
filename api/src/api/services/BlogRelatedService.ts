/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Like } from 'typeorm/index';
import { BlogRelatedRepository } from '../repositories/BlogRelatedRepository';

@Service()
export class BlogRelatedService {

    constructor(
        @OrmRepository() private blogRelatedRepository: BlogRelatedRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create blog related
    public async create(blogRelated: any): Promise<any> {
        this.log.info('Create a new blog related ');
        return this.blogRelatedRepository.save(blogRelated);
    }

    // find One blog related
    public findOne(blogRelated: any): Promise<any> {
        return this.blogRelatedRepository.findOne(blogRelated);
    }

    // findAll blog related
    public findAll(blogRelated: any): Promise<any> {
        return this.blogRelatedRepository.find(blogRelated);
    }

    // update blog related
    public update(blogRelated: any): Promise<any> {
        return this.blogRelatedRepository.save(blogRelated);
    }

    // blog related List
    public async list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
        if (count) {
            return this.blogRelatedRepository.count(condition);
        } else {
            return this.blogRelatedRepository.find(condition);
        }
    }

    // delete blog related
    public async delete(id: any): Promise<any> {
        return await this.blogRelatedRepository.delete(id);
    }
}
