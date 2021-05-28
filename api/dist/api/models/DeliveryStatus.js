"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStatus = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
let DeliveryStatus = class DeliveryStatus extends BaseModel_1.BaseModel {
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
    typeorm_1.PrimaryGeneratedColumn({ name: 'delivery_status_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryStatus.prototype, "deliveryStatusId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], DeliveryStatus.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryStatus.prototype, "isActive", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'priority' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryStatus.prototype, "priority", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'color_code' }),
    tslib_1.__metadata("design:type", String)
], DeliveryStatus.prototype, "colorCode", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryStatus.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryStatus.prototype, "updateDetails", null);
DeliveryStatus = tslib_1.__decorate([
    typeorm_1.Entity('delivery_status')
], DeliveryStatus);
exports.DeliveryStatus = DeliveryStatus;
//# sourceMappingURL=DeliveryStatus.js.map