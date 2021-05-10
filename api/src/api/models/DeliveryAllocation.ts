/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, PrimaryGeneratedColumn, Entity, BeforeUpdate, BeforeInsert, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from './BaseModel';
import * as bcrypt from 'bcrypt';
import moment = require('moment/moment');
import { VendorOrders } from './VendorOrders';
import { Order } from './Order';
import { DeliveryPerson } from './DeliveryPerson';
import { DeliveryStatus } from './DeliveryStatus';
import { IsNotEmpty } from 'class-validator';

@Entity('delivery_allocation')
export class DeliveryAllocation extends BaseModel {

    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'delivery_allocation_id' })
    public deliveryAllocationId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_order_id' })
    public vendorOrderId: number;
    @IsNotEmpty()
    @Column({ name: 'order_id' })
    public orderId: number;
    @IsNotEmpty()
    @Column({ name: 'delivery_person_id' })
    public deliveryPersonId: number;
    @IsNotEmpty()
    @Column({ name: 'delivery_order_status_id' })
    public deliveryOrderStatusId: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @ManyToOne(type => VendorOrders, vendorOrders => vendorOrders.deliveryAllocation)
    @JoinColumn({ name: 'vendor_order_id' })
    public vendorOrders: VendorOrders[];

    @ManyToOne(type => Order, order => order.deliveryAllocation)
    @JoinColumn({ name: 'order_id' })
    public order: Order[];

    @ManyToOne(type => DeliveryPerson, deliveryPerson => deliveryPerson.deliveryAllocation)
    @JoinColumn({ name: 'delivery_person_id' })
    public deliveryPerson: DeliveryPerson[];

    @OneToOne(type => Order)
    @JoinColumn({ name: 'order_id' })
    public orderDetail: Order;

    @OneToOne(type => VendorOrders)
    @JoinColumn({ name: 'vendor_order_id' })
    public vendorOrderDetail: VendorOrders;

    @OneToOne(type => DeliveryPerson)
    @JoinColumn({ name: 'delivery_person_id' })
    public deliveryPersonDetail: DeliveryPerson;

    @OneToOne(type => DeliveryStatus)
    @JoinColumn({ name: 'delivery_order_status_id' })
    public statusDetail: DeliveryStatus;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
