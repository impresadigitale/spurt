"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerAbuseReasonRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const AnswerAbuseReason_1 = require("../models/AnswerAbuseReason");
let AnswerAbuseReasonRepository = class AnswerAbuseReasonRepository extends typeorm_1.Repository {
};
AnswerAbuseReasonRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(AnswerAbuseReason_1.AnswerAbuseReason)
], AnswerAbuseReasonRepository);
exports.AnswerAbuseReasonRepository = AnswerAbuseReasonRepository;
//# sourceMappingURL=AnswerAbuseReasonRepository.js.map