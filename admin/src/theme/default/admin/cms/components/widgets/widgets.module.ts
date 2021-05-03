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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// components
import { WidgetsAddComponent } from './add/add.component';
import { WidgetsListComponent } from './list/list.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { WidgetSandbox } from '../../../../../../core/admin/cms/widgets/widgets.sandbox';
import { WidgetService } from '../../../../../../core/admin/cms/widgets/widgets.service';
import { WidgetEffect } from '../../../../../../core/admin/cms/widgets/widgets-effect/widgets.effect';

// Routing Module
import { WidgetsRoutingModule } from './widgets.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { WidgetLayoutComponent } from '../shared/widgets-layout/widgets-layout.component';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
  declarations: [
    WidgetsAddComponent,
    WidgetsListComponent,
    WidgetLayoutComponent
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    WidgetsRoutingModule,
    EffectsModule.forFeature([WidgetEffect]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule,
    InfiniteScrollModule
  ],
  providers: [WidgetService, WidgetSandbox],
  bootstrap: [],
  entryComponents: []
})
export class WidgetsModule {}
