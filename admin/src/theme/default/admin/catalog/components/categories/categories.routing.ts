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
import { CategoryAddComponent } from './add/add.component';
import { CategoriesListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const categoriesRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CategoriesListComponent },
  { path: 'add', component: CategoryAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-category' } },
  {
    path: 'edit/:id',
    component: CategoryAddComponent, canActivate: [AuthGuard],
  data: { permission: 'edit-category' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(categoriesRoutes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
