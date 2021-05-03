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
import { CouponUsage } from '../models/CouponUsage';
import { CouponUsageRepository } from '../repositories/CouponUsageRepository';
import { Like } from 'typeorm/index';

@Service()
export class CouponUsageService {

    constructor(
        @OrmRepository() private couponUsageRepository: CouponUsageRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create Country
    public async create(country: any): Promise<CouponUsage> {
        this.log.info('Create a new country ');
        return this.couponUsageRepository.save(country);
    }

    // findCondition
    public findOne(country: any): Promise<any> {
        return this.couponUsageRepository.findOne(country);
    }

    // update country
    public update(id: any, country: CouponUsage): Promise<any> {
        country.couponUsageId = id;
        return this.couponUsageRepository.save(country);
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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.couponUsageRepository.count(condition);
        } else {
            return this.couponUsageRepository.find(condition);
        }
    }

    // delete Country
    public async delete(id: number): Promise<any> {
        return await this.couponUsageRepository.delete(id);
    }

    // find Condition
    public findAll(data: any): Promise<any> {
        return this.couponUsageRepository.find(data);
    }
}
