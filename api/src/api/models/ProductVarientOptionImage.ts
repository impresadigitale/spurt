/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import {
    BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { ProductVarientOption } from './ProductVarientOption';

@Entity('product_varient_option_image')
export class ProductVarientOptionImage extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    @IsNotEmpty()
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_varient_option_id' })
    public productVarientOptionId: number;
    @IsNotEmpty()
    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'container_name' })
    public containerName: string;

    @Column({ name: 'default_image' })
    public defaultImage: number;

    @ManyToOne(type => ProductVarientOption, productVarientOption => productVarientOption.image)
    @JoinColumn({ name: 'product_varient_option_id' })
    public productVarientOption: ProductVarientOption;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
