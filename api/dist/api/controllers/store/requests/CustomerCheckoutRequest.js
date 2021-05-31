"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCheckoutRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CustomerCheckoutRequest {
}
tslib_1.__decorate([
    class_validator_1.MaxLength(32, {
        message: 'shipping first name should be maximum 32 character',
    }),
    class_validator_1.MinLength(1, {
        message: 'shipping first name should be minimum 1 character',
    }),
    class_validator_1.IsNotEmpty({
        message: 'Shipping First name is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "shippingFirstName", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(32, {
        message: 'shipping last name should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "shippingLastName", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'Shipping Address 1 is required',
    }),
    class_validator_1.MaxLength(128, {
        message: 'shipping address 1  should be maximum 128 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "shippingAddress_1", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'Shipping City is required',
    }),
    class_validator_1.MaxLength(128, {
        message: 'shipping city should be maximum 128 character',
    }),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "shippingCity", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(10, {
        message: 'shipping postcode should be maximum 10 character',
    }),
    class_validator_1.IsNotEmpty({
        message: 'Shipping Post Code is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerCheckoutRequest.prototype, "shippingPostCode", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(128, {
        message: 'shipping zone should be maximum 128 character',
    }),
    class_validator_1.IsNotEmpty({
        message: 'Shipping Zone is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "shippingZone", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'Phone Number is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerCheckoutRequest.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(96, {
        message: 'emailId should be maximum 96 character',
    }),
    class_validator_1.IsNotEmpty({
        message: 'Email Id is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "emailId", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(128, {
        message: 'shipping address 2  should be maximum 128 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "shippingAddress_2", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(32, {
        message: 'shipping company should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "shippingCompany", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'Country is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerCheckoutRequest.prototype, "shippingCountryId", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(255, {
        message: 'coupon code should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "couponCode", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Array)
], CustomerCheckoutRequest.prototype, "productDetails", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(15, {
        message: 'gst should be maximum 15 character',
    }),
    class_validator_1.ValidateIf(o => o.gstNo !== ''),
    class_validator_1.MinLength(15, {
        message: 'gst should be minimum 15 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "gstNo", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(32, {
        message: 'payment first name should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "paymentFirstName", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(32, {
        message: 'payment last name should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "paymentLastName", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(128, {
        message: 'payment address 1  should be maximum 128 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "paymentAddress_1", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(128, {
        message: 'payment city  should be maximum 128 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "paymentCity", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(10, {
        message: 'payment postcode should be maximum 10 character',
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerCheckoutRequest.prototype, "paymentPostCode", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(10, {
        message: 'payment zone should be maximum 10 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "paymentZone", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(128, {
        message: 'paymentAddress2 should be maximum 128 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "paymentAddress_2", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(32, {
        message: 'paymentCompany should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerCheckoutRequest.prototype, "paymentCompany", void 0);
exports.CustomerCheckoutRequest = CustomerCheckoutRequest;
//# sourceMappingURL=CustomerCheckoutRequest.js.map