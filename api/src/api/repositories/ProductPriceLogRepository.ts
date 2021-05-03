/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { ProductPriceLog } from '../models/ProductPriceLog';

@EntityRepository(ProductPriceLog)
export class ProductPriceLogRepository extends Repository<ProductPriceLog>  {

}
