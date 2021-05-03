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
import { BlogRepository } from '../repositories/BlogRepository';

@Service()
export class BlogService {

    constructor(
        @OrmRepository() private blogRepository: BlogRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create blog
    public async create(blog: any): Promise<any> {
        this.log.info('Create a new blog ');
        return this.blogRepository.save(blog);
    }

    // find One blog
    public findOne(blog: any): Promise<any> {
        return this.blogRepository.findOne(blog);
    }

    // findAll blog
    public findAll(blog: any): Promise<any> {
        return this.blogRepository.find(blog);
    }

    // update blog
    public update(blog: any): Promise<any> {
        return this.blogRepository.save(blog);
    }

    // blog List
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

        condition.order = { createdDate: 'DESC' };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.blogRepository.count(condition);
        } else {
            return this.blogRepository.find(condition);
        }
    }

    // delete blog
    public async delete(id: number): Promise<any> {
        return await this.blogRepository.delete(id);
    }
    public async slugData(data: string): Promise<any> {
        return await this.blogRepository.blogSlug(data);
    }
}
