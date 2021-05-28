"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAddress = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateAddress {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreateAddress.prototype, "customerId", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(128, {
        message: 'address1 should be maximum 128 characters',
    }),
    class_validator_1.IsNotEmpty({
        message: 'address1 is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAddress.prototype, "address1", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(128, {
        message: 'address1 should be maximum 128 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAddress.prototype, "address2", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(128, {
        message: 'city should be maximum 128 characters',
    }),
    class_validator_1.IsNotEmpty({
        message: 'city is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAddress.prototype, "city", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(128, {
        message: 'state should be maximum 128 characters',
    }),
    class_validator_1.IsNotEmpty({
        message: 'state is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAddress.prototype, "state", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(10, {
        message: 'postcode should be maximum 6 characters',
    }),
    class_validator_1.ValidateIf(o => o.postcode !== ''),
    tslib_1.__metadata("design:type", Number)
], CreateAddress.prototype, "postcode", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreateAddress.prototype, "addressType", void 0);
exports.CreateAddress = CreateAddress;
//# sourceMappingURL=CreateAddressRequest.js.map