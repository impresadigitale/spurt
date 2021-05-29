"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPerson = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const moment = require("moment/moment");
const DeliveryAllocation_1 = require("./DeliveryAllocation");
const DeliveryPersonToLocation_1 = require("./DeliveryPersonToLocation");
const class_validator_1 = require("class-validator");
let DeliveryPerson = class DeliveryPerson extends BaseModel_1.BaseModel {
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
    static comparePassword(user, password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
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
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryPerson.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryPerson.prototype, "vendorId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'first_name' }),
    tslib_1.__metadata("design:type", String)
], DeliveryPerson.prototype, "firstName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'last_name' }),
    tslib_1.__metadata("design:type", String)
], DeliveryPerson.prototype, "lastName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'email' }),
    tslib_1.__metadata("design:type", String)
], DeliveryPerson.prototype, "email", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'password' }),
    tslib_1.__metadata("design:type", String)
], DeliveryPerson.prototype, "password", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'mobile_number' }),
    tslib_1.__metadata("design:type", String)
], DeliveryPerson.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'location' }),
    tslib_1.__metadata("design:type", String)
], DeliveryPerson.prototype, "location", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'image' }),
    tslib_1.__metadata("design:type", String)
], DeliveryPerson.prototype, "image", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'image_path' }),
    tslib_1.__metadata("design:type", String)
], DeliveryPerson.prototype, "imagePath", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'delete_flag' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryPerson.prototype, "deleteFlag", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'all_location' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryPerson.prototype, "allLocation", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], DeliveryPerson.prototype, "isActive", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'last_login' }),
    tslib_1.__metadata("design:type", String)
], DeliveryPerson.prototype, "lastLogin", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => DeliveryAllocation_1.DeliveryAllocation, deliveryAllocation => deliveryAllocation.deliveryPerson),
    tslib_1.__metadata("design:type", Array)
], DeliveryPerson.prototype, "deliveryAllocation", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => DeliveryPersonToLocation_1.DeliveryPersonToLocation, deliveryPersonToLocation => deliveryPersonToLocation.deliveryPerson),
    tslib_1.__metadata("design:type", Array)
], DeliveryPerson.prototype, "deliveryPersonToLocation", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPerson.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeliveryPerson.prototype, "updateDetails", null);
DeliveryPerson = tslib_1.__decorate([
    typeorm_1.Entity('delivery_person')
], DeliveryPerson);
exports.DeliveryPerson = DeliveryPerson;
//# sourceMappingURL=DeliveryPerson.js.map