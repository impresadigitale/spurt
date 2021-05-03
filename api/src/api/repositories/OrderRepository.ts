/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../models/Order';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order>  {

    public async salesList(): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'YEAR(created_date) as year']);
        query.andWhere('payment_process = :process', { process: 1 });
        query.groupBy('month');
        query.addGroupBy('year');
        query.orderBy('year', 'ASC');
        query.addOrderBy('month', 'ASC');
        query.limit('12');
        return query.getRawMany();
    }

    public async findAllTodayOrder(todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['order.total as total']);
        query.where('DATE(order.createdDate) = :todaydate', { todaydate });
        query.andWhere('payment_process = :process', { process: 1 });
        return query.getRawMany();
    }

    public async findAllTodayOrderCount(todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['COUNT(order.orderId) as orderCount']);
        query.where('DATE(order.createdDate) = :todaydate', { todaydate });
        query.andWhere('payment_process = :process', { process: 1 });
        return query.getRawOne();
    }

    public async orderCount(orderId: string, orderStatusId: string, totalAmount: string, customerName: string, dateAdded: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['COUNT(DISTINCT(order.orderId)) as orderCount']);
        query.innerJoin('order.orderProduct', 'orderProduct');
        query.where('payment_process = :process', { process: 1 });
        if (orderId) {
            query.andWhere('order.orderPrefixId = :orderPrefixId', { orderPrefixId: orderId });
        }
        if (orderStatusId) {
            query.andWhere('orderProduct.orderStatusId = :orderStatusId', { orderStatusId });
        }
        if (totalAmount) {
            query.andWhere('order.total = :total', { total: totalAmount });
        }
        if (customerName) {
            query.andWhere('order.shippingFirstname = :shippingFirstname', { shippingFirstname: customerName });
        }
        if (dateAdded) {
            query.andWhere('order.createdDate = :createdDate', { createdDate: dateAdded });
        }
        return query.getRawOne();

    }
}
