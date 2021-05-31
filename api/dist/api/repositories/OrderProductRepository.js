"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const OrderProduct_1 = require("../models/OrderProduct");
let OrderProductRepository = class OrderProductRepository extends typeorm_1.Repository {
    List(limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select(['DISTINCT product_id as productId', 'order_id as orderId', 'name as ProductName', 'quantity as Quantity', 'total as Total', ' created_date as CreatedDate', 'sku_name as skuName', 'varient_name as varientName']);
            query.orderBy('created_date', 'DESC');
            query.limit(limit);
            return query.getRawMany();
        });
    }
    // get earnings
    getEarnings(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select(['SUM(orderProduct.total + orderProduct.discountAmount) as productPriceTotal', 'COUNT(orderProduct.orderId) as orderCount', 'SUM(orderProduct.quantity) as quantityCount', 'COUNT(DISTINCT(product.customer_id)) as buyerCount']);
            query.innerJoin('orderProduct.product', 'product');
            query.where('orderProduct.productId = :productId', { productId: id });
            query.andWhere('product.paymentStatus = :value1', { value1: 1 });
            return query.getRawOne();
        });
    }
    buyedCount(productId, customerId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select('orderProduct.orderProductId');
            query.innerJoin('orderProduct.order', 'order');
            query.where('orderProduct.productId = :id AND order.customerId = :customerId ', { id: productId, customerId });
            query.andWhere('order.paymentStatus = :paymentStatus', { paymentStatus: 1 });
            return query.getRawMany();
        });
    }
    // get product payment process
    productPaymentProcess(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select(['orderProduct.orderProductId']);
            query.innerJoin('orderProduct.order', 'order');
            query.where('orderProduct.productId = :productId', { productId: id });
            query.andWhere('order.paymentProcess = :value1', { value1: 1 });
            return query.getRawOne();
        });
    }
    // get product varient payment process
    productVarientPaymentProcess(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(OrderProduct_1.OrderProduct, 'orderProduct');
            query.select(['orderProduct.orderProductId']);
            query.innerJoin('orderProduct.order', 'order');
            query.where('orderProduct.productVarientOptionId = :id', { id });
            query.andWhere('order.paymentProcess = :value1', { value1: 1 });
            return query.getRawOne();
        });
    }
};
OrderProductRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(OrderProduct_1.OrderProduct)
], OrderProductRepository);
exports.OrderProductRepository = OrderProductRepository;
//# sourceMappingURL=OrderProductRepository.js.map