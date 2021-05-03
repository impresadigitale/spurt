/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { StockLog } from '../models/StockLog';

@EntityRepository(StockLog)
export class StockLogRepository extends Repository<StockLog>  {

}
