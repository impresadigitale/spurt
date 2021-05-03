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
import { VendorLayoutComponent } from './components/layout/vendor-layout.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { ComponentsModule } from '../shared/components';

const routes: Routes = [
  {
    path: '',
    component: VendorLayoutComponent,
    children: [
      { path: '', redirectTo: 'vendor', pathMatch: 'full' },
      { path: 'coming-soon-dashboard', component: ComingSoonComponent },
      { path: 'coming-soon-reports', component: ComingSoonComponent },
      { path: 'coming-soon-settings', component: ComingSoonComponent },
      {
        path: 'vendor',
        loadChildren: () => import('./components/vendors/vendors.module').then(m => m.VendorsModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('./components/sales/sales.module').then(m => m.VendorSalesModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('./components/payments/payments.module').then(m => m.PaymentModule)
      },
      {
        path: 'settlement',
        loadChildren: () => import('./components/settlement/settlement.module').then(m => m.SettlementModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./components/reports/reports.module').then(m => m.ReportsModule)
      }
    ]
  },
];
@NgModule({
  declarations: [
    VendorLayoutComponent,
    ComingSoonComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, NgbModule, ComponentsModule],
  providers: []
  ,
  bootstrap: [],
  entryComponents: []
})
export class VendorModule {}
