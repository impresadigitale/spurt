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
import { VariantsAddComponent } from './add/add.component';
import { VariantsListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const prodOptionRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: VariantsListComponent },
  { path: 'add', component: VariantsAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-options' } },
  {
    path: 'edit/:id',
    component: VariantsAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-options' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(prodOptionRoutes)],
  exports: [RouterModule]
})
export class VariantsRoutingModule {}
