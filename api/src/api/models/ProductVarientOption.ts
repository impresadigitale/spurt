/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import { Product } from './ProductModel';
import { Sku } from './SkuModel';
import { ProductVarientOptionDetail } from './ProductVarientOptionDetail';
import { ProductVarientOptionImage } from './ProductVarientOptionImage';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
@Entity('product_varient_option')
export class ProductVarientOption extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'varient_name' })
    public varientName: string;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'sku_id' })
    public skuId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => Product, product => product.productVarientOption)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @OneToOne(type => Sku)
    @JoinColumn({ name: 'sku_id' })
    public skuDetail: Sku;

    @OneToMany(type => ProductVarientOptionDetail, productVarientOptionDetail => productVarientOptionDetail.productVarientOption)
    public productVarientOptionDetail: ProductVarientOptionDetail;

    @OneToMany(type => ProductVarientOptionImage, productVarientOptionImage => productVarientOptionImage.productVarientOption)
    public image: ProductVarientOptionImage[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
