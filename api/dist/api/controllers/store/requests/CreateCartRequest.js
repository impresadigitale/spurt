"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCartRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
require("reflect-metadata");
class CreateCartRequest {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'productId is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateCartRequest.prototype, "productId", void 0);
exports.CreateCartRequest = CreateCartRequest;
//# sourceMappingURL=CreateCartRequest.js.map