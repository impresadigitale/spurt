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
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../../../../default.material.module';

// shared modules

import { CKEditorModule } from 'ng2-ckeditor';
import { DatePipe } from '@angular/common';
import { NumberAcceptModule } from '../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { PipeModule } from '../../../../../shared/components/pipes/category-search.pipe.module';
import { ComponentsModule } from '../../../../../shared/components';

// components

import { SettlementHistoryListComponent } from './list/settlement-history-list.component';
import { SettlementHistoryModalComponent } from './modals/settlement-history-modal.component';
// ngrx state

import { EffectsModule } from '@ngrx/effects';
import { SettlementHistorySandbox } from '../../../../../../../../core/admin/vendor/vendor-settlements/settlement-history/settlement-history.sandbox';
import { SettlementHistoryService } from '../../../../../../../../core/admin/vendor/vendor-settlements/settlement-history/settlement-history.service';
import { SettlementHistoryEffect } from '../../../../../../../../core/admin/vendor/vendor-settlements/settlement-history/settlement-history-effect/settlement-history.effect';



const settlementRoutes: Routes = [
    { path: '', component: SettlementHistoryListComponent},

];
@NgModule({
    declarations: [
        SettlementHistoryListComponent,
        SettlementHistoryModalComponent
    ],
    imports: [
        RouterModule.forChild(settlementRoutes),
        CommonModule,
        NgbModule,
        MaterialModule,
        CKEditorModule,
        ComponentsModule,
        PipeModule,
        FormsModule, ReactiveFormsModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),
          NumberAcceptModule,
          EffectsModule.forFeature([SettlementHistoryEffect])


    ],
    providers: [
        DatePipe,
        SettlementHistorySandbox,
        SettlementHistoryService,

    ],
    bootstrap: [],
    entryComponents: [
        SettlementHistoryModalComponent
    ]
})
export class SettlementHistoryModule { }
