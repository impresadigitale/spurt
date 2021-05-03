/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RatingReviewListComponent } from './list/list.component';

const rating_reviewRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: RatingReviewListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(rating_reviewRoutes)],
  exports: [RouterModule]
})
export class RatingReviewRoutingModule {}
