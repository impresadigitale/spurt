"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnquiryRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class EnquiryRequest {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], EnquiryRequest.prototype, "serviceId", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'name should be maximum 32 character',
    }),
    class_validator_1.MinLength(3, {
        message: 'name should be minimum 3 character',
    }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], EnquiryRequest.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'email should be maximum 96 character',
    }),
    class_validator_1.MinLength(3, {
        message: 'email should be minimum 3 character',
    }),
    class_validator_1.IsEmail(),
    tslib_1.__metadata("design:type", String)
], EnquiryRequest.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(18, {
        message: 'mobile number should be maximun 15 digit',
    }),
    class_validator_1.MinLength(10, {
        message: 'mobile number should be minimum 10 digit',
    }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], EnquiryRequest.prototype, "mobile", void 0);
exports.EnquiryRequest = EnquiryRequest;
//# sourceMappingURL=CreateEnquiryRequest.js.map