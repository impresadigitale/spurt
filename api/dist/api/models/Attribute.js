"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const AttributeGroup_1 = require("./AttributeGroup");
const ProductAttribute_1 = require("./ProductAttribute");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
let Attribute = class Attribute extends BaseModel_1.BaseModel {
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
    typeorm_1.PrimaryGeneratedColumn({ name: 'attribute_id' }),
    tslib_1.__metadata("design:type", Number)
], Attribute.prototype, "attributeId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'group_id' }),
    tslib_1.__metadata("design:type", Number)
], Attribute.prototype, "groupId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'attribute_name' }),
    tslib_1.__metadata("design:type", String)
], Attribute.prototype, "attributeName", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], Attribute.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => AttributeGroup_1.AttributeGroup, attributeGroup => attributeGroup.attribute),
    typeorm_1.JoinColumn({ name: 'group_id' }),
    tslib_1.__metadata("design:type", Array)
], Attribute.prototype, "attributeGroup", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductAttribute_1.ProductAttribute, productAttribute => productAttribute.attribute),
    tslib_1.__metadata("design:type", Array)
], Attribute.prototype, "productAttribute", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Attribute.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Attribute.prototype, "updateDetails", null);
Attribute = tslib_1.__decorate([
    typeorm_1.Entity('attribute')
], Attribute);
exports.Attribute = Attribute;
//# sourceMappingURL=Attribute.js.map