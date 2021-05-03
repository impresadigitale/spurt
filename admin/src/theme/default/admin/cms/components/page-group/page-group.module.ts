/*
 * SpurtCommerce
 * version 4.2
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
import { PageGroupAddComponent } from './add/add.component';
import { PageGroupListComponent } from './list/list.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { PageGroupEffects } from '../../../../../../core/admin/cms/page-group/page-group-effects/page-group.effects';
import { PageGroupService } from '../../../../../../core/admin/cms/page-group/page-group.service';
import { PageGroupSandbox } from '../../../../../../core/admin/cms/page-group/page-group.sandbox';
import { PagesSandbox } from '../../../../../../core/admin/cms/pages/pages.sandbox';

// Routing Module
import { PageGroupRoutingModule } from './page-group.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';

// TRanslate Module
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
  declarations: [PageGroupAddComponent, PageGroupListComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    PageGroupRoutingModule,
    EffectsModule.forFeature([PageGroupEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule
  ],
  providers: [PageGroupService, PageGroupSandbox, PagesSandbox],
  bootstrap: [],
  entryComponents: []
})
export class PageGroupModule {}
