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
import { CustomerAddComponent } from './add/add.component';
import { CustomerListComponent } from './list/list.component';
import { CustomerViewComponent } from './view/view.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const customerRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CustomerListComponent },
  { path: 'add', component: CustomerAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-customer' } },
  { path: 'view/:id', component: CustomerViewComponent, canActivate: [AuthGuard],
  data: { permission: 'view-customer' } },
  {
    path: 'edit/:id',
    component: CustomerAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-customer' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
