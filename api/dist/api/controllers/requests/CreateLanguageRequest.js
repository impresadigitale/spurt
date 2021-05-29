"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLanguage = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateLanguage {
}
tslib_1.__decorate([
    class_validator_1.MaxLength(32, {
        message: 'name should be maximum 32 character',
    }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreateLanguage.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(5, {
        message: 'code should be maximum 5 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateLanguage.prototype, "code", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], CreateLanguage.prototype, "status", void 0);
exports.CreateLanguage = CreateLanguage;
//# sourceMappingURL=CreateLanguageRequest.js.map