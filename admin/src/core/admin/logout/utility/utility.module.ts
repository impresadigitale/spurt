/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule()
export class UtilityModule {
  static forRoot(): ModuleWithProviders<UtilityModule> {
    return {
      ngModule: UtilityModule,

      providers: []
    };
  }
}
