/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { DeliveryAllocation } from '../models/DeliveryAllocation';

@EntityRepository(DeliveryAllocation)
export class DeliveryAllocationRepository extends Repository<DeliveryAllocation>  {

}
