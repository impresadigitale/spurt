"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarientsService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const VarientsRepository_1 = require("../repositories/VarientsRepository");
let VarientsService = class VarientsService {
    constructor(varientsRepository, log) {
        this.varientsRepository = varientsRepository;
        this.log = log;
    }
    // create a data
    create(Data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create a data');
            return this.varientsRepository.save(Data);
        });
    }
    // findone a data
    findOne(id) {
        this.log.info('Find a data');
        return this.varientsRepository.findOne(id);
    }
    // find condition
    find(option) {
        return this.varientsRepository.find(option);
    }
    // Varients List
    list(limit, offset, select = [], relation = [], whereConditions = [], count) {
        const condition = {};
        condition.where = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
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
            return this.varientsRepository.count(condition);
        }
        else {
            return this.varientsRepository.find(condition);
        }
    }
    // delete OptionValue
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a varients');
            yield this.varientsRepository.delete(id);
            return;
        });
    }
};
VarientsService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [VarientsRepository_1.VarientsRepository, Object])
], VarientsService);
exports.VarientsService = VarientsService;
//# sourceMappingURL=VarientsService.js.map