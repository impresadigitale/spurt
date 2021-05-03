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
import { AnswerAbuseReasonRepository } from '../repositories/AnswerAbuseReasonRepository';
import { AnswerAbuseReason } from '../models/AnswerAbuseReason';

@Service()
export class AnswerAbuseReasonService {

    constructor(
        @OrmRepository() private abuseReasonRepository: AnswerAbuseReasonRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create
    public async create(answerAbuse: AnswerAbuseReason): Promise<any> {
        this.log.info('Create a new address ');
        return this.abuseReasonRepository.save(answerAbuse);
    }

    // findOne
    public findOne(answerAbuse: any): Promise<any> {
        return this.abuseReasonRepository.findOne(answerAbuse);
    }
    // update
    public update(id: number, answerAbuse: AnswerAbuseReason): Promise<any> {
        answerAbuse.id = id;
        return this.abuseReasonRepository.save(answerAbuse);
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
            return this.abuseReasonRepository.count(condition);
        } else {
            return this.abuseReasonRepository.find(condition);
        }
    }

    // delete
    public async delete(id: number): Promise<any> {
        await this.abuseReasonRepository.delete(id);
        return 1;
    }

    // find Al
    public find(address: any): Promise<any> {
        return this.abuseReasonRepository.find(address);
    }
}
