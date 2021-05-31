"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorCategory_1 = require("../models/VendorCategory");
let VendorCategoryRepository = class VendorCategoryRepository extends typeorm_1.Repository {
    queryCategoryList(limit, offset, vendorId, keyword, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorCategory_1.VendorCategory, 'vendorCategory');
            query.select(['vendorCategory.vendorCategoryId as vendorCategoryId', 'vendorCategory.vendorId as vendorId', 'vendorCategory.categoryId as categoryId', 'vendorCategory.vendorCategoryCommission as vendorCategoryCommission', 'category.name as categoryName']);
            query.leftJoin('vendorCategory.category', 'category');
            query.where('vendorCategory.vendorId = :id', { id: vendorId });
            if (keyword) {
                query.andWhere('category.name LIKE ' + "'%" + keyword + "%'" + ' ');
            }
            query.limit(limit);
            query.offset(offset);
            if (count) {
                return query.getCount();
            }
            return query.getRawMany();
        });
    }
};
VendorCategoryRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(VendorCategory_1.VendorCategory)
], VendorCategoryRepository);
exports.VendorCategoryRepository = VendorCategoryRepository;
//# sourceMappingURL=VendorCategoryRepository.js.map