"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCouponProductCategoryService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const index_1 = require("typeorm/index");
const VendorCouponProductCategoryRepository_1 = require("../repositories/VendorCouponProductCategoryRepository");
let VendorCouponProductCategoryService = class VendorCouponProductCategoryService {
    constructor(vendorCouponProductCategoryRepository) {
        this.vendorCouponProductCategoryRepository = vendorCouponProductCategoryRepository;
    }
    // create
    create(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.vendorCouponProductCategoryRepository.save(data);
        });
    }
    // find Condition
    findOne(data) {
        return this.vendorCouponProductCategoryRepository.findOne(data);
    }
    // find Condition
    findAll(data) {
        return this.vendorCouponProductCategoryRepository.find(data);
    }
    // update customer
    update(id, data) {
        data.Id = id;
        return this.vendorCouponProductCategoryRepository.save(data);
    }
    //  List
    list(limit, offset, select = [], search = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (search && search.length > 0) {
            search.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = index_1.Like('%' + table.value + '%');
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
        }
        else {
            return this.vendorCouponProductCategoryRepository.find(condition);
        }
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.vendorCouponProductCategoryRepository.delete(id);
        });
    }
};
VendorCouponProductCategoryService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [VendorCouponProductCategoryRepository_1.VendorCouponProductCategoryRepository])
], VendorCouponProductCategoryService);
exports.VendorCouponProductCategoryService = VendorCouponProductCategoryService;
//# sourceMappingURL=VendorCouponProductCategoryService.js.map