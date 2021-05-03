/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Like } from 'typeorm/index';
import { VendorCouponProductCategoryRepository } from '../repositories/VendorCouponProductCategoryRepository';

@Service()
export class VendorCouponProductCategoryService {

    constructor(@OrmRepository() private vendorCouponProductCategoryRepository: VendorCouponProductCategoryRepository
    ) {
    }

    // create
    public async create(data: any): Promise<any> {
        return this.vendorCouponProductCategoryRepository.save(data);
    }

    // find Condition
    public findOne(data: any): Promise<any> {
        return this.vendorCouponProductCategoryRepository.findOne(data);
    }

    // find Condition
    public findAll(data: any): Promise<any> {
        return this.vendorCouponProductCategoryRepository.find(data);
    }

    // update customer
    public update(id: any, data: any): Promise<any> {
        data.Id = id;
        return this.vendorCouponProductCategoryRepository.save(data);
    }
    //  List
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
            return this.vendorCouponProductCategoryRepository.count(condition);
        } else {
            return this.vendorCouponProductCategoryRepository.find(condition);
        }
    }
    // delete
    public async delete(id: number): Promise<any> {
        return await this.vendorCouponProductCategoryRepository.delete(id);
    }
}
