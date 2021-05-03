/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorPayment } from '../models/VendorPayment';

@EntityRepository(VendorPayment)
export class VendorPaymentRepository extends Repository<VendorPayment>  {

    //  sale count
    public async getTotalSales(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorPayment, 'vendorPayment');
        query.select(['COUNT(vendorPayment.vendorPaymentId) as salesCount']);
        query.where('vendorPayment.vendorId = :id', { id });
        return query.getRawOne();
    }

    //  buyer count with login
    public async getTotalBuyers(id: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorPayment, 'vendorPayment');
        query.select(['COUNT(DISTINCT(order.customer_id)) as buyerCount']);
        query.leftJoin('vendorPayment.vendorOrders', 'vendorOrders');
        query.leftJoin('vendorOrders.order', 'order');
        query.where('vendorPayment.vendorId = :id', { id });
        query.andWhere('order.customerId != :value1', { value1: 0 });
        return query.getRawOne();
    }

    // get total vendor revenue
    public async getTotalVendorRevenue(vendorId: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(VendorPayment, 'vendorPayment');
        query.select(['vendorPayment.amount as amount', 'vendorPayment.commissionAmount as commissionAmount']);
        query.where('vendorPayment.vendorId = :id', { id: vendorId });
        return query.getRawMany();
    }

}
