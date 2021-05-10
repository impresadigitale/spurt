/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

export interface Section {
    sectionId?: number;
    sectionName?: string;
    sectionItem?: [];
    sectionType?: number;
}

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class CreateSiteFilterRequest {
    @IsNotEmpty()
    public filterName: string;

    @IsNotEmpty()
    public categoryId: [];

    public section: Section[];

}
