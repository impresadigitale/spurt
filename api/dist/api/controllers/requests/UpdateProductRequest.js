"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UpdateProductRequest {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductRequest.prototype, "productId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(255, {
        message: 'productName should be maximum 60 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateProductRequest.prototype, "productName", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(64, {
        message: 'sku should be maximum 64 character',
    }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], UpdateProductRequest.prototype, "sku", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(12, {
        message: 'upc should be maximum 12 characters',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateProductRequest.prototype, "upc", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(64, {
        message: 'hsn should be maximum 64 characters',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateProductRequest.prototype, "hsn", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'productSlug should be maximum 255 characters',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateProductRequest.prototype, "productSlug", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(60, {
        message: 'metatagTitle should be maximum 60 characters',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateProductRequest.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(160, {
        message: 'metaTagDescription should be maximum 160 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateProductRequest.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateProductRequest.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], UpdateProductRequest.prototype, "categoryId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], UpdateProductRequest.prototype, "image", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductRequest.prototype, "price", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductRequest.prototype, "status", void 0);
exports.UpdateProductRequest = UpdateProductRequest;
//# sourceMappingURL=UpdateProductRequest.js.map