"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettlementItemRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const SettlementItem_1 = require("../models/SettlementItem");
let SettlementItemRepository = class SettlementItemRepository extends typeorm_1.Repository {
};
SettlementItemRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(SettlementItem_1.SettlementItem)
], SettlementItemRepository);
exports.SettlementItemRepository = SettlementItemRepository;
//# sourceMappingURL=SettlementItemRepository.js.map