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
import { RouterModule, Routes } from '@angular/router';
import { SalesLayoutComponent } from './components/layout/layout.component';

const salesRoutes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  {
    path: '',
    component: SalesLayoutComponent,
    children: [
      {
        path: 'orders',
        loadChildren: () => import('./components/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('./components/sales-payments/sales-payments.module').then(m => m.SalesPaymentsModule)
      },
      {
        path: 'cancel-orders',
        loadChildren: () => import('./components/cancel-orders/cancel-orders.module').then(m => m.CancelOrdersModule)
      },
      {
        path: 'archive-payments',
        loadChildren: () => import('./components/archive-payments/archive-payments.module').then(m => m.ArchivePaymentsModule)
      },
      {
        path: 'quotation-requests',
        loadChildren: () => import('./components/quotation-requests/quotation-requests.module').then(m => m.QuotationRequestsModule)
      },
      {
        path: 'inventory-products',
        loadChildren: () => import('./components/inventory-products/inventory-products.module').then(m => m.InventroyProductsModule)
      },
      {
        path: 'backorder',
        loadChildren: () => import('./components/backorder-list/backorder-list.module').then(m => m.BackorderListModule)
      },
      {
        path: 'failed-order',
        loadChildren: () => import('./components/failed-order/failed-order.module').then(m => m.FailedOrderModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(salesRoutes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
