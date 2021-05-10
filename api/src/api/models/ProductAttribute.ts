/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import { Product } from './ProductModel';
import { Attribute } from './Attribute';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
@Entity('product_attribute')
export class ProductAttribute extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'attribute_id' })
    public attributeId: number;
    @IsNotEmpty()
    @Column({ name: 'text' })
    public text: string;

    @ManyToOne(type => Product, product => product.productAttribute)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @ManyToOne(type => Attribute, attribute => attribute.productAttribute)
    @JoinColumn({ name: 'attribute_id' })
    public attribute: Attribute;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
