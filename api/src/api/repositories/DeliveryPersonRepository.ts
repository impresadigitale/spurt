/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { DeliveryPerson } from '../models/DeliveryPerson';

@EntityRepository(DeliveryPerson)
export class DeliveryPersonRepository extends Repository<DeliveryPerson>  {
    public async deliveryPersonList(limit: number, offset: number, vendorId: number, location: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(DeliveryPerson, 'deliveryPerson');
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
    }

}
