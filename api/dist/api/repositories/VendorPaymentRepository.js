"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPaymentRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorPayment_1 = require("../models/VendorPayment");
let VendorPaymentRepository = class VendorPaymentRepository extends typeorm_1.Repository {
    //  sale count
    getTotalSales(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorPayment_1.VendorPayment, 'vendorPayment');
            query.select(['COUNT(vendorPayment.vendorPaymentId) as salesCount']);
            query.where('vendorPayment.vendorId = :id', { id });
            return query.getRawOne();
        });
    }
    //  buyer count with login
    getTotalBuyers(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorPayment_1.VendorPayment, 'vendorPayment');
            query.select(['COUNT(DISTINCT(order.customer_id)) as buyerCount']);
            query.leftJoin('vendorPayment.vendorOrders', 'vendorOrders');
            query.leftJoin('vendorOrders.order', 'order');
            query.where('vendorPayment.vendorId = :id', { id });
            query.andWhere('order.customerId != :value1', { value1: 0 });
            return query.getRawOne();
        });
    }
    // get total vendor revenue
    getTotalVendorRevenue(vendorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorPayment_1.VendorPayment, 'vendorPayment');
            query.select(['vendorPayment.amount as amount', 'vendorPayment.commissionAmount as commissionAmount']);
            query.where('vendorPayment.vendorId = :id', { id: vendorId });
            return query.getRawMany();
        });
    }
};
VendorPaymentRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(VendorPayment_1.VendorPayment)
], VendorPaymentRepository);
exports.VendorPaymentRepository = VendorPaymentRepository;
//# sourceMappingURL=VendorPaymentRepository.js.map