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
import { SizeChartListComponent } from './list/list.component';
import { SizeChartComponent } from './add/add.component';

// Component

const sizechartRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: SizeChartListComponent },
  { path: 'add', component: SizeChartComponent },
  { path: 'edit/:id',component: SizeChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(sizechartRoutes)],
  exports: [RouterModule]
})
export class SizeChartRouting {}
