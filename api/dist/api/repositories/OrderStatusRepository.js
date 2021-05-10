"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const OrderStatus_1 = require("../models/OrderStatus");
let OrderStatusRepository = class OrderStatusRepository extends typeorm_1.Repository {
};
OrderStatusRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(OrderStatus_1.OrderStatus)
], OrderStatusRepository);
exports.OrderStatusRepository = OrderStatusRepository;
//# sourceMappingURL=OrderStatusRepository.js.map