"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceEnquiryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ServiceEnquiry_1 = require("../models/ServiceEnquiry");
let ServiceEnquiryRepository = class ServiceEnquiryRepository extends typeorm_1.Repository {
};
ServiceEnquiryRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(ServiceEnquiry_1.ServiceEnquiry)
], ServiceEnquiryRepository);
exports.ServiceEnquiryRepository = ServiceEnquiryRepository;
//# sourceMappingURL=ServiceEnquiryRepository.js.map