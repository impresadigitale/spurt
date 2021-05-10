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
import { CouponAddComponent } from './add/add.component';
import { CouponListComponent } from './list/list.component';

const couponRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CouponListComponent },
  { path: 'add', component: CouponAddComponent },
  {
    path: 'edit/:id',
    component: CouponAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(couponRoutes)],
  exports: [RouterModule]
})
export class CouponRoutingModule {}
