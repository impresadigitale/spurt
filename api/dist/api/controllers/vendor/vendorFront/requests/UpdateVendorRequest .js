"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVendorRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UpdateVendorRequest {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'first name is required',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "firstName", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'last name is required',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "lastName", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'Email Id is required',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'mobile number is required',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateVendorRequest.prototype, "mobileNumber", void 0);
exports.UpdateVendorRequest = UpdateVendorRequest;
//# sourceMappingURL=UpdateVendorRequest .js.map