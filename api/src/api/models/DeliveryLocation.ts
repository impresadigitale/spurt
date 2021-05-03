/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, PrimaryGeneratedColumn, Entity, BeforeUpdate, BeforeInsert, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import { DeliveryPersonToLocation } from './DeliveryPersonToLocation';
import { DeliveryLocationToLocation } from './DeliveryLocationToLocation';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';

@Entity('delivery_location')
export class DeliveryLocation extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'delivery_location_id' })
    public deliveryLocationId: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'zip_code' })
    public zipCode: number;

    @Column({ name: 'location_name' })
    public locationName: string;

    @OneToMany(type => DeliveryPersonToLocation, deliveryPersonToLocation => deliveryPersonToLocation.deliveryLocation)
    public deliveryPersonToLocation: DeliveryPersonToLocation[];

    @OneToMany(type => DeliveryLocationToLocation, deliveryPersonToLocation => deliveryPersonToLocation.deliveryLocation)
    public deliveryLocationToLocation: DeliveryLocationToLocation[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
