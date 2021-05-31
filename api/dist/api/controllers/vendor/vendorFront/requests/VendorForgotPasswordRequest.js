"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorForgotPasswordRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class VendorForgotPasswordRequest {
}
tslib_1.__decorate([
    class_validator_1.MaxLength(60, {
        message: 'Name is maximum 30 character',
    }),
    class_validator_1.MinLength(4, {
        message: 'Name is minimum 4 character',
    }),
    class_validator_1.IsEmail(),
    tslib_1.__metadata("design:type", String)
], VendorForgotPasswordRequest.prototype, "email", void 0);
exports.VendorForgotPasswordRequest = VendorForgotPasswordRequest;
//# sourceMappingURL=VendorForgotPasswordRequest.js.map