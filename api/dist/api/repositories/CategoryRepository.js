"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CategoryModel_1 = require("../models/CategoryModel");
let CategoryRepository = class CategoryRepository extends typeorm_1.Repository {
    categorySlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(CategoryModel_1.Category, 'category');
            query.where('category.metaTagTitle = :value', { value: data });
            query.orWhere('category.name = :name', { name: data });
            return query.getMany();
        });
    }
    categorySlugData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(CategoryModel_1.Category, 'category');
            query.select('category_slug');
            query.where('category.metaTagTitle = :value', { value: data });
            query.orWhere('category.name = :name', { name: data });
            return query.getMany();
        });
    }
    categoryCount(limit, offset, keyword, sortOrder, status) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(CategoryModel_1.Category, 'category');
            query.select('COUNT(category.categoryId) as categoryCount');
            if (status !== undefined) {
                query.where('category.is_Active = :value', { value: status });
            }
            if (keyword !== undefined && keyword !== '') {
                query.andWhere('category.name LIKE ' + "'%" + keyword + "%'" + ' ');
            }
            query.orderBy('category.created_date', 'DESC');
            query.limit(limit);
            query.offset(offset);
            return query.getRawOne();
        });
    }
};
CategoryRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(CategoryModel_1.Category)
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=CategoryRepository.js.map