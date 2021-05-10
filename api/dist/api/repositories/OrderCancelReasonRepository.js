"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCancelReasonRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const OrderCancelReason_1 = require("../models/OrderCancelReason");
let OrderCancelReasonRepository = class OrderCancelReasonRepository extends typeorm_1.Repository {
};
OrderCancelReasonRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(OrderCancelReason_1.OrderCancelReason)
], OrderCancelReasonRepository);
exports.OrderCancelReasonRepository = OrderCancelReasonRepository;
//# sourceMappingURL=OrderCancelReasonRepository.js.map