/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';

import { ServiceCategoryPath } from '../models/ServiceCategoryPath';

@EntityRepository(ServiceCategoryPath)
export class ServiceCategoryPathRepository extends Repository<ServiceCategoryPath>  {

}
