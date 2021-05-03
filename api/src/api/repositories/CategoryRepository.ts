/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';

import { Category } from '../models/CategoryModel';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>  {

    public async categorySlug(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Category, 'category');
        query.where('category.metaTagTitle = :value', { value: data });
        query.orWhere('category.name = :name', { name: data });
        return query.getMany();
    }

    public async categorySlugData(data: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Category, 'category');
        query.select('category_slug');
        query.where('category.metaTagTitle = :value', { value: data });
        query.orWhere('category.name = :name', { name: data });
        return query.getMany();
    }

    public async categoryCount(limit: number, offset: number, keyword: string, sortOrder: number, status: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Category, 'category');
        query.select('COUNT(category.categoryId) as categoryCount');
        if (status !== undefined) {
            query.where('category.is_Active = :value', { value: status });
        }
        if (keyword !== undefined && keyword !== '') {
            query.andWhere('category.name LIKE ' + "'%" + keyword + "%'" + ' ');
        }
        query.orderBy('category.created_date', 'DESC');
        query.limit(limit);
        query.offset(offset);
        return query.getRawOne();
    }

}
