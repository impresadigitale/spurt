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
import { CurrencyListComponent } from './list/list.component';
import { CurrencyAddComponent } from './add/add.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';

const currencyRoutes: Routes = [
  { path: '', component: CurrencyListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-currency' } },
  { path: 'add', component: CurrencyAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-currency' } },
  {
    path: 'edit/:id',
    component: CurrencyAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-currency' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(currencyRoutes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule {}
