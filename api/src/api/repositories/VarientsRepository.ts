/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Varients } from '../models/Varients';

@EntityRepository(Varients)
export class VarientsRepository extends Repository<Varients>  {

}
