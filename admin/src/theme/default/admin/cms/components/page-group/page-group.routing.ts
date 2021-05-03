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
import { PageGroupAddComponent } from './add/add.component';
import { PageGroupListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const pagesRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: PageGroupListComponent },
  { path: 'add', component: PageGroupAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-pages' } },
  {
    path: 'edit/:id',
    component: PageGroupAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-pages' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PageGroupRoutingModule {}
