"use strict";
/*
 * Spurtcommerce PRO
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWidget = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateWidget {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.MaxLength(255, {
        message: 'name should be maximum 255 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateWidget.prototype, "title", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreateWidget.prototype, "widgetLinkType", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(60, {
        message: 'metatagTitle should be maximum 60 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateWidget.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(160, {
        message: 'metaTagDescription should be maximum 160 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateWidget.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateWidget.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreateWidget.prototype, "status", void 0);
exports.CreateWidget = CreateWidget;
//# sourceMappingURL=CreateWidgetRequest.js.map