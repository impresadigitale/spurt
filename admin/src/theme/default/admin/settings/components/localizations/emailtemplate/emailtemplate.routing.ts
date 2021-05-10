/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailTempListComponent } from './list/list.component';
import { EmailTempAddComponent } from './add/add.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
// Component

const emailtempRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: EmailTempListComponent, canActivate: [AuthGuard],
  data: { permission: 'list-email-template' } },
  { path: 'add', component: EmailTempAddComponent, canActivate: [AuthGuard],
  data: { permission: 'create-email-template' } },
  {
    path: 'edit/:id',
    component: EmailTempAddComponent, canActivate: [AuthGuard],
    data: { permission: 'edit-email-template' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(emailtempRoutes)],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule {}
