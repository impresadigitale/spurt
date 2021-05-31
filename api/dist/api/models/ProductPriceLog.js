"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPriceLog = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
const class_validator_1 = require("class-validator");
let ProductPriceLog = class ProductPriceLog extends BaseModel_1.BaseModel {
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
    index_1.PrimaryGeneratedColumn({ name: 'product_price_log_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductPriceLog.prototype, "productPriceLogId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'product_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductPriceLog.prototype, "productId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductPriceLog.prototype, "vendorId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'price_update_file_log_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductPriceLog.prototype, "priceUpdateFileLogId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'sku' }),
    tslib_1.__metadata("design:type", String)
], ProductPriceLog.prototype, "sku", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'price' }),
    tslib_1.__metadata("design:type", Number)
], ProductPriceLog.prototype, "price", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'discount_price' }),
    tslib_1.__metadata("design:type", Number)
], ProductPriceLog.prototype, "discountPrice", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'discount_start_date' }),
    tslib_1.__metadata("design:type", Date)
], ProductPriceLog.prototype, "discountStartDate", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'discount_end_date' }),
    tslib_1.__metadata("design:type", Date)
], ProductPriceLog.prototype, "discountEndDate", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'special_price' }),
    tslib_1.__metadata("design:type", Number)
], ProductPriceLog.prototype, "specialPrice", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'special_start_date' }),
    tslib_1.__metadata("design:type", Date)
], ProductPriceLog.prototype, "specialStartDate", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'special_end_date' }),
    tslib_1.__metadata("design:type", Date)
], ProductPriceLog.prototype, "specialEndDate", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductPriceLog.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductPriceLog.prototype, "updateDetails", null);
ProductPriceLog = tslib_1.__decorate([
    typeorm_1.Entity('product_price_log')
], ProductPriceLog);
exports.ProductPriceLog = ProductPriceLog;
//# sourceMappingURL=ProductPriceLog.js.map