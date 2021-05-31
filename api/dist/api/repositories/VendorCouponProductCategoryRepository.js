"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCouponProductCategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorCouponProductCategory_1 = require("../models/VendorCouponProductCategory");
let VendorCouponProductCategoryRepository = class VendorCouponProductCategoryRepository extends typeorm_1.Repository {
};
VendorCouponProductCategoryRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(VendorCouponProductCategory_1.VendorCouponProductCategory)
], VendorCouponProductCategoryRepository);
exports.VendorCouponProductCategoryRepository = VendorCouponProductCategoryRepository;
//# sourceMappingURL=VendorCouponProductCategoryRepository.js.map