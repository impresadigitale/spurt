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
import { ComponentsModule } from '../../../shared/components';
import { VendorSharedModule } from '../../vendor-shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../../default.material.module';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';


// components

import { ReportsComponent } from './pages/reports/reports.component';
import { ReportsLayoutComponent } from './layout/layout.component';
import { SalesReportsComponent } from './pages/sales-report/sales-reports.component';
import { SettlementReportsComponent } from './pages/settlement-reports/settlement-reports.component';
import { VendorReportsComponent } from './pages/vendor-reports/vendor-reports.component';


// ngrx state

import { ReportsSandbox } from '../../../../../../core/admin/vendor/reports/reports.sandbox';
import { ReportsService } from '../../../../../../core/admin/vendor/reports/reports.service';
import { ReportsEffect } from '../../../../../../core/admin/vendor/reports/reports-effect/reports.effect';


const vendorRoutes: Routes = [
    {
        path: '', component: ReportsLayoutComponent,
        children: [
            { path: 'list', component: ReportsComponent, canActivate: [AuthGuard] },
            { path: 'sales-report', component: SalesReportsComponent, canActivate: [AuthGuard] },
            { path: 'settlement-report', component: SettlementReportsComponent, canActivate: [AuthGuard] },
            { path: 'vendor-report', component: VendorReportsComponent, canActivate: [AuthGuard] },
            { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
    },
];
@NgModule({
    declarations: [
        ReportsLayoutComponent,
        ReportsComponent,
        SalesReportsComponent,
        SettlementReportsComponent,
        VendorReportsComponent
    ],
    imports: [
        RouterModule.forChild(vendorRoutes),
        CommonModule,
        ComponentsModule,
        MaterialModule,
        VendorSharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NumberAcceptModule,
        EffectsModule.forFeature([ReportsEffect]),
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          })],
    providers: [
        ReportsSandbox,
        ReportsService
    ],
    bootstrap: [],
    entryComponents: []
})
export class ReportsModule { }
