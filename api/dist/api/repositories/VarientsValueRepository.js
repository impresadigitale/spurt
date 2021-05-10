"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarientsValueRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VarientsValue_1 = require("../models/VarientsValue");
let VarientsValueRepository = class VarientsValueRepository extends typeorm_1.Repository {
};
VarientsValueRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(VarientsValue_1.VarientsValue)
], VarientsValueRepository);
exports.VarientsValueRepository = VarientsValueRepository;
//# sourceMappingURL=VarientsValueRepository.js.map