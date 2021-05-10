"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAnswerLikeDislike = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment/moment");
const ProductAnswer_1 = require("./ProductAnswer");
const Customer_1 = require("./Customer");
const class_validator_1 = require("class-validator");
let ProductAnswerLikeDislike = class ProductAnswerLikeDislike extends BaseModel_1.BaseModel {
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
], ProductAnswerLikeDislike.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'question_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswerLikeDislike.prototype, "questionId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'answer_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswerLikeDislike.prototype, "answerId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'type' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswerLikeDislike.prototype, "type", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswerLikeDislike.prototype, "customerId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], ProductAnswerLikeDislike.prototype, "isActive", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => ProductAnswer_1.ProductAnswer, productAnswer => productAnswer.productAnswerLike),
    typeorm_1.JoinColumn({ name: 'answer_id' }),
    tslib_1.__metadata("design:type", ProductAnswer_1.ProductAnswer)
], ProductAnswerLikeDislike.prototype, "productAnswer", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Customer_1.Customer, customer => customer.productAnswerLike),
    typeorm_1.JoinColumn({ name: 'customer_id' }),
    tslib_1.__metadata("design:type", Customer_1.Customer)
], ProductAnswerLikeDislike.prototype, "customer", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswerLikeDislike.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductAnswerLikeDislike.prototype, "updateDetails", null);
ProductAnswerLikeDislike = tslib_1.__decorate([
    typeorm_1.Entity('product_answer_like_dislike')
], ProductAnswerLikeDislike);
exports.ProductAnswerLikeDislike = ProductAnswerLikeDislike;
//# sourceMappingURL=ProductAnswerLikeDislike.js.map