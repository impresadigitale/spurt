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

// components

// Store Actions
import { EffectsModule } from '@ngrx/effects';

// Routing Module

// Shared Module
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../../../default.material.module';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { FilterRouting } from './filter.routing';
import { ComponentsModule } from '../../../../../../default/admin/shared/components';
import { FilterEffect } from '../../../../../../../core/admin/settings/siteSettings/filter/filter-effect/filter.effect';
import { FilterService } from '../../../../../../../core/admin/settings/siteSettings/filter/filter.service';
import { FilterSandbox } from '../../../../../../../core/admin/settings/siteSettings/filter/filter.sandbox';
import { FiltersAddComponent } from './add/add.component';
import { FilterListComponent } from './list/list.component';
import { CategoriesEffect } from '../../../../../../../core/admin/catalog/category/effects/categories.effect';
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from '../../../../../../../core/admin/catalog/category/categories.service';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    FiltersAddComponent,
    FilterListComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FilterRouting,
    NgSelectModule,
    ComponentsModule,
    TranslateModule.forChild(),
    EffectsModule.forFeature([FilterEffect, CategoriesEffect])
  ],
  providers: [FilterSandbox, FilterService, CategoriesSandbox, CategoriesService],
  bootstrap: [],
  entryComponents: []
})
export class FilterModule {}
