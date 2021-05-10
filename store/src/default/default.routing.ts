/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// components
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CONTAINERS } from './common/index';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { AuthGuard } from '../core/service/auth.guard';
import { LayoutAuthGuard } from '../core/service/layout_auth.guard';
import { UnderDevelopingComponent } from './pages/layout/under-developing/under-developing.component';
import { GetDirectionsComponent } from './shared/get-directions/get-directions.component';

export const routes: Routes = [
  {
    path: '',
    component: CONTAINERS.LayoutContainerComponent,
    canActivate: [LayoutAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },

      {
        path: 'underdeveloping',
        component: UnderDevelopingComponent,
        data: {
          urls: [{ title: 'UNDER DEVELOPING', url: '' }]
        }
      },
      {
        path: 'getdirections',
        component: GetDirectionsComponent,
        data: {
          urls: [{ title: 'Get Directions', url: '' }]
        }
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
        data: {
          urls: [{ title: 'Account Settings', url: '' }]
        }
      },
      {
        path: 'wishlist',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistModule),
        data: {
          urls: [{ title: 'Wishlist', url: '' }]
        }
      },
      {
        path: 'compare',
        loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule),
        data: {
          urls: [{ title: 'Products', url: '/products' },
          { title: 'Product Compare' }]
        }
      },
      {
        path: 'cart',
        loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
        data: {
          urls: [{ title: 'Cart', url: '' }]
        }
      },
      {
        path: 'checkout',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule),
        data: {
          urls: [{ title: 'Checkout', url: '' }]
        }
      },
      {
        path: 'contact',
        loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule),
        // canActivate: [AuthGuard],
        data: {
          urls: [{ title: 'Contact', url: '' }]
        }
      },
      {
        path: 'track-order',
        loadChildren: () => import('./pages/track-order/track-order.module').then(m => m.TrackOrderModule),
        // canActivate: [AuthGuard],
        data: {
          urls: [{ title: 'Track Order', url: '' }]
        }
      },
      {
        path: 'vendor-signup',
        loadChildren: () => import('./pages/vendor-signup/vendor-signup.module').then(m => m.VendorModule),
        // canActivate: [AuthGuard],
        data: {
          urls: [{ title: 'Vendor Sign Up', url: '' }]
        }
      },
      {
        path: 'vendor-detail',
        loadChildren: () => import('./pages/vendor-detail/vendor-detail.module').then(m => m.VendorDetailModule),
        // canActivate: [AuthGuard],
        data: {
          urls: [{ title: 'Vendor Details', url: '' }]
        }
      },
      {
        path: 'auth',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/Authentication/authentication.module').then(m => m.AuthenticationModule),
        data: {
          urls: [{ title: 'Sign In', url: '' }]
        }
      },
      {
        path: 'page-detail/:id',
        component: DetailPageComponent
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'products/:id',
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule),
        data: {
          urls: [{ title: 'Product Detail ', url: '' }]
        }
      },
      {
        path: 'blogs',
        loadChildren: () => import('./pages/blogs/blogs.module').then(m => m.BlogsModule),
      },
      {
        path: 'services',
        loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesModule),
      },
      {
        path: 'stock-checkout',
        loadChildren: () => import('./pages/stock-checkout/stock-checkout.module').then(m => m.StockCheckoutModule),
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule {}
