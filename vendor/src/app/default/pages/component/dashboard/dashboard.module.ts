import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardSandbox } from '../../../../core/dashboard/dashboard.sandbox';
import { DashboardService } from '../../../../core/dashboard/dashboard.service';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffect } from '../../../../core/dashboard/effects/dashboard.effect';
import { OrderSandbox } from '../../../../core/order/order.sandbox';
import { OrderService } from '../../../../core/order/order.service';
import { OrderEffect } from '../../../../core/order/order-effects/order.effects';
import { PaymentService } from '../../../../core/payment/payment.service';
import { PaymentSandbox } from '../../../../core/payment/payment.sandbox';
import { PaymentEffect } from '../../../../core/payment/payment-effects/payment.effects';
import { ChartsModule } from 'ng2-charts';

export const routes = [
  {
      path: '',
      component: DashboardComponent,
      data: {
        title: 'Dashboard',
    }
  }
];
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ChartsModule,
    EffectsModule.forFeature([DashboardEffect, OrderEffect, PaymentEffect])
  ],
  providers: [DashboardSandbox, DashboardService, OrderSandbox, OrderService, PaymentSandbox, CurrencyPipe, PaymentService]
})
export class DashboardModule { }
