"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPersonToLocationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const DeliveryPersonToLocation_1 = require("../models/DeliveryPersonToLocation");
let DeliveryPersonToLocationRepository = class DeliveryPersonToLocationRepository extends typeorm_1.Repository {
};
DeliveryPersonToLocationRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(DeliveryPersonToLocation_1.DeliveryPersonToLocation)
], DeliveryPersonToLocationRepository);
exports.DeliveryPersonToLocationRepository = DeliveryPersonToLocationRepository;
//# sourceMappingURL=DeliveryPersonToLocationRepository.js.map