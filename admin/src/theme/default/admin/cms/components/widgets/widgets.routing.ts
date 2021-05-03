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
import { WidgetsAddComponent } from './add/add.component';
import { WidgetsListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
const bannerRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: WidgetsListComponent },
  { path: 'add', component: WidgetsAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-banners' } },
  {
    path: 'edit/:id',
    component: WidgetsAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-banners' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(bannerRoutes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule {}
