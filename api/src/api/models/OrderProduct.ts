/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import { Order } from '../models/Order';
import moment from 'moment';
import { Product } from './ProductModel';
import { VendorOrderProducts } from './VendorOrderProducts';
import { VendorOrders } from './VendorOrders';
import { VendorOrderArchive } from './VendorOrderArchive';
import { VendorOrderArchiveLog } from './VendorOrderArchiveLog';
import { OrderProductLog } from './OrderProductLog';
import { CouponUsageProduct } from './CouponUsageProduct';
import { PaymentItems } from './PaymentItems';
import { PaymentItemsArchive } from './PaymentItemsArchive';
import { IsNotEmpty } from 'class-validator';

@Entity('order_product')
export class OrderProduct extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'order_product_id' })
    public orderProductId: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @Column({ name: 'order_product_prefix_id' })
    public orderProductPrefixId: number;
    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'model' })
    public model: string;

    @Column({ name: 'quantity' })
    public quantity: number;

    @Column({ name: 'product_price' })
    public productPrice: number;

    @Column({ name: 'discount_amount' })
    public discountAmount: number;

    @Column({ name: 'base_price' })
    public basePrice: number;

    @Column({ name: 'tax_type' })
    public taxType: number;

    @Column({ name: 'tax_value' })
    public taxValue: number;
    @IsNotEmpty()
    @Column({ name: 'total' })
    public total: number;

    @Column({ name: 'discounted_amount' })
    public discountedAmount: number;
    @IsNotEmpty()
    @Column({ name: 'order_status_id' })
    public orderStatusId: number;

    @Column({ name: 'tracking_url' })
    public trackingUrl: string;

    @Column({ name: 'tracking_no' })
    public trackingNo: string;

    @Column({ name: 'trace' })
    public trace: number;

    @Column({ name: 'tax' })
    public tax: number;

    @Column({ name: 'cancel_request' })
    public cancelRequest: number;

    @Column({ name: 'cancel_request_status' })
    public cancelRequestStatus: number;

    @Column({ name: 'cancel_reason' })
    public cancelReason: string;

    @Column({ name: 'cancel_reason_description' })
    public cancelReasonDescription: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'varient_name' })
    public varientName: string;

    @Column({ name: 'product_varient_option_id' })
    public productVarientOptionId: number;

    @Column({ name: 'sku_name' })
    public skuName: string;

    @ManyToOne(type => Product, product => product.orderProduct)
    @JoinColumn({ name: 'product_id' })
    public productInformationDetail: Product;

    @ManyToOne(type => Order, order => order.productlist)
    @JoinColumn({ name: 'order_id' })
    public product: Order;

    @ManyToOne(type => Order, order => order.orderProduct)
    @JoinColumn({ name: 'order_id' })
    public order: Order;

    @OneToMany(type => VendorOrderProducts, vendorOrderProducts => vendorOrderProducts.orderproduct)
    public vendororderproduct: VendorOrderProducts[];

    @OneToMany(type => VendorOrders, vendorOrders => vendorOrders.orderProduct)
    public vendorOrders: VendorOrders[];

    @OneToMany(type => VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.orderProduct)
    public vendorOrderArchive: VendorOrderArchive[];

    @OneToMany(type => VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.orderProduct)
    public vendorOrderArchiveLog: VendorOrderArchiveLog[];

    @OneToMany(type => OrderProductLog, orderProductLog => orderProductLog.orderProduct)
    public orderProductLog: OrderProductLog[];

    @OneToMany(type => CouponUsageProduct, couponUsageProduct => couponUsageProduct.orderProduct)
    public couponUsageProduct: CouponUsageProduct[];

    @OneToMany(type => PaymentItems, paymentItems => paymentItems.orderProduct)
    public paymentItems: PaymentItems[];

    @OneToMany(type => PaymentItemsArchive, paymentItemsArchive => paymentItemsArchive.orderProduct)
    public paymentItemsArchive: PaymentItemsArchive[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
