"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCartService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const CustomerCartRepository_1 = require("../repositories/CustomerCartRepository");
const typeorm_1 = require("typeorm");
let CustomerCartService = class CustomerCartService {
    constructor(customerCartRepository, log) {
        this.customerCartRepository = customerCartRepository;
        this.log = log;
    }
    createData(checkoutdata) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create a order product data');
            return this.customerCartRepository.save(checkoutdata);
        });
    }
    find(order) {
        return this.customerCartRepository.find(order);
    }
    list(limit, offset, select, relation = [], whereConditions = [], search = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
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
                    condition.where[table.name] = typeorm_1.Like('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.customerCartRepository.count(condition);
        }
        else {
            return this.customerCartRepository.find(condition);
        }
    }
    // findOne cart
    findOne(productData) {
        return this.customerCartRepository.findOne(productData);
    }
    // delete cart
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a cart');
            const newProduct = yield this.customerCartRepository.delete(id);
            return newProduct;
        });
    }
};
CustomerCartService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [CustomerCartRepository_1.CustomerCartRepository, Object])
], CustomerCartService);
exports.CustomerCartService = CustomerCartService;
//# sourceMappingURL=CustomerCartService.js.map