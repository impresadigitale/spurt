"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarientsValueService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const VarientsValueRepository_1 = require("../repositories/VarientsValueRepository");
let VarientsValueService = class VarientsValueService {
    constructor(varientsValueRepository, log) {
        this.varientsValueRepository = varientsValueRepository;
        this.log = log;
    }
    // create a data
    create(Data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create a data');
            return this.varientsValueRepository.save(Data);
        });
    }
    // findone a data
    findOne(id) {
        this.log.info('Find a data');
        return this.varientsValueRepository.findOne(id);
    }
    // findone a data
    findOneData(data) {
        this.log.info('Find a data');
        return this.varientsValueRepository.findOne(data);
    }
    // find condition
    find(option) {
        return this.varientsValueRepository.find(option);
    }
    // delete VarientsValue
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a VarientsValue');
            yield this.varientsValueRepository.delete(id);
            return;
        });
    }
};
VarientsValueService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [VarientsValueRepository_1.VarientsValueRepository, Object])
], VarientsValueService);
exports.VarientsValueService = VarientsValueService;
//# sourceMappingURL=VarientsValueService.js.map