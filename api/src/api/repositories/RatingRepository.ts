/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../models/ProductModel';
import { ProductRating } from '../models/ProductRating';

@EntityRepository(ProductRating)
export class RatingRepository extends Repository<ProductRating>  {

    public async ratingConsolidate(id: number): Promise<any> {

        const consolidate = await this.manager.createQueryBuilder(ProductRating, 'rating')
            .select(['COUNT(rating.rating) as RatingCount'])
            .addSelect(['SUM(rating.rating) as RatingSum'])
            .where('rating.productId = :productId', { productId: id })
            .andWhere('rating.isActive = :value', { value: 1 })
            .getRawOne();
        return consolidate;
    }

    // rating statistics
    public async ratingStatistics(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(ProductRating, 'productRating');
        query.select(['COUNT(productRating.rating) as rating']);
        query.addSelect(['COUNT(productRating.review) as review']);
        query.where('productRating.productId = :productId', { productId: id });
        query.andWhere('productRating.isActive = :value', { value: 1 });
        return query.getRawOne();
    }

    public async ratingConsolidateForVendor(id: number): Promise<any> {

        const consolidate = await this.manager.createQueryBuilder(ProductRating, 'rating')
            .select(['COUNT(rating.rating) as RatingCount'])
            .addSelect(['SUM(rating.rating) as RatingSum'])
            .innerJoin('rating.product', 'product')
            .innerJoin('product.vendorProducts', 'vendorProducts')
            .where('vendorProducts.vendorId = :vendorId', { vendorId: id })
            .andWhere('rating.isActive = :value', { value: 1 })
            .getRawOne();
        return consolidate;
    }

    public async productRatingList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(ProductRating, 'rating');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }

        // where condition
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    const subQb = this.manager
                        .getRepository(Product)
                        .createQueryBuilder('product')
                        .select('product_id')
                        .where('name LIKE ' + "'%" + table.value + "%'" + ' ');
                    query.where(table.name + ' IN (' + subQb.getSql() + ')');
                }
            });
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        query.orderBy('rating.rating_id', 'DESC');
        if (count) {
            return query.getCount();
        }
        return query.getMany();
    }
}
