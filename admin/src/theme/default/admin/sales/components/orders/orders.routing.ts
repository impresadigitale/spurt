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

// Component
import { OrderListComponent } from './list/list.component';
import { ViewOrdersComponent } from './vieworders/vieworders.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const orderRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: OrderListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-order' }},
  { path: 'vieworder', component: ViewOrdersComponent, canActivate: [AuthGuard], data: { permission: 'view-order' } },
  {
    path: 'vieworder/:orderId',
    component: ViewOrdersComponent, canActivate: [AuthGuard],
    data: { permission: 'view-order' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
