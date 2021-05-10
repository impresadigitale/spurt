"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponUsageProductRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CouponUsageProduct_1 = require("../models/CouponUsageProduct");
let CouponUsageProductRepository = class CouponUsageProductRepository extends typeorm_1.Repository {
};
CouponUsageProductRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(CouponUsageProduct_1.CouponUsageProduct)
], CouponUsageProductRepository);
exports.CouponUsageProductRepository = CouponUsageProductRepository;
//# sourceMappingURL=CouponUsageProductRepository.js.map