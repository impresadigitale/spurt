"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateManufacturer = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateManufacturer {
}
tslib_1.__decorate([
    class_validator_1.MaxLength(64, {
        message: 'Name should be maximum 64 character',
    }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreateManufacturer.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], CreateManufacturer.prototype, "image", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'sortOrder is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateManufacturer.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'status is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateManufacturer.prototype, "status", void 0);
exports.CreateManufacturer = CreateManufacturer;
//# sourceMappingURL=CreateManufacturerRequest.js.map