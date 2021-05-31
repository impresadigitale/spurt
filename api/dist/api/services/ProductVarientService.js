"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const ProductVarientRepository_1 = require("../repositories/ProductVarientRepository");
const typeorm_1 = require("typeorm");
let ProductVarientService = class ProductVarientService {
    constructor(productVarientRepository, log) {
        this.productVarientRepository = productVarientRepository;
        this.log = log;
    }
    // find one condition
    findOne(data) {
        return this.productVarientRepository.findOne(data);
    }
    // find all
    findAll(data) {
        this.log.info('Find all');
        return this.productVarientRepository.find(data);
    }
    // list
    list(limit, offset, select = [], relation = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                const operator = item.op;
                if (operator === 'where' && item.value !== undefined) {
                    condition.where[item.name] = item.value;
                }
                else if (operator === 'like' && item.value !== undefined) {
                    condition.where[item.name] = typeorm_1.Like('%' + item.value + '%');
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
            return this.productVarientRepository.count(condition);
        }
        else {
            return this.productVarientRepository.find(condition);
        }
    }
    // create
    create(productVarient) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newVarient = yield this.productVarientRepository.save(productVarient);
            return newVarient;
        });
    }
    // update
    update(id, productVarient) {
        this.log.info('Update a product varient');
        productVarient.id = id;
        return this.productVarientRepository.save(productVarient);
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product varient');
            const newVarient = yield this.productVarientRepository.delete(id);
            return newVarient;
        });
    }
};
ProductVarientService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductVarientRepository_1.ProductVarientRepository, Object])
], ProductVarientService);
exports.ProductVarientService = ProductVarientService;
//# sourceMappingURL=ProductVarientService.js.map