"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductModel_1 = require("../models/ProductModel");
const ProductRating_1 = require("../models/ProductRating");
let RatingRepository = class RatingRepository extends typeorm_1.Repository {
    ratingConsolidate(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const consolidate = yield this.manager.createQueryBuilder(ProductRating_1.ProductRating, 'rating')
                .select(['COUNT(rating.rating) as RatingCount'])
                .addSelect(['SUM(rating.rating) as RatingSum'])
                .where('rating.productId = :productId', { productId: id })
                .andWhere('rating.isActive = :value', { value: 1 })
                .getRawOne();
            return consolidate;
        });
    }
    // rating statistics
    ratingStatistics(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductRating_1.ProductRating, 'productRating');
            query.select(['COUNT(productRating.rating) as rating']);
            query.addSelect(['COUNT(productRating.review) as review']);
            query.where('productRating.productId = :productId', { productId: id });
            query.andWhere('productRating.isActive = :value', { value: 1 });
            return query.getRawOne();
        });
    }
    ratingConsolidateForVendor(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const consolidate = yield this.manager.createQueryBuilder(ProductRating_1.ProductRating, 'rating')
                .select(['COUNT(rating.rating) as RatingCount'])
                .addSelect(['SUM(rating.rating) as RatingSum'])
                .innerJoin('rating.product', 'product')
                .innerJoin('product.vendorProducts', 'vendorProducts')
                .where('vendorProducts.vendorId = :vendorId', { vendorId: id })
                .andWhere('rating.isActive = :value', { value: 1 })
                .getRawOne();
            return consolidate;
        });
    }
    productRatingList(limit, offset, select = [], searchConditions = [], whereConditions = [], count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductRating_1.ProductRating, 'rating');
            // Select
            if (select && select.length > 0) {
                query.select(select);
            }
            // where condition
            if (whereConditions && whereConditions.length > 0) {
                whereConditions.forEach((table) => {
                    const operator = table.op;
                    if (operator === 'where' && table.value !== undefined) {
                        const subQb = this.manager
                            .getRepository(ProductModel_1.Product)
                            .createQueryBuilder('product')
                            .select('product_id')
                            .where('name LIKE ' + "'%" + table.value + "%'" + ' ');
                        query.where(table.name + ' IN (' + subQb.getSql() + ')');
                    }
                });
            }
            // Limit & Offset
            if (limit && limit > 0) {
                query.limit(limit);
                query.offset(offset);
            }
            query.orderBy('rating.rating_id', 'DESC');
            if (count) {
                return query.getCount();
            }
            return query.getMany();
        });
    }
};
RatingRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(ProductRating_1.ProductRating)
], RatingRepository);
exports.RatingRepository = RatingRepository;
//# sourceMappingURL=RatingRepository.js.map