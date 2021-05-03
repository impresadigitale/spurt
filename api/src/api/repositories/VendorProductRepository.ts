/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorProducts } from '../models/VendorProducts';
import { VendorOrders } from '../models/VendorOrders';

@EntityRepository(VendorProducts)
export class VendorProductsRepository extends Repository<VendorProducts>  {

    public async topProductSelling(id: number, duration: number, limit: number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(VendorOrders, 'vendorOrders');
        query.select(['SUM(orderProduct.quantity) as soldCount', 'COUNT(DISTINCT(order.customer_id)) as buyerCount', 'orderProduct.product_id as product']);
        query.leftJoin('vendorOrders.order', 'order');
        query.leftJoin('vendorOrders.orderProduct', 'orderProduct');
        query.where('vendorOrders.vendorId = :id', { id });
        query.andWhere('order.paymentProcess = :paymentProcess', { paymentProcess: 1 });
        if (duration === 1 && duration) {
            query.andWhere('WEEKOFYEAR(vendorOrders.modified_date) = WEEKOFYEAR(NOW())');
        } else if (duration === 2 && duration) {
            query.andWhere('MONTH(vendorOrders.modified_date) = MONTH(NOW()) AND YEAR(vendorOrders.modified_date) = YEAR(NOW())');
        } else if (duration === 3 && duration) {
            query.andWhere('YEAR(vendorOrders.modified_date) = YEAR(NOW())');
        }
        query.groupBy('product');
        query.orderBy('soldCount', 'DESC');
        query.limit(limit);
        return query.getRawMany();
    }

    public async vendorActiveProduct(id: number, limit: number, offset: number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        query.select(['vendorProducts.product_id as productId', 'product.is_active as isActive']);
        query.leftJoin('vendorProducts.product', 'product');
        query.where('vendorProducts.vendorId = :id', { id });
        query.andWhere('product.isActive = :isActive', { isActive: 1 });
        query.limit(limit);
        query.offset(offset);
        return query.getRawMany();
    }

    // finding product for vendor category
    public async findingProduct(categoryId: number, vendorId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorProducts, 'vendorProducts');
        query.select(['vendorProducts.product_id as productId']);
        query.innerJoin('vendorProducts.product', 'product');
        query.innerJoin('product.productToCategory', 'productToCategory');
        query.where('productToCategory.categoryId = :categoryId', { categoryId });
        query.andWhere('vendorProducts.vendorId = :value1', { value1: vendorId });
        return query.getRawOne();
    }
}
