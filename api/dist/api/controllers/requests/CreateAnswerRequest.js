"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAnswer = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateAnswer {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'Answer is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAnswer.prototype, "answer", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'QuestionId is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateAnswer.prototype, "questionId", void 0);
exports.CreateAnswer = CreateAnswer;
//# sourceMappingURL=CreateAnswerRequest.js.map