/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Quotation } from '../models/Quotation';

@EntityRepository(Quotation)
export class QuotationRepository extends Repository<Quotation>  {

}
