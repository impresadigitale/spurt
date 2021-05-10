"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerReportAbuseRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const AnswerReportAbuse_1 = require("../models/AnswerReportAbuse");
let AnswerReportAbuseRepository = class AnswerReportAbuseRepository extends typeorm_1.Repository {
};
AnswerReportAbuseRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(AnswerReportAbuse_1.AnswerReportAbuse)
], AnswerReportAbuseRepository);
exports.AnswerReportAbuseRepository = AnswerReportAbuseRepository;
//# sourceMappingURL=AnswerReportAbuseRepository.js.map