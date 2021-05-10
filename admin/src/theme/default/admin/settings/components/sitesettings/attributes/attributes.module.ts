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

// Component
import { AttributesAddComponent } from './add/add.component';
import { AttributesListComponent } from './list/list.component';

// Routing Module
import { AttributesRoutingModule } from './attributes.routing';

// ngrx

import { AttributeSandbox } from '../../../../../../../core/admin/settings/siteSettings/attributes/attributes.sandbox';
import { AttributeService } from '../../../../../../../core/admin/settings/siteSettings/attributes/attributes.service';
import { AttributeEffect } from '../../../../../../../core/admin/settings/siteSettings/attributes/attributes-effect/attributes.effect';
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
    AttributesAddComponent,
    AttributesListComponent,
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    AttributesRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NumberAcceptModule,
    EffectsModule.forFeature([AttributeEffect])
  ],
  bootstrap: [],
  providers: [AttributeService, AttributeSandbox]
})
export class AttributesModule {}
