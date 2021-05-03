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
import { ProductListComponent } from './list/list.component';
import { ProductAddComponent } from './add/add.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { QuestionComponent } from './question/question.component';


const productRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ProductListComponent },
  { path: 'add', component: ProductAddComponent, canActivate: [AuthGuard],
    data: { permission: 'create-product' }},
  {
    path: 'edit/:id',
    component: ProductAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-product' }
  },
  { path: 'question', component: QuestionComponent },
  { path: 'question/:id', component: QuestionComponent },


];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
