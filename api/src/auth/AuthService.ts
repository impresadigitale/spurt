/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as express from 'express';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { User } from '../api/models/User';
import { UserRepository } from '../api/repositories/UserRepository';
import { CustomerRepository } from '../api/repositories/CustomerRepository';
import { VendorRepository } from '../api/repositories/VendorRepository';
import { DeliveryPersonRepository } from '../api/repositories/DeliveryPersonRepository';
import { Logger, LoggerInterface } from '../decorators/Logger';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: UserRepository,
        @OrmRepository() private customerRepository: CustomerRepository,
        @OrmRepository() private vendorRepository: VendorRepository,
        @OrmRepository() private deliveryPersonRepository: DeliveryPersonRepository
    ) { }

    public async parseBasicAuthFromRequest(req: express.Request): Promise<number> {
        const authorization = req.header('authorization');
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            this.log.info('Credentials provided by the client');
            if (!authorization) {
                return undefined;
            }
            const UserId = await this.decryptToken(authorization.split(' ')[1]);
            return UserId;
        }
        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public async decryptToken(encryptString: string): Promise<number> {
        return new Promise<number>((subresolve, subreject) => {
            jwt.verify(encryptString, '123##$$)(***&', { ignoreExpiration: true }, (err, decoded) => {
                if (err) {
                   return subresolve(undefined);
                }
                return subresolve(decoded.id);
            });
        });
    }

    public async validateUser(userId: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                userId, deleteFlag : 0, isActive: 1,
            },
        });
        if (user) {
            return user;
        }

        return undefined;
    }

    public async validateCustomer(userId: number): Promise<any> {
        const customer = await this.customerRepository.findOne({
            where: {
                id: userId, isActive: 1, deleteFlag: 0,
            },
        });
        if (customer) {
            return customer;
        }
        return undefined;
    }

    public async validateDeliveryPerson(userId: number): Promise<any> {
        const deliveryPerson = await this.deliveryPersonRepository.findOne({
            where: {
                id: userId,
            },
        });
        if (deliveryPerson) {
            return deliveryPerson;
        }
        return undefined;
    }

    public async validateVendor(userId: number): Promise<any> {
        const vendors = await this.vendorRepository.findOne({
            where: {
                vendorId: userId,
            }, relations: ['customer'],
        });
        if (vendors) {
            if (vendors.customer.isActive === 1 && vendors.customer.deleteFlag === 0) {
                return vendors;
            }
        }
        return undefined;
    }

}
