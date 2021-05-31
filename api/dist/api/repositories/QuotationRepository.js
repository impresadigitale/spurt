"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Quotation_1 = require("../models/Quotation");
let QuotationRepository = class QuotationRepository extends typeorm_1.Repository {
};
QuotationRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Quotation_1.Quotation)
], QuotationRepository);
exports.QuotationRepository = QuotationRepository;
//# sourceMappingURL=QuotationRepository.js.map