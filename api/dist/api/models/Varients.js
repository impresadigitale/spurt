"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Varients = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const VarientsValue_1 = require("./VarientsValue");
const moment = require("moment");
const ProductVarient_1 = require("./ProductVarient");
const class_validator_1 = require("class-validator");
let Varients = class Varients extends BaseModel_1.BaseModel {
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
    index_1.PrimaryGeneratedColumn({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], Varients.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'type' }),
    tslib_1.__metadata("design:type", String)
], Varients.prototype, "type", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], Varients.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], Varients.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => VarientsValue_1.VarientsValue, varientsValue => varientsValue.varients),
    tslib_1.__metadata("design:type", Array)
], Varients.prototype, "varientsValue", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductVarient_1.ProductVarient, productVarient => productVarient.varients),
    tslib_1.__metadata("design:type", Array)
], Varients.prototype, "productVarient", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Varients.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Varients.prototype, "updateDetails", null);
Varients = tslib_1.__decorate([
    typeorm_1.Entity('varients')
], Varients);
exports.Varients = Varients;
//# sourceMappingURL=Varients.js.map