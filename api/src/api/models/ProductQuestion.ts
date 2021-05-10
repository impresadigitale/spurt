/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, PrimaryGeneratedColumn, Entity, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Product } from './ProductModel';
import moment = require('moment/moment');
import { ProductAnswer } from './ProductAnswer';
import { AnswerReportAbuse } from './AnswerReportAbuse';
import { IsNotEmpty } from 'class-validator';

@Entity('product_question')
export class ProductQuestion extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'question_id' })
    public questionId: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;
    @IsNotEmpty()
    @Column({ name: 'question' })
    public question: string;
    @IsNotEmpty()
    @Column({ name: 'type' })
    public type: number;
    @IsNotEmpty()
    @Column({ name: 'reference_id' })
    public referenceId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => Product, product => product.productQuestion)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @OneToMany(type => ProductAnswer, productAnswer => productAnswer.productQuestion)
    public productAnswer: ProductAnswer[];

    @OneToMany(type => AnswerReportAbuse, answerReportAbuse => answerReportAbuse.productQuestion)
    public answerReportAbuse: AnswerReportAbuse[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
