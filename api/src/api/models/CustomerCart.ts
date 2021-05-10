/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { Product } from './ProductModel';
import { IsNotEmpty } from 'class-validator';

@Entity('customer_cart')
export class CustomerCart extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;
    @Column({ name: 'quantity' })
    public quantity: string;

    @Column({ name: 'product_price' })
    public productPrice: string;

    @Column({ name: 'tire_price' })
    public tirePrice: string;

    @Column({ name: 'total' })
    public total: number;

    @Column({ name: 'option_name' })
    public optionName: string;

    @Column({ name: 'option_value_name' })
    public optionValueName: string;

    @Column({ name: 'product_option_value_id' })
    public productOptionValueId: string;

    @Column({ name: 'sku_name' })
    public skuName: string;

    @Column({ name: 'varient_name' })
    public varientName: string;

    @Column({ name: 'product_varient_option_id' })
    public productVarientOptionId: string;

    @ManyToOne(type => Product, product => product.cart)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
