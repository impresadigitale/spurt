"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSettlementRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateSettlementRequest {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'title is required',
    }),
    class_validator_1.MaxLength(255, {
        message: 'productName should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateSettlementRequest.prototype, "title", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Array)
], CreateSettlementRequest.prototype, "vendorOrderId", void 0);
exports.CreateSettlementRequest = CreateSettlementRequest;
//# sourceMappingURL=CreateSettlementRequest.js.map