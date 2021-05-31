"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientOptionDetail = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const ProductVarientOption_1 = require("./ProductVarientOption");
const VarientsValue_1 = require("./VarientsValue");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let ProductVarientOptionDetail = class ProductVarientOptionDetail extends BaseModel_1.BaseModel {
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
], ProductVarientOptionDetail.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'product_varient_option_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOptionDetail.prototype, "productVarientOptionId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'varients_value_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOptionDetail.prototype, "varientsValueId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOptionDetail.prototype, "isActive", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => ProductVarientOption_1.ProductVarientOption, productVarientOption => productVarientOption.productVarientOptionDetail),
    typeorm_1.JoinColumn({ name: 'product_varient_option_id' }),
    tslib_1.__metadata("design:type", ProductVarientOption_1.ProductVarientOption)
], ProductVarientOptionDetail.prototype, "productVarientOption", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => VarientsValue_1.VarientsValue, varientsValue => varientsValue.productVarientOptionDetail),
    typeorm_1.JoinColumn({ name: 'varients_value_id' }),
    tslib_1.__metadata("design:type", VarientsValue_1.VarientsValue)
], ProductVarientOptionDetail.prototype, "varientsValue", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVarientOptionDetail.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVarientOptionDetail.prototype, "updateDetails", null);
ProductVarientOptionDetail = tslib_1.__decorate([
    typeorm_1.Entity('product_varient_option_details')
], ProductVarientOptionDetail);
exports.ProductVarientOptionDetail = ProductVarientOptionDetail;
//# sourceMappingURL=ProductVarientOptionDetail.js.map