/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Order } from './Order';
import { VendorCoupon } from './VendorCoupon';
import { CouponUsageProduct } from './CouponUsageProduct';
import { IsNotEmpty } from 'class-validator';

@Entity('coupon_usage')
export class CouponUsage extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'coupon_usage_id' })
    public couponUsageId: number;
    @IsNotEmpty()
    @Column({ name: 'coupon_id' })
    public couponId: number;
    @Column({ name: 'customer_id' })
    public customerId: number;
    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number;

    @Column({ name: 'discount_amount' })
    public discountAmount: number;

    @ManyToOne(type => VendorCoupon, vendorCoupon => vendorCoupon.couponUsage)
    @JoinColumn({ name: 'coupon_id' })
    public vendorCoupon: VendorCoupon[];

    @OneToMany(type => CouponUsageProduct, couponUsageProduct => couponUsageProduct.couponUsage)
    public couponUsageProduct: CouponUsageProduct[];

    @ManyToOne(type => Order, order => order.couponUsage)
    @JoinColumn({ name: 'order_id' })
    public order: Order[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
