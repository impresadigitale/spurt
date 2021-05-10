"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAttributeRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductAttribute_1 = require("../models/ProductAttribute");
let ProductAttributeRepository = class ProductAttributeRepository extends typeorm_1.Repository {
};
ProductAttributeRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(ProductAttribute_1.ProductAttribute)
], ProductAttributeRepository);
exports.ProductAttributeRepository = ProductAttributeRepository;
//# sourceMappingURL=ProductAttributeRepository.js.map