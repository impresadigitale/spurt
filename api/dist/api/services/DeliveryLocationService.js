"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryLocationService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const DeliveryLocationRepository_1 = require("../repositories/DeliveryLocationRepository");
const typeorm_1 = require("typeorm");
let DeliveryLocationService = class DeliveryLocationService {
    constructor(deliveryLocationRepository, log) {
        this.deliveryLocationRepository = deliveryLocationRepository;
        this.log = log;
    }
    // find one delivery location
    findOne(findCondition) {
        this.log.info('Find role');
        return this.deliveryLocationRepository.findOne(findCondition);
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
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined) {
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
            return this.deliveryLocationRepository.count(condition);
        }
        return this.deliveryLocationRepository.find(condition);
    }
    // create delivery location
    create(deliveryLocation) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newDeliveryLocation = yield this.deliveryLocationRepository.save(deliveryLocation);
            return newDeliveryLocation;
        });
    }
    // update delivery location
    update(id, deliveryLocation) {
        this.log.info('Update a delivery person');
        deliveryLocation.deliveryLocationId = id;
        return this.deliveryLocationRepository.save(deliveryLocation);
    }
    // delete delivery location
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a delivery location');
            const deleteDeliveryLocation = yield this.deliveryLocationRepository.delete(id);
            return deleteDeliveryLocation;
        });
    }
};
DeliveryLocationService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [DeliveryLocationRepository_1.DeliveryLocationRepository, Object])
], DeliveryLocationService);
exports.DeliveryLocationService = DeliveryLocationService;
//# sourceMappingURL=DeliveryLocationService.js.map