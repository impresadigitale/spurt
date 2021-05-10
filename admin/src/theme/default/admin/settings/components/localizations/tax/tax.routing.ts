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
import { TaxListComponent } from './list/list.component';
import { TaxAddComponent } from './add/add.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
const taxRoutes: Routes = [
  { path: '', component: TaxListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-tax' } },
  { path: 'add', component: TaxAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-tax' } },
  {
    path: 'edit/:id',
    component: TaxAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-tax' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(taxRoutes)],
  exports: [RouterModule]
})
export class TaxRoutingModule {}
