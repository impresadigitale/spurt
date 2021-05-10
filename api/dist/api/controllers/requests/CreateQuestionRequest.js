"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestion = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateQuestion {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'question is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateQuestion.prototype, "question", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'ProductId is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateQuestion.prototype, "productId", void 0);
exports.CreateQuestion = CreateQuestion;
//# sourceMappingURL=CreateQuestionRequest.js.map