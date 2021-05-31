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
exports.CreateBlog = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateBlog {
}
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'title should be maximum 255 characters',
    }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreateBlog.prototype, "title", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'categoryId is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateBlog.prototype, "categoryId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'description is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateBlog.prototype, "description", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreateBlog.prototype, "status", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(60, {
        message: 'metaTagTitle should be maximum 60 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateBlog.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(160, {
        message: 'metaTagDescription should be maximum 160 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateBlog.prototype, "metaTagDescription", void 0);
exports.CreateBlog = CreateBlog;
//# sourceMappingURL=CreateBlogRequest.js.map