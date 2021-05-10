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
import { Like } from 'typeorm/index';
import { JobsRepository } from '../repositories/JobsRepository';

@Service()
export class JobsService {

    constructor(
        @OrmRepository() private jobsRepository: JobsRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create job
    public async create(job: any): Promise<any> {
        this.log.info('Create a new job ');
        return this.jobsRepository.save(job);
    }

    // find One job
    public findOne(job: any): Promise<any> {
        return this.jobsRepository.findOne(job);
    }

    // findAll job
    public findAll(job: any): Promise<any> {
        return this.jobsRepository.find(job);
    }

    // update job
    public update(job: any): Promise<any> {
        return this.jobsRepository.save(job);
    }

    // job List
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
            return this.jobsRepository.count(condition);
        } else {
            return this.jobsRepository.find(condition);
        }
    }

    // delete job
    public async delete(id: number): Promise<any> {
        return await this.jobsRepository.delete(id);
    }
}
