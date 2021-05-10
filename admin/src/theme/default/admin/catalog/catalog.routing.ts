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
import { CatalogLayoutComponent } from './components/layout/layout.component';

const catalogRoutes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  {
    path: '',
    component: CatalogLayoutComponent,
    children: [
      {
        path: 'product',
        loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule)

      },
      {
        path: 'coupon',
        loadChildren: () => import('./components/coupon/coupon.module').then(m => m.CouponModule)

      },
      {
        path: 'brand',
        loadChildren: () => import('./components/brand/brand.module').then(m => m.BrandModule)
      },
      {
        path: 'rating_review',
        loadChildren: () => import('./components/rating_review/rating_review.module').then(m => m.RatingReviewModule)
      },
      {
        path: 'import',
        loadChildren: () => import('./components/import/import.module').then(m => m.ImportModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(catalogRoutes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule {}
