"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryLocation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const DeliveryPersonToLocation_1 = require("./DeliveryPersonToLocation");
const DeliveryLocationToLocation_1 = require("./DeliveryLocationToLocation");
const moment = require("moment/moment");
const class_validator_1 = require("class-validator");
let DeliveryLocation = class DeliveryLocation extends BaseModel_1.BaseModel {
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
    typeorm_1.PrimaryGeneratedColumn({ name: 'delivery_location_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryLocation.prototype, "deliveryLocationId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryLocation.prototype, "vendorId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'zip_code' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryLocation.prototype, "zipCode", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'location_name' }),
    tslib_1.__metadata("design:type", String)
], DeliveryLocation.prototype, "locationName", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => DeliveryPersonToLocation_1.DeliveryPersonToLocation, deliveryPersonToLocation => deliveryPersonToLocation.deliveryLocation),
    tslib_1.__metadata("design:type", Array)
], DeliveryLocation.prototype, "deliveryPersonToLocation", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => DeliveryLocationToLocation_1.DeliveryLocationToLocation, deliveryPersonToLocation => deliveryPersonToLocation.deliveryLocation),
    tslib_1.__metadata("design:type", Array)
], DeliveryLocation.prototype, "deliveryLocationToLocation", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryLocation.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryLocation.prototype, "updateDetails", null);
DeliveryLocation = tslib_1.__decorate([
    typeorm_1.Entity('delivery_location')
], DeliveryLocation);
exports.DeliveryLocation = DeliveryLocation;
//# sourceMappingURL=DeliveryLocation.js.map