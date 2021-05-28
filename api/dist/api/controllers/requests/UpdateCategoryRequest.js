"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UpdateCategoryRequest {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], UpdateCategoryRequest.prototype, "categoryId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], UpdateCategoryRequest.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], UpdateCategoryRequest.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(60, {
        message: 'metaTagTitle should be maximum 60 characters',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateCategoryRequest.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(160, {
        message: 'metaTagDescription should be maximum 160 characters',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateCategoryRequest.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'metaTagKeyword should be maximum 255 characters',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateCategoryRequest.prototype, "metaTagKeyword", void 0);
exports.UpdateCategoryRequest = UpdateCategoryRequest;
//# sourceMappingURL=UpdateCategoryRequest.js.map