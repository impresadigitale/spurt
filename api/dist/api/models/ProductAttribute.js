"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAttribute = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const ProductModel_1 = require("./ProductModel");
const Attribute_1 = require("./Attribute");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let ProductAttribute = class ProductAttribute extends BaseModel_1.BaseModel {
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
], ProductAttribute.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAttribute.prototype, "productId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'attribute_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAttribute.prototype, "attributeId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'text' }),
    tslib_1.__metadata("design:type", String)
], ProductAttribute.prototype, "text", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => ProductModel_1.Product, product => product.productAttribute),
    typeorm_1.JoinColumn({ name: 'product_id' }),
    tslib_1.__metadata("design:type", ProductModel_1.Product)
], ProductAttribute.prototype, "product", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Attribute_1.Attribute, attribute => attribute.productAttribute),
    typeorm_1.JoinColumn({ name: 'attribute_id' }),
    tslib_1.__metadata("design:type", Attribute_1.Attribute)
], ProductAttribute.prototype, "attribute", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAttribute.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAttribute.prototype, "updateDetails", null);
ProductAttribute = tslib_1.__decorate([
    typeorm_1.Entity('product_attribute')
], ProductAttribute);
exports.ProductAttribute = ProductAttribute;
//# sourceMappingURL=ProductAttribute.js.map