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
import { VendorCouponRepository } from '../repositories/VendorCouponRepository';
import { VendorCoupon } from '../models/VendorCoupon';

@Service()
export class VendorCouponService {

    constructor(@OrmRepository() private vendorCouponRepository: VendorCouponRepository) {
    }

    // create
    public async create(data: any): Promise<any> {
        return this.vendorCouponRepository.save(data);
    }

    // find Condition
    public findOne(data: any): Promise<any> {
        return this.vendorCouponRepository.findOne(data);
    }

    // find Condition
    public findAll(data: any): Promise<any> {
        return this.vendorCouponRepository.find(data);
    }

    // update
    public update(id: any, vendorCoupon: VendorCoupon): Promise<any> {
        vendorCoupon.vendorCouponId = id;
        return this.vendorCouponRepository.save(vendorCoupon);
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
                if (operator === 'where' && table.value !== '' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        // if (keyword) {
        //     condition.where = {
        //         couponName: Like('%' + keyword + '%'),
        //     };
        // }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.vendorCouponRepository.count(condition);
        } else {
            return this.vendorCouponRepository.find(condition);
        }
    }
    // delete
    public async delete(id: number): Promise<any> {
        return await this.vendorCouponRepository.delete(id);
    }

    // find active coupon
    public async activeCoupon(today: string, couponCode: string): Promise<any> {
        return await this.vendorCouponRepository.activeCoupon(today, couponCode);
    }

    // find valid amount
    public async validAmount(grandTotal: number, couponCode: string): Promise<any> {
        return await this.vendorCouponRepository.validAmount(grandTotal, couponCode);
    }
}
