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

// components
import { AttributesGroupAddComponent } from './add/add.component';
import { AttributesGroupListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const prodOptionRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AttributesGroupListComponent },
  { path: 'add', component: AttributesGroupAddComponent, canActivate: [AuthGuard],
   },
  {
    path: 'edit/:id',
    component: AttributesGroupAddComponent, canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(prodOptionRoutes)],
  exports: [RouterModule]
})
export class AttributesGroupRoutingModule {}
