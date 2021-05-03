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
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalesLayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../shared/components';
import { VendorSharedModule } from '../../vendor-shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';

const salesRoutes: Routes = [
    {
        path: '', component: SalesLayoutComponent,
        children: [
            { path: 'order',
            loadChildren: () => import('./pages/order/order.module').then(m => m.SalesOrderModule)
            },
            { path: '', redirectTo: 'order', pathMatch: 'full'}
        ]
    },
];
@NgModule({
    declarations: [
        SalesLayoutComponent
    ],
    imports: [
        RouterModule.forChild(salesRoutes),
        CommonModule,
        ComponentsModule,
        VendorSharedModule,
        NgbModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),
    ],
    providers: [
    ],
    bootstrap: [],
    entryComponents: []
})
export class VendorSalesModule {}
