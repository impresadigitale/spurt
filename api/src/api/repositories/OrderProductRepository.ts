/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { OrderProduct } from '../models/OrderProduct';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends Repository<OrderProduct>  {

    public async List(limit: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['DISTINCT product_id as productId', 'order_id as orderId', 'name as ProductName', 'quantity as Quantity', 'total as Total', ' created_date as CreatedDate', 'sku_name as skuName', 'varient_name as varientName']);
        query.orderBy('created_date', 'DESC');
        query.limit(limit);
        return query.getRawMany();
    }

     // get earnings
     public async getEarnings(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['SUM(orderProduct.total + orderProduct.discountAmount) as productPriceTotal', 'COUNT(orderProduct.orderId) as orderCount', 'SUM(orderProduct.quantity) as quantityCount', 'COUNT(DISTINCT(product.customer_id)) as buyerCount']);
        query.innerJoin('orderProduct.product', 'product');
        query.where('orderProduct.productId = :productId',  { productId: id});
        query.andWhere('product.paymentStatus = :value1', {value1: 1});
        return query.getRawOne();
    }

    public async buyedCount(productId: number, customerId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select('orderProduct.orderProductId');
        query.innerJoin('orderProduct.order', 'order');
        query.where('orderProduct.productId = :id AND order.customerId = :customerId ',  { id: productId, customerId});
        query.andWhere('order.paymentStatus = :paymentStatus',  { paymentStatus: 1});
        return query.getRawMany();
    }

    // get product payment process
    public async productPaymentProcess(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['orderProduct.orderProductId']);
        query.innerJoin('orderProduct.order', 'order');
        query.where('orderProduct.productId = :productId',  { productId: id});
        query.andWhere('order.paymentProcess = :value1', {value1: 1});
        return query.getRawOne();
    }

    // get product varient payment process
    public async productVarientPaymentProcess(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['orderProduct.orderProductId']);
        query.innerJoin('orderProduct.order', 'order');
        query.where('orderProduct.productVarientOptionId = :id',  { id});
        query.andWhere('order.paymentProcess = :value1', {value1: 1});
        return query.getRawOne();
    }
}
