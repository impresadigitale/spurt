"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorProductRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateVendorProductRequest {
}
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'productName should be maximum 255 character',
    }),
    class_validator_1.IsNotEmpty({
        message: 'productName is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendorProductRequest.prototype, "productName", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(64, {
        message: 'sku should be maximum 64 character',
    }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreateVendorProductRequest.prototype, "sku", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(12, {
        message: 'upc should be maximum 12 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendorProductRequest.prototype, "upc", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(64, {
        message: 'hsn should be maximum 64 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendorProductRequest.prototype, "hsn", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'productSlug should be maximum 255 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendorProductRequest.prototype, "productSlug", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(60, {
        message: 'metatagTitle should be maximum 60 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendorProductRequest.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(160, {
        message: 'metaTagDescription should be maximum 160 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendorProductRequest.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendorProductRequest.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreateVendorProductRequest.prototype, "categoryId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreateVendorProductRequest.prototype, "image", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreateVendorProductRequest.prototype, "vendorId", void 0);
exports.CreateVendorProductRequest = CreateVendorProductRequest;
//# sourceMappingURL=CreateVendorProductRequest.js.map