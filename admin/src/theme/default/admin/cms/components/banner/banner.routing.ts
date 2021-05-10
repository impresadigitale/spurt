/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { BannerAddComponent } from './add/add.component';
import { BannerListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
const bannerRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BannerListComponent },
  { path: 'add', component: BannerAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-banners' } },
  {
    path: 'edit/:id',
    component: BannerAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-banners' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(bannerRoutes)],
  exports: [RouterModule]
})
export class BannerRoutingModule {}
