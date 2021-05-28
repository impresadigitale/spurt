"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quotation = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const ProductModel_1 = require("./ProductModel");
const Customer_1 = require("./Customer");
const class_validator_1 = require("class-validator");
let Quotation = class Quotation extends BaseModel_1.BaseModel {
    // @ManyToOne(type => VendorProducts, vendorProduct => vendorProduct.quotation)
    // @JoinColumn({ name: 'product_id' })
    // public vendorProducts: VendorProducts;
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
], Quotation.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "productId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "customerId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'quantity' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "quantity", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'quantity_unit' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "quantityUnit", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'order_value' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "orderValue", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'purpose' }),
    tslib_1.__metadata("design:type", Number)
], Quotation.prototype, "purpose", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'comments' }),
    tslib_1.__metadata("design:type", String)
], Quotation.prototype, "comments", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => ProductModel_1.Product, product => product.quotation),
    typeorm_1.JoinColumn({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], Quotation.prototype, "product", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Customer_1.Customer, customer => customer.quotation),
    typeorm_1.JoinColumn({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], Quotation.prototype, "customer", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Quotation.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Quotation.prototype, "updateDetails", null);
Quotation = tslib_1.__decorate([
    typeorm_1.Entity('quotation')
], Quotation);
exports.Quotation = Quotation;
//# sourceMappingURL=Quotation.js.map