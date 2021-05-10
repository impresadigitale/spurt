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
import { FailedOrderListComponent } from './list/list.component';
import { FailedOrderFilterComponent } from './filter/filter.component';
import { FailedOrderModalComponent } from './modal/failed-order-model/failed-order-model.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { FailedOrderSandbox } from '../../../../../../core/admin/sales/failed-order/failed-order-sandbox';
import { FailedOrderService } from '../../../../../../core/admin/sales/failed-order/failed-order.service';
import { FailedOrderEffects } from '../../../../../../core/admin/sales/failed-order/failed-order-effects/failed-order.effects';

// Routing Module
import { FailedOrderRoutingModule } from './failed-order.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ViewFailedOrdersComponent } from './vieworders/vieworders.component';
import { OrderstatusSandbox } from '../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
  declarations: [
    FailedOrderListComponent,
    FailedOrderFilterComponent,
    ViewFailedOrdersComponent,
    FailedOrderModalComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FailedOrderRoutingModule,
    EffectsModule.forFeature([FailedOrderEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [FailedOrderSandbox, FailedOrderService, OrderstatusSandbox],
  bootstrap: [],
  entryComponents: [FailedOrderModalComponent]
})
export class FailedOrderModule {}
