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
import { ImportRoutingModule } from './import-routing.module';
import { BulkProductUploadComponent } from './import-products/bulk-product-upload.component';

// state management

import { ImportEffects } from '../../../../../../core/admin/catalog/import/effects/import.effect';
import { ImportService } from '../../../../../../core/admin/catalog/import/import.service';
import { ImportSandbox } from '../../../../../../core/admin/catalog/import/import.sandbox';
import { EffectsModule } from '@ngrx/effects';

// Shared Module

import { MaterialModule } from '../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';

// Translate Module

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../shared/components';


@NgModule({
  declarations: [
    BulkProductUploadComponent

  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NumberAcceptModule,
    ComponentsModule,
    ImportRoutingModule,
    EffectsModule.forFeature([ImportEffects])
  ],
  providers: [
    ImportService,
    ImportSandbox
  ],
  bootstrap: [],
  entryComponents: []
})
export class ImportModule {}
