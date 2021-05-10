/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import { Varients } from './Varients';
import { ProductVarientOptionDetail } from './ProductVarientOptionDetail';
import moment = require('moment');
import { IsNotEmpty } from 'class-validator';
@Entity('varients_value')
export class VarientsValue extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'varients_id' })
    public varientsId: number;
    @IsNotEmpty()
    @Column({ name: 'value_name' })
    public valueName: string;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'is_active' })
    public is_active: number;

    @ManyToOne(type => Varients, varients => varients.varientsValue)
    @JoinColumn({ name: 'varients_id' })
    public varients: Varients;

    @OneToMany(type => ProductVarientOptionDetail, productVarientOptionDetail => productVarientOptionDetail.varientsValue)
    public productVarientOptionDetail: ProductVarientOptionDetail[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
