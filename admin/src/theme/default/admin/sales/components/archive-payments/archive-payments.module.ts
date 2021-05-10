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
import { ArchivePaymentListComponent } from './list/list.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { ArchivePaymentSandbox } from '../../../../../../core/admin/sales/archive-payments/archive-payments.sandbox';
import { ArchivePaymentService } from '../../../../../../core/admin/sales/archive-payments/archive-payments.service';
import { ArchivePaymentEffects } from '../../../../../../core/admin/sales/archive-payments/effects/archive-payments.effects';

// Routing Module
import { ArchivePaymentsRoutingModule } from './archive-payments.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
  declarations: [
    ArchivePaymentListComponent,
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ArchivePaymentsRoutingModule,
    EffectsModule.forFeature([ArchivePaymentEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ArchivePaymentSandbox,
    ArchivePaymentService
  ],
  bootstrap: [],
  entryComponents: []
})
export class ArchivePaymentsModule {}
