/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Attribute } from './Attribute';
import { Exclude } from 'class-transformer';
import moment from 'moment';
import { IsNotEmpty } from 'class-validator';
@Entity('attribute_group')
export class AttributeGroup extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'group_id' })
    public groupId: number;
    @IsNotEmpty()
    @Column({ name: 'attribute_group_name' })
    public attributeGroupName: string;
    @Exclude()
    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @OneToMany(type => Attribute, attribute => attribute.attributeGroup)
    public attribute: Attribute[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
