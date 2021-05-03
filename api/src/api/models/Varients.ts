/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/index';
import { BaseModel } from './BaseModel';
import { VarientsValue } from './VarientsValue';
import moment = require('moment');
import { ProductVarient } from './ProductVarient';
import { IsNotEmpty } from 'class-validator';
@Entity('varients')
export class Varients extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'type' })
    public type: string;
    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @OneToMany(type => VarientsValue, varientsValue => varientsValue.varients)
    public varientsValue: VarientsValue[];

    @OneToMany(type => ProductVarient, productVarient => productVarient.varients)
    public productVarient: ProductVarient[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
