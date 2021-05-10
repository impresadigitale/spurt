"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryLocationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const DeliveryLocation_1 = require("../models/DeliveryLocation");
let DeliveryLocationRepository = class DeliveryLocationRepository extends typeorm_1.Repository {
};
DeliveryLocationRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(DeliveryLocation_1.DeliveryLocation)
], DeliveryLocationRepository);
exports.DeliveryLocationRepository = DeliveryLocationRepository;
//# sourceMappingURL=DeliveryLocationRepository.js.map