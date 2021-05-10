"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryAllocation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const moment = require("moment/moment");
const VendorOrders_1 = require("./VendorOrders");
const Order_1 = require("./Order");
const DeliveryPerson_1 = require("./DeliveryPerson");
const DeliveryStatus_1 = require("./DeliveryStatus");
const class_validator_1 = require("class-validator");
let DeliveryAllocation = class DeliveryAllocation extends BaseModel_1.BaseModel {
    static hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }
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
    typeorm_1.PrimaryGeneratedColumn({ name: 'delivery_allocation_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryAllocation.prototype, "deliveryAllocationId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryAllocation.prototype, "vendorOrderId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryAllocation.prototype, "orderId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'delivery_person_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryAllocation.prototype, "deliveryPersonId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'delivery_order_status_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryAllocation.prototype, "deliveryOrderStatusId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryAllocation.prototype, "isActive", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => VendorOrders_1.VendorOrders, vendorOrders => vendorOrders.deliveryAllocation),
    typeorm_1.JoinColumn({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", Array)
], DeliveryAllocation.prototype, "vendorOrders", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Order_1.Order, order => order.deliveryAllocation),
    typeorm_1.JoinColumn({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Array)
], DeliveryAllocation.prototype, "order", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => DeliveryPerson_1.DeliveryPerson, deliveryPerson => deliveryPerson.deliveryAllocation),
    typeorm_1.JoinColumn({ name: 'delivery_person_id' }),
    tslib_1.__metadata("design:type", Array)
], DeliveryAllocation.prototype, "deliveryPerson", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(type => Order_1.Order),
    typeorm_1.JoinColumn({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Order_1.Order)
], DeliveryAllocation.prototype, "orderDetail", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(type => VendorOrders_1.VendorOrders),
    typeorm_1.JoinColumn({ name: 'vendor_order_id' }),
    tslib_1.__metadata("design:type", VendorOrders_1.VendorOrders)
], DeliveryAllocation.prototype, "vendorOrderDetail", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(type => DeliveryPerson_1.DeliveryPerson),
    typeorm_1.JoinColumn({ name: 'delivery_person_id' }),
    tslib_1.__metadata("design:type", DeliveryPerson_1.DeliveryPerson)
], DeliveryAllocation.prototype, "deliveryPersonDetail", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(type => DeliveryStatus_1.DeliveryStatus),
    typeorm_1.JoinColumn({ name: 'delivery_order_status_id' }),
    tslib_1.__metadata("design:type", DeliveryStatus_1.DeliveryStatus)
], DeliveryAllocation.prototype, "statusDetail", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryAllocation.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryAllocation.prototype, "updateDetails", null);
DeliveryAllocation = tslib_1.__decorate([
    typeorm_1.Entity('delivery_allocation')
], DeliveryAllocation);
exports.DeliveryAllocation = DeliveryAllocation;
//# sourceMappingURL=DeliveryAllocation.js.map