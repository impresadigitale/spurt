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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
} from '@angular/common/http';

// Store Actions
import { ToastrModule } from 'ng6-toastr-notifications';
import { EffectsModule } from '@ngrx/effects';

// Routing Module

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';

// Components
import { TaxAddComponent } from './add/add.component';
import { TaxListComponent } from './list/list.component';

// Service
import { TaxSandbox } from '../../../../../../../core/admin/settings/localizations/tax/tax.sandbox';
import { TaxService } from '../../../../../../../core/admin/settings/localizations/tax/tax.service';

// Transalate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpLoaderFactory } from '../../../../admin.module';
import { TaxRoutingModule } from './tax.routing';
import { ComponentsModule } from '../../../../../../default/admin/shared/components';

@NgModule({
  declarations: [TaxAddComponent, TaxListComponent],
  imports: [
    TaxRoutingModule,
    EffectsModule,
    ToastrModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule
  ],
  providers: [TaxSandbox, TaxService]
})
export class TaxModule {}
