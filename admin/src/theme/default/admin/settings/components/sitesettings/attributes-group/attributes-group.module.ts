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
import { AttributesGroupAddComponent } from './add/add.component';
import { AttributesGroupListComponent } from './list/list.component';

// Routing Module
import { AttributesGroupRoutingModule } from './attributes-group.routing';

// ngrx


import { EffectsModule } from '@ngrx/effects';

import { AttributeGroupSandbox } from '../../../../../../../core/admin/settings/siteSettings/attributes-group/attributes-group.sandbox';
import { AttributeGroupService } from '../../../../../../../core/admin/settings/siteSettings/attributes-group/attributes-group.service';
import { AttributeGroupEffect } from '../../../../../../../core/admin/settings/siteSettings/attributes-group/attributes-group-effect/attributes-group.effect';

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NumberAcceptModule } from '../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../../shared/components';

@NgModule({
  declarations: [
    AttributesGroupAddComponent,
    AttributesGroupListComponent,
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    AttributesGroupRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NumberAcceptModule,
    EffectsModule.forFeature([AttributeGroupEffect])
  ],
  bootstrap: [],
  providers: [AttributeGroupSandbox, AttributeGroupService]
})
export class AttributesGroupModule {}
