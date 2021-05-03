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
import { VendorLayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../shared/components';
import { VendorSharedModule } from '../../vendor-shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { PaymentSandbox} from '../../../../../../core/admin/vendor/pages/payment/payment.sandbox';
import { PaymentService} from '../../../../../../core/admin/vendor/pages/payment/payment.service';
import { PaymentEffects } from '../../../../../../core/admin/vendor/pages/payment/payment-effects/payment.effects';

const vendorRoutes: Routes = [
    {
        path: '', component: VendorLayoutComponent,
        children: [
            { path: 'settlement-order',
              loadChildren: () => import('./pages/settlement-order-list/settlement-order-list.module').then(m => m.SettlementOrderListModule)

           },
            { path: 'settlement-history',
              loadChildren: () => import('./pages/settlement-history/settlement-history.module').then(m => m.SettlementHistoryModule)
          },
            { path: '', redirectTo: 'settlement-order', pathMatch: 'full' }
        ]
    },
];
@NgModule({
    declarations: [
        VendorLayoutComponent,
    ],
    imports: [
        RouterModule.forChild(vendorRoutes),
        CommonModule,
        ComponentsModule,
        VendorSharedModule,
        NgbModule,
        ComponentsModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),
          EffectsModule.forFeature([PaymentEffects])],
    providers: [
        PaymentSandbox,
        PaymentService,
     ],
    bootstrap: [],
    entryComponents: []
})
export class SettlementModule { }
