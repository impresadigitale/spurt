"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const PaymentItems_1 = require("./PaymentItems");
const Order_1 = require("./Order");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let Payment = class Payment extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    index_1.PrimaryGeneratedColumn({ name: 'payment_id' }),
    tslib_1.__metadata("design:type", Number)
], Payment.prototype, "paymentId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], Payment.prototype, "orderId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'paid_date' }),
    tslib_1.__metadata("design:type", String)
], Payment.prototype, "paidDate", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'payment_number' }),
    tslib_1.__metadata("design:type", String)
], Payment.prototype, "paymentNumber", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'payment_information' }),
    tslib_1.__metadata("design:type", String)
], Payment.prototype, "paymentInformation", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'payment_amount' }),
    tslib_1.__metadata("design:type", Number)
], Payment.prototype, "paymentAmount", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'payment_commission_amount' }),
    tslib_1.__metadata("design:type", Number)
], Payment.prototype, "paymentCommissionAmount", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => PaymentItems_1.PaymentItems, paymentItems => paymentItems.payment),
    tslib_1.__metadata("design:type", Array)
], Payment.prototype, "paymentItems", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(type => Order_1.Order),
    typeorm_1.JoinColumn({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Order_1.Order)
], Payment.prototype, "orderDetail", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Payment.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Payment.prototype, "updateDetails", null);
Payment = tslib_1.__decorate([
    typeorm_1.Entity('payment')
], Payment);
exports.Payment = Payment;
//# sourceMappingURL=Payment.js.map