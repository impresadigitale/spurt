"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Attribute_1 = require("../models/Attribute");
let AttributeRepository = class AttributeRepository extends typeorm_1.Repository {
};
AttributeRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Attribute_1.Attribute)
], AttributeRepository);
exports.AttributeRepository = AttributeRepository;
//# sourceMappingURL=AttributeRepository.js.map