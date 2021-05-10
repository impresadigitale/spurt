/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {
    Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Product } from './ProductModel';
import { Customer } from './Customer';
import { IsNotEmpty } from 'class-validator';

@Entity('quotation')
export class Quotation extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;

    @Column({ name: 'quantity' })
    public quantity: number;

    @Column({ name: 'quantity_unit' })
    public quantityUnit: string;

    @Column({ name: 'order_value' })
    public orderValue: string;

    @Column({ name: 'purpose' })
    public purpose: number;

    @Column({ name: 'comments' })
    public comments: string;

    @ManyToOne(type => Product, product => product.quotation)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @ManyToOne(type => Customer, customer => customer.quotation)
    @JoinColumn({ name: 'customer_id' })
    public customer: Customer;

    // @ManyToOne(type => VendorProducts, vendorProduct => vendorProduct.quotation)
    // @JoinColumn({ name: 'product_id' })
    // public vendorProducts: VendorProducts;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
