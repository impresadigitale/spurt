"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAttributeService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const ProductAttributeRepository_1 = require("../repositories/ProductAttributeRepository");
const index_1 = require("typeorm/index");
let ProductAttributeService = class ProductAttributeService {
    constructor(productAttributeRepository, log) {
        this.productAttributeRepository = productAttributeRepository;
        this.log = log;
    }
    // create Product Attribute
    create(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new product attribute ');
            return this.productAttributeRepository.save(data);
        });
    }
    // findCondition
    findOne(data) {
        return this.productAttributeRepository.findOne(data);
    }
    // update product attribute
    update(id, attribute) {
        attribute.id = id;
        return this.productAttributeRepository.save(attribute);
    }
    // product attribute List
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
            return this.productAttributeRepository.count(condition);
        }
        else {
            return this.productAttributeRepository.find(condition);
        }
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productAttributeRepository.delete(id);
        });
    }
    // find a data
    findAll(attribute) {
        this.log.info('Find a data');
        return this.productAttributeRepository.find(attribute);
    }
};
ProductAttributeService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [ProductAttributeRepository_1.ProductAttributeRepository, Object])
], ProductAttributeService);
exports.ProductAttributeService = ProductAttributeService;
//# sourceMappingURL=ProductAttributeService.js.map