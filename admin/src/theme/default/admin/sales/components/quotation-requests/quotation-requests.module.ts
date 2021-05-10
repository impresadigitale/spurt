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
import { QuotationListComponent } from './list/list.component';
// import { QuotationListFilterComponent } from './filter/filter.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { QuotationRequestSandbox } from '../../../../../../core/admin/sales/quotation-request/quotation-request.sandbox';
import { QuotationRequestService } from '../../../../../../core/admin/sales/quotation-request/quotation-request.service';
import { QuotationRequestEffects } from '../../../../../../core/admin/sales/quotation-request/effects/quotation-request.effects';

// Routing Module
import { QuotationRequestsRoutingModule } from './quotation-requests.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
  declarations: [
    QuotationListComponent,
    // QuotationListFilterComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    QuotationRequestsRoutingModule,
    EffectsModule.forFeature([QuotationRequestEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    QuotationRequestSandbox,
    QuotationRequestService
  ],
  bootstrap: [],
  entryComponents: []
})
export class QuotationRequestsModule {}
