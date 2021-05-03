/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Blog } from '../models/Blog';
@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog>  {
    public async blogSlug(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Blog, 'blog');
        query.where('blog.metaTagTitle = :value OR blog.title = :value',  { value: data});
        return query.getMany();
    }
}
