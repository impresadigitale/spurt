"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCouponRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorCoupon_1 = require("../models/VendorCoupon");
let VendorCouponRepository = class VendorCouponRepository extends typeorm_1.Repository {
    activeCoupon(today, couponCode) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorCoupon_1.VendorCoupon, 'vendorCoupon');
            query.select(['vendorCoupon.vendorCouponId as vendorCouponId', 'vendorCoupon.couponCode as couponCode',
                'vendorCoupon.couponType as couponType', 'vendorCoupon.discount as discount', 'vendorCoupon.emailRestrictions as emailRestrictions', 'vendorCoupon.max_user_per_coupon as maxUserPerValidCoupon', 'vendorCoupon.noOfTimeCouponValidUser as noOfTimeCouponValidUser', 'vendorCoupon.minimumPurchaseAmount as minimumPurchaseAmount',
                'vendorCoupon.maximumPurchaseAmount as maximumPurchaseAmount', 'vendorCoupon.allQualifyingItemsApply as allQualifyingItemsApply', 'vendorCoupon.appliedCartItemsCount as appliedCartItemsCount', 'vendorCoupon.startDate as startDate', 'vendorCoupon.endDate as endDate', 'vendorCoupon.isActive as isActive']);
            query.where('vendorCoupon.couponCode = :code', { code: couponCode });
            query.andWhere('(vendorCoupon.startDate <= :today AND vendorCoupon.endDate >= :today)', { today });
            query.andWhere('vendorCoupon.isActive = :isActive', { isActive: 1 });
            return query.getRawOne();
        });
    }
    validAmount(grandTotal, couponCode) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(VendorCoupon_1.VendorCoupon, 'vendorCoupon');
            query.select(['vendorCoupon.vendorCouponId as vendorCouponId', 'vendorCoupon.emailRestrictions as emailRestrictions', 'vendorCoupon.maxUserPerCoupon as maxUserPerValidCoupon', 'vendorCoupon.noOfTimeCouponValidUser as noOfTimeCouponValidUser', 'vendorCoupon.minimumPurchaseAmount as minimumPurchaseAmount',
                'vendorCoupon.maximumPurchaseAmount as maximumPurchaseAmount', 'vendorCoupon.allQualifyingItemsApply as allQualifyingItemsApply', 'vendorCoupon.startDate as startDate', 'vendorCoupon.endDate as endDate']);
            query.where('vendorCoupon.couponCode = :code', { code: couponCode });
            query.andWhere('(vendorCoupon.minimumPurchaseAmount <= :total AND vendorCoupon.maximumPurchaseAmount >= :total)', { total: grandTotal });
            return query.getRawOne();
        });
    }
};
VendorCouponRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(VendorCoupon_1.VendorCoupon)
], VendorCouponRepository);
exports.VendorCouponRepository = VendorCouponRepository;
//# sourceMappingURL=VendorCouponRepository.js.map