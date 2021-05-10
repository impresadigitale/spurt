/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { ProductQuestion } from './ProductQuestion';
import { ProductAnswer } from './ProductAnswer';
import { Customer } from './Customer';
import { IsNotEmpty } from 'class-validator';

@Entity('answer_report_abuse')
export class AnswerReportAbuse extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;
    @IsNotEmpty()
    @Column({ name: 'answer_id' })
    public answerId: number;
    @IsNotEmpty()
    @Column({ name: 'question_id' })
    public questionId: number;
    @IsNotEmpty()
    @Column({ name: 'reason_id' })
    public reasonId: number;

    @Column({ name: 'remark' })
    public remark: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => ProductQuestion, productQuestion => productQuestion.answerReportAbuse)
    @JoinColumn({ name: 'question_id' })
    public productQuestion: ProductQuestion;

    @ManyToOne(type => ProductAnswer, productAnswer => productAnswer.answerReportAbuse)
    @JoinColumn({ name: 'answer_id' })
    public productAnswer: ProductAnswer;

    @ManyToOne(type => Customer, customer => customer.answerReportAbuse)
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
