"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryAllocationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const DeliveryAllocation_1 = require("../models/DeliveryAllocation");
let DeliveryAllocationRepository = class DeliveryAllocationRepository extends typeorm_1.Repository {
};
DeliveryAllocationRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(DeliveryAllocation_1.DeliveryAllocation)
], DeliveryAllocationRepository);
exports.DeliveryAllocationRepository = DeliveryAllocationRepository;
//# sourceMappingURL=DeliveryAllocationRepository.js.map