/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { ProductAnswerLikeDislike } from '../models/ProductAnswerLikeDislike';

@EntityRepository(ProductAnswerLikeDislike)
export class ProductAnswerLikeDislikeRepository extends Repository<ProductAnswerLikeDislike>  {
    public async findLikeCount(answerId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(ProductAnswerLikeDislike, 'productAnswerLikeDislike');
        query.select('COUNT(productAnswerLikeDislike.id) as likeCount');
        query.where('productAnswerLikeDislike.type = :type AND productAnswerLikeDislike.answerId = :answerId', { type: 1, answerId });
        return query.getRawOne();
    }

    public async findDislikeCount(answerId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(ProductAnswerLikeDislike, 'productAnswerLikeDislike');
        query.select('COUNT(productAnswerLikeDislike.id) as dislikeCount');
        query.where('productAnswerLikeDislike.type = :type AND productAnswerLikeDislike.answerId = :answerId', { type: 2, answerId });
        return query.getRawOne();
    }

}
