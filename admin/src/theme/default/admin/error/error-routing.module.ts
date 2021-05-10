/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {NotfoundComponent} from './404/not-found.component';
import {ServerErrorComponent} from './500/server.error.component';

const errorRoutes: Routes = [
  {
    path: '404',
    component: NotfoundComponent
  },
  {
    path: '500',
    component: ServerErrorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(errorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ErrorRoutingModule {
}
