/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, PrimaryGeneratedColumn, Entity, BeforeUpdate, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { DeliveryPerson } from './DeliveryPerson';
import { DeliveryLocation } from './DeliveryLocation';
import { IsNotEmpty } from 'class-validator';

@Entity('delivery_person_to_location')
export class DeliveryPersonToLocation extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'delivery_person_to_location_id' })
    public deliveryPersonToLocationId: number;
    @IsNotEmpty()
    @Column({ name: 'delivery_person_id' })
    public deliveryPersonId: number;
    @IsNotEmpty()
    @Column({ name: 'delivery_location_id' })
    public deliveryLocationId: number;

    @ManyToOne(type => DeliveryLocation, deliveryLocation => deliveryLocation.deliveryPersonToLocation)
    @JoinColumn({ name: 'delivery_location_id' })
    public deliveryLocation: DeliveryLocation;

    @ManyToOne(type => DeliveryPerson, deliveryPerson => deliveryPerson.deliveryPersonToLocation)
    @JoinColumn({ name: 'delivery_person_id' })
    public deliveryPerson: DeliveryPerson;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
