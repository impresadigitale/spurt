/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { AttributeGroup } from './AttributeGroup';
import { ProductAttribute } from './ProductAttribute';
import moment from 'moment';
import { IsNotEmpty } from 'class-validator';
@Entity('attribute')
export class Attribute extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'attribute_id' })
    public attributeId: number;
    @IsNotEmpty()
    @Column({ name: 'group_id' })
    public groupId: number;
    @IsNotEmpty()
    @Column({ name: 'attribute_name' })
    public attributeName: string;
    @IsNotEmpty()
    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @ManyToOne(type => AttributeGroup, attributeGroup => attributeGroup.attribute)
    @JoinColumn({ name: 'group_id' })
    public attributeGroup: AttributeGroup[];

    @OneToMany(type => ProductAttribute, productAttribute => productAttribute.attribute)
    public productAttribute: ProductAttribute[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
