"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductsRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorProducts_1 = require("../models/VendorProducts");
const VendorOrders_1 = require("../models/VendorOrders");
let VendorProductsRepository = class VendorProductsRepository extends typeorm_1.Repository {
    topProductSelling(id, duration, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorOrders_1.VendorOrders, 'vendorOrders');
            query.select(['SUM(orderProduct.quantity) as soldCount', 'COUNT(DISTINCT(order.customer_id)) as buyerCount', 'orderProduct.product_id as product']);
            query.leftJoin('vendorOrders.order', 'order');
            query.leftJoin('vendorOrders.orderProduct', 'orderProduct');
            query.where('vendorOrders.vendorId = :id', { id });
            query.andWhere('order.paymentProcess = :paymentProcess', { paymentProcess: 1 });
            if (duration === 1 && duration) {
                query.andWhere('WEEKOFYEAR(vendorOrders.modified_date) = WEEKOFYEAR(NOW())');
            }
            else if (duration === 2 && duration) {
                query.andWhere('MONTH(vendorOrders.modified_date) = MONTH(NOW()) AND YEAR(vendorOrders.modified_date) = YEAR(NOW())');
            }
            else if (duration === 3 && duration) {
                query.andWhere('YEAR(vendorOrders.modified_date) = YEAR(NOW())');
            }
            query.groupBy('product');
            query.orderBy('soldCount', 'DESC');
            query.limit(limit);
            return query.getRawMany();
        });
    }
    vendorActiveProduct(id, limit, offset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorProducts_1.VendorProducts, 'vendorProducts');
            query.select(['vendorProducts.product_id as productId', 'product.is_active as isActive']);
            query.leftJoin('vendorProducts.product', 'product');
            query.where('vendorProducts.vendorId = :id', { id });
            query.andWhere('product.isActive = :isActive', { isActive: 1 });
            query.limit(limit);
            query.offset(offset);
            return query.getRawMany();
        });
    }
    // finding product for vendor category
    findingProduct(categoryId, vendorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorProducts_1.VendorProducts, 'vendorProducts');
            query.select(['vendorProducts.product_id as productId']);
            query.innerJoin('vendorProducts.product', 'product');
            query.innerJoin('product.productToCategory', 'productToCategory');
            query.where('productToCategory.categoryId = :categoryId', { categoryId });
            query.andWhere('vendorProducts.vendorId = :value1', { value1: vendorId });
            return query.getRawOne();
        });
    }
};
VendorProductsRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(VendorProducts_1.VendorProducts)
], VendorProductsRepository);
exports.VendorProductsRepository = VendorProductsRepository;
//# sourceMappingURL=VendorProductRepository.js.map