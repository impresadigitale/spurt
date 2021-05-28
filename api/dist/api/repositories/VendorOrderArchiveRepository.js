"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorOrderArchiveRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorOrderArchive_1 = require("../models/VendorOrderArchive");
let VendorOrderArchiveRepository = class VendorOrderArchiveRepository extends typeorm_1.Repository {
};
VendorOrderArchiveRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(VendorOrderArchive_1.VendorOrderArchive)
], VendorOrderArchiveRepository);
exports.VendorOrderArchiveRepository = VendorOrderArchiveRepository;
//# sourceMappingURL=VendorOrderArchiveRepository.js.map