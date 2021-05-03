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
import { DefaultCommonModule } from '../../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { VariantsAddComponent } from './add/add.component';
import { VariantsListComponent } from './list/list.component';

// Routing Module
import { VariantsRoutingModule } from './variants.routing';

// vriants ngrx state

import { VariantsSandbox } from '../../../../../../../core/admin/settings/siteSettings/variants/variants.sandbox';
import { VariantsService } from '../../../../../../../core/admin/settings/siteSettings/variants/variants.service';
import { VariantsEffect } from '../../../../../../../core/admin/settings/siteSettings/variants/variants-effect/variants.effect';
import { EffectsModule } from '@ngrx/effects';


// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NumberAcceptModule } from '../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../../shared/components';

@NgModule({
  declarations: [
    VariantsAddComponent,
    VariantsListComponent,
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    VariantsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NumberAcceptModule,
    EffectsModule.forFeature([VariantsEffect])
  ],
  bootstrap: [],
  providers: [VariantsSandbox, VariantsService]
})
export class VariantsModule {}
