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
import {VendorRepository} from '../repositories/VendorRepository';

@Service()
export class VendorService {

    constructor(@OrmRepository() private vendorRepository: VendorRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create customer
    public async create(vendor: any): Promise<any> {
        this.log.info('Create a new customer ');
        return this.vendorRepository.save(vendor);
    }

    // find Condition
    public findOne(vendor: any): Promise<any> {
        return this.vendorRepository.findOne(vendor);
    }

    // find Condition
    public findAll(): Promise<any> {
        return this.vendorRepository.find();
    }

    // update vendor
    public update(id: any, vendor: any): Promise<any> {
        vendor.vendorId = id;
        return this.vendorRepository.save(vendor);
    }
    // vendor List
    public list(limit: any, offset: any, search: any = [], whereConditions: any = [], order: number, count: number|boolean): Promise<any> {
        const condition: any = {};

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

        if (order && order > 0) {
            condition.order = {
                createdDate: 'DESC',
            };
            condition.take = 5;

        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorRepository.count(condition);
        } else {
            return this.vendorRepository.find(condition);
        }
    }

    // vendor list
    public async vendorList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [],  count: number | boolean): Promise<any> {
        return await this.vendorRepository.vendorList(limit, offset, select, searchConditions, whereConditions, count);
    }
    // delete customer
    public async delete(id: number): Promise<any> {
        return await this.vendorRepository.delete(id);
    }

    public async slugData(data: string): Promise<any> {
        return await this.vendorRepository.vendorSlug(data);
    }

    public async slugDataOne(data: string): Promise<any> {
        return await this.vendorRepository.vendorSlugOne(data);
    }

    public async slugDataWithEmptySlug(data: string): Promise<any> {
        return await this.vendorRepository.vendorSlugEmptySlug(data);
    }

}
