/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { PriceUpdateFileLog } from '../models/PriceUpdateFileLog';

@EntityRepository(PriceUpdateFileLog)
export class PriceUpdateFileLogRepository extends Repository<PriceUpdateFileLog>  {

}
