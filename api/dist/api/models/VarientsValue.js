"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarientsValue = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const Varients_1 = require("./Varients");
const ProductVarientOptionDetail_1 = require("./ProductVarientOptionDetail");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let VarientsValue = class VarientsValue extends BaseModel_1.BaseModel {
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
], VarientsValue.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'varients_id' }),
    tslib_1.__metadata("design:type", Number)
], VarientsValue.prototype, "varientsId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'value_name' }),
    tslib_1.__metadata("design:type", String)
], VarientsValue.prototype, "valueName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], VarientsValue.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], VarientsValue.prototype, "is_active", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Varients_1.Varients, varients => varients.varientsValue),
    typeorm_1.JoinColumn({ name: 'varients_id' }),
    tslib_1.__metadata("design:type", Varients_1.Varients)
], VarientsValue.prototype, "varients", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductVarientOptionDetail_1.ProductVarientOptionDetail, productVarientOptionDetail => productVarientOptionDetail.varientsValue),
    tslib_1.__metadata("design:type", Array)
], VarientsValue.prototype, "productVarientOptionDetail", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VarientsValue.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VarientsValue.prototype, "updateDetails", null);
VarientsValue = tslib_1.__decorate([
    typeorm_1.Entity('varients_value')
], VarientsValue);
exports.VarientsValue = VarientsValue;
//# sourceMappingURL=VarientsValue.js.map