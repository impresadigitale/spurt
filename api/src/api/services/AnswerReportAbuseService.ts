/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AnswerReportAbuseRepository } from '../repositories/AnswerReportAbuseRepository';
import { AnswerReportAbuse } from '../models/AnswerReportAbuse';

@Service()
export class AnswerReportAbuseService {

    constructor(
        @OrmRepository() private answerReportAbuseRepository: AnswerReportAbuseRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create
    public async create(answerAbuse: AnswerReportAbuse): Promise<any> {
        this.log.info('Create a new address ');
        return this.answerReportAbuseRepository.save(answerAbuse);
    }

    // findOne
    public findOne(answerAbuse: any): Promise<any> {
        return this.answerReportAbuseRepository.findOne(answerAbuse);
    }
    // update
    public update(id: number, answerAbuse: AnswerReportAbuse): Promise<any> {
        answerAbuse.id = id;
        return this.answerReportAbuseRepository.save(answerAbuse);
    }

    // address
    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.answerReportAbuseRepository.count(condition);
        } else {
            return this.answerReportAbuseRepository.find(condition);
        }
    }

    // delete
    public async delete(id: number): Promise<any> {
        return this.answerReportAbuseRepository.delete(id);
    }

    // find All
    public find(address: any): Promise<any> {
        return this.answerReportAbuseRepository.find(address);
    }
}
