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
import { CancelOrderListComponent } from './list/list.component';
import { CancelOrderFilterComponent } from './filter/filter.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { CancelOrderSandbox } from '../../../../../../core/admin/sales/cancel-orders/cancel-orders.sandbox';
import { CancelOrderService } from '../../../../../../core/admin/sales/cancel-orders/cancel-orders.service';
import { CancelOrderEffects } from '../../../../../../core/admin/sales/cancel-orders/effects/cancel-order.effects';

// Routing Module
import { CancelOrdersRoutingModule } from './cancel-orders.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
  declarations: [
    CancelOrderListComponent,
    CancelOrderFilterComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CancelOrdersRoutingModule,
    EffectsModule.forFeature([CancelOrderEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CancelOrderSandbox,
    CancelOrderService
  ],
  bootstrap: [],
  entryComponents: []
})
export class CancelOrdersModule {}
