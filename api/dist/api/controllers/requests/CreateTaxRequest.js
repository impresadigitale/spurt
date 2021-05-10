"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaxRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateTaxRequest {
}
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'taxName should be maximum 255 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateTaxRequest.prototype, "taxName", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreateTaxRequest.prototype, "taxStatus", void 0);
exports.CreateTaxRequest = CreateTaxRequest;
//# sourceMappingURL=CreateTaxRequest.js.map