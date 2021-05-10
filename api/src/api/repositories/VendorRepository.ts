/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Vendor } from '../models/Vendor';
import { Customer } from '../models/Customer';

@EntityRepository(Vendor)
export class VendorRepository extends Repository<Vendor>  {

    public async vendorList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Vendor, 'vendor');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }

        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    query.where(table.name + ' = ' + table.value);
                } else if (operator === 'and' && table.value !== '') {
                    query.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'or' && table.value !== '') {
                    query.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
                    query.andWhere(table.name + ' = ' + table.value);
                }

            });
        }

        // Keyword Search
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    const subQb = this.manager
                        .getRepository(Customer)
                        .createQueryBuilder('customer')
                        .select('id')
                        .where('delete_flag = ' + table.value);
                    query.where(table.name + ' IN (' + subQb.getSql() + ')');
                } else if (operator === 'email' && table.value !== undefined && table.value !== '') {
                    const subQb = this.manager
                        .getRepository(Customer)
                        .createQueryBuilder('customer')
                        .select('id')
                        .where('email LIKE ' + "'%" + table.value + "%'" + ' ');
                    query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                } else if (operator === 'status' && table.value !== undefined && table.value !== '') {
                    const subQb = this.manager
                        .getRepository(Customer)
                        .createQueryBuilder('customer')
                        .select('id')
                        .where('is_active = ' + table.value);
                    query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                } else if (operator === 'name' && table.value !== undefined && table.value !== '') {
                    query.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                }
            });
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        query.orderBy('vendor.vendor_id', 'DESC');
        if (count) {
            return query.getCount();
        }

        return query.getMany();
    }

    public async vendorSlug(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Vendor, 'vendor');
        query.select(['vendor.vendor_id as vendorId', 'vendor.vendor_slug_name as vendorSlugName', 'customer.first_name as firstName']);
        query.where('customer.first_name = :value', { value: data });
        query.innerJoin('vendor.customer', 'customer');
        return query.getRawMany();
    }

    public async vendorSlugOne(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Vendor, 'vendor');
        query.select(['vendor.vendor_id as vendorId', 'vendor.vendor_slug_name as vendorSlugName', 'customer.first_name as firstName']);
        query.where('customer.first_name = :value', { value: data });
        query.innerJoin('vendor.customer', 'customer');
        return query.getRawOne();
    }

    public async vendorSlugEmptySlug(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Vendor, 'vendor');
        query.select(['vendor.vendor_id as vendorId', 'vendor.vendor_slug_name as vendorSlugName', 'customer.first_name as firstName']);
        query.where('customer.first_name = :value', { value: data });
        query.andWhere('vendor.vendor_slug_name IS :value1', { value1: undefined });
        query.innerJoin('vendor.customer', 'customer');
        return query.getRawMany();
    }

}
