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
import { Varients } from './Varients';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
@Entity('product_varient')
export class ProductVarient extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'varients_id' })
    public varientsId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => Product, product => product.productVarient)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @ManyToOne(type => Varients, varients => varients.productVarient)
    @JoinColumn({ name: 'varients_id' })
    public varients: Varients;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
