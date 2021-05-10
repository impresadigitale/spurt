"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryLocationToLocationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const DeliveryLocationToLocationRepository_1 = require("../repositories/DeliveryLocationToLocationRepository");
const typeorm_1 = require("typeorm");
let DeliveryLocationToLocationService = class DeliveryLocationToLocationService {
    constructor(deliveryLocationToLocationRepository, log) {
        this.deliveryLocationToLocationRepository = deliveryLocationToLocationRepository;
        this.log = log;
    }
    // find  location
    findOne(findCondition) {
        this.log.info('Find location');
        return this.deliveryLocationToLocationRepository.findOne(findCondition);
    }
    // find  location
    findAll(findCondition) {
        this.log.info('Find location');
        return this.deliveryLocationToLocationRepository.find(findCondition);
    }
    // Delivery Location list
    list(limit, offset, select = [], whereConditions = [], count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== undefined && table.value !== '') {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined && table.value !== '') {
                    condition.where[table.name] = typeorm_1.Like('%' + table.value + '%');
                }
            });
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (count) {
            return this.deliveryLocationToLocationRepository.count(condition);
        }
        return this.deliveryLocationToLocationRepository.find(condition);
    }
    // create delivery location
    create(deliveryLocation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newDeliveryLocation = yield this.deliveryLocationToLocationRepository.save(deliveryLocation);
            return newDeliveryLocation;
        });
    }
    // update delivery location
    update(id, deliveryLocation) {
        this.log.info('Update a delivery person');
        deliveryLocation.id = id;
        return this.deliveryLocationToLocationRepository.save(deliveryLocation);
    }
    // delete delivery location
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a delivery location');
            const deleteDeliveryLocation = yield this.deliveryLocationToLocationRepository.delete(id);
            return deleteDeliveryLocation;
        });
    }
};
DeliveryLocationToLocationService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [DeliveryLocationToLocationRepository_1.DeliveryLocationToLocationRepository, Object])
], DeliveryLocationToLocationService);
exports.DeliveryLocationToLocationService = DeliveryLocationToLocationService;
//# sourceMappingURL=DeliveryLocationToLocationService.js.map