"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientOptionImage = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ProductVarientOption_1 = require("./ProductVarientOption");
let ProductVarientOptionImage = class ProductVarientOptionImage extends BaseModel_1.BaseModel {
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
    typeorm_1.PrimaryGeneratedColumn({ name: 'id' }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOptionImage.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'product_varient_option_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOptionImage.prototype, "productVarientOptionId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'image' }),
    tslib_1.__metadata("design:type", String)
], ProductVarientOptionImage.prototype, "image", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'container_name' }),
    tslib_1.__metadata("design:type", String)
], ProductVarientOptionImage.prototype, "containerName", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'default_image' }),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOptionImage.prototype, "defaultImage", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => ProductVarientOption_1.ProductVarientOption, productVarientOption => productVarientOption.image),
    typeorm_1.JoinColumn({ name: 'product_varient_option_id' }),
    tslib_1.__metadata("design:type", ProductVarientOption_1.ProductVarientOption)
], ProductVarientOptionImage.prototype, "productVarientOption", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVarientOptionImage.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductVarientOptionImage.prototype, "updateDetails", null);
ProductVarientOptionImage = tslib_1.__decorate([
    typeorm_1.Entity('product_varient_option_image')
], ProductVarientOptionImage);
exports.ProductVarientOptionImage = ProductVarientOptionImage;
//# sourceMappingURL=ProductVarientOptionImage.js.map