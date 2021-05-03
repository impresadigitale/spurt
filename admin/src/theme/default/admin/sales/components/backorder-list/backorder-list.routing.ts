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
import { BackorderListComponent } from './list/list.component';

const quotationRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BackorderListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(quotationRoutes)],
  exports: [RouterModule]
})
export class BackorderListRoutingModule {}
