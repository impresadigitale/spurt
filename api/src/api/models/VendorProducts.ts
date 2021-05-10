/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Product } from './ProductModel';
import { Vendor } from './Vendor';

@Entity('vendor_product')
export class VendorProducts extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'vendor_product_id' })
    @IsNotEmpty()
    public vendorProductId: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'approval_flag' })
    public approvalFlag: number;

    @Column({ name: 'quotation_available' })
    public quotationAvailable: number;

    @Column({ name: 'approved_by' })
    public approvedBy: number;

    @Column({ name: 'approved_date' })
    public approvedDate: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_product_commission' })
    public vendorProductCommission: number;

    @Column({ name: 'pincode_based_delivery' })
    public pincodeBasedDelivery: number;

    @ManyToOne(type => Product, product => product.vendorProducts)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @ManyToOne(type => Vendor, vendor => vendor.vendorProducts)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor;

    // @OneToMany(type => Quotation,  quotation => quotation.vendorProducts)
    // public quotation: Quotation[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
