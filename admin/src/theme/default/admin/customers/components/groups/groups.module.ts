/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { DefaultCommonModule } from '../../../../default.common.module';
import { MaterialModule } from '../../../../default.material.module';
import { HttpLoaderFactory } from '../../../admin.module';
// components
import { GroupsAddComponent } from './add/add.component';
import { GroupsListComponent } from './list/list.component';
import { GroupsFilterComponent } from './filter/filter.component';
// Routing Module
import { GroupsRoutingModule } from './groups.routing';

// Store Actions
import { CustomersGroupService } from '../../../../../../core/admin/Customers/customers-group/customers-group.service';
import { CustomersGroupSandbox } from '../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
  declarations: [
    GroupsAddComponent,
    GroupsListComponent,
    GroupsFilterComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    GroupsRoutingModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ColorPickerModule
  ],
  providers: [

    CustomersGroupService,
    CustomersGroupSandbox,
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: 'check' }

  ],
  bootstrap: []
})
export class GroupsModule {}
