/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { BackorderListComponent } from './list/list.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { BackorderListSandbox } from '../../../../../../core/admin/sales/backorder-list/backorder-list.sandbox';
import { BackorderListService } from '../../../../../../core/admin/sales/backorder-list/backorder-list.service';
import { BackorderListEffects } from '../../../../../../core/admin/sales/backorder-list/effects/backorder-list.effects';

// Routing Module
import { BackorderListRoutingModule } from './backorder-list.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../shared/components';


@NgModule({
  declarations: [
    BackorderListComponent,
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BackorderListRoutingModule,
    EffectsModule.forFeature([BackorderListEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    BackorderListSandbox,
    BackorderListService
  ],
  bootstrap: [],
  entryComponents: []
})
export class BackorderListModule {}
