"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const AttributeRepository_1 = require("../repositories/AttributeRepository");
let AttributeService = class AttributeService {
    constructor(attributeRepository, log) {
        this.attributeRepository = attributeRepository;
        this.log = log;
    }
    // create
    create(attribute) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new attribute ');
            return this.attributeRepository.save(attribute);
        });
    }
    // findOne
    findOne(data) {
        return this.attributeRepository.findOne(data);
    }
    // update
    update(id, attribute) {
        attribute.attributeId = id;
        return this.attributeRepository.save(attribute);
    }
    // address
    list(limit, offset, select = [], search = [], relation = [], whereConditions = [], count) {
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
                condition.where[item.name] = item.value;
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            sortOrder: 'ASC',
        };
        if (count) {
            return this.attributeRepository.count(condition);
        }
        else {
            return this.attributeRepository.find(condition);
        }
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeRepository.delete(id);
        });
    }
    // find All
    find(data) {
        return this.attributeRepository.find(data);
    }
};
AttributeService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [AttributeRepository_1.AttributeRepository, Object])
], AttributeService);
exports.AttributeService = AttributeService;
//# sourceMappingURL=AttributeService.js.map