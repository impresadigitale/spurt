"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePage = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreatePage {
}
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'title should be maximum 255 character',
    }),
    class_validator_1.IsNotEmpty({
        message: 'title is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreatePage.prototype, "title", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'content is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreatePage.prototype, "content", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreatePage.prototype, "active", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(60, {
        message: 'metatagTitle should be maximum 60 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreatePage.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(160, {
        message: 'metatagTitle should be maximum 160 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreatePage.prototype, "metaTagContent", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'metatagTitle should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreatePage.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'pageGroupId is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreatePage.prototype, "pageGroupId", void 0);
exports.CreatePage = CreatePage;
//# sourceMappingURL=CreatePageRequest.js.map