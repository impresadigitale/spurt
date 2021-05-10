"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCart = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ProductModel_1 = require("./ProductModel");
const class_validator_1 = require("class-validator");
let CustomerCart = class CustomerCart extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    index_1.PrimaryGeneratedColumn({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerCart.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerCart.prototype, "productId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], CustomerCart.prototype, "customerId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], CustomerCart.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'quantity' }),
    tslib_1.__metadata("design:type", String)
], CustomerCart.prototype, "quantity", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_price' }),
    tslib_1.__metadata("design:type", String)
], CustomerCart.prototype, "productPrice", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'tire_price' }),
    tslib_1.__metadata("design:type", String)
], CustomerCart.prototype, "tirePrice", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'total' }),
    tslib_1.__metadata("design:type", Number)
], CustomerCart.prototype, "total", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'option_name' }),
    tslib_1.__metadata("design:type", String)
], CustomerCart.prototype, "optionName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'option_value_name' }),
    tslib_1.__metadata("design:type", String)
], CustomerCart.prototype, "optionValueName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_option_value_id' }),
    tslib_1.__metadata("design:type", String)
], CustomerCart.prototype, "productOptionValueId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'sku_name' }),
    tslib_1.__metadata("design:type", String)
], CustomerCart.prototype, "skuName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'varient_name' }),
    tslib_1.__metadata("design:type", String)
], CustomerCart.prototype, "varientName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_varient_option_id' }),
    tslib_1.__metadata("design:type", String)
], CustomerCart.prototype, "productVarientOptionId", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => ProductModel_1.Product, product => product.cart),
    typeorm_1.JoinColumn({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], CustomerCart.prototype, "product", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCart.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerCart.prototype, "updateDetails", null);
CustomerCart = tslib_1.__decorate([
    typeorm_1.Entity('customer_cart')
], CustomerCart);
exports.CustomerCart = CustomerCart;
//# sourceMappingURL=CustomerCart.js.map