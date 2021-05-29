"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPersonToLocation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const DeliveryPerson_1 = require("./DeliveryPerson");
const DeliveryLocation_1 = require("./DeliveryLocation");
const class_validator_1 = require("class-validator");
let DeliveryPersonToLocation = class DeliveryPersonToLocation extends BaseModel_1.BaseModel {
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
    typeorm_1.PrimaryGeneratedColumn({ name: 'delivery_person_to_location_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryPersonToLocation.prototype, "deliveryPersonToLocationId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'delivery_person_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryPersonToLocation.prototype, "deliveryPersonId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'delivery_location_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryPersonToLocation.prototype, "deliveryLocationId", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => DeliveryLocation_1.DeliveryLocation, deliveryLocation => deliveryLocation.deliveryPersonToLocation),
    typeorm_1.JoinColumn({ name: 'delivery_location_id' }),
    tslib_1.__metadata("design:type", DeliveryLocation_1.DeliveryLocation)
], DeliveryPersonToLocation.prototype, "deliveryLocation", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => DeliveryPerson_1.DeliveryPerson, deliveryPerson => deliveryPerson.deliveryPersonToLocation),
    typeorm_1.JoinColumn({ name: 'delivery_person_id' }),
    tslib_1.__metadata("design:type", DeliveryPerson_1.DeliveryPerson)
], DeliveryPersonToLocation.prototype, "deliveryPerson", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPersonToLocation.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPersonToLocation.prototype, "updateDetails", null);
DeliveryPersonToLocation = tslib_1.__decorate([
    typeorm_1.Entity('delivery_person_to_location')
], DeliveryPersonToLocation);
exports.DeliveryPersonToLocation = DeliveryPersonToLocation;
//# sourceMappingURL=DeliveryPersonToLocation.js.map