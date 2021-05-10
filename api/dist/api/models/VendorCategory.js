"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCategory = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const CategoryModel_1 = require("./CategoryModel");
let VendorCategory = class VendorCategory {
};
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.PrimaryGeneratedColumn({ name: 'vendor_category_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCategory.prototype, "vendorCategoryId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCategory.prototype, "vendorId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], VendorCategory.prototype, "categoryId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'vendor_category_commission' }),
    tslib_1.__metadata("design:type", Number)
], VendorCategory.prototype, "vendorCategoryCommission", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => CategoryModel_1.Category, category => category.vendorCategory),
    typeorm_1.JoinColumn({ name: 'category_id' }),
    tslib_1.__metadata("design:type", CategoryModel_1.Category)
], VendorCategory.prototype, "category", void 0);
VendorCategory = tslib_1.__decorate([
    typeorm_1.Entity('vendor_category')
], VendorCategory);
exports.VendorCategory = VendorCategory;
//# sourceMappingURL=VendorCategory.js.map