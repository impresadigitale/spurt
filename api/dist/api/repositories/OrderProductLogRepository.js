"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductLogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const OrderProductLog_1 = require("../models/OrderProductLog");
let OrderProductLogRepository = class OrderProductLogRepository extends typeorm_1.Repository {
};
OrderProductLogRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(OrderProductLog_1.OrderProductLog)
], OrderProductLogRepository);
exports.OrderProductLogRepository = OrderProductLogRepository;
//# sourceMappingURL=OrderProductLogRepository.js.map