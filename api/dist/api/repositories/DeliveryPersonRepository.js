"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPersonRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const DeliveryPerson_1 = require("../models/DeliveryPerson");
let DeliveryPersonRepository = class DeliveryPersonRepository extends typeorm_1.Repository {
    deliveryPersonList(limit, offset, vendorId, location) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(DeliveryPerson_1.DeliveryPerson, 'deliveryPerson');
            query.select(['DISTINCT(deliveryPerson.id) as deliveryPersonId', 'deliveryPerson.firstName as deliveryPersonName', 'deliveryPerson.vendorId as vendorId']);
            query.leftJoin('deliveryPerson.deliveryPersonToLocation', 'deliveryPersonToLocation');
            query.leftJoin('deliveryPersonToLocation.deliveryLocation', 'deliveryLocation');
            query.where('deliveryPerson.vendorId = :id', { id: vendorId });
            if (location !== '' && location !== undefined) {
                query.andWhere('deliveryLocation.locationName LIKE ' + "'%" + location + "%'");
            }
            query.limit(limit);
            query.offset(offset);
            return query.getRawMany();
        });
    }
};
DeliveryPersonRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(DeliveryPerson_1.DeliveryPerson)
], DeliveryPersonRepository);
exports.DeliveryPersonRepository = DeliveryPersonRepository;
//# sourceMappingURL=DeliveryPersonRepository.js.map