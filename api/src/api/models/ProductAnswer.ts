/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, PrimaryGeneratedColumn, Entity, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { ProductQuestion } from './ProductQuestion';
import moment = require('moment/moment');
import { ProductAnswerLikeDislike } from './ProductAnswerLikeDislike';
import { AnswerReportAbuse } from './AnswerReportAbuse';
import { IsNotEmpty } from 'class-validator';

@Entity('product_answer')
export class ProductAnswer extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'answer_id' })
    public answerId: number;
    @IsNotEmpty()
    @Column({ name: 'question_id' })
    public questionId: number;
    @IsNotEmpty()
    @Column({ name: 'answer' })
    public answer: string;
    @IsNotEmpty()
    @Column({ name: 'type' })
    public type: number;
    @IsNotEmpty()
    @Column({ name: 'reference_id' })
    public referenceId: number;

    @Column({ name: 'default_answer' })
    public defaultAnswer: number;

    @Column({ name: 'likes' })
    public likes: number;

    @Column({ name: 'dislikes' })
    public dislikes: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => ProductQuestion, productQuestion => productQuestion.productAnswer)
    @JoinColumn({ name: 'question_id' })
    public productQuestion: ProductQuestion;

    @OneToMany(type => ProductAnswerLikeDislike, productAnswerLike => productAnswerLike.productAnswer)
    public productAnswerLike: ProductAnswerLikeDislike[];

    @OneToMany(type => AnswerReportAbuse, answerReportAbuse => answerReportAbuse.productAnswer)
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
