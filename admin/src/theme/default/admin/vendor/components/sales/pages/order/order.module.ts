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
// import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { OrdersService } from '../../../../../../../../core/admin/vendor/vendor-sales/orders/orders.service';
import { OrdersEffects } from '../../../../../../../../core/admin/vendor/vendor-sales/orders/orders-effects/orders.effects';
import { OrdersSandbox } from '../../../../../../../../core/admin/vendor/vendor-sales/orders/orders.sandbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ScrollToModule } from '../../../../../../../../core/admin/vendor/pages/shared/validation-directives/error.module';
import { AuthGuard } from '../../../../../../../../core/admin/providers/auth.guard';

const orderRoutes: Routes = [
    { path: '', component: OrdersComponent, canActivate: [AuthGuard],
    data: { permission: 'list-sales' },
children:     [
     {
    path: ':id', component: OrdersDetailComponent
     }
]
},
];
@NgModule({
    declarations: [
        OrdersComponent,
        OrdersDetailComponent
    ],
    imports: [
        RouterModule.forChild(orderRoutes),
        CommonModule,
        NgbModule,
        MaterialModule,
        NumberAcceptModule,
        ScrollToModule,
        FormsModule,
        CKEditorModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([
            OrdersEffects
          ])
    ],
    providers: [
        OrdersService,
        OrdersSandbox
    ],
    bootstrap: [],
    entryComponents: []
})

export class SalesOrderModule { }
