"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const UserRepository_1 = require("../api/repositories/UserRepository");
const CustomerRepository_1 = require("../api/repositories/CustomerRepository");
const VendorRepository_1 = require("../api/repositories/VendorRepository");
const DeliveryPersonRepository_1 = require("../api/repositories/DeliveryPersonRepository");
const Logger_1 = require("../decorators/Logger");
let AuthService = class AuthService {
    constructor(log, userRepository, customerRepository, vendorRepository, deliveryPersonRepository) {
        this.log = log;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.vendorRepository = vendorRepository;
        this.deliveryPersonRepository = deliveryPersonRepository;
    }
    parseBasicAuthFromRequest(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const authorization = req.header('authorization');
            if (authorization && authorization.split(' ')[0] === 'Bearer') {
                this.log.info('Credentials provided by the client');
                if (!authorization) {
                    return undefined;
                }
                const UserId = yield this.decryptToken(authorization.split(' ')[1]);
                return UserId;
            }
            this.log.info('No credentials provided by the client');
            return undefined;
        });
    }
    decryptToken(encryptString) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((subresolve, subreject) => {
                jsonwebtoken_1.default.verify(encryptString, '123##$$)(***&', { ignoreExpiration: true }, (err, decoded) => {
                    if (err) {
                        return subresolve(undefined);
                    }
                    return subresolve(decoded.id);
                });
            });
        });
    }
    validateUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: {
                    userId, deleteFlag: 0, isActive: 1,
                },
            });
            if (user) {
                return user;
            }
            return undefined;
        });
    }
    validateCustomer(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const customer = yield this.customerRepository.findOne({
                where: {
                    id: userId, isActive: 1, deleteFlag: 0,
                },
            });
            if (customer) {
                return customer;
            }
            return undefined;
        });
    }
    validateDeliveryPerson(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deliveryPerson = yield this.deliveryPersonRepository.findOne({
                where: {
                    id: userId,
                },
            });
            if (deliveryPerson) {
                return deliveryPerson;
            }
            return undefined;
        });
    }
    validateVendor(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendors = yield this.vendorRepository.findOne({
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
        });
    }
};
AuthService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, Logger_1.Logger(__filename)),
    tslib_1.__param(1, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(4, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__metadata("design:paramtypes", [Object, UserRepository_1.UserRepository,
        CustomerRepository_1.CustomerRepository,
        VendorRepository_1.VendorRepository,
        DeliveryPersonRepository_1.DeliveryPersonRepository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map