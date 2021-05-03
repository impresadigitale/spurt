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

// Store Actions
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ScrollToModule } from '../../../../../../../../core/admin/vendor/pages/shared/validation-directives/error.module';
import { ComponentsModule } from '../../../../../shared/components';

// ngrx state
import { EffectsModule } from '@ngrx/effects';
import { SettlementOrderSandbox } from '../../../../../../../../core/admin/vendor/vendor-settlements/settlement-order/settlement-order.sandbox';
import { SettlementOrderService } from '../../../../../../../../core/admin/vendor/vendor-settlements/settlement-order/settlement-order.service';
import { SettlementOrderEffect } from '../../../../../../../../core/admin/vendor/vendor-settlements/settlement-order/settlement-order-effect/settlement-order.effect';


// components

import { SettlementOrderListComponent } from './list/settlement-order-list.component';
import { SettlementOrderModalComponent } from './modals/settlement-modal.component';

const sellerRoutes: Routes = [
    { path: '', component: SettlementOrderListComponent},
];
@NgModule({
    declarations: [
        SettlementOrderListComponent,
        SettlementOrderModalComponent
    ],
    imports: [
        RouterModule.forChild(sellerRoutes),
        CommonModule,
        NgbModule,
        MaterialModule,
        NumberAcceptModule,
        ScrollToModule,
        FormsModule,
        CKEditorModule,
        ComponentsModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([SettlementOrderEffect])
    ],
    providers: [
        SettlementOrderService,
        SettlementOrderSandbox
    ],
    bootstrap: [],
    entryComponents: [
        SettlementOrderModalComponent
    ]
})
export class SettlementOrderListModule { }
