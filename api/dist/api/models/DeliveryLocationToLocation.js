"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryLocationToLocation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const DeliveryLocation_1 = require("./DeliveryLocation");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
let DeliveryLocationToLocation = class DeliveryLocationToLocation extends BaseModel_1.BaseModel {
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
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryLocationToLocation.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'delivery_location_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryLocationToLocation.prototype, "deliveryLocationId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'location' }),
    tslib_1.__metadata("design:type", String)
], DeliveryLocationToLocation.prototype, "location", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => DeliveryLocation_1.DeliveryLocation, deliveryLocation => deliveryLocation.deliveryLocationToLocation),
    typeorm_1.JoinColumn({ name: 'delivery_location_id' }),
    tslib_1.__metadata("design:type", DeliveryLocation_1.DeliveryLocation)
], DeliveryLocationToLocation.prototype, "deliveryLocation", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryLocationToLocation.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryLocationToLocation.prototype, "updateDetails", null);
DeliveryLocationToLocation = tslib_1.__decorate([
    typeorm_1.Entity('delivery_location_to_location')
], DeliveryLocationToLocation);
exports.DeliveryLocationToLocation = DeliveryLocationToLocation;
//# sourceMappingURL=DeliveryLocationToLocation.js.map