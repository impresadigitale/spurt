"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarientsRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Varients_1 = require("../models/Varients");
let VarientsRepository = class VarientsRepository extends typeorm_1.Repository {
};
VarientsRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Varients_1.Varients)
], VarientsRepository);
exports.VarientsRepository = VarientsRepository;
//# sourceMappingURL=VarientsRepository.js.map