/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { DeliveryLocation } from '../models/DeliveryLocation';

@EntityRepository(DeliveryLocation)
export class DeliveryLocationRepository extends Repository<DeliveryLocation>  {

}
