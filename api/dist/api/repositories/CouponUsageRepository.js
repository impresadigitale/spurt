"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponUsageRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CouponUsage_1 = require("../models/CouponUsage");
let CouponUsageRepository = class CouponUsageRepository extends typeorm_1.Repository {
};
CouponUsageRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(CouponUsage_1.CouponUsage)
], CouponUsageRepository);
exports.CouponUsageRepository = CouponUsageRepository;
//# sourceMappingURL=CouponUsageRepository.js.map