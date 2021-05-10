/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../models/Page';

@EntityRepository(Page)
export class PageRepository extends Repository<Page>  {

    public async pageSlug(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Page, 'page');
        query.where('page.metaTagTitle = :value OR page.title = :value', { value: data });
        return query.getMany();
    }
}
