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
import { LocalizationLayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../shared/components';

const Routers: Routes = [
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
  {
    path: '',
    component: LocalizationLayoutComponent,
    children: [
      {
        path: 'language',
        loadChildren: () => import('./languages/languages.module').then(m => m.LanguagesModule)
      },
      {
        path: 'stock-status',
        loadChildren: () => import('./stockstatus/stockstatus.module').then(m => m.StockStatusModule)      },
      {
        path: 'order-status',
        loadChildren: () => import('./orderstatus/orderstatus.module').then(m => m.OrderStatusModule)
      },
      {
        path: 'countries',
        loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
      },
      {
        path: 'zone',
        loadChildren: () => import('./zone/zone.module').then(m => m.ZoneModule)
      },
      {
        path: 'delivery-location',
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule)
      },
      {
        path: 'currency',
        loadChildren: () => import('./currencies/currency.module').then(m => m.CurrencyModule)
      },
      {
        path: 'tax',
        loadChildren: () => import('./tax/tax.module').then(m => m.TaxModule)
      },
      {
        path: 'emailtemp',
        loadChildren: () => import('./emailtemplate/emailtemplate.module').then(m => m.EmailTemplateModule)
      }
    ]
  }
];
@NgModule({
  declarations: [LocalizationLayoutComponent],
  imports: [RouterModule.forChild(Routers), ComponentsModule],
  providers: [],
  exports: [RouterModule]
})
export class LocalizationModule {}
