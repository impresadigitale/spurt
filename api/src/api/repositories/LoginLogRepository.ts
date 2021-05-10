/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';

import { LoginLog } from '../models/LoginLog';

@EntityRepository(LoginLog)
export class LoginLogRepository extends Repository<LoginLog> {
    public async logList(limit: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(LoginLog, 'LoginLog');
        query.select(['COUNT(LoginLog.id) as logcount', 'DATE(created_date) as createdDate']);
        query.groupBy('createdDate');
        query.orderBy('createdDate', 'DESC');
        query.limit(limit);
        return query.getRawMany();
    }
}
