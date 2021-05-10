import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './default/common/layout/layout.component';
import { AuthGuard } from './core/providers/guards/auth-guard';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./default/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
       {
         path: 'products',
         loadChildren: () => import('./default/pages/component/products/products.module').then(m => m.ProductsModule),
       },
       {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'orders',
        loadChildren: () => import('./default/pages/component/order/order.module').then(m => m.OrdersModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./default/pages/component/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./default/pages/component/settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'payments',
        loadChildren: () => import('./default/pages/component/payments/payments.module').then(m => m.PaymentsModule),
      },
      ],
}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
