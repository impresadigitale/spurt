"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroup = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const Attribute_1 = require("./Attribute");
const class_transformer_1 = require("class-transformer");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
let AttributeGroup = class AttributeGroup extends BaseModel_1.BaseModel {
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
    typeorm_1.PrimaryGeneratedColumn({ name: 'group_id' }),
    tslib_1.__metadata("design:type", Number)
], AttributeGroup.prototype, "groupId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'attribute_group_name' }),
    tslib_1.__metadata("design:type", String)
], AttributeGroup.prototype, "attributeGroupName", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Column({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], AttributeGroup.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Attribute_1.Attribute, attribute => attribute.attributeGroup),
    tslib_1.__metadata("design:type", Array)
], AttributeGroup.prototype, "attribute", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroup.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AttributeGroup.prototype, "updateDetails", null);
AttributeGroup = tslib_1.__decorate([
    typeorm_1.Entity('attribute_group')
], AttributeGroup);
exports.AttributeGroup = AttributeGroup;
//# sourceMappingURL=AttributeGroup.js.map