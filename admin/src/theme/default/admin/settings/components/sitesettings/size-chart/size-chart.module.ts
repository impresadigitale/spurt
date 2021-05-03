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
import { SizeChartRouting } from './size-chart.routing';
import { ComponentsModule } from '../../../../../../default/admin/shared/components';
import { NgSelectModule } from '@ng-select/ng-select';
import { SizeChartListComponent } from './list/list.component';
import { SizeChartEffect } from 'src/core/admin/settings/siteSettings/sizechart/sizechart-effect/sizechart.effect';
import { SizeChartSandbox } from 'src/core/admin/settings/siteSettings/sizechart/sizechart.sandbox';
import { SizeChartService } from 'src/core/admin/settings/siteSettings/sizechart/sizechart.service';
import { SizeChartComponent } from './add/add.component';

@NgModule({
  declarations: [
    SizeChartComponent,
    SizeChartListComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SizeChartRouting,
    NgSelectModule,
    ComponentsModule,
    TranslateModule.forChild(),
    EffectsModule.forFeature([SizeChartEffect])
  ],
  providers: [SizeChartSandbox, SizeChartService],
  bootstrap: [],
  entryComponents: []
})
export class SizeChartModule {}
