"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroupRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const AttributeGroup_1 = require("../models/AttributeGroup");
let AttributeGroupRepository = class AttributeGroupRepository extends typeorm_1.Repository {
};
AttributeGroupRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(AttributeGroup_1.AttributeGroup)
], AttributeGroupRepository);
exports.AttributeGroupRepository = AttributeGroupRepository;
//# sourceMappingURL=AttributeGroupRepository.js.map