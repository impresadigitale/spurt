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
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CompareComponent } from './compare.component';
import { PipesModule } from '../../../default/shared/pipes/pipes.module';
import { ComponentsModule } from '../../../default/shared/components';
import {TranslateModule} from '@ngx-translate/core';

export const routes = [
  { path: '', component: CompareComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PipesModule,
    ComponentsModule,
    TranslateModule

  ],
  declarations: [
    CompareComponent
  ]
})
export class CompareModule { }
