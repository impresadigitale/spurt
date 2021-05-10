"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductModel_1 = require("../models/ProductModel");
const ProductToCategory_1 = require("../models/ProductToCategory");
const OrderProduct_1 = require("../models/OrderProduct");
let ProductRepository = class ProductRepository extends typeorm_1.Repository {
    productList(limit, offset, select = [], searchConditions = [], whereConditions = [], categoryId = [], priceFrom, priceTo, price, count) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductModel_1.Product, 'product');
            // Select
            if (select && select.length > 0) {
                query.select(select);
            }
            // Keyword Search
            if (searchConditions && searchConditions.length > 0) {
                searchConditions.forEach((table) => {
                    const operator = table.op;
                    if (operator === 'where' && table.value !== '') {
                        query.where(table.name + ' = ' + table.value);
                    }
                    else if (operator === 'and' && table.value !== '') {
                        query.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                    }
                    else if (operator === 'or' && table.value !== '') {
                        query.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                    }
                    else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
                        query.andWhere(table.name + ' = ' + table.value);
                    }
                });
            }
            // Keyword Search
            if (categoryId) {
                if (whereConditions && whereConditions.length > 0) {
                    whereConditions.forEach((table) => {
                        const operator = table.op;
                        if (operator === 'inraw' && table.value !== undefined) {
                            const subQb = this.manager
                                .getRepository(ProductToCategory_1.ProductToCategory)
                                .createQueryBuilder('productToCategory')
                                .select('product_id')
                                .where('category_id = ' + table.value);
                            query.andWhere(table.name + ' IN (' + subQb.getSql() + ')');
                        }
                    });
                }
            }
            if (priceFrom && priceTo) {
                query.andWhere('(product.price >= :priceFrom AND product.price <= :priceTo)', { priceFrom, priceTo });
            }
            if (price) {
                query.orderBy('product.price', price === 1 ? 'ASC' : 'DESC');
            }
            query.orderBy('product.sortOrder', 'ASC');
            // Limit & Offset
            if (limit && limit > 0) {
                query.limit(limit);
                query.offset(offset);
            }
            if (count) {
                return query.getCount();
            }
            return query.getMany();
        });
    }
    recentProductSelling(limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select(['COUNT(orderProduct.order_id) as ordercount', 'orderProduct.product_id as product', 'orderProduct.productVarientOptionId as productVarient', 'orderProduct.skuName as skuName', 'orderProduct.varientName as varientName']);
            query.groupBy('product');
            query.addGroupBy('productVarient');
            query.orderBy('ordercount', 'DESC');
            query.limit(limit);
            return query.getRawMany();
        });
    }
    // get product max price
    productMaxPrice(maximum) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductModel_1.Product, 'product');
            query.select(maximum);
            return query.getRawOne();
        });
    }
    productSlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductModel_1.Product, 'product');
            query.where('product.metaTagTitle = :value OR product.name = :value', { value: data });
            return query.getMany();
        });
    }
    productSlugData(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductModel_1.Product, 'product');
            query.select('product_slug');
            query.where('product.metaTagTitle = :value OR product.name = :value', { value: data });
            return query.getMany();
        });
    }
    buyedCount(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductModel_1.Product, 'product');
            query.select('product_slug');
            query.where('product.metaTagTitle = :value OR product.name = :value', { value: data });
            return query.getMany();
        });
    }
    findSkuName(productId, skuName, flag) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductModel_1.Product, 'product');
            query.select('skuDetail.skuName');
            query.innerJoin('product.skuDetail', 'skuDetail');
            if (flag === 0) {
                query.where('product.productId != :value ', { value: productId });
            }
            else {
                query.where('product.productId = :value ', { value: productId });
            }
            query.andWhere('skuDetail.skuName LIKE :skuName ', { skuName });
            return query.getRawOne();
        });
    }
    findSkuForProductVarient(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductModel_1.Product, 'product');
            query.select(['skuDetail.id as id', 'skuDetail.skuName as skuName', 'skuDetail.price as price', 'skuDetail.enableBackOrders as enableBackOrders', 'skuDetail.outOfStockThreshold as outOfStockThreshold', 'skuDetail.notifyMinQuantity as notifyMinQuantity', 'skuDetail.minQuantityAllowedCart as minQuantityAllowedCart', 'skuDetail.maxQuantityAllowedCart as maxQuantityAllowedCart']);
            query.leftJoin('product.productVarientOption', 'productVarientOption');
            query.leftJoin('productVarientOption.skuDetail', 'skuDetail');
            query.where('productVarientOption.productId = :id', { id: productId });
            return query.getRawMany();
        });
    }
    checkSlugData(slug, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductModel_1.Product, 'product');
            query.where('product.product_slug = :slug', { slug });
            if (id > 0) {
                query.andWhere('product.productId != :id', { id });
            }
            return query.getCount();
        });
    }
};
ProductRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(ProductModel_1.Product)
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=ProductRepository.js.map