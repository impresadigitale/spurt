"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Order_1 = require("../models/Order");
let OrderRepository = class OrderRepository extends typeorm_1.Repository {
    salesList() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'YEAR(created_date) as year']);
            query.andWhere('payment_process = :process', { process: 1 });
            query.groupBy('month');
            query.addGroupBy('year');
            query.orderBy('year', 'ASC');
            query.addOrderBy('month', 'ASC');
            query.limit('12');
            return query.getRawMany();
        });
    }
    findAllTodayOrder(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['order.total as total']);
            query.where('DATE(order.createdDate) = :todaydate', { todaydate });
            query.andWhere('payment_process = :process', { process: 1 });
            return query.getRawMany();
        });
    }
    findAllTodayOrderCount(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(order.orderId) as orderCount']);
            query.where('DATE(order.createdDate) = :todaydate', { todaydate });
            query.andWhere('payment_process = :process', { process: 1 });
            return query.getRawOne();
        });
    }
    orderCount(orderId, orderStatusId, totalAmount, customerName, dateAdded) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(DISTINCT(order.orderId)) as orderCount']);
            query.innerJoin('order.orderProduct', 'orderProduct');
            query.where('payment_process = :process', { process: 1 });
            if (orderId) {
                query.andWhere('order.orderPrefixId = :orderPrefixId', { orderPrefixId: orderId });
            }
            if (orderStatusId) {
                query.andWhere('orderProduct.orderStatusId = :orderStatusId', { orderStatusId });
            }
            if (totalAmount) {
                query.andWhere('order.total = :total', { total: totalAmount });
            }
            if (customerName) {
                query.andWhere('order.shippingFirstname = :shippingFirstname', { shippingFirstname: customerName });
            }
            if (dateAdded) {
                query.andWhere('order.createdDate = :createdDate', { createdDate: dateAdded });
            }
            return query.getRawOne();
        });
    }
};
OrderRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Order_1.Order)
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=OrderRepository.js.map