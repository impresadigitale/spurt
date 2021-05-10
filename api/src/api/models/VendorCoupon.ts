/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Vendor } from './Vendor';
import { VendorCouponProductCategory } from './VendorCouponProductCategory';
import { CouponUsage } from './CouponUsage';
import { IsNotEmpty } from 'class-validator';

@Entity('coupon')
export class VendorCoupon extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'vendor_coupon_id' })
    public vendorCouponId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'coupon_name' })
    public couponName: string;
    @IsNotEmpty()
    @Column({ name: 'coupon_code' })
    public couponCode: string;
    @IsNotEmpty()
    @Column({ name: 'coupon_type' })
    public couponType: number;
    @IsNotEmpty()
    @Column({ name: 'discount' })
    public discount: number;

    @Column({ name: 'minimum_purchase_amount' })
    public minimumPurchaseAmount: number;

    @Column({ name: 'maximum_purchase_amount' })
    public maximumPurchaseAmount: number;

    @Column({ name: 'coupon_conjunction' })
    public couponConjunction: number;

    @Column({ name: 'coupon_applies_sales' })
    public couponAppliesSales: number;

    @Column({ name: 'email_restrictions' })
    public emailRestrictions: string;

    @Column({ name: 'applicable_for' })
    public applicableFor: number;

    @Column({ name: 'free_shipping' })
    public freeShipping: number;

    @Column({ name: 'start_date' })
    public startDate: string;

    @Column({ name: 'end_date' })
    public endDate: string;

    @Column({ name: 'max_user_per_coupon' })
    public maxUserPerCoupon: number;

    @Column({ name: 'no_of_time_coupon_valid_user' })
    public noOfTimeCouponValidUser: number;

    @Column({ name: 'all_qualifying_items_apply' })
    public allQualifyingItemsApply: number;

    @Column({ name: 'applied_cart_items_count' })
    public appliedCartItemsCount: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @OneToMany(type => VendorCouponProductCategory, vendorCouponProductCategory => vendorCouponProductCategory.vendorCoupon)
    public vendorCouponProductCategory: VendorCouponProductCategory[];

    @OneToMany(type => CouponUsage, couponUsage => couponUsage.vendorCoupon)
    public couponUsage: CouponUsage[];

    @ManyToOne(type => Vendor, vendor => vendor.vendorCoupon)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
