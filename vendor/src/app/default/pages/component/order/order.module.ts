
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RecentOrderListComponent } from './component/recent-order-list/recent-order-list.component';
import { OrdersComponent } from './layout/orders.component';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffect } from '../../../../core/order/order-effects/order.effects';
import { OrderService } from '../../../../core/order/order.service';
import { OrderSandbox } from '../../../../core/order/order.sandbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllOrdersComponent } from './component/allorders/allorders.component';
import { UpdateComponent } from './component/update/update.component';
import { PaymentSandbox } from '../../../../core/payment/payment.sandbox';
import { PaymentService } from '../../../../core/payment/payment.service';
import { PaymentEffect } from '../../../../core/payment/payment-effects/payment.effects';
import { ArchiveOrdersComponent } from './component/archive-orders/archive-orders.component';
import { DashboardSandbox } from '../../../../core/dashboard/dashboard.sandbox';
import { DashboardEffect } from '../../../../core/dashboard/effects/dashboard.effect';
import { DashboardService } from '../../../../core/dashboard/dashboard.service';
import { CancelRequestsComponent } from './component/cancel-requests/cancel-requests.component';
import { QuotationRequestsComponent } from './component/quotation-requests/quotation-requests.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

import { OrderInvoiceComponent } from './component/order-invoice/order-invoice.component';
import { SalesReportListComponent } from './component/sales-report-list/sales-report-list.component';


export const routes = [
    {
        path: '',
        component: OrdersComponent,
        children: [
            {
                path: 'list',
                component: RecentOrderListComponent,
                data: {
                    title: 'Orders',
                    urls: [{ title: 'Home' }, { title: 'Orders' }, { title: 'Recent Orders' }]
                }
            },
            {
                path: 'all-orders',
                component: AllOrdersComponent,
                data: {
                    title: 'Orders',
                    urls: [{ title: 'Home' }, { title: 'Orders' }, { title: 'All Orders' }]
                }
            },
            {
                path: 'archive-orders',
                component: ArchiveOrdersComponent,
                data: {
                    title: 'Orders',
                    urls: [{ title: 'Home' }, { title: 'Orders' }, { title: 'Archive Orders' }]
                }
            },
            {
                path: 'cancel-orders',
                component: CancelRequestsComponent,
                data: {
                    title: 'Orders',
                    urls: [{ title: 'Home' }, { title: 'Orders' }, { title: 'Cancel Requests' }]
                }
            },
            {
                path: 'update',
                component: UpdateComponent,
                data: {
                    title: 'Orders',
                    urls: [{ title: 'Home' }, { title: 'Orders' }, { title: 'Update Order Status' }]
                }
            },
            {
                path: 'quotation-list',
                component: QuotationRequestsComponent,
                data: {
                    title: 'Quotation Request List',
                    urls: [{ title: 'Home' }, { title: 'Orders' }, { title: 'Quotation Request List' }]
                }
            },
            {
                path: 'order-invoice',
                component: OrderInvoiceComponent,
                data: {
                    title: 'Order Invoice List',
                    urls: [{ title: 'Home' }, { title: 'Orders' }, { title: 'Order Invoice List' }]
                }
            },
            {
                path: 'sales-report-list',
                component: SalesReportListComponent,
                data: {
                    title: 'Orders',
                    urls: [{ title: 'Home' }, { title: 'Orders' }, { title: 'Sales Report' }]
                }
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedModule,
        FormsModule,
        NgbModule,
        MatInputModule,
        MatStepperModule,
        MatIconModule,
        EffectsModule.forFeature([OrderEffect, PaymentEffect, DashboardEffect]),

    ],
    declarations: [
        OrdersComponent,
        RecentOrderListComponent,
        AllOrdersComponent,
        UpdateComponent,
        ArchiveOrdersComponent,
        CancelRequestsComponent,
        QuotationRequestsComponent,
        OrderInvoiceComponent,
        SalesReportListComponent
    ],
    providers: [
        OrderEffect,
        OrderService,
        OrderSandbox, PaymentSandbox, PaymentService,
        DashboardSandbox,
        DashboardService
    ]

})
export class OrdersModule {
}
