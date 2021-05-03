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
import { SocialComponent } from './social.components';

// Component

const socialRoutes: Routes = [{ path: '', component: SocialComponent }];

@NgModule({
  imports: [RouterModule.forChild(socialRoutes)],
  exports: [RouterModule]
})
export class SocialRouting {}
