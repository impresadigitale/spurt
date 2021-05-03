/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorCoupon } from '../models/VendorCoupon';

@EntityRepository(VendorCoupon)
export class VendorCouponRepository extends Repository<VendorCoupon>  {

    public async activeCoupon(today: string, couponCode: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorCoupon, 'vendorCoupon');
        query.select(['vendorCoupon.vendorCouponId as vendorCouponId', 'vendorCoupon.couponCode as couponCode',
            'vendorCoupon.couponType as couponType', 'vendorCoupon.discount as discount', 'vendorCoupon.emailRestrictions as emailRestrictions', 'vendorCoupon.max_user_per_coupon as maxUserPerValidCoupon', 'vendorCoupon.noOfTimeCouponValidUser as noOfTimeCouponValidUser', 'vendorCoupon.minimumPurchaseAmount as minimumPurchaseAmount',
            'vendorCoupon.maximumPurchaseAmount as maximumPurchaseAmount', 'vendorCoupon.allQualifyingItemsApply as allQualifyingItemsApply', 'vendorCoupon.appliedCartItemsCount as appliedCartItemsCount', 'vendorCoupon.startDate as startDate', 'vendorCoupon.endDate as endDate', 'vendorCoupon.isActive as isActive']);
        query.where('vendorCoupon.couponCode = :code', { code: couponCode });
        query.andWhere('(vendorCoupon.startDate <= :today AND vendorCoupon.endDate >= :today)', { today });
        query.andWhere('vendorCoupon.isActive = :isActive', { isActive: 1 });
        return query.getRawOne();
    }

    public async validAmount(grandTotal: number, couponCode: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorCoupon, 'vendorCoupon');
        query.select(['vendorCoupon.vendorCouponId as vendorCouponId', 'vendorCoupon.emailRestrictions as emailRestrictions', 'vendorCoupon.maxUserPerCoupon as maxUserPerValidCoupon', 'vendorCoupon.noOfTimeCouponValidUser as noOfTimeCouponValidUser', 'vendorCoupon.minimumPurchaseAmount as minimumPurchaseAmount',
            'vendorCoupon.maximumPurchaseAmount as maximumPurchaseAmount', 'vendorCoupon.allQualifyingItemsApply as allQualifyingItemsApply', 'vendorCoupon.startDate as startDate', 'vendorCoupon.endDate as endDate']);
        query.where('vendorCoupon.couponCode = :code', { code: couponCode });
        query.andWhere('(vendorCoupon.minimumPurchaseAmount <= :total AND vendorCoupon.maximumPurchaseAmount >= :total)', { total: grandTotal });
        return query.getRawOne();
    }

}
