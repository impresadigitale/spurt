"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Jobs_1 = require("../models/Jobs");
let JobsRepository = class JobsRepository extends typeorm_1.Repository {
};
JobsRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Jobs_1.Jobs)
], JobsRepository);
exports.JobsRepository = JobsRepository;
//# sourceMappingURL=JobsRepository.js.map