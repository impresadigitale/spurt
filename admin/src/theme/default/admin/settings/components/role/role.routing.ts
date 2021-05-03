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
import { RoleAddComponent } from './add/add.component';
import { RoleListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const roleRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: RoleListComponent },
  { path: 'add', component: RoleAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-role' } },
  {
    path: 'edit/:id',
    component: RoleAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-role' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(roleRoutes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {}
