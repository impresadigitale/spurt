"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturerRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ManufacturerModel_1 = require("../models/ManufacturerModel");
let ManufacturerRepository = class ManufacturerRepository extends typeorm_1.Repository {
};
ManufacturerRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(ManufacturerModel_1.Manufacturer)
], ManufacturerRepository);
exports.ManufacturerRepository = ManufacturerRepository;
//# sourceMappingURL=ManufacturerRepository.js.map