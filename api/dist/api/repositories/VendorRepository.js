"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Vendor_1 = require("../models/Vendor");
const Customer_1 = require("../models/Customer");
let VendorRepository = class VendorRepository extends typeorm_1.Repository {
    vendorList(limit, offset, select = [], searchConditions = [], whereConditions = [], count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Vendor_1.Vendor, 'vendor');
            // Select
            if (select && select.length > 0) {
                query.select(select);
            }
            // Keyword Search
            if (searchConditions && searchConditions.length > 0) {
                searchConditions.forEach((table) => {
                    const operator = table.op;
                    if (operator === 'where' && table.value !== '') {
                        query.where(table.name + ' = ' + table.value);
                    }
                    else if (operator === 'and' && table.value !== '') {
                        query.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                    }
                    else if (operator === 'or' && table.value !== '') {
                        query.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                    }
                    else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
                        query.andWhere(table.name + ' = ' + table.value);
                    }
                });
            }
            // Keyword Search
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((table) => {
                    const operator = table.op;
                    if (operator === 'where' && table.value !== undefined) {
                        const subQb = this.manager
                            .getRepository(Customer_1.Customer)
                            .createQueryBuilder('customer')
                            .select('id')
                            .where('delete_flag = ' + table.value);
                        query.where(table.name + ' IN (' + subQb.getSql() + ')');
                    }
                    else if (operator === 'email' && table.value !== undefined && table.value !== '') {
                        const subQb = this.manager
                            .getRepository(Customer_1.Customer)
                            .createQueryBuilder('customer')
                            .select('id')
                            .where('email LIKE ' + "'%" + table.value + "%'" + ' ');
                        query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                    }
                    else if (operator === 'status' && table.value !== undefined && table.value !== '') {
                        const subQb = this.manager
                            .getRepository(Customer_1.Customer)
                            .createQueryBuilder('customer')
                            .select('id')
                            .where('is_active = ' + table.value);
                        query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                    }
                    else if (operator === 'name' && table.value !== undefined && table.value !== '') {
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
        });
    }
    vendorSlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Vendor_1.Vendor, 'vendor');
            query.select(['vendor.vendor_id as vendorId', 'vendor.vendor_slug_name as vendorSlugName', 'customer.first_name as firstName']);
            query.where('customer.first_name = :value', { value: data });
            query.innerJoin('vendor.customer', 'customer');
            return query.getRawMany();
        });
    }
    vendorSlugOne(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Vendor_1.Vendor, 'vendor');
            query.select(['vendor.vendor_id as vendorId', 'vendor.vendor_slug_name as vendorSlugName', 'customer.first_name as firstName']);
            query.where('customer.first_name = :value', { value: data });
            query.innerJoin('vendor.customer', 'customer');
            return query.getRawOne();
        });
    }
    vendorSlugEmptySlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Vendor_1.Vendor, 'vendor');
            query.select(['vendor.vendor_id as vendorId', 'vendor.vendor_slug_name as vendorSlugName', 'customer.first_name as firstName']);
            query.where('customer.first_name = :value', { value: data });
            query.andWhere('vendor.vendor_slug_name IS :value1', { value1: undefined });
            query.innerJoin('vendor.customer', 'customer');
            return query.getRawMany();
        });
    }
};
VendorRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Vendor_1.Vendor)
], VendorRepository);
exports.VendorRepository = VendorRepository;
//# sourceMappingURL=VendorRepository.js.map