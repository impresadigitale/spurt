/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, PrimaryGeneratedColumn, Entity, BeforeUpdate, BeforeInsert, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import * as bcrypt from 'bcrypt';
import moment = require('moment/moment');
import { DeliveryAllocation } from './DeliveryAllocation';
import { DeliveryPersonToLocation } from './DeliveryPersonToLocation';
import { IsNotEmpty } from 'class-validator';
@Entity('delivery_person')
export class DeliveryPerson extends BaseModel {

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

    public static comparePassword(user: DeliveryPerson, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'vendor_id' })
    public vendorId: number;
    @IsNotEmpty()
    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @Column({ name: 'email' })
    public email: string;

    @Column({ name: 'password' })
    public password: string;

    @Column({ name: 'mobile_number' })
    public mobileNumber: string;

    @Column({ name: 'location' })
    public location: string;

    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'image_path' })
    public imagePath: string;

    @Column({ name: 'delete_flag' })
    public deleteFlag: number;

    @Column({ name: 'all_location' })
    public allLocation: number;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'last_login' })
    public lastLogin: string;

    @OneToMany(type => DeliveryAllocation, deliveryAllocation => deliveryAllocation.deliveryPerson)
    public deliveryAllocation: DeliveryAllocation[];

    @OneToMany(type => DeliveryPersonToLocation, deliveryPersonToLocation => deliveryPersonToLocation.deliveryPerson)
    public deliveryPersonToLocation: DeliveryPersonToLocation[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
