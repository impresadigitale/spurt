/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';


@NgModule()
export class UtilityModule {
    static forRoot(): ModuleWithProviders<UtilityModule> {
        return {
            ngModule: UtilityModule,

            providers: []
        };
    }
}
