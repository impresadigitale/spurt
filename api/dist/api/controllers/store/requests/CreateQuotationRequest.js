"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class QuotationRequest {
}
tslib_1.__decorate([
    class_validator_1.MaxLength(9, {
        message: 'quantity should be maximum 9 digit',
    }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], QuotationRequest.prototype, "quantity", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], QuotationRequest.prototype, "productId", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'orderValue should be maximum 255 character',
    }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], QuotationRequest.prototype, "orderValue", void 0);
exports.QuotationRequest = QuotationRequest;
//# sourceMappingURL=CreateQuotationRequest.js.map