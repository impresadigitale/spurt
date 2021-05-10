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
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
// Component
import { LanguageAddComponent } from './add/add.component';
import { LanguageListComponent } from './list/list.component';

const languageRoutes: Routes = [
  { path: '', component: LanguageListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-language' } },
  { path: 'add', component: LanguageAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-language' } },
  {
    path: 'edit/:id',
    component: LanguageAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-language' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(languageRoutes)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule {}
