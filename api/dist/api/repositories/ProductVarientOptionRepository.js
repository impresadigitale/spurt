"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientOptionRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductVarientOption_1 = require("../models/ProductVarientOption");
let ProductVarientOptionRepository = class ProductVarientOptionRepository extends typeorm_1.Repository {
};
ProductVarientOptionRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(ProductVarientOption_1.ProductVarientOption)
], ProductVarientOptionRepository);
exports.ProductVarientOptionRepository = ProductVarientOptionRepository;
//# sourceMappingURL=ProductVarientOptionRepository.js.map