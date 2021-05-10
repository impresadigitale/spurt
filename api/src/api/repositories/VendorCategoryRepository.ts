/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorCategory } from '../models/VendorCategory';

@EntityRepository(VendorCategory)
export class VendorCategoryRepository extends Repository<VendorCategory>  {

    public async queryCategoryList(limit: number, offset: number, vendorId: number, keyword: string, count: number | boolean): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorCategory, 'vendorCategory');
        query.select(['vendorCategory.vendorCategoryId as vendorCategoryId', 'vendorCategory.vendorId as vendorId', 'vendorCategory.categoryId as categoryId', 'vendorCategory.vendorCategoryCommission as vendorCategoryCommission', 'category.name as categoryName']);
        query.leftJoin('vendorCategory.category', 'category');
        query.where('vendorCategory.vendorId = :id', {id: vendorId});
        if (keyword) {
            query.andWhere('category.name LIKE ' +  "'%" + keyword + "%'" + ' ');
        }
        query.limit(limit);
        query.offset(offset);
        if (count) {
            return query.getCount();
        }
        return query.getRawMany();
    }
}
