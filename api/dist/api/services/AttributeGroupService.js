"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroupService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const AttributeGroupRepository_1 = require("../repositories/AttributeGroupRepository");
let AttributeGroupService = class AttributeGroupService {
    constructor(attributeGroupRepository, log) {
        this.attributeGroupRepository = attributeGroupRepository;
        this.log = log;
    }
    // create
    create(attribute) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new attribute group ');
            return this.attributeGroupRepository.save(attribute);
        });
    }
    // findOne
    findOne(data) {
        return this.attributeGroupRepository.findOne(data);
    }
    // update
    update(id, attributeGroup) {
        attributeGroup.groupId = id;
        return this.attributeGroupRepository.save(attributeGroup);
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
            return this.attributeGroupRepository.count(condition);
        }
        else {
            return this.attributeGroupRepository.find(condition);
        }
    }
    // delete
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.attributeGroupRepository.delete(id);
        });
    }
    // find All
    find(address) {
        return this.attributeGroupRepository.find(address);
    }
};
AttributeGroupService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [AttributeGroupRepository_1.AttributeGroupRepository, Object])
], AttributeGroupService);
exports.AttributeGroupService = AttributeGroupService;
//# sourceMappingURL=AttributeGroupService.js.map