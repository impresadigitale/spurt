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
import { CMSLayoutComponent } from './components/layout/layout.component';

const cmsRoutes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: '',
    component: CMSLayoutComponent,
    children: [
      // ---
      {
        path: 'banners',
        loadChildren: () => import('./components/banner/banner.module').then(m => m.BannerModule)

      },
      {
        path: 'pages',
        loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'blogs',
        loadChildren: () => import('./components/blog/blogs.module').then(m => m.BlogsModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./components/widgets/widgets.module').then(m => m.WidgetsModule)
      },
      {
        path: 'page-group',
        loadChildren: () => import('./components/page-group/page-group.module').then(m => m.PageGroupModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(cmsRoutes)],
  exports: [RouterModule]
})
export class CMSRoutingModule {}
