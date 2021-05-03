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
import { SocialComponent } from '../social/social.components';
import { FilterListComponent } from './list/list.component';
import { FiltersAddComponent } from './add/add.component';

// Component

const filterRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: FilterListComponent },
  { path: 'add', component: FiltersAddComponent },
  { path: 'edit/:id',component: FiltersAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(filterRoutes)],
  exports: [RouterModule]
})
export class FilterRouting {}
