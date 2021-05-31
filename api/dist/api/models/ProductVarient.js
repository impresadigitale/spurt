"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarient = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const ProductModel_1 = require("./ProductModel");
const Varients_1 = require("./Varients");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let ProductVarient = class ProductVarient extends BaseModel_1.BaseModel {
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
], ProductVarient.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarient.prototype, "productId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'varients_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarient.prototype, "varientsId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarient.prototype, "isActive", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => ProductModel_1.Product, product => product.productVarient),
    typeorm_1.JoinColumn({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], ProductVarient.prototype, "product", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Varients_1.Varients, varients => varients.productVarient),
    typeorm_1.JoinColumn({ name: 'varients_id' }),
    tslib_1.__metadata("design:type", Varients_1.Varients)
], ProductVarient.prototype, "varients", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVarient.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVarient.prototype, "updateDetails", null);
ProductVarient = tslib_1.__decorate([
    typeorm_1.Entity('product_varient')
], ProductVarient);
exports.ProductVarient = ProductVarient;
//# sourceMappingURL=ProductVarient.js.map