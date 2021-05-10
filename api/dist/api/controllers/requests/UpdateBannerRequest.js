"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBanner = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UpdateBanner {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], UpdateBanner.prototype, "bannerId", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'title should be maximum 255 character',
    }),
    class_validator_1.IsNotEmpty({
        message: 'title is required',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateBanner.prototype, "title", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'link should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateBanner.prototype, "link", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], UpdateBanner.prototype, "status", void 0);
exports.UpdateBanner = UpdateBanner;
//# sourceMappingURL=UpdateBannerRequest.js.map