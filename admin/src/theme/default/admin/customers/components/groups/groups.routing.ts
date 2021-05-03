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
import { GroupsAddComponent } from './add/add.component';
import { GroupsListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const groupsRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: GroupsListComponent },
  { path: 'add', component: GroupsAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-customer-group' } },
  {
    path: 'edit/:id',
    component: GroupsAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-customer-group' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(groupsRoutes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
