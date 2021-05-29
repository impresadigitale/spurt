"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductVarient_1 = require("../models/ProductVarient");
let ProductVarientRepository = class ProductVarientRepository extends typeorm_1.Repository {
};
ProductVarientRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(ProductVarient_1.ProductVarient)
], ProductVarientRepository);
exports.ProductVarientRepository = ProductVarientRepository;
//# sourceMappingURL=ProductVarientRepository.js.map