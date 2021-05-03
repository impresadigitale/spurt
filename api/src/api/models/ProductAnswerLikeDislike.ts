/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, PrimaryGeneratedColumn, Entity, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { ProductAnswer } from './ProductAnswer';
import { Customer } from './Customer';
import { IsNotEmpty } from 'class-validator';

@Entity('product_answer_like_dislike')
export class ProductAnswerLikeDislike extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'question_id' })
    public questionId: number;
    @IsNotEmpty()
    @Column({ name: 'answer_id' })
    public answerId: number;

    @Column({ name: 'type' })
    public type: number;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => ProductAnswer, productAnswer => productAnswer.productAnswerLike)
    @JoinColumn({ name: 'answer_id' })
    public productAnswer: ProductAnswer;

    @ManyToOne(type => Customer, customer => customer.productAnswerLike)
    @JoinColumn({ name: 'customer_id' })
    public customer: Customer;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
