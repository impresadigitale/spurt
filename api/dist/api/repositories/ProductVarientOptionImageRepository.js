"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientOptionImageRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductVarientOptionImage_1 = require("../models/ProductVarientOptionImage");
let ProductVarientOptionImageRepository = class ProductVarientOptionImageRepository extends typeorm_1.Repository {
};
ProductVarientOptionImageRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(ProductVarientOptionImage_1.ProductVarientOptionImage)
], ProductVarientOptionImageRepository);
exports.ProductVarientOptionImageRepository = ProductVarientOptionImageRepository;
//# sourceMappingURL=ProductVarientOptionImageRepository.js.map