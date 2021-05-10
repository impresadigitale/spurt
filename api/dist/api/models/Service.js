"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ServiceToCategory_1 = require("./ServiceToCategory");
const class_validator_1 = require("class-validator");
let Services = class Services extends BaseModel_1.BaseModel {
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
    index_1.PrimaryGeneratedColumn({ name: 'service_id' }),
    tslib_1.__metadata("design:type", Number)
], Services.prototype, "serviceId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], Services.prototype, "title", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], Services.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'mobile' }),
    tslib_1.__metadata("design:type", Number)
], Services.prototype, "mobile", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'price' }),
    tslib_1.__metadata("design:type", Number)
], Services.prototype, "price", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'meta_tag_title' }),
    tslib_1.__metadata("design:type", String)
], Services.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'meta_tag_description' }),
    tslib_1.__metadata("design:type", String)
], Services.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'meta_tag_keyword' }),
    tslib_1.__metadata("design:type", String)
], Services.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Services.prototype, "isActive", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ServiceToCategory_1.ServiceToCategory, serviceToCategory => serviceToCategory.service),
    tslib_1.__metadata("design:type", Array)
], Services.prototype, "serviceToCategory", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Services.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Services.prototype, "updateDetails", null);
Services = tslib_1.__decorate([
    typeorm_1.Entity('service')
], Services);
exports.Services = Services;
//# sourceMappingURL=Service.js.map