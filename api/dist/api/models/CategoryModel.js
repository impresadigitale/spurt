"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ProductToCategory_1 = require("./ProductToCategory");
const VendorCategory_1 = require("./VendorCategory");
const CategoryPath_1 = require("./CategoryPath");
const class_validator_1 = require("class-validator");
let Category = class Category extends BaseModel_1.BaseModel {
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
    index_1.PrimaryGeneratedColumn({ name: 'category_id' }),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "categoryId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'image' }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "image", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'image_path' }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "imagePath", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'parent_int' }),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "parentInt", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'meta_tag_title' }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'meta_tag_description' }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'meta_tag_keyword' }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'category_slug' }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "categorySlug", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "isActive", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductToCategory_1.ProductToCategory, productToCategory => productToCategory.category),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "productToCategory", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => VendorCategory_1.VendorCategory, vendorCategory => vendorCategory.category),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "vendorCategory", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => CategoryPath_1.CategoryPath, categoryPath => categoryPath.category),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "category", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => CategoryPath_1.CategoryPath, categoryPath => categoryPath.path),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "path", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Category.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Category.prototype, "updateDetails", null);
Category = tslib_1.__decorate([
    typeorm_1.Entity('category')
], Category);
exports.Category = Category;
//# sourceMappingURL=CategoryModel.js.map