"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponUsageService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const CouponUsageRepository_1 = require("../repositories/CouponUsageRepository");
const index_1 = require("typeorm/index");
let CouponUsageService = class CouponUsageService {
    constructor(couponUsageRepository, log) {
        this.couponUsageRepository = couponUsageRepository;
        this.log = log;
    }
    // create Country
    create(country) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new country ');
            return this.couponUsageRepository.save(country);
        });
    }
    // findCondition
    findOne(country) {
        return this.couponUsageRepository.findOne(country);
    }
    // update country
    update(id, country) {
        country.couponUsageId = id;
        return this.couponUsageRepository.save(country);
    }
    // country List
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
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.couponUsageRepository.count(condition);
        }
        else {
            return this.couponUsageRepository.find(condition);
        }
    }
    // delete Country
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.couponUsageRepository.delete(id);
        });
    }
    // find Condition
    findAll(data) {
        return this.couponUsageRepository.find(data);
    }
};
CouponUsageService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [CouponUsageRepository_1.CouponUsageRepository, Object])
], CouponUsageService);
exports.CouponUsageService = CouponUsageService;
//# sourceMappingURL=CouponUsageService.js.map